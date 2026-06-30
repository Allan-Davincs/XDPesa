package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name ="transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private  Long transactionId;
    private double amount;
    private LocalDateTime timestamp;
    private String Status;

    @ManyToOne

    private LoanApplication loan;

    //Stters and Getters For Transcations


    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public LoanApplication getLoan() {
        return loan;
    }

    public void setLoan(LoanApplication loan) {
        this.loan = loan;
    }

}
