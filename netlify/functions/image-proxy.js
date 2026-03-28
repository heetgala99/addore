const handler = async (event) => {
  const imageUrl = event.queryStringParameters?.url;

  if (!imageUrl) {
    return { statusCode: 400, body: "Missing url parameter" };
  }

  const allowed = ["lh3.googleusercontent.com", "drive.google.com"];
  try {
    const parsed = new URL(imageUrl);
    if (!allowed.some((d) => parsed.hostname.endsWith(d))) {
      return { statusCode: 403, body: "Domain not allowed" };
    }
  } catch {
    return { statusCode: 400, body: "Invalid url parameter" };
  }

  try {
    const imageResponse = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Netlify-Proxy/1.0)",
      },
    });

    if (!imageResponse.ok) {
      return { statusCode: 502, body: "Failed to fetch image" };
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";

    // Google Drive may return an HTML interstitial/challenge page to server-side requests.
    // In that case, redirect the browser to the source URL instead of returning broken HTML as an image.
    if (!contentType.toLowerCase().startsWith("image/")) {
      return {
        statusCode: 302,
        headers: {
          Location: imageUrl,
          "Cache-Control": "no-cache",
        },
        body: "",
      };
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch {
    return { statusCode: 502, body: "Proxy error" };
  }
};

module.exports = { handler };
