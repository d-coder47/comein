import axios from "axios";
import { useState } from "react";

const useTranslationAPI = (description) => {
    const [translatedText, setTranslatedText] = useState(description);
    const [languages, setLanguages] = useState([]);

    const getSupportedLanguagesOptions = {
        method: 'GET',
        url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages',
        headers: {
          'X-RapidAPI-Key': 'c477ec1f68mshf95d9ba6676dbccp1f92e1jsne83d07257363',
          'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        }
    }
  const getSupportedLanguages = async () => {
    try {
        const response = await axios.request(getSupportedLanguagesOptions);
        const languages = response?.data.map(lang => {
            return {
                id: lang.code,
                label: lang.language
            }
        })
        setLanguages(languages)
    } catch (error) {
        console.error(error);
    }
  }


  const translateText = async (to, text) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'auto');
    encodedParams.set('to', to);
    encodedParams.set('html', text);
    
    const translateTextOptions = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/html',      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'c477ec1f68mshf95d9ba6676dbccp1f92e1jsne83d07257363',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
        const response = await axios.request(translateTextOptions);
        console.log(response.data);
        if(!response.data) return;
        if(response.data.trust_level < 0.5) return;
        setTranslatedText(response.data.trans)
    } catch (error) {
        console.error(error);
    }
    
  }

  const resetToOriginal = () => {
    setTranslatedText(description)
  }

  return {
    languages,
    translatedText,
    getSupportedLanguages,
    translateText,
    resetToOriginal
  };
};

export default useTranslationAPI;
