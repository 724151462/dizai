import {get} from './config'
const URL = `https://npdzzh.3dy.me/manage/public/`;
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
export const operateUnsubscribeAPI = function (data) {
  return get(URL+'unsubscribe', data)
}
export const operateDelistAPI = function (data) {
  return get(URL+'Delist', data)
}
export const operateCancellationAPI = function (data) {
  return get(URL+'Cancellation', data)
}
export const operateIncludeListAPI = function (data) {
  return get(URL+'IncludeList', data)
}
export const operateFinishAPI = function (data) {
  return get(URL+'Finish', data)
}
export const operatenotPassAPI = function (data) {
  return get(URL+'notPass', data)
}

export const reportingInfo = function (data) {
  return get(URL+'reportingInfo', data)
}
export const patrolList = function (data) {
  return get(URL+'patrolList', data)
}
export const disasterPatrolList = function (data) {
  return get(URL+'disasterPatrolList', data)
}
export const patrolInfo = function (data) {
  return get(URL+'patrolInfo', data)
}

