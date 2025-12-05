import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите название фильма..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Искать</button>
    </form>
  );
}
