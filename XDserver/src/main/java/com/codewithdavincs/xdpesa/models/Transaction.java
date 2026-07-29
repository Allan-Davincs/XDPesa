package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

// Inaashiria kuwa hii class ni Entity inayowakilisha table kwenye database
@Entity
// Inaweka jina la table kwenye database kuwa "transactions"
@Table(name = "transactions")
public class Transaction {

    // Inaweka hii field kuwa Primary Key ya table
    @Id
    // Inafanya ID iongezeke moja kwa moja kwa kila muamala mpya (Auto Increment)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    // Kiasi cha fedha kilichohusika kwenye muamala
    private double amount;

    // Tarehe na muda sahihi muamala ulipofanyika
    private LocalDateTime timestamp;

    // Hali ya muamala (k.mf. SUCCESS, PENDING, au FAILED)
    private String status;

    // Uhusiano wa Wengi-kwa-Mmoja: Miamala mingi inaweza kuhusishwa na ombi moja la mkopo (LoanApplication)
    @ManyToOne
    private LoanApplication loan;

    // --- GETTERS NA SETTERS ZA TRANSACTION ---

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
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LoanApplication getLoan() {
        return loan;
    }

    public void setLoan(LoanApplication loan) {
        this.loan = loan;
    }
}