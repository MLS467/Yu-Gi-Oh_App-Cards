import { CrudContext } from "@/context/Crud/CrudContext";
import { useContext } from "react";

export const UseCrud = () => {
  const context = useContext(CrudContext);

  if (!context) {
    throw new Error("UseCrud must be used within a CrudProvider");
  }

  return context;
};
