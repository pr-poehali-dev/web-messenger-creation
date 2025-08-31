import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const GameMessenger = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [activeTheme, setActiveTheme] = useState('orange');
  const [activeSection, setActiveSection] = useState('chats');
  const [messagesData, setMessagesData] = useState([
    { id: 1, sender: 'Алекс', avatar: '🎯', text: 'Привет! Как дела с новой игрой?', time: '14:20', isMe: false },
    { id: 2, sender: 'Вы', avatar: '🚀', text: 'Отлично! Уже прошел первую локацию', time: '14:22', isMe: true },
    { id: 3, sender: 'Марина', avatar: '⚡', text: 'Кто-нибудь хочет в кооп?', time: '14:25', isMe: false },
    { id: 4, sender: 'Вы', avatar: '🚀', text: 'Да, я готов! Когда начинаем?', time: '14:26', isMe: true }
  ]);

  const themes = [
    { id: 'orange', name: 'Fire', colors: 'from-game-orange to-red-500' },
    { id: 'blue', name: 'Ocean', colors: 'from-game-blue to-blue-500' },
    { id: 'purple', name: 'Cosmic', colors: 'from-game-purple to-purple-500' },
    { id: 'dark', name: 'Shadow', colors: 'from-game-dark to-gray-800' }
  ];

  const chats = [
    { id: 1, name: 'Игровая Команда', avatar: '🎮', lastMessage: 'Готовы к рейду?', time: '2 мин', unread: 3, online: true },
    { id: 2, name: 'Стримеры', avatar: '📺', lastMessage: 'Начинаем в 20:00', time: '5 мин', unread: 0, online: true },
    { id: 3, name: 'Гильдия Драконов', avatar: '🐉', lastMessage: 'Новый ивент завтра', time: '1 час', unread: 1, online: false },
    { id: 4, name: 'Pro Players', avatar: '⭐', lastMessage: 'Тренировка отменена', time: '2 часа', unread: 0, online: true }
  ];



  const contacts = [
    { id: 1, name: 'Алекс Геймер', avatar: '🎯', status: 'В игре: Cyberpunk 2077', online: true },
    { id: 2, name: 'Марина Стример', avatar: '⚡', status: 'Стримит на Twitch', online: true },
    { id: 3, name: 'Виктор Про', avatar: '🏆', status: 'Отошел', online: false },
    { id: 4, name: 'Лиза Новичок', avatar: '🌟', status: 'Учится играть', online: true }
  ];

  const getCurrentTheme = () => themes.find(t => t.id === activeTheme) || themes[0];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messagesData.length + 1,
        sender: 'Вы',
        avatar: '🚀',
        text: message,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessagesData([...messagesData, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getCurrentTheme().colors} p-4 font-open-sans`}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 h-screen">
        
        {/* Боковая панель навигации */}
        <div className="col-span-2">
          <Card className="h-full bg-black/20 backdrop-blur-lg border-white/10">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full game-gradient flex items-center justify-center animate-pulse-glow">
                  <span className="text-white font-bold">GC</span>
                </div>
                <h1 className="text-white font-montserrat font-bold text-xl">Game Chat</h1>
              </div>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveSection('chats')}
                  className={`nav-item w-full text-left ${activeSection === 'chats' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'}`}
                >
                  <Icon name="MessageCircle" size={20} />
                  <span>Чаты</span>
                </button>
                <button 
                  onClick={() => setActiveSection('contacts')}
                  className={`nav-item w-full text-left ${activeSection === 'contacts' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'}`}
                >
                  <Icon name="Users" size={20} />
                  <span>Контакты</span>
                </button>
                <button 
                  onClick={() => setActiveSection('profile')}
                  className={`nav-item w-full text-left ${activeSection === 'profile' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'}`}
                >
                  <Icon name="User" size={20} />
                  <span>Профиль</span>
                </button>
                <button 
                  onClick={() => setActiveSection('status')}
                  className={`nav-item w-full text-left ${activeSection === 'status' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'}`}
                >
                  <Icon name="Zap" size={20} />
                  <span>Статус</span>
                </button>
                <button 
                  onClick={() => setActiveSection('settings')}
                  className={`nav-item w-full text-left ${activeSection === 'settings' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'}`}
                >
                  <Icon name="Settings" size={20} />
                  <span>Настройки</span>
                </button>
              </nav>
            </div>
          </Card>
        </div>

        {/* Список чатов */}
        <div className="col-span-3">
          <Card className="h-full bg-black/20 backdrop-blur-lg border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-montserrat font-semibold text-lg">
                  {activeSection === 'chats' && 'Чаты'}
                  {activeSection === 'contacts' && 'Контакты'}
                  {activeSection === 'profile' && 'Профиль'}
                  {activeSection === 'status' && 'Статус'}
                  {activeSection === 'settings' && 'Настройки'}
                </h2>
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              
              {activeSection === 'chats' && (
                <div className="space-y-3">
                  {chats.map((chat) => (
                    <div 
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`chat-item ${selectedChat === chat.id ? 'bg-white/10 border-white/20' : ''}`}
                    >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-game-purple to-game-blue text-white text-lg">
                            {chat.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium truncate">{chat.name}</h3>
                          <span className="text-white/50 text-xs">{chat.time}</span>
                        </div>
                        <p className="text-white/70 text-sm truncate">{chat.lastMessage}</p>
                      </div>
                      
                      {chat.unread > 0 && (
                        <Badge className="bg-game-orange text-white animate-pulse">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              )}

              {activeSection === 'contacts' && (
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-game-purple to-game-blue text-white text-lg">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{contact.name}</h3>
                        <p className="text-white/70 text-sm truncate">{contact.status}</p>
                      </div>
                      <Button size="sm" className="bg-game-orange hover:bg-game-orange/80 text-white">
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="bg-gradient-to-br from-game-orange to-game-blue text-white text-2xl">
                        🚀
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-white font-montserrat font-semibold text-xl">Игрок Pro</h3>
                    <p className="text-white/70">В сети</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white/70 text-sm mb-1">Статус</p>
                      <p className="text-white">Играю в Cyberpunk 2077</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white/70 text-sm mb-1">Уровень</p>
                      <p className="text-white">42 лвл</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white/70 text-sm mb-1">Очки опыта</p>
                      <p className="text-white">15,847 XP</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'settings' && (
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Уведомления</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Звук</span>
                        <Button size="sm" variant="outline" className="text-white border-white/20">ON</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Вибрация</span>
                        <Button size="sm" variant="outline" className="text-white border-white/20">OFF</Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Приватность</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Показывать статус</span>
                        <Button size="sm" variant="outline" className="text-white border-white/20">ON</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Онлайн статус</span>
                        <Button size="sm" variant="outline" className="text-white border-white/20">ON</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Основная область чата */}
        <div className="col-span-5">
          <Card className="h-full bg-black/20 backdrop-blur-lg border-white/10 flex flex-col">
            {/* Заголовок чата */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-game-blue to-game-purple text-white">
                      🎮
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-medium">Игровая Команда</h3>
                    <p className="text-white/70 text-sm">4 участника онлайн</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Icon name="Video" size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messagesData.map((msg) => (
                <div key={msg.id} className={`flex gap-3 animate-fade-in ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-game-orange to-game-blue text-white text-sm">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`message-bubble ${msg.isMe 
                    ? 'bg-gradient-to-r from-game-orange to-game-blue text-white' 
                    : 'bg-white/10 text-white'
                  }`}>
                    {!msg.isMe && <p className="text-xs text-white/70 mb-1">{msg.sender}</p>}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-white/70' : 'text-white/50'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Поле ввода */}
            <div className="p-6 border-t border-white/10">
              <div className="flex gap-3">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Paperclip" size={16} />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Написать сообщение..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-game-orange"
                />
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Smile" size={16} />
                </Button>
                <Button onClick={handleSendMessage} className="game-button-primary">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Правая панель */}
        <div className="col-span-2">
          <Card className="h-full bg-black/20 backdrop-blur-lg border-white/10">
            <div className="p-6">
              <Tabs defaultValue="themes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10">
                  <TabsTrigger value="themes" className="text-white data-[state=active]:bg-white/20">
                    Темы
                  </TabsTrigger>
                  <TabsTrigger value="contacts" className="text-white data-[state=active]:bg-white/20">
                    Люди
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="themes" className="mt-6 space-y-4">
                  <h3 className="text-white font-medium mb-4">Выберите тему</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id)}
                        className={`p-4 rounded-lg bg-gradient-to-br ${theme.colors} text-white font-medium transition-all duration-300 hover:scale-105 ${
                          activeTheme === theme.id ? 'ring-2 ring-white/50' : ''
                        }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="contacts" className="mt-6 space-y-3">
                  <h3 className="text-white font-medium mb-4">Контакты</h3>
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-game-purple to-game-blue text-white">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{contact.name}</p>
                        <p className="text-white/60 text-xs truncate">{contact.status}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameMessenger;