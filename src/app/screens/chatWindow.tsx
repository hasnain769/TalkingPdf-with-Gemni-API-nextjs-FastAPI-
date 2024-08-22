"use client"
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from 'react-markdown';

export default function ChatWindowScreen(  pdf_id?: any ) {
  console.log(pdf_id)
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Connect to the FastAPI WebSocket server
    ws.current = new WebSocket('ws://localhost:3000/api/ws');

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      
      // Send the pdf_id immediately after the connection is established
      if (pdf_id) {
        const message = JSON.stringify({ pdf_id: pdf_id });
        ws.current?.send(message);
        console.log('Sent pdf_id:', pdf_id);
      }
    };

    ws.current.onmessage = (event) => {
      console.log('Received message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [pdf_id]);

  const handleSendMessage = () => {
    if (ws.current && inputValue.trim()) {
      console.log('Sending message:', inputValue);
      ws.current.send(inputValue);
      setMessages((prevMessages) => [...prevMessages, `You: ${inputValue}`]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen border-r bg-muted p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">AI Assistant</h2>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4 py-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>{index % 2 === 0 ? 'AI' : 'You'}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div
                  className={`rounded-lg ${
                    index % 2 === 0 ? 'bg-muted' : 'bg-accent text-accent-foreground'
                  } p-3 text-sm`}
                >
                  <ReactMarkdown>{message}</ReactMarkdown>
                </div>
                <div className="text-xs text-muted-foreground">Just now</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-4">
        <Textarea
          placeholder="Type your message..."
          className="min-h-[48px] w-full rounded-2xl border border-input bg-background p-4 pr-16 text-sm shadow-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-3 right-3"
          onClick={handleSendMessage}
        >
          <SendIcon className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
