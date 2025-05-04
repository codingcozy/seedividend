import React from "react";
import style from "./CategoryBox.module.scss";
import classnames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { CATEGORY } from "@/lib/constants";

const cx = classnames.bind(style);

interface CategoryBoxProps {
  categoryList: string[];
}

export const CategoryBox = ({ categoryList }: CategoryBoxProps) => {
  const router = useRouter();
  return (
    <ul className={cx("category_list")}>
      {categoryList.map((category: string, i: any) => (
        <li className={cx("category_item")} key={i}>
          <Link className={cx("link")} href={`/posts/${category}`} aria-current={router.query.category === category}>
            <span>{CATEGORY[category]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryBox;
