import React, { useState } from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";

import styles from "./index.module.scss";

const Header = () => {
  const router = useRouter();

  // 获取当前路由信息
  const { pathname } = router;
  const items: MenuProps["items"] = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: <Link href="/">首页</Link>,
    },
    {
      key: "/users",
      icon: <AppstoreOutlined />,
      label: <Link href="/users">用户</Link>,
    },
    {
      key: "/about",
      icon: <AppstoreOutlined />,
      label: <Link href="/about">2048</Link>,
    },
  ];
  const [current, setCurrent] = useState(pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
