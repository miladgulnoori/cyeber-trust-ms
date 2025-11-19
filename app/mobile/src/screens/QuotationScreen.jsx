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
import { quotationSchema } from "../data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { quotationApi } from "../api/quotationApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/header";
import Input from "../../components/input";

export default function QuotationScreen() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quotationSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["quotations"],
    queryFn: () => quotationApi.getAll().then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: quotationApi.create,
    onSuccess: () => queryClient.invalidateQueries(["quotations"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => quotationApi.update(id, values),
    onSuccess: () => queryClient.invalidateQueries(["quotations"]),
  });

  const deleteMutation = useMutation({
    mutationFn: quotationApi.remove,
    onSuccess: () => queryClient.invalidateQueries(["quotations"]),
  });

  const submit = (values) => {
    if (editing) updateMutation.mutate({ id: editing._id, values });
    else createMutation.mutate(values);

    setEditing(null);
    reset();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setValue("amount", item.amount);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Quotations" />

      <View style={styles.container}>
        <Text style={styles.heading}>
          {editing ? "Edit Quotation" : "Add Quotation"}
        </Text>

        <Input
          label="Amount (AFN)"
          onChangeText={(t) => setValue("amount", t)}
          error={errors?.amount?.message}
        />

        <Button title="Save" onPress={handleSubmit(submit)} />

        <Text style={styles.listTitle}>Quotations</Text>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.amount} AFN</Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Text color="blue">Edit</Text>
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
