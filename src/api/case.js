import request from '@/utils/request'

export function addCase(form) {
  return request({
    url: '/admin/case/addcase',
    method: 'post',
    data: {
      'title': form.title,
      'style': form.style,
      'hourse': form.hourse,
      'area': form.area,
      'village': form.village,
      'designer': form.designer,
      'content': form.content,
      'cover': form.cover,
      'status': form.status
    }
  })
}

export function updateCase(form) {
  return request({
    url: '/admin/case/updateCase',
    method: 'post',
    data: {
      'id': form.id,
      'title': form.title,
      'style': form.style,
      'hourse': form.hourse,
      'area': form.area,
      'village': form.village,
      'designer': form.designer,
      'content': form.content,
      'cover': form.cover,
      'status': form.status
    }
  })
}

export function getCaseList(query) {
  console.log(query.page)
  return request({
    url: '/admin/case/getCaseList',
    method: 'get',
    params: {
      'page': query.page,
      'limit': query.limit
    }
  })
}

export function getCaseById(id) {
  return request({
    url: '/admin/case/getCaseById',
    method: 'get',
    params: {
      id
    }
  })
}

export function deleteCaseById(id) {
  return request({
    url: '/admin/case/deleteCaseById',
    method: 'get',
    params: {
      id
    }
  })
}
