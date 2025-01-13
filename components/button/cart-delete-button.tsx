"use client";

import { TrashIcon } from "@/constants/icons/trash";
import { useCartData } from "@/hooks/use-cart-data";
import { Modal } from "antd";
import React, { useState } from "react";
import { Button } from "../ui/button";

export const CartDeleteButton: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const { deleteProduct } = useCartData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    deleteProduct(productId);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Delete Button */}
      <div
        className="cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <TrashIcon color="#6E8C7B" />
      </div>

      <Modal open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        footer={null}
        centered
        closeIcon={null}
      >
        <div className=" p-6 rounded text-center">
          <h2 className="text-2xl font-satoshi max-w-[300px] mx-auto font-semibold mb-4 black-100">
            Are you sure you want to delete this item?
          </h2>
          <div className="flex items-center gap-x-3 mx-auto justify-center">
            <Button size="lg" variant="outline" className="rounded-full font-satoshi" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button size="lg" variant="destructive" className="rounded-full font-satoshi" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
