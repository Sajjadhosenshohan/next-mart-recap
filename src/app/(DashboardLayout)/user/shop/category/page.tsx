import ManageCategories from "@/components/modules/category";
import { getCategories } from "@/services/category";
import React from "react";

const ProductCategoryPage = async () => {
  const { data, meta } = await getCategories();
  return (
    <div>
      <ManageCategories categories={data} meta={meta}/>
    </div>
  );
};

export default ProductCategoryPage;
