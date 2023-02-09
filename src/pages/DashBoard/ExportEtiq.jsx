import React, {useEffect, useState} from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/outline';


const ExportEtiq = () => {

useEffect(()=>{

}, [])

return(
<>
<form id='imageForm' className='flex flex-col items-center border-2 border-main-rose min-w-fit w-1/3 mx-auto py-4 px-2 rounded-md mt-4'>

    <button>Lancer scan</button>
</form>
<div className='border-2 border-main-rose rounded-md w-4/5 md:w-1/2 px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
    <div className='flex w-full items-center justify-evenly'>
        <h1>Invent01</h1>
        <DocumentDuplicateIcon className="hover:cursor-pointer h-6"/>
    </div>
</div>
</>
)
}

export default ExportEtiq
