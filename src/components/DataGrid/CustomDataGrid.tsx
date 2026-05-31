import React, { useState } from "react";
import { DataGrid, type GridColDef, type GridPaginationModel, type GridValidRowModel } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

type CustomDataGridProps<T extends GridValidRowModel> = {
  rows: T[];
  columns: GridColDef<T>[];
  pageSizeOptions?: number[];
  initialPageSize?: number;
  autoHeight?: boolean;
  sx?: any;
};

export function CustomDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  pageSizeOptions = [5, 10],
  initialPageSize = 5,
  autoHeight = true,
  sx,
}: CustomDataGridProps<T>) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: initialPageSize,
    page: 0,
  });

  return (
   <Paper
  elevation={0}
  sx={{
    overflow: "hidden",
    borderRadius: 3,
    background: "var(--bg-color)",
    color: "var(--text-color)",
  }}
>
      <DataGrid
        rows={rows}
        columns={columns as GridColDef[]}
        disableRowSelectionOnClick
        autoHeight={autoHeight}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
     sx={{
  border: 0,
  direction: "rtl",

  backgroundColor: "var(--bg-color)",
  color: "var(--text-color)",

  "& .MuiDataGrid-main": {
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
  },

"& .MuiDataGrid-columnHeaders": {
  background: "var(--grey-color) !important",
  color: "var(--text-color) !important",
//  borderBottom: "1px solid rgba(255,255,255,0.1)",
},

"& .MuiDataGrid-columnHeader": {
  background: "var(--secondary-color) !important",
  color: "var(--text-color) !important",
},

"& .MuiDataGrid-columnHeaderTitle": {
  fontWeight: 700,
  color: "var(--text-color) !important",
},

"& .MuiDataGrid-columnSeparator": {
  color: "var(--text-color) !important",
},



  "& .MuiDataGrid-cell": {
    outline: "none",
    color: "var(--text-color)",
    borderColor: "rgba(255,255,255,0.08)",
  },

  "& .MuiDataGrid-row": {
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: "rgba(139, 0, 0, 0.08)",
  },

  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "var(--bg-color)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    color: "var(--text-color)",
  },

  "& .MuiTablePagination-root": {
    color: "var(--text-color)",
  },

  "& .MuiSvgIcon-root": {
    color: "var(--text-color)",
  },

  "& .MuiDataGrid-iconButtonContainer .MuiSvgIcon-root": {
    color: "var(--text-color)",
  },

  "& .MuiDataGrid-menuIconButton .MuiSvgIcon-root": {
    color: "var(--text-color)",
  },

  ...sx,
}}
      />
    </Paper>
  );
}

export default CustomDataGrid;
