import React, { useState, useEffect, useRef } from "react";
import { Button, message } from "antd";
import Layout from "@/components/Layout";
import EditModal from "@/components/EditArticleSubmitForm";

import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/components/MyEditor"), {
  ssr: false,
});

const MyRichTextEditor = () => {
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [recordId, setRecordId] = useState("");
  const childRef = useRef();

  const handleEditorChange = (value) => {
    console.log(value, 22222);
    setContent(value);
  };

  return (
    <Layout>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: 10 }}
      >
        发布
      </Button>
      <MyEditor getHtml={handleEditorChange} />
      {visible && (
        <EditModal
          content={content}
          recordId={recordId}
          onSubmit={() => {
            message.success("发布成功");
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </Layout>
  );
};

export default MyRichTextEditor;
