---
title: "안드로이드에서 전체 텍스트 검색 Room과 FTS4 통합하는 방법"
description: ""
coverImage: "/assets/img/2024-08-03-Full-TextSearchinAndroidIntegratingFTS4withRoom_0.png"
date: 2024-08-03 18:57
ogImage: 
  url: /assets/img/2024-08-03-Full-TextSearchinAndroidIntegratingFTS4withRoom_0.png
tag: Tech
originalTitle: "Full-Text Search in Android Integrating FTS4 with Room"
link: "https://medium.com/@ccansuccanturk/fts4-full-text-search-in-android-273366e488ae"
isUpdated: true
---





![image](/assets/img/2024-08-03-Full-TextSearchinAndroidIntegratingFTS4withRoom_0.png)

## FTS4이란?

FTS4는 SQLite의 기능으로, 전체 텍스트 검색 기능을 제공합니다. 대량의 텍스트 데이터베이스에 특히 유용하게 사용할 수 있도록 신속하고 효율적인 텍스트 검색을 가능하게 합니다. FTS4는 SQLite에서 텍스트 인덱스를 생성하고 이러한 인덱스를 통해 신속한 검색을 수행합니다.

전통적인 방법에서는 전체 텍스트 검색을 SQL 쿼리에서 LIKE 연산자를 사용하여 수행합니다. 이 방법은 대규모 데이터셋에 대해 느리고 비효율적일 수 있습니다.


<div class="content-ad"></div>

```js
SELECT * FROM notes WHERE content LIKE '%meeting%' AND content LIKE '%agenda%';
```

단점:

- 성능: 대규모 데이터셋에서 LIKE 쿼리는 느립니다.
- 정확성 문제: 철자가 틀린 혹은 불완전한 단어는 일치하지 않을 수 있습니다.
- 유연성 부족: 복잡한 논리 연산이 제한됩니다.

# FTS4으로 검색하기:

<div class="content-ad"></div>

예시: "meeting"과 "agenda"를 포함하는 노트를 찾으려면:

```js
SELECT * FROM notes WHERE notes MATCH 'meeting AND agenda';
```

## FTS4 사용의 장점

- 효율적인 검색: FTS4는 텍스트 데이터를 색인화하여 대량 데이터 세트 전체를 빠르게 검색할 수 있어서, 기존의 SQL LIKE 쿼리보다 훨씬 빠릅니다.
- 복잡한 쿼리: AND 및 OR과 같은 연산자를 사용하여 복잡한 쿼리를 수행할 수 있어서 더 구체적인 검색이 가능합니다.
- 쉬운 통합: SQLite 및 Room과 쉽게 통합할 수 있습니다.
- 자연어 처리: FTS4는 자연어 입력을 다룰 수 있으며, 어간 및 변형 단어를 인식하여 의미 있는 정확한 검색 결과를 제공합니다.

<div class="content-ad"></div>

# 안드로이드에서 Room과 함께 FTS4 사용하는 방법

안드로이드에서 Room과 FTS4를 통합하려면 엔터티, DAO 및 데이터베이스를 올바르게 설정하는 여러 단계가 필요합니다.

## 1. 필요한 종속성 추가

FTS4를 지원하는 최신 Room 라이브러리가 안드로이드 프로젝트에 포함되어 있는지 확인하세요:

<div class="content-ad"></div>

```js
의존성 {
    def room_version = "2.6.1" // 최신 버전인지 확인하세요

    implementation "androidx.room:room-runtime:$room_version"
    annotationProcessor "androidx.room:room-compiler:$room_version"
    // 코틀린 프로젝트의 경우, annotationProcessor 대신 kapt를 사용하세요
    kapt "androidx.room:room-compiler:$room_version"
}
```

## 2. 엔터티 정의

FTS4를 위한 적절한 어노테이션을 사용하여 엔터티 클래스를 정의하세요:

```js
@Entity(tableName = "notes")
@Fts4
data class Note(
    @PrimaryKey
    @ColumnInfo(name = "rowid")
    var id: Int = 0,
    val content: String
)
```

<div class="content-ad"></div>

## 3. DAO 생성

주석을 삽입하고 노트를 추가하고 검색 쿼리를 실행하는 메서드가 있는 DAO 인터페이스를 만들어보세요:

```kotlin
@Dao
interface NoteDao {
    @Insert
    suspend fun insert(note: Note)

    @Query("SELECT rowid, content FROM notes WHERE notes MATCH :query")
    suspend fun search(query: String): List<Note>

    @Query("DELETE FROM notes")
    suspend fun deleteAll()
}
```

## 4. 데이터베이스 설정

<div class="content-ad"></div>

아래와 같이 Room 데이터베이스를 설정하여 DAO 및 엔티티를 사용할 수 있도록 합니다:

```kotlin
@Database(entities = [Note::class], version = 1)
abstract class NoteDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao

    companion object {
        @Volatile
        private var INSTANCE: NoteDatabase? = null

        fun getDatabase(context: Context): NoteDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    NoteDatabase::class.java,
                    "note_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
```

## 5. FTS4를 활용한 전체 텍스트 검색 수행

MainActivity에서 샘플 노트를 삽입하고 검색 쿼리를 수행하세요.

<div class="content-ad"></div>

```kotlin
class MainActivity : ComponentActivity() {

    private lateinit var db: NoteDatabase
    private lateinit var noteDao: NoteDao
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        db = NoteDatabase.getDatabase(this)
        noteDao = db.noteDao()

        lifecycleScope.launch {
            withContext(Dispatchers.IO) {
                // 모든 노트 삭제
                noteDao.deleteAll()

                // 샘플 노트 삽입
                noteDao.insert(Note(content = "컴포즈에 관한 샘플 노트입니다"))
                noteDao.insert(Note(content = "Room 데이터베이스는 안드로이드 개발에 좋습니다"))
                noteDao.insert(Note(content = "FTS4는 빠른 전체 텍스트 검색을 지원합니다"))
                noteDao.insert(Note(content = "Kotlin은 현대적인 프로그래밍 언어입니다"))

                // AND 검색 실행
                val andQuery = "\"현대\" \"언어\""
                val andResults = noteDao.search(andQuery)
                andResults.forEach { result ->
                    println("AND 검색 결과: ${result.content}")
                }

                // OR 검색 실행
                val orQuery = "샘플 OR Kotlin"
                val orResults = noteDao.search(orQuery)
                orResults.forEach { result ->
                    println("OR 검색 결과: ${result.content}")
                }
            }
        }
    }
}
```

결과는 다음과 같습니다:

<img src="/assets/img/2024-08-03-Full-TextSearchinAndroidIntegratingFTS4withRoom_1.png" />

# 결론


<div class="content-ad"></div>

요약하자면, 안드로이드 애플리케이션에서 Room과 함께 FTS4를 사용하면 전체 텍스트 검색을 구현하는 데 매우 효율적인 솔루션을 제공합니다. 전통적인 LIKE 쿼리와 비교하면 FTS4는 뛰어난 성능과 순위 매기기 및 토큰화와 같은 고급 검색 기능을 제공합니다. FTS4를 Room과 통합함으로써 개발자는 Room의 추상화 계층의 간편함을 유지하면서 더 빠르고 정확한 검색 결과를 얻을 수 있습니다. 이 조합은 전체 사용자 경험을 향상시켜 로버스트하고 효율적인 텍스트 검색 기능이 필요한 애플리케이션에 우수한 선택지가 됩니다.