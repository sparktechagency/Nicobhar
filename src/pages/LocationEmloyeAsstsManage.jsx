import { useState } from "react";
import { Search, Import, HistoryIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAssestlistQuery } from "../redux/features/assest/assestApi";
import { Button, Modal, Table } from "antd";
const AssetManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);
  const { data, isLoading } = useGetAssestlistQuery({
    page: currentPage,
    search: searchQuery,
    sort_by: sort,
  });

  if (isLoading) {
    return <>loading..</>;
  }
  const showModalCard = () => {
    setIsModalCardOpen(true);
  };

  const handleOkCard = () => {
    setIsModalCardOpen(false);
  };

  const handleCancelCard = () => {
    setIsModalCardOpen(false);
  };
  const handleContractClick = (assetId) => {
    navigate(`asset-history/${assetId}`);
  };
  const handleEditClick = (assetId) => {
    // navigate(`/edit-asset/${assetId}`)
  };
  const Select = ({ options, value, onChange }) => (
    <select
      className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(({ label, key }) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
  const sortOptions = [
    { label: "Sort by", key: "" },
    { label: "Name", key: "asset_name" },
    { label: "Unit Price", key: "unit_price" },
    { label: "Warranty", key: "warranty_end_date" },
    { label: "Current Spend", key: "current_spend" },
    { label: "Max Spend", key: "max_spend" },
    { label: "Organization", key: "organization" },
    { label: "QR Code", key: "qr_code" },
    { label: "Location", key: "location" },
  ];
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Asset Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="rounded-md border pl-10 pr-4 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <button className="flex items-center gap-2 rounded-md bg-[#326280] px-4 py-2 text-white">
            <Import className="h-4 w-4" />
            Import
          </button> */}
        </div>
      </div>

      <div className="flex items-center justify-end pb-4 gap-2">
        <Button
          color="red"
          shape="circle"
          className=""
          onClick={() => {
            showModalCard(true);
          }}
        >
          <HistoryIcon className="size-5" />
        </Button>
        <Select options={sortOptions} value={sort} onChange={setSort} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Asset
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                QR Code
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Warranty/Contract End Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Unit Price
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Current Spend
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Max Spend
              </th>
              {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Organization
              </th> */}
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.data.data.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{asset.name}</td>
                <td className="px-4 py-3 text-sm">{asset.qr_code}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleContractClick(asset.id)}
                    className="rounded bg-[#326280] px-3 py-1 text-white "
                  >
                    Contract
                  </button>
                </td>
                <td className="px-4 py-3 text-sm">
                  {asset.unit_price != null ? asset.unit_price : "N/A"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {asset.current_spend != null ? asset.current_spend : "N/A"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {asset.max_spend != null ? asset.max_spend : "N/A"}
                </td>
                {/* <td className="px-4 py-3 text-sm">
                  {asset.organization != null ? asset.organization : "N/A"}
                </td> */}

                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleContractClick(asset.id)}
                    className="rounded  px-3 py-1 text-white"
                  >
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.16251 9.725C9.32836 7.93125 12.4176 6.25 15.9235 6.25C19.4294 6.25 22.5174 7.93125 24.6845 9.725C25.6644 10.5269 26.5448 11.443 27.307 12.4538C27.6236 12.8838 27.8888 13.3063 28.0803 13.7C28.2554 14.0575 28.4356 14.5225 28.4356 15C28.4356 15.4775 28.2542 15.9425 28.0803 16.3C27.86 16.7375 27.6013 17.1546 27.307 17.5462C26.5448 18.557 25.6644 19.4731 24.6845 20.275C22.5186 22.0687 19.4294 23.75 15.9235 23.75C12.4176 23.75 9.32961 22.0687 7.16251 20.275C6.18259 19.4731 5.30216 18.557 4.53997 17.5462C4.24571 17.1546 3.98694 16.7375 3.76672 16.3C3.59155 15.9425 3.41138 15.4775 3.41138 15C3.41138 14.5225 3.5928 14.0575 3.76672 13.7C3.95816 13.3063 4.22341 12.8838 4.53997 12.4538C5.30216 11.443 6.18259 10.5269 7.16251 9.725ZM15.9235 18.75C16.919 18.75 17.8738 18.3549 18.5777 17.6517C19.2817 16.9484 19.6771 15.9946 19.6771 15C19.6771 14.0054 19.2817 13.0516 18.5777 12.3483C17.8738 11.6451 16.919 11.25 15.9235 11.25C14.928 11.25 13.9732 11.6451 13.2693 12.3483C12.5653 13.0516 12.1699 14.0054 12.1699 15C12.1699 15.9946 12.5653 16.9484 13.2693 17.6517C13.9732 18.3549 14.928 18.75 15.9235 18.75Z"
                        fill="#FF8000"
                      />
                    </svg>
                  </button>

                  {/* <button
                    onClick={() => handleEditClick(asset.id)}
                    className="rounded  px-3 py-1 text-white"
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_283_9130)">
                        <path
                          d="M19.9642 18.025H3.84857C3.461 18.025 3.14789 18.3378 3.14789 18.725V19.5125C3.14789 19.6087 3.22671 19.6875 3.32306 19.6875H20.4897C20.586 19.6875 20.6648 19.6087 20.6648 19.5125V18.725C20.6648 18.3378 20.3517 18.025 19.9642 18.025ZM6.33816 16.1875C6.38196 16.1875 6.42575 16.1831 6.46954 16.1766L10.1525 15.5312C10.1963 15.5225 10.2379 15.5028 10.2685 15.47L19.5503 6.19719C19.5706 6.17695 19.5867 6.15291 19.5977 6.12645C19.6087 6.09999 19.6144 6.07162 19.6144 6.04297C19.6144 6.01432 19.6087 5.98595 19.5977 5.95949C19.5867 5.93303 19.5706 5.90899 19.5503 5.88875L15.9112 2.25094C15.8696 2.20938 15.8148 2.1875 15.7557 2.1875C15.6966 2.1875 15.6419 2.20938 15.6003 2.25094L6.31846 11.5237C6.28561 11.5566 6.26591 11.5959 6.25715 11.6397L5.61121 15.3191C5.58991 15.4362 5.59752 15.5569 5.63338 15.6704C5.66925 15.784 5.73228 15.8872 5.81703 15.9709C5.96155 16.1109 6.14329 16.1875 6.33816 16.1875Z"
                          fill="#00551C"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_283_9130">
                          <rect
                            width="20.0194"
                            height="20"
                            fill="white"
                            transform="translate(0.958252)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {data?.data?.last_page > 1 && (
          <div className="flex items-center justify-end gap-2 border-t p-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>

            {/* Dynamic Page Buttons */}
            {(() => {
              const totalPages = data.data.last_page;
              const startPage = Math.max(1, currentPage - 2);
              const endPage = Math.min(totalPages, startPage + 4);
              const visiblePages = [];

              for (let i = startPage; i <= endPage; i++) {
                visiblePages.push(i);
              }

              return visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded px-3 py-1 text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ));
            })()}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, data.data.last_page)
                )
              }
              disabled={currentPage === data.data.last_page}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Modal
        title={
          <div className="modal-header flex justify-center items-center">
            <span className="header-title capitalize">Maintenance History</span>
          </div>
        }
        className="ticket-modal !w-[90dvw]"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalCardOpen}
        onOk={handleOkCard}
        onCancel={handleCancelCard}
        footer={null}
      >
        <div className="p-6 space-y-6">
          <div className="p-4 rounded-lg border-0 bg-zinc-200 font-semibold text-base flex !flex-row gap-2 items-center">
            <div className="h-4 w-4 bg-green-600 rounded" />
            <p>Open (2)</p>
          </div>
          <Table dataSource={dataSource} columns={columns} />
          <div className="p-4 rounded-lg border-0 bg-zinc-200 font-semibold text-base flex !flex-row gap-2 items-center">
            <div className="h-4 w-4 bg-sky-600 rounded" />
            <p>Technician Deployed (0)</p>
          </div>
          <p>There are no technician deployed tickets</p>
          <div className="p-4 rounded-lg border-0 bg-zinc-200 font-semibold text-base flex !flex-row gap-2 items-center">
            <div className="h-4 w-4 bg-sky-600 rounded" />
            <p>Parts Required (0)</p>
          </div>
          <p>There are no technician deployed tickets</p>
          <div className="p-4 rounded-lg border-0 bg-zinc-200 font-semibold text-base flex !flex-row gap-2 items-center">
            <div className="h-4 w-4 bg-sky-600 rounded" />
            <p>Closed (2)</p>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </Modal>
    </div>
  );
};
const dataSource = [
  {
    key: "1",
    ticketNumber: "W3487530",
    description: "ViewSonic",
    serialNumber: "DH734875",
    opened: "Md. Abid",
    serviceProvider: "MiFitness",
    tipHours: "520.13",
    ttoHours: "520.13",
  },
  {
    key: "2",
    ticketNumber: "W3487530",
    description: "ViewSonic",
    serialNumber: "DH734875",
    opened: "Md. Abid",
    serviceProvider: "MiFitness",
    tipHours: "520.13",
    ttoHours: "520.13",
  },
];

const columns = [
  {
    title: "Ticket Number",
    dataIndex: "ticketNumber",
    key: "ticketNumber",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Serial Number",
    dataIndex: "serialNumber",
    key: "serialNumber",
  },
  {
    title: "Opened by",
    dataIndex: "opened",
    key: "opened",
  },
  {
    title: "Service Provider",
    dataIndex: "serviceProvider",
    key: "serviceProvider",
    render: (text) => (
      <div className="flex flex-row items-center gap-2">
        <div className="h-3.5 w-3.5 bg-blue-600 rounded"></div> {text}
      </div>
    ),
  },
  {
    title: "T.I.P (Hours)",
    dataIndex: "tipHours",
    key: "tipHours",
    render: (text) => (
      <div className="flex flex-col items-center gap-2">
        {text}
        <div className="bg-green-700 rounded px-3 py-1 border-2 border-green-500 text-white font-semibold text-xs">
          BELOW SLA
        </div>
      </div>
    ),
  },
  {
    title: "T.T.O (Hours)",
    dataIndex: "ttoHours",
    key: "ttoHours",
  },
];
export default AssetManagement;
