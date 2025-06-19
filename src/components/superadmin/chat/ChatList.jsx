
export function ChatList({ users,onSelectUser }) {



  const getOnlyTime = (dateString) => {
    if (!dateString) return 'Invalid time';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid time';

    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Change to false for 24-hour format
    }).format(date); // Example: "01:45 PM"
  };





  return (
    <div className="h-full flex flex-col  space-y-2 ">

      {users?.map((singleUser, index) => (
        <button
          key={index}
          onClick={() => onSelectUser(singleUser?.user)}
          className={`flex items-center space-x-3 mx-2 p-3 rounded-lg hover:bg-gray-100 transition-colors ${singleUser?.User?.id === singleUser?.user.id ? "bg-gray-100" : ""
            }`}
        >
          <div className="relative w-10 h-10">
            <img src={singleUser?.user?.image} alt="" className="w-10 h-10 rounded-full" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{singleUser?.user.name}</h3>
              <span className="text-xs text-gray-500">{getOnlyTime(singleUser?.created_at)}</span>
            </div>
            <p className="text-sm text-gray-500 ">
              {singleUser?.message?.length > 20
                ? `${singleUser.message.slice(0, 20)}...`
                : singleUser?.message}
            </p>
            {/* <p>sender_id----- : {singleUser?.sender_id}</p>
            <p>receiver_id-----: {singleUser?.receiver_id}</p> */}
          </div>
        </button>
      ))}
    </div>
  )
}

