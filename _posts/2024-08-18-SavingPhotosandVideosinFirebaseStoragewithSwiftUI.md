---
title: "SwiftUI로 Firebase Storage에 사진과 동영상 저장하기"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-18 11:50
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Saving Photos and Videos in Firebase Storage with SwiftUI"
link: "https://medium.com/@createapp1234/saving-photos-and-videos-in-firebase-storage-with-swiftui-ef40f527175f"
isUpdated: false
---


Firebase 스토리지에 사진과 비디오를 저장하는 것은 많은 모바일 애플리케이션에서 필요한 작업입니다. Firebase 스토리지는 대량의 데이터를 처리하기 위한 견고하고 확장 가능한 솔루션을 제공합니다. 이 기사에서는 SwiftUI 애플리케이션에 Firebase 스토리지를 통합하여 사진과 비디오를 업로드하는 프로세스를 안내합니다.

# 준비 사항

- Xcode 12 이상
- Firebase 콘솔에서 설정된 Firebase 프로젝트
- Swift 및 SwiftUI에 대한 기본 지식
- Xcode 프로젝트에 Firebase SDK 추가

# 단계 1: 프로젝트에 Firebase 설정하기

<div class="content-ad"></div>

먼저, iOS 프로젝트에 Firebase를 추가해야 합니다. Firebase를 설정하려면 다음 단계를 따르세요:

- Firebase 콘솔로 이동합니다.
- 새 프로젝트를 만들거나 기존 프로젝트를 선택합니다.
- Firebase 프로젝트에 iOS 앱을 추가하려면 iOS 아이콘을 클릭합니다.
- GoogleService-Info.plist 파일을 다운로드하고 Xcode 프로젝트에 추가하는 지침을 따릅니다.
- CocoaPods를 사용하여 Firebase SDK를 설치합니다. Podfile에 다음 줄을 추가합니다:

```js
pod 'Firebase/Storage'
```

- pod install을 실행하여 Firebase SDK를 설치합니다. 또는 Xcode 패키지를 통해 가져올 수 있습니다.

<div class="content-ad"></div>

# 단계 2: 앱에서 Firebase 초기화하기

AppDelegate 또는 메인 애플리케이션 파일에서 Firebase를 초기화하세요:

```js
import SwiftUI
import Firebase
```

```js
@main
struct YourApp: App {
    init() {
        FirebaseApp.configure()
    }
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
```

<div class="content-ad"></div>

# 단계 3: 사진 및 비디오 선택기 추가하기

UIImagePickerController를 사용하여 사용자가 사진과 비디오를 선택할 수 있도록 합니다. 이 컨트롤러를 감싸는 SwiftUI 뷰를 만듭니다.

```js
import SwiftUI
import UIKit
```

```js
struct ImagePicker: UIViewControllerRepresentable {
    class Coordinator: NSObject, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
        let parent: ImagePicker
        init(parent: ImagePicker) {
            self.parent = parent
        }
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let uiImage = info[.originalImage] as? UIImage {
                parent.selectedImage = uiImage
            }
            if let videoUrl = info[.mediaURL] as? URL {
                parent.selectedVideoUrl = videoUrl
            }
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
    @Environment(\.presentationMode) var presentationMode
    @Binding var selectedImage: UIImage?
    @Binding var selectedVideoUrl: URL?
    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }
    func makeUIViewController(context: UIViewControllerRepresentableContext<ImagePicker>) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        picker.mediaTypes = ["public.image", "public.movie"]
        return picker
    }
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: UIViewControllerRepresentableContext<ImagePicker>) {}
}
```

<div class="content-ad"></div>

# 단계 4: Firebase Storage에 업로드하기

Firebase Storage로 업로드하는 과정을 처리하는 함수를 만들어보세요.

```js
import FirebaseStorage
```

```js
class FirebaseManager: ObservableObject {
    private let storage = Storage.storage()
    func uploadImage(_ image: UIImage, completion: @escaping (URL?) -> Void) {
        guard let imageData = image.jpegData(compressionQuality: 0.8) else {
            completion(nil)
            return
        }
        let storageRef = storage.reference().child("images/\(UUID().uuidString).jpg")
        storageRef.putData(imageData, metadata: nil) { metadata, error in
            guard error == nil else {
                completion(nil)
                return
            }
            storageRef.downloadURL { url, error in
                completion(url)
            }
        }
    }
    func uploadVideo(_ videoUrl: URL, completion: @escaping (URL?) -> Void) {
        let storageRef = storage.reference().child("videos/\(UUID().uuidString).mov")
        storageRef.putFile(from: videoUrl, metadata: nil) { metadata, error in
            guard error == nil else {
                completion(nil)
                return
            }
            storageRef.downloadURL { url, error in
                completion(url)
            }
        }
    }
}
```

<div class="content-ad"></div>

# Step 5: SwiftUI 뷰에 통합하기

선택한 사진과 동영상을 업로드하기 위해 ImagePicker 및 FirebaseManager를 SwiftUI 뷰에 사용하세요.

```swift
struct ContentView: View {
    @State private var selectedImage: UIImage?
    @State private var selectedVideoUrl: URL?
    @State private var showImagePicker = false
    @ObservedObject private var firebaseManager = FirebaseManager()
```

```swift
    var body: some View {
        VStack {
            if let selectedImage = selectedImage {
                Image(uiImage: selectedImage)
                    .resizable()
                    .scaledToFit()
                    .frame(width: 300, height: 300)
            }
            if selectedVideoUrl != nil {
                Text("Video selected")
            }
            Button(action: {
                showImagePicker = true
            }) {
                Text("사진/동영상 선택")
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(8)
            }
            .sheet(isPresented: $showImagePicker) {
                ImagePicker(selectedImage: $selectedImage, selectedVideoUrl: $selectedVideoUrl)
            }
            if let image = selectedImage {
                Button(action: {
                    firebaseManager.uploadImage(image) { url in
                        if let url = url {
                            print("사진 업로드 완료: \(url)")
                        }
                    }
                }) {
                    Text("사진 업로드")
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.green)
                        .cornerRadius(8)
                }
            }
            if let videoUrl = selectedVideoUrl {
                Button(action: {
                    firebaseManager.uploadVideo(videoUrl) { url in
                        if let url = url {
                            print("동영상 업로드 완료: \(url)")
                        }
                    }
                }) {
                    Text("동영상 업로드")
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.green)
                        .cornerRadius(8)
                }
            }
        }
        .padding()
    }
}
```

<div class="content-ad"></div>

# 결론

위 단계를 따르면 Firebase Storage를 SwiftUI 애플리케이션에 통합하여 사진과 비디오를 업로드할 수 있습니다. 이 설정을 사용하면 Firebase의 강력한 저장 용량을 활용하면서 깔끔하고 효율적인 SwiftUI 코드베이스를 유지할 수 있습니다. Firebase Storage를 사용하면 앱이 대량의 데이터를 원활하게 처리할 수 있어 더 나은 사용자 경험을 제공할 수 있습니다.