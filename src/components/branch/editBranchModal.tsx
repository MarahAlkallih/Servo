import { Modal } from "../global/Modal";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { GET_BRANCH_BY_ID } from "../../graphql/queries/branches/branches";
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import {CancelBtn} from "../Button/Cancel"
import { EDIT_BRANCH } from "../../graphql/mutition/branches/createBranch";
import { toast } from "react-toastify";


interface EditBranchModalProps {
    open: boolean;
    onClose: () => void;
    branchId?: number;
}

type BranchByIdResponse = {
    branch?: {
        id: number;
        name: string;
        address:string;
        isActive: boolean;
    };
};

export const EditBranchModal: React.FC<EditBranchModalProps> = ({ open, onClose, branchId: branchId }) => {
   const { data, loading, error:getBranchError } = useQuery<BranchByIdResponse>(GET_BRANCH_BY_ID, {
  variables: {
    id: branchId,
  },
  skip: !branchId
});
console.log("data",data);
const [form, setForm] = useState({
  name: "",
  address:"",
  isActive: true,
});
useEffect(()=>{
    if(data?.branch){
      setForm({
        name:data.branch.name,
        address:data.branch.address,
          isActive: data.branch.isActive,
      })

    }
},[data])
const [editBranch,{error}]=useMutation(EDIT_BRANCH,
    {
        variables:{
      id: branchId,
      input: form,
        }
    }
)

function handelEdit(){
    try{
     const res=editBranch();
     console.log(res)
     if(!error){
    toast.success("تم التعديل بنجاح")
    onClose();
}
     
    }catch(err){
    console.log(err)
    }
}

const isActive = data?.branch?.isActive;
    function handleClose() {
      onClose();
      
    }

    return (
        <div className="w-full">

       
        <Modal open={open} onClose={onClose}  >
            {loading && <p>جاري التحميل...</p>}
            {getBranchError && <p>حدث خطأ أثناء تحميل بيانات الشركة.</p>}
        <h1 className="text-(--text-color) p-4 text-center text-1xl">
  تعديل معلومات الفرع
</h1>
<div className="p-3 flex flex-col gap-3">
<InputField
  label="اسم الفرع"
  value={form.name}
  onChange={(e) =>
    setForm((prev) => ({ ...prev, name: e.target.value }))
  }
  icon={<BusinessOutlinedIcon fontSize="small" />}
/>
<InputField
  label="العنوان"
  value={form.address}
  onChange={(e) =>
    setForm((prev) => ({ ...prev, address: e.target.value }))
  }
  icon={<BusinessOutlinedIcon fontSize="small" />}
/>
</div>
{typeof isActive === "boolean" && (
  <button
    onClick={() => {
      setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
    }}
    className={`w-full mt-2 py-2 rounded-lg text-white
      ${isActive ? "bg-red-500" : "bg-green-500"}`}
  >
    {isActive ? "إلغاء تنشيط الفرع" : "تنشيط الفرع"}
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