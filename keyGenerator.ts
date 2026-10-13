import EC from 'elliptic';

function generateKeys(): { publicKey: string, privateKey: string, key: EC.ec.KeyPair } {

  const ec = new EC.ec('secp256k1');
  const key = ec.genKeyPair();

  const publicKey: string = key.getPublic('hex');
  const privateKey: string = key.getPrivate('hex');

  return { publicKey, privateKey, key }

}

export { generateKeys }
