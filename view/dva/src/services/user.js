import request from '../utils/request';

export async function login({ username, password }) {
  return request('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "username=" + username + "&password=" + password,
  });
}