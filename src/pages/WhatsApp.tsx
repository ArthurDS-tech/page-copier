import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  Phone,
  Smile,
  Paperclip,
  Mic,
  Send,
  ChevronRight,
  X,
  Plus,
  Play,
  Pause,
  Image as ImageIcon,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: '1',
    name: 'Loren Quigley',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'What about 2:30 PM?',
    time: '11:30',
    unread: 0,
    category: 'Unread',
  },
  {
    id: '2',
    name: 'Esther Howard',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Awesome!',
    time: '11:29',
    unread: 0,
    category: 'Unread',
  },
  {
    id: '3',
    name: 'Loren Quigley',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'What about 2:30 PM?',
    time: '12:30',
    unread: 0,
    category: 'All Message',
  },
  {
    id: '4',
    name: 'Dianne Russell',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=16',
    lastMessage: 'Voicemail',
    time: '10:36',
    unread: 0,
    category: 'All Message',
  },
  {
    id: '5',
    name: 'Luccky',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: "Let's meet or leave!",
    time: '09:11',
    unread: 0,
    category: 'All Message',
  },
  {
    id: '6',
    name: 'David Willey',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=20',
    lastMessage: 'See you',
    time: '09:01',
    unread: 0,
    category: 'All Message',
  },
  {
    id: '7',
    name: 'Kim',
    phone: '(+1) 437-123-4567',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'Hi',
    time: '8 Ago',
    unread: 0,
    category: 'All Message',
  },
];

const messages = [
  {
    id: '1',
    type: 'received',
    sender: 'Brandon Madsen',
    content: 'Hi! I need your help for just 30 minutes a 30-40 minute WooSender A.I. Demo over Zoom with me?',
    time: '11:18 AM',
    status: 'Mark as Close',
  },
  {
    id: '2',
    type: 'sent',
    content: 'What about 2:30 PM?',
    time: '11:19 AM',
    status: 'Via SMS',
  },
  {
    id: '3',
    type: 'received',
    sender: 'Brandon Madsen',
    content: "Awesome! you're all set! Talk soon :)",
    time: '11:20 AM',
  },
  {
    id: '4',
    type: 'sent',
    content: '',
    time: '11:20 AM',
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    hasAudio: true,
    audioDuration: '00:06',
  },
];

export default function WhatsApp() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showInfo, setShowInfo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  const unreadCount = conversations.filter(c => c.category === 'Unread').length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar forceCollapsed={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-[300px] border-r border-border flex flex-col bg-background">
            {/* Header */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <ChevronLeft className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                <h2 className="text-sm font-semibold">Conversation</h2>
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 bg-muted/30 border-border/50 rounded-lg text-sm"
                />
              </div>

              {/* Filters - Grid Layout */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <Button
                    variant={selectedFilter === 'Unassigned' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 text-xs justify-start px-2"
                    onClick={() => setSelectedFilter('Unassigned')}
                  >
                    <span className="text-sm mr-1.5">👤</span>
                    <span className="flex-1 text-left truncate">Unassigned</span>
                    <span className="text-[10px] ml-1 opacity-70">37</span>
                  </Button>
                  
                  <Button
                    variant={selectedFilter === 'Assigned' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 text-xs justify-start px-2"
                    onClick={() => setSelectedFilter('Assigned')}
                  >
                    <span className="text-sm mr-1.5">👤</span>
                    <span className="flex-1 text-left truncate">Assigned</span>
                    <span className="text-[10px] ml-1 opacity-70">13</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <Button
                    variant={selectedFilter === 'All' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      "h-8 text-xs justify-start px-2",
                      selectedFilter === 'All' && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setSelectedFilter('All')}
                  >
                    <span className="text-sm mr-1.5">📋</span>
                    <span className="flex-1 text-left truncate">All</span>
                    <span className="text-[10px] ml-1 opacity-70">18</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs justify-start px-2"
                  >
                    <span className="text-sm mr-1.5">💬</span>
                    <span className="flex-1 text-left truncate">Live Chat</span>
                    <span className="text-[10px] ml-1 opacity-70">6</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs justify-start px-2"
                  >
                    <span className="text-sm mr-1.5">🚫</span>
                    <span className="flex-1 text-left truncate">Blocked</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs justify-start px-2"
                  >
                    <span className="text-sm mr-1.5">🗑️</span>
                    <span className="flex-1 text-left truncate">Trash</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {/* Unread Section */}
              <div className="px-3 pt-3 pb-1">
                <button className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-1.5">
                  <span>Unread {unreadCount}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* All Messages Section */}
              <div className="px-3 pb-2">
                <button className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-1.5 mb-1">
                  <span>All Message 16</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="space-y-0.5">
                  {filteredConversations.map((conv) => {
                    const isSelected = selectedConversation.id === conv.id;
                    
                    return (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={cn(
                          "w-full p-2.5 flex items-start gap-2.5 hover:bg-muted/60 transition-all rounded-lg",
                          isSelected && "bg-muted/80"
                        )}
                      >
                        <Avatar className="w-11 h-11 flex-shrink-0 ring-2 ring-border/30">
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{conv.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-sm text-foreground truncate">
                              {conv.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2 font-medium">
                              {conv.time}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-muted-foreground truncate mb-1">
                            {conv.phone}
                          </p>
                          
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-background">
            {/* Chat Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {selectedConversation.name}
                    </p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Assignee: <span className="text-foreground font-medium">Paul Leon</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background to-muted/5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[65%] ${msg.type === 'received' ? 'flex gap-3' : ''}`}>
                    {msg.type === 'received' && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{msg.sender?.[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="flex-1">
                      {msg.type === 'received' && msg.sender && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-foreground">{msg.sender}</span>
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                      )}
                      
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          msg.type === 'sent'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-50 dark:bg-blue-950/30 text-foreground'
                        }`}
                      >
                        {msg.content && (
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        )}
                        
                        {msg.hasImage && msg.imageUrl && (
                          <div className="mt-2 rounded-xl overflow-hidden">
                            <img 
                              src={msg.imageUrl} 
                              alt="Shared image" 
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                        
                        {msg.hasAudio && (
                          <div className="flex items-center gap-3 mt-2 bg-white/10 rounded-lg p-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-black/20"
                              onClick={() => setIsPlaying(!isPlaying)}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-white/60 w-1/3 rounded-full"></div>
                            </div>
                            <span className="text-xs font-medium">{msg.audioDuration}</span>
                          </div>
                        )}
                      </div>
                      
                      {msg.type === 'sent' && (
                        <div className="flex items-center justify-end gap-2 mt-1">
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                          {msg.status && (
                            <Badge variant="secondary" className="text-[10px] h-5">
                              {msg.status}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 bg-background">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-9 text-xs">
                  SMS
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 text-xs">
                  Let's meet or leave!
                </Button>
                <div className="flex-1"></div>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button size="icon" className="h-9 w-9 bg-primary">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          {showInfo && (
            <div className="w-[320px] border-l border-border bg-background overflow-y-auto">
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold">General Info</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setShowInfo(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-20 h-20 mb-3">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold text-base mb-1">{selectedConversation.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{selectedConversation.phone}</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                    Responded
                  </Badge>
                </div>

                {/* Actions */}
                <div className="space-y-2 mb-6">
                  <Button variant="ghost" size="sm" className="w-full justify-start h-9">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                    <p className="text-sm mt-1">m.brandon@gmail.com</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Date Created</label>
                    <p className="text-sm mt-1">Sep 22, 2021 | 12:34 AM</p>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <button className="flex items-center justify-between w-full text-sm font-medium mb-2">
                    <span>Campaign Info</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <button className="flex items-center justify-between w-full text-sm font-medium mb-2">
                    <span>Woo AI</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <button className="flex items-center justify-between w-full text-sm font-medium mb-2">
                    <span>Custom Info</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Notes */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Notes 1</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                      Add
                    </Button>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-3">
                    <p className="text-xs text-foreground mb-2">
                      I have made an appointment for tomorrow meeting.
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Aug 18, 2022 11:20 AM
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Tags 1</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                      😊Great
                      <button className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                      😊Interested
                      <button className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
