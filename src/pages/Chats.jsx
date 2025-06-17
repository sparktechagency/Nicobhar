

// import { useEffect, useState } from "react"


// import { ChatMessages } from "../components/superadmin/chat/ChatMessages"
// import { ChatInput } from "../components/superadmin/chat/ChatInput"
// import { ChatHeader } from "../components/superadmin/chat/Chat-header"
// import { TiPlusOutline } from "react-icons/ti"
// import { ChatList } from "../components/superadmin/chat/ChatList"
// import { useGetAdminProfileQuery } from "../redux/features/adminProfile/adminProfileApi"
// import { useGetChartQuery, useGetMessQuery, useGetSearchNewUserQuery } from "../redux/features/message/messageDashboardApi"
// import { skipToken } from "@reduxjs/toolkit/query"

// const MOCK_USERS = [
//   {
//     id: "1",
//     name: "Liam O'Sullivan",
//     avatar: 'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
//     role: "Buyer",
//     lastMessage: "We gathered yesterday.",
//     lastMessageTime: "10:45 AM",
//   },
//   {
//     id: "2",
//     name: "Aisha Patel",
//     avatar: 'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
//     lastMessage: "We convened yesterday.",
//     lastMessageTime: "10:45 AM",
//   },
//   {
//     id: "3",
//     name: "Liam O'Sullivan",
//     avatar: 'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
//     role: "Buyer",
//     lastMessage: "We gathered yesterday.",
//     lastMessageTime: "10:45 AM",
//   },
//   {
//     id: "4",
//     name: "Aisha Patel",
//     avatar: 'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg',
//     lastMessage: "We convened yesterday.",
//     lastMessageTime: "10:45 AM",
//   },


//   // Add more mock users as needed
// ]

// const MOCK_MESSAGES = [
//   {
//     id: "1",
//     senderId: "1",
//     text: "Hi how are you?",
//     timestamp: "10:36 AM",
//   },
//   {
//     id: "2",
//     senderId: "2",
//     text: "Hello! I am fine 😊",
//     timestamp: "10:36 AM",
//     isEmoji: true,
//   },
// ]

// const CURRENT_USER = {
//   id: "2",
//   name: "Current User",
//   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUTe0G9p0yhk8iL7Ji9en6vPqzSyaijLcTQ&s",
// }


// export default function ChatPage() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [messages, setMessages] = useState(MOCK_MESSAGES)
//   const [activeTab, setActiveTab] = useState(null)

//   const { data: loginUser, isLoading } = useGetAdminProfileQuery() // GET LOGEDIN USER
//   const role = loginUser?.data?.role


//   const { data: chartListData } = useGetChartQuery(activeTab ? { role: activeTab, search: searchQuery || "" } : skipToken)  // GET ROLE BASE USER
//   const allChartList = chartListData?.chat_list


//   const { data: messageData } = useGetMessQuery(
//     selectedUser?.id ? selectedUser.id : skipToken  // all message data get
//   );
//   const allMessageData = messageData?.data?.data





//   // active role setup
//   useEffect(() => {
//     if (role) {
//       if (role === "super_admin") {
//         setActiveTab("organization");
//       } else if (role === "support_agent") {
//         setActiveTab("organization");
//       } else if (role === "location_employee") {
//         setActiveTab("organization");
//       } else if (role === "third_party") {
//         setActiveTab("technician");
//       } else if (role === "organization") {
//         setActiveTab("super_admin");
//       }
//     }
//   }, [role]);


//   const handleSendMessage = (text) => {
//     const newMessage = {
//       id: Date.now(),
//       senderId: CURRENT_USER.id,
//       text,
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     }
//     setMessages([...messages, newMessage])
//   }

//   if (isLoading) {
//     return <p>Loading...</p>
//   }
//   return (
//     <div className="flex h-screen bg-white">
//       {/* Left Sidebar */}
//       <div className="w-80 border-r flex flex-col">
//         <div className="p-4 border-b">
//           <div className="flex flex-wrap space-x-4 mb-4">
//             {/* super admin access */}
//             {
//               role === "super_admin" && (
//                 <div>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "organization" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("organization")}
//                   >
//                     Organization
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "third-party" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("third-party")}
//                   >
//                     Third Party
//                   </button>

//                 </div>
//               )
//             }

//             {
//               role === "support_agent" && (
//                 <div>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "organization" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("organization")}
//                   >
//                     Organization
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "location_employee" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("location_employee")}
//                   >
//                     Location Employee
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "technician" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("technician")}
//                   >
//                     Technician
//                   </button>
//                 </div>
//               )
//             }

//             {
//               role === "location_employee" && (
//                 <div>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "organization" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("organization")}
//                   >
//                     Organization
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "suport_agent" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("suport_agent")}
//                   >
//                     Support Agent
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "technician" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("technician")}
//                   >
//                     Technician
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "my-contact" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("my-contact")}
//                   >
//                     My Contact
//                   </button>
//                 </div>
//               )
//             }

//             {
//               role === "third_party" && (
//                 <div>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "organization" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("organization")}
//                   >
//                     Organization
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "suport_agent" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("suport_agent")}
//                   >
//                     Support Agent
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "location_employee" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("location_employee")}
//                   >
//                     Location Employee
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "technician" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("technician")}
//                   >
//                     Technician
//                   </button>
//                 </div>
//               )
//             }

//             {
//               role === "organization" && (
//                 <div>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "super_admin" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("super_admin")}
//                   >
//                     Super Admin
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "suport_agent" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("suport_agent")}
//                   >
//                     Support Agent
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "location_employee" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("location_employee")}
//                   >
//                     Location Employee
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "technician" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("technician")}
//                   >
//                     Technician
//                   </button>

//                   <button
//                     className={`px-4 py-2 rounded-full ${activeTab === "third-party" ? "bg-red-500 text-white" : "text-gray-500"
//                       }`}
//                     onClick={() => setActiveTab("third-party")}
//                   >
//                     Third Party
//                   </button>
//                 </div>
//               )
//             }
//           </div>

//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-2 pr-10 rounded-lg bg-gray-100 focus:outline-none"
//             />
//             <button onClick={() => setIsModalOpen(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-red-500 text-white">
//               <TiPlusOutline className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {/* <ChatList
//             users={allChartList}

//           /> */}
//           <ChatList
//             users={allChartList?.filter((singleUser) => singleUser.user.name.toLowerCase().includes(searchQuery.toLowerCase()))}
//             selectedUser={selectedUser}
//             onSelectUser={setSelectedUser}
//           />
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col h-[650px]">
//         <ChatHeader user={selectedUser} />
//         {selectedUser ? (
//           <>
//             <ChatMessages messages={allMessageData} currentUser={CURRENT_USER} selectedUser={selectedUser} />
//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to start messaging</div>
//         )}
//       </div>
//     </div>
//   )
// }






import { useEffect, useState } from "react";
import { ChatMessages } from "../components/superadmin/chat/ChatMessages";
import { ChatInput } from "../components/superadmin/chat/ChatInput";
import { ChatHeader } from "../components/superadmin/chat/Chat-header";
import { TiPlusOutline } from "react-icons/ti";
import { ChatList } from "../components/superadmin/chat/ChatList";
import { useGetAdminProfileQuery } from "../redux/features/adminProfile/adminProfileApi";
import {
  useGetChartQuery,
  useGetMessQuery,
} from "../redux/features/message/messageDashboardApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { connectSocket, getSocket } from "../socket/socket";

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const { data: loginUser, isLoading } = useGetAdminProfileQuery();
  const role = loginUser?.data?.role;

  const { data: chartListData } = useGetChartQuery(
    activeTab ? { role: activeTab, search: searchQuery || "" } : skipToken
  );
  const allChartList = chartListData?.chat_list;

  const { data: messageData } = useGetMessQuery(
    selectedUser?.id ? selectedUser.id : skipToken
  );
  const allMessageData = messageData?.data?.data;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (userId) {
      const socket = connectSocket(userId);

      socket.on("connect", () => {
        console.log("✅ Connected with ID:", socket.id);
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected");
        setIsConnected(false);
      });

      socket.on("receive_message", (data) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("receive_message");
      };
    }
  }, []);

  const handleSendMessage = (text) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const socket = getSocket();
    const messageData = {
      message: text,
      senderId: user?.id,
      receiverId: selectedUser?.id,
    };

    if (socket && socket.connected) {
      socket.emit("send_message", messageData);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          senderId: user?.id,
          text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  useEffect(() => {
    if (role) {
      switch (role) {
        case "super_admin":
        case "support_agent":
        case "location_employee":
          setActiveTab("organization");
          break;
        case "third_party":
          setActiveTab("technician");
          break;
        case "organization":
          setActiveTab("super_admin");
          break;
        default:
          break;
      }
    }
  }, [role]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          {/* Role-Based Tabs */}
          <div className="flex flex-wrap space-x-4 mb-4">
            {/* Generate buttons based on role */}
            {role === "super_admin" && (
              <>
                <TabButton activeTab={activeTab} tab="organization" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="third-party" setActiveTab={setActiveTab} />
              </>
            )}
            {role === "support_agent" && (
              <>
                <TabButton activeTab={activeTab} tab="organization" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="location_employee" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="technician" setActiveTab={setActiveTab} />
              </>
            )}
            {role === "location_employee" && (
              <>
                <TabButton activeTab={activeTab} tab="organization" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="suport_agent" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="technician" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="my-contact" setActiveTab={setActiveTab} />
              </>
            )}
            {role === "third_party" && (
              <>
                <TabButton activeTab={activeTab} tab="organization" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="suport_agent" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="location_employee" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="technician" setActiveTab={setActiveTab} />
              </>
            )}
            {role === "organization" && (
              <>
                <TabButton activeTab={activeTab} tab="super_admin" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="suport_agent" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="location_employee" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="technician" setActiveTab={setActiveTab} />
                <TabButton activeTab={activeTab} tab="third-party" setActiveTab={setActiveTab} />
              </>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pr-10 rounded-lg bg-gray-100 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-red-500 text-white">
              <TiPlusOutline className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          <ChatList
            users={allChartList?.filter((singleUser) =>
              singleUser.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-[650px]">
        <ChatHeader user={selectedUser} />
        {selectedUser ? (
          <>
            <ChatMessages
              messages={allMessageData?.concat(messages)}
              currentUser={loginUser?.data}
              selectedUser={selectedUser}
            />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Tab Button
const TabButton = ({ activeTab, tab, setActiveTab }) => (
  <button
    className={`px-4 py-2 rounded-full ${activeTab === tab ? "bg-red-500 text-white" : "text-gray-500"}`}
    onClick={() => setActiveTab(tab)}
  >
    {tab.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
  </button>
);
