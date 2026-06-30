package com.codewithdavincs.xdpesa.repositories;

import com.codewithdavincs.xdpesa.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction , Long> {

}
