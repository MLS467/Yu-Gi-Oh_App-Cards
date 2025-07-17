import { SignUpContext } from "@/context/SignUpContext/SignUpContext";
import { useContext } from "react";

export const useSignUp = () => {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error("UseCrud must be used within a CrudProvider");
  }

  return context;
};
