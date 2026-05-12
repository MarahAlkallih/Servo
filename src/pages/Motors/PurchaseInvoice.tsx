import { useState } from "react";
import DynamicTable from "../../components/tabels/DynamicTable";
import { InputField } from "../../components/InputField/InputField";
import { Button } from "../../components/Button/Button";
import { Box } from "@mui/material";
import CustomDropdown from "../../components/DropDown/CustomDropdown";
import { useAppDispatch } from "../../hooks/redux";
import { createRows } from "../../features/DnamicTable/tableSlice";

const PurchaseInvoice = () => {
  const supplierOptions = ["علي", "محمد"];
  const dispatch = useAppDispatch();
  const [rowCount, setRowCount] = useState<number>(0);

  return (
    <div className="text-gray-900">
      <h1 className="p-6 text-2xl">فاتورة مشتريات</h1>
      <Box
        sx={{
          mx: 2,
          mb: 3,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          maxWidth: 420,
        }}
      >
        <InputField
          label="عدد السطور"
          type="number"
          value={String(rowCount)}
          onChange={(e) => setRowCount(Number(e.target.value))}
        />
        <CustomDropdown
          options={supplierOptions}
          placeholder="اختر المورد"
        />
        <CustomDropdown
          options={supplierOptions}
          placeholder="اختر الشركة"
        />
        <InputField
          label="المبلغ"
          type="number"
          value={String(rowCount)}
          onChange={(e) => setRowCount(Number(e.target.value))}
        />
        <Button
          text="انشاء جدول"
          onClick={() => dispatch(createRows(rowCount))}
        />
      </Box>
      <DynamicTable />
    </div>
  );
};

export default PurchaseInvoice;