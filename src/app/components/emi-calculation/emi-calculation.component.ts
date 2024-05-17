import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GetUserDetailEmiCalculatorService } from '../../services/get-user-detail-emi-calculator.service';
import { Loan } from '../../models/loan';

@Component({
  selector: 'app-emi-calculation',
  templateUrl: './emi-calculation.component.html',
  styleUrls: ['./emi-calculation.component.css']
})
export class EmiCalculationComponent {
  @ViewChild('inputModal') inputModal: any; // Add this line to get a reference to the modal


  modalRef!: NgbModalRef;
  loans: Loan[] = [];
  loanDetails: any[] = [];
  tiles: any[] = [];
  newLoan: any = { loanType: '', loanAmount: 0, interestRate: 0, loanTenure: 0 };


  constructor(private emiCalculatorService: GetUserDetailEmiCalculatorService, private modalService: NgbModal) {}

  ngOnInit(): void {
    // Initialize component
    this.getLoanDetailByUserId(23);
  }



  openModal() {
    this.modalService.open(this.inputModal);
  }

  addLoan() {
    const colors = ['#FF6B6B', '#48dbfb', '#1dd1a1', '#feca57', '#ff9f43', '#5f27cd'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newloanData = {
      id: 35,
      userId: 23,
      loanType: this.newLoan.loanType,
      loanAmount: this.newLoan.loanAmount, // Example loan amount
      interestRate: this.newLoan.interestRate, // Example interest rate
      loanTermMonths: this.newLoan.loanTenure, // Example loan term in months
      tileColor: randomColor,
      createdAt: new Date().toISOString()
    };

    this.emiCalculatorService.createLoan(newloanData).subscribe({
      next: (res) => {
        console.log('Loan created successfully:', res);
        this.getLoanDetailByUserId(23);
        this.newLoan= { loanType: '', loanAmount: 0, interestRate: 0, loanTenure: 0 };

        
      },
      error: (e) => console.error(e)
    });


    // const tile = {
      
    //   loanType: this.newLoan.loanType,
    //   loanAmount: this.newLoan.loanAmount,
    //   interestRate: this.newLoan.interestRate,
    //   loanTenure: this.newLoan.loanTenure
    // };
    // this.tiles.push(tile);
    
    this.modalService.dismissAll();
    

  }

  getLoanDetailByUserId(userId: number) {
    // Fetch loan details by user ID
    this.emiCalculatorService.getLoanDetailByUserId(userId).subscribe({
      next: (data) => {
        this.loans = data;
      },
      error: (e) => console.error(e)
    });
  }

  // createLoan(): void {
  //   // Create a new loan
  //   const loanData = {
  //     id: 35,
  //     userId: 23,
  //     loanAmount: 1000, // Example loan amount
  //     interestRate: 5, // Example interest rate
  //     loanTermMonths: 12, // Example loan term in months
  //     createdAt: new Date().toISOString()
  //   };

  //   this.emiCalculatorService.createLoan(loanData).subscribe({
  //     next: (res) => {
  //       console.log('Loan created successfully:', res);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }
}
