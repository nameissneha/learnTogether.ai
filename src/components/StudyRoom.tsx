
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, Send, PinIcon, MessageSquare, BookMarked, 
  UserCircle, PlusCircle, Video, VideoOff, Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  isPinned: boolean;
}

interface User {
  id: number;
  name: string;
  isActive: boolean;
  hasVideo: boolean;
}

const MOCK_USERS: User[] = [
  { id: 1, name: "You", isActive: true, hasVideo: true },
  { id: 2, name: "Alice Smith", isActive: true, hasVideo: true },
  { id: 3, name: "Bob Johnson", isActive: true, hasVideo: false },
  { id: 4, name: "Carol Williams", isActive: false, hasVideo: false },
];

const MOCK_MESSAGES: Message[] = [
  { 
    id: 1, 
    user: "Alice Smith", 
    text: "Has anyone understood the second algorithm from today's lecture?", 
    timestamp: new Date(Date.now() - 15 * 60000), 
    isPinned: false 
  },
  { 
    id: 2, 
    user: "Bob Johnson", 
    text: "I think it's a variant of quick sort with a different pivot selection strategy.", 
    timestamp: new Date(Date.now() - 12 * 60000), 
    isPinned: false 
  },
  { 
    id: 3, 
    user: "You", 
    text: "The time complexity should be O(n log n) on average, right?", 
    timestamp: new Date(Date.now() - 8 * 60000), 
    isPinned: false 
  },
  { 
    id: 4, 
    user: "Alice Smith", 
    text: "Yes, but worst case is still O(n²) if we keep selecting bad pivots.", 
    timestamp: new Date(Date.now() - 5 * 60000), 
    isPinned: true 
  },
];

const StudyRoom = () => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pinned'>('all');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      user: "You",
      text: newMessage,
      timestamp: new Date(),
      isPinned: false
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate response after 2 seconds
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          user: "Alice Smith",
          text: "Great point! Let me add that to our study notes.",
          timestamp: new Date(),
          isPinned: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const togglePin = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg
    ));
    
    const message = messages.find(msg => msg.id === id);
    if (message) {
      toast.success(`${message.isPinned ? 'Unpinned' : 'Pinned'} message from ${message.user}`);
    }
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    setUsers(users.map(user => 
      user.id === 1 ? { ...user, hasVideo: !videoEnabled } : user
    ));
    toast.success(`Video ${videoEnabled ? 'disabled' : 'enabled'}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter messages based on current filter
  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(msg => msg.isPinned);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Participants */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2 text-academic-blue" />
                Participants
              </h3>
              <span className="bg-academic-blue text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {users.filter(u => u.isActive).length} online
              </span>
            </div>
            
            <div className="space-y-4">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <UserCircle className="h-8 w-8 text-academic-gray" />
                      {user.isActive && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-academic-gray">{user.isActive ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>
                  {user.hasVideo && <Video className="h-4 w-4 text-academic-gray" />}
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-dashed text-academic-gray mt-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                Invite Others
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-academic-blue" />
                Study Session
              </h3>
              <div className="text-sm text-academic-gray">
                <p>Started: 2:30 PM</p>
                <p>Duration: 45 minutes</p>
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    className="w-full text-academic-blue border-academic-blue"
                    onClick={toggleVideo}
                  >
                    {videoEnabled ? (
                      <>
                        <VideoOff className="h-4 w-4 mr-2" />
                        Turn Off Video
                      </>
                    ) : (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Turn On Video
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Chat and Pinned Items */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Video Grid (Simplified for prototype) */}
          <div className="bg-gray-900 p-4 rounded-lg mb-6 h-40 flex items-center justify-center">
            <p className="text-white text-center">
              Video conferencing would be embedded here in the full product.
              <br />
              <span className="text-gray-400 text-sm">
                Integration with services like Jitsi Meet or Twilio.
              </span>
            </p>
          </div>
          
          {/* Chat + Pinned Messages */}
          <div className="bg-white rounded-lg shadow-md flex flex-col h-[500px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-academic-blue" />
                <h3 className="font-semibold">Chat & Notes</h3>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  className={filter === 'all' ? 'bg-academic-blue' : ''}
                  onClick={() => setFilter('all')}
                >
                  All Messages
                </Button>
                <Button 
                  variant={filter === 'pinned' ? 'default' : 'outline'} 
                  size="sm"
                  className={filter === 'pinned' ? 'bg-academic-blue' : ''}
                  onClick={() => setFilter('pinned')}
                >
                  <PinIcon className="h-3 w-3 mr-1" />
                  Pinned
                </Button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-academic-gray">
                  <BookMarked className="h-12 w-12 mb-2 text-academic-light-blue opacity-50" />
                  <p>No {filter === 'pinned' ? 'pinned ' : ''}messages yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isPinned ? 'bg-blue-50 p-3 rounded-lg' : ''}`}
                    >
                      <div className="mr-3 mt-1">
                        <UserCircle className="h-8 w-8 text-academic-gray" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="font-medium text-sm">
                              {message.user}
                            </span>
                            <span className="text-xs text-academic-gray ml-2">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => togglePin(message.id)}
                          >
                            <PinIcon 
                              className={`h-3 w-3 ${message.isPinned ? 'text-academic-blue' : 'text-academic-gray'}`} 
                            />
                          </Button>
                        </div>
                        <p className="text-sm text-academic-gray">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <form 
              className="p-4 border-t flex items-center"
              onSubmit={sendMessage}
            >
              <Input
                className="flex-1 mr-2 bg-gray-50"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" className="bg-academic-blue hover:bg-academic-light-blue">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;
