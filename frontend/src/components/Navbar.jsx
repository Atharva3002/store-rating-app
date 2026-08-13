import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const roleLinks = {
    admin: [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/stores", label: "Stores" },
        { to: "/admin/users", label: "Users" }
    ],
    user: [
        { to: "/stores", label: "Stores" },
        { to: "/update-password", label: "Update Password" }
    ],
    store_owner: [
        { to: "/store-owner/dashboard", label: "Dashboard" },
        { to: "/update-password", label: "Update Password" }
    ]
};

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const links = user ? roleLinks[user.role] || [] : [];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="fa-solid fa-store"></i>
                    Store Rating
                </Link>
                {user && (
                    <div className="collapse navbar-collapse show">
                        <ul className="navbar-nav me-auto">
                            {links.map((link) => (
                                <li className="nav-item" key={link.to}>
                                    <Link className="nav-link" to={link.to}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <span className="navbar-text text-light me-3">
                            <i className="fa-solid fa-user me-1"></i>
                            {user.name} <span className="badge bg-secondary ms-1">{user.role.replace("_", " ")}</span>
                        </span>
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket me-1"></i>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
