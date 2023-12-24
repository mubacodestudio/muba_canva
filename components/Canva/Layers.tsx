"use client";

import useImage from "use-image";
import {
  Image,
  Transformer,
  Rect,
  Circle,
  Text,
  RegularPolygon,
  Line,
} from "react-konva";
import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Layers = ({
  type,
  data,
  onSelect,
  isSelected,
  element,
  setElement,
  selectedId,
}: any) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [image1] = useImage(data?.img);

  useEffect(() => {
    if (isSelected && !data.locked) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, data]);

  if (type === "CIRCLE") {
    return (
      <>
        <Circle
          onClick={onSelect}
          onTap={onSelect}
          x={data.x}
          ref={shapeRef}
          y={data.y}
          fill={data.color}
          opacity={data.opacity}
          radius={data.radius}
          onTransformEnd={(e) => {
            if (!data?.locked) {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              console.log("xnode", node.x(), "ynode", node.y());

              node.scaleX(1);
              node.scaleY(1);
              const newRadius = Math.max(5, node.radius() * scaleX);
              if (selectedId === 0 || selectedId) {
                let newArr = [...element];

                newArr[selectedId].data.x = node.x();
                newArr[selectedId].data.y = node.y();
                newArr[selectedId].data.radius = newRadius;

                setElement(newArr);
              }
            }
          }}
          draggable={data?.locked ? false : true}
        />
        {isSelected && !data.locked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  } else if (type === "TEXT") {
    return (
      <>
        <Text
          text={data.text}
          onClick={onSelect}
          onTap={onSelect}
          x={data.x}
          ref={shapeRef}
          fill={data.color}
          y={data.y}
          opacity={data.opacity}
          fontFamily={data.fontFamily}
          fontSize={data.fontSize}
          lineHeight={data.lineHeight}
          align={data.align}
          fontStyle={data.bold ? "bold" : ""}
          fontstyle={data.italic ? "italic" : ""}
          textDecoration={data.underLine ? "underline" : ""}
          onTransformEnd={(e) => {
            if (!data?.locked) {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              console.log("text xnode", node.x(), "text ynode", node.y());

              node.scaleX(1);
              node.scaleY(1);

              if (selectedId === 0 || selectedId) {
                let newArr = [...element];

                newArr[selectedId].data.x = node.x();
                newArr[selectedId].data.y = node.y();
                newArr[selectedId].data.width = Math.max(
                  5,
                  node.width() * scaleX
                );
                newArr[selectedId].data.height = Math.max(
                  node.height() * scaleY
                );

                setElement(newArr);
              }
            }
          }}
          draggable={data?.locked ? false : true}
        />

        {isSelected && !data.locked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  } else if (type === "RECTANGLE" || type === "SQUARE") {
    return (
      <>
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          x={data.x}
          ref={shapeRef}
          y={data.y}
          fill={data.color}
          opacity={data.opacity}
          width={data.width}
          height={data.height}
          onTransformEnd={(e) => {
            if (!data?.locked) {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              console.log("xnode", node.x(), "ynode", node.y());

              node.scaleX(1);
              node.scaleY(1);

              if (selectedId === 0 || selectedId) {
                let newArr = [...element];

                newArr[selectedId].data.x = node.x();
                newArr[selectedId].data.y = node.y();
                newArr[selectedId].data.width = Math.max(
                  5,
                  node.width() * scaleX
                );
                newArr[selectedId].data.height = Math.max(
                  node.height() * scaleY
                );

                setElement(newArr);
              }
            }
          }}
          draggable={data?.locked ? false : true}
        />

        {isSelected && !data.locked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  } else if (type === "IMAGE" || type === "QRCODE") {
    return (
      <>
        <Image
          alt=""
          image={image1}
          onClick={onSelect}
          onTap={onSelect}
          x={data.x}
          ref={shapeRef}
          y={data.y}
          width={data.width}
          height={data.height}
          onTransformEnd={(e) => {
            if (!data?.locked) {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              console.log("xnode", node.x(), "ynode", node.y());

              node.scaleX(1);
              node.scaleY(1);

              if (selectedId === 0 || selectedId) {
                let newArr = [...element];

                newArr[selectedId].data.x = node.x();
                newArr[selectedId].data.y = node.y();
                newArr[selectedId].data.width = Math.max(
                  5,
                  node.width() * scaleX
                );
                newArr[selectedId].data.height = Math.max(
                  node.height() * scaleY
                );

                setElement(newArr);
              }
            }
          }}
          draggable={data?.locked ? false : true}
        />
        {isSelected && !data.locked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  } else if (type === "TRIANGLE" || type === "PENTAGON") {
    return (
      <>
        <RegularPolygon
          sides={type === "TRIANGLE" ? 3 : 5}
          radius={50}
          onClick={onSelect}
          onTap={onSelect}
          x={data.x}
          ref={shapeRef}
          y={data.y}
          fill={data.color}
          opacity={data.opacity}
          width={data.width}
          height={data.height}
          onTransformEnd={(e) => {
            if (!data?.locked) {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              console.log("xnode", node.x(), "ynode", node.y());

              node.scaleX(1);
              node.scaleY(1);

              if (selectedId === 0 || selectedId) {
                let newArr = [...element];

                newArr[selectedId].data.x = node.x();
                newArr[selectedId].data.y = node.y();
                newArr[selectedId].data.width = Math.max(
                  5,
                  node.width() * scaleX
                );
                newArr[selectedId].data.height = Math.max(
                  node.height() * scaleY
                );

                setElement(newArr);
              }
            }
          }}
          draggable={data?.locked ? false : true}
        />

        {isSelected && !data.locked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  } else if (type === "LINE") {
    return (
      <>
        <Line
          onClick={onSelect}
          onTap={onSelect}
          points={[data.x, data.y, 150, 5]}
          stroke="black"
          strokeWidth={5}
          lineCap="round"
          lineJoin="round"
          ref={shapeRef}
          draggable={data?.locked ? false : true}
        />

        {isSelected && !data.locked && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  } else if (type === "QRCODE") {
    return (
      <QRCodeCanvas
        value={data.value}
        bgColor={data.transparent ? "transparent" : data.bg}
        fgColor={data.color}
        includeMargin
        imageSettings={{
          height: data.height,
          excavate: true,
          src: "",
          width: data.width,
          x: data.x,
          y: data.y,
        }}
      />
    );
  }
};

export default Layers;
