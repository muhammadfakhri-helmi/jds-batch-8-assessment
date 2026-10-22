# Keamanan dan batasan

Browser menghasilkan kunci AES-256 acak per submission dan IV GCM acak 96 bit. Jawaban, identitas, dan timestamp dienkripsi dengan AES-256-GCM. Tag autentikasi 128 bit digabung pada akhir ciphertext. AES key dibungkus RSA-OAEP SHA-256 menggunakan public key RSA 3072 bit. Schema version, submission ID, dan algorithm diikat sebagai GCM additional authenticated data. Base64 hanya format transport.

Setup lokal menghasilkan private key PKCS#8 di `private/private-key.pem`. Unix menggunakan izin 0600 dan folder 0700. Windows menghapus ACL inheritance dan membatasi folder untuk akun pengguna saat setup. Private key tidak diberi passphrase: keamanan bergantung pada akses akun dan enkripsi disk perangkat. Gunakan akun terkunci, enkripsi disk, serta backup offline terenkripsi dengan kontrol akses. Jangan mengunggah folder private atau menyalinnya ke GitHub Actions.

**Jika private key hilang, jawaban lama tidak dapat dipulihkan.** Setup menolak menimpa key yang ada. Saat rotasi, arsipkan pasangan lama secara aman dan pertahankan private key lama untuk file lama. Public key di repo bukan rahasia.

Dekripsi hanya dilakukan lokal. `private/reviews.json` dan CSV adalah plaintext sensitif; batasi akses dan retensi sesuai kebijakan panitia. Jangan memasukkan kandidat asli dalam issue, commit, screenshot, atau log publik. Perintah show/list memang menampilkan data untuk reviewer; gunakan terminal privat. CSV menetralkan awalan formula umum agar jawaban kandidat tidak dieksekusi Excel.

Enkripsi tidak membuktikan identitas pengirim, tidak menggantikan verifikasi kandidat, dan tidak melindungi perangkat yang telah diambil alih. Pengiriman melalui kanal resmi tetap diperlukan. Aplikasi tidak mengirim data ke server; request jaringan hanya mengambil aset dan public key. Hosting dapat memiliki log akses HTTP biasa tanpa jawaban. Tidak ada analytics atau aset pihak ketiga.

Build audit memeriksa private key dan folder reviewer tidak masuk dist. Tests mencakup salah key, perubahan ciphertext/metadata/IV/key, plaintext, dan ignore rules. Ini pengujian fungsional keamanan, bukan audit independen.
