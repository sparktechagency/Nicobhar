import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { Layout } from 'antd';
import MainHeader from "../components/LayoutsComponents/MainHeader";
import LocationEmployeSidebar from "../components/LayoutsComponents/LocationEmployeSidebar";
import ThirdpartySidebar from "../components/LayoutsComponents/ThirdpartySidebar";
import OrganizationSidebar from "../components/LayoutsComponents/OrganizationSidebar";


const { Content } = Layout;


const OrganizationLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className=" !bg-white" style={{ backgroundColor: "white" }}>
            <Layout className=" !bg-white" style={{ backgroundColor: "white" }}>
 
                <OrganizationSidebar collapsed={collapsed} ></OrganizationSidebar>
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

export default OrganizationLayout;