import React, { useState } from "react";
import api from "../api/axiosInstance";
import type { LoanApplication } from "../types";

interface LoanFormProps {
    onLoanCreated: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onLoanCreated }) => {
    const [customerName, setCustomerName] = useState("");
    const [amount, setAmount] = useState(0);
    const [purpose, setPurpose] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customerName || !amount || !purpose) {
            alert("Please fill in all fields");
            return;
        }

        const loanApplication: LoanApplication = {
            customerName,
            amount: parseFloat(String(amount)),
            purpose,
        };

        try {
            setLoading(true);
            await api.post("/loan/apply", loanApplication);
            alert("Loan application submitted successfully");
            setCustomerName("");
            setAmount(0);
            setPurpose("");
            onLoanCreated();
        } catch (error) {
            console.error("Error submitting loan application:", error);
            alert("Failed to submit loan application");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Loan Application Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount || ""}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="border-2 border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                    type="text"
                    placeholder="Purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2 mb-2"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
