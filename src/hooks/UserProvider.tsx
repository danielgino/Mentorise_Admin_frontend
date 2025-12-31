// src/context/UserProvider.tsx
import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {meApi, type MeDto} from "../api/MeApi.tsx";
import WebsiteLoader from "../assets/loaders/WebsiteLoader.tsx";

type Ctx = {
    user: MeDto | null;
    loadingUser: boolean;
    isAuthenticated: boolean;
    fetchUserDetails: () => Promise<void>;
    setUser: (u: MeDto | null) => void;
};

const UserCtx = createContext<Ctx>(null as any);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MeDto | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");
        if (!token) { setUser(null); setLoadingUser(false); return; }
        try {
            const me = await meApi();
            setUser(me);
            localStorage.setItem("fullName", me.fullName);
        } catch {
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => { fetchUserDetails(); }, []);
    if (loadingUser) {
        return (
       <>
       <WebsiteLoader/>
       </>
        );
    }
    return (
        <UserCtx.Provider value={{ user, loadingUser, isAuthenticated: !!user, fetchUserDetails, setUser }}>
            {children}
        </UserCtx.Provider>
    );
}

export const useUser = () => useContext(UserCtx);
