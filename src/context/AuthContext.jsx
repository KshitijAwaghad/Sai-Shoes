import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "saishoes_auth";
const USERS_STORAGE_KEY = "saishoes_users";

const readUsers = () => {
  const saved = localStorage.getItem(USERS_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveUsers = (users) => localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const persistUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const loginUser = (email, password) => {
    if (!email || !password) return { ok: false, message: "Email and password are required." };
    const users = readUsers();
    const account = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!account) return { ok: false, message: "No account found. Please create an account." };
    if (account.password !== password) return { ok: false, message: "Incorrect password." };

    const nextUser = {
      name: account.name,
      email,
      role: "user",
      loggedAt: new Date().toISOString(),
    };
    persistUser(nextUser);
    return { ok: true, user: nextUser };
  };

  const registerUser = (name, email, password) => {
    if (!name || !email || !password) return { ok: false, message: "All fields are required." };

    const users = readUsers();
    const exists = users.some((item) => item.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, message: "Account already exists. Please login." };

    const nextAccount = { name, email, password, role: "user", createdAt: new Date().toISOString() };
    saveUsers([...users, nextAccount]);

    const nextUser = { name, email, role: "user", loggedAt: new Date().toISOString() };
    persistUser(nextUser);
    return { ok: true, user: nextUser };
  };

  const loginAdmin = (email, password) => {
    if (email !== "admin@saishoes.com" || password !== "admin123") {
      return { ok: false, message: "Invalid admin credentials." };
    }
    const nextUser = {
      name: "Sai Admin",
      email,
      role: "admin",
      loggedAt: new Date().toISOString(),
    };
    persistUser(nextUser);
    return { ok: true, user: nextUser };
  };

  const logout = () => persistUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginUser,
      registerUser,
      loginAdmin,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
