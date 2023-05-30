import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import AV from "leancloud-storage";

function EditModal({ onSubmit, onCancel, recordId }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (recordId) {
      const query = new AV.Query("TestObject");
      query.get(recordId).then((res) => {
        console.log(res, 123);
        form.setFieldsValue({ ...res._serverData });
      });
    }
  }, [recordId]);
  const handleSubmit = (values) => {
    // 创建 TestObject 表对象，并设置 name 字段
    const TestObject = AV.Object.extend("TestObject");
    const testObject = new TestObject();
    form.validateFields().then(async () => {
      testObject.set("name", values.name);
      testObject.set("nick", values.nick);
      // 将对象保存到 LeanCloud

      if (recordId) {
        const todo = AV.Object.createWithoutData("TestObject", recordId);
        todo.set("name", values.name);
        todo.set("nick", values.nick);
        todo.save();
        form.resetFields();
        message.success("编辑成功");
        return;
      }
      await testObject.save().then(
        (testObject) => {
          // 成功保存之后，执行其他逻辑
          console.log(`保存成功。objectId：${testObject.id}`);
          message.success("新增成功");
          form.resetFields();
        },
        (error) => {
          // 异常处理
        }
      );
    });
    onSubmit();
    onCancel?.();
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };
  return (
    <Modal
      open={true}
      title="新增数据"
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="nick" label="昵称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditModal;
