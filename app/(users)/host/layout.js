"use client";
import { usePathname } from "next/navigation";
import HostNavbar from "@/components/HostNavbar";
import TravellerNavbar from "@/components/TravellerNavbar";

const HostLayout = ({ children }) => {
  const pathname = usePathname();

  // Render HostNavbar only for non-dashboard routes
  const shouldShowNavbar = !pathname.includes("/host-trip-form");

  return (
    <>
      {shouldShowNavbar?<HostNavbar/>:<TravellerNavbar/>}
      <div>{children}</div>
    </>
  );
};

export default HostLayout;
