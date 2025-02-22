'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from '@/lib/types';
import { Send } from 'lucide-react';
import { useTranslation } from '@/lib/contexts/LanguageContext';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  viewType: 'customer' | 'employee';
}

export function ChatInterface({ messages, onSendMessage, viewType }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const t = useTranslation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => {
          const isCustomerMessage = message.sender === 'customer';
          const shouldReverse = viewType === 'customer' ? !isCustomerMessage : isCustomerMessage;
          
          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                shouldReverse ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <Avatar className="h-6 w-6 shrink-0 mb-1">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {message.sender[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`group relative max-w-[75%] break-words rounded-2xl px-4 py-2 text-sm ${
                  isCustomerMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="mb-1">{message.content}</p>
                <span 
                  className="text-[10px] opacity-0 group-hover:opacity-70 transition-opacity absolute bottom-0 translate-y-full pt-1"
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-3xl mx-auto">
          <Input
            ref={inputRef}
            placeholder={t('Type your message...')}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10 shrink-0 rounded-full"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
} 