---
title: "Spring Boot 파일 업로드, 다운로드 및 삭제하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-SpringBootFileUploadDownloadDelete_0.png"
date: 2024-07-07 22:02
ogImage: 
  url: /assets/img/2024-07-07-SpringBootFileUploadDownloadDelete_0.png
tag: Tech
originalTitle: "Spring Boot File Upload Download Delete"
link: "https://medium.com/@saijanand/spring-boot-file-upload-download-delete-94982145bea0"
isUpdated: true
---




이 문서는 문서 관리 시스템에 관한 모든 것입니다.

자세한 비디오를 확인하고 채널을 구독하여 우리 커뮤니티에 참여해보세요. 여러분의 지원은 저에게 큰 힘이 됩니다!

![](/assets/img/2024-07-07-SpringBootFileUploadDownloadDelete_0.png)

문서 관리 시스템(DMS)은 사용자가 PDF, 이미지, 텍스트 파일과 같은 다양한 종류의 문서를 업로드, 다운로드 및 관리할 수 있게 합니다. 시스템은 문서에 대한 안전하고 신뢰할 수 있는 저장 공간을 제공하며 효율적인 검색 및 관리 기능을 갖춰야 합니다.

<div class="content-ad"></div>

## 사용자

- 사용자: 시스템과 상호 작용하여 문서를 업로드, 다운로드 및 관리하는 사람.
- 관리자: 시스템에서 문서 및 사용자를 관리하는 추가 권한을 가진 사용자.

## 전제 조건

- 사용자는 문서를 업로드하거나 다운로드하려면 인증되어야 합니다.
- 시스템은 충분한 저장 공간과 적절한 디렉터리 권한이 있어야 합니다.
- 문서는 무단 액세스를 방지하기 위해 안전하게 저장되어야 합니다.

<div class="content-ad"></div>

## 사후 조건

- 업로드된 문서는 지정된 디렉토리에 저장됩니다.
- 다운로드된 문서는 지정된 디렉토리에서 검색되어 사용자에게 제공됩니다.
- 성공적 및 실패한 작업에 대한 적절한 응답이 반환됩니다.

# 사용 사례 시나리오

## 시나리오 1: 문서 업로드

<div class="content-ad"></div>

Primary Actor: 사용자

Trigger: 사용자가 업로드할 문서를 선택하고 응용 프로그램을 통해 제출합니다.

메인 성공 시나리오:

- 사용자가 문서를 선택하고 업로드 프로세스를 시작합니다.
- 시스템이 파일을 유효성 검사합니다 (예: 파일 크기, 파일 유형).
- 시스템이 파일을 지정된 업로드 디렉토리에 저장합니다.
- 시스템이 업로드를 확인하는 성공 메시지를 반환합니다.

<div class="content-ad"></div>

대체 플로우:

- 잘못된 파일 유형: 파일 유형이 허용되지 않으면 시스템이 오류 메시지를 반환합니다.
- 파일 크기 초과: 파일 크기가 최대 허용 크기를 초과하면 시스템이 오류 메시지를 반환합니다.
- 저장소 오류: 저장 문제로 파일을 저장할 수 없는 경우 시스템이 오류 메시지를 반환합니다.

## 시나리오 2: 문서 다운로드

기본 주체: 사용자

<div class="content-ad"></div>

Trigger: 특정 문서를 다운로드하라는 사용자 요청이 발생합니다.

주요 성공 시나리오:

- 사용자가 다운로드할 문서를 선택합니다.
- 시스템이 지정된 디렉토리에 문서의 존재 여부를 확인합니다.
- 시스템이 문서를 검색하여 사용자에게 전송합니다.
- 사용자가 문서를 수신합니다.

대체 흐름:

<div class="content-ad"></div>

- 파일을 찾을 수 없음: 요청된 문서가 존재하지 않으면 시스템이 오류 메시지를 반환합니다.
- 읽기 오류: 문서를 저장소에서 읽을 수 없는 경우 시스템이 오류 메시지를 반환합니다.

## 시나리오 3: 문서 삭제하기

주요 역할자: 관리자

발동: 관리자가 특정 문서를 삭제하도록 요청합니다.

<div class="content-ad"></div>

# 주요 성공 시나리오:

- 관리자가 삭제할 문서를 선택합니다.
- 시스템은 지정된 디렉토리에 문서의 존재를 확인합니다.
- 시스템은 문서를 삭제합니다.
- 시스템은 삭제가 확인된 성공 메시지를 반환합니다.

대체 흐름:

- 파일을 찾을 수 없음: 문서가 존재하지 않을 경우 시스템은 오류 메시지를 반환합니다.
- 삭제 오류: 문서를 삭제할 수 없는 경우 시스템은 오류 메시지를 반환합니다.

<div class="content-ad"></div>

```java
package com.javacodex.controller;

import com.javacodex.exception.FileStorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
@Slf4j
public class FileUploadController {

    @Value("${upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            Path directory = Paths.get(uploadDir);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            Path filePath = directory.resolve(file.getOriginalFilename());
            log.info("파일 경로: {}", filePath);
            Files.write(filePath, file.getBytes());

            return ResponseEntity.ok("파일이 성공적으로 업로드되었습니다: " + file.getOriginalFilename());
        } catch (IOException e) {
            throw new FileStorageException("파일 저장에 실패했습니다 " + file.getOriginalFilename(), e);
        }
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            log.info("다운로드 파일 경로: {}", fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new FileStorageException("파일을 읽을 수 없습니다: " + fileName);
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            throw new FileStorageException("파일 다운로드에 실패했습니다 " + fileName, e);
        }
    }

    @DeleteMapping("/delete/{fileName:.+}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            log.info("삭제할 파일 경로: {}", fileName);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return ResponseEntity.ok("파일이 성공적으로 삭제되었습니다: " + fileName);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("파일을 찾을 수 없습니다: " + fileName);
            }
        } catch (IOException e) {
            throw new FileStorageException("파일을 삭제하는 데 실패했습니다 " + fileName, e);
        }
    }
}
```

**파일 업로드 Controller (FileUploadController):**

- handleFileUpload: 파일 업로드를 처리하고 지정된 디렉토리에 파일을 저장하며 오류 발생 시 FileStorageException을 throw합니다.
- downloadFile: 파일 다운로드를 처리하고 지정된 디렉토리에서 파일을 검색하며 오류 발생 시 FileStorageException을 throw합니다.
- deleteFile: 파일 삭제를 처리하고 지정된 디렉토리에서 파일을 삭제하며 오류 발생 시 FileStorageException을 throw합니다.

이 구현은 적절한 오류 처리와 사용자 피드백을 제공하여 견고하고 유지 보수가 용이한 문서 관리 시스템을 보장합니다. 특정 요구 사항 및 환경에 따라 예외 메시지, 로깅 및 기타 구성을 조정하십시오.  

<div class="content-ad"></div>

```java
package com.javacodex.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<String> handleFileStorageException(FileStorageException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
    }
}
```

- Global Exception Handler (GlobalExceptionHandler): FileStorageException 및 기타 일반적인 예외를 잡아서 적절한 HTTP 상태 및 메시지를 반환합니다.

```java
package com.javacodex.exception;

public class FileStorageException extends RuntimeException {

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

사용자 정의 예외 (FileStorageException): 파일 작업과 관련된 오류를 처리합니다.

<div class="content-ad"></div>


업로드 디렉토리 = /경로/대상/업로드-디렉토리
spring.servlet.multipart.max-file-size = 10MB
spring.servlet.multipart.max-request-size = 10MB


고마워요, 계속 공부해요!

# 자바 코드 엑스

끝까지 읽어줘서 고마워요. 가기 전에:


<div class="content-ad"></div>

- 저자에게 박수를 보내주시고 팔로우를 부탁드립니다! 👏
- YouTube에서도 팔로우해주세요!

더 흥미로운 콘텐츠를 위해 팔로우해주세요

[Medium에서 팔로우하기](https://medium.com/@saijanand)