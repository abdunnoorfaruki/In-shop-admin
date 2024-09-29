"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure"
      description="This action can not be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-5 space-x-2 flex justify-end items-center w-full">
        <Button variant="outline" disabled={loading} onClick={onClose} >Cancle</Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm} >Continue</Button>
      </div>
    </Modal>
  );
};
