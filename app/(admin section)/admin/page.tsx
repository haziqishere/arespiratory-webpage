import { Button } from "@/components/ui/button";
import react from "react";

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <div className="">
      <h1>Admin Page</h1>

      <Button>
        <a href="/admin/add-item">Add New Item</a>
      </Button>
    </div>
  );
};

export default AdminPage;
