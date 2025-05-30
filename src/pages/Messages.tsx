
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Clock, Send, ArrowLeft, LogIn, MessageSquarePlus } from 'lucide-react'; // Added MessageSquarePlus
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext'; // Import useApp
import { User as AppUser } from '@/utils/data'; // Alias User to avoid conflict

// Define types for messages and conversations locally for now
interface Message {
  id: string;
  text: string;
  sender: string; // Name of the sender or 'currentUser'
  time: string;
}

interface Conversation {
  id: string;
  name: string; // Name of the other person
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

const Messages: React.FC = () => {
  const { isAuthenticated, currentUser, login } = useApp();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState('');

  // Enhanced mock data, now local to this component
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'msg1',
      name: 'John Carpenter',
      lastMessage: 'I\'ll be there tomorrow at 10 AM as agreed.',
      time: '2 hours ago',
      unread: true,
      messages: [
        { id: 'm1-1', text: 'Hey John, are we still on for tomorrow?', sender: currentUser?.name || 'Me', time: '3 hours ago' },
        { id: 'm1-2', text: 'Yes, absolutely! See you at 10 AM.', sender: 'John Carpenter', time: '2 hours ago' },
        { id: 'm1-3', text: 'I\'ll be there tomorrow at 10 AM as agreed.', sender: 'John Carpenter', time: '2 hours ago' },
      ],
    },
    {
      id: 'msg2',
      name: 'Mary Plumber',
      lastMessage: 'Could you send me the details of the leaking pipe?',
      time: 'Yesterday',
      unread: false,
      messages: [
        { id: 'm2-1', text: 'Hi Mary, I have a leaking pipe, can you help?', sender: currentUser?.name || 'Me', time: 'Yesterday' },
        { id: 'm2-2', text: 'Could you send me the details of the leaking pipe?', sender: 'Mary Plumber', time: 'Yesterday' },
      ],
    },
    {
      id: 'msg3',
      name: 'David Electrician',
      lastMessage: 'The installation is complete. Please let me know if you need any adjustments.',
      time: '3 days ago',
      unread: false,
      messages: [
        { id: 'm3-1', text: 'The installation is complete. Please let me know if you need any adjustments.', sender: 'David Electrician', time: '3 days ago' },
      ],
    }
  ]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    // Mark conversation as read (mock)
    setConversations(prev => prev.map(c => c.id === conversationId ? {...c, unread: false} : c));
  };

  const handleSendMessage = () => {
    if (!newMessageText.trim() || !selectedConversationId || !currentUser) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: newMessageText,
      sender: currentUser.name, // Or a generic 'Me' if preferred
      time: 'Now',
    };

    setConversations(prevConvos =>
      prevConvos.map(convo => {
        if (convo.id === selectedConversationId) {
          return {
            ...convo,
            messages: [...convo.messages, newMessage],
            lastMessage: newMessageText, // Update last message snippet
            time: 'Now', // Update time of last message
          };
        }
        return convo;
      })
    );
    setNewMessageText('');
  };
  
  const handleMockLogin = () => {
    const mockLoginUser: AppUser = { 
      id: 'mock-user-profile', 
      name: 'Logged In User', 
      email: 'logger@example.com', 
      phone: '1234567890', 
      joinDate: '2023-01-01', 
      location: 'Mockville', 
      isArtisan: false 
    };
    login(mockLoginUser);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="container-custom py-16 min-h-screen text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>
        <p className="text-gray-600 mb-4">Please log in to view your messages.</p>
        <Button onClick={handleMockLogin}>
          <LogIn className="mr-2 h-4 w-4" /> Login (Mock)
        </Button>
      </div>
    );
  }
  
  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="container-custom py-16 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
        {!selectedConversationId && (
          <Button variant="outline" onClick={() => handleComingSoon("Initiate New Message")}>
            <MessageSquarePlus className="mr-2 h-4 w-4" /> New Message
          </Button>
        )}
      </div>
      
      {!selectedConversationId ? (
        // Conversation List View
        <div className="mb-8 max-w-3xl mx-auto">
          {conversations.length > 0 ? (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <Card 
                  key={conversation.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${conversation.unread ? 'border-l-4 border-primary' : ''}`}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        {conversation.name}
                        {conversation.unread && (
                          <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
                        )}
                      </CardTitle>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {conversation.time}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You have no messages yet.</p>
            </div>
          )}
           {conversations.length > 0 && <p className="text-center text-gray-500 mt-6">Select a conversation to view messages.</p>}
        </div>
      ) : (
        // Single Conversation View
        <div className="max-w-3xl mx-auto">
          <Button variant="outline" onClick={() => setSelectedConversationId(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Conversations
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>{selectedConversation?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 h-[400px] overflow-y-auto p-4">
              {selectedConversation?.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[70%] ${
                    msg.sender === currentUser.name 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === currentUser.name ? 'text-right text-primary-foreground/80' : 'text-left text-gray-500'
                    }`}>
                      {msg.sender === currentUser.name ? 'You' : msg.sender} - {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardContent className="border-t p-4">
              <div className="flex gap-2">
                <Input 
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Messages;
