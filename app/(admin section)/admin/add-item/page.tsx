import React from "react";
import ItemForm from "./_components/itemform";

type Props = {};

const AddItemPage = (props: Props) => {
  return (
    <div className="flex flex-row items-start max-w-l px-8 mx-auto my-10 sm:px-0">
      <h1>Add Item Page</h1>
      <ItemForm />
    </div>
  );
};

export default AddItemPage;
