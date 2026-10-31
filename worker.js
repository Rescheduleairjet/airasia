/**
 * Cloudflare Workers
 * Domain: airasia24jam.id
 * Worker: airasia
 * Static Assets: ./public
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      // Hanya izinkan GET dan HEAD
      if (!["GET", "HEAD"].includes(request.method)) {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "GET, HEAD"
          }
        });
      }

      // Ambil HTML, gambar, CSS, dan JS
      // dari folder public
      const response = await env.ASSETS.fetch(request);

      // Salin header respons
      const headers = new Headers(response.headers);

      // Header keamanan
      headers.set(
        "X-Content-Type-Options",
        "nosniff"
      );

      headers.set(
        "X-Frame-Options",
        "SAMEORIGIN"
      );

      headers.set(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
      );

      // Cache halaman HTML
      if (
        url.pathname === "/" ||
        url.pathname.endsWith(".html")
      ) {
        headers.set(
          "Cache-Control",
          "public, max-age=0, must-revalidate"
        );
      }

      // Cache gambar, CSS, dan JavaScript
      else if (
        /\.(png|jpg|jpeg|webp|gif|svg|ico|css|js)$/i
          .test(url.pathname)
      ) {
        headers.set(
          "Cache-Control",
          "public, max-age=3600"
        );
      }

      // Cache sitemap dan robots
      else if (
        url.pathname === "/sitemap.xml" ||
        url.pathname === "/robots.txt"
      ) {
        headers.set(
          "Cache-Control",
          "public, max-age=3600"
        );
      }

      // Kembalikan respons asli
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });

    } catch (error) {
      console.error("Worker Error:", error);

      return new Response(
        "Terjadi kesalahan pada server.",
        {
          status: 500,
          headers: {
            "Content-Type": "text/plain; charset=UTF-8"
          }
        }
      );
    }
  }
};
