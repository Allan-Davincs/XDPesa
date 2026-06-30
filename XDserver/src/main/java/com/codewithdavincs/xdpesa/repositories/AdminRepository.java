package com.codewithdavincs.xdpesa.repositories;

import com.codewithdavincs.xdpesa.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Long> {

Optional<Admin>findByPhoneNumber(String phoneNumber);
}
