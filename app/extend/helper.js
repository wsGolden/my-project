const formatResponseData = (status, data, msg = '', code = 0) => {
  let result = {};
  const flag = code || 0;
  switch (status) {
    case 'fail':
    case 'error': {
      result.msg = data;
      result.flag = flag;
      result.code = 5000;
      break;
    }
    case 'success': {
      result.data = data;
      result.flag = 1;
      break;
    }
    default: {
      // 返回用户自定义格式
      result = {
        flag: code,
        msg: msg,
        data
      };
    }
  }
  return result;
};
exports.jsonResult = {
  success: (data) => {
    return formatResponseData('success', data);
  },
  fail: (error, code, msg) => {
    return formatResponseData('fail', error, msg || error.msg || '', code);
  },
  error: (error, code, msg) => {
    return formatResponseData('error', msg || error.message, code);
  }
};