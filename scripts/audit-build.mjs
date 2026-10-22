import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
function scan(dir){for(const e of readdirSync(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory()){if(['private','scripts','docs'].includes(e.name))throw Error('Folder lokal masuk build: '+p);scan(p);}else if(/-----BEGIN (?:RSA |ENCRYPTED )?PRIVATE KEY-----/.test(readFileSync(p,'utf8')))throw Error('Private key ditemukan: '+p);}}
if(!existsSync('dist/public-key.pem'))throw Error('Public key belum disiapkan. Jalankan npm run setup-keys secara lokal.');scan('dist');console.log('Build audit passed: public key tersedia, private key dan reviewer tidak masuk build.');
