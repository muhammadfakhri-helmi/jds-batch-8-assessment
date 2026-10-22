# Panduan reviewer lokal

Jalankan dari root proyek di perangkat yang menyimpan private key. Letakkan file kandidat dalam `private/inbox/` (buat folder jika belum ada). Jangan menaruhnya di public atau src.

```powershell
npm run decrypt -- private/inbox/file1.md private/inbox/file2.md
# Banyak file dalam PowerShell:
$assessmentFiles = Get-ChildItem -LiteralPath private/inbox -Filter *.md | ForEach-Object FullName
node scripts/reviewer.mjs decrypt @assessmentFiles
npm run review -- list
npm run review -- list Flexible
npm run review -- show SUBMISSION_ID
npm run review -- score SUBMISSION_ID "4,4,3,4,5" Interview "Bukti kontribusi kuat; klarifikasi jadwal"
npm run export-csv
```

Impor menyimpan plaintext di `private/reviews.json`. Submission ID duplikat dilewati dan tidak menimpa skor/catatan. Batch tetap mengimpor file valid meskipun satu file gagal; exit code nonzero menandakan sebagian gagal. `show` menampilkan profil, soal, jawaban, rubrik, skor, status, dan catatan. Filter `list` menerima Internal, External, Flexible berdasarkan preferensi. Rubrik versi 2 sama untuk semua divisi.

Perubahan strategi 22 Oktober 2026: target 300 **pendaftar**, 200 offline dan 100 online, bukan kuota peserta diterima. Internal lima orang, eksternal fleksibel sesuai hasil asesmen. Jumlah kontak dan target kontribusi individu mengikuti kapasitas dan conversion rate.

Lima nilai 0–5 dimasukkan sesuai urutan berikut:

| Kriteria versi 2 — semua divisi | Bobot |
|---|---:|
| Komitmen & waktu |30%|
| Kemampuan komunikasi |20%|
| Networking / relasi |20%|
| Kemampuan teknis / administrasi |20%|
| Inisiatif & problem solving |10%|

Contoh skor `5,4,3,4,5` menghasilkan **84/100**. Penempatan internal mengutamakan kekuatan analisis, administrasi, dan sistem; eksternal mengutamakan komunikasi serta outreach profesional. Keputusan akhir tetap pada ketua.

Kompatibilitas: jawaban lama tetap dapat diimpor, termasuk nama posisi lama. Skor tersimpan tanpa versi diperlakukan sebagai rubrik versi 1 sehingga tidak berubah diam-diam. `show`, `list`, dan CSV mempertahankan perhitungan lama. Menjalankan `score` berarti reviewer memberi **lima nilai baru dalam urutan versi 2**, lalu rekaman diberi `rubricVersion: 2`. Jangan menyalin urutan skor lama begitu saja. CSV menyertakan kolom versi rubrik.

Skor = jumlah `(nilai / 5) × bobot`. Belum dinilai berbeda dari nilai nol. Nilai desimal diperbolehkan. Rentang rekomendasi: ≥85 Strong Candidate; ≥75 Recommended; ≥65 Consider / Interview; <65 Further Evaluation. Rekomendasi bukan keputusan seleksi otomatis.

Status diatur reviewer: Pending, Recommended, Interview, Accepted, Rejected. Status tidak otomatis mengikuti skor.

## Deskripsi nilai 0–5

- 0: Tidak ada bukti kompetensi atau jawaban tidak relevan.
- 1: Gagasan sangat umum; tindakan, alasan, dan bukti tidak jelas.
- 2: Sebagian relevan, tetapi asumsi atau rencana belum memadai.
- 3: Rencana logis dan realistis dengan tindakan dan indikator jelas.
- 4: Terukur, mengantisipasi risiko, disertai bukti dan alternatif.
- 5: Sangat kuat: prioritas, trade-off, validasi asumsi, dan mekanisme evaluasi lengkap.

Terapkan skala ini pada bukti per kriteria di bawah, bukan panjang jawaban atau kecocokan kata kunci:

| Kriteria | Bukti yang dinilai | Pembeda nilai 3 dengan 5 |
|---|---|---|
| Komitmen & waktu | Jadwal, tanggung jawab, motivasi Q6/Q10/Q19–22 | 3: komitmen realistis; 5: bukti ownership dan mitigasi konflik jadwal |
| Kemampuan komunikasi | Kejelasan jawaban, koordinasi Q3/Q13, pesan/follow-up External | 3: jelas dan profesional; 5: kontekstual, mendengar keberatan, follow-up berbatas |
| Networking / relasi | Kolaborasi Q3/Q11, sumber outreach dan etika External | 3: hubungan relevan dan sukarela; 5: bukti membangun jaringan, funnel terukur, etika kuat |
| Kemampuan teknis / administrasi | Bukti skill Q4/Q5, data, tracking, rencana dan ketelitian | 3: mampu menjalankan tugas; 5: kualitas data, privasi, dokumentasi dan evaluasi kuat |
| Inisiatif & problem solving | Diagnosis, tindakan, eskalasi, eksperimen Q12/Q13/Q18/Q20 | 3: solusi logis; 5: akar sebab, alternatif, mitigasi dan pembelajaran terukur |

CSV UTF-8 BOM berada di `private/assessment-results.csv`, mencakup semua jawaban, preferensi, jalur, skor, catatan, dan status. Buka di Excel melalui Data → From Text/CSV bila separator tidak dikenali otomatis. Simpan dan bagikan hanya melalui kanal internal yang sesuai.
