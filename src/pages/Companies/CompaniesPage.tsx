import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined"
import { Button } from "../../components/Button/Button"
import { useState } from "react"
import { AddCompanyModal } from "../../components/company/AddCompany"
import { DELETE_COMPANY } from "../../graphql/mutition/companies/companyMutition"
import { useMutation, useQuery } from "@apollo/client/react"
import { GET_COMPANIES } from "../../graphql/queries/companies/companies"
import type { GetCompaniesResponse } from "../../types/Company"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditCompanyModal } from "../../components/company/EditCompany"
import { ConfirmModal } from "../../components/Confirm/ConfirmModal"
import { toast } from "react-toastify"

export const CompaniesPage=()=>{
     const { data, loading, error } =
  useQuery<GetCompaniesResponse>(GET_COMPANIES);
  
  const companies = data?.companies || [];
    const [isAddCompanyOpen,setIsCompanyOpen]=useState(false);
    const [isEditCompanyOpen,setIsEditCompanyOpen]=useState(false);
    const [isDeleteCompanyOpen,setIsDeleteCompanyOpen]=useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);
      const [deleteCompany]=useMutation(DELETE_COMPANY,
        {
            variables:{
                id:selectedId
            }
        }
    )
    function handelDelete(){
      try{
  const res=deleteCompany();
  setIsDeleteCompanyOpen(false);

  console.log(res)
      }catch(err){
      toast.error("حدث خطا ما")
      }
    }
    return(
        <div className="p-2">
            <div className="flex justify-between align-middle items-center mb-4"> 
             <h1 className="text-2xl ">الشركات</h1>
            <Button text="اضافة شركة" onClick={()=>setIsCompanyOpen(true)}/>
            </div>
      {loading && <p>جاري التحميل...</p>}

{error && <p>خطأ في تحميل الشركات</p>}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{companies.map((c) => (
  <div
    key={c.id}
    className="border border-gray-300 rounded-lg p-4 flex items-center justify-between gap-3"
  >
    {/* icon */}
    <div className="w-11 h-11 rounded-full bg-red-50 text-(--main-color) flex items-center justify-center shrink-0">
      <BusinessOutlinedIcon fontSize="small" />
    </div>

    {/* name + status */}
    <div className="flex-1 text-right">
      <h2 className="text-lg font-bold">{c.name}</h2>

      <span
        className={`text-xs px-2 py-1 rounded-full mt-1 inline-block
          ${
            c.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
      >
        {c.isActive ? "نشطة" : "غير نشطة"}
      </span>
    </div>

    {/* actions */}
    <div className="flex items-center gap-2">
     <button
  className="p-2 rounded-md hover:bg-gray-100"
  onClick={() => {
    setSelectedId(c.id);
    setIsEditCompanyOpen(true);
  }}
>
  <EditIcon fontSize="small" />
</button>

      <button className="p-2 rounded-md hover:bg-red-100 text-red-600" 
      onClick={()=>{
        setSelectedId(c.id);
        setIsDeleteCompanyOpen(true)}
        
        }>
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  </div>
))}
</div>
            <AddCompanyModal open={isAddCompanyOpen}
            onClose={()=>setIsCompanyOpen(false)}
            onConfirm={()=>(console.log("compp"))
            }
            />
            <EditCompanyModal open={isEditCompanyOpen} onClose={() => setIsEditCompanyOpen(false)}
             companyID={selectedId} />
           <ConfirmModal  open={isDeleteCompanyOpen} onClose={()=>setIsDeleteCompanyOpen(false)}
           description="هل انت متأكد من اتمام العملية ؟"
            onConfirm={handelDelete}/>
        </div>
    )
}