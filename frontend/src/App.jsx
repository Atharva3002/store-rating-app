import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";

import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminStoresList from "./pages/admin/StoresList.jsx";
import AdminUsersList from "./pages/admin/UsersList.jsx";
import AdminAddUser from "./pages/admin/AddUser.jsx";
import AdminAddStore from "./pages/admin/AddStore.jsx";
import AdminUserDetails from "./pages/admin/UserDetails.jsx";

import UserStoresList from "./pages/user/StoresList.jsx";

import StoreOwnerDashboard from "./pages/storeOwner/Dashboard.jsx";

function Home() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "store_owner") return <Navigate to="/store-owner/dashboard" replace />;
    return <Navigate to="/stores" replace />;
}

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/update-password" element={
                    <PrivateRoute><UpdatePassword /></PrivateRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin/dashboard" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminDashboard /></PrivateRoute>
                } />
                <Route path="/admin/stores" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminStoresList /></PrivateRoute>
                } />
                <Route path="/admin/stores/add" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminAddStore /></PrivateRoute>
                } />
                <Route path="/admin/users" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminUsersList /></PrivateRoute>
                } />
                <Route path="/admin/users/add" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminAddUser /></PrivateRoute>
                } />
                <Route path="/admin/users/:id" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminUserDetails /></PrivateRoute>
                } />

                {/* Normal user routes */}
                <Route path="/stores" element={
                    <PrivateRoute allowedRoles={["user"]}><UserStoresList /></PrivateRoute>
                } />

                {/* Store owner routes */}
                <Route path="/store-owner/dashboard" element={
                    <PrivateRoute allowedRoles={["store_owner"]}><StoreOwnerDashboard /></PrivateRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}
