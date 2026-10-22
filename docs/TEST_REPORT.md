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

## Pembaruan strategi dan halaman pengantar — 22 Oktober 2026

- Target diperjelas menjadi 300 kandidat yang mendaftar (200 offline / 100 online).
- Internal 5 orang; eksternal fleksibel; posisi dan rubrik 30/20/20/20/10 diperbarui.
- Tombol Mulai Asesmen hanya satu dan berada di section terakhir setelah target, struktur, posisi, rubrik, timeline, dan privasi. Diverifikasi dari DOM browser.
- Klik tombol berhasil membuka tahap Latar belakang.
- Desktop 1280 px dan mobile 390 px tidak memiliki overflow horizontal (lebar konten 1265 dan 375 px).
- 12 automated tests lulus, termasuk bobot setiap kriteria, perbedaan skor versi 1/2, dan dekripsi jawaban lama dengan nama posisi lama.
- Typecheck, production build, dan audit private key lulus. Key produksi tidak diubah.
- Contoh CLI 5,4,3,4,5 menghasilkan 84 pada rubrik baru; 85 pada rubrik External lama. Hasil uji 85 pada bagian laporan awal adalah pengujian versi 1.

## Pembaruan tanggung jawab bersama dan KPI — versi 3

- Q9 diubah dari dropdown jabatan menjadi esai kontribusi terhadap tanggung jawab bersama Internal/External.
- Internal Q14 meminta rencana mencapai target ketua secara rinci. External menambahkan target orang/profil dan perusahaan.
- Reward titip nama dijelaskan di pengantar dan kolom rewardNominee opsional di akhir asesmen; ikut terenkripsi, review dan CSV.
- 14 tests lulus, termasuk field sasaran wajib, nama reward opsional/terenkripsi/CSV, dan kompatibilitas jawaban v1/v2. Typecheck, build, dan audit key lulus.
