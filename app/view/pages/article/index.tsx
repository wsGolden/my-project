import Link from "next/link";
import { Table, Form, Input, Button, message, Tooltip, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import Header from "@/components/ConfigPageHeader";
import useAjaxTable from "@/hooks/useAjaxTable";
import { removeArticle } from "@/services/article/api";
import styles from "./index.module.scss";

interface DataType {
  _id: string;
  articleContent: string;
  articleDes: string;
  articleTitle: string;
}

export default function Article({pageConfig}) {
  const [form] = Form.useForm();
  const { tableProps, submit, searchData } = useAjaxTable("/api/article/list");
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "articleTitle",
      title: "文章标题",
      width: 150,
    },
    {
      dataIndex: "articleDes",
      title: "文章描述",
      width: 120,
      render: (text) => (
        <Tooltip title={text}>
          <span className={styles.ellipsis3}>{text}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: "articleContent",
      title: "文章内容",
      key: "articleContent",
      render: (text) => (
        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: text }} />}>
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className={styles.ellipsis3}
          />
        </Tooltip>
      ),
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      width: 150,
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "updateTime",
      title: "更新时间",
      width: 150,
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "opt",
      title: "操作",
      render: (text: any, { _id }: DataType) => (
        <>
          <Link target="_blank" href={`/editarticle?articleId=${_id}`}>
            <Button type="link">编辑</Button>
          </Link>
          <Link target="_blank" href={`/articledetail?articleId=${_id}`}>
            <Button type="link">详情</Button>
          </Link>
          <Button type="link" danger onClick={() => handleDelete(_id)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  const handleDelete = async (_id: string) => {
    Modal.confirm({
      title: "确认删除吗?",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const { flag } = await removeArticle({ _id });
        if (flag === 1) {
          message.success("删除成功");
          submit({ ...searchData });
        }
      },
    });
  };

  const handleSearch = (values) => {
    form.validateFields().then(() => {
      submit(values);
    });
  };

  return (
    <div>
      <Header />
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        style={{ margin: 20 }}
      >
        <Form.Item name="articleTitle" label="文章标题">
          <Input />
        </Form.Item>
        <Form.Item name="articleDes" label="文章描述">
          <Input />
        </Form.Item>
        <Form.Item name="articleContent" label="文章内容">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
          搜索
        </Button>
        <Button htmlType="reset" style={{ marginRight: 10 }}>
          清除
        </Button>
        <Link href="/editarticle" style={{ marginLeft: 10 }}>
          <Button type="primary">
            新增
          </Button>
        </Link>
      </Form>
      <Table rowKey="_id" columns={columns} {...tableProps} />
    </div>
  );
}
