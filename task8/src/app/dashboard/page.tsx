import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutUser } from "../actions/auth";
import Footer from "../components/Footer";

export default async function DashboardPage() {
    const userCookie = (await cookies()).get("user");
    if (!userCookie) {
        redirect("/login");
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: 1 }}>
                <h1>Welcome, {userCookie.value}!</h1>
                <form action={logoutUser}>
                    <button type="submit">Logout</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}