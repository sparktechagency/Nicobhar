import { Modal, Input, Select } from "antd"
import { CopyOutlined, CloseOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"


const { TextArea } = Input

const  EditassetsModal = ({ isOpen, onClose, ticket }) => {
  const navigate =useNavigate();
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
      className="ticket-modal"
    //   closeIcon={<CloseOutlined className="close-icon" />}
      title={
        <div className="modal-header flex items-center justify-center">
 
          <span className="header-title">Edit Assets</span>
        </div>
      }
    >
      <div className="modal-content">
        <div className="form-group">
          <label>Asset Name</label>
          <div className="input-with-copy">
            <Input style={{height:'44px',width:'100%'}} placeholder="Assault Fitness - Classic Assault Bike" className="gray-bg" />
            <CopyOutlined className="copy-icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>QR Code</label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} placeholder="O4-1345" className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Current Spend </label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} placeholder="R 4,523.26 "  className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Max Spend</label>
            <div className="input-with-copy">
              <Input style={{height:'44px',width:'100%'}} placeholder="R 4,523.26" className="gray-bg" />
              <CopyOutlined className="copy-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Organization</label>
            <div className="input-with-copy">
             <Select allowClear defaultValue={"ViewSonic"} style={{height:'44px',width:'100%'}} placeholder="Select Organization" className="gray-bg">
                <Select.Option  value="ViewSonic">ViewSonic</Select.Option>
                <Select.Option value="BenQ">BenQ</Select.Option>
                <Select.Option value="MSI">MSI</Select.Option>
                <Select.Option value="HP">HP</Select.Option>
                <Select.Option value="Asus">Asus</Select.Option>
                <Select.Option value="Phillips">Phillips</Select.Option>
             </Select>
            </div>
          </div>
        </div>



        <div className="modal-footer">
          
          <button  className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </Modal>
  )
}

export default EditassetsModal

