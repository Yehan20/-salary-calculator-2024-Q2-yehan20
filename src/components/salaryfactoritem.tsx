import React from 'react'
import { IoClose } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import styled from 'styled-components'
import { SalaryFactorObj } from '@/app/interface/interface';
import { useSalaryContext } from '@/app/context/appContext';
import { FaCheck } from "react-icons/fa";

const SalaryFactoritemStyled = styled.div`
 display:flex;
 gap:5px;
 margin-bottom:20px;
 align-items:center;

`
const Icon = styled.button`
  display:flex;
  background:#EFEFEF;
  border-radius:50%;
  align-items:center;
  padding:5px;
  &:hover {
     opacity:0.7;
  }
`;

const SalaryFactoritem = ({id,name,amount,checked,type}:SalaryFactorObj) => {

  const {displayModel,deleteSalaryFactor} = useSalaryContext();
  return (
     <SalaryFactoritemStyled key={id}>
           <h4>{name}:</h4>
           <h4>{amount} <span> </span></h4>
           <h5 className='text-xs  flex items-center gap-3' > {checked ?<FaCheck color='blue'/>:""} EPF/ETF <span className='text-gray-500'>|</span>  </h5>
           <div className="flex ml-3 gap-3">
               <Icon title='Click to Edit' onClick={()=>displayModel("Update",type??'',{name,amount,checked,id:id})}><MdModeEditOutline /></Icon>
               <Icon title='Click to Delete' onClick={()=>deleteSalaryFactor(id??0,type??'')}><IoClose /></Icon>
           </div>

     </SalaryFactoritemStyled>
  )
}

export default SalaryFactoritem