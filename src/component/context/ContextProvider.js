import React, { createContext, useState } from "react";

export const addData = createContext("");
export const updateData = createContext("");
export const DeleteData = createContext("");

export default function ContextProvider({ children }) {
  const [Udata, setUdata] = useState("");
  const [update, setUPdata] = useState("");
  const [Delete, setDelete] = useState("");
  return (
    <addData.Provider value={{ Udata, setUdata }}>
      <updateData.Provider value={{ update, setUPdata }}>
        <DeleteData.Provider value={{Delete,setDelete}}>
        {children}
        </DeleteData.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
}
