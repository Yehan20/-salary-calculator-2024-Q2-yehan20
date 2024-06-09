"use client"
import SalaryForm from '@/components/salaryForm';
import SalarySummary from '@/components/salarySummary';

import { SalaryContextProvider } from './context/appContext';

export default function Home() {

  return (
    <SalaryContextProvider>
          <main className='bg-white h-full flex-1 flex gap-5 md:p-20 py-10 px-4 '>
          
          <div className="container max-w-screen-xl md:justify-between  mx-auto flex gap-5 flex-col md:flex-row">
            <SalaryForm/>
            <SalarySummary/>
           
         </div>
      </main>
    </SalaryContextProvider>
     
  )
}
