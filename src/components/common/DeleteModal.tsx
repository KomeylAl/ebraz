import React from "react";
import { Button } from "../ui/button";

interface DeleteModalProps {
  onCancel: () => void;
  isDeleting: boolean;
  deleteFn: () => void;
}

const DeleteModal = ({ onCancel, isDeleting, deleteFn }: DeleteModalProps) => {
  return (
    <div className="w-full h-40 flex flex-col items-start justify-between p-10">
      <p className="text-lg">آیا از حذف این مورد اطمینان دارید؟</p>
      <div className="w-full flex items-center justify-end gap-4">
        <Button
          variant="destructive"
          size="lg"
          className={`cursor-pointer ${
            isDeleting ? "bg-rose-400" : "bg-rose-600"
          }`}
          onClick={deleteFn}
        >
          {isDeleting ? "در حال حذف..." : "حذف"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="cursor-pointer"
          onClick={onCancel}
        >
          بازگشت
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
