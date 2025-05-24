import { Navigate, Outlet } from "react-router-dom";
import { useState } from 'react';
import { Layout } from 'antd';
import MainHeader from "../components/LayoutsComponents/MainHeader";
import SupportAgentSidebar from "../components/LayoutsComponents/SupportAgentSidebar";
import { useSelector } from "react-redux";

const { Content } = Layout;


const Supportagent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.role !== 'support_agent') {
        return <Navigate to="/login" />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.role !== 'support_agent') {
        return <Navigate to="/login" />;
    }

    return (
        <div className=" !bg-white" style={{ backgroundColor: "white" }}>
            <Layout className=" !bg-white" style={{ backgroundColor: "white" }}>

                <SupportAgentSidebar collapsed={collapsed} ></SupportAgentSidebar>
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 250,
                        transition: 'margin-left 0.2s ease',
                    }}
                    className={``}>
                    {/* my header */}
                    <MainHeader setCollapsed={setCollapsed} collapsed={collapsed}></MainHeader>
                    <Content
                        className="p-5"
                        style={{}}
                    >
                        {/* my content */}
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Supportagent;