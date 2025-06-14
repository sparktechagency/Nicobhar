
import { useEffect, useRef } from "react"


export function ChatMessages({ messages, currentUser, selectedUser }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])


  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message) => {
        const isCurrentUser = message.sender_id === currentUser.id
        const formatted = new Date(message.created_at).toLocaleString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <img
                src={isCurrentUser ? currentUser.avatar : selectedUser.image}
                alt={isCurrentUser ? currentUser.name : selectedUser.name}
                className="w-[40px] h-[30px] rounded-full"
              />
            </div>
            <div
              className={`p-3 rounded-lg max-w-[50%] ${isCurrentUser ? "bg-red-500 text-white" : message.isEmoji ? "bg-transparent" : "bg-gray-100"
                }`}
            >
              <p className={message.isEmoji ? "text-2xl" : ""}>{message.message}</p>
              <span className="text-xs text-gray-500 mt-1 block">{formatted}</span>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

