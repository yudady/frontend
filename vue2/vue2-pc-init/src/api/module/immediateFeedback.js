import request from '@/utils/request'
import {RemoveInvalidParam} from '@/utils'
import common from '@/api/common'

const baseUrl = common.base + '/affair/';

export default {
  // 获取分页列表
  getListPage(params) {
    return request({
      url: baseUrl + 'get-list-page',
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
  },

  // 添加内容
  setAdd(data) {
    return request({
      url: baseUrl + 'set-add',
      method: 'post',
      data: RemoveInvalidParam(data)
    })
  },

  // 修改内容
  setEdit(data) {
    return request({
      url: baseUrl + 'set-edit',
      method: 'post',
      data: RemoveInvalidParam(data)
    })
  },

  // 删除内容
  setDel(params) {
    return request({
      url: baseUrl + 'set-del',
      method: 'get',
      params: RemoveInvalidParam(params)
    })
  },
}