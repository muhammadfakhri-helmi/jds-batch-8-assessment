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

Impor menyimpan plaintext di `private/reviews.json`. Submission ID duplikat dilewati dan tidak menimpa skor/catatan. Batch tetap mengimpor file valid meskipun satu file gagal; exit code nonzero menandakan sebagian gagal. `show` menampilkan profil, soal, jawaban, rubrik, skor, status, dan catatan. Filter `list` menerima Internal, External, Flexible berdasarkan preferensi. Untuk Flexible, rubrik memakai jalur studi kasus terpilih.

Lima nilai 0–5 dimasukkan sesuai urutan berikut:

| Internal | Bobot | External | Bobot |
|---|---:|---|---:|
| Strategic Thinking |25%|Sourcing & Networking Strategy|30%|
| Analytical & Technical Skills |25%|Communication & Persuasion|25%|
| Execution Planning |20%|Execution Planning|20%|
| Problem Solving |15%|Problem Solving|10%|
| Commitment |15%|Commitment|15%|

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
| Strategic Thinking | Segmentasi, target, prioritas Q11/Q14/Q16 | 3: strategi masuk akal; 5: ada trade-off sumber daya dan skenario perubahan target |
| Analytical & Technical | Struktur data, deduplikasi, privasi, konversi Q15/Q17 | 3: hitungan benar dan data relevan; 5: menguji kualitas data, denominator, biaya, dan bias |
| Sourcing & Networking | Sumber kontak relevan, funnel, etika Q14/Q16/Q17 | 3: sumber dan target jelas; 5: funnel terukur, asumsi tervalidasi dan alternatif etis |
| Communication & Persuasion | Pesan relevan, manfaat terverifikasi, consent Q15/Q18 External | 3: pesan profesional; 5: sangat kontekstual, mendengar keberatan, follow-up berbatas |
| Execution Planning | PIC, jadwal, deliverable, dependensi Q12/Q14 | 3: langkah dapat dijalankan; 5: kapasitas realistis, checkpoint, dan rencana cadangan |
| Problem Solving | Diagnosis, eskalasi, eksperimen Q12/Q13/Q20 | 3: penyelesaian logis; 5: akar sebab, mitigasi, serta pembelajaran yang dapat diuji |
| Commitment | Jadwal, tanggung jawab, motivasi Q6/Q10/Q19–22 | 3: komitmen konsisten; 5: bukti ownership dan mitigasi konflik jadwal yang kuat |

CSV UTF-8 BOM berada di `private/assessment-results.csv`, mencakup semua jawaban, preferensi, jalur, skor, catatan, dan status. Buka di Excel melalui Data → From Text/CSV bila separator tidak dikenali otomatis. Simpan dan bagikan hanya melalui kanal internal yang sesuai.
