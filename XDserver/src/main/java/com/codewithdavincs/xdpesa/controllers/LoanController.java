package com.codewithdavincs.xdpesa.controllers;

import com.codewithdavincs.xdpesa.models.LoanApplication;
import com.codewithdavincs.xdpesa.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Inaashiria kuwa hii ni REST Controller inayohusika na API za mikopo
@RestController
// Inaweka njia kuu (prefix) ya maombi yote ya mikopo (/api/loan)
@RequestMapping("/api/loan")
// Inaruhusu maombi (requests) kutoka mfumo wowote wa mbele (Frontend/CORS)
@CrossOrigin(origins = "*")
public class LoanController {

    // Inaingiza dependency ya LoanRepository kwa ajili ya kuwasiliana na database
    @Autowired
    private LoanRepository loanRepository;

    /**
     * Endpoint ya kuomba mkopo mpya (/api/loan/apply)
     */
    @PostMapping("/apply")
    public ResponseEntity<LoanApplication> applyForLoan(@RequestBody LoanApplication loan) {
        // Weka hali ya awali ya mkopo kuwa PENDING (Inasubiri)
        loan.setStatus("PENDING");

        // Piga hesabu ya riba ya msingi kabla ya kuhifadhi
        loan.calculateInterest();

        // Hifadhi ombi la mkopo kwenye database
        LoanApplication savedLoan = loanRepository.save(loan);

        // Rudisha majibu ya ombi lililohifadhiwa (HTTP 200 OK)
        return ResponseEntity.ok(savedLoan);
    }

    /**
     * Endpoint ya kuona mikopo yote iliyopo kwenye mfumo (/api/loan/all)
     */
    @GetMapping("/all")
    public List<LoanApplication> getAllLoans() {
        // Leta orodha ya mikopo yote kutoka kwenye database
        return loanRepository.findAll();
    }

    /**
     * Endpoint ya kupata taarifa za mkopo mmoja kwa kutumia ID ya mkopo (/api/loan/{id})
     */
    @GetMapping("/{id}")
    public ResponseEntity<LoanApplication> getLoanById(@PathVariable Long id) {
        // Tafuta mkopo kwa ID; ikipatikana rudisha taarifa zake, isipopatikana rudisha 404 Not Found
        return loanRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Endpoint ya kuona orodha ya mikopo ya mteja kulingana na Customer ID yake (/api/loan/user/{userId})
     */
    @GetMapping("/user/{userId}")
    public List<LoanApplication> getLoansByUserId(@PathVariable Long userId) {
        // Tafuta na urudishe mikopo yote inayomilikiwa na mteja huyo
        return loanRepository.findByCustomerId(userId);
    }

    /**
     * Endpoint ya kubadilisha au kuidhinisha status ya mkopo (/api/loan/update/{id}?status=APPROVED)
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateLoanStatus(@PathVariable Long id, @RequestParam String status) {
        // Tafuta mkopo kwa ID, kisha badilisha status yake kama ukipatikana
        return loanRepository.findById(id).map(loan -> {
            loan.setStatus(status);
            loanRepository.save(loan); // Hifadhi mabadiliko

            // Tengeneza majibu ya kuonyesha ujumbe na taarifa mpya za mkopo
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Hali ya Mkopo imebadilishwa kuwa " + status);
            response.put("loan", loan);

            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build()); // Rudisha 404 kama mkopo haupo
    }

    /**
     * Endpoint ya kufuta ombi la mkopo kutoka kwenye database (/api/loan/delete/{id})
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLoan(@PathVariable Long id) {
        // Kagua kama mkopo upo kabla ya kuufuta
        if (loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
            return ResponseEntity.ok("Ombi la Mkopo limefutwa");
        }

        // Rudisha status ya 404 kama mkopo haupo
        return ResponseEntity.notFound().build();
    }
}