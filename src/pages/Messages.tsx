
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Clock } from 'lucide-react';

const Messages: React.FC = () => {
  const conversations = [
    {
      id: 'msg1',
      name: 'John Carpenter',
      lastMessage: 'I\'ll be there tomorrow at 10 AM as agreed.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 'msg2',
      name: 'Mary Plumber',
      lastMessage: 'Could you send me the details of the leaking pipe?',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 'msg3',
      name: 'David Electrician',
      lastMessage: 'The installation is complete. Please let me know if you need any adjustments.',
      time: '3 days ago',
      unread: false,
    }
  ];

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>
      
      <div className="mb-8 max-w-3xl mx-auto">
        {conversations.length > 0 ? (
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <Card 
                key={conversation.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${conversation.unread ? 'border-l-4 border-primary' : ''}`}
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
      </div>
    </div>
  );
};

export default Messages;
