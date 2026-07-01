export interface LoanApplication {
    id?:number;
    CustomerName:string;
    amount:number;
    purpose:string;
    status?:'PENDING'|'APPROVED'|'REJECTED';
}
