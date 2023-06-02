import { useState, useEffect } from "react";
import { Table, Form, Input, Button, message } from "antd";
import AV from "leancloud-storage";
import EditModal from "./EditModal";
interface Record {
  id: string;
}
export default function Home() {
  const [form] = Form.useForm();
  const [dataList, setDataList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [recordId, setRecordId] = useState("");

  const columns = [
    {
      dataIndex: "id",
      title: "ID",
      width: 90,
    },
    {
      dataIndex: "name",
      title: "名字",
    },
    {
      dataIndex: "nick",
      title: "昵称",
    },
    {
      dataIndex: "opt",
      title: "操作",
      render: (text: any, { id }: Record) => (
        <>
          <Button type="link" onClick={() => handleEdit(id)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(id)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  const handleDelete = (id: string) => {
    const todo = AV.Object.createWithoutData("TestObject", id);
    todo.destroy();
    message.success("删除成功");
    handleLoadList();
  };

  const handleEdit = (id: string) => {
    setVisible(true);
    setRecordId(id);
  };
  const handleLoadList = () => {
    setTimeout(() => {
      const query = new AV.Query("TestObject");
      query.descending('createdAt')
      query.find().then((todo) => {
        setDataList(formatData(todo));
      });
    }, 50);
  };
  useEffect(() => {
    handleLoadList();
  }, []);
  const formatData = (todoData:any) => {
    const data = todoData.map((i: any) => {
      return {
        ...i._serverData,
        id: i.id,
      };
    });
    return data;
  };
  const handleSearch = (values: any) => {
    form.validateFields().then(() => {
      const query = new AV.Query("TestObject");
      if (values.name) {
        query.equalTo("name", values.name || "");
      }
      if (values.nick) {
        query.equalTo("nick", values.nick || "");
      }
      // query.equalTo("nick", values.nick || '');
      query.find().then((students) => {
        setDataList(formatData(students));
        console.log(students, 123312);
        // students 是包含满足条件的 Student 对象的数组
      });
    });
  };
  return (
    <div>
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        style={{ margin: 20 }}
      >
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="nick" label="昵称">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
          搜索
        </Button>
        <Button htmlType="reset" style={{ marginRight: 10 }}>
          清除
        </Button>
        <Button type="primary" onClick={() => setVisible(true)}>
          新增
        </Button>
      </Form>
      {visible && (
        <EditModal
          recordId={recordId}
          onSubmit={handleLoadList}
          onCancel={() => setVisible(false)}
        />
      )}

      <Table rowKey="id" columns={columns} dataSource={dataList} />
    </div>
  );
}
