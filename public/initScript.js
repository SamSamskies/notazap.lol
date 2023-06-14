if (typeof window !== "undefined") {
  const url = new URL(window.location);
  const path = url.pathname;
  const [npubOrNoteId] = path.split("/").filter((part) => part !== "");
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
      nostrEmbed.init(npubOrNoteId, "#nostr-embed", "", options);
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
