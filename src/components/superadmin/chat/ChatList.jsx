import { Image } from "antd";


export function ChatList({ users, selectedUser, onSelectUser }) {

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid date';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';

    const parts = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).formatToParts(date);

    const day = parts.find(p => p.type === 'day')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;

    return `${day} ${month}, ${year}`;
  };

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
    <div className="flex flex-col space-y-2">
      {users?.map((user, index) => (
        <button
          key={index}
          onClick={() => onSelectUser(user)}
          className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${selectedUser?.id === user.id ? "bg-gray-100" : ""
            }`}
        >
          <div className="relative w-10 h-10">
            {/* <img preview={false} src={user.avatar || "/placeholder.svg"} alt={user.name} className="rounded-full" fill /> */}
            <img src={user?.image} alt="" className="w-10 h-10 rounded-full" />
          </div>
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{user.name}</h3>
              <span className="text-xs text-gray-500">{getOnlyTime(user?.created_at)}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{"lastMessage"}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

