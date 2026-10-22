# Laporan pengujian — 22 Oktober 2026

## Lulus

- `npm install`: berhasil; audit instalasi melaporkan 0 vulnerability.
- `npm test`: 10 tests, 10 lulus, 0 gagal.
- `npm run typecheck` dan production build: berhasil.
- Audit dist: public key tersedia, tidak ada private key/folder reviewer dalam build.
- `git check-ignore private/private-key.pem`: private key diabaikan; `git ls-files private` kosong.
- Automated branching: Internal, External, Flexible→Internal, Flexible→External.
- Validasi field wajib, opsi tidak valid, consent, Other, dan pertimbangan penempatan.
- Sanitasi payload menghapus detail kondisional yang sudah tidak relevan.
- Web Crypto AES-GCM/RSA-OAEP → dekripsi Node.js, wrong key, ciphertext/IV/wrapped key/metadata dimodifikasi, dan ketiadaan plaintext di Markdown.
- Skor bobot, batas nilai, rekomendasi, CSV Unicode/BOM/quotes/formula mitigation.
- CLI batch import, duplicate ID, filter Flexible, tampilkan soal/jawaban, skor, dan export CSV.
- Browser aktual: jawaban kosong ditolak; pengisian lengkap Flexible→External; review; submit/download; halaman selesai; unduh ulang.
- File yang benar-benar diunduh browser berhasil didekripsi memakai private key produksi lokal, diberi skor 85/100, dan diekspor menjadi CSV. Semua data adalah data sintetis.
- Landing page produksi tampil pada repository subpath GitHub Pages, bukan halaman kosong.
- Desktop viewport 1280 px dan mobile 390 px diperiksa secara visual; tidak ada overflow horizontal pada landing page. Formulir juga diuji pada panel sempit browser.
- Workflow GitHub Actions pertama berhasil: install, test, build, audit, upload, deploy. Run: https://github.com/muhammadfakhri-helmi/jds-batch-8-assessment/actions/runs/39765400749

Data QA lokal diarsipkan ke `private/qa/` agar tidak muncul dalam daftar kandidat produksi. Tidak dipush ke GitHub.

## Batas pengujian

- Alur browser lengkap dilakukan pada build development lokal dengan kode/public key yang sama; browser produksi memverifikasi landing page, aset, dan subpath.
- Percabangan Internal dan Flexible→Internal diuji otomatis; alur browser penuh yang diisi manual adalah Flexible→External.
- Belum diuji pada perangkat iOS/Android fisik, Safari, atau Firefox.
- CSV diverifikasi melalui parsing/string tests dan ekspor CLI, belum dibuka melalui Microsoft Excel desktop.
- Belum dilakukan audit keamanan independen atau pengujian pembaca layar menyeluruh.
- Uji resize pertama mengalami gangguan sinkronisasi browser; pengujian visual berhasil dilanjutkan pada tab produksi baru.
