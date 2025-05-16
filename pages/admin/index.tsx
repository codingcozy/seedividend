import { useRouter } from "next/router";
import { getPostCategories, getPosts } from "@/lib/api";
import Header from "@/components/Header";
import style from "./admin.module.scss";
import classnames from "classnames/bind";
import PostType from "@/interfaces/post";
import CustomHead from "@/components/CustomHead";
import { CATEGORY, SITE_NAME } from "@/lib/constants";
import { useState, useEffect } from "react";
import Link from "next/link";
import useAdminAuth from "@/hooks/useAdminAuth";
import Modal from "@/components/Modal";

const cx = classnames.bind(style);

type Props = {
  categoryList: string[];
  allPosts: PostType[];
  morePosts: PostType[];
  preview?: boolean;
};

// 임시저장된 포스트 타입 정의
type TempPostType = {
  id: string;
  title: string;
  date: string;
  preview: string;
};

export default function Post({ allPosts, categoryList }: Props) {
  const router = useRouter();
  const title = `${SITE_NAME} | Post`;
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [deletingPosts, setDeletingPosts] = useState<string[]>([]);
  const [posts, setPosts] = useState<PostType[]>(allPosts);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showTempModal, setShowTempModal] = useState(false);
  const [tempPosts, setTempPosts] = useState<TempPostType[]>([]);
  const [isLoadingTemp, setIsLoadingTemp] = useState(false);
  const [deletingTempPosts, setDeletingTempPosts] = useState<string[]>([]);
  const [isDeletingAllTemp, setIsDeletingAllTemp] = useState(false);

  // Use the admin auth hook
  const { isAuthorized, isLoading } = useAdminAuth();

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
      } catch (error) {
        console.error("Error publishing blog:", error);
        alert(`블로그 발행 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
      } finally {
        setIsPublishing(false);
      }
    }
  };

  const isDeleting = (slug: string) => deletingPosts.includes(slug);

  // 임시저장 포스트 목록 가져오기 함수 개선
  const fetchTempPosts = async () => {
    try {
      const response = await fetch("/api/temp-posts");

      if (!response.ok) {
        throw new Error("임시저장 포스트 조회 실패");
      }

      const data = await response.json();
      setTempPosts(data.posts || []);
      return data.posts;
    } catch (error) {
      console.error("임시저장 포스트 목록 조회 오류:", error);
      return [];
    }
  };

  // 임시저장 포스트 선택 핸들러
  const handleSelectTempPost = (id: string) => {
    router.push(`/admin/create?tempId=${id}`);
  };

  // 임시저장 포스트 삭제 핸들러
  const handleDeleteTempPost = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지 - 부모 요소의 클릭 이벤트 실행 방지

    if (window.confirm("이 임시저장 포스트를 삭제하시겠습니까?")) {
      try {
        setDeletingTempPosts((prev) => [...prev, id]);

        const response = await fetch(`/api/temp-post/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("임시저장 포스트 삭제에 실패했습니다.");
        }

        // 성공 시 목록에서 제거
        setTempPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("임시저장 포스트 삭제 오류:", error);
        alert("임시저장 포스트를 삭제하는 중 오류가 발생했습니다.");
      } finally {
        setDeletingTempPosts((prev) => prev.filter((postId) => postId !== id));
      }
    }
  };

  // 모든 임시저장 포스트 삭제 핸들러
  const handleDeleteAllTempPosts = async () => {
    if (tempPosts.length === 0) {
      alert("삭제할 임시저장 포스트가 없습니다.");
      return;
    }

    if (window.confirm(`모든 임시저장 포스트(${tempPosts.length}개)를 삭제하시겠습니까?`)) {
      try {
        setIsDeletingAllTemp(true);

        const response = await fetch("/api/temp-posts/delete-all", {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("임시저장 포스트 전체 삭제에 실패했습니다.");
        }

        const result = await response.json();

        // 목록 비우기
        setTempPosts([]);

        alert(result.message || `${result.deletedCount}개의 임시저장 포스트가 삭제되었습니다.`);
      } catch (error) {
        console.error("임시저장 포스트 전체 삭제 오류:", error);
        alert("임시저장 포스트를 삭제하는 중 오류가 발생했습니다.");
      } finally {
        setIsDeletingAllTemp(false);
      }
    }
  };

  // 임시저장 포스트 삭제 중인지 확인
  const isDeleteTemp = (id: string) => deletingTempPosts.includes(id);

  // 새 포스트 작성 클릭 핸들러 개선
  const handleCreateNewPost = () => {
    // 임시저장된 포스트가 있는지 확인 후 바로 모달 표시
    setIsLoadingTemp(true);
    console.log("Test");
    fetchTempPosts()
      .then(() => {
        setShowTempModal(true);
      })
      .catch((error) => {
        console.error("임시저장 포스트 조회 실패:", error);
        router.push("/admin/create");
      })
      .finally(() => {
        setIsLoadingTemp(false);
      });
  };

  // Show loading or unauthorized message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Unauthorized access</div>;
  }

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
                <button onClick={handleCreateNewPost} className={cx("create_btn")}>
                  새 포스트 작성
                </button>

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
                        <span className={cx("post_category")}>{CATEGORY[post.category]}</span>
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

          {/* 임시저장 포스트 모달 */}
          {showTempModal && (
            <Modal onClose={() => setShowTempModal(false)} title="임시저장된 포스트">
              {isLoadingTemp ? (
                <div className={cx("loading_spinner")}>
                  <div className={cx("spinner")}></div>
                  <p>임시저장 포스트를 불러오는 중...</p>
                </div>
              ) : tempPosts && tempPosts.length > 0 ? (
                <div className={cx("temp_post_list")}>
                  <p className={cx("temp_post_guide")}>
                    계속해서 작성하실 임시저장 포스트를 선택하거나, 새로 작성하실 수 있습니다.
                  </p>
                  <div className={cx("temp_post_wrap")}>
                    {tempPosts.map((post) => (
                      <div key={post.id} className={cx("temp_post_item")} onClick={() => handleSelectTempPost(post.id)}>
                        <div className={cx("temp_post_content")}>
                          <h3 className={cx("temp_post_title")}>{post.title}</h3>
                          <p className={cx("temp_post_date")}>{new Date(post.date).toLocaleString()}</p>
                        </div>
                        <button
                          className={cx("temp_delete_btn")}
                          onClick={(e) => handleDeleteTempPost(e, post.id)}
                          disabled={isDeleteTemp(post.id)}
                        >
                          {isDeleteTemp(post.id) ? "삭제 중..." : "삭제"}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className={cx("temp_action_buttons")}>
                    <button
                      className={cx("delete_all_btn")}
                      onClick={handleDeleteAllTempPosts}
                      disabled={isDeletingAllTemp}
                    >
                      {isDeletingAllTemp ? "삭제 중..." : "전체 삭제"}
                    </button>
                    <button
                      className={cx("new_post_btn")}
                      onClick={() => {
                        setShowTempModal(false);
                        router.push("/admin/create");
                      }}
                    >
                      새로 작성하기
                    </button>
                  </div>
                </div>
              ) : (
                <div className={cx("no_temp_posts")}>
                  <p>임시저장된 포스트가 없습니다.</p>
                  <button
                    className={cx("new_post_btn")}
                    onClick={() => {
                      setShowTempModal(false);
                      router.push("/admin/create");
                    }}
                  >
                    새로 작성하기
                  </button>
                </div>
              )}
            </Modal>
          )}
        </>
      )}
    </>
  );
}

// Switch back to getStaticProps for compatibility with static export
export async function getStaticProps() {
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
