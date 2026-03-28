//
// netlify/functions/image-proxy.js
// Proxy image requests to Google Drive
//


/**
 * Image Proxy
 * Proxy image requests to Google Drive
 * @param {Request} request - The request object
 * @returns {Response} - The response object
 */
export default async (request) => {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  const allowed = ["lh3.googleusercontent.com", "drive.google.com"];
  try {
    const parsed = new URL(imageUrl);
    if (!allowed.some((d) => parsed.hostname.endsWith(d))) {
      return new Response("Domain not allowed", { status: 403 });
    }
  } catch {
    return new Response("Invalid url parameter", { status: 400 });
  }

  try {
    const imageResponse = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Netlify-Proxy/1.0)",
      },
    });

    if (!imageResponse.ok) {
      return new Response("Failed to fetch image", { status: 502 });
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageResponse.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("Proxy error", { status: 502 });
  }
};

export const config = {
  path: "/api/image-proxy",
};
