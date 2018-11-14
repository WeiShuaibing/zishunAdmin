import request from '@/utils/request'

export function getCountList() {
  return request({
    url: '/admin/home/getCount',
    method: 'get'
  })
}
