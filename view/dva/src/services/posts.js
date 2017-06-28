import request from '../utils/request';

export async function fetch({ page, pageSize }) {
  return request(`/api/v1/posts?page=${page}&pageSize=${pageSize}`);
}

export function save(post) {
  return request('/api/v1/admin/posts', {
    method: 'POST',
    body: JSON.stringify(post),
  });
}