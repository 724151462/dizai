import {get} from './config'
const URL = `https://npdzzh.3dy.me/manage/public/`;
export const getHandListAPI = function (data) {
  return get(URL+'getMyReadilyList', data)
}
