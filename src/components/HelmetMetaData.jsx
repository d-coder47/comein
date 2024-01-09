import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
export default function HelmetMetaData() {
  const [metadata, setMetadata] = useState(
    JSON.parse(localStorage.getItem("metaData"))
  );

  let currentUrl = "https://comein.cv/";
  let quote = metadata.quote !== undefined ? metadata.quote : "";
  let title = metadata.title !== undefined ? metadata.title : "Come In CV";
  let image =
    metadata.image !== undefined
      ? metadata.image
      : "https://comein.cv/comeincv/server/src/capaImg/Logo%20final%20COME%20IN%20-04-652890db961c8.png";
  let description =
    metadata.description !== undefined ? metadata.description : "";
  let hashtag = metadata.hashtag !== undefined ? metadata.hashtag : "#comeincv";

  useEffect(() => {
    function storageEventHandler() {
      setMetadata(JSON.parse(localStorage.getItem("metaData")));
    }

    window.addEventListener("storage", storageEventHandler);
    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />{" "}
    </Helmet>
  );
}
