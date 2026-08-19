import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import EventLobby from './pages/EventLobby';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import CreateEvent from './pages/CreateEvent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventLobby />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
