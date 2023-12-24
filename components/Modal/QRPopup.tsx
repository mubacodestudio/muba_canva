"use client";

import useQRpopup from "@/hooks/use-qrpopup";
import Modal from ".";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import QRCode from "qrcode";

const QRPopup = ({
  addQrToElement,
}: {
  addQrToElement: (type: string, value: any) => void;
}) => {
  const { status, close } = useQRpopup();
  const [url, setUrl] = useState({
    value: "",
    status: false,
  });
  const [qrStyle, setQrStyle] = useState({
    transparent: false,
    color: "#000000",
    bg: "#ffffff",
  });

  const handleClose = () => {
    setUrl({
      value: "",
      status: false,
    });
    close();
  };

  const handleGenerateQR = () => {
    if (url.value) {
      if (url.value.startsWith("https://")) {
        setUrl({ ...url, status: true });
        return;
      }
      setUrl({ value: `https://${url.value}`, status: true });
    }
  };

  const handleAddQRCode = async () => {
    setUrl({
      value: "",
      status: false,
    });
    setQrStyle({
      transparent: false,
      color: "#000000",
      bg: "#ffffff",
    });
    close();
    try {
      const options = {
        color: {
          dark: qrStyle.color,
          light: qrStyle.transparent ? "#00000000" : qrStyle.bg,
        },
      };
      const dataUrl = await QRCode.toDataURL(url.value, options);
      // addQrToElement("QRCODE", {
      //   url: url.value,
      //   color: qrStyle.color,
      //   transparent: qrStyle.transparent,
      //   bg: qrStyle.bg,
      // });
      addQrToElement("QRCODE", {
        img: dataUrl,
        opacity: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      status={status}
      className="flex items-center justify-center"
      close={handleClose}
    >
      <div
        className="bg-white rounded-md flex items-center justify-center flex-col w-fit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="p-5">
          <h1 className="text-xl font-semibold text-black">Add a QR Code</h1>
          <p className="mt-1 text-black/50">
            Copy and Paste the web address to get start
          </p>

          <div className="mt-3 flex items-center space-x-3 w-full">
            <input
              className="border p-2 text-lg rounded-md outline-none"
              placeholder="https://"
              autoFocus
              value={url.value}
              onChange={(e) => setUrl({ ...url, value: e.target.value })}
            />
            <button
              onClick={handleGenerateQR}
              disabled={!url.value}
              className={`bg-yellow-500 p-2 rounded-md font-semibold text-lg ${
                url.value ? `cursor-pointer` : `cursor-not-allowed`
              }`}
            >
              GO
            </button>
          </div>
        </div>

        {url.status && (
          <div className="p-5 w-full">
            <div className="py-5 bg-qrcode-bg bg-[rgba(33,30,30,.6)] flex items-center justify-center">
              {/* <div className={`p-5`} style={{ backgroundColor: qrStyle.bg }}> */}
              <QRCodeCanvas
                value={url.value}
                bgColor={qrStyle.transparent ? "transparent" : qrStyle.bg}
                fgColor={qrStyle.color}
                includeMargin
              />
              {/* </div> */}
            </div>

            <div className="flex items-center justify-between mt-2">
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={(e) =>
                      setQrStyle({ ...qrStyle, transparent: e.target.checked })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 outline-none"></div>
                  <span className="ms-3 text-sm font-medium text-black">
                    Transparent
                  </span>
                </label>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-sm font-medium">Background</h1>
                <input
                  type="color"
                  value={qrStyle.bg}
                  onChange={(e) =>
                    setQrStyle({ ...qrStyle, bg: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-sm font-medium">Color</h1>
                <input
                  type="color"
                  value={qrStyle.color}
                  onChange={(e) =>
                    setQrStyle({ ...qrStyle, color: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* footer */}
        <div className="flex items-center justify-center space-x-10 border-t py-2 w-full">
          <button
            onClick={handleClose}
            className={`px-5 py-2 border hover:border-black transition rounded-md`}
          >
            Cancel
          </button>
          <button
            onClick={handleAddQRCode}
            className="bg-yellow-500 hover:bg-yellow-300 transition-colors px-5 py-2 rounded-md"
          >
            Add QR Code
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QRPopup;
