import { PlainObject } from './type';

export const reqPost = async (data: PlainObject, url: RequestInfo, option?: RequestInit) =>
  fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...option,
  }).then(r => r.json());

export const reqGet = async (url: RequestInfo, option?: RequestInit) =>
  fetch(url, {
    credentials: 'include',
    ...option,
  }).then(r => r.json());
