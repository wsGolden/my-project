import { useState, useEffect } from "react";
import { Table, Form, Input, Button, message, Space } from "antd";
import Link from "next/link";
import Header from "../components/Header";
import Banner from '@/static/images/banner.jpg'
import Layout from "@/components/Layout";
import Image from 'next/image';
import Study from '@/static/images/study.svg'
import styles from './home.module.scss'
export default function Home() {
  return (
    <div className="home">
      <Layout>
        <div>
          <div className={styles.pic}>
            <Study width="384" height="384"/>
          </div>
        </div>
        </Layout>
    </div>
  );
}
