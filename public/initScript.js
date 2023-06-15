import { bech32 } from "https://cdn.jsdelivr.net/npm/@scure/base@1.1.1/+esm";

const parseTLV = (data) => {
  let result = {};
  let rest = data;
  while (rest.length > 0) {
    let t = rest[0];
    let l = rest[1];
    if (!l) throw new Error(`malformed TLV ${t}`);
    let v = rest.slice(2, 2 + l);
    rest = rest.slice(2 + l);
    if (v.length < l) throw new Error(`not enough data to read on TLV ${t}`);
    result[t] = result[t] || [];
    result[t].push(v);
  }
  return result;
};

const extractNoteId = (nevent) => {
  try {
    const maxSize = 5000;
    const { words } = bech32.decode(nevent, maxSize);
    const data = new Uint8Array(bech32.fromWords(words));
    const tlv = parseTLV(data);

    if (!tlv[0]?.[0]) throw new Error("missing TLV 0 for nevent");
    if (tlv[0][0].length !== 32) throw new Error("TLV 0 should be 32 bytes");
    if (tlv[2] && tlv[2][0].length !== 32)
      throw new Error("TLV 2 should be 32 bytes");

    return bech32.encode("note", bech32.toWords(tlv[0][0], maxSize));
  } catch (error) {
    console.error(error);
  }
};

if (typeof window !== "undefined") {
  const url = new URL(window.location);
  const path = url.pathname;
  const [param] = path.split("/").filter((part) => part !== "");
  const npubOrNoteId = param?.startsWith("nevent")
    ? extractNoteId(param)
    : param;
  const renderNostrEmded = () => {
    const n = document.createElement("script");
    n.type = "text/javascript";
    n.async = !0;
    n.src =
      "https://cdn.jsdelivr.net/gh/nostrband/nostr-embed@0.1.15/dist/nostr-embed.js";
    const options = {
      showZaps: true,
      showCopyAddr: false,
      hideNostrich: false,
    };
    n.onload = function () {
      try {
        nostrEmbed.init(npubOrNoteId, "#nostr-embed", "", options);
      } catch (error) {
        console.error(error);

        // init with something random to show error in embed
        // TODO: show a better error message
        nostrEmbed.init("asdf", "#nostr-embed", "", options);
      }
    };
    const a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(n, a);
  };
  const renderNostrZap = () => {
    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/npm/nostr-zap@0.14.0";
    document.body.appendChild(script);
  };

  if (npubOrNoteId) {
    renderNostrEmded();
    document.getElementById("nostr-embed").style = "";
  } else {
    renderNostrZap();
  }

  const intervalId = setInterval(() => {
    if (!npubOrNoteId) {
      clearInterval(intervalId);
      return;
    }

    try {
      const npub = document.querySelector(".copyText").innerHTML;

      if (!npub) {
        throw new Error("not ready yet");
      }

      const nostrZapTarget = document.querySelector(
        ".cardInteractions .interactionContainer:first-of-type"
      );

      nostrZapTarget.setAttribute("data-npub", npub);

      if (npubOrNoteId.startsWith("note1")) {
        nostrZapTarget.setAttribute("data-note-id", npubOrNoteId);
      }

      clearInterval(intervalId);
      renderNostrZap();
    } catch {}
  }, 100);
}
