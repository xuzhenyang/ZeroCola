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

export function update(post) {
  const postId = post.id;
  return request(`/api/v1/admin/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  })
}

export async function getPostById( { id } ) {
  return request(`/api/v1/admin/posts/${id}`);
}