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

const uploadAction =
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
          articlePicId: ''
        });
      }
    };
    editUserFn();
  }, [recordId, form]);

  
  const beforeUpload = (file) => {
    setFileList([file]);
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
  const fileChange = (file) => {
    const response = file.file.response;
    form.setFieldsValue({ articlePicId: response?.data });
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
        <Form.Item name="articlePicId" label="展示图片">
          <Upload
            accept=".jpg, .gif, .bmp, .png, .jpeg, .png, .webp"
            beforeUpload={beforeUpload}
            listType="picture"
            onRemove={onRemove}
            fileList={fileList}
            action={`${uploadAction}/api/file/upload?imageId=${recordId}`}
            onChange={(file) => fileChange(file)}
            // headers={{
            //   'Content-Type': "multipart/form-data",
            // }}
          >
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditModal;
