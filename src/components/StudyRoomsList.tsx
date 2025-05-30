
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Plus, ArrowRight, UserCircle, Clock } from 'lucide-react';

interface StudyRoom {
  id: string;
  name: string;
  subject: string;
  description: string;
  participants: number;
  maxParticipants: number;
  owner: string;
  status: 'active' | 'full' | 'scheduled';
  tags: string[];
  createdAt: Date;
}

const MOCK_ROOMS: StudyRoom[] = [
  {
    id: '1',
    name: 'Economics Study Group',
    subject: 'Economics',
    description: 'Study group for microeconomics and macroeconomics courses',
    participants: 2,
    maxParticipants: 8,
    owner: 'student1',
    status: 'active',
    tags: ['microeconomics', 'macroeconomics'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'Programming Help Desk',
    subject: 'Informatics',
    description: 'Get help with programming assignments across different languages',
    participants: 3,
    maxParticipants: 12,
    owner: 'student3',
    status: 'active',
    tags: ['python', 'java', 'algorithms'],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Machine Learning Workshop',
    subject: 'Data Science',
    description: 'Collaborative learning session for ML concepts and implementations',
    participants: 5,
    maxParticipants: 10,
    owner: 'student5',
    status: 'active',
    tags: ['machine learning', 'python', 'tensorflow'],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: '4',
    name: 'Statistics Study Circle',
    subject: 'Mathematics',
    description: 'Working through advanced statistics problems together',
    participants: 7,
    maxParticipants: 8,
    owner: 'student7',
    status: 'active',
    tags: ['statistics', 'probability', 'r'],
    createdAt: new Date(Date.now() - 30 * 60 * 1000)
  }
];

const StudyRoomsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    subject: '',
    description: '',
    maxParticipants: 8
  });

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateRoom = () => {
    if (!newRoom.name || !newRoom.subject || !newRoom.description) {
      return;
    }

    const room: StudyRoom = {
      id: Date.now().toString(),
      name: newRoom.name,
      subject: newRoom.subject,
      description: newRoom.description,
      participants: 1,
      maxParticipants: newRoom.maxParticipants,
      owner: 'You',
      status: 'active',
      tags: [newRoom.subject.toLowerCase()],
      createdAt: new Date()
    };

    setRooms([room, ...rooms]);
    setNewRoom({ name: '', subject: '', description: '', maxParticipants: 8 });
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Economics': 'bg-blue-100 text-blue-800',
      'Informatics': 'bg-green-100 text-green-800',
      'Data Science': 'bg-purple-100 text-purple-800',
      'Mathematics': 'bg-orange-100 text-orange-800'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-academic-blue">Collaborative Study Rooms</h1>
          <p className="text-academic-gray mt-2">
            Find or create study rooms for interdisciplinary collaboration and peer learning.
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-academic-blue hover:bg-academic-light-blue"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Room
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search rooms by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Create Room Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Study Room</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Room Name</label>
                <Input
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  placeholder="e.g., Advanced Calculus Study Group"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input
                  value={newRoom.subject}
                  onChange={(e) => setNewRoom({ ...newRoom, subject: e.target.value })}
                  placeholder="e.g., Mathematics"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newRoom.description}
                onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                placeholder="Describe the purpose and goals of this study room..."
                className="w-full p-2 border border-gray-200 rounded-md h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Participants</label>
              <Input
                type="number"
                value={newRoom.maxParticipants}
                onChange={(e) => setNewRoom({ ...newRoom, maxParticipants: parseInt(e.target.value) || 8 })}
                min="2"
                max="20"
                className="w-32"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateRoom} className="bg-academic-blue">
                Create Room
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <Badge className={`mt-2 ${getSubjectColor(room.subject)}`}>
                    {room.subject}
                  </Badge>
                </div>
                <Badge className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-academic-gray text-sm">{room.description}</p>
              
              <div className="flex items-center justify-between text-sm text-academic-gray">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{room.participants} / {room.maxParticipants} participants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor((Date.now() - room.createdAt.getTime()) / (1000 * 60 * 60))}h ago</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-academic-gray">
                <UserCircle className="h-4 w-4" />
                <span>Owner: {room.owner}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {room.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button 
                className="w-full bg-academic-green hover:bg-green-600"
                disabled={room.participants >= room.maxParticipants}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {room.participants >= room.maxParticipants ? 'Room Full' : 'Join Room'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No study rooms found</h3>
          <p className="text-gray-500">Try adjusting your search or create a new room to get started.</p>
        </div>
      )}
    </div>
  );
};

export default StudyRoomsList;
