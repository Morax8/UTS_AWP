import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Cukup panggil /api/..., Vite akan otomatis meneruskannya ke backend
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Pesan dari Backend:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
