import { useNavigate, useParams } from "react-router-dom"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"
import { HomeOutlined, } from "@mui/icons-material"
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { CalendarTodayOutlined } from "@mui/icons-material"
import { Card } from "../../components/Suppliers/Supplier/DetailsCard";
export const SupplierDetails=()=>{
    const navigate = useNavigate();
    const {id}=useParams();
    const supplierDetails = [
        { label: "اسم المورد", value: "أحمد محمد", icon: <PersonOutlineOutlinedIcon fontSize="medium" /> },
        { label: "رقم الهاتف", value: "0852085208", icon: <PhoneOutlinedIcon fontSize="medium" /> },
        { label: "العنوان", value: "دمشق", icon: <LocationOnOutlinedIcon fontSize="medium" /> },
        { label: " الرقم الوطني", value: id ?? "-", icon: <BadgeOutlinedIcon fontSize="medium" /> },
        { label: "الفرع", value: "APEX", icon: <HomeOutlined fontSize="medium" /> },
        { label: "النوع", value: "مورد", icon: <CategoryOutlinedIcon fontSize="medium" /> },
        { label: "القيد", value: id ?? "-", icon: <BadgeOutlinedIcon fontSize="medium" /> },
        {label:"تاريخ الانشاء",value:"2024-1-1", icon: <CalendarTodayOutlined fontSize="medium" />}
    ]
    return (
        <div className="space-y-5" dir="rtl">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">تفاصيل الموّرد</h2>
                    <div className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        نشط
                    </div>
                </div>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                     العودة
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supplierDetails.map((item) => (
                    <Card key={item.label} label={item.label} value={item.value} icon={item.icon} />
                ))}
            </div>
        </div>
    )
}