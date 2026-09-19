"use client";

import { useState } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-3 bg-secondary rounded-lg">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan materi perkuliahan..."
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
          Kirim
        </button>
      </form>
    </div>
  );
}