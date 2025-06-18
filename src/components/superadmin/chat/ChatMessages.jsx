
import { useEffect, useRef } from "react"


export function ChatMessages({ messages, currentUser, selectedUser }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])


  const user = JSON.parse(localStorage.getItem("user"));
  const logInUserId = user?.id;

console.log('messages--->', messages)
console.log('currentUser--->', currentUser)
console.log('selectedUser--->', selectedUser)



  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message) => {
        const isCurrentUser = message.sender_id === logInUserId
        return (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <img
                src={isCurrentUser ? currentUser.image : selectedUser.image}
                alt={isCurrentUser ? currentUser.name : selectedUser.name}
                className="w-[40px] h-[30px] rounded-full"
              />
            </div>
            <div
              className={`p-3 rounded-lg max-w-[50%] ${isCurrentUser ? "bg-gray-200 " : message.isEmoji ? "bg-transparent" : "bg-gray-100"
                }`}
            >
              <p className={message.isEmoji ? "text-2xl" : ""}>{message.message}</p>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}



