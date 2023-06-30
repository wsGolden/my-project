import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { addUser, updateUser, getUserDetail } from "../../services/users/api";
interface Iprops {
  onSubmit: () => void;
  onCancel: () => void;
  recordId: string;
}

interface resDta {
  _serverData: {};
}

function EditModal({ onSubmit, onCancel, recordId }: Iprops) {
  const [form] = Form.useForm();
  useEffect(() => {
    const editUserFn = async () => {
      if (recordId) {
        const { flag, data } = await getUserDetail({ _id: recordId });
        form.setFieldsValue({
          userName: data.userName,
          nickName: data.nickName,
        });
      }
    };
    editUserFn();
  }, [recordId, form]);
  const handleSubmit = async (values: any) => {
    if (recordId) {
      const { flag } = await updateUser({
        _id: recordId,
        userName: values.userName,
        nickName: values.nickName,
      });
      if (flag === 1) {
        onSubmit();

        handleCancel();
      }
      return;
    }
    const { flag } = await addUser({
      userName: values.userName,
      nickName: values.nickName,
    });
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
      title={`${recordId ? "编辑" : "新增"}用户`}
      onOk={form.submit}
      okText="确定"
      cancelText="取消"
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="userName"
          label="姓名"
          initialValue=""
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickName"
          initialValue=""
          label="昵称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditModal;
