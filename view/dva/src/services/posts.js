import request from '../utils/request';
import { tokenKey } from '../utils/config';

export async function getAdminPosts({ page, pageSize }) {
  const token = window.localStorage.getItem(tokenKey);
  return request(`/api/v1/admin/posts?page=${page}&pageSize=${pageSize}`, {
    method: 'get',
    headers: new Headers({
      "Authorization": `${token}`
    })
  });
}

export async function getAdminPostById({ id }) {
  const token = window.localStorage.getItem(tokenKey);
  return request(`/api/v1/admin/posts/${id}`, {
    method: 'get',
    headers: new Headers({
      "Authorization": `${token}`
    })
  });
}

export function save(post) {
  const token = window.localStorage.getItem(tokenKey);
  return request('/api/v1/admin/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`
    },
    body: JSON.stringify(post),
  });
}

export function update(post) {
  const postId = post.id;
  const token = window.localStorage.getItem(tokenKey);
  return request(`/api/v1/admin/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`
    },
    body: JSON.stringify(post),
  })
}

export function close(postId) {
  const token = window.localStorage.getItem(tokenKey);
  return request(`/api/v1/admin/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`
    },
  })
}

export async function getPosts({ page, pageSize }) {
  return request(`/api/v1/posts?page=${page}&pageSize=${pageSize}`);
}

export async function getPostById({ id }) {
  return request(`/api/v1/posts/${id}`);
}