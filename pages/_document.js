import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <main>
          <div id="nostr-embed" style={{ visibility: "hidden" }}>
            <p>^ not a zap button</p>
          </div>
        </main>
        <footer>
          <a href="https://github.com/SamSamskies/notazap.lol" target="_blank">
            <img
              src="/github-mark.png"
              width="32"
              height="32"
              alt="GitHub logo"
            />
          </a>
          <p
            data-npub="npub1vp8fdcyejd4pqjyrjk9sgz68vuhq7pyvnzk8j0ehlljvwgp8n6eqsrnpsw"
            title="Click to zap me :)"
          >
            ⚡️
          </p>
        </footer>
        <script src="/initScript.js" />
      </body>
    </Html>
  );
}
