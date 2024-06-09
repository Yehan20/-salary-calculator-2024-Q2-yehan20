
import { createContext, useContext, useState, useEffect, } from 'react';
import { Salary, SalaryFactorObj, SalaryTypes } from '../interface/interface';
import { database } from '../database/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface SalaryContextProps {

  salaryInfo: Salary[];
  setBasicSalary: React.Dispatch<React.SetStateAction<number | string>>;
  basicSalary: number | string;
  showModel: boolean;
  dataLoading: boolean;
  modelAction: string;
  salaryFactor: string;
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
  salaryFactorObj: SalaryFactorObj;
  salarySummary: SalaryTypes | undefined
  displayModel: (type: string, method: string, inputs: SalaryFactorObj) => void
  addNewSalaryFactor: (methodType: string, salaryFactor: string, item: SalaryFactorObj) => void
  updateSingleSalaryFactor: (salaryFactor: string, item: SalaryFactorObj) => void
  deleteSalaryFactor: (id: number, type: string) => void
  calculateValues: (basicSalary: number, earnings: SalaryFactorObj[], deductions: SalaryFactorObj[]) => void
  reset: () => void

}

let MOUNTED = false;
const SalaryContext = createContext<SalaryContextProps | null>(null); // Make Context which allow better accessability if data throughout our app 

export const SalaryContextProvider = ({ children }: any) => {
  
  //Constants
  const EMPLOYEE_EPF = 8;
  const EMPLOYER_EPF = 12;
  const EMPLOYER_ETF = 3;

  const [salaryInfo, setSalaryInfo] = useState<Salary[]>([]); // Store API data

  const [basicSalary, setBasicSalary] = useState<number | string>(0);
  const [modelAction, setModelAction] = useState<string>('');
  const [salaryFactor, setSalaryFactor] = useState<string>('');
  const [salarySummary, setSalarySummary] = useState<SalaryTypes>();

  // to store each edit instance
  const [salaryFactorObj, setSalaryFactorObj] = useState<SalaryFactorObj>({
    name: '',
    amount: 0,
    checked: false,
    id: null
  });

  const [showModel, setShowModel] = useState(false);
  const [dataLoading, setLoading] = useState(true);

  // Showing Popup Model
  const displayModel = (methodType: string, salaryFactor: string, inputs: SalaryFactorObj) => {
    if (inputs) {
  
      setSalaryFactorObj({...inputs});
    }
    setSalaryFactor(salaryFactor);
    setModelAction(methodType);
    setShowModel(!showModel);
  }
  
  // Adding New Earning or Deduction
  const addNewSalaryFactor = async (methodType: string, salaryFactor: string, item: SalaryFactorObj) => {

    let newSalaries: any;

    if (salaryFactor === 'Earnings') {

      newSalaries = salaryInfo.map((salary) => {
         console.log("single instance",salary);

        return {
          ...salary,
          earnings: [...salary.earnings, item]
        }
      })
      console.log(newSalaries);
      setSalaryInfo(newSalaries);
      setShowModel(!showModel);
    }

    if (salaryFactor === 'Deductions') {
      newSalaries = salaryInfo.map((salary) => {

        return {
          ...salary,
          deductions: [...salary.deductions, item]
        }
      })
      setSalaryInfo(newSalaries);
      setShowModel(!showModel);
    }

    calculateValues(Number(basicSalary), newSalaries[0].earnings, newSalaries[0].deductions)


    try {
      const response = await fetch('/api/add-salary', {
         cache: 'no-store' ,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSalaries), 
      });

      if (!response.ok) {
        console.error('Failed to send data:', response.statusText);

      } else {
        console.log('Data sent successfully:', await response.text());

      }
    } catch (error) {
      console.error('Error:', error);

    }
    
  }

  // Generating our final calcaltion based on our  input 
  const calculateValues = (basicSalary: number, earnings: SalaryFactorObj[], deductions: SalaryFactorObj[]) => {
    
    // Make Object to store the information of the salary stats
    const values: SalaryTypes = {
      totalEarnings: basicSalary + earnings.reduce((acc, current) => acc + current.amount, 0),

      totalEPF: basicSalary + earnings.reduce((acc, current) => {
        if (current.checked) {
          return acc + current.amount
        }
        return acc
      }, 0),

      grossDeduction: deductions.reduce((acc, current) => acc + current.amount, 0),
    }

    // Find Percentage Based onf Salaries info from the docs 
    function calculateTaxPercentage(salary: number) {
      switch (true) {
        case salary <= 100000:
          return 0;
        case salary <= 141667:
          return (salary * 0.06) - 6000;
        case salary <= 183333:
          return (salary * 0.12) - 14500;
        case salary <= 225000:
          return (salary * 0.18) - 25500;
        case salary <= 266667:
          return (salary * 0.24) - 39000;
        case salary <= 308333:
          return (salary * 0.3) - 55000;
        default:
          return salary * 0.36;
      }
    }
     
    // update the generated salary figures followed the calculaton based on the instructions
    values["grossEarnings"] = values.totalEarnings - values.grossDeduction
    values["grossSalaryEPF"] = values.totalEPF - values.grossDeduction
    values["emplyeEPF"] = values.grossSalaryEPF * (EMPLOYEE_EPF / 100)
    values["emplyerEPF"] = values.grossSalaryEPF * (EMPLOYER_EPF / 100)
    values["emplyerETF"] = values.grossSalaryEPF * (EMPLOYER_ETF / 100)
    values["apit"] = calculateTaxPercentage(values.grossEarnings)
    values["netSalary"] = values.grossEarnings - values.emplyeEPF - values.apit
    values["ctc"] = values.grossEarnings + values.emplyerEPF + values.emplyerETF;

      setSalarySummary(values)
    
      // make connection with fire base
      const docRef = doc(database, "salaries", process.env.NEXT_PUBLIC_FIREBASE_COLLECTION as string); // Replace placeholders with your actual value

      MOUNTED && updateDoc(docRef, { salary: basicSalary })
        .then(() => {
          console.log(" Salary Updated");
         
        })
        .catch((error) => {
          console.error("Error updating ", error);
        
        });
  }
  

  // talkes a salary factor and addes it and gives a brand new array
  function generateArr(arr: Salary[], updatedFactor: SalaryFactorObj[], type: string) {
    return arr.map((salary) => {
      return {
        ...salary,
        [type]: updatedFactor
      }
    })
  }
  
  // Updating a single Earning or a dedcition 
  const updateSingleSalaryFactor = async (salaryFactor: string, item: SalaryFactorObj) => {

    let updatedFactor: SalaryFactorObj[];
    let finalArry: Salary[] = [];


    if (salaryFactor === 'Earnings') {
      updatedFactor = salaryInfo[0].earnings.map((earning) => {
        if (earning.id === item.id) {
          return {
            ...item
          }
        }
        return earning
      })

      finalArry = generateArr(salaryInfo, updatedFactor, "earnings")

    }


    if (salaryFactor === 'Deductions') {
      updatedFactor = salaryInfo[0].deductions.map((deduction) => {
        if (deduction.id === item.id) {
          return {
            ...item
          }
        }
        return deduction;
      })


      finalArry = generateArr(salaryInfo, updatedFactor, "deductions")

    }
    


    setSalaryInfo(finalArry); // update our data
    setShowModel(!showModel);

    calculateValues(Number(basicSalary), finalArry[0].earnings, finalArry[0].deductions) // re calculate values to make application sync in each update
   

    // connect with firebase with our next api 
    try {
      const response = await fetch('/api/update-salary', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, // Set content type
        body: JSON.stringify(finalArry), // Stringify data for JSON body
      });

      if (!response.ok) {
        console.error('Updated Successfully:', response.statusText);

      } else {
        console.log('Data sent successfully:', await response.text());

      }
    } catch (error) {
      console.error('Error:', error);

    }

  }
  

  // Deleting an Earning or a deduction
  const deleteSalaryFactor = async (id: number, type: string) => {

    let remaningItems: SalaryFactorObj[];
    let finalArry: Salary[] = [];


    if (type === "Earnings" && id !== null) {
      remaningItems = salaryInfo[0].earnings.filter((item) => {
        if (item.id != id) {
          return item
        }
      })

      finalArry = generateArr(salaryInfo, remaningItems, "earnings")

    }
    if (type === "Deductions" && id !== null) {
      remaningItems = salaryInfo[0].deductions.filter((item) => {
        if (item.id != id) {
          return item
        }
      })

      finalArry = generateArr(salaryInfo, remaningItems, "deductions")

    }

    setSalaryInfo(finalArry);
    calculateValues(Number(basicSalary), finalArry[0].earnings, finalArry[0].deductions)

    try {
      const response = await fetch(`/api/delete-factor/`, {
        cache: 'no-store' ,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set content type
        body: JSON.stringify(finalArry), // Stringify data for JSON body
      });

      if (response.ok) {
        console.log('Item deleted successfully');

      }
    } catch (error) {
      console.error('Error:', error);

    }

  }

  // clear the values and clear values in our collection 
  const reset=()=>{
    const clear = salaryInfo.map((salary)=>{
        return {
             ...salary,
             salary:0,
             earnings:[],
             deductions:[],
        }
    })
    setSalaryInfo(clear)
    setBasicSalary(0);
    setSalarySummary({
      apit:0,
      ctc:0,
      emplyeEPF:0,
      emplyerEPF:0,
      emplyerETF:0,
      grossDeduction:0,
      grossEarnings:0, 
      grossSalaryEPF:0,
      netSalary:0, 
      totalEPF:0,
      totalEarnings:0,
    })
    const docRef = doc(database, "salaries", process.env.NEXT_PUBLIC_FIREBASE_COLLECTION as string); // Replace placeholders with your actual value

      updateDoc(docRef, { salary:0, deductions:[],earnings:[]})
      .then(() => {
        console.log(" Salary Updated");
       
      })
      .catch((error) => {
        console.error("Error updating user email:", error);
      
      }); 
  }
  

  // initial get the available salaries 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/get-salary/',{ cache: 'no-store' }); // Replace with your API endpoint
      const data = await response.json()

      setSalaryInfo([data]);
      setBasicSalary(data.salary)
      calculateValues(data.salary, data.earnings, data.deductions);
      setLoading(false);
      MOUNTED = true;
    };

    fetchData();
  }, []);
  
  // anything inside this will have access to it
  return (
    <SalaryContext.Provider value={{
      salaryInfo, setBasicSalary, basicSalary, showModel, setShowModel, modelAction,
      salaryFactor, displayModel, dataLoading, salaryFactorObj, addNewSalaryFactor, updateSingleSalaryFactor,
      deleteSalaryFactor, calculateValues, salarySummary , reset
    }}>
      {children}
    </SalaryContext.Provider>
  );
};

// custom made hook where all our context values can be accssed
export const useSalaryContext = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error('useYourContext must be used within YourContextProvider');
  }
  return context;
};
