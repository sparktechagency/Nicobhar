

const ChatHeader = ({ user, isOnline, isTyping }) => {
    console.log(user)
    return (
        <div>
            <div className="p-4 border-b flex items-center">
                <div className="relative">
                    <img
                        src={user?.image}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full"
                    />
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                </div>
                <div className="ml-3">
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-xs text-gray-500">
                        {isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader