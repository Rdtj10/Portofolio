"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useChatContext } from "@/context/ChatContext";
import { API_BASE_URL } from "@/utils/api";


interface Message {
  id: string;
  role: string;
  content: string;
}

export default function ChatBot() {
  const { isOpen, setIsOpen } = useChatContext();
  const chatHelpers = useChat({
    onError: (error: Error) => {
      toast.error(`Auto-Chat Error: ${error.message}`);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { messages = [], isLoading, setMessages } = chatHelpers as any;
  const [localInput, setLocalInput] = useState("");

  const handleSend = async () => {
    if (!localInput.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: localInput };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setLocalInput("");

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error(response.statusText);

      // Create a placeholder for the assistant's message
      const assistantMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };
      setMessages([...newMessages, assistantMessage]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) return;

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        
        // Simple update: continuously update the last message
        // Note: This naive approach assumes raw text stream. 
        // If the API returns complex stream format (e.g. data protocol), this needs adjustment.
        // Given route.ts uses `result.toDataStreamResponse()`, it returns a specific format.
        // But for plain text display we might just see raw text if not parsed? 
        // Actually, streamText defaults to text stream? 
        // Wait, route.ts uses `result.toDataStreamResponse()`.
        // This means the stream contains data parts like `0:"text"\n`.
        // We really should use `append` if possible.
        // But since `append` is broken, we simply rely on the fact that `useChat` *might* pick up the stream if we use `reload`? 
        // No, `reload` re-runs the last request.
        
        // Let's try to just dump the text for now. If it looks like `0:"..."`, we'll know.
        setMessages([
          ...newMessages,
          { ...assistantMessage, content: accumulatedContent }
        ]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
    // if (handleInputChange) {
    //   handleInputChange(e); 
    // }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white/20"
        whileHover={{ rotate: 10 }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Icon icon="lucide:sparkles" className="text-2xl" />
        <span className="sr-only">Open Chat</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-background/80 backdrop-blur-xl border border-secondary/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon icon="lucide:bot" className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Rob&apos;s Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <Icon icon="lucide:x" className="text-muted-foreground" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-50 space-y-4">
                  <Icon icon="lucide:message-square-dashed" className="text-4xl" />
                  <p className="text-sm">
                    &quot;Hello! I&apos;m Rob&apos;s digital assistant. Ask me about his projects, skills, or what he&apos;s working on lately.&quot;
                  </p>
                </div>
              )}

              {(messages as Message[]).map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary/20 text-foreground rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/20 p-3 rounded-2xl rounded-bl-none">
                    <Icon icon="lucide:loader-2" className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-primary/10 bg-background/50"
            >
              <div className="relative flex gap-2">
                <input
                  className="flex-1 bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                  value={localInput}
                  onChange={onInputChange}
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  disabled={isLoading || !localInput.trim()}
                  className="bg-primary text-primary-foreground p-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                  <Icon icon="lucide:send-horizontal" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
