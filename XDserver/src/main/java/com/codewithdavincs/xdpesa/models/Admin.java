package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Admin")
public class Admin extends User{
    private String departments;

    //getter for the admin


    public String getDepartments() {
        return departments;
    }

    //Stter for the Admin
    public void setDepartments(String departments) {
        this.departments = departments;
    }

}
