import {get} from './config'
const URL = `https://npdzzh.3dy.me/manage/public/`;
export const getPointsAPI = function (data) {
  return get(URL+'map', data)
}
export const getPointDetailAPI = function (data) {
  return get(URL+'slope', data)
}