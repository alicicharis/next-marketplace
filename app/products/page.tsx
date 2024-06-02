import Product from "@/components/Product";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import React from "react";

const ProductsPage = async () => {
  const products = await fetchQuery(api.products.getProduct);

  return (
    <main className="flex justify-center items-center h-screen">
      {products.map((product) => (
        <Product key={product.tokenIdentifier} {...product} />
      ))}
    </main>
  );
};

export default ProductsPage;
