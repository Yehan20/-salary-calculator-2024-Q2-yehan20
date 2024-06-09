import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRotateLeft } from "react-icons/fa6";
import { useSalaryContext } from '@/app/context/appContext';
import {  SalaryFactorObj } from '@/app/interface/interface';
import SalaryFactoritem from './salaryfactoritem';
import Model from './modelPopup';
import { Andriod } from '@/app/styles/responsive';


const Container = styled.div`
   width:60%;
   background:#FAFAFA;
   outline:1px solid #ccc;
   padding:20px;
   border-radius:10px;
   ${Andriod({width:"100%",padding:"20px 15px"})};
`;
const Title = styled.h1`
  font-weight:600;
  font-size:1.1rem;
`

const Subtitle = styled.h3`
  font-weight:600;
  font-size:.9rem;
  margin-bottom:0.2em;
`

const SmallText = styled.p`
  font-weight:500;
  font-size:.8rem;
  margin-bottom:0.5em;
  color:#757575;
`

const AttributeButton = styled.button`
   color:#0052EA;
   font-size:0.9rem;
   font-weight:500;
   &:hover {
     opacity:0.6;
   }
`

interface Inputprop {
   err?: string;
}
const Input = styled.input<Inputprop>`
    outline:1px solid  ${(props) => props.err?'red':'#f5f5f5'};
    padding:10px 10px;
    max-width:350px;
    width:100%;
    border-radius:3px;
    margin-bottom:0.5em;
`

const SalaryForm = () => {
    const { salaryInfo, basicSalary, setBasicSalary, showModel, displayModel, dataLoading, calculateValues  , reset} = useSalaryContext();
    const [error,setError] = useState<Boolean | String>('')

      // checking for user input errors then showing them to user
     const handleInput = (e:unknown)=>{

        let salary =(e as React.ChangeEvent<HTMLInputElement>).target.value
        setError('');
      
        const regex =/^[0-9]*$/
        if(!regex.test(salary.toString())){
            setError("Please Enter Numbers Only");
             return ;
        }
        if(Number(salary) > 1e12) {
            setError("Maximum Limit Exceed");
            return ;
        }     
        setBasicSalary(Number(salary))
        calculateValues(Number(salary),salaryInfo[0].earnings,salaryInfo[0].deductions)
    }

    if (dataLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-4 w-1/3">
                   
                    <div className="">
                        <p className='text-center'>Loading </p>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <Container>
            {salaryInfo && salaryInfo.map((salaryDetail) => {

                return (<div key={salaryDetail.id}>
                    <div className="flex justify-between">
                        <Title>Calulate your Salary </Title>
                        <button onClick={reset} title='Reset'  className='flex items-center gap-2 text-blue-600 font-bold hover:opacity-75'>
                            <FaRotateLeft style={{transform:"rotate(-30deg)"}} />
                            Reset
                        </button>
                    </div>
                    <div className="my-3">
                        <Subtitle>
                            Basic Salary
                        </Subtitle>
                        <Input err={error!==''?'danger':''} type='text' value={basicSalary} onChange={handleInput} />
                         {error&& <p className='text-red-500 m-0 text-xs'>{error as string}</p>}
                    </div>
                    <div className='my-3 pb-5'>
                        <Subtitle>
                            Earnings
                        </Subtitle>
                        <SmallText>
                            Allowance, Fixed Allowance, Bonus and etc.
                        </SmallText>
                         { salaryDetail.earnings.map((earning:SalaryFactorObj,index)=>{
                                return  <SalaryFactoritem {...earning} type="Earnings" key={index} />
                          })
                         }
                     
                      
                        <AttributeButton title='Click to Add' onClick={() => displayModel("Add", "Earnings",{name:'',amount:1000,checked:false,id:Date.now()})}>+ Add New Allowance</AttributeButton>
                    </div>
                    <hr />
                    <div className="my-3">
                        <Subtitle>
                            Deductions
                        </Subtitle>
                        <SmallText>
                            Salary Advances, Loan Deductions and all
                        </SmallText>
                 
                        { salaryDetail.deductions.map((deduction:SalaryFactorObj,index)=>{
                                return  <SalaryFactoritem {...deduction}  type="Deductions" key={index} />
                          })
                         }
                    
                        <AttributeButton title='Click to Add' onClick={() => displayModel("Add", "Deductions",{name:'',amount:1000,checked:false,id:Date.now()})} >+ Add New Deduction</AttributeButton>

                    </div>
                </div>
                )
            })

            }
            {showModel && <Model />}

        </Container>
    )
}

export default SalaryForm