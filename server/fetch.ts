import { AnyObject } from "@/typings/hive.interfaces";
import { ELanguage } from "@/typings/home.interface";

export const geFetch = async (url: string, params?: AnyObject, data?: AnyObject) => {
  try {
    const _params = params ? { ...params} : { };
    const keys = Object.keys(_params);
    const queryStr = keys.reduce((prev, curr, index) => {
      const str = prev + `${curr}=${_params[curr]}`;
      return keys.length === index + 1 ? str : str + '&';
    }, '?');

    const input = process.env.BaseUrl + url + encodeURI(queryStr);

    const response = await fetch(input, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "pline": "DRAMABOX" // 当前域名， 区分产品线
      } as HeadersInit,
      keepalive: false,
      body: data ? JSON.stringify(data) : null,
    });

    if (response.status === 200 && response.ok) {
      const res = await response.json();
      if (res.status === 0) {
        return res.data;
      }
      console.warn(`\n >>> Response Error ${response.status}-${res.status} <<< \n` +
        `Request Url: ${response.url} \n` +
        `Request Data: ${JSON.stringify(data)} \n` +
        `Response Data: ${JSON.stringify(res)} \n`
      );
      return 'BadRequest_404'
    }
    console.warn(`\n >>> Response Error ${response.status} <<< \n` +
      `Request Url: ${response.url} \n` +
      `Request Data: ${JSON.stringify(data)} \n`);

    return 'BadRequest_404'
  } catch (e) {
    console.error(`\n >>> Request failed <<< \n` +
      `ERROR: ${(e || '').toString()}`);
    return 'BadRequest_500'
  }
}

export const poFetch = async (url: string, data?: AnyObject, language?: ELanguage, params?: AnyObject) => {
  try {
    let queryStr = '';
    let input = process.env.BaseUrl + url;
    if (url.includes('/client')) {
      input = url;
    }
    if (params) {
      const _params = params ? {...params} : {};
      const keys = Object.keys(_params);
      queryStr = keys.reduce((prev, curr, index) => {
        const str = prev + `${curr}=${_params[curr]}`;
        return keys.length === index + 1 ? str : str + '&';
      }, '?');
      input += encodeURI(queryStr);
    }

    const response = await fetch(input, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "pline": "DRAMABOX", // 当前域名， 区分产品线
        "language": language ?? "",
      } as HeadersInit,
      keepalive: false,
      body: data ? JSON.stringify(data) : null,
    });

    if (response.status === 200 && response.ok) {
      const res = await response.json();
      if (res.status === 0) {
        return res.data;
      }
      console.warn(`\n >>> Response Error ${response.status}-${res.status} <<< \n` +
        `Request Url: ${response.url} \n` +
        `Request Data: ${JSON.stringify(data)} \n` +
        `Response Data: ${JSON.stringify(res)} \n`
      );
      return 'BadRequest_404'
    }
    console.warn(`\n >>> Response Error ${response.status} <<< \n` +
      `Request Url: ${response.url} \n` +
      `Request Data: ${JSON.stringify(data)} \n`);

    return 'BadRequest_404'
  } catch (e) {
    console.error(`\n >>> Request failed <<< \n` +
      `ERROR: ${(e || '').toString()}`);
    return 'BadRequest_500'
  }
}
