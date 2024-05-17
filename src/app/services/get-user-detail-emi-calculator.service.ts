import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { PercentPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GetUserDetailEmiCalculatorService {


 constructor(private http: HttpClient) { }

//  constructor( ) { }
  baseApiUrl: string = "https://localhost:44324";
  // getAllPages(): Observable<Pages[]> {
  //   return this.http.get<Pages[]>(this.baseApiUrl + '/api/pages');
  // }

  // addPage(formData: any) {
  //   //newWidget.id = '00000000-0000-0000-0000-000000000000';  
  //   return this.http.post<Pages>(this.baseApiUrl + '/api/pages', formData);
  // }
  // //addWidget(formData: FormData) {
  // //  return this.http.post(this.baseApiUrl + '/api/pages', formData);
  // //}

  createLoan(data: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/EmiCalculatorData', data);
  }
  getAllUserLoanDetail(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/EmiCalculatorData' );
  }



  getLoanDetailByUserId(userId: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/EmiCalculatorData/' + userId);
  }

  // updatePage(id: number, updatepagerequest: PageModel): Observable<PageModel> {
  //   return this.http.put<PageModel>(this.baseApiUrl + '/api/pages/' + id, updatepagerequest);
  // }


  // deletePage(id: number): Observable<Pages> {
  //   return this.http.delete<Pages>(this.baseApiUrl + '/api/pages/' + id);
  // } 

/**
 * Calculates EMI (Equated Monthly Installment) details for a loan.
 * @param principal The principal amount of the loan.
 * @param interestRate The annual interest rate (in percentage).
 * @param tenure The loan tenure (in years).
 * @returns An object containing EMI details including monthly payment schedule.
 */
calculateEMI(principal: number, interestRate: number, tenure: number): any {
  // Calculate monthly interest rate and total number of payments
  const r = interestRate / 12 / 100;
  const n = tenure * 12;

  // Calculate EMI
  const numerator = principal * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  const loanEMI = numerator / denominator;

  // Calculate total interest payable and total payment
  const totalInterestPayable = (loanEMI * n) - principal;
  const totalPayment = loanEMI * n;

  // Calculate principal and interest percentages
  const principalPercentage = (principal / totalPayment) * 100;
  const interestPercentage = (totalInterestPayable / totalPayment) * 100;

  // Initialize variables for monthly payment schedule
  const monthlyInterestRate = r;
  const schedule = [];
  let principalOutstanding = principal;
  let balance = principal;
  let loanPaidToDatePercent = 0.00;
  let year = new Date().getFullYear();
  let monthIndex = new Date().getMonth();

  // Loop through each payment period to generate payment schedule
  for (let i = 0; i < n; i++) {
      // Calculate interest and principal components for each payment
      const interestComponent = principalOutstanding * monthlyInterestRate;
      const principalComponent = loanEMI - interestComponent;

      // Update principal outstanding and balance
      principalOutstanding -= principalComponent;
      balance -= principalComponent;

      // Calculate total payment for the period and update loan paid to date percentage
      const totalPayment = interestComponent + principalComponent;
      const loanPaidToDate = (principalComponent / principal) * 100;
      loanPaidToDatePercent += loanPaidToDate;

      // Determine month and year for the payment and push details into schedule array
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthName = monthNames[monthIndex];
      monthIndex++;

      if (monthIndex === 12) {
          monthIndex = 0;
          year++;
      }
      
      schedule.push({
          year: year,
          month: monthName,
          principalComponent: Math.round(principalComponent),
          interestComponent: Math.round(interestComponent),
          totalPayment: Math.round(totalPayment),
          balance: Math.round(balance),
          totalPloanPaidToDatePercent: parseFloat(loanPaidToDatePercent.toFixed(2)),
      });
  }

  // Encode payment schedule into JSON string
  const jsonScheduleString = JSON.stringify(schedule);

  // Format the result as an object containing EMI details
  const emiDetails = {
      loanEMI: Math.round(loanEMI),
      totalInterestPayable: Math.round(totalInterestPayable),
      totalPayment: Math.round(totalPayment),
      principalPercentage: principalPercentage.toFixed(1),
      interestPercentage: interestPercentage.toFixed(1),
      result: jsonScheduleString
  };

  return emiDetails;
}

}
