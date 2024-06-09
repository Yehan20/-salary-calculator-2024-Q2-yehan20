import React from 'react'
import styled from 'styled-components'

import { useSalaryContext } from '@/app/context/appContext';
import { Andriod } from '@/app/styles/responsive';


const Container = styled.div`
   width:40%;
   background:#FFF;
   outline:1px solid #ccc;
   padding:20px;
   border-radius:10px;
   ${Andriod({width:"100%"})};

`;
const Title = styled.h2`
   font-weight:600;
  font-size:1.25rem;
`

const Subtitle = styled.h3`
   font-weight:600;
  font-size:.9rem;
  margin-bottom:0.2em;
  color:#757575;
`

const ItemFeature = styled.h4``;
const Amount = styled.h4``;


const SalarySummary = () => {
    const {  basicSalary, dataLoading, salarySummary } = useSalaryContext();
    
    // this custom made function will convert numbers and format with commas 
    function formatNumber(number:number|string, decimals = 2) {
        return number.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
        });
      }
    return (
        <>
            {!dataLoading && < Container >

                <Title>Your Salary</Title>


                <div className="my-3 flex justify-between">
                    <Subtitle>Items</Subtitle>
                    <Subtitle>Amount</Subtitle>
                </div>

                <div className="flex justify-between my-3">
                    <ItemFeature>Basic Salary</ItemFeature>
                    <Amount>{formatNumber(basicSalary)}</Amount>
                </div>

                <div className="flex justify-between my-3">
                    <ItemFeature>Gross Earning</ItemFeature>
                    <Amount>{formatNumber(salarySummary?.totalEarnings as number)}</Amount>
                </div>

                <div className="flex justify-between my-3">
                    <ItemFeature>Gross Deduction</ItemFeature>
                    <Amount>-{formatNumber(salarySummary?.grossDeduction as number)}</Amount>
                </div>

                <div className="flex justify-between my-3">
                    <ItemFeature>Employee EPF (8%)</ItemFeature>
                    <Amount>-{formatNumber(salarySummary?.emplyeEPF as number)}</Amount>
                </div>


                <div className="flex justify-between my-3">
                    <ItemFeature>APIT</ItemFeature>
                    <Amount>-{formatNumber(salarySummary?.apit as number)}</Amount>
                </div>

                <div className="flex my-6 py-3 px-3 rounded-sm border-gray-300 justify-between border-solid border">
                    <h3 className='font-bold'>Net Salary (Take Home)</h3>
                    <h3 className='font-bold'>{formatNumber(salarySummary?.netSalary as number)}</h3>
                </div>

                <div className="my-3">
                    <Subtitle>
                        Contribution from the Employer
                    </Subtitle>

                    <div className="flex my-3 justify-between">
                        <ItemFeature>Employer EPF (12%)</ItemFeature>
                        <Amount>{formatNumber(salarySummary?.emplyerEPF as number)}</Amount>

                    </div>

                    <div className="flex my-3 justify-between">
                        <ItemFeature>Employer ETF (3%)</ItemFeature>
                          <Amount>{formatNumber(salarySummary?.emplyerETF as number)}</Amount>
                    </div>

                    <div className="flex my-3 justify-between">
                        <ItemFeature>CTC (Cost to Company)</ItemFeature>
                        <Amount>{formatNumber(salarySummary?.ctc as number)}</Amount>
                    </div>
                </div>

              </Container >
            }</>

    )
}

export default SalarySummary