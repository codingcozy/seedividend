---
title: "KotlinJS external 로 객체 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "March 27, 2024  kotlinJS work"
link: "https://medium.com/@codespitz/march-27-2024-kotlinjs-work-6ab006be4fea"
---



제가 Kotlin에서 브라우저의 기본 JS 객체를 사용할 수 있도록 'external'을 사용하여 다양한 래핑을 만들었어요.

```js
external interface JsMap{
    fun has(key:dynamic):Boolean
    fun get(key:dynamic):dynamic
    fun set(key:dynamic, value:dynamic)
    fun delete(key:dynamic)
}

external interface JsArray<V:Any>{
    operator fun get(i:Int):V?
    operator fun set(i:Int, v:V)
    val length:Int
    fun push(vararg v:V)
    fun forEach(block:(V)->Unit)
    fun <TO:Any> map(block:(V)->TO):JsArray<TO>
    fun any(block:(V)->Boolean):Boolean
    fun all(block:(V)->Boolean):Boolean
    fun indexOf(v:V):Int
    fun filter(block:(V)->Boolean):JsArray<V>
    fun slice(start:Int, end:Int = definedExternally):JsArray<V>
    fun splice(start:Int, deleteCount:Int, vararg items:V):JsArray<V>
}

external interface JsObject{
    operator fun get(key:String):dynamic
    operator fun set(key:String, value:dynamic)
}
```

실제로 브라우저에 JsArray가 존재하지는 않지만, Kotlin이 인식할 수 있는 타입이 필요하기 때문에 선언되었어요. 실질적인 강점은 Kotlin 객체를 JS로 전달하거나 JS에서 Kotlin으로 객체를 받을 때 나타납니다.

```js
inline fun <K:Any, V:Any> Map<K, V>.toJsMap():JsMap
= js("new Map()").also {map->
    forEach {(k, v)-> map.set(k, v)}
} as JsMap

inline fun <K:Any, V:Any> Map<K, V>.toJsObject():JsObject
= js("Object.create(null)").also{obj->
    forEach{(k, v)->obj[k] = v}
} as JsObject

inline fun <V:Any> Iterable<V>.toJsArray():JsArray<V>
= js("[]").also {arr->
    forEachIndexed {index, v-> arr[index] = v}
}
```

<div class="content-ad"></div>

실제 변환 작업은 브라우저에서 자연스럽게 통합되도록 js(..) 함수를 통해 실제 JS 객체를 생성하여 수행됩니다.

JS 객체에 대한 확장 기능을 정의하는 것도 쉽습니다. 예를 들어, 'delete obj[key]'는 'Reflect.deleteProperty(obj, key)'로 대체할 수 있습니다. 이를 JsObject의 'delete' 확장 기능으로도 정의할 수 있습니다.

```js
external class Reflect{
    companion object {
        fun deleteProperty(target:Any, propertyKey:String):Boolean
    }
}

inline fun JsObject.delete(key:String):Boolean
= Reflect.deleteProperty(this, key)
```

마지막으로 살펴볼 사례는 Kotlin에서 인라인의 reified 기능을 사용하여 T 유형의 ::class를 키로 사용하는 Map을 생성하는 것이 일반적이라는 것입니다.

<div class="content-ad"></div>

```kotlin
val map: HashMap<KClass<*>, Int> = hashMapOf()

inline fun <reified T : Any> add(data: Int) {
    map[T::class] = data
}
```

만약 KClass 대신 고유 식별자 문자열을 사용하고 싶다면 qualifiedName을 사용할 수 있습니다. 이 속성은 일반적으로 동일한 응용 프로그램 도메인 내에서만 유효하기 때문에 충분한 식별을 제공합니다.

```kotlin
val map: HashMap<String, Int> = hashMapOf()

inline fun <reified T : Any> add(data: Int) {
    map[T::class.qualifiedName!!] = data
}
```

그러나 문제는 kotlinJS가 simpleName만 지원하고 qualifiedName은 지원하지 않는다는 것입니다. 한편, kotlinJS가 단일 스레드 환경에서 작동하기 때문에 동기화 문제가 없다는 장점을 살릴 수 있습니다.

<div class="content-ad"></div>

```kotlin
private var kClassId:Int = 0
private val kClassIdMap:HashMap<KClass<*>, String> = hashMapOf()

val <T:Any> KClass<T>.id:String
  get() = kClassIdMap.getOrPut(this){"$simpleName|${kClassId++}"}
```

위의 코드는 각 KClass마다 고유한 식별자를 만들어 simpleName에 고유한 숫자 ID를 추가합니다. 이를 위해 KClass에 'id'라는 확장 속성을 사용하여 하나의 KClass에 대해 한 번만 고유한 식별자가 생성되도록 합니다.

이를 활용하여 위의 예제를 다음과 같이 수정할 수 있습니다.

```kotlin
val map:HashMap<String, Int> = hashMapOf()

inline fun <reified T:Any> add(data:Int){
    map[T::class.id] = data
}
```

<div class="content-ad"></div>

오늘의 기록은 여기까지에요.
