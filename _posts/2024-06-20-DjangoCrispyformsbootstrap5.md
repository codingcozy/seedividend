---
title: "Django Crispy Forms - Bootstrap5"
description: ""
coverImage: "/assets/img/2024-06-20-DjangoCrispyformsbootstrap5_0.png"
date: 2024-06-20 03:25
ogImage:
  url: /assets/img/2024-06-20-DjangoCrispyformsbootstrap5_0.png
tag: Tech
originalTitle: "Django Crispy forms — bootstrap5"
link: "https://medium.com/@azzouzhamza13/django-crispy-forms-bootstrap5-00a1eb3ec3c7"
isUpdated: true
---

## Django Crispy Forms 설정 및 HTML 템플릿이 Helper Layout을 통해 변경 양식을 받지 않는 이유를 해결하는 중!

대부분의 경우, 필터 구문인 (' form|crispy ')이 기본적인 렌더링에 충분합니다. 그러나 더 많은 제어가 필요하거나 Crispy Forms에서 제공하는 특정 기능을 사용하려면 템플릿 태그 구문인 (' crispy form ')을 선호할 수 있습니다.

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

![image](/assets/img/2024-06-20-DjangoCrispyformsbootstrap5_0.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

장고 템플릿에서 ' form|crispy ' 및 ' crispy form '은 Crispy Forms 라이브러리를 사용하여 Django 양식을 렌더링하는 두 가지 다른 방법입니다.

- '' form|crispy '' (필터 구문):

- 이것은 Django 템플릿에서의 필터 구문입니다.
- 변수 equip_form에 필터를 적용하는 데 사용됩니다.
- 기본 Crispy Forms 렌더링을 사용하여 양식을 렌더링합니다.

예시:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
{ crispy equip_form }
```

'crispy equip_form' (템플릿 태그 구문):

- Django 템플릿에서 사용되는 템플릿 태그 구문입니다.
- 폼을 렌더링하기 위해 명시적으로 crispy 템플릿 태그를 포함하는 데 사용됩니다.
- 추가 옵션을 지정하고 렌더링 동작을 사용자 정의할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

두 가지 구문은 모두 Crispy Forms를 사용하여 폼을 렌더링하는 동일한 결과를 얻습니다. 어떤 것을 선택할지는 종종 Crispy Forms 라이브러리에서 제공되는 추가 옵션을 사용해야 하는지 또는 렌더링 동작을 사용자 정의해야 하는지에 따라 다릅니다.

---

Django 프로젝트에 Crispy Forms를 설정해 봅시다.

1. 터미널: pip install django-crispy-forms

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

2- settings.py 파일에 다음을 추가하세요:

```python
INSTALLED_APPS = (
    ...
    'crispy_forms',
)
```

3- crispy-bootstrap5 추가하기: $ pip install crispy-bootstrap5

```python
INSTALLED_APPS = (
    ...
    "crispy_forms",
    "crispy_bootstrap5",
    ...
)

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"

CRISPY_TEMPLATE_PACK = "bootstrap5"
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 단계에서는 forms.py / views.py / urls.py에서 작업하고 대상 HTML 템플릿에 crispy forms를 로드할 것입니다. 예를 들어:

HTML 페이지 상단에 ( 'extends `app_name/main.html`' 뒤에):

'load crispy_forms_tags'

=================

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<form method="post">
{ csrf_token }
<div class="card" style="width: 50rem;">
<div class="card-header">
<h6 class="card-text">장비 정보:</h6>
</div>
<div class="card-body">
{ crispy equip_form }
</div>
<button type="submit">저장</button>
</div>
</form>
```

Forms.py 파일에 대한 중요한 내용입니다. Django crispy forms를 사용하면 Python 환경에서 HTML 태그를 변경하고 CSS 클래스를 추가할 수 있습니다.

```js
from .models import Equipment
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Div, Field, Row, Column
```

```js
class EquipForm(forms.ModelForm):
    class Meta:
        model = Equipment
        fields = "__all__"
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위의 코드는 일반적인 상황에서 양식을 사용하는 방법을 나타냅니다.

그러나 Django crispy 템플릿에서 생성된 표준 HTML 태그를 무시하고 뷰를 재정의할 수 있습니다.

```js
def __init__(self, *args, **kwargs):
        super(EquipForm, self).__init__(*args, **kwargs)
        #Django 양식의 경우 super().__ init__(*args, **kwargs)를 호출하여 인스턴스화 중에 전달된 데이터로 양식을 초기화합니다. 이는 Python에서 특정한 경우에 발생하는 패턴입니다. 부모 클래스의 메서드를 재정의하고 부모 클래스에서 동일한 메서드를 호출하려는 경우 사용됩니다.

        #특정 양식에 날짜 위젯 추가:
        self.fields['effective_date'].widget = forms.DateInput(attrs={'type': 'date'})
        self.fields['warranty_expiration'].widget = forms.DateInput(attrs={'type': 'date'})
        #
```

이제 열과 행으로 양식을 만들어 원하는 위치에 양식 필드를 그룹화하는 방법을 살펴보겠습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

        self.helper = FormHelper(self)
        self.helper.layout = Layout(
        Row(
            Column('name', css_class='col-md-4'),
            Column('vendor', css_class='col-md-4'),
        ),
        Row(
            Column('vendor_reference', css_class='col-md-4'),
            Column('model', css_class='col-md-4'),
        ),
        Row(
            Column('category', css_class='col-md-4'),
            Column('serial_number', css_class='col-md-4'),
            Column('used_by', css_class='col-md-4'),
        ),

.......
.......

![이미지](/assets/img/2024-06-20-DjangoCrispyformsbootstrap5_1.png)

forms.py에서 필드를 재정의한 후:

![이미지](/assets/img/2024-06-20-DjangoCrispyformsbootstrap5_2.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

보너스 팁:

다른 경우로, HelperForm 레이아웃을 재정의하여 뷰를 덮어썼지만 CSS 클래스가 변경되지 않는 문제가 발생했습니다. 'form|crispy'이 문제를 발생시키지 않았지만 HTML 소스 페이지를 검사하다가 새로운 css_class가 자식 태그 'div'에 적용되는 것을 발견했습니다. 이는 부모 `Div`를 대상으로하는 방법입니다.

```js
        self.helper = FormHelper(self)
        self.helper.form_method = 'post'
        self.helper.layout = Layout(

        Div(
            Field('field1', wrapper_class='col-md-6 '), # css_class
            Field('field2', wrapper_class='col-md-6 '),

            css_class='row',  # 전체 div에 행 클래스 적용 (선택 사항)
        ),
```

Django Crispy-Forms에서 css_class 및 wrapper_class는 양식 필드의 스타일링을 제어하기 위해 FormHelper 레이아웃 내에서 사용되는 속성입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

테이블 태그를 마크다운 형식으로 변경해주세요.

| css_class:                                                                     |
| ------------------------------------------------------------------------------ |
| - 이 속성은 개별 폼 필드에 적용되며, HTML 입력 요소의 CSS 클래스를 지정합니다. |
| - 이 속성은 폼 요소 자체의 스타일에 직접적으로 영향을 줍니다.                  |

예시:

```js
Field("field_name", (css_class = "my-custom-class"));
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

`wrapper_class`:

- 이 속성은 폼 필드를 감싸는 HTML 컨테이너에 적용됩니다.
- 폼 요소 주변의 컨테이너 스타일에 영향을 줍니다.

예시:

```js
Field("field_name", (wrapper_class = "my-container-class"));
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이러한 속성은 FormHelper에서 제공하는 레이아웃 정의에서 사용할 수 있습니다. 예를 들어, Layout 클래스를 사용하여 양식 레이아웃을 만들 때 각 필드에 이러한 속성을 적용할 수 있습니다:

```js
self.helper.layout = Layout(
    Field('field1', css_class='my-custom-class'),
    Field('field2', wrapper_class='my-container-class'),
    # ... 다른 필드들 ...
)
```

요약하면, css_class는 양식 요소 자체의 스타일링에 사용되고, wrapper_class는 양식 요소를 감싸는 컨테이너의 스타일링에 사용됩니다. 이 두 가지는 CSS 클래스를 통해 양식 필드의 모양을 제어하는 방법을 제공합니다.
