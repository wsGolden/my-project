import React, { useState, useEffect, useReducer } from 'react';
import axios from '@/common/utils/axios';
import { message } from 'antd';
import { axiosGet, axiosPost } from '../common/utils/axios';

const DEFAULT_STATE = {
  searchData: {},
  pagination: {
    pageSize: 10,
    current: 1,
    showQuickJumper: false,
    showSizeChanger: true,
    showTotal: (total, range) => (
      <span>
        共<span className="text-warning">{total}</span>条
      </span>
    )
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'submit':
      return {
        pagination: { ...state.pagination, current: 1 },
        searchData: { ...state.searchData, ...action.data }
      };
    case 'changePage':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.data }
      };
    case 'changSearchData':
      return {
        ...state,
        searchData: { ...state.searchData, ...action.data }
      };
  }
};

function useAjaxTable(url, { defaultPageSize = DEFAULT_STATE.pagination.pageSize, defaultSearchData = {}, ajaxType = 'get', hideLoading } = {}) {
  const [search, dispatch] = useReducer(reducer, {
    pagination: { ...DEFAULT_STATE.pagination, pageSize: defaultPageSize },
    searchData: { ...DEFAULT_STATE.searchData, ...defaultSearchData }
  });

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    dispatch({
      type: 'submit',
      data
    });
  };
  const pagination = search.pagination;
  const searchData = search.searchData;

  const { current, pageSize } = pagination;
  const setSearchData = (data) => {
    dispatch({
      type: 'changSearchData',
      data
    });
  };

  const setPagination = (data) => {
    dispatch({
      type: 'changePage',
      data
    });
  };

  useEffect(() => {
    dispatch({
      type: 'changSearchData',
      data: { ...DEFAULT_STATE.searchData, ...defaultSearchData }
    });
  }, [defaultSearchData.type,
  defaultSearchData.group,
  defaultSearchData.category,
  defaultSearchData.deprecated,
  defaultSearchData.projectId,
  defaultSearchData.pluginName,
  ]);

  useEffect(() => {
    setLoading(true);
    axiosPost(url, {
      pageSize,
      curPage: current,
      ...searchData
    })
      .then((res) => {
        if (res.flag === 1) {
          setDataList(res.data.dataList || []);
          setPagination({
            total: res.data.totalRows
          });
        } else {
          // message.error(res.message);
        }
        setLoading(false);
      });
  }, [current, pageSize, searchData, url]);

  const tableProps = {
    dataSource: dataList,
    loading: hideLoading ? false : loading,
    pagination,
    onChange: (pagination, filters, sorter) => {
      setPagination(pagination);
      setSearchData({
        otherInfo_sortColumn: sorter.field,
        otherInfo_sortType: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : '',
      });
    }
  };

  return {
    dataList,
    setDataList,
    pagination,
    loading,
    setLoading,
    setPagination,
    searchData,
    setSearchData,
    submit,
    tableProps
  };
}

export default useAjaxTable;