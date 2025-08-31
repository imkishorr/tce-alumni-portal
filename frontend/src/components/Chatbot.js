// src/components/Chatbot.js
import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Replace with your actual Gemini API key
const API_KEY = "AIzaSyBgBs763jf1tpyD-6YFS5I-0_LF7tLoKNM";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Show welcome message only when opened
  useEffect(() => {
    if (open) {
      setMessages([
        {
          sender: "Jarvis",
          text: "👋 Hello! I'm Jarvis, your TCE virtual assistant. How can I help you today?",
        },
      ]);
    }
  }, [open]);

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const result = await model.generateContent(input);
      const botMsg = {
        sender: "Jarvis",
        text: result.response.text() || "⚠️ Sorry, I didn’t understand that.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Jarvis", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }

    setInput("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  };

  if (!open) return null; // ✅ Chatbot only renders when open

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 90,
        right: 20,
        width: 340,
        height: 430,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        zIndex: 2000,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#003366",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          TCE Chatbot
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        {messages.map((msg, i) => (
          <Typography
            key={i}
            sx={{
              textAlign: msg.sender === "You" ? "right" : "left",
              my: 0.6,
              px: 1.2,
              py: 0.8,
              borderRadius: 2,
              maxWidth: "80%",
              ml: msg.sender === "You" ? "auto" : 0,
              mr: msg.sender !== "You" ? "auto" : 0,
              background: msg.sender === "You" ? "#d1ecf1" : "#f8f9fa",
              fontSize: "0.9rem",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <b>{msg.sender}:</b> {msg.text}
          </Typography>
        ))}
      </Box>

      {/* Input */}
      <Box sx={{ display: "flex", p: 1, borderTop: "1px solid #ccc" }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // ✅ Enter works
          size="small"
          fullWidth
          placeholder="Ask me anything..."
        />
        <Button onClick={handleSend} variant="contained" sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default Chatbot;
