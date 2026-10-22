const enc=new TextEncoder();
export const b64=bytes=>{let s='';for(const b of new Uint8Array(bytes))s+=String.fromCharCode(b);return btoa(s);};
export const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
export const header=p=>JSON.stringify({schemaVersion:p.schemaVersion,submissionId:p.submissionId,algorithm:p.algorithm});
export async function encryptAnswers(answers,pem){
 const publicKey=await crypto.subtle.importKey('spki',unb64(pem.replace(/-----[^-]+-----|\s/g,'')),{name:'RSA-OAEP',hash:'SHA-256'},false,['wrapKey']);
 const key=await crypto.subtle.generateKey({name:'AES-GCM',length:256},true,['encrypt']);
 const p={schemaVersion:1,submissionId:crypto.randomUUID(),algorithm:'RSA-OAEP-SHA256+AES-256-GCM',encryptedKey:'',iv:b64(crypto.getRandomValues(new Uint8Array(12))),ciphertext:''};
 p.ciphertext=b64(await crypto.subtle.encrypt({name:'AES-GCM',iv:unb64(p.iv),additionalData:enc.encode(header(p)),tagLength:128},key,enc.encode(JSON.stringify({submittedAt:new Date().toISOString(),answers}))));
 p.encryptedKey=b64(await crypto.subtle.wrapKey('raw',key,publicKey,{name:'RSA-OAEP'}));
 return p;
}
export function markdown(p){return '# JDS Batch 8 — Encrypted Assessment\n\nAES-GCM authentication tag: final 16 bytes of ciphertext.\n\n```json\n'+JSON.stringify(p,null,2)+'\n```\n';}
