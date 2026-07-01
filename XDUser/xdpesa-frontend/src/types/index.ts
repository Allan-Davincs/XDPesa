export interface LoanApplication {
    id?: number;
    customerName: string;
    amount: number;
    purpose: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}
