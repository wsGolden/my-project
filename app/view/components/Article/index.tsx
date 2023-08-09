import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, List, Avatar, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { getArticleList } from "./services";

import styles from "./index.module.scss";
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
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
      // itemLayout="horizontal"
      itemLayout="vertical"
      dataSource={articleList}
      size="large"
      renderItem={(item, index) => (
        <div className={styles.articlelink}>
          <Link href={`/articledetail?articleId=${item._id}`} target="_blank">
            <List.Item
              className={styles.articlelistitem}
              extra={
                <div className={styles.imagecontainer}>
                  <img
                    // // width={300}
                    // height={300}
                    alt="logo"
                    src={`${BaseUrl}/upload/${item.articlePicId}`}
                  />
                </div>
              }
              // actions={[
              //   <IconText
              //     icon={StarOutlined}
              //     text="156"
              //     key="list-vertical-star-o"
              //   />,
              //   <IconText
              //     icon={LikeOutlined}
              //     text="156"
              //     key="list-vertical-like-o"
              //   />,
              //   <IconText
              //     icon={MessageOutlined}
              //     text="2"
              //     key="list-vertical-message"
              //   />,
              // ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={`${BaseUrl}/upload/${item.articlePicId}`} />
                }
                title={item.articleTitle}
                description={item.articleDes}
              />
              <div
                className={`${styles.ellipsis2} ${styles.articlecontent}`}
                dangerouslySetInnerHTML={{ __html: item.articleContent }}
              />
            </List.Item>
          </Link>
        </div>
      )}
    />
    // <Row>
    //   {articleList.map((data, index) => (
    //     <Col
    //       span={8}
    //       key={index}
    //       style={{ marginTop: 20 }}
    //       className="card-item"
    //     >
    //       <Link href={`/articledetail?articleId=${data._id}`} target="_blank">
    //         <Card
    //           hoverable
    //           style={{ width: 300 }}
    //           cover={
    //             <img
    //               alt="example"
    //               src={`${BaseUrl}/upload/${data.articlePicId}`}
    //             />
    //           }
    //         >
    //           <Meta title={data.articleTitle} description={data.articleDes} />
    //         </Card>
    //       </Link>
    //     </Col>
    //   ))}
    // </Row>
  );
}
