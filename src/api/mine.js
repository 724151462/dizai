import {get} from './config'
const URL = `http://npdzzh.3dy.me/`;
export const getMyIndexAPI = function (data) {
  return get(URL+'myinfo', data)
}
export const getMyIndexDetailAPI = function (data) {
  return get(URL+'SelfInfo', data)
}
export const getMyReadilyList = function (data) {
  return get(URL+'getMyReadilyList', data)
}
export const delReadilyInfo = function (data) {
  return get(URL+'delReadilyInfo', data)
}
export const auditReadilyInfo = function (data) {
  return get(URL+'auditReadilyInfo', data)
}
export const getScheduleList = function (data) {
  return get(URL+'getScheduleList', data)
}
export const getScheduleInfo = function (data) {
  return get(URL+'getScheduleInfo', data)
}
export const getReportingList = function (data) {
  return get(URL+'getReportingList', data)
}
export const cityList = function (data) {
  return get(URL+'cityList', data)
}