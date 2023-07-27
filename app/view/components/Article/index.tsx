import { useState, useEffect, useRef } from "react";
import { Card, Row, Col } from "antd";
import { getArticleList } from "./services";

import styles from "./home.module.scss";
import Link from "next/link";
const BaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:7001"
    : "http://123.57.88.38:7001";
const { Meta } = Card;

export default function Article() {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    const getArticle = async () => {
      const { flag, data } = await getArticleList();
      if (flag === 1) {
        setArticleList(data?.dataList);
      }
    };
    getArticle();
  }, []);

  return (
    <Row>
      {articleList.map((data, index) => (
        <Col
          span={8}
          key={index}
          style={{ marginTop: 20 }}
          className="card-item"
        >
          <Link href={`/articledetail?articleId=${data._id}`} target="_blank">
            <Card
              hoverable
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={`${BaseUrl}/upload/${data.articlePicId}`}
                />
              }
            >
              <Meta title={data.articleTitle} description={data.articleDes} />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
