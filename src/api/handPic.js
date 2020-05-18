import {get} from './config'
export const getHandListAPI = function (data) {
  return get('http://npdzzh.3dy.me/getMyReadilyList', data)
}
