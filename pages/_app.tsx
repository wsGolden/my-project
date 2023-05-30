import { useEffect } from "react";
import AV from "leancloud-storage";
interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  useEffect(() => {
    AV.init({
      appId: "a1NEpQvULyFOQfPJkIpZ9cvp-MdYXbMMI",
      appKey: "kw6ZZPF72Uy3mMAWLUSzhFno",
      serverURL: "https://a1nepqvu.api.lncldglobal.com",
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
