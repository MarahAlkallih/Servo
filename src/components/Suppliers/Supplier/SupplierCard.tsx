import React from "react";
import PersonOffOutlined from '@mui/icons-material/PersonOffOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from "react-router-dom";
type SupplierCardProps = {
    name: string;
    phone: string;
    address: string;
    id: number;
};

export const SupplierCard: React.FC<SupplierCardProps> = ({ name, phone, address, id }) => {
    const navigate = useNavigate();
    const firstLetter = name.charAt(0).toUpperCase();

    return (
        <div
            className="
                relative bg-white p-4 pt-16 rounded-lg shadow-sm
                border-r-4 border-r-[--main-color]
                text-right group
                hover:shadow-md hover:-translate-y-0.5
                transition-transform
            "
        >

   
            <div className="absolute left-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    title="عرض التفاصيل"
                    className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                    onClick={()=>navigate(`/suppliers/${id}`)}
                >
                    <VisibilityOutlined fontSize="small" />
                </button>

                <button
                    title="تعطيل"
                    className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                    <PersonOffOutlined fontSize="small" />
                </button>

                <button
                    title="تعديل"
                    className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                    <EditOutlined fontSize="small" />
                </button>
            </div>

           <div className="absolute top-3 right-3 flex items-center gap-0">
                <div
                    className="
                        w-12 h-12 rounded-full
                        bg-(--main-color) text-white
                        border-2 border-(--main-color)
                        flex items-center justify-center
                        font-bold text-lg
                        shadow-sm
                    "
                >
                    {firstLetter}
                </div>

                <div className="mr-2">
                    <h3 className="font-semibold text-lg leading-none">
                        {name}
                    </h3>
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-1">
                رقم الهاتف:
                <span className="font-medium mr-1">{phone}</span>
            </p>

            <p className="text-sm text-gray-600">
                العنوان:
                <span className="font-medium mr-1">{address}</span>
            </p>
        </div>
    );
};

export default SupplierCard;