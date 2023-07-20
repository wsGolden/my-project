import { useEffect, useState } from "react";
import Head from "next/head";

// import '@/common/css/index.module.scss';
// import '../styles/global.scss'
interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  const [title, setTitle] = useState("😄Anyway Blob");
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      // 当前标签页可见
      setTitle("😄欢迎回来");
      setTimeout(() => {
        setTitle("😄Anyway Blob");
      }, 500);
    } else {
      setTitle("😭不要走嘛");
    }
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
