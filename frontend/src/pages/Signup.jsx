import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Alert from "../components/Alert.jsx";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/signup", form);
            login(res.data.token, res.data.user);
            navigate("/stores");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "460px" }}>
            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h4 className="text-center mb-3">
                        <i className="fa-solid fa-user-plus me-2"></i>Create Account
                    </h4>
                    <Alert message={error} />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="name" required
                                minLength={20} maxLength={60}
                                value={form.name} onChange={handleChange} />
                            <div className="form-text">20-60 characters ({form.name.length}/60)</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" required
                                value={form.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea className="form-control" name="address" required
                                maxLength={400} rows={2}
                                value={form.address} onChange={handleChange}></textarea>
                            <div className="form-text">Max 400 characters</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" required
                                value={form.password} onChange={handleChange} />
                            <div className="form-text">8-16 characters, at least 1 uppercase letter & 1 special character</div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </form>
                    <p className="text-center mt-3 mb-0">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
