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
import { departmentSchema } from "../data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentApi } from "../api/departmentApi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/header";
import Input from "../../components/input";

export default function DepartmentScreen() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
  });

  // Load
  const { data, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAll().then((res) => res.data),
  });

  // Create
  const createMutation = useMutation({
    mutationFn: departmentApi.create,
    onSuccess: () => queryClient.invalidateQueries(["departments"]),
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => departmentApi.update(id, values),
    onSuccess: () => queryClient.invalidateQueries(["departments"]),
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: departmentApi.remove,
    onSuccess: () => queryClient.invalidateQueries(["departments"]),
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
    setValue("title", item.title);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Departments" />

      <View style={styles.container}>
        <Text style={styles.heading}>
          {editing ? "Edit Department" : "Add Department"}
        </Text>

        <Input
          label="Department Title"
          onChangeText={(t) => setValue("title", t)}
          error={errors?.title?.message}
        />

        <Button title="Save" onPress={handleSubmit(submit)} />

        <Text style={styles.listTitle}>Departments</Text>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.title}</Text>

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
