import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios, { axiosPost } from "@/common/utils/axios";

import {
  addArticle,
  updateUser,
  getArticleDetail,
} from "../../services/article/api";
interface Iprops {
  onSubmit: () => void;
  onCancel: () => void;
  recordId: string;
}

interface resDta {
  _serverData: {};
}
const uploadActin =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:7001"
    : "http://123.57.88.38:7001";
function EditModal({ onSubmit, onCancel, recordId }: Iprops) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const editUserFn = async () => {
      if (recordId) {
        const {
          flag,
          data: { articleTitle, articleDes, articleContent },
        } = await getArticleDetail({ _id: recordId });
        form.setFieldsValue({
          articleTitle,
          articleDes,
          articleContent,
        });
      }
    };
    editUserFn();
  }, [recordId, form]);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });

    // 设置
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axiosPost("/api/upload", formData, config);
    console.log(response, 213132);
    // if (response && response.url) {
    //   setResult(response.url);
    //   message.success('上传成功');
    // } else {
    //   message.success('上传失败');
    // }
  };
  const beforeUpload = (file) => {
    setFileList([file]);
    // setFileList([...fileList, file]);
    // return false;
  };

  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const handleSubmit = async (values: any) => {
    if (recordId) {
      const { flag } = await updateUser({
        _id: recordId,
        ...values,
      });
      if (flag === 1) {
        onSubmit();

        handleCancel();
      }
      return;
    }
    const { flag } = await addArticle(values);
    if (flag === 1) {
      onSubmit();

      handleCancel();
    }
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <Modal
      open={true}
      title={`${recordId ? "编辑" : "写"}文章`}
      onOk={form.submit}
      okText="确定"
      cancelText="取消"
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="articleTitle"
          label="文章标题"
          initialValue=""
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="articleDes"
          initialValue=""
          label="文章描述"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="articleContent"
          label="文章内容"
          initialValue=""
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="articlePic" label="展示图片">
          <Upload
            accept=".jpg, .gif, .bmp, .png, .jpeg, .png, .webp"
            beforeUpload={beforeUpload}
            onRemove={onRemove}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Form.Item>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          style={{ marginTop: 16 }}
        >
          开始上传
        </Button>
      </Form>
    </Modal>
  );
}

export default EditModal;
