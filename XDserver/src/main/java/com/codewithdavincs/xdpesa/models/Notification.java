package com.codewithdavincs.xdpesa.models;

import jakarta.persistence.*;

// Inaashiria kuwa hii class ni Entity inayowakilisha table kwenye database
@Entity
// Inaweka jina la table kwenye database kuwa "notification"
@Table(name = "notification")
public class Notification {

    // Inaweka hii field kuwa Primary Key ya table
    @Id
    // Inafanya ID iongezeke moja kwa moja kwa kila taarifa mpya (Auto Increment)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ujumbe wa taarifa unaotumwa kwa mteja (k.mf. SMS au App notification)
    private String message;

    // Namba ya simu ya mpokeaji wa taarifa hiyo
    private String recipientPhone;

    // --- GETTERS NA SETTERS ZA NOTIFICATION ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
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