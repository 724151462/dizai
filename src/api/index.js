import {get} from './config'
export const getPointsAPI = function (data) {
  return get('http://npdzzh.3dy.me/map', data)
}
export const getPointDetailAPI = function (data) {
  return get('http://npdzzh.3dy.me/slope', data)
}