import React from "react";
import { Button } from "../components/ui/button";
// import { AppSidebar } from "../components/AppSidebar";

export default function Home() {
  return (
    <>
      {/* <AppSidebar /> */}
      <div className="min-h-screen flex flex-col itmes-center justify-center space-y-4">
        <h1 className="text-3x1 ">Welcome to CTMS</h1>
        <p className="text-center max-w-md">
          This is the Landing page. Click to log in or go to the deshboard.
        </p>

        <Button onClick={() => alert("Clicked")}>Get Started </Button>
      </div>
    </>
  );
}
