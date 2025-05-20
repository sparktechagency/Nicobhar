import { Navigate, Outlet, } from "react-router-dom";
import { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from "../components/LayoutsComponents/Sidebar";
import MainHeader from "../components/LayoutsComponents/MainHeader";
import { useSelector } from "react-redux";


const { Content } = Layout;


const SuperAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const role = useSelector((state) => state.auth.user.role);

    
    if (!role) {
        return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;
    }

   
    if (role !== 'super_admin') {
        return <Navigate to="/login" replace />;
    }


    return (
        <div className=" !bg-white" style={{ backgroundColor: "white" }}>
            <Layout className=" !bg-white" style={{ backgroundColor: "white" }}>

                <Sidebar collapsed={collapsed} ></Sidebar>
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

export default SuperAdmin;