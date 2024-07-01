import React, { useState } from 'react';
import './Translator.css';
import languageList from './assets/language.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Translator = () => {

    const [inputFormat, setInputFormat] = useState("en");
    const [outputFormat, setOutputFormat] = useState("my");
    const [translatedText, setTranslatedText] = useState("Translation");
    const [inputText, setInputText] = useState("");

    const handleReverseLanguage = () => {
        const value = inputFormat;
        setInputFormat(outputFormat);
        setOutputFormat(value);
        setInputText("");
        setTranslatedText("Translation");
    }

    const handleRemoveInputText = () => {
        setInputText("");
        setTranslatedText("Translation");
    }

    const handleTranslate = async () => {
        if (!inputText || !inputFormat || !outputFormat) return;
        document.querySelector(".spinner").style.display = "block";
        document.querySelector(".translate").style.display = "none";

        const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${outputFormat}&from=${inputFormat}&textType=plain`;

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0752570365mshcd8aeeed39aed7dp129729jsn57c533ee126d',
                'X-RapidAPI-Host': 'microsoft-translator-text-api3.p.rapidapi.com'
            },
            body: JSON.stringify([
                {
                    Text: inputText
                }
            ])
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const responseObject = JSON.parse(result);
            const translation = responseObject[0].translations[0].text;
            setTranslatedText(translation);
        } catch (error) {
            console.log(error);
            alert("Please Try Again!! Some Error Occurred at your side");
        }

        document.querySelector(".spinner").style.display = "none";
        document.querySelector(".translate").style.display = "block";
    }

  return (
    <div className='container'>
        <div className="row1">
            <select value={inputFormat}
            onChange={ e => setInputFormat(e.target.value)}>
                {Object.keys(languageList).map((key, index) => {
                    const language = languageList[key];
                    return (
                        <option key={index} value={key}>{language.name}</option>
                    );
                })}
            </select>
            <svg className='reversesvg' 
            onClick={handleReverseLanguage}  
            focusable="false" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"> 
                <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"> 
                </path> 
            </svg>
            <select value={outputFormat} onChange={e => {
                setOutputFormat(e.target.value);
                setTranslatedText("Translation");
            }}>
                {Object.keys(languageList).map((key, index) => {
                    const language = languageList[key];
                    return (
                        <option key={index + 118} value={key}>{language.name}</option>
                    );
                })}
            </select>
        </div>

        <div className='row2'>
            <div className='inputText'>
                <svg className='removeinput' 
                style={{ display: (inputText.length) ? "block" : "none" }}  
                onClick={handleRemoveInputText}  
                focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> 
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"> 
                    </path> 
                </svg>
                <textarea value={inputText} placeholder='Enter Text'
                onChange={ e => setInputText(e.target.value)} />
            </div>
            <div className='outputText'>{translatedText}</div>
        </div>

        <div className="row3">
            <button className="btn" onClick={handleTranslate}>
                <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
                <span className="translate">Translate</span>
            </button>
        </div>
    </div>
  )
}

export default Translator