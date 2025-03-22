

import { useState, React } from "react"
import { Send } from "lucide-react"


export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-gray-100 focus:outline-none"
        />
        <button type="submit" className="p-2 rounded-lg text-red-500 hover:bg-gray-100 transition-colors">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

