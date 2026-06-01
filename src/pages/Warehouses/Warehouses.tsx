import { useQuery } from "@apollo/client/react";
import { GET_WAREHOUSES } from "../../graphql/queries/warehouses/warehouses";
import {  useState } from "react";
import { Button } from "../../components/Button/Button";
import { AddMianModal } from "../../components/branch/addBranch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type {GetWarehouseseesponse} from "../../types/Warehouse"
import { EditWarehouseModal } from "../../components/Warehouse/EditWarehouseModal";
import {EditActiveWarehouseModal} from "../../components/Warehouse/InActiveModal"
export const Warehouses=()=>{
     const { data, loading, error } = useQuery<GetWarehouseseesponse>(
     GET_WAREHOUSES,
     {
       fetchPolicy: "network-only",
     }
   );
       const [isOpenEdit, setIsOpenEdit] = useState(false)
       const [isOpenActive, setIsOpenActive] = useState(false)
       const [selectedId, setSelectedId] = useState<number>(0);
      
       const [isOpenAdd, setIsOpenAddd] = useState(false)
    
   
       return (
           <div>
               <div className="flex justify-between align-middle items-center m-3">
                   <h1 className="text-2xl text-(--text-color)">المخازن</h1>
                   <Button text="اضافة مخزن" onClick={() => setIsOpenAddd(true)} />
               </div>
               {loading && <p>جاري التحميل...</p>}
   
               {error && <p>خطأ في تحميل المخازن</p>}
   
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
  {data?.warehouses?.map((w) => (
    <div
      key={w.id}
      className="w-full border border-gray-300 rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-md transition"
    >
      <div className="flex-1 text-right">
        <h2 className="text-lg font-bold">{w.name}</h2>

        <p className="text-sm text-gray-500 mt-1">
          العنوان: {w.address}
        </p>

        <span
          className={`text-xs px-2 py-1 rounded-full mt-3 inline-block ${
            w.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {w.isActive ? "نشطة" : "غير نشطة"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => {
            setSelectedId(w.id);
            setIsOpenEdit(true);
          }}
        >
          <EditIcon fontSize="small" />
        </button>

        <button
          className="p-2 rounded-md hover:bg-red-100 text-red-600"
          onClick={() => {
            setSelectedId(w.id);
            setIsOpenActive(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </button>
      </div>
    </div>
  ))}
</div>
                   
                   <AddMianModal
                       open={isOpenAdd}
                       onClose={() => setIsOpenAddd(false)}
                   />
                   <EditWarehouseModal
                       open={isOpenEdit}
                      warehouseId={selectedId}
                       onClose={() => setIsOpenEdit(false)}
                   />
                   <EditActiveWarehouseModal
                       open={isOpenActive}
                       onClose={() => setIsOpenActive(false)}
                       warehouseId={selectedId}
                       
                   />
               
   
               </div>
         
   
       );
}