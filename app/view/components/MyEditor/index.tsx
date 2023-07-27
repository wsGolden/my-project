import React, { useState, useEffect } from "react";
import axios, { axiosPost } from "@/common/utils/axios";

import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { getSearchParam } from "@/common/utils";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

function MyEditor({ getHtml }) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // const [editor, setEditor] = useState(null)

  // 编辑器内容
  const [html, setHtml] = useState("");
  const getArticleDetail = (params: { _id: string }) => {
    return axiosPost("/api/article/detail", params);
  };
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    const getArticleDetailFn = async () => {
      const articleId = getSearchParam("articleId");
      if (articleId) {
        const { flag, data } = await getArticleDetail({ _id: articleId });
        setHtml(data.articleContent);
      }
    };
    getArticleDetailFn();
  }, []);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            setHtml(editor.getHtml());
            getHtml(editor.getHtml());
          }}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
}

export default MyEditor;
