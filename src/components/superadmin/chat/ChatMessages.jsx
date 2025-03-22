


import { Image } from "antd"
import { useEffect, useRef } from "react"


export function ChatMessages({ messages, currentUser, selectedUser }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUser.id
        return (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
              preview={false}
                src={isCurrentUser ? currentUser.avatar : selectedUser.avatar}
                alt={isCurrentUser ? currentUser.name : selectedUser.name}
                className="rounded-full"
                fill
              />
            </div>
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                isCurrentUser ? "bg-red-500 text-white" : message.isEmoji ? "bg-transparent" : "bg-gray-100"
              }`}
            >
              <p className={message.isEmoji ? "text-2xl" : ""}>{message.text}</p>
              <span className="text-xs text-gray-500 mt-1 block">{message.timestamp}</span>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

