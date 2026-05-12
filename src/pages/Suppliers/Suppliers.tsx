import { useState } from "react"
import { Box } from "@mui/material"
import { Button } from "../../components/Button/Button"
import SupplierCard from "../../components/Suppliers/Supplier/SupplierCard"
import { AddSupplier } from "../../components/Suppliers/Modals/AddSuplier"

type Supplier = { id: number; name: string; phone: string; address: string }

export const SuppliersPage = () => {
    const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)

    const suppliers: Supplier[] = [
        { id: 1, name: "مؤسسة النور", phone: "050-1234567", address: "دمشق شارع الملك فهد" },
        { id: 2, name: "شركة الصقور", phone: "053-7654321", address: "دمشق, حي البحر" },
        { id: 3, name: " ali", phone: "055-9988776", address: "دمشق شارع الأمير" },
    ]

    return (
        <div className="p-1">
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", mb: 2, gap: 2, flexWrap: "nowrap" }}>
                 <h1 className="text-2xl">الموردين</h1>
                <Button text="اضافة مورد" onClick={() => setIsAddSupplierOpen(true)} />
               
            </Box>

            <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suppliers.map(s => (
                        <SupplierCard key={s.id} name={s.name} phone={s.phone} address={s.address} id={s.id} />
                    ))}
                </div>
            </div>

            <AddSupplier
                open={isAddSupplierOpen}
                onClose={() => setIsAddSupplierOpen(false)}
                onConfirm={(payload) => console.log("new supplier", payload)}
            />

        </div>
    )
}