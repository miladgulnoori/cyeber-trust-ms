import "./App.css";
import { SignInForm } from "./pages/SignInForm";
import Employee from "./pages/Employee";
import { Home } from "./pages/Home.jsx";
import Department from "./pages/Department";
import Task from "./pages/Task";
import Project from "./pages/Project";
import CostTracking from "./pages/CostTracking";

function App() {
  return (
    <>
      <Home />
      <SignInForm />
      <Employee />
      <Department />
      <Task />
      <Project />
      <CostTracking />
    </>
  );
}

export default App;
