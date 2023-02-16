import React, { useEffect, useState } from 'react'
import { DocumentDuplicateIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline';

const ExportEtiq = () => {

    const [listEan, setListEan] = useState([])
    useEffect(() => {


        let imageForm = document.getElementById('imageForm')
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let file = URL.createObjectURL(e.target[0].files[0]);
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    let splitData = []
                    data.split('\n').slice(2).forEach((line) => {

                        let test = line.split('<TEXT>')[1]
                        if (test) {
                            splitData.push(test.split('</TEXT>')[0])
                        }
                    })
                    splitData.pop()
                    let j = 0
                    let groupData = []
                    for (let i = 0; i < splitData.length / 12; i++) {
                        groupData.push(splitData.slice(j, j + 12))
                        j += 12

                    }
                    // console.log(groupData)
                    let tempList = []
                    groupData.forEach((group) => {
                        let ean = ""
                        ean += group[0] + group[1] + group[2]
                        tempList.push(ean)
                    })
                    setListEan([...tempList])
                })
        })

    }, [])

    const copie = () => {
        let texteCopie = ''
        for (let i = 0; i < listEan.length; i++) {
            texteCopie += listEan[i] + '\n' + 'Qte\n' + 1 + '\n'
        }
        console.log(texteCopie)
        navigator.clipboard.writeText(texteCopie)
        alert(texteCopie)
    }

    const [isAsk, setIsAsk] = useState(true);
    const ask = () => {
        setIsAsk(!isAsk)
    }

    return (
        <>
            <h1 className='text-4xl text-center my-10 font-bold text-gray-700'>Export étiquettes</h1>
            <div className="flex flex-col w-4/5 mx-auto">
                <form id='imageForm' className='flex flex-col items-center border-2 w-full border-main-rose min-w-fit mx-auto py-4 gap-2 px-2 rounded-md mt-4'>
                    <input id='imageInput' type="file" accept=".xml" required />
                    <button className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50'>Lancer traitement</button>
                </form>
                <div className='border-2 border-main-rose rounded-md w-full h-96 overflow-auto px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
                    <div className='flex w-full items-center justify-evenly'>
                        <h1>Invent01</h1>
                        <DocumentDuplicateIcon className="hover:cursor-pointer h-6" onClick={copie} />
                    </div>
                    <div className='flex gap-5'>
                        <div>{listEan.map(item => (
                            <div>
                                <p>{item}</p>
                                <p>Qte</p>
                                <p>1</p>
                            </div>
                        ))}</div>
                    </div>
                </div>
            </div>
            {isAsk ?
                (<div className='p-2 bg-main-rose flex h-fit w-fit rounded-full fixed bottom-10 right-10 hover:cursor-pointer' onClick={ask}>
                    <QuestionMarkCircleIcon className='h-14 stroke-white' />
                </div>)
                :
                (<div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-500 bg-opacity-75 z-50 flex items-center justify-center">
                    <div className='absolute top-0 bottom-0 left-0 right-0' onClick={ask}></div>
                    <div className='w-4/5 h-1/2 bg-white rounded-md relative py-10 px-5 flex gap-1 md:w-1/2 overflow-y-scroll'>
                        <XIcon className='h-8 border-2 border-slate-400 rounded-full absolute top-1 right-1 hover:cursor-pointer' onClick={ask} />
                        <p className='overflow-auto min-w-[200px]'>
                            Après avoir fait les etiquettes sur lcv, tu fait un export XML du fichier généré pour les etiquettes (format galopins) puis tu selectionnes le fichier ici
                            <br />
                            <br />
                            Le bouton pour copier le texte te le formate de la manière suivante :
                            <br />
                            xxxxxxxxxxxxx<br />
                            Qte<br />
                            x<br />
                            xxxxxxxxxxxxx<br />
                            Qte<br />
                            x<br />
                            <br />
                            Il ne te reste qu'à créer un fichier txt, mettre I et le nom du magasin avant de copier le texte
                        </p>
                    </div>
                </div>)}
        </>
    )
}

export default ExportEtiq
