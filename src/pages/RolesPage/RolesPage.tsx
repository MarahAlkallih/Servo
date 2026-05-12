import { useMemo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import Delete from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "../../components/Button/Button";
import CustomDataGrid from "../../components/DataGrid/CustomDataGrid";
type RoleRow = {
  id: number;
  name: string;
  permissions: string;
  createdAt: string;
};

const rows: RoleRow[] = [
  { id: 1, name: "مدير النظام", permissions: "كل الصلاحيات", createdAt: "2026-05-01" },
  { id: 2, name: "المحاسب", permissions: "الفواتير والتقارير", createdAt: "2026-05-02" },
  { id: 3, name: "المخازن", permissions: "المنتجات والموردين", createdAt: "2026-05-03" },
  { id: 4, name: "المبيعات", permissions: "الطلبات والعملاء", createdAt: "2026-05-04" },
];

export const RolesPage = () => {
  const columns = useMemo<GridColDef<RoleRow>[]>(
    () => [
      {
        field: "name",
        headerName: "اسم الدور",
        flex: 1,
        minWidth: 180,
         align: "center",
        headerAlign: "center",
        
       
      },
      {
        field: "permissions",
        headerName: "الصلاحيات",
        flex: 1.2,
        minWidth: 220,
   align: "center",
        headerAlign: "center",
      },
      {
        field: "createdAt",
        headerName: "تاريخ الإنشاء",
        flex: 0.8,
        minWidth: 170,
    align: "center",
        headerAlign: "center",
      },
      {
        field: "actions",
        headerName: "الإجراءات",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        minWidth: 140,
        headerAlign: "center",
        align: "center",
        renderCell: () => (
          <Box sx={{ display: "flex", justifyContent: "center", padding:"10px", alignItems: "center", gap: 1 }}>
            <IconButton size="small" sx={{ color: "grey" }} aria-label="edit role">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#8b0000" }} aria-label="delete role">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <Box dir="rtl" sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, gap: 2, flexWrap: "nowrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1b1c24" ,fontFamily:"Cairo"}}>
              إدارة الأدوار
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button text="اضافة دور" onClick={()=>console.log("add")} />
          </Box>
        </Box>

      <CustomDataGrid rows={rows} columns={columns} initialPageSize={5} pageSizeOptions={[5, 10]} />
    </Box>
  );
};
