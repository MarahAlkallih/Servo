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
    <Paper elevation={0} sx={{ overflow: "hidden", borderRadius: 3 }}>
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
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#f8f8f8",
            borderBottom: "1px solid",
            borderColor: "divider",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
          "& .MuiDataGrid-cell": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: "rgba(139, 0, 0, 0.04)",
          },
          ...sx,
        }}
      />
    </Paper>
  );
}

export default CustomDataGrid;
