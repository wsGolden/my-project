import React, { useState, useEffect } from 'react';
import axios from '@/common/utils/axios';

function useAccess() {
  const [access, setAccess] = useState([]);

  useEffect(() => {
    try {
      axios
        .post('/api/getUser', {
          userName: window.localStorage.getItem('userName'),
          userId: window.localStorage.getItem('userId')
        })
        .then((res) => {
          if (res.errorCode === 0) {
            const access = res.data.access.map((v) => v.keyCode);
            setAccess(access);
          }
        });
    } catch (err) {
      setAccess([]);
    }
  }, []);

  return { access };
}

export default useAccess;
