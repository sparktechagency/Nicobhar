

import { useState } from "react"


import { ChatMessages } from "../components/superadmin/chat/ChatMessages"
import { ChatInput } from "../components/superadmin/chat/ChatInput"
import { ChatHeader } from "../components/superadmin/chat/Chat-header"
import { TiPlusOutline } from "react-icons/ti"
import { ChatList } from "../components/superadmin/chat/ChatList"

const MOCK_USERS = [
  {
    id: "1",
    name: "Liam O'Sullivan",
    avatar:'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
    role: "Buyer",
    lastMessage: "We gathered yesterday.",
    lastMessageTime: "10:45 AM",
  },
  {
    id: "2",
    name: "Aisha Patel",
    avatar:'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
    lastMessage: "We convened yesterday.",
    lastMessageTime: "10:45 AM",
  },
  {
    id: "3",
    name: "Liam O'Sullivan",
    avatar:'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
    role: "Buyer",
    lastMessage: "We gathered yesterday.",
    lastMessageTime: "10:45 AM",
  },
  {
    id: "4",
    name: "Aisha Patel",
    avatar:'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
    lastMessage: "We convened yesterday.",
    lastMessageTime: "10:45 AM",
  },

  
  // Add more mock users as needed
]

const MOCK_MESSAGES = [
  {
    id: "1",
    senderId: "1",
    text: "Hi how are you?",
    timestamp: "10:36 AM",
  },
  {
    id: "2",
    senderId: "2",
    text: "Hello! I am fine 😊",
    timestamp: "10:36 AM",
    isEmoji: true,
  },
]

const CURRENT_USER = {
  id: "2",
  name: "Current User",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUTe0G9p0yhk8iL7Ji9en6vPqzSyaijLcTQ&s",
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [activeTab, setActiveTab] = useState("organization")

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      senderId: CURRENT_USER.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-full ${
                activeTab === "organization" ? "bg-red-500 text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("organization")}
            >
              Organization
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                activeTab === "third-party" ? "bg-red-500 text-white" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("third-party")}
            >
              Third Party
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pr-10 rounded-lg bg-gray-100 focus:outline-none"
            />
            <button  onClick={() => setIsModalOpen(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-red-500 text-white">
              <TiPlusOutline className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatList
            users={MOCK_USERS.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </div>
      </div>
   
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader user={selectedUser} />
        {selectedUser ? (
          <>
            <ChatMessages messages={messages} currentUser={CURRENT_USER} selectedUser={selectedUser} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to start messaging</div>
        )}
      </div>


      
    </div>


  )
}

