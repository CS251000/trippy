
import { Suspense } from "react";
import LoadingDetails from "./loading";

export default function HostTripDetailsLayout({ children }) {
  return (
    <Suspense fallback={<LoadingDetails/>}>
      {children}
    </Suspense>
  );
}

