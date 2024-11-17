export function capitalize(value: string) {
  if (value.length > 0)
    return [value[0].toUpperCase(), value.substring(1).toLowerCase()].join('');
  return value;
}

async function encryptMessage(message: string, publicKey: CryptoKey) {
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    encodedMessage,
  );

  return encrypted;
}

async function decryptMessage(
  encryptedData: ArrayBufferLike,
  privateKey: CryptoKey,
) {
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    privateKey,
    encryptedData,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}

export async function encryptMessageFromKey(key: string, message: string) {
  const _key = new Uint8Array(JSON.parse(key)).buffer;
  console.log('_key:', _key);
  const publicKey = await window.crypto.subtle.importKey(
    'spki',
    _key,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  );
  const encryptedMessage = await encryptMessage(message, publicKey);
  return Array.from(new Uint8Array(encryptedMessage));
}

export async function decryptMessageFromKey(key: string, content: ArrayBuffer) {
  const _key = new Uint8Array(JSON.parse(key)).buffer;
  const _message = new Uint8Array(content);

  const privateKey = await window.crypto.subtle.importKey(
    'pkcs8',
    _key,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  );
  return await decryptMessage(_message, privateKey);
}
