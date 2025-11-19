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
import { costTrackingSchema } from "../data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { costTrackingApi } from "../api/costTrackingApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/header";
import Input from "../../components/input";

export default function CostTrackingScreen() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(costTrackingSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["costTracking"],
    queryFn: () => costTrackingApi.getAll().then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: costTrackingApi.create,
    onSuccess: () => queryClient.invalidateQueries(["costTracking"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => costTrackingApi.update(id, values),
    onSuccess: () => queryClient.invalidateQueries(["costTracking"]),
  });

  const deleteMutation = useMutation({
    mutationFn: costTrackingApi.remove,
    onSuccess: () => queryClient.invalidateQueries(["costTracking"]),
  });

  const submit = (values) => {
    if (editing) updateMutation.mutate({ id: editing._id, values });
    else createMutation.mutate(values);

    setEditing(null);
    reset();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setValue("title", item.title);
    setValue("cost", item.cost);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Cost Tracking" />

      <View style={styles.container}>
        <Text style={styles.heading}>{editing ? "Edit Cost" : "Add Cost"}</Text>

        <Input
          label="Title"
          onChangeText={(t) => setValue("title", t)}
          error={errors?.title?.message}
        />

        <Input
          label="Cost (AFN)"
          onChangeText={(t) => setValue("cost", t)}
          error={errors?.cost?.message}
        />

        <Button title="Save" onPress={handleSubmit(submit)} />

        <Text style={styles.listTitle}>Cost Records</Text>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>
                  {item.title} — {item.cost} AFN
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
