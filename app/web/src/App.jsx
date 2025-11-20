import { Outlet } from "react-router-dom";
import "./App.css";
import { AppSidebar } from "./components/AppSidebar";

function App() {
  return (
    <div className="flex">
      <AppSidebar />
      <Outlet />
    </div>
  );
}

export default App;
