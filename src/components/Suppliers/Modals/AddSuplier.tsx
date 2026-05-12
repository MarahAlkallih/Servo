import { useState } from "react";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { Modal } from "../../global/Modal";
import { InputField } from "../../InputField/InputField";
import { Button } from "../../Button/Button";

type AddSupplierPayload = {
    name: string;
    phone: string;
    address: string;
    nationalNum: string;
    commercialNum: string;
    
}; 
   


type AddSupplierProps = {
    open: boolean;
    onClose: () => void;
    onConfirm?: (payload: AddSupplierPayload) => void;
};

export const AddSupplier = ({ open, onClose, onConfirm }: AddSupplierProps) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [nationalNum, setNationalNum] = useState("");
    const [commercialNum, setCommercialNum] = useState("");

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm?.({ name, phone, address, nationalNum, commercialNum });
        onClose();
        setName("");
        setPhone("");
        setAddress("");
        setNationalNum("");
        setCommercialNum("");
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="w-full max-w-[420px] flex flex-col gap-4" dir="rtl">
                <h2 className="text-xl font-semibold text-right">إضافة مورد</h2>

                <InputField
                    label="اسم المورد"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<PersonOutlineOutlined fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

                <InputField
                    label="رقم الهاتف"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    icon={<PhoneOutlined fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

                <InputField
                    label="العنوان"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    icon={<LocationOnOutlined fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />
                    <InputField
                    label="الرقم الوطني"
                    value={nationalNum}
                    onChange={(e) => setNationalNum(e.target.value)}
                    icon={<BadgeOutlinedIcon fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

                <InputField
                    label="الرقم التجاري"
                    value={commercialNum}
                    onChange={(e) => setCommercialNum(e.target.value)}
                    icon={<BadgeOutlinedIcon fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

                <div className="mt-2 flex items-center justify-between gap-2">
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