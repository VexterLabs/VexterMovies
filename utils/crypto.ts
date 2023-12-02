import CryptoJS from 'crypto-js';

// 这是密钥，非常重要，可以是后台获取，或者是前后台约定好，注意保护
const key = CryptoJS.enc.Utf8.parse('mjlsd5rsoz9i41uk');
const iv = CryptoJS.enc.Utf8.parse('ubj7m9mlhmoj2jcu');

/**
 * 解密
 * @param {String} word 解密内容
 * @returns
 */
export function decrypt(word: string) {
  const base64 = CryptoJS.enc.Base64.parse(word);
  const src = CryptoJS.enc.Base64.stringify(base64);

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypt.toString(CryptoJS.enc.Utf8);
}

/**
 * 加密
 * @param {String} word 加密内容
 * @returns
 */
export function encrypt(word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

