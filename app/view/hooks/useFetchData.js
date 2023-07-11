import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from '@/common/utils/axios';


export const useFetchData = (url, method, params) => {
  const [requestState, setRequestState] = useState({
    requestId: '',
    loading: true,
    error: null,
    result: null,
  });
  const doRequest = useCallback((configParams) => {
    try {
      axios[method](url, {
          ...params,
          ...configParams,
        }).then(res => {
          if (res.errorCode === 0) {
            setRequestState({
              ...requestState,
              loading: false,
              result: res.data,
            });
          } else {
            setRequestState({
              ...requestState,
              loading: false,
              error: res,
            });
          }
      });
    } catch (e) {
      setRequestState({
        ...requestState,
        loading: false,
        error: e,
      });
    }
  }, [url, method, params]);
  
  return [requestState, doRequest];
}