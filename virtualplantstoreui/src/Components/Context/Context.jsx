import { createContext, useContext } from "react";

const Context = createContext();

export const CustomContext = () => useContext(Context);

export default function AuthContext({ children }) {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}
