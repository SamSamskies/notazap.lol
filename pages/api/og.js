import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nip19Entity = searchParams.get("nip19Entity");
    const isNpub = nip19Entity.startsWith("npub");
    const url = isNpub
      ? `https://nostrstuff.com/api/users/${nip19Entity}`
      : `https://nostrstuff.com/api/notes/${nip19Entity}`;

    const res = await fetch(url);

    if (!res.ok) {
      return new Response(res.statusText, {
        status: res.status,
      });
    }

    const data = await res.json();
    const content = isNpub ? JSON.parse(data.content) : data.content;
    const sharedStyles = {
      backgroundColor: "rgb(52, 53, 65)",
      color: "rgb(236, 236, 241)",
      height: "100%",
      width: "100%",
      display: "flex",
      padding: "32px 48px 48px 48px",
      fontFamily: "system-ui, Helvetica, Arial, sans-serif",
      fontSize: 40,
    };
    const nostrichAvatar =
      "https://pbs.twimg.com/profile_images/1604195803748306944/LxHDoJ7P_400x400.jpg";

    return isNpub
      ? new ImageResponse(
          (
            <div
              style={{
                ...sharedStyles,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                fontSize: 32,
              }}
            >
              <img
                width="256"
                height="256"
                src={content.picture || nostrichAvatar}
                style={{
                  borderRadius: "50%",
                }}
                alt="avatar"
              />
              <p
                style={{
                  fontSize: content.display_name || content.name ? 48 : 32,
                }}
              >
                {content.display_name || content.name || data.pubkey}
              </p>
              {content.lud16 && <div>{content.lud16}</div>}
            </div>
          )
        )
      : new ImageResponse(
          (
            <div style={sharedStyles}>
              <div style={{ overflow: "hidden" }}>{content}</div>
            </div>
          ),
          {
            width: 1200,
            height: 630,
          }
        );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
