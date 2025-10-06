import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Velora – Travel beautifully";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  const title = "Velora";
  const tagline = "Travel beautifully";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
          color: "white",
          padding: "64px",
          fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 800, marginBottom: 12 }}>
          {title}
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>{tagline}</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
