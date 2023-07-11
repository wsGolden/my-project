import React, { useState, useEffect } from 'react';

function useUserInfo() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo');
    try {
      const newUserInfo = JSON.parse(userInfoStr);
      setUserInfo(newUserInfo);
    } catch (err) {
      setUserInfo({});
    }
  }, []);

  return { userInfo };
}

export default useUserInfo;
