import { createBrowserRouter, Navigate } from "react-router-dom";
import SuperAdmin from "../layouts/SuperAdmin";
import Supportagent from "../layouts/Supportagent";
import Dashboard from "../pages/Dashboard";
import AssetManagement from "../pages/Assets";
import AssetHistory from "../components/superadmin/AssetsHistory";
import TicketsPage from "../pages/Tickets";
import Maintenance from "../pages/Maintenance";
import TicketsActivity from "../components/superadmin/TicketsActivity";
import InspactionAcvity from "../components/superadmin/InspactionAcvity";
import JobCardsOverview from "../components/superadmin/JobCardsOverview";
import Inspectionsheets from "../pages/Inspectionsheets";
import ServiceProviders from "../pages/ServiceProviders";
import JobCards from "../pages/JobCards";
import Reports from "../pages/Reports";
import Chats from "../pages/Chats";
import AdminProfile from "../components/superadmin/AdminProfile";
import UserManagement from "../pages/UserManagement";
import SupportAgentDashboard from "../pages/SupportAgentDashboard";

import SupportAgentInspaction from "../pages/SupportAgentInspaction";
import CreateInspectionPage from "../pages/CreateInspactionPage";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../pages/authentication/Signup";
import Login from "../pages/authentication/Login";
import ResetPassword from "../pages/authentication/ResetPassword";
import OtpVerification from "../pages/authentication/OtpVerification";
import CreateNewPassword from "../pages/authentication/CreateNewPassword";
import NotificationsPage from "../pages/Notification";
import LocationEmployeLayout from "../layouts/LocationEmployeLayout";
import LocationEmployDashb from "../pages/LocationEmployDashb";
import LocationEmloyeAsstsManage from "../pages/LocationEmloyeAsstsManage";
import LocationEmplTickets from "../pages/LocationEmplTickets";
import LocaEmployInspaction from "../pages/LocaEmployInspaction";
import LocaJobCard from "../pages/LocaJobCard";
import LocationEmpMinatanence from "../pages/LocationEmpMinatanence";
import ThirdpartyLayout from "../layouts/ThirdpartyLayout";
import ThirdPartyTickets from "../pages/ThirdPartyTickets";
import ThirdPartyServiceProvider from "../pages/ThirdPartyServiceProvider";
import ThirdpartyInspaction from "../pages/ThirdpartyInspaction";
import ThirdPartyJobcards from "../pages/ThirdPartyJobcards";
import OrganizationLayout from "../layouts/OrganizationLayout";
import OrganizationDashbord from "../pages/OrganizationDashbord";
import OrganizationAssets from "../pages/OrganizationAssets";
import OrganizationTickets from "../pages/OrganizationTickets";
import OrganizationTicketsActivity from "../components/organization/OrganizationTicketsActivity";
import OrganizaInspactionAcvity from "../components/organization/OrganizaInspactionAcvity";
import OrganizInspaction from "../pages/OrganizInspaction";
import OrganizationJobcarda from "../pages/OrganizationJobcarda";
import OrganizationJobCardsOverview from "../components/organization/OrganizationJobCardsOverview";
import OrganizMaintenance from "../pages/OrganizMaintenance";
import OrgserviceProvider from "../pages/OrgserviceProvider";
import AboutUs from "../components/superadmin/AboutUs";
import FAQ from "../components/superadmin/FAQ";
import SupportAgentTicket from "../pages/SupportAgentTicket";
import Unauthorized from "../components/shared/Unauthorized";


// Define User Role (Replace with Actual Authentication Logic)

const router = createBrowserRouter([

  // SUPER ADMIN-DASHBOARD ROUTES 
  {
    path: "",
    element: <SuperAdmin />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "assets", element: <AssetManagement /> },
      { path: "assets/asset-history/:id", element: <AssetHistory /> },
      { path: "tickets", element: <TicketsPage /> },
      { path: "maintenance", element: <Maintenance /> },
      { path: "tickets-activity", element: <TicketsActivity /> },
      { path: "inspections-activity", element: <InspactionAcvity /> },
      { path: "jobcards-overview", element: <JobCardsOverview /> },
      { path: "inspectionsheets", element: <Inspectionsheets /> },
      { path: "service-providers", element: <ServiceProviders /> },
      { path: "jobcards", element: <JobCards /> },
      { path: "reports", element: <Reports /> },
      { path: "chats", element: <Chats /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "user-management", element: <UserManagement /> },
      { path: 'notification', element: <NotificationsPage /> },
      { path: "tickets/create-inspection", element: <CreateInspectionPage /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "faq", element: <FAQ /> },
    ],
  },

  // SUPPORT AGENT-DASHBOARD ROUTES 



  {
    path: "/support-agent",
    element: <Supportagent />,
    children: [
      { path: "", element: <SupportAgentDashboard /> },
      { path: "tickets", element: <SupportAgentTicket /> },
      { path: "tickets-activity", element: <TicketsActivity /> },
      { path: "inspections-activity", element: <InspactionAcvity /> },
      { path: "jobcards-overview", element: <JobCardsOverview /> },
      { path: "inspectionsheets", element: <SupportAgentInspaction /> },
      { path: "inspectionsheets/create-inspection", element: <CreateInspectionPage /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "chats", element: <Chats /> },
      { path: "reports", element: <Reports /> },
      { path: "jobcards", element: <JobCards /> },
      { path: 'notification', element: <NotificationsPage /> },
    ],
  },

  // LOCATION EMPLOYEE-DASHBOARD ROUTES
  {
    path: "/location-employee",
    element: <LocationEmployeLayout />,
    children: [
      { path: "", element: <LocationEmployDashb /> },
      { path: "tickets", element: <LocationEmplTickets /> },
      { path: "assets", element: <LocationEmloyeAsstsManage /> },
      { path: "inspectionsheets", element: <LocaEmployInspaction /> },
      { path: "jobcards", element: <LocaJobCard /> },
      { path: "maintenance", element: <LocationEmpMinatanence /> },
      { path: "assets/asset-history/:id", element: <AssetHistory /> },
      { path: "tickets-activity", element: <TicketsActivity /> },
      { path: "inspections-activity", element: <InspactionAcvity /> },
      { path: "jobcards-overview", element: <JobCardsOverview /> },
      { path: "create-inspection", element: <CreateInspectionPage /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "chats", element: <Chats /> },


      { path: 'notification', element: <NotificationsPage /> },
    ],
  },
  // THIRD PARTY-DASHBOARD ROUTES
  {
    path: "/thirdparty",
    element: <ThirdpartyLayout />,
    children: [
      { path: "", element: <ThirdPartyTickets /> },
      { path: "service-providers", element: <ThirdPartyServiceProvider /> },
      { path: "profile", element: <AdminProfile /> },
      { path: 'notification', element: <NotificationsPage /> },
      { path: "chats", element: <Chats /> },
      { path: "inspectionsheets", element: <ThirdpartyInspaction /> },
      { path: "jobcards", element: <ThirdPartyJobcards /> },
    ]
  },

  // ORGANIZATION ROUTES
  {
    path: "/organization",
    element: <OrganizationLayout />,
    children: [
      { path: "", element: <OrganizationDashbord /> }, // Default for /organization
      { path: "tickets", element: <OrganizationTickets /> },
      { path: "tickets/tickets-activity", element: <OrganizationTicketsActivity /> },
      { path: "assets", element: <OrganizationAssets /> },
      { path: "assets/asset-history/:id", element: <AssetHistory /> },
      { path: "inspectionsheets", element: <OrganizInspaction /> },
      { path: "inspectionsheets/inspections-activity", element: <OrganizaInspactionAcvity /> },
      { path: "service-providers", element: <OrgserviceProvider /> },
      { path: "jobcards", element: <OrganizationJobcarda /> },
      { path: "jobcards/jobcards-overview", element: <OrganizationJobCardsOverview /> },
      { path: "maintenance", element: <OrganizMaintenance /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "notification", element: <NotificationsPage /> },
      { path: "chats", element: <Chats /> },
    ]
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: '/otp-verification', element: <OtpVerification /> },
      { path: '/create-new-password', element: <CreateNewPassword /> },

    ]
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  }
]);

export default router;
