package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer extends User {
    private String nationalId;
    private double creditscore;

    //get the national id

    public String getNationalId(){
        return nationalId;
    }

    //setter for the national ID

    public void setNationalId(String nationalId){
        this.nationalId = nationalId;
    }

    //getter for the creditScore

    public double getCreditscore(){
        return creditscore;
    }

    //setter for the creditStore
    public void setCreditscore(double creditscore) {
        this.creditscore = creditscore;
    }
}
