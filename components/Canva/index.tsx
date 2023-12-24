"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import AddElement from "./AddElement";
import ElementDetailController from "./ElementDetailController";

import Header from "./header";
import QRPopup from "../Modal/QRPopup";

const WorkSpace = dynamic(() => import("./WorkSpace"), { ssr: false });

const Canva = () => {
  const [element, setElement] = useState<any>([]);

  async function fetchAndConvertImageUrlToDataUrl(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching or converting image:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  const handleAddElementType = (type: string, value?: any) => {
    let data: any;

    if (type === "IMAGE") {
      fetchAndConvertImageUrlToDataUrl(
        "https://images.pexels.com/photos/10276343/pexels-photo-10276343.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
      )
        .then((dataUrl) => {
          // console.log("Data URL:", dataUrl);
          data = {
            img: dataUrl,
            locked: false,
            // img: finalImage,
            opacity: 1,
            x: 50,
            y: 50,
            width: 200,
            height: 100,
          };

          setElement((prev: any) => [
            ...prev,
            {
              type,
              data,
            },
          ]);
          // Use the dataUrl here
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      switch (type) {
        case "TEXT":
          data = {
            locked: false,
            color: "#fff000",
            opacity: 1,
            x: 50,
            y: 50,
            text: "Add Text",
            fontFamily: "ui-monospace",
            fontSize: 48,
            lineHeight: 1,
            align: "left",
            bold: false,
            italic: false,
            underLine: false,
          };
          break;
        case "CIRCLE":
          data = {
            locked: false,
            color: "#fff000",
            opacity: 1,
            x: 50,
            y: 50,
            radius: 50,
          };
          break;
        case "SQUARE":
          data = {
            locked: false,
            color: "#000fff",
            opacity: 1,
            x: 50,
            y: 50,
            width: 100,
            height: 100,
          };
          break;
        case "RECTANGLE":
          data = {
            locked: false,
            color: "#ff0000",
            opacity: 1,
            x: 50,
            y: 50,
            width: 200,
            height: 100,
          };
          break;
        case "TRIANGLE":
          data = {
            locked: false,
            color: "#ffc000",
            opacity: 1,
            x: 50,
            y: 50,
            width: 200,
            height: 100,
          };
          break;
        case "LINE":
          data = {
            locked: false,
            color: "#ffc000",
            opacity: 1,
            x: 50,
            y: 50,
            width: 200,
            height: 100,
          };
          break;
        case "PENTAGON":
          data = {
            locked: false,
            color: "#ff0000",
            opacity: 1,
            x: 50,
            y: 50,
            width: 200,
            height: 100,
          };
          break;
        case "QRCODE":
          data = {
            locked: false,
            ...value,
            x: 400,
            y: 50,
            width: 100,
            height: 100,
          };
          break;
        default:
          break;
      }

      setElement((prev: any) => [
        ...prev,
        {
          type,
          data,
        },
      ]);
    }

    console.log("finalData", data);
  };

  console.log("element", element);

  return (
    <div>
      <QRPopup addQrToElement={handleAddElementType} />
      <Header />
      <div className="flex h-[calc(100vh-80px)] w-full font-">
        <AddElement handleAddElementType={handleAddElementType} />
        <WorkSpace element={element} setElement={setElement} />
      </div>
    </div>
  );
};

export default Canva;
