import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");
    const res = await fetch(`https://nostrstuff.com/api/notes/${noteId}`);

    if (!res.ok) {
      return new Response(res.statusText, {
        status: res.status,
      });
    }

    const data = await res.json();

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "rgb(52, 53, 65)",
            color: "rgb(236, 236, 241)",
            height: "100%",
            width: "100%",
            display: "flex",
            padding: "32px 48px 48px 48px",
            fontFamily: "system-ui, Helvetica, Arial, sans-serif",
            fontSize: 40,
          }}
        >
          <div style={{ overflow: "hidden" }}>{data.content}</div>
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
