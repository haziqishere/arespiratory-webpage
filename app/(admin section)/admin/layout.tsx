import Sidebar from "../_components/adminSidebar";
import { Toaster } from "@/components/ui/sonner";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <Toaster richColors position="bottom-center" />
        <div className="w-64 shrink-0 hidden md:block">
          {/*Side bar*/}
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
