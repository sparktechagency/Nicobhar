
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
  useGetSearchNewUserQuery,
  usePostMessMutation,
} from "../redux/features/message/messageDashboardApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { connectSocket, getSocket } from "../socket/socket";
import { Modal } from "antd";
import '../pages/thirdparty/chart.css'
import { FiSearch } from "react-icons/fi";



export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryTwo, setSearchQueryTwo] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)

  const [postMess] = usePostMessMutation()

  const { data: loginUser, isLoading  } = useGetAdminProfileQuery();
  const role = loginUser?.data?.role;

  const { data: chartListData , refetch : allUserChatListRefetch } = useGetChartQuery(
    activeTab ? { role: activeTab, search: searchQuery || "" } : skipToken
  );
  const allChartList = chartListData?.chat_list;

  const { data: messageData , refetch : messageDataRefetch } = useGetMessQuery(
    selectedUser?.id ? selectedUser.id : skipToken
  );
  const allMessageData = messageData?.data?.data;


  const { data: searchUserData  } = useGetSearchNewUserQuery({ role: activeTab, search: searchQueryTwo });
  const allSearchData = searchUserData?.data

  // console.log(allSearchData)


  const showModal = () => {
    setModalOpen(true)
  }

  const handleOkModalOne = () => {

  }

  const handleCancelModalOne = () => {
    setModalOpen(false)
  }





  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const socket = connectSocket(userId);
    if (userId) {

      socket.on("connect", () => {
        console.log("✅ Sokiet Connected with ID:", socket.id);
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("❌ Disconnected");
        setIsConnected(false);
      });

      socket.on("private-message", () => {
        allUserChatListRefetch()
        messageDataRefetch()
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("receive_message");
      };
    }
  }, []);


  const handleSendMessage = async (text) => {

    const sendAbleData = {
      receiver_id: selectedUser?.id,
      message: text
    }
    try {
      const res = await postMess(sendAbleData).unwrap()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    const socket = getSocket();
    const messageData = {
      message: text,
      receiverId: selectedUser?.id,
    };

    if (socket && socket.connected) {
      socket.emit("private-message", messageData);
     
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


  const handleNavigate = (userInfo) => {
    setModalOpen(false)
    setSelectedUser(userInfo)
  }






  if (isLoading) return <p>Loading...</p>;



  return (
    <div className="h-[88vh] bg-white overflow-y-hidden">

      {/* Role-Based Tabs */}
      <div className="flex items-center space-x-4 py-6">
        <p className="pl-4 text-lg font-semibold">Chat with</p>
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


      <div className="flex ">

        {/* Left Sidebar */}
        <div className="w-80 border-r flex flex-col">
          <div className="px-4">
            {/* Search */}
            <div className="relative py-1">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pr-10 rounded-lg bg-gray-100 focus:outline-none"
              />
              <button
                onClick={showModal}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-red-500 text-white">
                <TiPlusOutline className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User List */}
          <div className="">
            <ChatList
              users={allChartList?.filter((singleUser) =>
                singleUser.user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>
        </div>



        {/* Right side content */}
        <div className="h-[81vh]  w-full flex flex-col justify-between ">
          {selectedUser ? (
            <>
              <div className="">

                <div>
                  <ChatHeader user={selectedUser} />
                </div>


                <div>
                  <ChatMessages
                    messages={allMessageData?.concat(messages)}
                    currentUser={loginUser?.data}
                    selectedUser={selectedUser}
                  />
                </div>

              </div>

              <div>
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>









      {/* modal */}
      <Modal
        centered
        open={modalOpen}
        onCancel={handleCancelModalOne}
        footer={null}
        width={700}
        className="ticket-modal"
        title={
          <div className="modal-header flex justify-center">
            <span className="text-[#fff]">Chat With New User</span>
          </div>
        }
      >

        <div className="p-4 ">
          <div className="relative py-1">
            <input
              type="text"
              placeholder="Search"
              value={searchQueryTwo}
              onChange={(e) => setSearchQueryTwo(e.target.value)}
              className="w-full p-4 pr-10 rounded-lg bg-gray-100 focus:outline-none"
            />
            <button
              onClick={showModal}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ">
              <FiSearch />
            </button>
          </div>

          <div className="mt-8 space-y-1">

            {
              allSearchData?.map((user, index) => {
                return (
                  <div onClick={() => handleNavigate(user)} key={index} className="cursor-pointer hover:bg-gray-200 flex items-center gap-3  py-2 px-2 rounded-lg">
                    <img src={user?.image} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                      <h2 className=" font-medium">{user?.name}</h2>
                      <p className="text-gray-500 font-medium">Tap to send message.</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

      </Modal>
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
