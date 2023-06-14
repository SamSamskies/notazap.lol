import "./App.css";
import { Helmet } from "react-helmet";

export const App = () => {
  const url = new URL(window.location);
  const path = url.pathname;
  const [npubOrNoteId] = path.split("/").filter((part) => part !== "");
  const title = "Not a Zap";
  const description = npubOrNoteId
    ? `You can't zap ${npubOrNoteId} here 😉.`
    : "This webapp is not for zapping nostr things 😉.";
  const image = "https://nostr.build/p/nb11010.jpeg";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements[0];
    const value = input.value.trim();
    if (value) {
      window.location.href = `/${value}`;
    }
  };

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="This webapp is not for zapping nostr things 😉."
        />
        <meta name="twitter:image" content={image} />
      </Helmet>
      {!npubOrNoteId && (
        <form onSubmit={handleSubmit}>
          <input autoFocus placeholder="Enter npub or note ID" />
          <button type="submit">Go</button>
        </form>
      )}
    </>
  );
};
