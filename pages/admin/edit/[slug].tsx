import { useState } from "react";
import { useRouter } from "next/router";
import { getPostCategories, getPosts } from "@/lib/api";
import CustomHead from "@/components/CustomHead";
import useAdminAuth from "@/hooks/useAdminAuth";
import PostEditor from "@/components/PostEditor";
import PostType from "@/interfaces/post";

type Props = {
  post: PostType;
  categoryList: string[];
};

export default function EditPost({ post, categoryList }: Props) {
  // 관리자 권한 체크
  const { isAuthorized, isLoading } = useAdminAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 제출 처리
  const handleSubmit = async (postData: {
    title: string;
    content: string;
    category: string;
    description: string;
    coverImage: string;
    tags: string;
  }) => {
    setIsSubmitting(true);

    try {
      // 사용자 확인 추가 - 수정을 확실히 할 것인지 확인
      const confirmUpdate = window.confirm("포스트를 수정하시겠습니까?");
      if (!confirmUpdate) {
        setIsSubmitting(false);
        return;
      }

      const submitData = {
        ...postData,
        slug: post.slug,
        tags: "",
        date: post.date,
      };

      // 네트워크 요청 시 타임아웃 설정을 위한 컨트롤러
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

      const response = await fetch(`http://localhost:3001/api/update-post?slug=${post.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // 타임아웃 해제

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "포스트 수정에 실패했습니다.");
      }

      alert("포스트가 성공적으로 수정되었습니다.");
      router.push("/admin");
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!isAuthorized) {
    return <div>접근 권한이 없습니다</div>;
  }

  if (router.isFallback) {
    return <div>포스트를 불러오는 중...</div>;
  }

  return (
    <>
      <CustomHead type="home" />
      <PostEditor
        initialTitle={post?.title || ""}
        initialContent={post?.content || ""} // 마크다운 원본을 그대로 사용
        initialCategory={post?.category || categoryList[0] || ""}
        initialDescription={post?.description || ""}
        initialCoverImage={post?.coverImage || ""}
        categoryList={categoryList}
        onSubmit={handleSubmit}
        submitButtonText="수정 완료"
        isSubmitting={isSubmitting}
      />
    </>
  );
}

// getStaticPaths로 편집 가능한 포스트 경로 생성
export async function getStaticPaths() {
  // 개발 환경에서는 빌드 타임에 모든 경로를 미리 생성하지 않고 필요할 때 생성
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const [post]: any = await getPosts({
      file: params.slug,
      fields: [
        "title",
        "description",
        "date",
        "slug",
        "author",
        "content",
        "ogImage",
        "coverImage",
        "date",
        "tag",
        "readingTime",
        "category",
      ],
    });

    const categoryList = await getPostCategories();

    return {
      props: {
        post,
        categoryList,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${params.slug}:`, error);
    return {
      notFound: true,
    };
  }
}
