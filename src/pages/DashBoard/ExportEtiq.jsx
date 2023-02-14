import React, {useEffect, useState} from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/outline';

const ExportEtiq = () => {

    const [listEan, setListEan] = useState([])
    useEffect(()=>{

        
let imageForm = document.getElementById('imageForm')
        imageForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            let file = URL.createObjectURL(e.target[0].files[0]);
            fetch(file)
        .then(response => response.text())
        .then(data => {
            let splitData = []
            data.split('\n').slice(2).forEach((line)=>{
            
                let test = line.split('<TEXT>')[1]
                if (test) {
                    splitData.push(test.split('</TEXT>')[0])
                }
            })
            splitData.pop()
            let j = 0
            let groupData = []
            for (let i = 0; i < splitData.length/12; i++) {
                groupData.push(splitData.slice(j, j+12))
                j+=12
        
            }
            // console.log(groupData)
            let tempList = []
            groupData.forEach((group)=>{
                let ean = ""
                ean += group[0] + group[1] + group[2]
                tempList.push(ean)
            })
            setListEan([...tempList])
        })
    })

}, [])

const copie = ( ) =>{
    let texteCopie = ''
    for (let i = 0; i < listEan.length; i++) {
        texteCopie += listEan[i] + '\n' + 'Qte\n' + 1 + '\n'
    }
    console.log(texteCopie)
    navigator.clipboard.writeText(texteCopie)
    alert(texteCopie)
}

return(
<>
<form id='imageForm' className='flex flex-col items-center border-2 border-main-rose min-w-fit w-1/3 mx-auto py-4 gap-2 px-2 rounded-md mt-4'>
    <input id='imageInput' type="file" accept=".xml" required/>
    <button className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50'>Lancer scan</button>
</form>
<div className='border-2 border-main-rose rounded-md w-4/5 md:w-1/2 px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
    <div className='flex w-full items-center justify-evenly'>
        <h1>Invent01</h1>
        <DocumentDuplicateIcon className="hover:cursor-pointer h-6" onClick={copie}/>
    </div>
    <div className='flex gap-5'>
        <div>{listEan.map(item=>(
        <div>
            <p>{item}</p>
            <p>Qte</p>
            <p>1</p>
        </div>
        ))}</div>
    </div>
</div>
</>
)
}

export default ExportEtiq
