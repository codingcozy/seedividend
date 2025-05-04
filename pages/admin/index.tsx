import { useRouter } from "next/router";
import { getPostCategories, getPosts } from "@/lib/api";
import Header from "@/components/Header";
import style from "./admin.module.scss";
import classnames from "classnames/bind";
import PostType from "@/interfaces/post";
import CustomHead from "@/components/CustomHead";
import { SITE_NAME } from "@/lib/constants";
import { useState } from "react";
import Link from "next/link";

const cx = classnames.bind(style);

type Props = {
  categoryList: string[];
  allPosts: PostType[];
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ allPosts, categoryList }: Props) {
  const router = useRouter();
  const title = `${SITE_NAME} | Post`;
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [deletingPosts, setDeletingPosts] = useState<string[]>([]);
  const [posts, setPosts] = useState<PostType[]>(allPosts);
  const [isPublishing, setIsPublishing] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const toggleSelectPost = (slug: string) => {
    if (selectedPosts.includes(slug)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== slug));
    } else {
      setSelectedPosts([...selectedPosts, slug]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map((post) => post.slug));
    }
  };

  const handleTitleClick = (slug: string) => {
    router.push(`/post/${slug}/`);
  };

  const handleDeletePost = async (slug: string) => {
    if (window.confirm("정말로 이 포스트를 삭제하시겠습니까?")) {
      try {
        // Add the post to the deleting state
        setDeletingPosts((prev) => [...prev, slug]);

        // Updated API endpoint
        const response = await fetch(`http://localhost:3001/api/delete-post?slug=${slug}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete post");
        }

        const result = await response.json();
        console.log("Delete result:", result);

        // Update the posts list after deletion
        setPosts(posts.filter((post) => post.slug !== slug));

        // If the post was selected, remove it from selected posts
        if (selectedPosts.includes(slug)) {
          setSelectedPosts(selectedPosts.filter((id) => id !== slug));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(`포스트 삭제 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
      } finally {
        // Remove the post from the deleting state
        setDeletingPosts((prev) => prev.filter((id) => id !== slug));
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 포스트를 선택해주세요.");
      return;
    }

    if (window.confirm(`선택한 ${selectedPosts.length}개의 포스트를 삭제하시겠습니까?`)) {
      // We'll delete one by one to ensure we handle each properly
      let successCount = 0;
      let failCount = 0;

      for (const slug of selectedPosts) {
        try {
          setDeletingPosts((prev) => [...prev, slug]);

          // Updated API endpoint
          const response = await fetch(`http://localhost:3001/api/delete-post?slug=${slug}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete post");
          }

          successCount++;

          // Remove the post from the deleting state
          setDeletingPosts((prev) => prev.filter((id) => id !== slug));
        } catch (error) {
          failCount++;
          console.error(`Error deleting post ${slug}:`, error);

          // Remove the post from the deleting state
          setDeletingPosts((prev) => prev.filter((id) => id !== slug));
        }
      }

      // Update the posts list after deletion
      setPosts(posts.filter((post) => !selectedPosts.includes(post.slug)));

      // Clear selected posts
      setSelectedPosts([]);

      alert(`${successCount}개 포스트가 삭제되었습니다. ${failCount > 0 ? `${failCount}개 포스트 삭제 실패.` : ""}`);
    }
  };

  const handlePublish = async () => {
    if (window.confirm("블로그를 발행하시겠습니까?")) {
      try {
        setIsPublishing(true);

        const response = await fetch("http://localhost:3001/api/publish-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to publish blog");
        }

        const result = await response.json();
        alert("블로그가 성공적으로 발행되었습니다.");
        console.log("Publish result:", result);
      } catch (error) {
        console.error("Error publishing blog:", error);
        alert(`블로그 발행 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
      } finally {
        setIsPublishing(false);
      }
    }
  };

  const isDeleting = (slug: string) => deletingPosts.includes(slug);

  return (
    <>
      {router.isFallback ? (
        " Loading…"
      ) : (
        <>
          <CustomHead type="home" />
          <div className={cx("container", "-list")}>
            <Header postList={posts} categoryList={categoryList} />
            <div className={cx("inner")}>
              <div className={cx("admin_actions")}>
                <button onClick={handlePublish} className={cx("publish_btn")} disabled={isPublishing}>
                  {isPublishing ? "발행 중..." : "발행"}
                </button>
                <Link href="/admin/create" className={cx("create_btn")}>
                  새 포스트 작성
                </Link>

                {selectedPosts.length > 0 && (
                  <button
                    className={cx("bulk_delete_btn")}
                    onClick={handleDeleteSelected}
                    disabled={deletingPosts.length > 0}
                  >
                    선택한 포스트 삭제 ({selectedPosts.length})
                  </button>
                )}
              </div>

              <div className={cx("post_list_header")}>
                <div className={cx("checkbox_cell")}>
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === posts.length && posts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </div>
                <div className={cx("title_cell")}>제목</div>
                <div className={cx("actions_cell")}>작업</div>
              </div>
              <div className={cx("post_list")}>
                {posts.map((post) => (
                  <div key={post.slug} className={cx("post_item")}>
                    <div className={cx("checkbox_cell")}>
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.slug)}
                        onChange={() => toggleSelectPost(post.slug)}
                        disabled={isDeleting(post.slug)}
                      />
                    </div>
                    <div className={cx("title_cell")}>
                      <Link href={`/post/${post.slug}`} className={cx("title_link")}>
                        {post.title}
                      </Link>
                      <div className={cx("post_meta")}>
                        <span className={cx("post_category")}>{post.category}</span>
                        <span className={cx("separator")}>•</span>
                        <span className={cx("post_date")}>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <div className={cx("actions_cell")}>
                      <button
                        className={cx("action_btn", "edit")}
                        onClick={() => router.push(`/admin/edit/${post.slug}`)}
                        disabled={isDeleting(post.slug)}
                      >
                        수정
                      </button>
                      <button
                        className={cx("action_btn", "delete")}
                        onClick={() => handleDeletePost(post.slug)}
                        disabled={isDeleting(post.slug)}
                      >
                        {isDeleting(post.slug) ? "삭제 중..." : "삭제"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {posts.length === 0 && <div className={cx("no_posts")}>포스트가 없습니다.</div>}
            </div>
          </div>
        </>
      )}
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
  query: {
    page: string;
  };
};

export async function getStaticProps(props: any) {
  const allPosts = await getPosts({
    fields: [
      "title",
      "date",
      "slug",
      "author",
      "coverImage",
      "description",
      "ogImage",
      "tag",
      "readingTime",
      "category",
    ],
  });

  const categoryList = await getPostCategories();

  return {
    props: {
      allPosts,
      categoryList,
    },
  };
}
