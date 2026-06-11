export default function Footer() {
    return (
        <footer style={{ marginTop: "auto", textAlign: "center", padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#333",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "14px"
                }}>
                    AAN
                </div>
                <span>&copy; {new Date().getFullYear()} AAN. All rights reserved.</span>
            </div>
        </footer>
    );
}
