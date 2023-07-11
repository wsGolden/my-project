import React, { useState, useEffect } from "react";
import { Table, Form, Input, Button, message, Space } from "antd";
import { MenuOutlined, GithubOutlined } from "@ant-design/icons";
import Link from "next/link";
import Code from "@/static/images/code.svg";
import styles from "./index.module.scss";
// import '@/common/css/index.module.scss'
export default function Header() {
  return (
    <div className={styles["header-box"]}>
      <div className={styles["title-box"]}>
        <Code width="16" height="16" />
        <Link href="/" className={styles["title"]}>Anyway Coder</Link>
      </div>
      <Space className={styles.menubox}>
        <Space className={styles.menu}>
          <MenuOutlined />
          <a>分类</a>
        </Space>
          <Space className={styles.menu}>
            <GithubOutlined />
            <a href="https://github.com/wsGolden" target="_blank">源代码</a>
          </Space>
      </Space>
    </div>
  );
}
