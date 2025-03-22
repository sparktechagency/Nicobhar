import { Image } from "antd"







export function ChatHeader({ user }) {
  if (!user) return null

  return (
    <div className="flex items-center space-x-3 p-4 border-b">
      <div className="relative w-10 h-10">
        <Image preview={false} src={user.avatar || "/placeholder.svg"} alt={user.name} className="rounded-full" fill />
      </div>
      <div>
        <h2 className="font-medium">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
    </div>
  )
}

