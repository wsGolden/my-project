import { useEffect } from 'react';
import AV from 'leancloud-storage';
<script src="//code.bdstatic.com/npm/leancloud-storage@4.13.2/dist/av-min.js"></script>
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AV.init({
      appId: 'a1NEpQvULyFOQfPJkIpZ9cvp-MdYXbMMI',
      appKey: 'kw6ZZPF72Uy3mMAWLUSzhFno',
      serverURL: 'https://a1nepqvu.api.lncldglobal.com',
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;