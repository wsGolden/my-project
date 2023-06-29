import { useEffect } from "react";

interface Iprops {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Iprops) {
  return <Component {...pageProps} />;
}

export default MyApp;
