---
title: "데이터 보안 Databricks의 열 수준 암호화"
description: ""
coverImage: "/assets/img/2024-05-15-DataSecurityColumnLevelEncryptioninDatabricks_0.png"
date: 2024-05-15 03:31
ogImage: 
  url: /assets/img/2024-05-15-DataSecurityColumnLevelEncryptioninDatabricks_0.png
tag: Tech
originalTitle: "Data Security: Column Level Encryption in Databricks"
link: "https://medium.com/@oindrila-chakraborty88/data-security-column-level-encryption-in-databricks-c8745740d759"
isUpdated: true
---




데이터 보안은 모든 데이터 엔지니어링 플랫폼에서 중요한 개념 중 하나입니다. 대부분의 기업들은 데이터 플랫폼의 보안 기능을 구현하기 위해 많은 비용을 투자합니다.

# 왜 데이터 보안이 중요한가요?

- 민감한 정보 보호: 먼저, 민감한 정보를 보호해야 합니다. Databricks는 대량의 데이터를 저장하고 처리하는 데 사용됩니다. 그 중에는 금융 데이터, 개인 정보 또는 지적 재산과 같이 민감한 정보가 포함될 수 있습니다. 그러므로, 민감한 정보가 "무단 접근", "도난" 또는 "남용"으로부터 보호되도록 하는 것이 중요합니다.
- 규정 준수: 대부분의 산업은 "규정 준수"와 같은 일정한 규제를 따릅니다. 그러한 "규정"은 민감한 데이터의 생산을 강제합니다. 이러한 "규정"을 준수하면 법적 제재를 피하는 데 도움이 됩니다.
- 데이터 침해 방지: 데이터 침해는 "재정적 손실", "계산적 피해" 또는 "법적 책임"을 포함한 심각한 결과를 초래할 수 있습니다. 적절한 데이터 보안 조치를 통해 데이터 침해를 예방하고 영향을 최소화할 수 있습니다.
- 고객과의 신뢰 유지: 고객과의 신뢰를 유지하는 것은 어떤 비즈니스에게 가장 중요한 부분 중 하나입니다. 고객과 클라이언트는 그들의 데이터를 기업에 신뢰합니다. 고객 데이터가 안전하다는 것을 보장하는 것은 그들의 신뢰를 유지하고 장기적인 관계를 유도하는 데 중요합니다.

# Databricks 보안 기능



Databricks는 다음과 같은 보안 기능을 제공하여 Databricks 플랫폼에 저장되고 처리되는 데이터의 보안과 개인 정보 보호를 보장합니다 -

- 휴식 시 암호화
- 이동 중 암호화
- 역할 기반 액세스 제어
- 다중 인증 요소
- 감사 로깅

# 열 수준 휴식 중 암호화

Delta Lake가 개발되거나 Databricks 내에서 데이터 웨어하우징 솔루션이 구축될 때마다 데이터를 "열 수준"에서 "암호화"할 수 있습니다.



## 단계 1: 델타 테이블 만들기

```js
from delta.tables import *

DeltaTable.create(spark)\
  .tableName("tbl_Person")\
  .addColumn("Person_Id", "INT")\
  .addColumn("Person_Name", "STRING")\
  .addColumn("Person_Adhar_No", "STRING")\
  .execute()
```

델타 테이블에서 "Person_Adhar_No" 열에는 민감한 정보, 즉 PII(개인 식별 정보)가 포함될 것입니다. 따라서 이 특정 열에 보안이 강제됩니다.

## 단계 2: PII 데이터를 델타 테이블에 삽입하기



```js
%sql
INSERT INTO tbl_Person VALUES(101, "Oindrila Chakraborty", "123456789012");
INSERT INTO tbl_Person VALUES(102, "Soumyajyoti Bagchi", "234567890123");
INSERT INTO tbl_Person VALUES(103, "Abhirup Chakraborty", "345678901234");
INSERT INTO tbl_Person VALUES(104, "Souvik Roy", "456789012345");
```

## Step 3: View Data of the Delta Table

```js
%sql
SELECT * FROM tbl_person;
```

Output -



<img src="/assets/img/2024-05-15-DataSecurityColumnLevelEncryptioninDatabricks_0.png" />

## 단계 4: "cryptography" Python 라이브러리 설치

테이블의 데이터를 쿼리할 때 민감한 정보가 그대로 표시됩니다. 이는 PII 데이터가 오용될 수 있는 보안 위협입니다.

민감한 정보, 즉 PII(개인 식별 정보)가 그대로 표시되는 것을 방지하기 위해 "Cryptography"를 사용할 수 있습니다.



파이썬 라이브러리인 "cryptography"를 설치해야 합니다.

```js
pip install cryptography
```

## 단계 5: "cryptography" Python 라이브러리의 "Fernet" 라이브러리를 사용하여 암호화/복호화 키 생성

"암호화" Python 라이브러리 내부에 있는 "Fernet"라는 라이브러리를 사용해야 합니다. 
"Fernet" 라이브러리에는 "generate_key()", "encrypt()", "decrypt()" 등 여러 메서드가 있습니다.



이제 먼저 "암호화 키"를 생성해야 합니다. 이 키를 사용하여 데이터를 "암호화"하거나 "복호화"할 수 있습니다.

```js
from cryptography.fernet import Fernet

key = Fernet.generate_key()
k = Fernet(key)
```

위 코드는 "암호화 키"를 생성하고 "k"라는 변수에 저장합니다.

## 단계 6: 델타 테이블의 PII 데이터를 암호화하는 UDF 생성



Delta Table "tbl_person"의 열인 "Person_Adhar_No"에서 PII 데이터를 받아 들이는 "encrypt_data"라는 UDF를 작성해 보겠습니다. 그리고 생성된 "암호화 키"도 받아들입니다. 그런 다음, 이 UDF는 수신된 데이터에 대해 암호화를 적용하기 위해 라이브러리 "Fernet"의 "encrypt ()" 함수를 호출할 것입니다.

```python
def encrypt_data(data, key):
    from cryptography.fernet import Fernet
    k = Fernet(key)

    data_in_byte = bytes(data, "utf-8")
    encrypted_data = k.encrypt(data_in_byte)
    encrypted_data = str(encrypted_data.decode("ascii"))

    return encrypted_data
```

## 단계 7: 델타 테이블의 암호화된 PII 데이터를 복호화하는 UDF 생성

델타 테이블의 열 "Person_Adhar_No"에서 이미 암호화된 PII 데이터를 받아 들이는 다른 UDF를 만들어 보겠습니다. 그리고 생성된 "암호화 키"도 받아들입니다. 그런 다음, 이 UDF는 이미 암호화된 데이터를 복호화하기 위해 라이브러리 "Fernet"의 "decrypt ()" 함수를 호출할 것입니다.




```js
def decrypt_data(encrypted_data, key):
  from cryptography.fernet import Fernet
  k = Fernet(key)

  decrypted_data = k.decrypt(encrypted_data.encode()).decode()

  return decrypted_data
```

## 단계 8: 생성한 UDF 등록하기

데이터프레임에서 생성한 UDF를 사용하려면 해당 UDF를 등록해야합니다.

UDF를 등록하려면 UDF를 사용하는 "함수(udf())"를 사용해야합니다. 이 함수는 생성한 UDF의 "이름"과 UDF가 수용하는 "매개변수의 데이터 유형"을 입력해야합니다.



```js
from pyspark.sql.types import StringType

encrypt_func = udf(encrypt_data, StringType())
decrypt_func = udf(decrypt_data, StringType())
```

## 단계 9: 민감한 데이터 암호화

이 예제에서는 먼저 Delta 테이블 "tbl_person"을 기반으로 DataFrame을 만듭니다.
이제 생성된 DataFrame에 "adhar_encrypted"라는 추가 열이 추가됩니다. 이를 위해 "등록된 UDF 함수"인 "encrypt_func"이 호출됩니다.
"등록된 UDF 함수"인 "encrypt_func"은 생성된 DataFrame의 "Person_Adhar_No" 열과 생성된 "Encryption Key"를 인수로 받습니다.
마지막으로 "암호화된 DataFrame"인 "encrypted_df"를 표시합니다.

```js
from pyspark.sql.functions import *

df = spark.table("tbl_person")
encrypted_df = df.withColumn("adhar_encrypted", encrypt_func("Person_Adhar_No", lit(key)))
display(encrypted_df)
```



아래 이미지에서 볼 수 있듯이, 실제 값은 "Person_Adhar_No" 열에 존재하고, 암호화된 값은 "adhar_encrypted" 열에 있습니다.

## 단계 10: 이미 암호화된 민감한 데이터 복호화하기



델타 테이블의 일부 사용자는 원본 데이터를 볼 필요가 있습니다. 따라서 이미 암호화된 데이터를 동일한 "암호화 키"를 사용하여 복호화해야 합니다.

이 예시에서는 "암호화된 DataFrame"인 "encrypted_df"에 또 다른 열인 "adhar_decrypted"가 추가되어 최종 "복호화된 DataFrame"인 "decrypted_df"가 생성됩니다. 이를 위해 "등록된 UDF 함수"인 "decrypt_func"이 호출될 것입니다. "등록된 UDF 함수"인 "decrypt_func"은 "암호화된 DataFrame"인 "encrypted_df"의 열 "adhar_encrypted"와 생성된 "암호화 키"를 매개변수로 받을 것입니다. 마지막으로 "복호화된 DataFrame"인 "decrypted_df"를 표시하세요.

```js
decrypted_df = encrypted_df.withColumn("adhar_decreypted", decrypt_func("adhar_encrypted", lit(key)))
display(decrypted_df)
```

결과 -



위 이미지를 보면 "Person_Adhar_No" 열에 실제 값이 존재하고, "adhar_encrypted" 열에 암호화된 값이 있음을 확인할 수 있습니다. 그리고 "adhar_encrypted" 열의 복호화된 값은 "adhar_decrypted" 열에 있으며, 이 값은 실제 값과 동일합니다.