
import { useState, useEffect, useCallback, useMemo } from 'react';

import api from '@/common/api/index'
import { useFetchData } from '../useFetchData.js';

export const useProjectStatisticType = () => {

  const {
    path: requestPath,
    method: requestMethod,
    params: requestParams,
  } = api.home.webProject;

  const [requestStatus, doRequest] = useFetchData(requestPath, requestMethod, requestParams);

  return [requestStatus, doRequest];
};
