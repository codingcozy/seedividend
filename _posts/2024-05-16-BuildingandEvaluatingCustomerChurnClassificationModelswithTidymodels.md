---
title: "Tidymodels를 사용하여 고객 이탈 분류 모델 구축과 평가하기"
description: ""
coverImage: "/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_0.png"
date: 2024-05-16 17:11
ogImage: 
  url: /assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_0.png
tag: Tech
originalTitle: "Building and Evaluating Customer Churn Classification Models with Tidymodels"
link: "https://medium.com/towards-data-science/building-and-evaluating-classification-models-to-predict-customer-churn-with-tidymodels-de282075fc7b"
isUpdated: true
---




![표](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_0.png)

모델을 처음 배울 때, 아주 오래 전에는 서로 다른 패키지에서 서로 다른 매개변수 이름으로 다양한 방법으로 모델을 구축하는데 여러 가지 방법이 있었습니다. 그런 다음 tidymodels를 사용하기 시작하면서 모델 빌딩을 일관된 방식으로 다양한 상황과 엔진에서 쉽게 작성할 수 있는 방법에 대해 기쁘게 놀랐습니다. 이는 서로 다른 모델에 대해 백 가지 형식과 매개변수를 기억할 필요가 없어지며 결과를 비교하기가 훨씬 쉬워졌다는 것을 의미했습니다.

이 글에서는 매우 일반적인 고객 이탈 예측 시나리오를 예로 들어, tidy한 방법으로 모델을 구축하고 결과를 비교하는 방법에 대해 안내하겠습니다.

# 코드

<div class="content-ad"></div>

이 글의 모든 코드는 내 GitHub Repo에서 찾을 수 있어요.

# 모델링을 시작해봅시다

## 단계 0: 환경 설정

필요한 패키지를 설치하려면 install.packages("package_name")과 같은 개별 명령을 실행하거나 아래 명령을 실행하여 모든 패키지를 로드하세요. 해당 명령은 이미 존재하지 않는 경우에만 패키지를 설치한 후 로드합니다.

<div class="content-ad"></div>

```js
# 패키지 불러오기

packages <- c("tidyverse", "tidymodels", "skimr", "GGally")

package.check <- lapply(packages, FUN = function(x) {
  if (!require(x, character.only = TRUE)) {
    install.packages(x, dependencies = TRUE)
    library(x, character.only = TRUE)
  }
})
```

## 단계 1: 데이터셋

이 연습에서는 Simarpreet Singh의 Kaggle에서 Creative Commons Attribution 4.0 International 라이선스(CC BY 4.0)로 사용 가능한 Binary Classification of Bank Churn Synthetic Data를 사용합니다.

데이터셋은 "Exited" 열을 포함하고 있으며 이는 고객이 떠났는지 여부를 나타냅니다. 이를 예측할 것입니다. 먼저 데이터셋을 로드하고 데이터셋의 모습을 살펴볼 것입니다:

<div class="content-ad"></div>

```js
bankchurn_df <- read.csv("./data/bank_churn.csv")

bankchurn_df |> 
  glimpse()
```

<img src="/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_1.png" />

## Step 2: 데이터 정제

저는 모델의 특성으로 사용되지 않을 ‘Surname’이라는 용어를 포함하는 열을 제거할 것입니다. 또한 이진 분류를 위해 출력 변수인 Exited를 팩터 변수로 변환할 것입니다.
  

<div class="content-ad"></div>

```js
bankchurn_df_upd <- bankchurn_df |> 
  select(Exited, everything()) |> 
  mutate(Exited = as.factor(Exited)) |> 
  select(-contains("Surname")) 
```

## 단계 3: 탐색적 데이터 분석

특정 열에 대해 파고들기 전에 데이터를 초기 이해하기 위해 skim() 명령을 사용할 것입니다. 이 명령은 각 열의 분포를 제공하여 모든 변수가 동일한 척도에 있지 않다는 점을 알 수 있도록 도와줍니다.

```js
bankchurn_df_upd |> 
  skim()
```

<div class="content-ad"></div>

md
![이미지](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_2.png)

이제 ggpairs()를 사용하여 몇 가지 예측 변수를 조사하여 출력 변수와의 관계를 이해해 보겠습니다.

```js
bankchurn_df_upd |> 
  select(Exited, CreditScore, Age, Tenure, Balance) |> 
  ggpairs(mapping = aes(colour = Exited, alpha = 0.3)) +
  scale_fill_manual(values=c('darkgreen', 'red')) +
  scale_colour_manual(values=c('darkgreen', 'red'))
```

![이미지](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_3.png)


<div class="content-ad"></div>

이 패키지는 변수간의 관계를 빠르게 이해하는 데 도움이 됩니다. 이제 성별, 위치 및 출력 변수 간의 관계를 확인하겠습니다.

![image](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_4.png)

상관 매개변수는 예측 변수 간에 강한 관계가 있는지 확인합니다.

이제 모델링 단계로 넘어가겠습니다.

<div class="content-ad"></div>

## 단계 4: 훈련/테스트 분리

모든 모델링 과정에서처럼, 첫 번째 단계는 학습된 모델 정확도를 예측할 무작위 테스트 세트를 보류하는 것입니다. 이를 위해 initial_split() 명령을 사용할 것입니다. 재현성을 위해 시드를 설정하고 training() 및 testing() 함수를 사용하여 분할에 액세스할 것입니다.

```js
set.seed(123)
bc_split <- initial_split(bankchurn_df_upd, prop = 3/4, strata = "Exited")

train_data <- training(bc_split)
test_data <- testing(bc_split)
```

## 단계 5: 피처 엔지니어링

<div class="content-ad"></div>

이전에 수행한 탐색적 데이터 분석을 바탕으로, 몇 가지 기본 기능 엔지니어링을 수행할 것입니다. 이를 위해 recipe()를 사용하면 매우 쉽게 반복 가능한 단계 세트를 생성할 수 있습니다. 이를 통해 일반적인 기능 엔지니어링 작업에 대해 자세한 코드를 작성할 필요가 없습니다. 이 시나리오에서 다음을 수행하려고 합니다:

- 명목 변수를 더미 변수로 변환하되 결과 변수는 따로 두기.
- 단일 값만 포함하거나 분산이 0인 변수를 제거.
- 숫자 예측 변수를 정규화하기. 이는 일부 변수가 서로 다른 척도에 있기 때문에 필요합니다.

```js
bc_recipe <- recipe(Exited ~ ., data = bankchurn_df_upd) %>%
  step_dummy(all_nominal(), -all_outcomes()) %>%
  step_zv(all_numeric()) %>%
  step_normalize(all_numeric()) %>%
  prep()

bc_recipe %>%
  bake(new_data = NULL) 
```

<img src="/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_5.png" />

<div class="content-ad"></div>

## 단계 5: 모델 명세 및 워크플로우 작성

저는 파스니프(parsnip)를 사용하여 두 가지 모델 명세와 워크플로우를 작성할 것입니다. 이를 통해 다양한 모델에서 이를 표준화된 접근으로 생성할 수 있는 방법을 보여줄 것입니다.

```js
lr_mod <- logistic_reg() |> 
  set_mode("classification") |> 
  set_engine("glm")

lr_mod
```

![이미지](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_6.png)

<div class="content-ad"></div>

이제 레시피를 모델 학습과 결합하는 워크플로를 만들겠습니다.

```js
lr_workflow <- 
  workflow() |> 
  add_model(lr_mod) |> 
  add_recipe(bc_recipe)

lr_workflow
```

![Image](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_7.png/)

이제 랜덤 포레스트 모델에 대해서도 위 단계를 반복할 것입니다. 모델 사양과 워크플로 생성의 유사한 구조에 주목하세요.

<div class="content-ad"></div>

```js
rand_forest_ranger_model <- rand_forest(
  mode = "classification", mtry = 10, trees = 500, min_n = 20) |>
  set_engine("ranger", importance = "impurity") 

rand_forest_ranger_model

rf_workflow <- workflow() |> 
  add_model(rand_forest_ranger_model) |> 
  add_recipe(bc_recipe)

rf_workflow
```

<img src="/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_8.png" />

<img src="/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_9.png" />

## Step 6: 데이터 적합하기

<div class="content-ad"></div>

fit() 함수를 사용하여 생성한 워크플로우를 활용하여 데이터를 학습 데이터 세트에 맞추겠습니다.

```js
lr_fit <- 
  lr_workflow |>
  fit(data = train_data)

rf_fit <- 
  rf_workflow |>
  fit(data = train_data)
```

## 단계 7: 피처 중요도

선형 모델의 경우 tidy()라는 명령을 사용할 수 있어 이전에 맞춘 모델의 구성 요소에 쉽게 액세스할 수 있습니다. 이를 액세스한 후, 예측 변수들을 특정 지표(이 경우 p-값)에 따라 정렬할 것입니다.

<div class="content-ad"></div>

```js
lr_fit |> 
  extract_fit_parsnip() |> 
  tidy() |> 
  arrange(p.value)
```

![Image](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_10.png)

Random forest를 위해, extract_fit_parsnip() 함수를 사용하여 fit를 추출할 거예요. 그런 다음 importance() 명령어를 사용하여 특성과 그들의 지표를 추출할 거예요.

```js
extract_fit_parsnip(rf_fit)$fit |> 
  ranger::importance() |> 
  enframe() |> 
  arrange(desc(value))
``` 

<div class="content-ad"></div>

<img src="/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_11.png" />

## Step 8: 테스트 데이터셋에서 예측하기

두 모델 모두, 이전에 맞춘 모델에 predict() 함수를 사용하여 테스트 데이터셋에서 예측을 추출할 것입니다. 이진 분류의 경우, 기본적으로 이는 예측값으로 0 또는 1의 클래스 유형을 반환합니다. 확률 값을 얻기 위해, type 매개변수를 "prob"로 업데이트할 것입니다.

```js
# 로지스틱 회귀
class_pred_lr <- predict(lr_fit, test_data)
prob_pred_lr <- predict(lr_fit, test_data, type = "prob")

# 랜덤 포레스트
class_pred_rf <- predict(rf_fit, test_data)
prob_pred_rf <- predict(rf_fit, test_data, type = "prob")
```

<div class="content-ad"></div>

아래는 클래스와 확률 출력 예시입니다:

![Class and Probability Outputs](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_12.png)

동일한 테이블 내에서 두 출력을 모두 접근하기 위해 이 두 종류의 예측을 단일 데이터프레임으로 결합할 것입니다. 나는 비즈니스 시나리오에 따라 두 출력 클래스가 중요하다고 생각하기 때문에 이를 결합하려 합니다. 그 후 이 출력을 원래의 테스트 데이터셋과 병합하여 결과를 비교할 수 있도록 클래스, 확률 및 원래 "Exited" 값이 동일한 테이블 안에 있는 것을 확인할 것입니다. 아래는 최종 병합된 테이블이 어떻게 생겼는지에 대한 내용입니다.

```js
# 로지스틱 회귀
lr_preds_combined <- 
  data.frame(class_pred_lr, prob_pred_lr) |> 
  select(class = .pred_class, prob_no = .pred_0, prob_yes = .pred_1) |> 
  bind_cols(test_data)

# 랜덤 포레스트
rf_preds_combined <- 
  data.frame(class_pred_rf, prob_pred_rf) |> 
  select(class = .pred_class, prob_no = .pred_0, prob_yes = .pred_1) |> 
  bind_cols(test_data)
```

<div class="content-ad"></div>


![image](/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_13.png)

이제 예측값을 가지고 있으니, 이 모델들의 정확도를 측정해 봅시다.

## 단계 9: 성능 지표 이해

ROC 곡선은 서로 다른 임계값에서 이진 분류 방법의 성능을 보여줍니다. 이는 실제 양성 비율(TPR)을 거짓 양성 비율(FPR)에 대해 그립니다. roc_curve() 함수를 사용하여 roc 곡선의 값을 얻을 것입니다.
  

<div class="content-ad"></div>

```js
# 로지스틱 회귀
lr_roc <- lr_preds_combined |> 
  roc_curve(truth = Exited, prob_no) |> 
  mutate(model = "로지스틱 회귀")

# 랜덤 포레스트
rf_roc <- rf_preds_combined |> 
  roc_curve(truth = Exited, prob_no) |> 
  mutate(model = "랜덤 포레스트")

# ROC curve 값 결합
lr_roc |> 
  bind_rows(rf_roc) |> 
  glimpse()
```

<img src="/assets/img/2024-05-16-BuildingandEvaluatingCustomerChurnClassificationModelswithTidymodels_14.png" />

autoplot() 함수를 사용하여 ROC 커브를 시각화할 수 있지만, 이 경우에는 두 모델의 ROC 커브를 동시에 보기 위해 ggplot2를 사용하여 처음부터 플로팅하겠습니다.

```js
lr_roc |> 
  bind_rows(rf_roc) |> 
  ggplot(aes(x = 1 - specificity, y = sensitivity, color = model)) +
  geom_line() +
  geom_abline(lty = 2) +
  labs(y = "True Positive Rate", 
       x = "False Positive Rate",
       title = "ROC 커브") +
  theme_bw()
```

<div class="content-ad"></div>

헷갈리는 행렬(Confusion matrix)은 분류 모델의 성능을 요약하는 표입니다. Tidymodels 내 caret 패키지는 confusionMatrix()라는 함수를 제공하여 많은 유용한 정보를 제공합니다. 이를 사용하여 최종 모델을 선택하기 전에 두 모델의 지표를 비교할 것입니다.

```js
# 로지스틱 회귀
caret::confusionMatrix(lr_preds_combined$Exited,
                       lr_preds_combined$class,
                       positive = "1")

# 랜덤 포레스트
caret::confusionMatrix(rf_preds_combined$Exited,
                       rf_preds_combined$class,
                       positive = "1")
```

<div class="content-ad"></div>

랜덤 포레스트 모델은 로지스틱 회귀 모델과 비교하여 정확도, 민감도 및 특이도를 포함한 대부분의 메트릭에서 성능이 더 좋습니다. 그러나 랜덤 포레스트의 계산 요구량은 높을 수 있습니다. 그래서 특정 비즈니스 시나리오에서 정확도 향상의 중요성에 따라, 어떤 모델이 강조되어야 할지 선택할 수 있습니다.

# 다음 단계

이 기사가 tidymodels 프레임워크 내의 패키지 시리즈가 제공하는 강력하고 일관된 접근 방법을 이해하는 데 도움이 되었기를 바랍니다. 가치를 보여주기 위해 두 모델만 다루었지만, 유사한 구문을 사용하여 구축할 수 있는 다른 모델들이 많이 있습니다.

이러한 모델을 더욱 신뢰할 수 있게 만드는 또 다른 방법은 tidymodels에서 제공하는 도구를 사용하여 교차 검증하는 것입니다. 이에 대해 다른 기사에서 다룰 예정입니다.

<div class="content-ad"></div>

이 글의 모든 코드는 제 GitHub Repo에서 찾을 수 있어요. LinkedIn에서 제를 만나고 싶다면 연락해주세요.

이 글의 모든 이미지는 다른 경우가 아닌 한 저자가 찍었어요.