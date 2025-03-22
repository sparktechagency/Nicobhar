import { Modal, Table, Tag } from "antd";

const MaintenanceHistoryModal = ({ isOpen, onClose, ticket:ticketData }) => {
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
      title: "Opened By",
      dataIndex: "openedBy",
      key: "openedBy",
    },
    {
      title: "Service Provider",
      dataIndex: "serviceProvider",
      key: "serviceProvider",
      render: (text) => <span className="text-blue-500">{text}</span>,
    },
    {
      title: "Opened",
      dataIndex: "opened",
      key: "opened",
    },
    {
      title: "T.I.P (Hours)",
      dataIndex: "tip",
      key: "tip",
      render: (tip) => (
        <Tag color="green" className="px-2 py-1">
          {tip} BELOW SLA
        </Tag>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      className="ticket-modal  "
      title={
        <div className="modal-header text-center w-full flex items-center justify-center">
          <span className="header-title text-gray-300 text-[20px] font-normal text-center">
            Maintenance History
          </span>
        </div>
      }
    >
      {/* OPEN TICKETS */}
      <div className="my-6 px-4">
        <div className="bg-gray-200 text-gray-800 font-semibold p-2 rounded-md flex items-center">
         <span className="pr-1"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="13" height="13" rx="3" fill="#0DB244"/>
</svg>
</span> Open ({ticketData.open.length})
        </div>
        <Table
          columns={columns}
          dataSource={ticketData.open}
          pagination={false}
          className="mt-2"
        />
      </div>

      {/* TECHNICIAN DEPLOYED */}
      <div className="mb-6 px-4">
        <div className="bg-gray-200 text-gray-800 font-semibold p-2 rounded-md flex items-center">
        <span className="pr-1"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="13" height="13" rx="3" fill="#02B3FF"/>
</svg>
</span>  Technician Deployed ({ticketData.technician.length})
        </div>
        {ticketData.technician.length === 0 ? (
          <p className="text-gray-500 p-2">There are no technician deployed tickets</p>
        ) : (
          <Table
            columns={columns}
            dataSource={ticketData.technician}
            pagination={false}
            className="mt-2"
          />
        )}
      </div>

      {/* PARTS REQUIRED */}
      <div className="mb-6 px-4">
        <div className="bg-gray-200 text-gray-800 font-semibold p-2 rounded-md flex items-center">
        <span className="pr-1"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="13" height="13" rx="3" fill="#E5087E"/>
</svg>
</span> Parts Required ({ticketData.parts.length})
        </div>
        {ticketData.parts.length === 0 ? (
          <p className="text-gray-500 p-2">There are no parts required tickets</p>
        ) : (
          <Table
          
            columns={columns}
            dataSource={ticketData.parts}
            pagination={false}
            className="mt-2"
          />
        )}
      </div>

      {/* CLOSED TICKETS */}
      <div className="mb-6 px-4">
        <div className="bg-gray-200 text-gray-800 font-semibold p-2 rounded-md flex items-center">
        <span className="pr-1"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="13" height="13" rx="3" fill="#878787"/>
</svg>
</span> Closed ({ticketData.closed.length})
        </div>
        <Table
          columns={[
            ...columns,
            {
              title: "Closed",
              dataIndex: "closed",
              key: "closed",
            },
          ]}
          dataSource={ticketData.closed}
          pagination={false}
          className="mt-2"
        />
      </div>


    </Modal>
  );
};

export default MaintenanceHistoryModal;
