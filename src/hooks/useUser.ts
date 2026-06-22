import { useContext } from "react";
import { UserCtx } from "./UserContext.ts";

export const useUser = () => useContext(UserCtx);
