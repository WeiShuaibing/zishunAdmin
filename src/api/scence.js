import request from '@/utils/request'

export function addScence(formData) {
  return request({
    url: '/admin/scence/addScence',
    method: 'post',
    data: {
      'title': formData.title,
      'url': formData.url,
      'cover': formData.cover,
      'status': formData.status
    }
  })
}

export function updateScence(formData) {
  console.log('updata-----------------')
  return request({
    url: '/admin/scence/updateScence',
    method: 'post',
    data: {
      'id': formData.id,
      'title': formData.title,
      'url': formData.url,
      'cover': formData.cover,
      'status': formData.status
    }
  })
}

export function getScenceList(query) {
  return request({
    url: '/admin/scence/getScenceList',
    method: 'get',
    params: {
      'page': query.page,
      'limit': query.limit
    }
  })
}

export function delScenceById(id) {
  return request({
    url: '/admin/scence/delScenceById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

export function getScenceById(id) {
  return request({
    url: '/admin/scence/getScenceById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

