import request from '@/utils/request'
import {RemoveInvalidParam} from '@/utils'
import common from '@/api/common'

const baseUrl = common.base + '/user/';

export default {
  // 获取分页列表
  getListPage(params) {
    return request({
      url: baseUrl + 'get-list-page',
      method: 'get',
      params: RemoveInvalidParam(params)
    })
  },

  // 获取列表
  getList(params) {
    return request({
      url: baseUrl + 'get-list',
      method: 'get',
      params: RemoveInvalidParam(params)
    })
  },

  // 获取内容
  getInfo(params) {
    return request({
      url: baseUrl + 'get-info',
      method: 'get',
      params: RemoveInvalidParam(params)
    })
  }
}