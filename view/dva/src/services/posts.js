import request from '../utils/request';

export async function fetch({ page, pageSize }) {
  return request(`/api/v1/admin/posts?page=${page}&pageSize=${pageSize}`);
}

export function save(post) {
  return request('/api/v1/admin/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  });
}