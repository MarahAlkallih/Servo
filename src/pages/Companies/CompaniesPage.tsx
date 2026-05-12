import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined"
import { Button } from "../../components/Button/Button"
import { useState } from "react"
import { AddCompanyModal } from "../../components/company/AddCompany"

export const CompaniesPage=()=>{
    const companies=[
        {id:1,name:"شركة النور"},
        {id:2,name:"شركة الزين"}
    ]
    const [isAddCompanyOpen,setIsCompanyOpen]=useState(false);
    return(

        <div className="p-2">
            <div className="flex justify-between align-middle items-center mb-4"> 
             <h1 className="text-2xl ">الشركات</h1>
            <Button text="اضافة شركة" onClick={()=>setIsCompanyOpen(true)}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companies.map(c=>(
                    <div key={c.id} className="border border-gray-300 rounded-lg p-4 flex items-center justify-between gap-3">
                        <div className="w-11 h-11 rounded-full bg-red-50 text-(--main-color) flex items-center justify-center shrink-0">
                            <BusinessOutlinedIcon fontSize="small" />
                        </div>
                        <h2 className="text-lg font-bold flex-1 text-right">{c.name}</h2>
                    </div>
                ))}

            </div>
            <AddCompanyModal open={isAddCompanyOpen}
            onClose={()=>setIsCompanyOpen(false)}
            onConfirm={()=>(console.log("compp"))
            }
            />
           
        </div>
    )
}