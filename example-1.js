"use client";
import { useState } from "react";

const SYSTEM_MESSAGE =
  "You are Jobot, a helpful and versatile AI created by Jovian using state-of the art ML models and APIs.";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [botMessage, setBotMessage] = useState("");

  const API_URL = "https://api.openai.com/v1/chat/completions";

  async function sendRequest() {
    console.log("Button Clicked");
    const apiResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_MESSAGE },
          { role: "user", content: "Hello, please introduce yourself!" },
        ],
      }),
    });
    const responseJSON = await apiResponse.json();
    console.log("responseJSON", responseJSON);
    setBotMessage(responseJSON.choices[0].message.content);
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow w-full">
        <div className="px-4 h-14 flex justify-between items-center">
          <div className="text-xl font-bold">Jobot</div>
          <div>
            <input
              type="password"
              className="border rounded p-1"
              placeholder="Enter API key.."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <div className="p-4">
        <button
          className="border rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={sendRequest}
        >
          Send Request
        </button>
        <div className="text-lg mt=4">{botMessage} </div>
      </div>

      {/* Add more UI here */}
    </div>
  );
}
