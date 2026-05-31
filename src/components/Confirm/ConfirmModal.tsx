import { Delete } from "@mui/icons-material";;
import {Modal} from "../global/Modal";
import type { ConfirmModalProps } from "../../types/ModalProps";
export const ConfirmModal = (props: ConfirmModalProps) => {
  const { open, onClose,description } = props;
  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    props.onConfirm();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-fit">
        <Delete sx={{ fontSize: 56 }} className="mx-auto text-red-500" />

        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-(--text-color)">
            تأكيد العملية
          </h3>
          <p className="text-sm text-gray-500">
            {props.description}
          </p>
        </div>

        <div className="flex gap-4">
            <button
            className="btn btn-danger w-full bg-red-500 hover:bg-red-700 cursor-pointer rounded"
            onClick={handleDelete}
          >
            تأكيد
          </button>
          <button
            className="btn btn-light w-full bg-gray-300 hover:bg-gray-400 cursor-pointer rounded"
            onClick={handleCancel}
          >
            الغاء
          </button>

          
        </div>
      </div>
    </Modal>
  );
};