import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_PATH_REST,
  responseType: 'json'
})

export enum RequestMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete'
}
