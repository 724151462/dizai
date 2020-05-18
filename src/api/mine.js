import {get} from './config'
export const getMyIndexAPI = function (data) {
  return get('http://npdzzh.3dy.me/myinfo', data)
}