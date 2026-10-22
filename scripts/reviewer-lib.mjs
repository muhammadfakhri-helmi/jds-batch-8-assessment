import {privateDecrypt,constants,createDecipheriv} from 'node:crypto';
import {header} from '../src/crypto.js';
import {caseTeam,errors,legacyRoles,roles} from '../src/questions.js';
import {committeeRubric} from '../src/planning.js';
export const legacyRubrics={Internal:[['Strategic Thinking',25],['Analytical & Technical Skills',25],['Execution Planning',20],['Problem Solving',15],['Commitment',15]],External:[['Sourcing & Networking Strategy',30],['Communication & Persuasion',25],['Execution Planning',20],['Problem Solving',10],['Commitment',15]]};
export const rubrics={Internal:committeeRubric,External:committeeRubric};
export function recordRubricVersion(r){return r.rubricVersion??(r.scores?1:(r.answers.assessmentVersion??1));}
export const levels=['0 — Tidak ada bukti kompetensi atau jawaban tidak relevan.','1 — Gagasan sangat umum; tindakan, alasan, dan bukti tidak jelas.','2 — Sebagian relevan, tetapi asumsi atau rencana belum memadai.','3 — Rencana logis, realistis, dengan tindakan dan indikator yang jelas.','4 — Terukur, mengantisipasi risiko, disertai bukti dan alternatif.','5 — Sangat kuat: prioritas, trade-off, validasi asumsi, dan mekanisme evaluasi lengkap.'];
export function decryptMarkdown(md,key){
 if(md.length>5_000_000)throw Error('File terlalu besar.');
 const match=md.match(/```json\s*([\s\S]*?)\s*```/);if(!match)throw Error('Payload JSON tidak ditemukan.');const p=JSON.parse(match[1]);
 if(p.schemaVersion!==1||p.algorithm!=='RSA-OAEP-SHA256+AES-256-GCM'||!/^[-a-f0-9]{36}$/.test(p.submissionId))throw Error('Format tidak didukung.');
 const from=s=>{if(typeof s!=='string'||!s.length||!/^[A-Za-z0-9+/]+={0,2}$/.test(s))throw Error('Base64 tidak valid');return Buffer.from(s,'base64');};
 const raw=privateDecrypt({key,oaepHash:'sha256',padding:constants.RSA_PKCS1_OAEP_PADDING},from(p.encryptedKey));
 const iv=from(p.iv);const cipher=from(p.ciphertext);if(iv.length!==12||cipher.length<16)throw Error('Payload tidak valid.');
 const d=createDecipheriv('aes-256-gcm',raw,iv);d.setAAD(Buffer.from(header(p)));d.setAuthTag(cipher.subarray(-16));
 const data=JSON.parse(Buffer.concat([d.update(cipher.subarray(0,-16)),d.final()]).toString('utf8'));
 const validated={...data.answers};
 if(!validated.assessmentVersion){const team=caseTeam(validated),index=legacyRoles[team]?.indexOf(validated.q9);if(index>=0)validated.q9=roles[team][index];}
 if(!data.answers||![0,1,2,3,4].every(i=>errors(i,validated).length===0))throw Error('Jawaban tidak lengkap atau tidak valid.');
 return {submissionId:p.submissionId,...data,status:'Pending',scores:null,notes:'',rubricVersion:data.answers.assessmentVersion??1};
}
export function weighted(team,scores,version=2){const rubric=(version===1?legacyRubrics:rubrics)[team];if(!rubric||!Array.isArray(scores)||scores.length!==5||scores.some(s=>!Number.isFinite(s)||s<0||s>5))throw Error('Lima skor 0–5 diperlukan.');return Math.round(rubric.reduce((sum,[,w],i)=>sum+scores[i]/5*w,0)*100)/100;}
export function recommendation(score){return score>=85?'Strong Candidate':score>=75?'Recommended':score>=65?'Consider / Interview':'Further Evaluation';}
export function csv(records){const ids=['q1','q2','q3','q4','otherSkills','q5','q6','schedule','q7','caseTeam','q8','q9','q10','q11','q12','q13','q14','q15','q16','q17','q18','q19','q20','q21','q22','placementNotes','consent'];const headings=['Submission ID','Submitted at','Division','Assessment','Status','Weighted score','Recommendation','Scores (rubric order)','Reviewer notes',...ids];
 const cell=v=>{let s=Array.isArray(v)?v.join('; '):String(v??'');if(/^[\s]*[=+@\-]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
 return '\ufeff'+[[...headings,'Rubric version'],...records.map(r=>{const team=caseTeam(r.answers),version=recordRubricVersion(r),score=r.scores?weighted(team,r.scores,version):'';return [r.submissionId,r.submittedAt,r.answers.q7,team,r.status,score,score===''?'Not scored':recommendation(score),r.scores,r.notes,...ids.map(id=>r.answers[id]),version];})].map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}
