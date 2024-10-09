import React from "react";
import ItemForm from "./_components/productform";

type Props = {};

const AddItemPage = (props: Props) => {
  return (
    <div className="flex flex-1 items-start">
      <div className=""></div>
      <ItemForm />
    </div>
  );
};

export default AddItemPage;
