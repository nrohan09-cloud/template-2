'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from '@/lib/types';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 ${
                message.sender === 'customer' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender}`} />
                <AvatarFallback>{message.sender[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'customer'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <CardContent className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  );
} 