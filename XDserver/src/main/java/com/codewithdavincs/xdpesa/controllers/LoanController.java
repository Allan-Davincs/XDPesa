package com.codewithdavincs.xdpesa.controllers;

import com.codewithdavincs.xdpesa.models.LoanApplication;
import com.codewithdavincs.xdpesa.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "*")
public class LoanController {
    @Autowired
    private LoanRepository loanRepository;

    //1.CREATE Kuomba Mkopoo
    @PostMapping("/apply")
    public ResponseEntity<LoanApplication> applyForLoan(@RequestBody LoanApplication loan) {
        loan.setStatus("PENDING");
        loan.calculateInterest(); //weka Riba ya Msingi
        LoanApplication savedLoan = loanRepository.save(loan);
        return ResponseEntity.ok(savedLoan);
    }

    // 2 Kuona Miopo yote
    @GetMapping("/all")
    public List<LoanApplication> getAllLoans() {
        return loanRepository.findAll();
    }

    // READ ONE Kuona Mkopo MmOja KWa ID
    @GetMapping("/{id}")
    public ResponseEntity<LoanApplication> getLoanById(@PathVariable Long id) {
        return loanRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 2b. Kuona Miopo kwa Customer ID
    @GetMapping("/user/{userId}")
    public List<LoanApplication> getLoansByUserId(@PathVariable Long userId) {
        return loanRepository.findByCustomerId(userId);
    }

    // 4 .UPDATE taarifa za Mkopo au Kuidhhnisha (Approve)
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateLoanStatus(@PathVariable Long id, @RequestParam String status) {
        return loanRepository.findById(id).map(loan -> {
            loan.setStatus(status);
            loanRepository.save(loan);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Hali ya Mkopo imebadilishwa kuwa " + status);
            response.put("loan", loan);
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }

    //5.DELETE Kufuta Ombi la Mkopo
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLoan(@PathVariable Long id) {
        if (loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
            return ResponseEntity.ok("Ombi la Mkopo limefutwa");
        }
        return ResponseEntity.notFound().build();
    }
}
