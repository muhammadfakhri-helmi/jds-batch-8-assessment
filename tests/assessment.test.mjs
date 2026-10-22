import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync} from 'node:crypto';
import {readFileSync,readdirSync,mkdtempSync,writeFileSync,cpSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {encryptAnswers,markdown} from '../src/crypto.js';
import {questions,errors,cleanAnswers,caseTeam,legacyRoles} from '../src/questions.js';
import {decryptMarkdown,weighted,csv,recommendation} from '../scripts/reviewer-lib.mjs';
const pair=()=>generateKeyPairSync('rsa',{modulusLength:2048,publicKeyEncoding:{type:'spki',format:'pem'},privateKeyEncoding:{type:'pkcs8',format:'pem'}});
const key=pair();
test('shared responsibility is an essay; external targets are required and nominee is optional',async()=>{
 for(const team of ['Internal','External']){
  const a=cleanAnswers(answers(team));delete a.rewardNominee;
  assert.equal(questions(1,a).find(q=>q.id==='q9').type,'textarea');
  assert.deepEqual(errors(4,a),[]);
  if(team==='External'){delete a.targetCompanies;assert.ok(errors(3,a).includes('targetCompanies'));a.targetCompanies='Perusahaan Uji';delete a.targetPeople;assert.ok(errors(3,a).includes('targetPeople'));a.targetPeople='Engineer geothermal dengan pengalaman 5 tahun';}
  a.rewardNominee='Nama Uji Reward';const md=markdown(await encryptAnswers(a,key.publicKey));assert.ok(!md.includes(a.rewardNominee));
  const r=decryptMarkdown(md,key.privateKey);assert.equal(r.answers.rewardNominee,a.rewardNominee);assert.equal(r.rubricVersion,2);assert.ok(csv([r]).includes('Nama Uji Reward'));
 }
});
test('v2 submissions remain readable without newly required outreach fields',async()=>{
 const a=cleanAnswers(answers('External'));a.assessmentVersion=2;a.q9='Strategic Networking';delete a.targetPeople;delete a.targetCompanies;delete a.rewardNominee;
 const r=decryptMarkdown(markdown(await encryptAnswers(a,key.publicKey)),key.privateKey);assert.equal(r.answers.q9,'Strategic Networking');assert.equal(r.rubricVersion,2);
});
test('new common rubric uses 30/20/20/20/10 for both tracks; old scores retain their meaning',()=>{
 for(const team of ['Internal','External'])for(let i=0;i<5;i++){const scores=[0,0,0,0,0];scores[i]=5;assert.equal(weighted(team,scores),[30,20,20,20,10][i]);}
 assert.equal(weighted('External',[5,4,3,4,5]),84);
 assert.equal(weighted('External',[5,4,3,4,5],1),85);
 const old={submissionId:'legacy',answers:{q7:'External'},scores:[5,4,3,4,5],status:'Interview'};
 assert.ok(csv([old]).includes('"85"'));
 assert.ok(csv([{...old,rubricVersion:2}]).includes('"84"'));
});
test('legacy encrypted answers still decrypt without replacing original role',async()=>{
 for(const team of ['Internal','External']){
  const a=cleanAnswers(answers(team));delete a.assessmentVersion;a.q9=legacyRoles[team][2];
  const result=decryptMarkdown(markdown(await encryptAnswers(a,key.publicKey)),key.privateKey);
  assert.equal(result.answers.q9,a.q9);assert.equal(result.rubricVersion,1);
 }
});
function answers(division='Internal',track='Internal'){const a={q7:division,caseTeam:track,consent:true};for(let i=0;i<5;i++)for(const q of questions(i,a)){if(a[q.id])continue;a[q.id]=q.type==='select'?q.options[0]:q.type==='checks'?[q.options[0]]:'Bukti kandidat unik, tindakan, PIC dan hasil terukur.';}return a;}
test('Internal, External and both Flexible tracks require exactly the chosen case',()=>{for(const [division,track] of [['Internal','Internal'],['External','External'],['Flexible','Internal'],['Flexible','External']]){const a=answers(division,track);assert.equal(caseTeam(a),division==='Flexible'?track:division);assert.equal(questions(3,a).length,caseTeam(a)==='External'?7:5);for(let i=0;i<5;i++)assert.deepEqual(errors(i,a),[]);assert.equal(questions(3,a)[0].title,caseTeam(a)==='Internal'?'Perencanaan strategis':'Akuisisi kandidat');}});
test('required validation, consent, invalid roles and conditional details',()=>{const a=answers();a.q1=' ';assert.ok(errors(0,a).includes('q1'));a.q9=' ';assert.ok(errors(1,a).includes('q9'));a.consent=false;assert.ok(errors(4,a).includes('consent'));a.q4=['Other'];assert.ok(errors(0,a).includes('otherSkills'));a.q22='Willing with considerations';assert.ok(errors(4,a).includes('placementNotes'));a.q4=['bogus'];assert.ok(errors(0,a).includes('q4'));});
test('stale conditional answers do not enter payload',()=>{const a=answers();a.otherSkills='secret stale';a.placementNotes='old';assert.ok(!('otherSkills' in cleanAnswers(a)));assert.ok(!('caseTeam' in cleanAnswers(a)));assert.ok(!('placementNotes' in cleanAnswers(a)));});
test('browser Web Crypto encryption and local decryption round-trip; no plaintext',async()=>{const a=cleanAnswers(answers());const p=await encryptAnswers(a,key.publicKey);const md=markdown(p);assert.ok(!md.includes(a.q1));assert.ok(!md.includes('answers'));assert.deepEqual(decryptMarkdown(md,key.privateKey).answers,a);});
test('wrong private key rejected',async()=>{const md=markdown(await encryptAnswers(cleanAnswers(answers()),key.publicKey));assert.throws(()=>decryptMarkdown(md,pair().privateKey));});
test('tampered ciphertext, metadata, IV and wrapped key are rejected',async()=>{const p=await encryptAnswers(cleanAnswers(answers()),key.publicKey);for(const field of ['ciphertext','iv','encryptedKey']){const m={...p};const b=Buffer.from(m[field],'base64');b[0]^=1;m[field]=b.toString('base64');assert.throws(()=>decryptMarkdown(markdown(m),key.privateKey));}assert.throws(()=>decryptMarkdown(markdown({...p,submissionId:'00000000-0000-4000-8000-000000000000'}),key.privateKey));});
test('scoring weights, thresholds, zero and rejected values',()=>{assert.equal(weighted('Internal',[5,5,5,5,5]),100);assert.equal(weighted('External',[5,0,0,0,0]),30);assert.equal(weighted('Internal',[0,0,0,0,0]),0);assert.equal(recommendation(84.9),'Recommended');assert.throws(()=>weighted('Internal',[6,2,2,2,2]));assert.throws(()=>weighted('Internal',[NaN,2,2,2,2]));});
test('CSV BOM, Unicode, formula injection, commas and quote escaping',()=>{const r={submissionId:'id',answers:answers(),status:'Pending',notes:'=HYPERLINK("x")',scores:[5,5,5,5,5]};r.answers.q1='Fakhri, "Helmi"';const out=csv([r]);assert.ok(out.startsWith('\ufeff'));assert.ok(out.includes('"Fakhri, ""Helmi"""'));assert.ok(out.includes("' =")==false);assert.ok(out.includes("'=HYPERLINK"));assert.ok(out.includes('"100"'));});
test('public files contain no private key and gitignore protects local data',()=>{for(const f of readdirSync('public'))assert.ok(!readFileSync(join('public',f),'utf8').includes('PRIVATE KEY'));const ignore=readFileSync('.gitignore','utf8');assert.ok(ignore.includes('private/'));assert.ok(ignore.includes('*.pem'));});
test('CLI batch import, duplicate detection, filtering, scoring, and CSV export',async()=>{const dir=mkdtempSync(join(tmpdir(),'jds-test-'));for(const f of ['src','scripts'])cpSync(f,join(dir,f),{recursive:true});cpSync('package.json',join(dir,'package.json'));const {mkdirSync}=await import('node:fs');mkdirSync(join(dir,'private'));writeFileSync(join(dir,'private/private-key.pem'),key.privateKey);const p=await encryptAnswers(cleanAnswers(answers('Flexible','External')),key.publicKey);writeFileSync(join(dir,'one.md'),markdown(p));writeFileSync(join(dir,'bad.md'),'broken');const run=(...args)=>execFileSync(process.execPath,['scripts/reviewer.mjs',...args],{cwd:dir,encoding:'utf8'});assert.match(run('decrypt','one.md','one.md'),/Duplikat/);assert.equal(JSON.parse(readFileSync(join(dir,'private/reviews.json'))).length,1);assert.match(run('list','Flexible'),/Flexible/);assert.match(run('show',p.submissionId),/Akuisisi kandidat/);assert.match(run('score',p.submissionId,'5,4,3,4,5','Interview','Bukti kuat'),/84\/100/);run('export-csv');assert.ok(readFileSync(join(dir,'private/assessment-results.csv'),'utf8').startsWith('\ufeff'));assert.equal(spawnSync(process.execPath,['scripts/reviewer.mjs','decrypt','bad.md'],{cwd:dir}).status,1);});


