import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const AssetHistory = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const serviceHistory = [
        {
            ticket: "TICKET072483",
            contract: "C2316/2024",
            category: "Automotive",
            cost: "R 1,516.25",
            date: "12/29/2023",
            details: "Oil/Wheel",
        },
        {
            ticket: "TICKET072483",
            contract: "C2316/2024",
            category: "Automotive",
            cost: "R 3,162.25",
            date: "12/29/2023",
            details: "Oil/Wheel",
        },
    ]

    const assetDetails = {
        range: "Classic Assault Bike",
        asset: "High Performance bike",
        location: "N/A",
        manufacturerSerialNumber: "A21M527HN163",
        manufacturingDate: "12/24/2023",
        installationDate: "12/29/2023",
        warrantyEndDate: "12/24/2025",
    }

    const maturityData = {
        current: 4000,
        max: 7022,
        percentage: 60,
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-semibold">Asset History</h1>
            </div>

            {/* Service Cost History */}
            <div className="rounded-lg border bg-white p-6 my-6">
                <h2 className="mb-4 text-lg font-semibold">Service Cost History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-[#F0F0F0]">
                                <th className="px-4 py-2 text-left">Ticket</th>
                                <th className="px-4 py-2 text-left">Contract</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Cost</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceHistory.map((item, index) => (
                                <tr key={index} className="border-b even:bg-[#F0F0F0]">
                                    <td className="px-4 py-2">{item.ticket}</td>
                                    <td className="px-4 py-2">{item.contract}</td>
                                    <td className="px-4 py-2">{item.category}</td>
                                    <td className="px-4 py-2">{item.cost}</td>
                                    <td className="px-4 py-2">{item.date}</td>
                                    <td className="px-4 py-2">{item.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <p className="font-medium pt-4">Total Service Cost: R 4,686.68</p>
                </div>
            </div>




            <div className="">

                <div className="space-y-6 flex  gap-6">
                    {/* Asset Details */}
                    <div className="rounded-lg border bg-white p-6 w-full">
                        <h2 className="mb-4 text-lg font-semibold">Asset Details</h2>
                        <div className="grid gap-4">
                            {Object.entries(assetDetails).map(([key, value]) => (
                                <div  key={key} className="grid even:bg-[#F0F0F0] p-1 grid-cols-2 gap-4 border-b pb-2">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Asset Maturity */}
                    <div className="rounded-lg border bg-white p-6 w-full ">
                        <h2 className="mb-4 text-lg font-semibold flex space-x-2 items-center"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2 14.4H14.4V2.4C14.4 2.18783 14.3157 1.98434 14.1657 1.83431C14.0157 1.68429 13.8122 1.6 13.6 1.6C13.3878 1.6 13.1843 1.68429 13.0343 1.83431C12.8843 1.98434 12.8 2.18783 12.8 2.4V14.4H11.2V5.6C11.2 5.38783 11.1157 5.18434 10.9657 5.03431C10.8157 4.88429 10.6122 4.8 10.4 4.8C10.1878 4.8 9.98434 4.88429 9.83432 5.03431C9.68429 5.18434 9.6 5.38783 9.6 5.6V14.4H8V8.8C8 8.58783 7.91571 8.38434 7.76569 8.23431C7.61566 8.08429 7.41217 8 7.2 8C6.98783 8 6.78434 8.08429 6.63432 8.23431C6.48429 8.38434 6.4 8.58783 6.4 8.8V14.4H4.8V12C4.8 11.7878 4.71571 11.5843 4.56569 11.4343C4.41566 11.2843 4.21217 11.2 4 11.2C3.78783 11.2 3.58434 11.2843 3.43431 11.4343C3.28429 11.5843 3.2 11.7878 3.2 12V14.4H1.6V0.8C1.6 0.587827 1.51571 0.384344 1.36569 0.234315C1.21566 0.0842854 1.01217 0 0.8 0C0.587827 0 0.384344 0.0842854 0.234315 0.234315C0.0842854 0.384344 0 0.587827 0 0.8V15.2C0 15.4122 0.0842854 15.6157 0.234315 15.7657C0.384344 15.9157 0.587827 16 0.8 16H15.2C15.4122 16 15.6157 15.9157 15.7657 15.7657C15.9157 15.6157 16 15.4122 16 15.2C16 14.9878 15.9157 14.7843 15.7657 14.6343C15.6157 14.4843 15.4122 14.4 15.2 14.4Z" fill="black" />
                        </svg>
                            <span> Asset Maturity</span></h2>
                        <div className="space-y-4">
                            <div className="h-6 w-full overflow-hidden rounded-full bg-gray-200">
                                <div className="h-full bg-orange-500" style={{ width: `${maturityData.percentage}%` }} />
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>R {maturityData.current.toLocaleString()}</span>
                                <span>R {maturityData.max.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-600">({maturityData.percentage}%)</p>

                            <div>
                               <ul className="flex items-center justify-between">
                                   
                                       <span className="text-[16px] font-semibold text-[#000000]">Current Spend:</span>
                                       <span className="text-[16px] font-semibold text-[#000000]">R 4,060</span>
                                      
                               </ul>
                               <ul className="flex items-center justify-between">
                                   
                                       <span className="text-[16px] font-semibold text-[#000000]">Max Spend:</span>
                                       <span className="text-[16px] font-semibold text-[#000000]">R 7,922.05</span>
                                      
                               </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AssetHistory

