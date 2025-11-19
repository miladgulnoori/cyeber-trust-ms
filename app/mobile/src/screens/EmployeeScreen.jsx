import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useForm } from "react-hook-form";
import { employeeSchema } from "../data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeApi } from "../api/employeeApi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../../components/input";
import Header from "../../components/header";

export default function EmployeeScreen() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
  });

  // Load employees
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => employeeApi.getAll().then((res) => res.data),
  });

  // Create
  const createMutation = useMutation({
    mutationFn: employeeApi.create,
    onSuccess: () => queryClient.invalidateQueries(["employees"]),
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => employeeApi.update(id, values),
    onSuccess: () => queryClient.invalidateQueries(["employees"]),
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: employeeApi.remove,
    onSuccess: () => queryClient.invalidateQueries(["employees"]),
  });

  const submit = (values) => {
    if (editing) {
      updateMutation.mutate({ id: editing._id, values });
      setEditing(null);
    } else {
      createMutation.mutate(values);
    }

    reset();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setValue("name", item.name);
    setValue("position", item.position);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Employee Management" />

      <View style={styles.container}>
        <Text style={styles.heading}>
          {editing ? "Edit Employee" : "Add Employee"}
        </Text>

        <Input
          label="Name"
          onChangeText={(t) => setValue("name", t)}
          error={errors?.name?.message}
        />

        <Input
          label="Position"
          onChangeText={(t) => setValue("position", t)}
          error={errors?.position?.message}
        />

        <Button title="Save" onPress={handleSubmit(submit)} />

        <Text style={styles.listTitle}>Employees</Text>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>
                  {item.name} — {item.position}
                </Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Text style={{ color: "blue" }}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deleteMutation.mutate(item._id)}
                  >
                    <Text style={{ color: "red" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  listTitle: { fontSize: 18, marginTop: 20, fontWeight: "600" },
  item: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
