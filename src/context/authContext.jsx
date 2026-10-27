import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getUsers() { //get existing users if they are any
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
}


function getCurrentUser() {
    const currentUserId = localStorage.getItem("currentUserId");
    if (!currentUserId) return null;

    const users = getUsers();
    const user = users.find((savedUser) => savedUser.id === currentUserId);

    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email };
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(getCurrentUser);

    function signup(name, email, password) {
        const users = getUsers();
        const existingEmail = users.some((savedUser) => savedUser.email === email); //check if the user email entered already exist

        if (existingEmail) {
            return { success: false, error: "Email already exists" };
        }

        const newUser = { id: crypto.randomUUID(), name, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserId", newUser.id);

        setUser({ id: newUser.id, name, email });
        return { success: true };
    }

    function login(email, password) {
        const users = getUsers();
        const matchingUser = users.find((savedUser) => savedUser.email === email);

        if (!matchingUser || matchingUser.password !== password) {
            return { success: false, error: "Invalid email or password" };
        }

        localStorage.setItem("currentUserId", matchingUser.id);
        setUser({ id: matchingUser.id, name: matchingUser.name, email: matchingUser.email });
        return { success: true };
    }

    function resetPassword(email, password) {
        const users = getUsers();
        const matchingUser = users.find((savedUser) => savedUser.email === email);

        if (!matchingUser) {
            return { success: false, error: "No account found with that email" };
        }

        matchingUser.password = password;
        localStorage.setItem("users", JSON.stringify(users));
        return { success: true };
    }

    function logout() {
        localStorage.removeItem("currentUserId");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signup, user, logout, login, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
