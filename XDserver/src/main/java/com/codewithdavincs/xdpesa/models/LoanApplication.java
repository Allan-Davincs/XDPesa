package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.*;

@Entity
@Table(name ="loans")
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long laonId;
    private double amount;
    private double interestRate;
    private int durationMonths;
    private String status;

    //PENDING  APROVED  REJECETED

    @ManyToOne
    @JoinColumn(name ="customer_id")
    private Customer customer;
    //method Overloading (polymorphism)

    public void calculateInterest(){
    this.interestRate = 0.15;
}
public void calculateInterest(double riskFactor){
    this.interestRate = 0.15 * (riskFactor*0.05); // Risky adjusted interest
}

//getters and setters Loan Application

    public Long getLaonId(){
            return laonId;
    }

    public void setLaonId(Long laonId) {
            this.laonId = laonId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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

    public Customer getCustomer(){
      return  customer;
    }

    public void setCustomer(Customer customer) {
    this.customer = customer;
}

}
