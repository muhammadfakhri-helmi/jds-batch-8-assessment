# GitHub Pages

Repository ini berdiri sendiri. Untuk deployment, commit source, package-lock, dan `public/public-key.pem`; jangan commit `private/`, file kandidat, CSV, atau node_modules.

1. Di GitHub repository Settings → Pages → Build and deployment, pilih GitHub Actions.
2. Push branch `main`. Workflow menginstal dependencies, menjalankan tests, typecheck/build, audit build, dan deploy dist ke Pages.
3. Tunggu workflow berhasil. Situs berada di `https://OWNER.github.io/jds-batch-8-assessment/`.
4. Coba Internal, External, dan kedua jalur Flexible. Download satu jawaban uji, lalu dekripsi dengan private key lokal asli.

Konfigurasi Vite memakai `base: './'`; URL public key relatif terhadap halaman. Jangan hapus path repository dari URL. Situs tidak memakai routing history sehingga tidak memerlukan redirect SPA.

## Publikasi manual setelah clone

`npm ci`, `npm test`, `npm run build`. Jangan jalankan setup-keys jika repo telah membawa public key produksi: gunakan private key asli yang disimpan ketua. Public key produksi wajib ada sebelum build, dan setup tidak berjalan dalam Actions.

Rollback: revert commit kode yang bermasalah lalu push; jangan mengganti public key tanpa rencana rotasi. Perubahan public key memerlukan backup dan koordinasi reviewer.
