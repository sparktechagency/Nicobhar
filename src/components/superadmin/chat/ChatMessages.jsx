"use client";

import { useEffect, useRef } from "react";

export function ChatMessages({ messages, currentUser, selectedUser }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]); // This should depend on messages, not be empty

  // Get logged in user ID
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const logInUserId = user?.id;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 h-[60dvh]"
      style={{ scrollBehavior: "smooth" }}
    >
      {messages?.map((message) => {
        const isCurrentUser = message.sender_id === logInUserId;

        return (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              isCurrentUser ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={isCurrentUser ? currentUser.image : selectedUser.image}
                alt={isCurrentUser ? currentUser.name : selectedUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {/* Message bubble */}
            <div
              className={`p-3 rounded-lg max-w-[70%] break-words ${
                isCurrentUser
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : message.isEmoji
                  ? "bg-transparent p-1"
                  : "bg-gray-200 text-gray-900 rounded-bl-sm"
              }`}
            >
              <p
                className={`${
                  message.isEmoji ? "text-3xl" : "text-sm leading-relaxed"
                }`}
              >
                {message.message}
              </p>
            </div>
          </div>
        );
      })}

      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
}
