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

const Product = () => {
  const [products, setProducts] = useState([]);
  const queryClient = new QueryClient();

  const { isLoading, error, data } = useQuery("product", getData);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const addItem = async () => {
    let obj = {
      title: "new",
      price: 10,
    };
    try {
      let res = await axios.post(
        "https://electronix-express-api.onrender.com/products",
        obj
      );
      const newData = [...products, res.data];
      setProducts(newData);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  if (isLoading) {
    return <h1>loading.....</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <div className="product">
        {products.map((item) => (
          <ProductCart key={item.id} {...item} />
        ))}
        <ReactQueryDevtools initialIsOpen />

        <button onClick={addItem}>add Product</button>
      </div>
    </div>
  );
};

export default Product;
