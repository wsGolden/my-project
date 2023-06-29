import { useEffect, useState } from 'react';

function useList(request) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    request().then((res) => {
      if (res.status === 'success') {
        setList(res.data);
      } else {
        setList([]);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [request]);
  return [list, loading];
}

export default useList;