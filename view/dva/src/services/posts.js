import request from '../utils/request';

export async function fetch({ page, pageSize }) {
  return request('/api/v1/posts?page=${page}&pageSize=${pageSize}');
}
