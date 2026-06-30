package com.codewithdavincs.xdpesa.repositories;

import com.codewithdavincs.xdpesa.models.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<LoanApplication ,Long> {

}
