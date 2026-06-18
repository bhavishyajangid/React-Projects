import React, { Suspense, lazy, useState } from "react";
import { Loader } from "../../export";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const AddItemTab = lazy(() => import("./tabs/AddItemTab"));
const ListItemsTab = lazy(() => import("./tabs/ListItemsTab"));
const OrdersTab = lazy(() => import("./tabs/OrdersTab"));

const TAB_COMPONENTS = {
  add: AddItemTab,
  list: ListItemsTab,
  orders: OrdersTab,
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("add");
  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AdminHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 md:p-10 min-h-[calc(100vh-80px)] bg-white">
          <Suspense fallback={
            <div className="flex justify-center items-center h-[50vh]">
              <Loader />
            </div>
          }>
            <ActiveTabComponent />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
