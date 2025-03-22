import { Image } from "antd";


export function ChatList({ users, selectedUser, onSelectUser }) {
  return (
    <div className="flex flex-col space-y-2">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelectUser(user)}
          className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${
            selectedUser?.id === user.id ? "bg-gray-100" : ""
          }`}
        >
          <div className="relative w-10 h-10">
            <Image preview={false} src={user.avatar || "/placeholder.svg"} alt={user.name} className="rounded-full" fill />
          </div>
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{user.name}</h3>
              <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

