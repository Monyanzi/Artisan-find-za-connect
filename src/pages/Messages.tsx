
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Clock, Send, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 'msg1',
      name: 'John Carpenter',
      lastMessage: "I'll be there tomorrow at 10 AM as agreed.",
      time: '2 hours ago',
      unread: true,
      messages: [
        { id: 1, sender: 'John Carpenter', text: 'Hi! I received your service request for furniture repair.', time: '2 days ago', isArtisan: true },
        { id: 2, sender: 'You', text: 'Great! When would you be available to take a look?', time: '2 days ago', isArtisan: false },
        { id: 3, sender: 'John Carpenter', text: "I'll be there tomorrow at 10 AM as agreed.", time: '2 hours ago', isArtisan: true },
      ]
    },
    {
      id: 'msg2',
      name: 'Mary Plumber',
      lastMessage: 'Could you send me the details of the leaking pipe?',
      time: 'Yesterday',
      unread: false,
      messages: [
        { id: 1, sender: 'Mary Plumber', text: 'Hello! I saw your plumbing service request.', time: 'Yesterday', isArtisan: true },
        { id: 2, sender: 'Mary Plumber', text: 'Could you send me the details of the leaking pipe?', time: 'Yesterday', isArtisan: true },
      ]
    },
    {
      id: 'msg3',
      name: 'David Electrician',
      lastMessage: 'The installation is complete. Please let me know if you need any adjustments.',
      time: '3 days ago',
      unread: false,
      messages: [
        { id: 1, sender: 'David Electrician', text: 'Installation completed successfully!', time: '3 days ago', isArtisan: true },
        { id: 2, sender: 'David Electrician', text: 'The installation is complete. Please let me know if you need any adjustments.', time: '3 days ago', isArtisan: true },
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    console.log('Sending message:', {
      conversationId: selectedConversation,
      message: newMessage,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
      duration: 3000,
    });

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>
      
      <div className="flex h-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-primary' : ''
                  } ${conversation.unread ? 'bg-blue-25' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{conversation.name}</p>
                        {conversation.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {conversation.time}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No conversations found
              </div>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedConv.name}</p>
                    <p className="text-sm text-gray-500">Active now</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isArtisan ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isArtisan
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-primary text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isArtisan ? 'text-gray-500' : 'text-blue-100'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
