

export function ChatHeader({ user }) {
  if (!user) return null

  return (
    <div className="flex items-center space-x-3 px-4 py-2 border-b ">
      <div className="relative w-10 h-10">
        <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-[40px] h-[40px] rounded-full"  />
      </div>
      <div>
        <h2 className="font-medium">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.role}</p>
        {/* <p className="text-sm text-gray-500">id---: {user.id}</p> */}
      </div>
    </div>
  )
}

