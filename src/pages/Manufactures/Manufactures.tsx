import { useQuery } from "@apollo/client/react"
import { Button } from "../../components/Button/Button"
import { GET_ALL_MANUFACTURES } from "../../graphql/queries/manufactures/manufactores"
import type { GetManufacturesResponse } from "../../types/Manufactures"
export const ManufacturesPage=()=>{
    const {data}=useQuery<GetManufacturesResponse>(GET_ALL_MANUFACTURES)
    console.log(data)
 return (
    <div>
       <div className="flex justify-between align-middle items-center p-2 ">
       <h1 className="text-2xl text-(--text-color)">المصانع</h1>
       <Button text="اضافة مصنع" onClick={()=>(console.log(""))}/>
       </div>
       <div>
        
       </div>
    </div>
 )
}