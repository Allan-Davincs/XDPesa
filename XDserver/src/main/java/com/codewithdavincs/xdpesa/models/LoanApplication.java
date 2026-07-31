package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.*;

// Inaifanya hii class kuwa Entity inayowakilisha table kwenye database
@Entity
// Inaweka jina la table kwenye database kuwa "loans"
@Table(name = "loans")
public class LoanApplication {

    // Inaweka hii field kuwa Primary Key ya table
    @Id
    // Inafanya ID iongezeke moja kwa moja kwa kila record mpya (Auto Increment)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long laonId;

    private String customerName;
    private double amount;
    private String purpose;
    private double interestRate;
    private int durationMonths;

    // Hali ya mkopo: PENDING (Inasubiri), APPROVED (Imekubaliwa), au REJECTED (Imekataliwa)
    private String status;

    // Uhusiano wa Wengi-kwa-Mmoja: Mikopo mingi inaweza kumilikiwa na Mteja mmoja (Customer)
    @ManyToOne
    // Inaweka Foreign Key column kwenye database yenye jina "customer_id"
    @JoinColumn(name = "customer_id")
    private Customer customer;

    // --- DHANNO YA METHOD OVERLOADING (POLYMORPHISM) ---

    /**
     * Njia ya 1: Inakokotoa na kuweka Riba ya Msingi (15%)
     */
    public void calculateInterest() {
        this.interestRate = 0.15;
    }

    /**
     * Njia ya 2: Inakokotoa riba kulingana na kiwango cha hatari (Risk Factor) cha mteja
     */
    public void calculateInterest(double riskFactor) {
        this.interestRate = 0.15 * (riskFactor * 0.05); // Riba iliyorekebishwa kwa hatari
    }

    // --- GETTERS NA SETTERS ZA LOAN APPLICATION ---

    public Long getLaonId() {
        return laonId;
    }

    public void setLaonId(Long laonId) {
        this.laonId = laonId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(int durationMonths) {
        this.durationMonths = durationMonths;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
