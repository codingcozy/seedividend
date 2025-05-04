import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostCategories, getPosts } from "@/lib/api";
import type PostType from "@/interfaces/post";
import Header from "@/components/Header";
import style from "../../posts.module.scss";
import classnames from "classnames/bind";

import CustomHead from "@/components/CustomHead";
import PostList from "@/components/PostList";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORY, SITE_NAME } from "@/lib/constants";

const cx = classnames.bind(style);
type Props = {
  category: string;
  categoryList: string[];
  allPosts: PostType[];
  posts: PostType[];
  page: number;
  totalPageCount: number;
  totalPageGroupCount: number;
  lastPageGroup: number;
  currentPageGroup: number;
};

export const PAGE_SIZE = 10;
export const PER_PAGE_SIZE = 20;
export const PAGE_KEY = `__${SITE_NAME}_CURRENT_PAGE__`;
export const PAGEGROUP_KEY = `__${SITE_NAME}_CURRENT_PAGE_GROUP__`;

export default function Post({
  category,
  categoryList,
  allPosts,
  posts,
  page,
  totalPageCount,
  totalPageGroupCount,
  currentPageGroup,
  lastPageGroup,
}: Props) {
  const router = useRouter();

  const [currentPageGroupS, setCurrentPageGroupS] = useState(currentPageGroup);
  const [lastPageGroupS, setLastPageGroupS] = useState(lastPageGroup);

  const onClickPageGroup = (nextPageGroup: number) => {
    nextPageGroup = nextPageGroup < 0 ? 0 : nextPageGroup;
    setCurrentPageGroupS(nextPageGroup);
  };

  useEffect(() => {
    console.log(currentPageGroupS, totalPageGroupCount);
    if (currentPageGroupS + 1 === totalPageGroupCount) {
      setLastPageGroupS(totalPageCount % PER_PAGE_SIZE === 0 ? PER_PAGE_SIZE : totalPageCount % PER_PAGE_SIZE);
    } else {
      setLastPageGroupS(PER_PAGE_SIZE);
    }
  }, [currentPageGroupS, lastPageGroup]);

  useEffect(() => {}, [lastPageGroupS]);
  return (
    <>
      {router.isFallback ? (
        " Loading…"
      ) : (
        <>
          <CustomHead type="post" />
          <div className={cx("container", "-list")}>
            <Header postList={allPosts} categoryList={categoryList} />
            <div className={cx("inner")}>
              <article>
                <SectionTitle title={CATEGORY[category]}></SectionTitle>
                <div className={cx("project_list")}>
                  <PostList postList={posts}></PostList>
                </div>
              </article>
              <div className={cx("pagination")}>
                {currentPageGroupS > 0 && (
                  <button
                    type="button"
                    className={cx("page_button", "-prev")}
                    onClick={() => onClickPageGroup(currentPageGroupS - 1)}
                  >
                    &lt;
                  </button>
                )}
                {Array.from({ length: lastPageGroupS }, (_, i) => {
                  const pageNum = PER_PAGE_SIZE * currentPageGroupS + (i + 1);

                  return (
                    <Link
                      key={i}
                      className={cx("link", { "-active": pageNum === +page })}
                      href={`/posts/${category}/${PER_PAGE_SIZE * currentPageGroupS + (i + 1)}`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
                {currentPageGroupS + 1 < totalPageGroupCount && (
                  <button
                    type="button"
                    className={cx("page_button", "-prev")}
                    onClick={() => onClickPageGroup(currentPageGroupS + 1)}
                  >
                    {">"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

type Params = {
  params: {
    category: string;
    page: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const allPosts = await getPosts({
    fields: ["title", "date", "slug", "author", "coverImage", "description", "ogImage", "tag", "readingTime"],
  });

  const categoryList = await getPostCategories();

  const res: any = await getPosts({
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
    ],
    category: params.category,
    page: params.page,
  });

  return {
    props: { ...res, page: params.page, allPosts, categoryList, category: params.category },
  };
}

export async function getStaticPaths() {
  const categories = await getPostCategories();

  let paths = [];

  for (let i in categories) {
    const category = categories[i];

    const posts: any = await getPosts({ category: category, fields: ["slug"] });
    const totalPageCount = Math.ceil(posts.length / PAGE_SIZE);

    for (let i = 0; i < totalPageCount; i++) {
      paths.push({
        params: {
          category,
          page: String(i + 1),
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}
