import { ReactNode, useState } from "react";
import { Table, Form, Input, Button, message, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import useAjaxTable from "../../hooks/useAjaxTable";
import EditModal from "./EditModal";
import { removeArticle } from "../../services/article/api";
import Header from "@/components/ConfigPageHeader";
import styles from "./index.module.scss";

interface DataType {
  _id: string;
  articleContent: string;
  articleDes: string;
  articleTitle: string;
}

export default function Article() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [recordId, setRecordId] = useState("");
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
        <Tooltip title={text}>
          <span className={styles.ellipsis3}>{text}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      width:150,
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "updateTime",
      title: "更新时间",
      width:150,
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "opt",
      title: "操作",
      render: (text: any, { _id }: DataType) => (
        <>
          <Button type="link" onClick={() => handleEdit(_id)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(_id)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  const handleDelete = async (_id: string) => {
    const { flag } = await removeArticle({ _id });
    if (flag === 1) {
      message.success("删除成功");
      submit({ ...searchData });
    }
  };

  const handleEdit = (_id: string) => {
    setVisible(true);
    setRecordId(_id);
  };

  const handleSearch = (values) => {
    form.validateFields().then(() => {
      submit(values);
    });
  };
  const handleAdd = () => {
    setVisible(true);
    setRecordId("");
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
        <Button type="primary" onClick={() => handleAdd()}>
          新增
        </Button>
      </Form>
      {visible && (
        <EditModal
          recordId={recordId}
          onSubmit={() => submit({ ...searchData })}
          onCancel={() => setVisible(false)}
        />
      )}
      <Table rowKey="_id" columns={columns} {...tableProps} />
    </div>
  );
}
