import {get} from './config'
export const getPointsAPI = function (data) {
  return get('http://npdzzh.3dy.me/map', data)
}