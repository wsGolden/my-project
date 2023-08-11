import React, { useState, useEffect, useRef } from "react";
import { Card,  List, Avatar, Space } from "antd";
import Link from "next/link";
import Image from "next/image";
import getConfig from 'next/config';
import { getArticleList } from "./services";
import styles from "./index.module.scss";

const { Meta } = Card;

export default function Article() {
  const { publicRuntimeConfig } = getConfig();
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
                  <Image
                    width={300}
                    height={300}
                    alt="logo"
                    src={`${publicRuntimeConfig.BaseUrl}/upload/${item.articlePicId}`}
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
                  <Avatar src={`${publicRuntimeConfig.BaseUrl}/upload/${item.articlePicId}`} />
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
  );
}
