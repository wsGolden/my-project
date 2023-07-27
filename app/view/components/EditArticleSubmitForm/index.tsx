import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getImage, getImageIds } from "@/common/utils";
import {
  addArticle,
  updateArticle,
  getArticleDetail,
} from "../../services/article/api";
interface Iprops {
  onSubmit: () => void;
  onCancel: () => void;
  recordId: string;
  content?: string;
}

const uploadAction =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:7001"
    : "http://123.57.88.38:7001";
const EditArticleSubmitForm = ({
  onSubmit,
  onCancel,
  recordId,
  content,
}: Iprops) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const editUserFn = async () => {
      if (recordId) {
        const {
          flag,
          data: { articleTitle, articleDes, articlePicId },
        } = await getArticleDetail({ _id: recordId });
        form.setFieldsValue({
          articleTitle,
          articleDes,
          articlePicId: articlePicId ? getImage(articlePicId) : [],
        });
      }
    };
    editUserFn();
  }, [recordId, form]);
  useEffect(() => {
    form.setFieldsValue({
      articleContent: content,
    });
  }, [content]);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const handleSubmit = async (values: any) => {
    const formValues = {
      ...values,
      articlePicId: values.articlePicId ? getImageIds(values.articlePicId) : "",
    };
    if (recordId) {
      const { flag } = await updateArticle({
        _id: recordId,
        ...formValues,
      });
      if (flag === 1) {
        onSubmit();

        handleCancel();
      }
      return;
    }
    const { flag } = await addArticle(formValues);
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
          initialValue=""
          rules={[{ required: true }]}
          noStyle
        >
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          name="articlePicId"
          label="展示图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            accept=".jpg, .gif, .bmp, .png, .jpeg, .png, .webp"
            listType="picture"
            onRemove={onRemove}
            action={`${uploadAction}/api/file/upload?imageId=${recordId}`}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditArticleSubmitForm;
