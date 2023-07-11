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
        <div className={styles["title"]}>Anyway Coder</div>
      </div>
      <Space className={styles.menubox}>
        <Space className={styles.menu}>
          <MenuOutlined />
          <div>分类</div>
        </Space>
        <a href="https://github.com/wsGolden" target="_blank">
          <Space className={styles.menu}>
            <GithubOutlined />
            <span>源代码</span>
          </Space>
        </a>
      </Space>
    </div>
  );
}
