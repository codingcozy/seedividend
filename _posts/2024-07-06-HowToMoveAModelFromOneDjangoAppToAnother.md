---
title: "Django 앱 사이에서 모델을 이동하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-HowToMoveAModelFromOneDjangoAppToAnother_0.png"
date: 2024-07-06 10:26
ogImage:
  url: /assets/img/2024-07-06-HowToMoveAModelFromOneDjangoAppToAnother_0.png
tag: Tech
originalTitle: "How To Move A Model From One Django App To Another"
link: "https://medium.com/@shweta17/how-to-move-a-model-from-one-django-app-to-another-743184d6a5b2"
---

/assets/img/2024-07-06-HowToMoveAModelFromOneDjangoAppToAnother_0.png

소프트웨어 개발자로서, 때로는 Django 모델을 한 앱에서 다른 앱으로 옮기는 도전에 직면할 수 있습니다. 이 작업을 수행하는 여러 가지 방법이 있지만, 여기서는 가장 쉬운 방법에 대해 이야기하겠습니다. 이 방법은 다운타임 없이 데이터 손실 없이 진행됩니다.

여기서는 Django 수준의 변경만을 다루며, 데이터베이스 상태는 전혀 변경되지 않습니다.

공용 앱에서 사용자 앱으로 고객 모델을 이전하는 예시가 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 초기 모델 구조를 고려하십시오

common/models.py 파일에는 Customer 모델이 포함되어 있습니다.

```python
from django.db import models

class Customer(models.Model):
  class Meta:
    app_label = "common"
    db_table = "common_customer"

  first_name = CleanCharField(max_length=30, null=False)
  last_name = CleanCharField(max_length=150, null=False)
  email = models.EmailField(null=False)
  address = models.ForeignKey('common.Address', on_delete=models.SET_NULL, null=True, blank=True, default=None)

  def __str__(self) -> str:
    return f"{self.first_name} {self.last_name}"
```

## 이제 모델을 새 앱으로 이동하세요

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

common/models.py 파일에서 Customer 모델을 잘라내어 users/models.py 파일에 붙여넣으세요.

```js
from django.db import models

class Customer(models.Model):
  class Meta:
    app_label = "users"
    db_table = "common_customer"

  first_name = CleanCharField(max_length=30, null=False)
  last_name = CleanCharField(max_length=150, null=False)
  email = models.EmailField(null=False)
  address = models.ForeignKey('common.Address', on_delete=models.SET_NULL, null=True, blank=True, default=None)

  def __str__(self) -> str:
    return f"{self.first_name} {self.last_name}"
```

- app_label 매개변수를 users로 변경하세요.
- 데이터베이스 테이블 이름을 변경하지 않으므로 db_table 매개변수를 common_customer로 유지하세요.

## 데이터베이스 마이그레이션 생성

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 이 명령어를 실행하여 마이그레이션 파일을 생성하세요.

```js
python manage.py makemigrations
```

이 명령어를 실행하면 2개의 마이그레이션 파일이 생성됩니다.

- 하나는 공통 앱에서 모델을 삭제하는 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        # Dependencies
    ]

    operations = [
        migrations.DeleteModel(
            name='Customer',
        ),
    ]
```

- 사용자 앱에서 모델을 생성하세요.

```js
from django.db import migrations, models
import django.db.models.deletion
import django_utils.models.base


class Migration(migrations.Migration):

    dependencies = [
        # Dependencies
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', django_utils.models.base.CleanCharField(max_length=30)),
                ('last_name', django_utils.models.base.CleanCharField(max_length=150)),
                ('email', models.EmailField(max_length=254)),
                ('address', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='common.address')),
            ],
            options={
                'db_table': 'common_customer',
            },
        ),
    ]
```

## 데이터 손실을 방지하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터베이스 테이블 이름을 변경하지 않았기 때문에 여전히 common_customer 테이블입니다.
- 데이터베이스에 DeleteModel 작업이 적용되지 않도록 해야 합니다.
- DeleteModel 작업을 SeparateDatabaseAndState으로 감싸주세요. 이렇게 수정된 최종 마이그레이션 파일은 common 앱에서 다음과 같이 보여야 합니다:

```js
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        # 의존성
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.DeleteModel(
                    name='Customer',
                ),
            ]
        )
    ]
```

- 이미 데이터베이스에 테이블이 존재하기 때문에 다시 만들 필요가 없습니다.
- 데이터베이스에 CreateModel 작업이 적용되지 않도록 해야 하며, 그렇지 않으면 오류가 발생합니다.
- CreateModel 작업을 SeparateDatabaseAndState으로 감싸주세요. 이렇게 수정된 최종 마이그레이션 파일은 usersapp에서 다음과 같이 보여야 합니다:

```js
from django.db import migrations, models
import django.db.models.deletion
import django_utils.models.base

class Migration(migrations.Migration):

    dependencies = [
        # 의존성
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.CreateModel(
                    name='Customer',
                    fields=[
                        ('id',
                         models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                        ('first_name', django_utils.models.base.CleanCharField(max_length=30)),
                        ('last_name', django_utils.models.base.CleanCharField(max_length=150)),
                        ('email', models.EmailField(max_length=254)),
                        ('address', models.ForeignKey(blank=True, default=None, null=True,
                                                      on_delete=django.db.models.deletion.SET_NULL,
                                                      to='common.address')),
                    ],
                    options={
                        'db_table': 'common_customer',
                    },
                ),
            ]
        )
    ]
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 마이그레이션 적용

변경 사항을 적용하기 위해 마이그레이션을 실행하세요

```js
python manage.py migrate
```

성공적으로 공통 앱에서 사용자 앱으로 Customer 모델을 이동했고, 데이터베이스 변경이나 데이터 손실 없이 처리되었습니다. 완료되었습니다!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

알림: 이 방법은 매우 안전하지만 데이터베이스 작업을 수행하기 전에 데이터베이스를 백업하는 것이 좋습니다 (이 문서에서는 데이터베이스 변경을 수행하지 않지만 마이그레이션 작업을 수행하고 있습니다). 특히 프로덕션 환경에서는 항상 백업을 권장합니다.

## 연락처를 유지합시다:

질문, 제안 또는 개선 사항이 있으시면 연락해 주세요.

- Github → https://github.com/shwetasinghh
- LinkedIn → https://www.linkedin.com/in/shweta-singh-200280117/
