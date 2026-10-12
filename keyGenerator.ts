import EC from 'elliptic';
import BN = require("bn.js");


const ec = new EC.ec('secp256k1');

const key = ec.genKeyPair();
const publicKey: string = key.getPublic('hex');
const privateKey: string = key.getPrivate('hex');

console.log({ publicKey, privateKey })




