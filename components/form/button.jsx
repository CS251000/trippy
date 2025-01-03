"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export const SubmitButton = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={`capitalize ${props.className || ""}`}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        props.text || "submit"
      )}
    </Button>
  );
};
