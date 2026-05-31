import { useState } from "react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationIcon from "@mui/icons-material/LocationOn";
import { Modal } from "../global/Modal";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "react-toastify";
import { CREATE_COMPANY } from "../../graphql/mutition/companies/companyMutition"; 
import CustomDropdown from "../DropDown/CustomDropdown";
import { GET_COMPANIES } from "../../graphql/queries/companies/companies";
import type { GetCompaniesResponse } from "../../types/Company";
import { CREATE_MAIN_BRANCH } from "../../graphql/mutition/branches/createBranch";
type AddMainBranchModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm?: (companyName: string) => void;
};

export const AddMianModal = ({ open, onClose, onConfirm }: AddMainBranchModalProps) => {
    const { data: getCompany } = useQuery<GetCompaniesResponse>(GET_COMPANIES);
    const companies = getCompany?.companies || [];

    const [branch, setBranch] = useState({
        name: "",
        address: "",
        type: "MAIN",
        companyId: 0, 
        isActive: true
    });

    const [createBranch, { loading }] = useMutation(CREATE_MAIN_BRANCH);

    const handleClose = () => {
        onClose();
    };

    const handleAddBranch = async () => {
        if (!branch.name || !branch.address || branch.companyId === 0) {
            toast.error("الرجاء ملء جميع الحقول واختيار الشركة");
            return;
        }

        try {
             const res=await createBranch({
                variables:{
                    input:{
                       name:branch.name,
                       address:branch.address,
                         type: "MAIN",
                         companyId:branch.companyId,
                          isActive: true
                    }
                }
             });
             console.log(res)
                if (res.data) {
                toast.success("تم الإضافة بنجاح");
                onClose();}

         
            
        } catch (err: any) {
            toast.error(err.message || "حدث خطأ أثناء الإضافة");
            console.log(err);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="w-full max-w-100 flex flex-col gap-4" dir="rtl">
                <h2 className="text-xl font-semibold text-right">إضافة فرع رئيسي</h2>

             
                <InputField
                    label="اسم الفرع"
                    value={branch.name}
                    onChange={(e) => setBranch({ ...branch, name: e.target.value })}
                    icon={<BusinessOutlinedIcon fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

                
                <InputField
                    label="العنوان"
                    value={branch.address}
                    onChange={(e) => setBranch({ ...branch, address: e.target.value })}
                    icon={<LocationIcon fontSize="small" />}
                    className="sm:w-full md:w-full lg:w-full"
                />

               
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 text-right mb-1">الشركة التابع لها</label>
                    <CustomDropdown
                        options={companies}
                        labelKey="name"  
                        valueKey="id"    
                        placeholder="اختر الشركة"
                        onSelect={(selectedId) => setBranch({ ...branch, companyId: Number(selectedId) })}
                    />
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="h-10 sm:h-11 md:h-12 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                        إلغاء
                    </button>

                    <Button text={loading ? "جاري الإضافة..." : "تأكيد"} onClick={handleAddBranch} />
                </div>
            </div>
        </Modal>
    );
};