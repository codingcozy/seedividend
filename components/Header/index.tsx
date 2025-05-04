import React, { useEffect, useState, useRef } from "react";
import style from "./Header.module.scss";
import classnames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { AUTHOR, CATEGORY } from "@/lib/constants";
import PostType from "@/interfaces/post";

const cx = classnames.bind(style);

const Header = ({ postList, categoryList }: { postList: PostType[]; categoryList: string[] }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>(postList);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PostType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 개발 환경 감지 (로컬에서만 true)
  const isLocalDevelopment = process.env.NODE_ENV === "development";

  // 검색어 변경 시 결과 필터링
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const filteredResults = posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();
      return title.includes(term);
    });

    setSearchResults(filteredResults);
    setIsDropdownOpen(true);
  }, [searchTerm, posts]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // 검색창 포커스 시 드롭다운 열기
  const handleFocus = () => {
    if (searchTerm.trim() !== "") {
      setIsDropdownOpen(true);
    }
  };

  // 포스트 클릭 시 해당 페이지로 이동
  const handlePostClick = (slug: string) => {
    setIsDropdownOpen(false);
    setSearchTerm("");
    router.push(`/post/${slug}`);
  };

  // 검색어 하이라이팅 함수
  const highlightMatch = (text: string, term: string) => {
    if (!term.trim() || !text) return text;

    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // 글쓰기 페이지로 이동
  const handleWriteClick = () => {
    router.push("/admin");
  };

  return (
    <header className={cx("header")}>
      <div className={cx("inner")}>
        <div className={cx("left_area")}>
          <strong className={cx("title")}>
            <Link href={`/`}>{AUTHOR}</Link>
          </strong>
          <div className={cx("category_list")}>
            {categoryList?.map((category, i) => (
              <Link key={i} href={`/posts/${category}/1`} className={cx("nav_item")}>
                {CATEGORY[category]}
              </Link>
            ))}
          </div>
        </div>
        <nav className={cx("nav_area")}>
          <div className={cx("search_container")} ref={searchRef}>
            <div className={cx("search_input_wrapper")}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={handleFocus}
                onBlur={() => {
                  setSearchTerm("");
                }}
                placeholder="검색어 입력"
                className={cx("search_input")}
              />
              <button type="button" className={cx("search_button")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 16 16">
                  <path
                    fill="#000"
                    d="M14 12.94 10.16 9.1c1.25-1.76 1.1-4.2-.48-5.78a4.49 4.49 0 0 0-6.36 0 4.49 4.49 0 0 0 0 6.36 4.486 4.486 0 0 0 5.78.48L12.94 14 14 12.94ZM4.38 8.62a3 3 0 0 1 0-4.24 3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24 3 3 0 0 1-4.24 0Z"
                  />
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            {isDropdownOpen && searchResults.length > 0 && (
              <div className={cx("search_dropdown")}>
                <ul>
                  {searchResults.slice(0, 5).map((post) => (
                    <li key={post.slug} onClick={() => handlePostClick(post.slug)} className={cx("search_result_item")}>
                      <div
                        className={cx("search_result_title")}
                        dangerouslySetInnerHTML={{ __html: highlightMatch(post.title || "", searchTerm) }}
                      />
                    </li>
                  ))}
                  {searchResults.length > 5 && (
                    <li className={cx("search_more_results")}>{searchResults.length - 5}개 더보기</li>
                  )}
                </ul>
              </div>
            )}

            {isDropdownOpen && searchTerm.trim() !== "" && searchResults.length === 0 && (
              <div className={cx("search_dropdown")}>
                <div className={cx("no_results")}>검색 결과가 없습니다</div>
              </div>
            )}
          </div>

          {isLocalDevelopment && (
            <button onClick={handleWriteClick} className={cx("write_button")} aria-label="글쓰기">
              <span className={cx("write_text")}>관리</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
