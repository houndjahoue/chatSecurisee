import { Injectable } from '@nestjs/common';
import { subtle } from 'crypto';

@Injectable()
export class EncryptionService {
  stringToArrayBuffer(str: string) {
    const buf = new ArrayBuffer(str.length * 2);
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  arrayBufferToString(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  async generateKeys() {
    const key = await subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt'],
    );

    const publicKey = await subtle.exportKey('spki', key.publicKey);
    const privateKey = await subtle.exportKey('pkcs8', key.privateKey);

    const stringify = (key: ArrayBuffer) =>
      JSON.stringify(Array.from(new Uint8Array(key)));

    return {
      publicKey: stringify(publicKey),
      privateKey: stringify(privateKey),
    };
  }
}
