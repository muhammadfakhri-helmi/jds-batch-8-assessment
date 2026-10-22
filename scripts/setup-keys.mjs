import {generateKeyPairSync} from 'node:crypto';
import {mkdirSync,writeFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
const dir=resolve('private');
if(existsSync('private/private-key.pem')||existsSync('public/public-key.pem'))throw Error('Key sudah ada. Setup tidak menimpa kunci; simpan backup sebelum melakukan rotasi.');
mkdirSync(dir,{recursive:true,mode:0o700});
if(process.platform==='win32'){
 const identity=execFileSync('whoami',{encoding:'utf8'}).trim();
 execFileSync('icacls',[dir,'/inheritance:r','/grant:r',`${identity}:(OI)(CI)F`],{stdio:'pipe'});
}
const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:3072,publicKeyEncoding:{type:'spki',format:'pem'},privateKeyEncoding:{type:'pkcs8',format:'pem'}});
writeFileSync('private/private-key.pem',privateKey,{flag:'wx',mode:0o600});
mkdirSync('public',{recursive:true});writeFileSync('public/public-key.pem',publicKey,{flag:'wx'});
console.log('Public key: public/public-key.pem. Private key: private/private-key.pem (lokal saja). Simpan backup offline aman. Kehilangan private key membuat jawaban lama tidak dapat dipulihkan.');
