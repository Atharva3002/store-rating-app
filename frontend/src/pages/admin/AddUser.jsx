import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import Alert from "../../components/Alert.jsx";

export default function AdminAddUser() {
    const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await api.post("/admin/users", form);
            setSuccess("User added successfully");
            setTimeout(() => navigate("/admin/users"), 800);
        } catch (err) {
            setError(err.response?.data?.message || "Could not add user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: "460px" }}>
            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h4 className="mb-3"><i className="fa-solid fa-user-plus me-2"></i>Add New User</h4>
                    <Alert message={error} />
                    <Alert type="success" message={success} />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" required
                                minLength={20} maxLength={60}
                                value={form.name} onChange={handleChange} />
                            <div className="form-text">20-60 characters</div>
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
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" required
                                value={form.password} onChange={handleChange} />
                            <div className="form-text">8-16 characters, at least 1 uppercase letter & 1 special character</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                                <option value="user">Normal User</option>
                                <option value="admin">System Administrator</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                            {loading ? "Adding..." : "Add User"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
