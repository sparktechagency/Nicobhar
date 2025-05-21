import { Navigate, Outlet } from "react-router-dom";
import { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from "../components/LayoutsComponents/Sidebar";
import MainHeader from "../components/LayoutsComponents/MainHeader";
import { useSelector } from "react-redux";

const { Content } = Layout;


const SuperAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector((state) => state.auth.user);
    console.log(user)

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.role !== 'super_admin') {
        return <Navigate to="/login" />;
    }

    // if (!allowedRoles.includes(user.role)) {
    //     return <Navigate to="/unauthorized" />;
    // }

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