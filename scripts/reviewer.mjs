import {readFileSync,writeFileSync,existsSync,mkdirSync,renameSync} from 'node:fs';
import {resolve} from 'node:path';
import {decryptMarkdown,rubrics,levels,weighted,recommendation,csv} from './reviewer-lib.mjs';
import {caseTeam,questions} from '../src/questions.js';
const [cmd,...args]=process.argv.slice(2);const store='private/reviews.json';
function load(){return existsSync(store)?JSON.parse(readFileSync(store,'utf8')):[];}
function save(rows){mkdirSync('private',{recursive:true,mode:0o700});writeFileSync(store+'.tmp',JSON.stringify(rows,null,2),{mode:0o600});renameSync(store+'.tmp',store);}
try{
 if(cmd==='decrypt'){
  if(!args.length)throw Error('Berikan satu atau beberapa path file .md.');
  const key=readFileSync('private/private-key.pem','utf8'),rows=load();let failed=false;
  for(const path of args){try{const row=decryptMarkdown(readFileSync(path,'utf8'),key);if(rows.some(r=>r.submissionId===row.submissionId)){console.log('Duplikat dilewati: '+row.submissionId);continue;}rows.push(row);save(rows);console.log('Diimpor: '+row.submissionId);}catch{failed=true;console.error('Tidak dapat mengimpor: '+path+' (format/kunci/verifikasi gagal).');}}
  if(failed)process.exitCode=1;
 }else if(cmd==='list'){
  if(args[0]&&!['Internal','External','Flexible'].includes(args[0]))throw Error('Filter: Internal, External, Flexible');
  console.table(load().filter(r=>!args[0]||r.answers.q7===args[0]).map(r=>({id:r.submissionId,name:r.answers.q1,division:r.answers.q7,assessment:caseTeam(r.answers),status:r.status,score:r.scores?weighted(caseTeam(r.answers),r.scores):'Not scored'})));
 }else if(cmd==='show'){
  const r=load().find(r=>r.submissionId===args[0]);if(!r)throw Error('Submission tidak ditemukan.');
  console.log(`ID: ${r.submissionId}\nStatus: ${r.status}\nCatatan: ${r.notes}`);
  for(let i=0;i<5;i++)for(const q of questions(i,r.answers))console.log(`\n${q.id}. ${q.title}\n${q.prompt}\nJawaban: ${Array.isArray(r.answers[q.id])?r.answers[q.id].join(', '):r.answers[q.id]}`);
  console.table(rubrics[caseTeam(r.answers)].map(([criterion,weight],i)=>({criterion,weight,score:r.scores?.[i]??'Belum dinilai'})));console.log(levels.join('\n'));
 }else if(cmd==='score'){
  const [id,values,status='Pending',notes='']=args;const rows=load(),r=rows.find(r=>r.submissionId===id);if(!r)throw Error('Submission tidak ditemukan.');
  if(!['Pending','Recommended','Interview','Accepted','Rejected'].includes(status))throw Error('Status tidak valid.');
  if(!values||values.split(',').some(v=>!v.trim()))throw Error('Lima skor diperlukan.');const scores=values.split(',').map(Number);const score=weighted(caseTeam(r.answers),scores);Object.assign(r,{scores,status,notes});save(rows);console.log(`${score}/100 — ${recommendation(score)}. Pertimbangan reviewer, bukan keputusan otomatis.`);
 }else if(cmd==='export-csv'){
  const target=resolve(args[0]||'private/assessment-results.csv');if(!target.toLowerCase().endsWith('.csv'))throw Error('Output harus .csv.');if(!target.startsWith(resolve('private')+'\\')&&!target.startsWith(resolve('private')+'/'))throw Error('Ekspor hanya di folder private/.');mkdirSync('private',{recursive:true,mode:0o700});writeFileSync(target,csv(load()),{mode:0o600});console.log('CSV tersimpan: '+target);
 }else console.log('Reviewer lokal — jalankan dari root proyek\n npm run decrypt -- file1.md file2.md\n npm run review -- list [Internal|External|Flexible]\n npm run review -- show ID\n npm run review -- score ID "4,4,3,4,5" Interview "Catatan reviewer"\n npm run export-csv\nData pribadi hanya disimpan di private/. Jangan bagikan layar atau output terminal saat menampilkan kandidat.');
}catch(e){console.error(e.message);process.exitCode=1;}
