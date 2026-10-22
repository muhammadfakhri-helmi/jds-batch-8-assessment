# MASTER PROMPT CODEX
## JDS Batch 8 — Recruitment Committee Assessment Platform

Kamu adalah Senior Full-Stack Developer, UI/UX Designer, dan Software Security Engineer.

Bangun sebuah website profesional bernama:

**JDS Batch 8 — Recruitment Committee Assessment**

Website ini digunakan oleh Muhammad Fakhri Helmi, Ketua Rekrutmen Jakarta Drilling Society (JDS) Batch 8, untuk melakukan asesmen terhadap calon anggota panitia.

**WAJIB: Kerjakan implementasi kode secara langsung, bukan hanya membuat rencana atau pseudocode.**

Jika repository sudah tersedia, periksa strukturnya dan lanjutkan implementasi. Jika belum tersedia, buat proyek baru yang siap dipublikasikan menggunakan GitHub Pages.

---

# 1. PROJECT OBJECTIVES

Website harus mampu:

1. Mengumpulkan informasi latar belakang calon panitia.
2. Mengidentifikasi pengalaman organisasi, kompetensi, dan komitmen kandidat.
3. Memungkinkan kandidat memilih Internal Team, External Team, atau Flexible.
4. Menampilkan pertanyaan studi kasus berdasarkan divisi yang dipilih.
5. Mengukur kemampuan berpikir strategis, pemecahan masalah, kepemimpinan, dan eksekusi.
6. Menghasilkan file jawaban berformat `.md`.
7. Mengenkripsi isi jawaban agar hanya Ketua Rekrutmen yang memiliki private key dapat mendekripsinya.
8. Menyediakan aplikasi atau script lokal khusus Ketua Rekrutmen untuk membuka jawaban.
9. Mendukung ekspor hasil asesmen ke CSV yang dapat dibuka melalui Microsoft Excel.
10. Memiliki antarmuka modern, profesional, responsif, dan nyaman diakses melalui smartphone maupun desktop.

Website tidak membutuhkan login atau database online pada versi pertama.

---

# 2. RECRUITMENT CONTEXT

Target Rekrutmen JDS Batch 8:

| Recruitment Target | Quantity |
|---|---:|
| Total participants | 300 |
| Offline participants | 200 |
| Online participants | 100 |
| Experienced professionals | 280 |
| Fresh graduates | 20 |
| Operator oil & gas/geothermal professionals | Minimum 10 |
| Senior service company professionals (5+ years) | Minimum 10 |
| Strategic networking contributors | Minimum 20 |

Kategori networking dapat tumpang tindih dengan kategori profesional lain.

Strategic networking berarti kandidat mempunyai kemampuan membangun hubungan profesional, kolaborasi industri, peluang technical visit, atau memperkenalkan pihak yang relevan untuk sponsorship.

Jangan menggunakan status keluarga, hubungan personal dengan pejabat, atau latar belakang sosial sebagai kriteria kelayakan kandidat.

## Recruitment Timeline

- Preparation: November–15 Desember 2026.
- Open Recruitment: 16 Desember 2026–16 Januari 2027.
- Administrative Selection: 17 Januari–28 Februari 2027.
- Interview: 1–15 Maret 2027.
- Finalization: 16–20 Maret 2027.
- Announcement: 21–25 Maret 2027.
- Onboarding: 26–31 Maret 2027.

---

# 3. COMMITTEE ORGANIZATION

Buat dua kategori utama.

## A. INTERNAL RECRUITMENT TEAM

**Target: 5 orang.**

Internal Team bertanggung jawab terhadap perencanaan, strategi, pengelolaan data, persiapan promosi, sistem administrasi, dan evaluasi keberhasilan rekrutmen.

Lima posisi utama:

1. Recruitment Planning & Strategy
2. Data Management & Analytics
3. Administration & Screening
4. Creative & Promotion
5. Candidate Communication & Quality Assurance

Penilaian Internal harus mengutamakan kemampuan berpikir strategis, analitis, terstruktur, dan kemampuan menghasilkan solusi.

## B. EXTERNAL RECRUITMENT TEAM

**Rekomendasi kapasitas awal: 15 orang, belum menjadi kuota final.**

External Team bertanggung jawab mencari dan mengajak kandidat, melakukan pendekatan profesional, membangun networking, serta memastikan target rekrutmen tercapai.

Fungsi utamanya:

1. Operator & Geothermal Outreach
2. Service Company Outreach
3. University & Graduate Outreach
4. Industry Networking & Partnership
5. Candidate Engagement & Follow-up

Gunakan asumsi awal kontribusi rata-rata 20 peserta terkonfirmasi per anggota External Team. Jelaskan bahwa angka tersebut merupakan target perencanaan, bukan jaminan hasil dan harus disesuaikan dengan hasil asesmen serta conversion rate.

Tampilkan kuota panitia Internal 5 orang dan External 15 orang (estimasi) pada halaman pengantar.

---

# 4. WEBSITE DESIGN

Gunakan gaya profesional engineering organization:

- Modern corporate visual identity.
- Dominan warna navy, putih, dan biru.
- Clean typography.
- Responsive mobile-first design.
- Tidak menggunakan tampilan seperti Google Form standar.
- Smooth transition antartahap.
- Progress bar untuk menunjukkan tahap pengisian.
- Form validation.
- Back/Next navigation.
- Review answers sebelum submit.
- Estimasi pengisian 20–30 menit.
- Accessibility yang baik.
- Tidak memerlukan akun atau registrasi.

Gunakan React + TypeScript + Vite + Tailwind CSS atau stack ringan yang sepadan.

Pastikan output build berjalan sebagai static website pada GitHub Pages, termasuk jika dipublikasikan pada repository path, bukan root domain.

Jangan menggunakan logo resmi JDS yang dibuat-buat. Sediakan placeholder logo agar dapat diganti setelah aset resmi diberikan.

---

# 5. ASSESSMENT QUESTIONNAIRE

Buat formulir multi-step dengan lima bagian.

## SECTION A — PERSONAL BACKGROUND

**Q1. Full Name**

Input nama lengkap.

**Q2. Educational & Professional Background**

Mintalah jurusan, universitas, tahun kelulusan/angkatan, dan pekerjaan/perusahaan saat ini jika ada.

**Q3. Organizational Experience**

Ceritakan pengalaman kepanitiaan atau organisasi yang paling relevan, posisi yang dijabat, serta kontribusi nyata.

**Q4. Technical & Organizational Skills**

Multiple selection:

- Microsoft Excel / Google Sheets
- Power BI / Data Analytics
- Project Management
- Recruitment & Screening
- Graphic Design
- Social Media Management
- Communication & Public Speaking
- Networking & Partnership
- Programming / Website Development
- Administration
- Leadership
- Other

**Q5. Most Relevant Achievement**

Jelaskan satu proyek atau kegiatan yang berhasil diselesaikan. Minta informasi mengenai tanggung jawab pribadi, tindakan, dan hasil nyata.

**Q6. Weekly Availability**

Pilihan:

- Less than 3 hours/week
- 3–5 hours/week
- 6–10 hours/week
- More than 10 hours/week

Tambahkan pertanyaan mengenai keterbatasan jadwal selama November 2026–Maret 2027.

## SECTION B — DIVISION PREFERENCE

**Q7. Preferred Division**

Pilihan:

- Internal Team
- External Team
- Flexible

**Q8. Why Did You Choose This Division?**

Jawaban esai.

**Q9. Preferred Responsibility**

Pilihan posisi yang berubah secara dinamis berdasarkan divisi yang dipilih.

Jika memilih Flexible, tampilkan pilihan untuk menentukan studi kasus mana yang ingin dikerjakan.

**Q10. Personal Commitment**

Apa tanggung jawab dan target terukur yang bersedia diambil selama pelaksanaan rekrutmen?

## SECTION C — COMMON STRATEGIC CASE

Semua calon panitia wajib menjawab.

**Q11. Recruitment Strategy**

JDS Batch 8 harus merekrut 300 peserta, terdiri dari 200 offline dan 100 online, dengan tetap mempertahankan 20 fresh graduate.

Pertanyaan:

a. Apa tiga tantangan terbesar?

b. Bagaimana menarik experienced engineer agar bergabung?

c. Jika sumber daya terbatas, tiga strategi promosi apa yang diprioritaskan?

**Q12. Recruitment Crisis**

Dua minggu sebelum pendaftaran ditutup:

- Offline applicants: 120 dari target 200.
- Online applicants: 35 dari target 100.
- Fresh graduate applicants: 8 dari target 20.

Buat rencana pemulihan dalam tujuh hari, termasuk prioritas, aktivitas, PIC terkait, dan indikator keberhasilan.

**Q13. Accountability Case**

Seorang anggota tim tidak menyelesaikan tugas selama tujuh hari dan menghambat progres rekrutmen.

Bagaimana kamu menanganinya secara profesional?

---

# 6. INTERNAL TEAM CASE STUDIES

Tampilkan hanya untuk kandidat yang memilih asesmen Internal.

**Q14. Recruitment Strategic Planning**

Buat rencana kerja Internal Team beranggotakan lima orang untuk mendukung target rekrutmen 300 peserta.

Sebutkan tiga prioritas, pembagian pekerjaan, serta output yang harus selesai sebelum 16 Desember 2026.

**Q15. Data Management & Recruitment Dashboard**

Jika kamu diminta membuat dashboard menggunakan Excel atau Google Sheets:

a. Data apa yang wajib dicatat?

b. Bagaimana mencegah data duplikat?

c. KPI apa yang harus dipantau setiap minggu?

d. Bagaimana melindungi data pribadi kandidat?

**Q16. Marketing Strategy**

Rancang dua pendekatan promosi berbeda:

- Fresh graduate.
- Experienced engineer dengan pengalaman lebih dari lima tahun.

Jelaskan pesan utama, platform, target audiens, dan indikator keberhasilan.

**Q17. Data-Driven Decision Making**

Diketahui hasil kampanye:

- Instagram: 1.000 kunjungan, 20 pendaftaran.
- LinkedIn: 300 kunjungan, 30 pendaftaran.
- Personal outreach: 100 kontak, 25 pendaftaran.

Hitung rasio konversi dan tentukan kanal yang perlu diprioritaskan.

Jelaskan asumsi dan keterbatasan saat membandingkan kunjungan website dengan kontak langsung.

**Q18. Recruitment Innovation**

Usulkan satu inovasi sistem, workflow, dashboard, atau metode kerja yang dapat meningkatkan efisiensi rekrutmen.

Jelaskan proses implementasi serta bagaimana mengukur manfaatnya.

---

# 7. EXTERNAL TEAM CASE STUDIES

Tampilkan hanya untuk kandidat yang memilih asesmen Eksternal.

**Q14. Candidate Acquisition Strategy**

Kamu mempunyai target kontribusi 20 peserta terkonfirmasi.

Jelaskan:

a. Target sumber kandidat.

b. Estimasi jumlah kontak yang diperlukan.

c. Asumsi conversion rate.

d. Rencana aktivitas mingguan dan follow-up.

**Q15. Senior Engineer Outreach**

Seorang Field Engineer dengan pengalaman tujuh tahun mengatakan:

"Saya sudah cukup berpengalaman. Apa manfaat saya bergabung dengan JDS?"

Tuliskan pesan respons yang singkat, profesional, dan persuasif.

Jangan menjanjikan fasilitas atau manfaat yang belum terkonfirmasi.

**Q16. Operator & Geothermal Recruitment**

Bagaimana kamu menjangkau engineer yang bekerja di perusahaan operator migas dan geothermal?

Jelaskan strategi networking, pemetaan calon peserta, dan pendekatan personal.

**Q17. Strategic Networking & Sponsorship**

Bagaimana kamu mengajak kandidat yang dapat berkontribusi terhadap perluasan jaringan industri dan peluang kolaborasi JDS?

Jelaskan cara membangun hubungan profesional secara etis dan sukarela.

**Q18. Candidate Follow-up**

Dari 40 calon peserta yang kamu hubungi:

- 10 interested.
- 15 no response.
- 10 rejected.
- 5 considering.

Apa rencana follow-up dan tindakan untuk meningkatkan jumlah peserta terkonfirmasi tanpa mengirim pesan berulang yang mengganggu?

---

# 8. FINAL COMMITMENT

Semua calon panitia kembali ke bagian bersama.

**Q19. Personal Value**

Apa kelebihan utama yang membedakanmu dari calon panitia lain?

**Q20. Leadership & Ownership**

Bagaimana kamu bertanggung jawab ketika strategi yang diusulkan tidak menghasilkan target?

**Q21. Motivation**

Apa motivasi terbesar mengikuti kepanitiaan Rekrutmen JDS Batch 8?

**Q22. Placement Flexibility**

Jika tidak memperoleh posisi pilihan pertama:

- Willing.
- Willing with considerations.
- Not willing.

Tambahkan checkbox persetujuan pemrosesan informasi untuk asesmen kepanitiaan.

---

# 9. ANSWER EXPORT SYSTEM

Setelah peserta menyelesaikan kuesioner:

1. Validasi seluruh pertanyaan wajib.
2. Tampilkan halaman review.
3. Sediakan tombol **Submit & Download Assessment (.md)**.
4. Enkripsi jawaban di browser.
5. Unduh file `.md` yang berisi payload terenkripsi.
6. Tampilkan instruksi pengumpulan:

"Assessment completed. Please send your downloaded .md file to Muhammad Fakhri Helmi through the submission channel provided by the Recruitment Committee."

Jangan membuat nomor WhatsApp atau alamat pengiriman fiktif.

Jangan mengirim jawaban otomatis ke server, GitHub, atau pihak ketiga.

Jangan menyimpan jawaban plaintext di analytics, console log, URL, atau localStorage.

Gunakan nama file anonim berbasis random submission ID, misalnya:

`JDS_B8_ASSESSMENT_7f2a93.md`

Di dalam file encrypted Markdown, simpan:

- Schema version.
- Submission ID.
- Encryption algorithm metadata.
- Encrypted AES key.
- IV/nonce.
- Authentication tag bila terpisah.
- Ciphertext jawaban.

Seluruh informasi identitas dan jawaban kandidat harus menjadi bagian dari payload terenkripsi.

---

# 10. CRYPTOGRAPHIC SECURITY

Gunakan enkripsi yang benar, bukan Base64 encoding, karakter acak buatan sendiri, atau sekadar menyembunyikan teks dengan JavaScript.

Implementasikan **hybrid encryption**:

- AES-256-GCM untuk mengenkripsi jawaban.
- RSA-OAEP SHA-256 untuk membungkus AES key.
- Web Crypto API untuk enkripsi pada browser.
- RSA key pair dibuat melalui setup lokal yang aman.
- Public key boleh berada dalam website.
- Private key hanya berada pada perangkat Ketua Rekrutmen.

Buat scripts:

`setup-keys`

Untuk menghasilkan public key dan private key yang kompatibel dengan browser encryption serta local decryption.

`decrypt`

Untuk membaca satu atau banyak file `.md` terenkripsi.

`export-csv`

Untuk mengekspor data yang sudah didekripsi menjadi CSV UTF-8 dengan BOM agar kompatibel dengan Microsoft Excel.

Jangan memasukkan private key dalam directory publik, build output, repository, atau GitHub Actions.

Jangan pernah mencetak private key ke log.

Tambahkan `.gitignore` dan langkah perlindungan kunci privat.

Jika private key hilang, jelaskan bahwa jawaban lama tidak dapat dipulihkan.

Sediakan test untuk:

- Enkripsi dan dekripsi berhasil.
- Wrong private key gagal membuka file.
- Payload yang dimodifikasi gagal verifikasi.
- Plaintext tidak muncul pada file `.md`.
- Kunci privat tidak berada pada folder publik.

---

# 11. PRIVATE REVIEWER TOOLS

Bangun sistem lokal khusus Ketua Rekrutmen untuk mengevaluasi jawaban.

Fitur minimum:

1. Buka satu file `.md`.
2. Buka banyak file `.md` sekaligus.
3. Dekripsi menggunakan private key.
4. Tampilkan profil dan jawaban kandidat.
5. Filter Internal, External, dan Flexible.
6. Berikan kolom skor evaluasi.
7. Tambahkan catatan reviewer.
8. Ekspor ke Excel-compatible CSV.
9. Deteksi duplikasi submission ID.
10. Tandai status seleksi: Pending, Recommended, Interview, Accepted, Rejected.

Boleh menggunakan aplikasi CLI berbasis Node.js atau dashboard lokal, tetapi jangan memerlukan cloud database.

Sistem tidak boleh otomatis menganggap jawaban panjang sebagai jawaban bagus.

Buat penilaian berbasis rubrik:

**Internal Team**

- Strategic Thinking: 25%
- Analytical & Technical Skills: 25%
- Execution Planning: 20%
- Problem Solving: 15%
- Commitment: 15%

**External Team**

- Sourcing & Networking Strategy: 30%
- Communication & Persuasion: 25%
- Execution Planning: 20%
- Problem Solving: 10%
- Commitment: 15%

Setiap kriteria dinilai 0–5 dengan deskripsi rubrik yang jelas. Hitung skor berbobot otomatis setelah reviewer memberikan nilai.

Jangan melakukan penilaian otomatis menggunakan keyword matching sederhana.

Rekomendasi skor:

- 85–100: Strong Candidate
- 75–84: Recommended
- 65–74: Consider / Interview
- Below 65: Further Evaluation

Skor adalah bahan pertimbangan, bukan keputusan seleksi final.

---

# 12. PROJECT STRUCTURE

Buat struktur proyek yang bersih, misalnya:

- `/src` — React application.
- `/src/components` — UI components.
- `/src/data` — Question definitions and configuration.
- `/src/lib` — Validation, encryption, export logic.
- `/public` — Public assets dan public key.
- `/scripts` — Key setup dan private decryption utilities.
- `/tests` — Automated tests.
- `/docs` — Documentation.
- `/private` — Local-only key storage, wajib gitignored.

Sediakan dokumentasi:

- `README.md`
- `DEPLOYMENT.md`
- `SECURITY.md`
- `REVIEWER_GUIDE.md`

Dokumentasi harus menjelaskan cara menjalankan proyek di Windows, menghasilkan key pair, mengisi formulir, mengunduh jawaban, mendekripsi, dan mengunggah website ke GitHub Pages.

---

# 13. QUALITY ASSURANCE

Lakukan iterasi implementasi dan pengujian secara nyata.

Wajib:

1. Jalankan dependency installation.
2. Jalankan type checking.
3. Jalankan build.
4. Jalankan automated tests.
5. Uji branching Internal/External/Flexible.
6. Uji validasi pertanyaan.
7. Uji seluruh proses pengunduhan `.md`.
8. Uji enkripsi dan dekripsi end-to-end.
9. Uji ekspor CSV.
10. Uji tampilan mobile dan desktop bila browser test tersedia.
11. Pastikan GitHub Pages tidak menghasilkan blank page karena konfigurasi base URL.
12. Periksa bahwa private key tidak ikut dalam hasil build.

Jika menemukan error, perbaiki secara langsung kemudian jalankan pengujian kembali.

Jangan menyatakan sebuah pengujian berhasil apabila tidak benar-benar dijalankan.

---

# 14. EXPECTED FINAL DELIVERABLES

Hasil akhirnya harus mencakup:

1. Working GitHub Pages-ready website.
2. Responsive multi-step recruitment questionnaire.
3. Conditional Internal and External assessment.
4. Encrypted Markdown download.
5. Secure local decryption tools.
6. Candidate review and scoring workflow.
7. CSV export for Excel.
8. Project source code.
9. Deployment instructions.
10. Test report yang membedakan pengujian berhasil dan yang belum dapat dilakukan.

Jika kamu memiliki akses repository dan deployment yang sudah terhubung, gunakan konfigurasi yang ada. Jangan melakukan deployment ke layanan eksternal tanpa izin yang diperlukan.

**Mulai implementasi sekarang. Lakukan coding, testing, debugging, dan perbaikan sampai seluruh acceptance criteria terpenuhi. Jangan berhenti pada tahap planning.**