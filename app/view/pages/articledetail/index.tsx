import { ReactNode, useEffect, useState } from "react";
import { Space } from "antd";
import moment from "moment";

import { getSearchParam } from "@/common/utils";
import { getArticleDetail } from "./services";
import Layout from "@/components/Layout";
import styles from "./home.module.scss";
interface ArticleDataVo {
  articleContent: string;
  articleDes: string;
  articlePicId: string;
  articleTitle: string;
  createTime: string;
  updateTime: string;
}
function ArticleDetail() {
  const [data, setData] = useState({} as ArticleDataVo);
  const [formattedCreateTime, setFormattedCreateTime] = useState("");
  const [formattedUpdateTime, setFormattedUpdateTime] = useState("");

  useEffect(() => {
    setFormattedCreateTime(
      moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")
    );
    setFormattedUpdateTime(
      moment(data.updateTime).format("YYYY-MM-DD HH:mm:ss")
    );
  }, []);
  useEffect(() => {
    const getArticleDetailFn = async () => {
      const articleId = getSearchParam("articleId");
      if (articleId) {
        const { flag, data } = await getArticleDetail({ _id: articleId });
        console.log(flag, data, 123312);
        setData(data);
      }
    };
    getArticleDetailFn();
  }, []);
  return (
    <Layout>
      <h2>{data.articleTitle}</h2>
      <Space direction="vertical">
        <div>
          创建时间：{formattedCreateTime}
        </div>
        <div>
          更新时间：{formattedUpdateTime}
        </div>
      </Space>

      {/* <div>{data.articleDes}</div> */}
      <div className={styles.block}>
        <p>
          <strong>{data.articleDes}</strong>
        </p>
      </div>
      <div className={`${styles.block} ${styles.contentblock}`}>
        {data.articleContent}
      </div>
    </Layout>
  );
}

export default ArticleDetail;
