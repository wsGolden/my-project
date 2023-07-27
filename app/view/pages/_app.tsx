import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import '@/common/css/index.module.scss';
// import '../styles/global.scss'
interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  const [title, setTitle] = useState("😄Anyway Blob");
  const router = useRouter();
  // 根据不同路由返回对应的title
  const getPageTitle = (url) => {
    console.log(url, 12312);
    switch (url) {
      case "/users":
        return "用户";
      case "/article":
        return "文章";
      case "/articledetail":
        return "文章详情";
      case "/news":
        return "每日早报";
      default:
        return "首页";
    }
  };
  // 在路由变化时更新页面的title
  const handleRouteChange = (url) => {
    const pageTitle = getPageTitle(url);
    setTitle(`${pageTitle} ｜😄Anyway Blob`);
    return pageTitle;
  };

  const handleVisibilityChange = () => {
    // router.events.on("routeChangeComplete", handleRouteChange);
    // getPageTitle();
    if (document.visibilityState === "visible") {
      // 当前标签页可见
      setTitle("😌欢迎回来");
      setTimeout(() => {
        setTitle(`${getPageTitle(document.location.pathname)} ｜😄Anyway Blob`);
      }, 500);
    } else {
      setTitle("😊我，在这儿等着你回来～");
    }
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    router.events.on("routeChangeComplete", handleRouteChange);
    // 清除事件监听以避免内存泄漏
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" href="http://localhost:3000/favicon.ico" />
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
