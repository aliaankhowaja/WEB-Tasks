"use client";

import { loginUser } from "../actions/auth";
import Footer from "../components/Footer";

export default function LoginPage() {
    const handleSubmit = async (formData: FormData) => {
        try {
            await loginUser(formData);
        } catch (error: any) {
            if (error.message === "NEXT_REDIRECT" || (error.digest && error.digest.startsWith("NEXT_REDIRECT"))) {
                throw error;
            }
            alert(error.message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div className="form-container" style={{ flex: 1 }}>

                <form action={handleSubmit} className="action-form">
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                    <div className="other-action-row">
                        <p>Don't have an account?</p>
                        <p><a href="/signup">Sign up</a></p>
                    </div>

                </form>
            </div>
            <Footer />
        </div>
    )
}