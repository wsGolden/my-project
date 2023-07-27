import { useEffect, useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import axios, { axiosPost } from "@/common/utils/axios";
import { Parser } from "html-to-react";
import { Space } from "antd";
import moment from "moment";

import { getSearchParam } from "@/common/utils";
import Layout from "@/components/Layout";
import styles from "./home.module.scss";
import Link from "next/link";
interface ArticleDataVo {
  articleContent: string;
  articleDes: string;
  articlePicId: string;
  articleTitle: string;
  createTime: string;
  updateTime: string;
  _id: string;
}
function ArticleDetail() {
  const [data, setData] = useState({} as ArticleDataVo);
  const [formattedCreateTime, setFormattedCreateTime] = useState("");
  const [formattedUpdateTime, setFormattedUpdateTime] = useState("");

  const getArticleDetail = (params: { _id: string }) => {
    return axiosPost("/api/article/detail", params);
  };
  useEffect(() => {
    const getArticleDetailFn = async () => {
      const articleId = getSearchParam("articleId");
      if (articleId) {
        const { flag, data } = await getArticleDetail({ _id: articleId });
        setData(data);
        setFormattedCreateTime(
          moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")
        );
        setFormattedUpdateTime(
          moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss")
        );
      }
    };
    getArticleDetailFn();
  }, []);
  const HtmlComponent = () => {
    const htmlString = data?.articleContent;
    const parser = Parser();
    const reactElement = parser.parse(htmlString);

    return (
      <div className={`${styles.block} ${styles.contentblock}`}>
        {reactElement}
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.flexandcenter}>
        <h2>{data?.articleTitle}</h2>
        <Link href={`/editarticle?articleId=${data?._id}`}>
          <FormOutlined style={{ marginLeft: 10 }} /> 编辑
        </Link>
      </div>

      <Space direction="vertical">
        <div>创建时间：{formattedCreateTime}</div>
        <div>更新时间：{formattedUpdateTime}</div>
      </Space>

      <div className={styles.block}>
        <p>
          <strong>{data.articleDes}</strong>
        </p>
      </div>
      <HtmlComponent />
      {/* <div
        dangerouslySetInnerHTML={{ __html: data.articleContent }}
        className={`${styles.block} ${styles.contentblock}`}
      /> */}
    </Layout>
  );
}

export default ArticleDetail;
