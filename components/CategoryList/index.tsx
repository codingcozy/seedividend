import React from "react";
import style from "./CategoryList.module.scss";
import classnames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

const cx = classnames.bind(style);

interface CategoryListProps {
  categoryList: string[];
}

export const CategoryList = ({ categoryList }: CategoryListProps) => {
  const router = useRouter();
  return (
    <ul className={cx("category_list")}>
      {categoryList.map((category: string, i: any) => (
        <li className={cx("category_item")} key={i}>
          <Link className={cx("link")} href={`/posts/${category}`} aria-current={router.query.category === category}>
            <span>{category}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
