import { Component } from '@angular/core';
import{ GetUserDetailEmiCalculatorService } from '../../services/get-user-detail-emi-calculator.service'

@Component({
  selector: 'app-emi-calculation',
  templateUrl: './emi-calculation.component.html',
  styleUrl: './emi-calculation.component.css'
})
export class EmiCalculationComponent {

   // Inject the EmiCalculatorService
   constructor(private emiCalculatorService: GetUserDetailEmiCalculatorService) {  this.calculateEMI(5000000, 9, 20);}
   // Function to calculate EMI when user clicks a button or any other event
   calculateEMI(principal: number, interestRate: number, tenure: number) {
     const emiDetails = this.emiCalculatorService.calculateEMI(principal, interestRate, tenure);
     console.log(emiDetails); // or use it in any way you want
   }

 
}
