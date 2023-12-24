"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useViewportSize } from "@mantine/hooks";

import Layers from "./Layers";
import ElementDetailController from "./ElementDetailController";

const WorkSpace = ({ element, setElement }: any) => {
  //useState
  const [contianerMeasurement, setContianerMeasurement] = useState({
    height: 0,
    width: 0,
  });
  const [selectedId, selectShape] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [uri, setUri] = useState<string>("");

  //useViewPort
  const { width, height } = useViewportSize();

  //useRef
  const containerRef = useRef<any>();
  const stageRef = useRef<any>();
  const OuterRef = useRef<any>();

  //useEffect
  useEffect(() => {
    if (containerRef) {
      console.log("containerRef", containerRef.current.clientWidth);
      setContianerMeasurement({
        height: containerRef.current.clientHeight,
        width: containerRef.current.clientWidth,
      });
    }
    console.log("stateRef", stageRef.current.clientWidth);
    console.log("outerRef", OuterRef.current.clientWidth);
  }, [width, height]);

  const checkDeselect = (e: any) => {
    setUri("");
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target?.getStage();
    console.log("ddd", e, clickedOnEmpty);
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleChangeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  //handleExport
  const handleExport = () => {
    const uri = stageRef?.current?.toDataURL({ pixelRatio: 3 });
    console.log("uri", uri);
    setUri(uri);
  };

  return (
    <>
      <div className="w-[80%] flex items-center justify-center">
        <div
          className="bg-white border border-black w-4/5 h-4/5 overflow-hidden relative"
          id="layerContainer"
          ref={containerRef}
        >
          <Stage
            ref={stageRef}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            width={contianerMeasurement.width}
            height={contianerMeasurement.height}
          >
            <Layer>
              <Rect
                ref={OuterRef}
                x={0}
                y={0}
                width={contianerMeasurement.width}
                height={contianerMeasurement.height}
                fill={backgroundColor}
                onClick={() => selectShape(null)}
                onTap={() => selectShape(null)}
              />
              {element.map((item: any, idx: number) => (
                <Layers
                  key={idx}
                  isSelected={idx === selectedId}
                  type={item.type}
                  data={item.data}
                  element={element}
                  setElement={setElement}
                  selectedId={selectedId}
                  onSelect={() => selectShape(idx)}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <ElementDetailController
        setElement={setElement}
        element={element}
        uri={uri}
        selectedId={selectedId}
        contianerMeasurement={contianerMeasurement}
        handleChangeBackgroundColor={handleChangeBackgroundColor}
        backgroundColor={backgroundColor}
        handleExport={handleExport}
      />
    </>
  );
};

export default WorkSpace;
