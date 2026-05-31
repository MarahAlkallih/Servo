import { Modal } from "../global/Modal";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { GET_COMPANY_BY_ID } from "../../graphql/queries/companies/companies";
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import {CancelBtn} from "../Button/Cancel"
import { EDIT_COMPANY } from "../../graphql/mutition/companies/companyMutition";


interface EditCompanyModalProps {
    open: boolean;
    onClose: () => void;
    companyID?: number;
}

type CompanyByIdResponse = {
    company?: {
        id: number;
        name: string;
        isActive: boolean;
    };
};

export const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ open, onClose, companyID }) => {
   const { data, loading, error:getCompanyError } = useQuery<CompanyByIdResponse>(GET_COMPANY_BY_ID, {
  variables: {
    id: companyID,
  },
  skip: !companyID,
});

const [form, setForm] = useState({
  name: "",
  isActive: true,
});

const [editCompany,{error}]=useMutation(EDIT_COMPANY,
    {
        variables:{
      id: companyID,
      input: form,
        }
    }
)
function handelEdit(){
    try{
     const res=editCompany();
     console.log(res)
     
    }catch(err){
    console.log(err)
    }
}
// if(!error){
//     toast.success("تم التعديل بنجاح")
// }
const isActive = data?.company?.isActive;
useEffect(() => {
  if (data?.company) {
    setForm({
      name: data.company.name,
      isActive: data.company.isActive,
    });
  }
}, [data]);

    function handleClose() {
      onClose();
      
    }

    return (
        <div className="w-full">

       
        <Modal open={open} onClose={onClose}  >
            {loading && <p>جاري التحميل...</p>}
            {getCompanyError && <p>حدث خطأ أثناء تحميل بيانات الشركة.</p>}
        <h1 className="text-(--text-color) p-4 text-center text-1xl">
  تعديل معلومات الشركة
</h1>
<div className="p-3">
<InputField
  label="اسم الشركة"
  value={form.name}
  onChange={(e) =>
    setForm((prev) => ({ ...prev, name: e.target.value }))
  }
  icon={<BusinessOutlinedIcon fontSize="small" />}
/>
</div>


{typeof isActive === "boolean" && (
  <button
    onClick={() => {
      setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
    }}
    className={`w-full mt-4 py-2 rounded-lg text-white
      ${isActive ? "bg-red-500" : "bg-green-500"}`}
  >
    {isActive ? "إلغاء تنشيط الشركة" : "تنشيط الشركة"}
  </button>
)}
<div className="flex justify-between pt-3">
    <Button text="تعديل" onClick={handelEdit}/> 
    <CancelBtn text="الغاء" onClick={handleClose}/ >
</div>
      

        </Modal>
         </div>
    );
};