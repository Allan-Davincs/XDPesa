package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.*;

@Entity
@Table(name ="notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String message;
    private String recipientPhone;

    //setters and Getters

    public Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getMessage(){
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipientPhone() {
        return recipientPhone;
    }

    public void setRecipientPhone(String phone) {
        this.recipientPhone = phone;
    }

}
