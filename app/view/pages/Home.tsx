import { useState, useEffect } from "react";
import { Card, Row, Alert } from "antd";

import Link from "next/link";
import Header from "../components/Header";
import Layout from "@/components/Layout";
import Image from "next/image";
import Study from "@/static/images/study.svg";
import Article from "@/components/Article";
import Banner from "@/static/images/banner.jpeg";

import styles from "./home.module.scss";

const { Meta } = Card;

export default function Home({pageConfig}) {
  return (
    <div className={styles.home}>
      <Layout>
        <div>
          {/* <div className={styles.person}></div> */}
          <Alert message={pageConfig?.notice} closable={true} />
          <div className={styles.banner} style={{backgroundImage : "url('../static/images/banner.jpeg')"}}></div>
          {/* <div className={styles.pic}>
            <Study width="384" height="384" />
          </div> */}
          <Article />
        </div>
      </Layout>
    </div>
  );
}
