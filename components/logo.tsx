import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src="/image/Horizontal Logo (Full Color).svg"
          alt="Taskify Logo"
          width={200}
          height={200}
        />
      </div>
    </Link>
  );
};
