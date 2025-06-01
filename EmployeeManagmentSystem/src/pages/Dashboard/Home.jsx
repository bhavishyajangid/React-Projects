import { memo, Suspense, useState } from "react";
import { FaBuilding, FaMoneyBill, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import RealTimeTaskListner from "../../components/RealTimeTaskListner";
import Sidebar from "../../components/Sidebar";
import { ChatBox, Navbar, Loader } from "../../export";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col">
        <Navbar onClose={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex flex-1 flex-col md:flex-row relative">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main className="flex-1  overflow-x-auto p-3">
            <ChatBox />
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
            <RealTimeTaskListner />
            <ToastContainer />
          </main>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
