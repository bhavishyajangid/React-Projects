
import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './index.css'

import { Provider } from 'react-redux'
import App from './App.jsx'
import { AllTask, Home, Loader, ProtectedLayout } from './export.js'
import store from './Store/index.js'

import HomeRedirect from './Routes/HomeRedirect.jsx'
import PreventLoginAcess from './Routes/PreventLoginAcess.jsx'


// Lazy imports
const Signup = lazy(() => import("./pages/Auth/Signup.jsx"))
const Login = lazy(() => import("./pages/Auth/Login.jsx"))
const TaskFullPage = lazy(() => import("./pages/Dashboard/TaskFullPage.jsx"))
const AllEmployee = lazy(() => import("./pages/admin/AllEmployee.jsx"))
const CompletedTask = lazy(() => import('./pages/Task/CompletedTask.jsx'))
const AcceptedTask = lazy(() => import('./pages/Task/AcceptedTask.jsx'))
const RejectedTask = lazy(() => import('./pages/Task/RejectedTask.jsx'))
const NewTask = lazy(() => import('./pages/Task/NewTask.jsx'))
const EditTask = lazy(() => import('./pages/admin/EditTask.jsx'))
const AddTask = lazy(() => import('./pages/admin/AddTask.jsx'))
const Task = lazy(() => import('./pages/admin/Task.jsx'))
const EmployeeDashboard = lazy(() => import('./pages/Dashboard/EmployeeDashboard.jsx'))
const AdminDashboard = lazy(() => import('./pages/Dashboard/AdminDashboard.jsx'))
const EmployeeInfo = lazy(() => import('./pages/admin/EmployeeInfo.jsx'))
const EmployeeInfoProvider = lazy(() => import('./pages/admin/EmployeeInfoProvider.jsx'))

// Router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomeRedirect />} />
      <Route element={<PreventLoginAcess />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route element={<Home />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/id/:TaskId" element={<TaskFullPage />} />
          <Route path="/allTask" element={<AllTask />} />
          <Route path="/completedTask" element={<CompletedTask />} />
          <Route path="/newTask" element={<NewTask />} />
          <Route path="/acceptedTask" element={<AcceptedTask />} />
          <Route path="/rejectedTask" element={<RejectedTask />} />
          <Route path="/task" element={<Task />} />
        </Route>
      </Route>
      <Route element={<ProtectedLayout adminOnly={true} />}>
        <Route element={<Home />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<AllEmployee />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/editTask/:taskId" element={<EditTask />} />
          <Route path='/employeeInfo' element={<EmployeeInfo/>} />
          <Route path="/editEmployee/:employeeId" element={<EmployeeInfoProvider/>} />
        </Route>
      </Route>
    </Route>
  )
)

// App entry point
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
)
