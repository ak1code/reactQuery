import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery, QueryClient, useMutation } from "react-query";
import ProductCart from "./ProductCart";
import { ReactQueryDevtools } from "react-query/devtools";

const getData = async () => {
  let res = await axios.get(
    "https://electronix-express-api.onrender.com/products"
  );
  return res.data;
};

let count = 0;

const Product = () => {
  const queryClient = new QueryClient();

  const { isLoading, error, data, refetch } = useQuery("product", getData, {
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post(
        "https://electronix-express-api.onrender.com/products",
        newTodo
      );
    },
    onSuccess: () => {
      refetch(); // Refetch data after successful mutation
    },
  });

  const addItem = () => {
    let obj = {
      title: "new",
      price: count++,
    };
    mutation.mutate(obj);
  };

  if (mutation.isLoading) {
    return <h1>Adding loading.....</h1>;
  }
  if (mutation.isError) {
    return <h1>Error: {mutation.error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  console.log(data); // This might not immediately reflect the updated data due to async nature

  return (
    <div>
      <div className="product">
        {data?.map((item) => (
          <ProductCart key={item.id} {...item} />
        ))}
        <ReactQueryDevtools initialIsOpen />
        <button onClick={addItem}>Add Product</button>
      </div>
    </div>
  );
};

export default Product;
