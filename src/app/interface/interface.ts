// Dara types of Salary Related interface

export interface Salary {
    id: number;
    salary: number;
    createdAt: string;
    updatedAt: string; 
    earnings:SalaryFactorObj[];
    deductions: SalaryFactorObj[]; 
  }
  
 export  interface Earning {
    id?: number ;
    name?: string;
    amount: number;
    checked?: boolean;

 }
  
 export  interface Deduction {
    id?: number;
    name?: string;
    amount?: number;
    checked?: boolean;

  }
  
  export interface SalaryFactorObj {
    id: number | null;
    name: string |'';
    amount: number ;
    checked: boolean | false;
    type?:string | '';

  };


//   Data Type Salary Stats
export interface SalaryTypes {
  apit?:number
  ctc?: number
  emplyeEPF?: number
  emplyerEPF?:number
  emplyerETF?:number
  grossDeduction:number
  grossEarnings?:number 
  grossSalaryEPF?:number
  netSalary?:number 
  totalEPF:number
  totalEarnings: number
  }

 export type SalaryFactorItem = {
    id?: number,
    name: string,
    amount: number,
    checked: boolean,
  };
