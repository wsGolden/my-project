import { useEffect } from "react";
import AV from "leancloud-storage";
interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  useEffect(() => {
    AV.init({
      appId: "NP1A7eGKYLPnEUDo0FYruAkS-gzGzoHsz",
      appKey: "MspnBbTyvLYxvvXZELMx4bcm",
      serverURL: "https://np1a7egk.lc-cn-n1-shared.com",
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
