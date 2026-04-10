import React, { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("data"));
    if (saved) setTransactions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!text || !amount) return;
    const newTxn = { id: Date.now(), text, amount: +amount };
    setTransactions([...transactions, newTxn]);
    setText("");
    setAmount("");
  };

  const deleteTxn = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Smart Expense Tracker</h2>

      <input
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addTransaction}>Add</button>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.text} - ₹{t.amount}
            <button onClick={() => deleteTxn(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
