import { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";

import Link from "next/link";
import Header from "../components/Header";
import Banner from "@/static/images/banner.jpg";
import Layout from "@/components/Layout";
import Image from "next/image";
import Study from "@/static/images/study.svg";
import Article from "@/components/Article";
import styles from "./home.module.scss";

const { Meta } = Card;

export default function Home() {
  return (
    <div className="home">
      <Layout>
        <div>
          <div className={styles.person}></div>
          <div className={styles.pic}>
            <Study width="384" height="384" />
          </div>
          <Article />
        </div>
      </Layout>
    </div>
  );
}
