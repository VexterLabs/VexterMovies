import ClientConfig from '@/client.config'
import { IClipboard, ILogParams } from "@/typings/hive.interfaces";

// 大数据打点
export const netHiveLog = (logData: ILogParams) => {
  fetch(ClientConfig.netHiveLink + `?json=${encodeURIComponent(JSON.stringify(logData))}`, {
    method: "GET",
    keepalive: true
  }).catch(error => console.warn('Error Log:', error))
}

// IPUA
export async function netIpUa(clipboard: IClipboard) {
  const params = {
    clipboard: JSON.stringify(clipboard),
    ua: clipboard.ua,
    h5Uid: clipboard.h5uid,
  }
  return new Promise((resolve) => {
    fetch(process.env.IpUaUrl || 'https://api.dramaboxdb.com/drama-box/ad/cache/ua', {
      method: "post",
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': "application/json"
      }),
      keepalive: true
    }).then(response => {
      response.json().then((res) => {
        resolve(res.ip ? res.ip : '0.0.0.0');
      }).catch((error) => {
        resolve('0.0.0.0')
      })
    }).catch((error) => {
      resolve('0.0.0.0')
    })
  })

}
