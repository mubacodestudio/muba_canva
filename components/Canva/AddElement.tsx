"use client";

import useQRpopup from "@/hooks/use-qrpopup";
import { Icon } from "@iconify/react";

const AddElement = ({ handleAddElementType }: any) => {
  const { open } = useQRpopup();

  const elements = [
    {
      id: 1,
      type: "TEXT",
      icon: "ion:text",
      title: "Text",
    },
    {
      id: 2,
      type: "IMAGE",
      icon: "bi:image",
      title: "Image",
    },
    {
      id: 3,
      type: "CIRCLE",
      icon: "ic:outline-circle",
      title: "Circle",
    },
    {
      id: 4,
      type: "RECTANGLE",
      icon: "cil:rectangle",
      title: "Rectangle",
    },
    {
      id: 5,
      type: "SQUARE",
      icon: "ph:square",
      title: "Square",
    },
    {
      id: 6,
      type: "TRIANGLE",
      icon: "tabler:triangle",
      title: "Triangle",
    },
    {
      id: 7,
      type: "PENTAGON",
      icon: "lucide:pentagon",
      title: "Pentagon",
    },
    {
      id: 8,
      type: "LINE",
      icon: "pepicons-pop:line-y",
      title: "Line",
    },
    {
      id: 9,
      type: "QRCODE",
      icon: "ri:qr-code-fill",
      title: "QR Code",
    },
  ];
  return (
    <div className="bg-black h-full flex flex-col space-y-2 w-[5%]">
      {elements.map((item) => (
        <button
          key={item.id}
          onClick={
            item.type === "QRCODE"
              ? () => open()
              : () => handleAddElementType(item.type)
          }
          className="text-white flex flex-col items-center p-1 border-b border-white/50"
        >
          <Icon icon={item.icon} fontSize={"1.6rem"} />
          <span className="text-sm">{item.title}</span>
        </button>
      ))}
    </div>
  );
};

export default AddElement;
