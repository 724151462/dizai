import {get} from './config'
export const getPointsAPI = function (data) {
  get('http://npdzzh.3dy.me/map', data)
}
