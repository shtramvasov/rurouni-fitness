import { useState } from "react";
import { toast } from "react-toastify";

export function useToastHandler(isError, error) {
  const [hasShown, setHasShown] = useState(false);

  if(isError && !hasShown) {
    setHasShown(true)
    toast.error(error.data.message)
  }
}