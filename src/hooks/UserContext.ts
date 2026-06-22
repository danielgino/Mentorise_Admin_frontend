import { createContext } from "react";
import type { MeDto } from "../api/MeApi.tsx";

export type UserCtxType = {
    user: MeDto | null;
    loadingUser: boolean;
    isAuthenticated: boolean;
    fetchUserDetails: () => Promise<void>;
    setUser: (u: MeDto | null) => void;
    logout: () => void;
};

export const UserCtx = createContext<UserCtxType>(null as unknown as UserCtxType);
