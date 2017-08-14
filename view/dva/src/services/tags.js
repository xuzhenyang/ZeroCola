import request from '../utils/request';
import { tokenKey } from '../utils/config';

export function save(tag) {
  const token = window.localStorage.getItem(tokenKey);
  return request('/api/v1/admin/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`
    },
    body: JSON.stringify(tag),
  });
}

export function update(tag) {
  const tagId = tag.id;
  const token = window.localStorage.getItem(tokenKey);
  return request(`/api/v1/admin/tags/${tagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`
    },
    body: JSON.stringify(tag),
  })
}

export function deleteTag(id) {
  const token = window.localStorage.getItem(tokenKey);
  return request(`/api/v1/admin/tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`
    },
  })
}

export async function getTags() {
  return request(`/api/v1/tags`);
}

export async function getTagById({ id }) {
  return request(`/api/v1/tags/${id}`);
}