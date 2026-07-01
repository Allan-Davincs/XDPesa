import React,{useState} from "react";
import api from "../api/axiosInstance";
import { LoanApplication } from "../types";

interface LoanFormProps {
    onLoanCrated : () => void;  
}

const LoanForm : React.FC<LoanFormProps> = ({onLoanCrated}) => {
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState(0);
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!customerName || !amount || !purpose) {
            return alert('Please fill in all fields');

            setLoading(false);
            const loanApplication: LoanApplication = {
                CustomerName,
                amount, parseFlaoat(amount),
                purpose,
            };


            try {
                setLoading(true);
                await api.post('/loan/apply' , newLoan);
                alert('Loan application submitted successfully');
                setCustomerName('');
                setAmount(0);
                setPurpose('');
                onLoanCrated();

            }
            catch (error) {
                console.error('Error submitting loan application:', error);
                alert('Failed to submit loan application');
            }
            finally {
                setLoading(false);
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Loan Application Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 mb-2" />
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} className="border-2 border-gray-300 rounded-md p-2 mb-2" />
                <input type="text" placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="border-2 border-gray-300 rounded-md p-2 mb-2" />
                <button type="submit" disabled={loading} className="bg-blue-500 text-white rounded-md p-2">
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
