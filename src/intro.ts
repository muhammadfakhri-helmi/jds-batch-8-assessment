import {internalPositions,externalPositions,committeeRubric,timeline} from './planning.js';

export function intro(){return `
<section class="hero">
 <div><span class="eyebrow">JDS BATCH 8 · RECRUITMENT PLANNING</span>
 <h1>Pahami targetnya.<br>Temukan peranmu.<br><em>Bangun tim bersama.</em></h1>
 <p class="lead">Sebelum mengisi asesmen, kenali arah rekrutmen, tanggung jawab panitia, dan kriteria penilaian yang ditetapkan Ketua Rekrutmen JDS Batch 8.</p>
 <p class="reading-note">Baca informasi di bawah terlebih dahulu. Tombol <strong>Mulai Asesmen</strong> tersedia setelah seluruh penjelasan.</p></div>
 <aside class="blueprint"><span class="eyebrow">TARGET PENDAFTARAN / BATCH 08</span>
 <strong>300<span>total kandidat yang mendaftar</span></strong>
 <div class="target-row"><div><b>200</b><span>OFFLINE · 66,7%</span></div><div><b>100</b><span>ONLINE · 33,3%</span></div></div>
 <p>280 experienced professionals<br>20 fresh graduates</p>
 <div class="technical-line"></div><small>TARGET PENDAFTARAN<br>BUKAN KUOTA FINAL PESERTA DITERIMA</small></aside>
</section>
<section class="card planning-section" aria-labelledby="targets-heading">
 <span class="eyebrow">01 / ARAH & TARGET KETUA</span><h2 id="targets-heading">300 pendaftar. Rekrutmen yang terarah.</h2>
 <p>Target kita adalah <strong>300 kandidat yang mendaftar: 200 offline dan 100 online</strong>. Jumlah peserta yang diterima akan ditentukan melalui proses seleksi. Jumlah kontak yang perlu dijangkau menyesuaikan conversion rate menuju pendaftaran.</p>
 <div class="target-details"><article><b>≥10</b><h3>Operator & geothermal</h3><p>Profesional dari perusahaan operator migas atau geothermal.</p></article><article><b>≥10</b><h3>Senior service company</h3><p>Profesional service company dengan pengalaman 5+ tahun.</p></article><article><b>≥20</b><h3>Kontributor networking</h3><p>Mampu membuka hubungan profesional dan peluang kolaborasi industri.</p></article></div>
 <p class="micro">Target segmen merupakan bagian dari total 300 pendaftar. Kategori networking dapat tumpang tindih. Status keluarga, hubungan personal dengan pejabat, dan latar belakang sosial bukan kriteria kelayakan.</p>
</section>
<section class="planning-section" aria-labelledby="structure-heading">
 <span class="eyebrow">02 / STRUKTUR TIM REKRUTMEN</span><h2 id="structure-heading">Nilai kemampuan dulu, susun tim kemudian.</h2>
 <div class="chair-card"><span class="pill">KETUA REKRUTMEN JDS BATCH 8</span><h3>Muhammad Fakhri Helmi</h3><p>Strategi · Pengawasan · Keputusan</p></div>
 <div class="team-grid"><article class="card"><span class="pill">INTERNAL · 5 ORANG</span><h3>Mengelola proses dan data.</h3><p>Menyiapkan perencanaan, sistem, administrasi, materi promosi, dan pengalaman kandidat sepanjang rekrutmen.</p></article><article class="card"><span class="pill">EKSTERNAL · FLEKSIBEL</span><h3>Menjangkau dan mengajak kandidat.</h3><p>Sourcing kandidat, promosi, networking, dan konversi pendaftaran. Jumlah anggota menyesuaikan kualitas calon panitia, kapasitas kerja, serta kebutuhan rekrutmen—ditetapkan setelah asesmen.</p></article></div>
</section>
<section class="card planning-section" aria-labelledby="roles-heading">
 <span class="eyebrow">03 / RUANG KONTRIBUSI</span><h2 id="roles-heading">Lima tanggung jawab bersama tim internal.</h2>
 <p>Lima anggota Internal bersama-sama menjalankan seluruh fungsi berikut. Pembagian pekerjaan dikoordinasikan dalam tim; calon panitia tidak diminta memilih satu jabatan.</p>
 <div class="position-list">${internalPositions.map(([title,skills],i)=>`<article><span class="position-number">0${i+1}</span><div><h3>${title}</h3><p>${skills}.</p></div></article>`).join('')}</div>
 <h3 class="external-heading">Fungsi tim eksternal</h3><div class="external-functions">${externalPositions.map(role=>`<span>${role}</span>`).join('')}</div>
 <p class="micro">Seluruh anggota External berbagi tanggung jawab sourcing, promosi, networking, outreach, follow-up, dan konversi pendaftaran. Setiap anggota menyusun sasaran orang/profil, perusahaan, dan KPI pendaftaran sesuai kapasitasnya.</p>
</section>
<section class="planning-section" aria-labelledby="rubric-heading">
 <span class="eyebrow">04 / CARA KAMI MENILAI</span><h2 id="rubric-heading">Komitmen dan kemampuan yang bisa dibuktikan.</h2>
 <div class="rubric-layout"><div class="card rubric-bars">${committeeRubric.map(([label,weight])=>`<div class="rubric-item"><div><span>${label}</span><strong>${weight}%</strong></div><div class="rubric-track"><span style="width:${Number(weight)/30*100}%"></span></div></div>`).join('')}</div>
 <div class="placement-copy"><h3>Peran mengikuti kekuatan Anda.</h3><p>Kandidat yang kuat dalam analisis, administrasi, dan pengelolaan sistem diarahkan ke <strong>internal</strong>.</p><p>Kandidat yang komunikatif, memiliki jaringan profesional relevan, dan aktif melakukan outreach diarahkan ke <strong>eksternal</strong>.</p><p>Setiap kriteria dinilai 0–5 oleh reviewer. Skor menjadi bahan pertimbangan bersama bukti pengalaman dan kecocokan peran; keputusan akhir ditetapkan Ketua Rekrutmen.</p></div></div>
</section>
<section class="card planning-section" aria-labelledby="timeline-heading">
 <span class="eyebrow">05 / TIMELINE REKRUTMEN</span><h2 id="timeline-heading">Siap sebelum 16 Desember 2026.</h2>
 <p>Asesmen ini membantu memetakan calon panitia, memilih lima anggota internal yang paling sesuai, menentukan kebutuhan eksternal, dan menetapkan target kerja sebelum open recruitment.</p>
 <div class="timeline">${timeline.map(([date,label])=>`<div><small>${date}</small><b>${label}</b></div>`).join('')}</div>
</section>
<section class="card planning-section"><span class="eyebrow">06 / REWARD PENCAPAIAN KPI</span><h2>Kontribusi yang mencapai target mendapat apresiasi.</h2><p>Setiap anggota panitia yang memenuhi KPI berhak mengajukan <strong>titip nama</strong> sebagai reward. Pada akhir asesmen, Anda dapat menuliskan nama yang direncanakan untuk jatah Anda. Jika belum ada, kolom tersebut boleh dikosongkan.</p></section><section class="privacy"><h3>Privasi dan cara pengumpulan</h3><p>Jawaban hanya berada di memori tab ini hingga diunduh sebagai file terenkripsi. Jangan tutup atau muat ulang halaman selama mengisi. Setelah selesai, kirim file melalui kanal resmi panitia. Hanya pemilik private key yang dapat membukanya.</p></section>
<section class="assessment-start" aria-labelledby="start-heading"><span class="eyebrow">INFORMASI SUDAH DIBACA? LANGKAH BERIKUTNYA:</span><h2 id="start-heading">Ceritakan kemampuan dan komitmen Anda.</h2><p>Isi pengalaman, pilih divisi yang diminati, lalu kerjakan studi kasus. Jawab dengan jujur, konkret, dan sesuai kemampuan Anda.</p><button id="start">Mulai Asesmen <span aria-hidden="true">↗</span></button><p class="micro">20–30 menit · Tanpa akun · Jawaban terenkripsi</p></section>`;}

