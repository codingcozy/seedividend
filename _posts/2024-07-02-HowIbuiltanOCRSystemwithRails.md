---
title: "Rails로 OCR 시스템 구축하는 방법"
description: ""
coverImage: "/assets/img/2024-07-02-HowIbuiltanOCRSystemwithRails_0.png"
date: 2024-07-02 22:13
ogImage: 
  url: /assets/img/2024-07-02-HowIbuiltanOCRSystemwithRails_0.png
tag: Tech
originalTitle: "How I built an OCR System with Rails"
link: "https://medium.com/@lcgarcia/how-i-built-an-ocr-system-with-rails-525535da8995"
---


친구와의 대화 중에 이 아이디어가 떠올랐어요. 친구가 문서를 스캔하고 분석해야 할 일이 많다고 언급했는데, 시간을 내기가 어려운 상황이라고 했어요. 이 일이 꽤 부담스러운 작업인 것 같아 보였고, 스트레스를 받고 있는 모습이었습니다. 그래서 제가 말했죠, "음, 어쩌면 해결책을 찾을 수도 있겠어요." 그래서 저는 RTesseract를 사용해 루비로 작은 스크립트를 만들기로 결심했어요. 이 스크립트는 그의 문서 스캔을 도와주는 것뿐만 아니라 이미지에서 텍스트를 추출하기 위한 OCR도 수행했어요. 꽤 유용하다는 것을 알아냈고, 다른 사람들도 이 아이디어의 더 강력한 버전에서 혜택을 받을 수 있을 것 같아요. 그래서 이 레일즈 어플리케이션이 탄생했습니다.

![](/assets/img/2024-07-02-HowIbuiltanOCRSystemwithRails_0.png)

# 사용할 도구

## 이 프로젝트에서는 다음 도구들을 사용할 예정입니다:

<div class="content-ad"></div>

- 루비 온 레일즈: 나는 옛날 학교파야!
- 액티브 스토리지: 빠르기 때문에!
- Tailwind CSS: 요즘 누가 안 쓰나요?
- Tesseract OCR: 마법사처럼 이미지를 단어로 바꿔주는 도구.
- RTesseract: Tesseract OCR을 앱과 호환되게 하는 루비 젬.

# 단계 1: 재료 설정하기

먼저 레일즈 앱이 필요합니다. 아래 단계를 따라주세요.

```js
rails new ocr
cd ocr
rails active_storage:install
rails db:migrate
```

<div class="content-ad"></div>

다음으로 Tailwind가 필요합니다.

```js
bundle add tailwindcss-rails
rails tailwindcss:install
```

이것으로 대부분의 작업이 끝날 것입니다. 더 깊이 파고들고 싶다면 Tailwind의 문서를 확인해보세요.

# 단계 2: 모델 생성

<div class="content-ad"></div>

모델을 생성해 보겠습니다. 파일 첨부 기능이 있는 모델을 생성할 거에요. 이 예시에서는 Document 모델을 만들어 볼게요.
다른 column도 추가해도 괜찮아요. 저는 제목만 추가할 거에요.

```js
rails generate model Document title:string
rails db:migrate
```

# 단계 3: 모델 업데이트

파일 첨부를 다루기 위해 Active Storage를 사용할 거에요. 이를 통해 모델에 파일을 손쉽게 첨부할 수 있어요. Document 모델을 수정해 파일 첨부 기능을 포함시켜야 해요.

<div class="content-ad"></div>

다음은 단계별로 설명합니다:

- 모델 생성: 이미 제목 속성을 가진 문서 모델을 생성했습니다.
- Active Storage 연결 설정: 이제 문서 모델을 업데이트하여 하나의 첨부 파일을 가진 것으로 지정할 것입니다. 이는 Active Storage에서 제공하는 has_one_attached 메서드를 사용하여 수행됩니다.
- 모델 정의: app/models/document.rb에 위치한 문서 모델 파일을 열어 다음 코드를 추가하세요:

```js
class Document < ApplicationRecord
  has_one_attached :file
end
```

- has_one_attached :file: 이 줄은 Rails에 각 문서 인스턴스가 첨부 파일을 하나 가질 수 있다고 알려줍니다. Active Storage는 첨부를 관리하며, 메타데이터를 데이터베이스에 저장하고 실제 파일을 구성된 스토리지 서비스(로컬 디스크, Amazon S3 등)에 저장합니다.

<div class="content-ad"></div>

우리 모델에 has_one_attached :file을 추가함으로써, 이제 생성할 다른 구성 요소가 생겼습니다: 컨트롤러입니다.

# 단계 4: 컨트롤러 생성

이제 모델을 설정했으므로, 문서를 관리하고 파일 업로드를 처리할 컨트롤러를 생성할 시간입니다.

```js
rails generate controller Documents
```

<div class="content-ad"></div>

다음에는 문서를 업로드하고 표시하는 데 필요한 동작을 정의하겠습니다. app/controllers/documents_controller.rb에 위치한 DocumentsController 파일을 열고 다음 코드로 업데이트하세요:

```js
class DocumentsController < ApplicationController
  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_params)
    if @document.save
      redirect_to @document, notice: 'Document was successfully uploaded.'
    else
      render :new
    end
  end

  def show
    @document = Document.find(params[:id])
  end

  private

  def document_params
    params.require(:document).permit(:title, :file)
  end
end
```

- new 액션: 이 액션은 새로운 Document 개체를 초기화합니다. 마치 빈 캔버스를 작품을 위해 설정하는 것처럼 생각할 수 있습니다. 여기서 파일을 업로드할 예정입니다.
- create 액션: 이 액션은 새로운 문서를 생성하는 작업을 처리합니다. 폼에서 매개변수 (제목 및 파일)를 가져와 새로운 Document 개체를 생성하고 저장을 시도합니다. 저장에 성공하면 성공 메시지와 함께 문서의 표시 페이지로 리디렉션됩니다. 그렇지 않은 경우, 문서 폼을 다시 렌더링하여 오류를 수정할 수 있습니다. 이 액션에서 파일을 업로드하는 것도 처리합니다.
- show 액션: 이 액션은 ID로 문서를 찾아 표시합니다. 마법이 일어날 곳이지만 현재는 파일만 표시합니다.

# 단계 5: 뷰 생성

<div class="content-ad"></div>

다음에는 뷰를 생성할 차례입니다.

다음을 app/views/documents/new.html.erb에 추가하세요:

```js
<!-- app/views/documents/new.html.erb -->
<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">새 문서 업로드</h2>
    
    <%= form_with model: @document, local: true, class: "space-y-6" do |form| %>
      <% if @document.errors.any? %>
        <div class="bg-red-100 text-red-700 p-4 rounded-lg">
          <h3 class="font-bold">제출시 오류가 있습니다:</h3>
          <ul class="list-disc list-inside">
            <% @document.errors.full_messages.each do |message| %>
              <li><%= message %></li>
            <% end %>
          </ul>
        </div>
      <% end %>

      <div class="space-y-2">
        <%= form.label :title, class: "block font-medium text-gray-700" %>
        <%= form.text_field :title, class: "block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" %>
      </div>

      <div class="space-y-2">
        <%= form.label :file, class: "block font-medium text-gray-700" %>
        <%= form.file_field :file, class: "block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" %>
      </div>

      <div>
        <%= form.submit "문서 업로드", class: "w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" %>
      </div>
    <% end %>
  </div>
</div>
```

그리고 다음을 app/views/documents/show.html.erb에 추가하세요.

<div class="content-ad"></div>


<p>
  <strong>Title:</strong>
  <%= @document.title %>
</p>

<p>
  <strong>File:</strong>
  <%= link_to @document.file.filename.to_s, rails_blob_path(@document.file, disposition: "attachment") %>
</p>


# 단계 6: 라우트 추가

Rails가 대부분을 처리하기 때문에 작은 단계입니다. config/routes.rb에 다음을 추가하세요:


Rails.application.routes.draw do
  resources :documents, only: [:new, :create, :show]
end


<div class="content-ad"></div>

# 단계 7: 스토리지 서비스 구성

기본적으로 Active Storage는 로컬 디스크를 사용하여 파일을 저장합니다. config/storage.yml 파일에서 Amazon S3, Google Cloud Storage, Microsoft Azure Blob Storage와 같은 다른 스토리지 서비스를 구성할 수 있습니다.

Active Storage를 사용하면 구성 파일을 업데이트함으로써 이러한 스토리지 서비스 간에 쉽게 전환할 수 있습니다. 이 유연성을 통해 애플리케이션이 성장함에 따라 가장 적합한 스토리지 솔루션을 선택하고 규모를 조정할 수 있습니다.

아래는 우리 앱에서 사용할 구성입니다.

<div class="content-ad"></div>

```js
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>
```

이제 이것을 작동하도록 설정할 시간입니다. 터미널로 이동하여 앱을 시작하세요.

```js
./bin/dev
```

아래와 같은 내용이 표시될 것입니다:

<div class="content-ad"></div>


![Image](/assets/img/2024-07-02-HowIbuiltanOCRSystemwithRails_1.png)

파일 업로드 부분이 준비되었으니 이제 즐거운 파트를 만들어 봅시다: OCR.

이를 위해 Tesseract 및 theruby 바인딩 RTesseract를 사용할 것입니다.

# 단계 8: rtesseract Gem 추가


<div class="content-ad"></div>

당신의 Gemfile에 Gem을 추가해주세요.

```js
gem 'rtesseract'
```

# 9단계: OCR 메소드 구현하기

업로드된 파일에 OCR을 수행하는 메소드를 Document 모델에 만드세요. 다음은 그 방법입니다:

<div class="content-ad"></div>

```js
class Document < ApplicationRecord
  has_one_attached :file

  def perform_ocr
    return unless file.attached?

    file_path = ActiveStorage::Blob.service.send(:path_for, file.key)
    image = RTesseract.new(file_path)
    image.to_s
  end
end
```

# 단계 10: OCR을 사용하기 위한 컨트롤러 업데이트

DocumentsController를 수정하여 OCR을 수행하는 액션을 포함하도록 변경하십시오:

```js
class DocumentsController < ApplicationController
  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_params)
    if @document.save
      redirect_to @document, notice: '문서가 성공적으로 업로드되었습니다.'
    else
      render :new
    end
  end

  def show
    @document = Document.find(params[:id])
    @ocr_text = @document.perform_ocr
  end

  private

  def document_params
    params.require(:document).permit(:title, :file)
  end
end
```

<div class="content-ad"></div>

# 단계 11: OCR 텍스트 표시를 위한 뷰 업데이트

show.html.erb 뷰를 수정하여 OCR 텍스트를 표시합니다:

```js
<p>
  <strong>제목:</strong>
  <%= @document.title %>
</p>

<p>
  <strong>파일:</strong>
  <%= link_to @document.file.filename.to_s, rails_blob_path(@document.file, disposition: "attachment") %>
</p>

<% if @ocr_text.present? %>
  <p>
    <strong>OCR 텍스트:</strong>
    <pre><%= @ocr_text %></pre>
  </p>
<% end %>
``` 

# 단계 12: Tesseract가 설치되어 있는지 확인하기

<div class="content-ad"></div>

시스템에 Tesseract OCR이 설치되어 있는지 확인해주세요. 다음 명령어를 사용하여 해당 프로그램을 설치할 수 있습니다. 운영 체제에 따라 다음과 같이 명령어를 입력해주세요:

```js
macOS:
brew install tesseract

Ubuntu:
sudo apt-get install tesseract-ocr
```

앱을 실행한 후에는 아래와 같은 결과가 나타납니다:

<img src="/assets/img/2024-07-02-HowIbuiltanOCRSystemwithRails_2.png" />

<div class="content-ad"></div>

텍스트에는 여전히 개선할 부분이 많이 있네요. 의견을 주시면 감사하겠습니다.

또한, 제 Github에서 전체 소스 코드를 확인해주세요: https://github.com/luizcg/ocr