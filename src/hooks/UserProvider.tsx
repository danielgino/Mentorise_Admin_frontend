import { type ReactNode, useEffect, useState } from "react";
import { meApi, type MeDto } from "../api/MeApi.tsx";
import WebsiteLoader from "../assets/loaders/WebsiteLoader.tsx";
import { UserCtx } from "./UserContext.ts";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MeDto | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        setUser(null);
        setLoadingUser(false);
    };

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setLoadingUser(false);
            return;
        }

        try {
            const me = await meApi();
            setUser(me);
            localStorage.setItem("fullName", me.fullName);
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("fullName");
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    if (loadingUser) {
        return <WebsiteLoader />;
    }

    return (
        <UserCtx.Provider
            value={{
                user,
                loadingUser,
                isAuthenticated: !!user,
                fetchUserDetails,
                setUser,
                logout,
            }}
        >
            {children}
        </UserCtx.Provider>
    );
}
