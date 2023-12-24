"use client";

import { Children, useEffect, useState } from "react";

interface ModalProps {
  status: boolean;
  close?: () => void | null;
  className?: string;
  children: React.ReactNode;
}

const Modal = ({ status, close, className, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (status) {
    return (
      <div
        className={`fixed inset-0 bg-black/50 z-10 h-screen w-screen ${
          className && className
        }`}
        onClick={close}
      >
        {children}
      </div>
    );
  } else {
    null;
  }
};

export default Modal;
