import { useEffect } from "react";
// import '@/common/css/index.module.scss';
// import '../styles/global.scss'
interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  return <Component {...pageProps} />;
}

export default MyApp;
