import { useState } from "react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { Modal } from "../global/Modal";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";

type AddCompanyModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm?: (companyName: string) => void;
};

export const AddCompanyModal = ({ open, onClose, onConfirm }: AddCompanyModalProps) => {
    const [companyName, setCompanyName] = useState("");

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm?.(companyName);
        setCompanyName("");
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="w-full max-w-96 flex flex-col gap-4" dir="rtl">
                <h2 className="text-xl font-semibold text-right">إضافة شركة</h2>

                <InputField
                    label="اسم الشركة"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    icon={<BusinessOutlinedIcon fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

                <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="h-10 sm:h-11 md:h-12 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                        إلغاء
                    </button>

                    <Button text="تأكيد" onClick={handleConfirm} />
                </div>
            </div>
        </Modal>
    );
};