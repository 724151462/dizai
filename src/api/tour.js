import {get, post} from './config'
const URL = `https://npdzzh.3dy.me/manage/public/`;
export const subaoTitleAPI = function () {
  return get(URL+'rain')
}
export const subaoSubmitAPI = function (data) {
  return post(URL+'rainReport', data)
}