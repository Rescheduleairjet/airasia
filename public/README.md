# airasia24jam.id — Cloudflare Workers

Website panduan independen (bukan situs resmi AirAsia).

## Struktur
- `wrangler.jsonc`, `worker.js` di root repository.
- Semua aset situs di `public/` termasuk `public/img/`.

## Deploy
1. Unggah **isi** folder paket ini ke root repository GitHub.
2. Hubungkan repository ke Cloudflare Workers (Git integration).
3. Build/deploy command: `npx wrangler deploy`.
4. Atur Custom Domain `airasia24jam.id` di Workers > Settings > Domains & Routes.
5. Cek `/img/logo-airasia.png`, `/img/background-red.jpg`, `/sitemap.xml`.

Kebijakan perubahan penerbangan mengikuti aturan resmi maskapai yang dapat berubah.
