import React, { useState, useEffect } from "react";
import { Table, Form, Input, Button, message, Space, Image } from "antd";
import {
  MenuOutlined,
  GithubOutlined,
  HighlightOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import Code from "@/static/images/code.svg";
import styles from "./index.module.scss";
import Logo from "@/static/images/logo.svg";

// import '@/common/css/index.module.scss'
export default function Header() {
  return (
    <div className={styles["header-box"]}>
      <div style={{ display: "flex" }}>
        <Link href="/" className={styles["title-box"]}>
          <div className={styles["title-cont-box"]}>
            <Code width="20" height="20" color="#000" />

            <span className={styles["title-any"]}>Anyway</span>
            <div className={styles["title-coder"]}>Coder</div>
          </div>
        </Link>
        <Link href="/editarticle" style={{ marginLeft: 10 }}>
          <HighlightOutlined /> 写短文
        </Link>
      </div>

      <Space className={styles.menubox}>
        <Space className={styles.menu}>
          <GlobalOutlined />
          <Link href="/news">每日新闻60s</Link>
        </Space>
        <Space className={styles.menu}>
          <GlobalOutlined />
          <Link href="/article">短文列表</Link>
        </Space>
        <Space className={styles.menu}>
          <MenuOutlined />
          <a>分类</a>
        </Space>
        <Space className={styles.menu}>
          <GithubOutlined />
          <a href="https://github.com/wsGolden" target="_blank">
            源代码
          </a>
        </Space>
      </Space>
    </div>
  );
}
