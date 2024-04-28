import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
export const BASE_URL = 'https://api.nasa.gov/neo/rest/v1'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 120000,
  });
  
  axiosInstance.interceptors.request.use(config => {
    config.params = {
        ...config.params,
        //We could move this to environment variable but I left it for testing
        api_key: 'U6j93PWB1i8OJjZVfJob4IGL2emtdWq3NTqfqH5b'
    };
    return config
  })


const request = async function <T>(
  req: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    const response = await axiosInstance(req)
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e:  any) {
    if (e.response) {
      const {
        status,
        data: { error_message, ...rest },
      } = e.response
      const err = {
        status,
        errorMessage:
          error_message || "Failed to perform request, please try again.",
        ...rest,
      }
      throw err
    } else {
      const errObject = e.toJSON()
      const err = {
        status: errObject.code,
        errorMessage: errObject.message,
        isNetworkError: true,
      }
      throw err
    }
  }
}

type RequestParameters = {
  url: string
  data?: object
  params?: object
}

class Request {
  static async get<T>({ url, params ,}: RequestParameters): Promise<AxiosResponse<T>> {
    return request({
      method: "GET",
      url,
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

}

export default Request