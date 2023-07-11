import { useEffect } from "react";
import Head from 'next/head';

// import '@/common/css/index.module.scss';
// import '../styles/global.scss'
interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  return <><Head>
    <title>Anyway Blob</title>
  </Head><Component {...pageProps} /></>;
}

export default MyApp;
