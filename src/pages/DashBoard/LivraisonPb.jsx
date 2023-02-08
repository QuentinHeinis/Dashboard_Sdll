import React, {useEffect, useState} from 'react'
import { createWorker } from 'tesseract.js';
import Tesseract from 'tesseract.js';

import image from '../../images/full.png'


const LivraisonPb = () => {
    const [ocr, setOcr] = useState('Recognizing...');

    const worker = createWorker({
      });
      let quantity = []
      let ean = []
      let flip = true
      const convert = ( ) =>{
        ocr.split('').forEach((char)=>{
            if(flip){
                quantity.push(char)
                if(char==' '){
                    
                }
            }
        })
      }
    useEffect(() => {
        Tesseract.recognize(
            image,
            'eng',
            {  }
          ).then(({ data: { text } }) => {
            setOcr(text)
            convert()
          })

      });

return(
    <div className="App">
      {ocr.split('').map((char)=>
           (<p>{char}</p>)
              )}
    </div>
)
}

export default LivraisonPb
