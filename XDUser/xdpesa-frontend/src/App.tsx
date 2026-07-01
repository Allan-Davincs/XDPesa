import { useState } from "react";
import LoanForm from "./components/LoanForm";
import "./App.css";

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleLoanCreated = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <main key={refreshKey}>
            <LoanForm onLoanCreated={handleLoanCreated} />
        </main>
    );
}

export default App;
