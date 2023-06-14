import "./App.css";

export const App = () => {
  const url = new URL(window.location);
  const path = url.pathname;
  const [npubOrNoteId] = path.split("/").filter((part) => part !== "");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements[0];
    const value = input.value.trim();
    if (value) {
      window.location.href = `/${value}`;
    }
  };

  return npubOrNoteId ? null : (
    <form onSubmit={handleSubmit}>
      <input autoFocus placeholder="Enter npub or note ID" />
      <button type="submit">Go</button>
    </form>
  );
};
