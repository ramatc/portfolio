import { ImageResponse } from "next/og";

export const alt =
  "Ramiro Tanquias — Full Stack Developer. React, NestJS y Next.js desde Buenos Aires.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#09090b";
const FG = "#fafafa";
const FG_MUTED = "rgb(175, 175, 183)";
const BORDER = "rgb(34, 34, 38)";
const BRAND = "rgb(133, 123, 249)";

const STACK = "React · NestJS · Next.js";
const URL_LABEL = "ramatc.vercel.app";

/**
 * Loads a Google Font as a TTF subset containing only the given text,
 * which is the format Satori (ImageResponse) can render.
 */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Failed to load font ${family} ${weight}`);
  return (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const title = "Ramiro Tanquias.";
  const monoText = `FULL STACK DEVELOPER ${STACK} ${URL_LABEL}`;

  const [onest, mono] = await Promise.all([
    loadGoogleFont("Onest", 600, title),
    loadGoogleFont("JetBrains+Mono", 400, monoText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: BG,
          position: "relative",
          padding: "72px 80px 56px",
        }}
      >
        {/* Faint light behind the name */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 150,
            width: 900,
            height: 420,
            background:
              "radial-gradient(closest-side, rgba(133, 123, 249, 0.14), transparent)",
          }}
        />
        {/* Horizon glow rising from the facts row border */}
        <div
          style={{
            position: "absolute",
            left: 200,
            bottom: 118,
            width: 800,
            height: 160,
            background:
              "radial-gradient(50% 100% at 50% 100%, rgba(133, 123, 249, 0.18), transparent 75%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: "Onest",
              fontSize: 128,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: FG,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 32,
              letterSpacing: "0.22em",
              color: FG_MUTED,
            }}
          >
            FULL STACK DEVELOPER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 28,
            fontFamily: "JetBrains Mono",
            fontSize: 32,
          }}
        >
          <div style={{ color: FG }}>{STACK}</div>
          <div style={{ color: BRAND }}>{URL_LABEL}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Onest", data: onest, weight: 600, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
