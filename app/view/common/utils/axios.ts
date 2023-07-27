import axios from 'axios'
import { message } from 'antd'
import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance, Method } from 'axios'
import qs from 'qs'

export interface IGatewayResponse<T = any> {
  flag: 0 | 1
  data: T
  msg: string
  code: string
}

interface IPending {
  /**
   * 所有请求中对象
   */
  [paramsName: string]: Function
}

/** 缓存请求url */
let pending: IPending = {}

/** 取消重复请求 */
const removePending = (pending: IPending, config: AxiosRequestConfig): void => {
  let key = `${config.url}&${config.method}`
  if (pending[key]) {
    pending[key].call(config)
    delete pending[key]
  }
}

interface ICodeItem {
  /** 请求错误码 */
  code: string
  /** 是否提示错误信息 */
  showMsg: boolean
  /** 要跳转的url */
  url: ((msg: string) => void) | string
}

/**
 * 需要处理跳转的错误code列表，只需要给出错误提示的code已由 axiosStrong 方法自动完成
 * @see https://g22h5luj8j.feishu.cn/docs/doccny7AMOrzfnppJCMLvE3uz8g
 */

const codeList: ICodeItem[] = [

  // 账号信息过期
  {
    code: '1401',
    showMsg: true,
    url: ''
  }
]

/** 从错误code表中查找指定的code码 */
const findErrorCode = (code: string) => codeList.find((codeItem) => codeItem.code === code)

// 是否命中错误信息提示code
let isHandleMsgCode = false
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001' : 'http://123.57.88.38:7001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
)

/** 响应错误码拦截处理 */
const handleResponse = (response: AxiosResponse<IGatewayResponse>) => {
  const { code, msg } = response.data
  if (isHandleMsgCode) {
    return response
  }
  let codeItem = findErrorCode(code)
  if (codeItem) {
    const handleUrl = () => {
      typeof codeItem!.url === 'function'
        ? codeItem!.url(msg)
        : (window.location.href = codeItem!.url)
    }
    if (codeItem.showMsg && msg) {
      isHandleMsgCode = true
      message.error(msg)
    } else {
      handleUrl()
    }
  }
  return response
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => handleResponse(response),
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
)

interface IAxiosStrongArgs {
  /** 请求接口url */
  url: string
  /** 发送请求的方式，默认为get */
  method?: Method
  /** 要提交的数据 */
  data?: any
  /** 是否开启错误自动处理，true为开启，false关闭，默认为true */
  handleErrorAuto?: boolean
  /** 是否取消重复请求，默认为true */
  cancelRepeatReq?: boolean
  /** axios请求config */
  reqConfig?: AxiosRequestConfig,
  headers?: object
}

/**
 * axios请求包装方法
 * @param args {IAxiosStrongArgs}
 */
export const axiosStrong = async <R = any>(
  args: IAxiosStrongArgs
): Promise<IGatewayResponse<R>> => {
  const {
    url,
    method = 'get',
    data,
    handleErrorAuto = true,
    cancelRepeatReq = true,
    reqConfig = {}
  } = args
  /** 构造请求的config内容 */
  let config: AxiosRequestConfig = {
    url,
    method,
    ...reqConfig
  }
  if (cancelRepeatReq) {
    removePending(pending, config)
    config.cancelToken = new axios.CancelToken((c: Function) => {
      // 给每个请求加上特定取消请求方法
      pending[`${config.url}&${config.method}`] = c
    })
  }
  try {
    let { data: response }: AxiosResponse<IGatewayResponse<R>> = await (
      axiosInstance as AxiosInstance
    )({
      url,
      method,
      data,
      ...config
    })
    if (response.flag === 0 && handleErrorAuto && !findErrorCode(response.code!)) {
      message.error(response.msg)
    }
    return response
  } catch (err) {
    return {
      flag: 0,
      msg: '',
      data: null as unknown as R,
      code: ''
    }
  }
}

/**
 * 发送get请求
 * @param url 请求url
 * @param config {Partial<IAxiosStrongArgs>}
 */
export const axiosGet = <R = any>(url: string, config: Partial<IAxiosStrongArgs> = {}) => {
  return axiosStrong<R>({
    url,
    ...config
  })
}

/**
 * 发送post请求
 * @param url 请求url
 * @param data 请求数据
 * @param config {Partial<IAxiosStrongArgs>}
 */
export const axiosPost = <R = any>(
  url: string,
  data: any,
  config: Partial<IAxiosStrongArgs> = {}
) => {
  return axiosStrong<R>({
    url,
    method: 'post',
    data,
    ...config
  })
}

export default axios
