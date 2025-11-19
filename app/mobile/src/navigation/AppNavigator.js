import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmployeeScreen from "../screens/EmployeeScreen";
import DepartmentScreen from "../screens/DepartmentScreen";
import TaskScreen from "../screens/TaskScreen";
import ProjectScreen from "../screens/ProjectScreen";
import QuotationScreen from "../screens/QuotationScreen";
import CostTrackingScreen from "../screens/CostTrackingScreen";
import DashboardScreen from "../screens/DeshboardScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Employees" component={EmployeeScreen} />
        <Stack.Screen name="Departments" component={DepartmentScreen} />
        <Stack.Screen name="Tasks" component={TaskScreen} />
        <Stack.Screen name="Projects" component={ProjectScreen} />
        <Stack.Screen name="Quotations" component={QuotationScreen} />
        <Stack.Screen name="CostTracking" component={CostTrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
