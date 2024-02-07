import axios from "axios";
import { useEffect, useState } from "react";

const useTranslationAPI = (originalData) => {
  const originalTexts = !originalData
    ? ""
    : {
        mainDescription: originalData?.dados?.descricao,
        contentDescriptions: originalData?.programa?.map((p) => {
          return p.descricao;
        }),
        anotherDescriptions1: originalData?.outros?.map((p) => {
          return p.descricao1;
        }),
        anotherDescriptions2: originalData?.outros?.map((p) => {
          return p.descricao2;
        }),
      };

  const [translatedText, setTranslatedText] = useState(originalTexts);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (!originalData) return;
    setTranslatedText({
      mainDescription: originalData?.dados?.descricao,
      contentDescriptions: originalData?.programa?.map((p) => {
        return p.descricao;
      }),
      anotherDescriptions1: originalData?.outros?.map((p) => {
        return p.descricao1;
      }),
      anotherDescriptions2: originalData?.outros?.map((p) => {
        return p.descricao2;
      }),
    });
  }, [originalData]);

  const contentToString = (array) => {
    const separatedElements = array.join("/cp/");

    return separatedElements.length === 0 ? " " : separatedElements;
  };

  const generateText = (texts) => {
    return (
      texts?.mainDescription +
      "/m/" +
      contentToString(texts?.contentDescriptions) +
      "/m/" +
      contentToString(texts?.anotherDescriptions1) +
      "/m/" +
      contentToString(texts?.anotherDescriptions2)
    );
  };

  const getSupportedLanguagesOptions = {
    method: "GET",
    url: "https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages",
    headers: {
      "X-RapidAPI-Key": "c477ec1f68mshf95d9ba6676dbccp1f92e1jsne83d07257363",
      "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
    },
  };

  const getSupportedLanguages = async () => {
    try {
      const response = await axios.request(getSupportedLanguagesOptions);
      const languages = response?.data.map((lang) => {
        return {
          id: lang.code,
          label: lang.language,
        };
      });
      setLanguages(languages);
    } catch (error) {
      console.error(error);
    }
  };

  const translateText = async (to, texts) => {
    const text = generateText(texts);

    const encodedParams = new URLSearchParams();
    encodedParams.set("from", "auto");
    encodedParams.set("to", to);
    encodedParams.set("html", text);

    const translateTextOptions = {
      method: "POST",
      url: "https://google-translate113.p.rapidapi.com/api/v1/translator/html",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "c477ec1f68mshf95d9ba6676dbccp1f92e1jsne83d07257363",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(translateTextOptions);
      if (!response.data) return;

      if (response.data.trust_level < 0.5) return;
      const parts = response.data.trans.split("/m/");

      setTranslatedText({
        mainDescription: parts[0],
        contentDescriptions: parts[1].split("/cp/"),
        anotherDescriptions1: parts[2].split("/cp/"),
        anotherDescriptions2: parts[3].split("/cp/"),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const resetToOriginal = () => {
    setTranslatedText(originalTexts);
  };

  return {
    languages,
    translatedText,
    getSupportedLanguages,
    translateText,
    resetToOriginal,
  };
};

export default useTranslationAPI;
