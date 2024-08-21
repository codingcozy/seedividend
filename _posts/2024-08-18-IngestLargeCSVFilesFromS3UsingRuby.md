---
title: "루비를 사용하여 S3에서 대용량 CSV 파일 가져오는 방법"
description: ""
coverImage: "/assets/img/2024-08-18-IngestLargeCSVFilesFromS3UsingRuby_0.png"
date: 2024-08-18 11:40
ogImage:
  url: /assets/img/2024-08-18-IngestLargeCSVFilesFromS3UsingRuby_0.png
tag: Tech
originalTitle: "Ingest Large CSV Files From S3 Using Ruby"
link: "https://medium.com/@ascourter/ingest-large-csv-files-from-s3-using-ruby-7113cd3d3142"
isUpdated: true
updatedAt: 1724032773426
---

최근에 루비 온 레일즈 앱에서 우리의 데이터 수집 프로세스를 조정해야 하는 문제를 겪었습니다. 처음에 작성된 코드는 S3 버킷에서 원래 구축되어 있던 것보다 훨씬 큰 파일을 읽어들이는 것에 도전했습니다.

![이미지](/assets/img/2024-08-18-IngestLargeCSVFilesFromS3UsingRuby_0.png)

저는 큰 파일을 처리하는 데 시간이 걸리고 흥미로운 코드가 필요하다는 경험을 했습니다. 그 경험을 공유하고 싶어졌습니다.

# 시작하는 코드

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

여기에 처음에 시작한 내용입니다:

```js
class Record < ApplicationRecord
end

class LoadFile
    def perform(file_name:)
        Record.transaction do
            Record.delete_all

            data = S3Client.get_object(bucket: "BUCKET", key: file_name).body

            CSV.parse(data).each_with_index do |line|
                Record(
                    data_1: line[0].strip,
                    data_2: line[1].strip,
                    data_3: line[2].strip,
                ).save!
            end

            rescue e -> Exception
              raise "Issue with record at #{index}"
            end
        end
    end
end
```

여기에는 정말 특별한 것이 없습니다. 우리는 file_name을 받아들이고(이는 파일의 전체 경로입니다, 예: "folder/big_file.csv"), 그런 다음 모든 레코드를 삭제합니다(매일 완전한 파일 로드를 받습니다). 그런 다음 S3로부터 파일을 가져와 데이터를 CSV 구문 분석한 다음 데이터베이스에 레코드를 삽입합니다.

만약 문제가 발생하면 모든 변경 사항이 롤백되도록 트랜잭션에 모든 것을 감쌉니다.

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

# 문제

처음에는 약 10,000 라인이 포함된 소/중형 파일을 읽었습니다.

지금은 훨씬 큰 파일(10,000,000 라인)을 읽어야 하는 상황이 되었습니다.

전체 파일을 메모리에 로드하다 보니 이 프로세스가 크래시되고 실행 중인 컨테이너가 갑자기 멈췄습니다.

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

스트리밍으로 전환하거나 파일을 청크로 읽어들여서 컨테이너의 CPU 및 메모리 제한에 도달하지 않도록 조정해야 했어요.

![이미지](/assets/img/2024-08-18-IngestLargeCSVFilesFromS3UsingRuby_1.png)

# 솔루션 평가

우리의 기준이 무엇인지 파악하고 해결책이 더 나은지 테스트할 수 있도록 프로파일링을 추가해야 했어요.

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

여러 가지 다른 젬(예: ruby prof)을 사용하여이 작업을 수행하는 몇 가지 방법이 있습니다.

파일을 읽는 것에 대한 유사한 테스트를 실행하기 위해 Benchmark를 사용하는이 문서를 찾았으며, 우리의 코드를 측정하는 데 사용할 수있는 프로필 설정을 사용했습니다.

따라서 원래 파일의 맨 위에이 코드를 추가했습니다:

```js
require 'benchmark'

def profile_memory
  memory_usage_before = `ps -o rss= -p #{Process.pid}`.to_i
  yield
  memory_usage_after = `ps -o rss= -p #{Process.pid}`.to_i

  used_memory = ((memory_usage_after - memory_usage_before) / 1024.0).round(2)
  puts "Memory usage: #{used_memory} MB"
end

def profile_time
  time_elapsed = Benchmark.realtime do
    yield
  end

  puts "Time: #{time_elapsed.round(2)} seconds"
end

def profile_gc
  GC.start
  before = GC.stat(:total_freed_objects)
  yield
  GC.start
  after = GC.stat(:total_freed_objects)

  puts "Objects Freed: #{after - before}"
end

def profile
  profile_memory do
    profile_time do
      profile_gc do
        yield
      end
    end
  end
end
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

우리 방법 주변에 프로필을 추가했습니다:

```js
class LoadFile
    def perform
      profile do
        Record.transaction do
          ...
        end
      end
    end
end
```

그리고 이제 우리는 기준을 결정하기 위해 잘 정리된 파일을 사용하여 원래 코드를 실행할 수 있습니다.

# Amazon S3 클라이언트에서 청크 사용

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

한 가지 방법은 S3를 사용하여 파일을 메모리로 모두 로드하는 대신 청크로 스트리밍하는 것입니다.

이 해결책을 사용하면 한꺼번에 매우 큰 파일을 메모리로 로드하지 않고 컨테이너의 한계에 도달하지 않을 수 있었습니다.

```js
class LoadFile
    def perform(file_name:)
      line_count = 0
      remaining_string = ""
      Record.transaction do
          Record.delete_all

          ::Aws::S3::Client.new.get_object(
            bucket: "BUCKET",
            key: file_name
          ) do |chunk|
              chunk = remaining_string + chunk
              remaining_string = ""
              lines, remaining_string = if chunk.end_with?("\n")
                [chunk.split("\n"), ""]
              else
                parts = chunk.rpartition("\n")
                remaining_string += parts.last
                [parts.first.split("\n"), remaining_string]
              end

              lines.each do |line|
                line_count += 1
                next if line_count == 1

                CSV.parse(line)&.first do |line|
                    Record(
                        data_1: line[0].strip,
                        data_2: line[1].strip,
                        data_3: line[2].strip,
                    ).save!
                end
              end
          rescue e -> Exception
            raise "Issue with record at #{index}"
          end
        end
    end
end
```

# 결론

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

이 솔루션을 마침내 작동하게 하는 데 시간이 걸렸기 때문에, 나중에 누군가에게 도움이 될 수 있도록 공유하고 싶었습니다. 결과적으로 성능을 더 향상시키기 위해 추가로 원시 SQL을 사용하는 변경을 가했습니다.

더 나은 또는 대체 솔루션이 있다면 공유해 주시면 감사하겠습니다!

읽어 주셔서 감사합니다!

이와 같은 주제를 즐기신다면 제 YouTube 채널도 마음에 드실 것입니다. 좋은 하루 되세요!
