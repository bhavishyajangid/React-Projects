import { memo, Suspense, useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import RealTimeTaskListner from "../../components/RealTimeTaskListner";
import Sidebar from "../../components/Sidebar";
import { ChatBox, Navbar, Loader } from "../../export";
import RealTimeLeaveListner from "../../RealTimeChanges/RealTimeLeaveListner";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    
    <div className=" h-screen w-full overflow-hidden bg-gray-100 text-gray-800 font-sans flex flex-col">
    
      {/* Navbar (fixed at top) */}
      <Navbar onClose={() => setSidebarOpen((prev) => !prev)} />

      {/* Content area below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (can be toggled) */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main scrollable content area */}
        <main className="flex-1 h-full overflow-y-auto p-4">
          <ChatBox />
          <Suspense fallback={<Loader />}>
            <Outlet/>
          </Suspense>
          <RealTimeTaskListner />
          <RealTimeLeaveListner/>
        </main>
      </div>
    </div>
  );
};

export default memo(Home);
