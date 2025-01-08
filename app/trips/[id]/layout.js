
import { Suspense } from "react";
import LoadingDetails from "./loading";

export default function TripDetailsLayout({ children }) {
  return (
    <Suspense fallback={<LoadingDetails/>}>
      {children}
    </Suspense>
  );
}

