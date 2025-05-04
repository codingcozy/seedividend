import Header from "@/components/Header";
import style from "./index.module.scss";
import classnames from "classnames/bind";
import PostList from "@/components/PostList";
import { getPostCategories, getPosts } from "../lib/api";
import PostType from "@/interfaces/post";
import Section from "@/components/Section";
import CustomHead from "@/components/CustomHead";
import CategoryList from "@/components/CategoryList";
import CategoryBox from "@/components/CategoryBox";

const cx = classnames.bind(style);

interface HomeProps {
  allPosts: PostType[];
  categories: string[];
}

export default function Home({ allPosts, categories }: HomeProps) {
  return (
    <>
      <CustomHead type="home" />
      <main className={cx("container")}>
        <Header postList={allPosts} categoryList={categories} />
        <div className={cx("content")}>
          <Section title="게시물" moreLink={`posts/${categories[0]}/1`}>
            <PostList postList={allPosts.slice(0, 10)}></PostList>
          </Section>
          {/* <CategoryBox categoryList={categories} /> */}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getPosts({
    fields: ["title", "date", "slug", "author", "coverImage", "description", "ogImage", "tag", "readingTime"],
  });

  const categories = await getPostCategories();
  return {
    props: { allPosts, categories },
  };
};
