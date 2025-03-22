import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from "../components/LayoutsComponents/Sidebar";
import MainHeader from "../components/LayoutsComponents/MainHeader";

const { Content } = Layout;


const AuthLayout = () => {


    return (
        <div className=" !bg-white" style={{ backgroundColor: "white" }}>
            <Layout className=" !bg-white" style={{ backgroundColor: "white" }}>

               
                <Layout>
                  
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

export default AuthLayout;