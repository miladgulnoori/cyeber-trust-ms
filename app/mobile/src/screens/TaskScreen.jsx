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
import { taskSchema } from "../data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskApi } from "../api/taskApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/header";
import Input from "../../components/input";

export default function TaskScreen() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskApi.getAll().then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => taskApi.update(id, values),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const deleteMutation = useMutation({
    mutationFn: taskApi.remove,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
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
      <Header title="Tasks" />

      <View style={styles.container}>
        <Text style={styles.heading}>{editing ? "Edit Task" : "Add Task"}</Text>

        <Input
          label="Task Title"
          onChangeText={(t) => setValue("title", t)}
          error={errors?.title?.message}
        />

        <Button title="Save" onPress={handleSubmit(submit)} />

        <Text style={styles.listTitle}>Tasks</Text>

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
