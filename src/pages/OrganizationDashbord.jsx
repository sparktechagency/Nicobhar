

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useGetOrganizationDashboardApiQuery } from "../redux/features/organizationDashboard/dashboardApi"
import { Card } from "antd"
import { useNavigate } from "react-router-dom"

// Custom donut chart component
const DonutChart = ({ data, total }) => {
  return (
    <div style={{ width: "120px", height: "120px", position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        <div style={{ color: "#666", fontSize: "10px" }}>Total</div>
        <div style={{ color: "#333", fontSize: "14px" }}>{total}</div>
      </div>
    </div>
  )
}

// Status indicator component
const StatusIndicator = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
    <div
      style={{
        width: "12px",
        height: "12px",
        backgroundColor: color,
        marginRight: "8px",
        borderRadius: "2px",
      }}
    ></div>
    <span style={{ fontSize: "14px", color: "#333" }}>{label}</span>
  </div>
)

export default function MetricsDashboard() {
  const navigate = useNavigate()
  const { data } = useGetOrganizationDashboardApiQuery()

  const dashboardData = data?.data

  const outOfAssetDetailsData = data?.data?.["out_of_order_assets    "]?.asset_data;
  const outOfAssetTotal = data?.data?.["out_of_order_assets    "]?.total;

  console.log(outOfAssetTotal)

  const wairentyDetailsData = data?.data?.warranty_details?.asset_data
  const wairentyTotal = data?.data?.warranty_details?.total

  const ticketDetailsData = data?.data?.ticket_status?.ticket_data
  const ticketTotal = data?.data?.ticket_status?.total





  const cardStyle = {
    borderRadius: "8px",
    padding: "20px",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  }

  const thStyle = {
    backgroundColor: "#f8f9fa",
    padding: "8px 12px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "1px solid #e9ecef",
  }

  const tdStyle = {
    padding: "8px 12px",
    borderBottom: "1px solid #e9ecef",
  }

  const handleNavigate = () => {
    navigate('/organization/jobcards')
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-bold py-4">Overview</h1>
          <button onClick={handleNavigate} className="text-[16px] font-bold rounded-lg text-[#ffff] mb-3 py-2 bg-[#ED1C24] px-8"> + Create Report</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* card one */}
          <Card>
            <div className="py-6">
              <div className="flex flex-col space-y-2 text-center">
                <div className="text-center">
                  <div className="bg-[#FFF0F0] px-2 py-2 text-white  rounded-full w-fit mx-auto mb-2">
                    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.375 7.3125H17.875C17.444 7.3125 17.0307 7.48371 16.726 7.78845C16.4212 8.0932 16.25 8.50653 16.25 8.93751V21.1251C16.25 21.556 16.4212 21.9694 16.726 22.2741C17.0307 22.5789 17.444 22.7501 17.875 22.7501H24.375C24.806 22.7501 25.2193 22.5789 25.5241 22.2741C25.8288 21.9694 26 21.556 26 21.1251V8.93751C26 8.50653 25.8288 8.0932 25.5241 7.78845C25.2193 7.48371 24.806 7.3125 24.375 7.3125ZM24.375 8.93751V19.5H17.875V8.93751H24.375Z" fill="#ED1C24" />
                      <path d="M21.1251 0H1.62501C1.19403 0 0.780701 0.171205 0.475953 0.475953C0.171205 0.780701 0 1.19403 0 1.62501V14.6251C0 15.056 0.171205 15.4694 0.475953 15.7741C0.780701 16.0789 1.19403 16.2501 1.62501 16.2501H8.12503V17.8751H5.94752C5.6986 17.8468 5.44834 17.9154 5.24865 18.0667C5.04897 18.2179 4.91517 18.4403 4.87502 18.6876C4.91517 18.9349 5.04897 19.1572 5.24865 19.3085C5.44834 19.4598 5.6986 19.5284 5.94752 19.5001H14.5601V19.1994H14.6251V14.6251H1.62501V1.62501H21.1251V5.68752H22.7501V1.62501C22.7501 1.19403 22.5789 0.780701 22.2741 0.475953C21.9694 0.171205 21.5561 0 21.1251 0Z" fill="#ED1C24" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground">Asset</p>
                </div>
                <p className="text-xs text-muted-foreground">Total asset of your organization</p>

                {/* dynamic data by server-site */}
                <div className="text-2xl font-bold">{dashboardData?.total_asset}</div>
              </div>
            </div>
          </Card>

          {/* card two */}
          <Card>
            <div className="py-6">
              <div className="flex flex-col space-y-2 text-center">
                <div className="text-center">
                  <div className="bg-[#FFF0F0] px-2 py-2 text-white  rounded-full w-fit mx-auto mb-2">
                    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9868 3.85711L23.5336 5.89702C23.6064 6.16926 23.6021 6.45639 23.521 6.72629C23.4399 6.99619 23.2854 7.23822 23.0746 7.4253L23.0011 7.487C22.6388 7.76959 22.3664 8.15125 22.2168 8.58566C22.0672 9.02007 22.0469 9.48856 22.1583 9.93429C22.2698 10.38 22.5082 10.7838 22.8447 11.0967C23.1811 11.4095 23.6011 11.618 24.0538 11.6969L24.1563 11.7125C24.443 11.75 24.7122 11.8718 24.9297 12.0623C25.1473 12.2528 25.3034 12.5035 25.3784 12.7828L25.9352 14.8597C25.9998 15.1006 26.0163 15.3518 25.9838 15.599C25.9513 15.8462 25.8704 16.0846 25.7458 16.3006C25.6212 16.5165 25.4552 16.7058 25.2574 16.8576C25.0596 17.0095 24.8338 17.1208 24.593 17.1854L5.33766 22.3445C4.85134 22.4746 4.33322 22.4063 3.89727 22.1545C3.46132 21.9027 3.14324 21.4881 3.01297 21.0018L2.48947 19.0478C2.41172 18.757 2.41469 18.4504 2.49807 18.1612C2.58144 17.8719 2.74206 17.6109 2.96267 17.4061L3.04003 17.3396C3.39472 17.0502 3.65818 16.6645 3.79864 16.2288C3.93911 15.7931 3.95059 15.3261 3.83171 14.8841C3.71284 14.442 3.46867 14.0437 3.12862 13.7373C2.78858 13.4308 2.36718 13.2292 1.91518 13.1568C1.60257 13.1064 1.31121 12.9666 1.07619 12.7544C0.841165 12.5422 0.672504 12.2666 0.590519 11.9608L0.0646416 9.99916C0.000126546 9.75829 -0.0163057 9.50707 0.0162834 9.25985C0.0488725 9.01264 0.129845 8.77426 0.254575 8.55834C0.379305 8.34242 0.545349 8.15319 0.743224 8.00145C0.941099 7.84971 1.16693 7.73844 1.40781 7.674L20.6617 2.51489C20.9025 2.45029 21.1537 2.43376 21.4009 2.46625C21.6482 2.49875 21.8866 2.57962 22.1025 2.70426C22.3185 2.8289 22.5078 2.99487 22.6596 3.19268C22.8114 3.39048 22.9228 3.61626 22.9873 3.85711M21.0105 4.1452L1.92088 9.26017C1.65746 9.33089 1.50084 9.6019 1.57156 9.86531L1.94698 11.2669C2.75883 11.4304 3.50888 11.8174 4.11263 12.3843C4.71639 12.9512 5.14987 13.6754 5.36424 14.4753C5.57864 15.2753 5.56539 16.1192 5.32598 16.9121C5.08658 17.7049 4.63052 18.4152 4.0092 18.9628L4.38462 20.3644C4.45582 20.6278 4.72635 20.7844 4.98976 20.7137L24.0789 15.5987C24.3424 15.528 24.499 15.257 24.4283 14.9936L24.0533 13.5925C23.2414 13.4289 22.4913 13.0418 21.8876 12.4749C21.2838 11.9079 20.8503 11.1836 20.6361 10.3836C20.4216 9.58366 20.4348 8.73973 20.6741 7.94688C20.9134 7.15403 21.3694 6.44375 21.9906 5.89607L21.6152 4.49452C21.5984 4.43182 21.5695 4.37303 21.53 4.32153C21.4905 4.27002 21.4413 4.22681 21.3851 4.19437C21.3289 4.16192 21.2668 4.14088 21.2025 4.13244C21.1381 4.12401 21.0732 4.12834 21.0105 4.1452ZM20.4011 14.3775C20.4495 14.5581 20.4618 14.7465 20.4374 14.9319C20.4129 15.1173 20.3522 15.2961 20.2587 15.458C20.1652 15.6199 20.0407 15.7618 19.8923 15.8756C19.7439 15.9894 19.5746 16.0729 19.394 16.1213C19.2133 16.1696 19.025 16.1819 18.8396 16.1575C18.6542 16.1331 18.4754 16.0724 18.3135 15.9788C18.1516 15.8853 18.0097 15.7608 17.8959 15.6124C17.7821 15.4641 17.6986 15.2948 17.6502 15.1141C17.5525 14.7493 17.6038 14.3607 17.7927 14.0337C17.9815 13.7066 18.2926 13.4681 18.6574 13.3704C19.0222 13.2727 19.4108 13.3239 19.7378 13.5128C20.0648 13.7017 20.3034 14.0127 20.4011 14.3775ZM19.4187 10.7097C19.5164 11.0745 19.4652 11.4631 19.2764 11.7902C19.0876 12.1173 18.7765 12.3559 18.4118 12.4536C18.047 12.5514 17.6583 12.5002 17.3312 12.3114C17.0042 12.1226 16.7655 11.8115 16.6678 11.4467C16.5756 11.0839 16.6301 10.6993 16.8194 10.3763C17.0087 10.0532 17.3176 9.81779 17.6792 9.72087C18.0409 9.62396 18.4261 9.67338 18.7516 9.85845C19.0771 10.0435 19.317 10.3493 19.4187 10.7097ZM18.4352 7.04228C18.4836 7.22291 18.496 7.41129 18.4716 7.59669C18.4472 7.78209 18.3865 7.96087 18.293 8.12281C18.1995 8.28475 18.075 8.4267 17.9266 8.54053C17.7783 8.65437 17.609 8.73787 17.4283 8.78627C17.2477 8.83466 17.0593 8.84701 16.8739 8.8226C16.6885 8.79819 16.5098 8.73751 16.3478 8.64401C16.1859 8.55051 16.0439 8.42602 15.9301 8.27767C15.8163 8.12931 15.7328 7.95999 15.6844 7.77936C15.5866 7.41457 15.6378 7.02589 15.8266 6.69883C16.0154 6.37177 16.3265 6.13312 16.6913 6.03537C17.056 5.93763 17.4447 5.9888 17.7718 6.17764C18.0988 6.36647 18.3375 6.67749 18.4352 7.04228ZM13.5168 0.809582L14.728 2.53909C14.7457 2.56472 14.7626 2.59067 14.7788 2.61693L3.19096 5.72189L10.8727 0.343031C11.2851 0.0544014 11.7953 -0.058592 12.2911 0.0288995C12.7868 0.116391 13.228 0.397203 13.5168 0.809582Z" fill="#ED1C24" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground">Tickets</p>
                </div>
                <p className="text-xs text-muted-foreground">Total asset of your organization</p>

                {/* dynamic data by server-site */}
                <div className="text-2xl font-bold">{dashboardData?.total_ticket}</div>
              </div>
            </div>
          </Card>

          {/* card three */}
          <Card>
            <div className="py-6">
              <div className="flex flex-col space-y-2 text-center">
                <div className="text-center">
                  <div className="bg-[#FFF0F0] px-2 py-2 text-white  rounded-full w-fit mx-auto mb-2">
                    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6611 0C11.3375 0 11.0139 0.0746844 10.7027 0.186711L1.54142 3.98316C0.93245 4.23254 0.447436 4.71355 0.193013 5.32043C-0.0614104 5.92731 -0.0644157 6.61039 0.184658 7.21948L6.35856 22.0941C6.54093 22.5453 6.85152 22.9331 7.25193 23.2096C7.65235 23.4862 8.12503 23.6393 8.61154 23.65C8.93517 23.65 9.27125 23.6127 9.59488 23.4633L18.7686 19.6669C19.2114 19.479 19.591 19.168 19.8623 18.7709C20.1337 18.3738 20.2855 17.9071 20.2996 17.4263C20.3121 17.1152 20.2498 16.7542 20.1378 16.4305L13.9141 1.55592C13.7388 1.09998 13.4299 0.707559 13.028 0.429962C12.626 0.152366 12.1496 0.00251449 11.6611 0ZM15.9928 0L20.2872 10.3936V2.48948C20.2872 1.82923 20.0249 1.19602 19.558 0.729151C19.0912 0.262283 18.458 0 17.7977 0M22.7891 1.9169V13.1569L25.8138 5.86272C25.9378 5.5612 26.0011 5.23817 26 4.91215C25.9989 4.58613 25.9334 4.26353 25.8074 3.96286C25.6813 3.66219 25.4972 3.38937 25.2654 3.16002C25.0337 2.93068 24.759 2.74934 24.4571 2.6264M11.6611 2.45213L17.8599 17.4139L8.66133 21.2228L2.46253 6.27348" fill="#ED1C24" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground">Job cards</p>
                </div>
                <p className="text-xs text-muted-foreground">Total asset of your organization</p>

                {/* dynamic data by server-site */}
                <div className="text-2xl font-bold">{dashboardData?.total_job_card}</div>
              </div>
            </div>
          </Card>

          {/* card four */}
          <Card>
            <div className="py-6">
              <div className="flex flex-col space-y-2 text-center">
                <div className="text-center">
                  <div className="bg-[#FFF0F0] px-2 py-2 text-white  rounded-full w-fit mx-auto mb-2">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 2.55556C23 1.14617 21.8538 0 20.4444 0H2.55556C1.14617 0 0 1.14617 0 2.55556V20.4444C0 21.8538 1.14617 23 2.55556 23H20.4444C21.8538 23 23 21.8538 23 20.4444V2.55556ZM2.55556 20.4444V2.55556H20.4444L20.447 20.4444H2.55556Z" fill="#ED1C24" />
                      <path d="M5.11108 5.11133H7.66408V7.66688H5.11108V5.11133ZM10.2222 5.11133H17.8889V7.66688H10.2222V5.11133ZM5.11108 10.2224H7.66408V12.778H5.11108V10.2224ZM10.2222 10.2224H17.8889V12.778H10.2222V10.2224ZM5.11108 15.3336H7.66408V17.8891H5.11108V15.3336ZM10.2222 15.3336H17.8889V17.8891H10.2222V15.3336Z" fill="#ED1C24" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-muted-foreground">Inspection sheets</p>
                </div>
                <p className="text-xs text-muted-foreground">Total asset of your organization</p>

                {/* dynamic data by server-site */}
                <div className="text-2xl font-bold">{dashboardData?.total_inspection_sheet}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <h1 className="text-[24px] font-bold py-4">Metrics view</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Left Column - Cards and Charts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Out Of Order Assets */}
          <div className="flex justify-evenly bg-gray-200 py-10">
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ ...cardStyle, backgroundColor: "#DC2626", minWidth: "150px" }}>
                <div>Out Of Order</div>
                <div>Assets</div>
              </div>
              <DonutChart data={chartData} total={outOfAssetTotal} />
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px" }} className="w-[400px] h-[300px] overflow-y-auto">
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Asset</th>
                    <th style={thStyle}>Quantity (pc)</th>
                  </tr>
                </thead>
                <tbody>
                  {outOfAssetDetailsData?.map((item, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>
                        <StatusIndicator color={chartData[index]?.color} label={item.asset} />
                      </td>
                      <td style={tdStyle}>{item.quantity.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warranty Details */}
          <div className="flex justify-evenly bg-gray-200 py-10">
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ ...cardStyle, backgroundColor: "#2563EB", minWidth: "150px" }}>
                <div>Warranty</div>
                <div>Details</div>
              </div>
              <DonutChart data={chartData} total={wairentyTotal} />
            </div>
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px" }} className="w-[400px]">
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Asset</th>
                    <th style={thStyle}>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {wairentyDetailsData?.map((item, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>
                        <StatusIndicator color={chartData[index]?.color} label={item.product} />
                      </td>
                      <td style={tdStyle}>{item.expiry_text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Ticket Status */}
          <div className="flex justify-evenly bg-gray-200 py-10">
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ ...cardStyle, backgroundColor: "#EA580C", minWidth: "150px" }}>
                <div>Ticket</div>
                <div>Status</div>
              </div>
              <DonutChart data={chartData} total={ticketTotal} />
            </div>



            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px" }} className="w-[400px]">
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Tickets</th>
                    <th style={thStyle}>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketDetailsData?.map((item, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>
                        <StatusIndicator color={chartData[index]?.color} label={item.tickets} />
                      </td>
                      <td style={tdStyle}>{item.quantity.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





// Sample data for the charts
const chartData = [
  { name: "Monitor", value: 1569, color: "#3B82F6" },
  { name: "Keyboard", value: 5245, color: "#F59E0B" },
  { name: "Mouse", value: 2456, color: "#10B981" },
  { name: "Headphone", value: 1234, color: "#EC4899" },
  { name: "Cable", value: 2569, color: "#6B7280" },
]

// Asset quantity data
const assetData = [
  { asset: "Monitor", quantity: 1569 },
  { asset: "Keyboard", quantity: 5245 },
  { asset: "Mouse", quantity: 2456 },
  { asset: "Headphone", quantity: 1234 },
  { asset: "Cable", quantity: 2569 },
]

// Asset expiry data
const expiryData = [
  { asset: "Monitor", expiry: "Expire in 3 months" },
  { asset: "Keyboard", expiry: "Expire in 3 months" },
  { asset: "Mouse", expiry: "Expire in 3 months" },
  { asset: "Headphone", expiry: "Expire in 3 months" },
  { asset: "Cable", expiry: "Expire in 3 months" },
]

// Ticket data
const ticketData = [
  { status: "New", quantity: 1569 },
  { status: "Assigned", quantity: 5245 },
  { status: "Awaiting approval", quantity: 2456 },
  { status: "On-hold", quantity: 1234 },
  { status: "Completed", quantity: 2569 },
]