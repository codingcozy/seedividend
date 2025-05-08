import { useState } from "react";
import { useRouter } from "next/router";
import { getPostCategories } from "@/lib/api";
import CustomHead from "@/components/CustomHead";
import useAdminAuth from "@/hooks/useAdminAuth";
import PostEditor from "@/components/PostEditor";

type Props = {
  categoryList: string[];
};

export default function CreatePost({ categoryList }: Props) {
  const router = useRouter();
  const { isAuthorized, isLoading } = useAdminAuth();
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
      // 한글을 포함한 슬러그 생성
      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9가-힣\s]/gi, "") // 영문, 숫자, 한글, 공백만 허용
        .replace(/\s+/g, "-");

      const submitData = {
        ...postData,
        slug,
        tags: postData.tags.split(" ").filter((tag) => tag.startsWith("#")),
        date: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3001/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "포스트 생성에 실패했습니다.");
      }

      alert("포스트가 성공적으로 생성되었습니다.");
      router.push("/admin");
    } catch (err) {
      console.error("Error creating post:", err);
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

  return (
    <>
      <CustomHead type="home" />
      <PostEditor
        initialTitle=""
        initialContent=""
        initialCategory={categoryList[0] || ""}
        initialDescription=""
        initialCoverImage=""
        initialTags=""
        categoryList={categoryList}
        onSubmit={handleSubmit}
        submitButtonText="완료"
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export async function getStaticProps() {
  const categoryList = await getPostCategories();

  return {
    props: {
      categoryList,
    },
  };
}
