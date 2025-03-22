import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Building2, Users, Box, Ticket, ClipboardCheck, FileCheck } from "lucide-react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <Header />
      <MetricCards />
      <Statistics />
    </div>
  )
}

const Header = () => (
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
    <Select options={["Monthly", "Weekly", "Yearly"]} />
  </div>
)

const Select = ({ options }) => (
  <select className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    {options.map((option) => (
      <option key={option} value={option.toLowerCase()}>
        {option}
      </option>
    ))}
  </select>
)

const MetricCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <MetricCard icon={<Building2 className="w-8 h-8 text-blue-500" />} label="Organizations" value="22.23k" />
    <MetricCard icon={<Users className="w-8 h-8 text-green-500" />} label="Total users" value="22.23k" />
    <MetricCard icon={<Box className="w-8 h-8 text-yellow-500" />} label="Assets" value="22.23k" />
    <MetricCard icon={<Ticket className="w-8 h-8 text-purple-500" />} label="Tickets" value="22.23k" />
    <MetricCard icon={<ClipboardCheck className="w-8 h-8 text-red-500" />} label="Inspections" value="22.23k" />
    <MetricCard icon={<FileCheck className="w-8 h-8 text-indigo-500" />} label="Job Cards" value="22.23k" />
  </div>
)

const MetricCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
)

const Statistics = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
      <Select options={["Weekly", "Monthly", "Yearly"]} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DonutChart title="Ticket Status" staticsLink="tickets-activity" data={ticketStatusData} />
      <DonutChart title="Inspections" staticsLink="inspections-activity" data={inspectionsData} />
      <DonutChart title="Job Card Progress" staticsLink="jobcards-overview" data={jobCardProgressData} />
      <DonutChart title="Asset Status" staticsLink="#" data={assetStatusData} />
    </div>
  </div>
)
const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

const DonutChart = ({ title, data,staticsLink }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <Link to={`${staticsLink}`} className="text-blue-500 hover:underline">
      <button className="bg-gray-200 rounded-full px-2 py-2">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.16117 26.5165C4.27381 21.6291 4.27381 13.7262 9.16117 8.83883C14.0485 3.95148 21.9515 3.95148 26.8388 8.83883C31.7262 13.7262 31.7262 21.6291 26.8388 26.5165C21.9515 31.4039 14.0485 31.4039 9.16117 26.5165ZM25.799 9.8787C21.4835 5.56327 14.5165 5.56327 10.201 9.8787C5.8856 14.1941 5.8856 21.1612 10.201 25.4766C14.5165 29.7921 21.4835 29.7921 25.799 25.4766C30.1144 21.1612 30.1144 14.1941 25.799 9.8787Z" fill="black" />
          <path d="M21.4316 22.8774L21.4316 14.2466L12.8008 14.2466L12.8008 12.7908L22.8875 12.7908V22.8774H21.4316Z" fill="black" />
          <path d="M21.6394 12.998L22.6793 14.0379L13.8405 22.8767L12.8006 21.8369L21.6394 12.998Z" fill="black" />
        </svg>


      </button>
      </Link>
    </div>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart  className="">
        <Pie   data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} label={renderCustomLabel} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend iconType="circle" layout="vertical" verticalAlign="bottom" align="right" />
      </PieChart>
    </ResponsiveContainer>
  </div>
)

const ticketStatusData = [
  { name: "New", value: 30, color: "#EF4444" },
  { name: "In Progress", value: 30, color: "#F59E0B" },
  { name: "Completed", value: 30, color: "#10B981" },
]

const inspectionsData = [
  { name: "New", value: 30, color: "#EF4444" },
  { name: "In Progress", value: 30, color: "#F59E0B" },
  { name: "Completed", value: 30, color: "#10B981" },
]

const jobCardProgressData = [
  { name: "New", value: 30, color: "#EF4444" },
  { name: "In Progress", value: 30, color: "#F59E0B" },
  { name: "Completed", value: 30, color: "#10B981" },
]

const assetStatusData = [
  { name: "In Maintenance", value: 30, color: "#EF4444" },
  { name: "Out of Order", value: 30, color: "#F59E0B" },
  { name: "Functional", value: 30, color: "#10B981" },
]

export default Dashboard

