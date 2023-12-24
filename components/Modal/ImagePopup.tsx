import useImagePopup from "@/hooks/use-imagepopup";
import Modal from ".";

const ImagePopup = () => {
  const { status, close } = useImagePopup();

  return (
    <Modal status={status}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-5"></div>
    </Modal>
  );
};

export default ImagePopup;
