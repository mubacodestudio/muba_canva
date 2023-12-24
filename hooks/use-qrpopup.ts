import { create } from "zustand";

type Store = {
  status: boolean;
  open: () => void;
  close: () => void;
};

const useStore = create<Store>((set) => ({
  status: false,
  open: () => set((state: { status: boolean }) => ({ status: true })),
  close: () => set((state: { status: boolean }) => ({ status: false })),
}));

const useQRpopup = () => {
  const { status, open, close } = useStore();

  return {
    status,
    open,
    close,
  };
};

export default useQRpopup;
