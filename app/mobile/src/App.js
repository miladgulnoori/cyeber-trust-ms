import React from "react";
import QueryProvider from "./providers/QueryProvider";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <QueryProvider>
      <AppNavigator />
    </QueryProvider>
  );
}
