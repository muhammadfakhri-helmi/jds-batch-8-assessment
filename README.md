# JDS Batch 8 — Recruitment Committee Assessment

Asesmen 22 pertanyaan untuk panitia rekrutmen, dibuat untuk Muhammad Fakhri Helmi. Situs statis TypeScript + Vite, tanpa akun, database, analytics, atau pengiriman otomatis. Pertanyaan dan antarmuka berbahasa Indonesia.

## Menjalankan di Windows

Pasang Node.js 24 dan Git, lalu dari PowerShell pada folder proyek:

```powershell
npm ci
# HANYA pada setup pertama tanpa key yang sudah ada:
npm run setup-keys
npm run dev
```

Key produksi untuk deployment awal sudah dibuat pada perangkat ketua. Clone GitHub hanya membawa PUBLIC key. Jangan membuat pasangan key pengganti untuk mencoba membuka jawaban lama. Gunakan private key asli beserta backupnya.

```powershell
npm test
npm run build
```

Build berada pada `dist/`. Semua aset menggunakan base relatif agar dapat digunakan di GitHub Pages subpath. Browser memerlukan HTTPS atau localhost untuk Web Crypto.

## Alur kandidat

1. Mulai asesmen, isi latar belakang dan pilih Internal, External, atau Flexible.
2. Flexible memilih jalur studi kasus. Mengganti jalur menghapus jawaban studi kasus lama agar tidak salah dikirim.
3. Isi strategi, studi kasus, dan komitmen; berikan persetujuan pemrosesan data.
4. Review, edit bila perlu, lalu Submit & Download Assessment (.md).
5. Kirim file melalui kanal resmi panitia. Unduhan bukan pengiriman otomatis.

Jawaban hanya ada di memori tab; refresh/menutup tab menghilangkan draft. Tidak ada penyimpanan plaintext ke localStorage, URL, log, atau layanan pihak ketiga. File memakai ID acak; identitas dan jawaban dienkripsi.

## Alur ketua

Lihat [REVIEWER_GUIDE.md](REVIEWER_GUIDE.md) untuk impor file, membaca jawaban, skor berbobot, status, dan CSV. [docs/QUESTION_BANK.md](docs/QUESTION_BANK.md) memuat semua soal. [docs/ANSWER_GUIDE.md](docs/ANSWER_GUIDE.md) memuat contoh kerangka jawaban, bukan kunci jawaban tunggal.

## Struktur

- `src/`: UI, pertanyaan, validasi, Web Crypto.
- `public/`: hanya public key dan aset publik.
- `scripts/`: setup key, dekripsi, reviewer CLI, audit build.
- `tests/`: pengujian keamanan, percabangan, validasi, scoring, CSV, CLI.
- `private/`: key dan data reviewer lokal; diabaikan Git dan tidak dibuild.
- `docs/`: bank soal, panduan jawaban, laporan pengujian.

Lihat [DEPLOYMENT.md](DEPLOYMENT.md) dan [SECURITY.md](SECURITY.md). Identitas JDS pada UI adalah teks sementara, bukan logo resmi.

## Strategi terkini (22 Oktober 2026)
Target 300 pendaftar: 200 offline (66,7%) dan 100 online (33,3%), bukan kuota peserta diterima. Internal 5 orang dan eksternal fleksibel. Halaman awal menyampaikan target, struktur, posisi, rubrik 30/20/20/20/10 dan timeline sebelum tombol Mulai Asesmen di bawah. docs/PROJECT_BRIEF.md merupakan arsip brief awal; strategi terkini menggantikan target kapasitas dan rubrik lama.
