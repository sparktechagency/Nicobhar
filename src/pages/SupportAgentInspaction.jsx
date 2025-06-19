import { useEffect, useState } from "react";
import { Modal, Tabs, Table, Input, Select, Checkbox, Button, Pagination, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import InspactionModal from "../components/superadmin/InspactionModal";
import avater from '../assets/avater.png'
import { useNavigate } from "react-router-dom";
import { useCreateInspectionApiMutation, useDeleteInspectionApiMutation, useGetDetailsInspectionApiQuery, useGetInspectionApiQuery } from "../redux/features/inspection/inspectionApi";
import toast from "react-hot-toast";
const { TabPane } = Tabs;
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"



const SupportAgentInspaction = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectMultiple, setSelectMultiple] = useState(false);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('New Sheets');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);

    const tabTitles = ['New Sheets', 'Open Sheets', 'Past Sheets'];
    const [activeTabKey, setActiveTabKey] = useState('New Sheets');
    const [searchValue, setSearchValue] = useState('');
    const [sheetStatus, setSheetStatus] = useState("");


    // get tab value!--
    const handleTabChange = (key) => {
        setActiveTabKey(tabTitles[key]);

    };

    // ========== rtk query use ===============
    const [createInspectionApi] = useCreateInspectionApiMutation() // create
    const [deleteInspectionApi] = useDeleteInspectionApiMutation() // delete

    const { data: inspectionData, refetch } = useGetInspectionApiQuery({ search: searchValue, filter: sheetStatus, type: activeTabKey, per_page: perPage, page: currentPage }); // get

    const { data: inspectionDetailsData } = useGetDetailsInspectionApiQuery();
    const allInspectionSheet = inspectionData?.data?.data
    const detailsInspectionSheet = inspectionDetailsData
    const processedData = allInspectionSheet?.map((item) => ({
        ...item,
        key: item.id,
    }));




    // data and time formate!--
    function formatDateTime(datetimeStr) {
        if (!datetimeStr) return { date: "", time: "" };
        const dateObj = new Date(datetimeStr);

        // Format date as dd/mm/yyyy
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();

        const date = `${day}/${month}/${year}`;

        // Format time as hh:mm am/pm
        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // convert 24h to 12h clock

        const time = `${hours}:${minutes} ${ampm}`;

        return { date, time };
    }



    const handleNavigate = (record) => {
        console.log(activeTabKey)
        if (activeTabKey === 'New Sheets') {
            return navigate(`/support-agent/create-inspection/${record?.id}`)
        }
        else if (activeTabKey === 'Open Sheets') {
            return navigate(`/support-agent/open-sheet-details/${record?.id}`)
        } else if (activeTabKey === 'Past Sheets') {
            return navigate(`/support-agent/past-sheet-details/${record?.id}`)
        }
    }


    const columns = [

        {
            title: "Tickets",
            dataIndex: "tickets",
            key: "tickets",
            onCell: (record) => ({
                onClick: () => handleNavigate(record),
            }),
            render: (_, record) => (
                <div className="ticket-info text-center flex flex-col justify-start">
                    <div className="ticket-number text-[#777777] text-[14px] ">#{record?.inspection_order_number}</div>
                    <div className="company-name text-[16px] font-semibold">{record?.ticket?.asset?.product}</div>
                    <div className="model-number text-[16px] font-medium">{record?.ticket?.asset?.serial_number}</div>
                </div>
            ),
        },
        {
            title: "Date & Time",
            key: "datetime",
            onCell: (record) => ({
                onClick: () => handleNavigate(record),
            }),
            render: (text, record) => {
                const { date, time } = formatDateTime(record.created_at);
                return (
                    < div className="date-time" >
                        <div className="date text-[16px] text-[#777777] flex gap-2"> <span><svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24242 0C4.40316 0 4.55732 0.0638527 4.67097 0.177511C4.78463 0.29117 4.84848 0.445323 4.84848 0.606061V1.81818H13.3333V0.606061C13.3333 0.445323 13.3972 0.29117 13.5108 0.177511C13.6245 0.0638527 13.7787 0 13.9394 0C14.1001 0 14.2543 0.0638527 14.3679 0.177511C14.4816 0.29117 14.5455 0.445323 14.5455 0.606061V1.82182C14.842 1.82424 15.1063 1.83475 15.3382 1.85333C15.7806 1.8897 16.1685 1.96606 16.5273 2.14788C17.0973 2.43866 17.5606 2.90243 17.8509 3.47273C18.0339 3.83152 18.1103 4.21939 18.1467 4.66061C18.1818 5.09091 18.1818 5.62061 18.1818 6.27758V15.5406C18.1818 16.1976 18.1818 16.7285 18.1467 17.1564C18.1103 17.5988 18.0339 17.9867 17.8509 18.3455C17.5604 18.9153 17.0971 19.3786 16.5273 19.6691C16.1685 19.8521 15.7806 19.9285 15.3394 19.9648C14.9091 20 14.3794 20 13.7236 20H4.45939C3.80242 20 3.27152 20 2.84364 19.9648C2.40121 19.9285 2.01333 19.8521 1.65455 19.6691C1.08425 19.3788 0.620479 18.9155 0.329697 18.3455C0.147879 17.9867 0.0715149 17.5988 0.0351513 17.1576C-2.34806e-07 16.7273 0 16.1964 0 15.5394V6.27879C0 5.70303 -2.25775e-08 5.22667 0.0242424 4.82788L0.0351513 4.66303C0.0715149 4.22061 0.147879 3.83273 0.329697 3.47394C0.620273 2.90346 1.08406 2.43967 1.65455 2.14909C2.01333 1.96727 2.40121 1.89091 2.84242 1.85455C3.07596 1.83596 3.34061 1.82545 3.63636 1.82303V0.606061C3.63636 0.445323 3.70022 0.29117 3.81387 0.177511C3.92753 0.0638527 4.08169 0 4.24242 0ZM3.63636 3.63636V3.03394C3.40461 3.03585 3.17298 3.04515 2.94182 3.06182C2.57576 3.09091 2.36485 3.14667 2.20485 3.22788C1.86243 3.40225 1.58406 3.68061 1.4097 4.02303C1.32849 4.18303 1.27273 4.39394 1.24364 4.76C1.21212 5.13455 1.21212 5.61455 1.21212 6.30303V6.9697H16.9697V6.30303C16.9697 5.61455 16.9697 5.13455 16.9382 4.76C16.9091 4.39394 16.8533 4.18303 16.7721 4.02303C16.5978 3.68061 16.3194 3.40225 15.977 3.22788C15.817 3.14667 15.6061 3.09091 15.24 3.06182C15.0088 3.04515 14.7772 3.03585 14.5455 3.03394V3.63636C14.5455 3.7971 14.4816 3.95125 14.3679 4.06491C14.2543 4.17857 14.1001 4.24242 13.9394 4.24242C13.7787 4.24242 13.6245 4.17857 13.5108 4.06491C13.3972 3.95125 13.3333 3.7971 13.3333 3.63636V3.0303H4.84848V3.63636C4.84848 3.7971 4.78463 3.95125 4.67097 4.06491C4.55732 4.17857 4.40316 4.24242 4.24242 4.24242C4.08169 4.24242 3.92753 4.17857 3.81387 4.06491C3.70022 3.95125 3.63636 3.7971 3.63636 3.63636ZM16.9697 8.18182H1.21212V15.5152C1.21212 16.2036 1.21212 16.6848 1.24364 17.0582C1.27273 17.4242 1.32849 17.6352 1.4097 17.7952C1.58406 18.1376 1.86243 18.4159 2.20485 18.5903C2.36485 18.6715 2.57576 18.7273 2.94182 18.7564C3.31636 18.7879 3.79636 18.7879 4.48485 18.7879H13.697C14.3855 18.7879 14.8667 18.7879 15.24 18.7564C15.6061 18.7273 15.817 18.6715 15.977 18.5903C16.3194 18.4159 16.5978 18.1376 16.7721 17.7952C16.8533 17.6352 16.9091 17.4242 16.9382 17.0582C16.9697 16.6848 16.9697 16.2036 16.9697 15.5152V8.18182Z" fill="#777777" />
                        </svg>
                        </span><span className="text-[16px]">{date}</span></div>

                        <div className="time text-[16px] text-[#777777] flex gap-2"> <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM11 10H15V12H9V5H11V10Z" fill="#777777" />
                        </svg>
                        </span><span className="text-[16px]">{time}</span></div>
                    </div >
                )
            }
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            onCell: (record) => ({
                onClick: () => handleNavigate(record),
            }),
            render: (text, record) => (
                <div className="location">
                    <span className="text-[16px] text-[#777777]">{record?.ticket?.user?.address}</span>
                </div>
            )
        },
        {
            title: "Technician",
            dataIndex: "Technician",
            key: "Technician",
            onCell: (record) => ({
                onClick: () => handleNavigate(record),
            }),
            render: (text, record) => (
                <div className="technician flex items-center gap-2">
                    <div className="image h-[40px] w-[40px] rounded-full ">
                        <img className="w-[40px] h-[40px] rounded-full" src={record?.technician?.image}
                        />
                    </div>
                    <div className="name">
                        <span className="text-[14px] font-semibold text-[#000000]">{record?.technician?.name} </span>
                    </div>
                </div>
            ),
        },
        {
            title: "Sheet Status",
            key: "status",
            onCell: (record) => ({
                onClick: () => handleNavigate(record),
            }),
            render: (text, record) => (
                <div className=" ticket-status">
                    <span className={`${record?.status === "Completed" ? 'text-green-600' : "text-secondary"}  text-lg font-semibold`}>{record.status}</span>
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="13.5" cy="13.5" r="13.5" fill="#D9D9D9" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.071 14.071L11.414 19.728L10 18.314L14.95 13.364L10 8.414L11.414 7L17.071 12.657C17.2585 12.8445 17.3638 13.0988 17.3638 13.364C17.3638 13.6292 17.2585 13.8835 17.071 14.071Z" fill="black" />
                    </svg>

                </div>
            ),
        },
    ];


    useEffect(() => {
        refetch(); // Refetch the data when searchText, currentPage, or perPage changes
    }, [searchValue, sheetStatus, activeTabKey, perPage, currentPage,setCurrentPage, refetch]);


    const toggleSelectTicket = (key) => {
        setSelectedTickets((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const totalCount = inspectionData?.total || inspectionData?.data?.total || 0;

    return (
        <div className="tickets-page relative p-4">
            <div className="header flex justify-between items-center">
                <div className="search-section">
                    <Input value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} prefix={<SearchOutlined />} placeholder="Search tickets..." className="search-input" />
                </div>
                <div className="flex items-center gap-4">


                    {/* 
                    <Checkbox onChange={(e) => setSelectMultiple(e.target.checked)}>Select multiple tickets</Checkbox> */}



                    <Select defaultValue="Filter By Status" onChange={(value) => setSheetStatus(value)} className="location-select">
                        <Select.Option value="New">New</Select.Option>
                        <Select.Option value="In-progress">In-progress</Select.Option>
                        <Select.Option value="Contract with user">Contract with user</Select.Option>
                        <Select.Option value="View the problem">View the problem</Select.Option>
                        <Select.Option value="Solve the problem">Solve the problem</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                    </Select>
                </div>
            </div>

            <Tabs defaultActiveKey="0" onChange={handleTabChange}>
                {tabTitles.map((tab, idx) => (
                    <TabPane tab={tab} key={idx.toString()}>
                        <Table
                            className="bg-white p-4 rounded-lg shadow-sm"
                            columns={columns}
                            dataSource={processedData}
                            pagination={false}
                            onRow={(record) => ({
                                onClick: () => {
                                    if (selectMultiple) {
                                        const alreadySelected = selectedTickets.includes(record.key);
                                        if (!alreadySelected) {
                                            setSelectedTickets([...selectedTickets, record.key]);
                                            setSelectedRecords([...selectedRecords, record]);
                                        }
                                    }
                                }
                            })}
                            rowSelection={
                                selectMultiple
                                    ? {
                                        selectedRowKeys: selectedTickets,
                                        onChange: (selectedKeys, selectedRows) => {
                                            setSelectedTickets(selectedKeys);
                                            setSelectedRecords(selectedRows);
                                        }
                                    }
                                    : null
                            }

                        />
                    </TabPane>
                ))}
            </Tabs>
            <div className="flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={perPage}
                    total={totalCount}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page)
                        setPerPage(pageSize)
                    }}
                />
            </div>
        </div>
    );
};

export default SupportAgentInspaction;
