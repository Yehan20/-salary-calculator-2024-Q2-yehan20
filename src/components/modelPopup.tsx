import { useSalaryContext } from '@/app/context/appContext'
import { IoClose } from "react-icons/io5";

import React, { useEffect, useState } from 'react'



const Model = () => {

    const { showModel, setShowModel, salaryFactor, modelAction, salaryFactorObj, addNewSalaryFactor ,updateSingleSalaryFactor } = useSalaryContext()

    const [changeName, setChangeName] = useState('')
    const [changeAmount, setChangeAmount] = useState(10000)
    const [changeChecked, setChangeChecked] = useState(false)
    const [errors, setErrors] = useState(false)
    
    // check for errors if not pass through then will add or update depending on the senario
    // alert(salaryFactor)
    const handleClick = () =>{
        setErrors(false);

        if(changeName==='' || changeAmount<0) {
                setErrors(true);
                return
        }
        if(modelAction !== "Update") addNewSalaryFactor(modelAction, salaryFactor, { name: changeName, amount: changeAmount, checked: changeChecked,id:salaryFactorObj.id }) 
 
        else  updateSingleSalaryFactor(salaryFactor, { name: changeName, amount: changeAmount, checked: changeChecked,id:salaryFactorObj.id })
    }
    
    // when select different factors fetching their  data into the form 
    useEffect(() => {
            setChangeName(salaryFactorObj.name)
            setChangeAmount(salaryFactorObj.amount as number);
            setChangeChecked(salaryFactorObj.checked);
      
    }, [showModel])
    return (
        <>
           <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className={`${showModel ? '' : 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}></div>

                <div className={`${showModel ? '' : 'hidden'} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                    <div className={`${showModel ? '' : 'hidden'} flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0`}>

                        <div className={`${showModel ? '' : 'hidden'} relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}>
                            <div className="">
                                <div className="sm:flex bg-white px-3 pb-4 pt-5 sm:p-6 sm:pb-4 ">

                                    <div className="mt-3 text-center flex justify-between  sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title"> {modelAction} new {salaryFactor}</h3>
                                        <button onClick={() => setShowModel(!showModel)} ><IoClose /></button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="mt-2 bg-white px-3 pb-4 pt-5 sm:p-6 sm:pb-4">

                                <div className="mb-3">
                                    <label className='text-blue-600  text-sm font-bold  mb-2 block' htmlFor="type">{salaryFactor} Name</label>
                                    <input type="text" value={changeName} onChange={(e) => setChangeName(e.target.value)} placeholder='Eg: Travel' required id='type' className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    
                                </div>

                                <div className="mb-3">
                                    <label className='text-blue-600 text-sm font-bold mb-2 block ' htmlFor="amt">Amount</label>
                                    <input type="number"  value={changeAmount} onChange={(e) => setChangeAmount(Number(e.target.value))} placeholder='Eg: 10,000' required id='amt' className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />

                                </div>
                                { salaryFactor!=='Deductions' &&
                                <div className="flex items-center gap-2 mt-5">
                                    <input type="checkbox" checked={changeChecked} onChange={(e) => setChangeChecked(e.target.checked)} id="myCheckbox" className="h-4 w-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    <label htmlFor="myCheckbox" className="text-sm cursor-pointer">EPF/ETF</label>

                                </div> }

                               { errors &&  <div>
                                    <p className='text-red-500 text-center m-0'>Fill All Feilds</p>
                                 </div> }
     
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={handleClick}>
                                            
                                 { modelAction !== "Update" ?'Add' :'Update' }</button>
                                <button type="button" onClick={() => setShowModel(!showModel)} className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-900  hover:text-gray-600 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Model