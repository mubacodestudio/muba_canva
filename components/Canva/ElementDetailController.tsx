"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

const ElementDetailController = ({
  setElement,
  element,
  selectedId,
  contianerMeasurement,
  uri,
  handleExport,
  backgroundColor,
  handleChangeBackgroundColor,
}: any) => {
  const alignmentController = [
    { id: 1, icon: "fe:align-left", align: "LEFT" },
    {
      id: 2,
      icon: "fe:align-center",
      align: "CENTER",
    },
    { id: 3, icon: "fe:align-right", align: "RIGHT" },
    { id: 4, icon: "fe:align-top", align: "TOP" },
    { id: 5, icon: "fe:align-bottom", align: "BOTTOM" },
    { id: 6, icon: "fe:align-vertically", align: "VERTICAL" },
  ];

  const textAlignment = [
    {
      id: 1,
      align: "left",
      icon: "mingcute:align-left-fill",
    },
    {
      id: 2,
      align: "center",
      icon: "mingcute:align-center-fill",
    },
    {
      id: 3,
      align: "right",
      icon: "mingcute:align-right-fill",
    },
  ];

  //handleDownload
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = uri;
    link.download = "canvas-image.png"; // You can name the file here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //handleAlignment
  const handleAlignmnet = (align: string) => {
    if (selectedId === 0 || selectedId) {
      let newArr = [...element];

      switch (align) {
        case "LEFT":
          newArr[selectedId].data.x = 0;
          break;
        case "RIGHT":
          newArr[selectedId].data.x = contianerMeasurement.width;
          break;
        case "TOP":
          newArr[selectedId].data.y = 0;
          break;
        case "BOTTOM":
          newArr[selectedId].data.y = contianerMeasurement.height;
          break;
        case "CENTER":
          newArr[selectedId].data.x = Math.ceil(
            contianerMeasurement.width * 0.5
          );
          break;
        case "VERTICAL":
          newArr[selectedId].data.y = Math.ceil(
            contianerMeasurement.height * 0.5
          );
          break;
        default:
          // You can add default behavior if align does not match any case
          break;
      }

      setElement(newArr);
    }
  };

  let data = element[selectedId];

  const handleOnClick = (type: string, value: any) => {
    let newArr = [...element];

    switch (type) {
      case "LOCK":
        newArr[selectedId].data.locked = value;
        break;
      case "OPACITY":
        newArr[selectedId].data.opacity = value;
        break;
      case "COLOR":
        newArr[selectedId].data.color = value;
        break;
      case "TEXTALIGN":
        newArr[selectedId].data.align = value;
        break;
      case "TEXTLINEHEIGHT":
        newArr[selectedId].data.lineHeight = value;
        break;
      case "TEXTFONTSIZE":
        newArr[selectedId].data.fontSize = value;
        break;
      case "TEXTBOLD":
        newArr[selectedId].data.bold = value;
        break;
      case "TEXTITALIC":
        newArr[selectedId].data.italic = value;
        break;
      case "TEXTUNDERLINE":
        newArr[selectedId].data.underLine = value;
        break;
      default:
        break;
    }

    setElement(newArr);
  };

  const handleDelete = () => {
    let newArr = [...element];

    newArr.splice(selectedId, 1);

    setElement(newArr);
  };

  const otherTextProperty = [
    {
      id: 1,
      value: data?.data.bold,
      icon: "ooui:bold-b",
      key: "TEXTBOLD",
    },
    {
      id: 2,
      value: data?.data.italic,
      icon: "mingcute:italic-fill",
      key: "TEXTITALIC",
    },
    {
      id: 3,
      value: data?.data.underLine,
      icon: "mingcute:underline-fill",
      key: "TEXTUNDERLINE",
    },
  ];

  return (
    <div className="border-l w-[15%]">
      {selectedId >= 0 && selectedId !== null && element.length > 0 ? (
        <>
          <div className="flex items-center justify-between space-x-2 border-b p-2">
            {alignmentController.map((item) => (
              <Icon
                fontSize={"1.6rem"}
                key={item.id}
                icon={item.icon}
                onClick={() => handleAlignmnet(item.align)}
                className="cursor-pointer"
              />
            ))}
          </div>

          {/* lock */}
          <div className="flex items-center justify-between space-x-2 border-b p-2">
            <button
              className={`border p-1 rounded ${
                data?.data?.locked ? `bg-blue-500` : ``
              }`}
              onClick={() => handleOnClick("LOCK", !data?.data?.locked)}
            >
              <Icon
                fontSize={"1.6rem"}
                icon={`ic:baseline-lock`}
                color={data?.data?.locked ? `#fff` : ``}
              />
            </button>
          </div>

          {/* text Input */}
          {data?.type === "TEXT" && (
            <div className="p-2 border-b">
              <h6>Text</h6>
              <textarea
                value={data.data.text}
                className="border mt-1 rounded-md px-1 w-full outline-none"
                onChange={(e) => {
                  let newArr = [...element];

                  newArr[selectedId].data.text = e.target.value;

                  setElement(newArr);
                }}
              />
            </div>
          )}

          {/* alignment */}
          {data?.type === "TEXT" && (
            <div className="p-2 border-b">
              <h6>Alignment</h6>
              <div className="flex items-center mt-1">
                {textAlignment.map((align) => (
                  <button
                    disabled={align.align === data.data.align}
                    className={`py-2 px-4 border ${
                      align.align === data.data.align && `text-black/50`
                    }`}
                    key={align.id}
                    onClick={() => handleOnClick("TEXTALIGN", align.align)}
                  >
                    <Icon icon={align.icon} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* lineHeight & fontSize */}
          {data?.type === "TEXT" && (
            <div className="p-2 border-b w-full flex items-center justify-between space-x-3">
              <div>
                <h6>Line Height</h6>
                <input
                  type="number"
                  min={1}
                  value={data.data.lineHeight}
                  onChange={(e) =>
                    handleOnClick("TEXTLINEHEIGHT", e.target.value)
                  }
                  className="border w-[40%] flex items-center justify-center rounded-md p-1"
                />
              </div>
              <div>
                <h6>Font Size</h6>
                <input
                  value={data.data.fontSize}
                  type="number"
                  onChange={(e) =>
                    handleOnClick("TEXTFONTSIZE", e.target.value)
                  }
                  className="border flex items-center justify-center rounded-md w-[40%] p-1"
                />
              </div>
            </div>
          )}

          {/* Text options (Bold, Italic, Underline) & color */}
          {data?.type === "TEXT" && (
            <div className="p-2 border-b flex items-center space-x-5">
              <div>
                <h6>options</h6>
                <div className="flex items-center mt-1">
                  {otherTextProperty.map((align) => (
                    <button
                      className={`py-2 px-4 border ${
                        align.value && `text-black/50`
                      }`}
                      key={align.id}
                      onClick={() => handleOnClick(align.key, !align.value)}
                    >
                      <Icon icon={align.icon} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h6>colour</h6>
                <input
                  type="color"
                  value={data.data.color}
                  onChange={(e: any) => handleOnClick("COLOR", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* opacity */}
          {(data?.type === "TRIANGLE" ||
            data?.type === "PENTAGON" ||
            data?.type === "CIRCLE" ||
            data?.type === "SQUARE" ||
            data?.type === "RECTANGLE" ||
            data?.type === "TEXT") && (
            <div className="flex flex-col justify-between space-x-2 border-b p-2 w-full">
              <h6>opacity</h6>
              <input
                type="range"
                min={0}
                step={0.1}
                max={1}
                value={data?.data?.opacity}
                className="mt-1"
                onChange={(e: any) => handleOnClick("OPACITY", e.target.value)}
              />
            </div>
          )}
          {/* color */}
          {(data?.type === "TRIANGLE" ||
            data?.type === "PENTAGON" ||
            data?.type === "CIRCLE" ||
            data?.type === "SQUARE" ||
            data?.type === "RECTANGLE") && (
            <div className="flex flex-col justify-between space-x-2 border-b p-2 w-full">
              <h6>color</h6>
              <input
                type="color"
                value={data?.data?.color}
                className="mt-1"
                onChange={(e: any) => handleOnClick("COLOR", e.target.value)}
              />
            </div>
          )}
          {/* delete */}
          <div className="p-2 border-b">
            <button
              onClick={handleDelete}
              className="bg-red-600 py-1 text-white border rounded-md w-full"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-between space-x-2 border-b p-2 w-full">
            <h6>Background Color</h6>
            <input
              type="color"
              value={backgroundColor}
              className="mt-1"
              onChange={(e: any) => handleChangeBackgroundColor(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between space-x-2 border-b p-2 w-full">
            <h6>Export</h6>
            <button onClick={handleExport}>preview</button>
            {uri && (
              <>
                <div>
                  <img className="object-fill border" src={uri} />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-300 mt-3 w-full outline-none"
                  onClick={handleDownload}
                >
                  Dowload
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ElementDetailController;
