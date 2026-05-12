import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface RowData {
  id: string;
  bikeName: string;
  engineNumber: string;
}

interface TableState {
  rowCount: number;
  rows: RowData[];
  loading: boolean;
  copiedRow: RowData | null;
}

const initialState: TableState = {
  rowCount: 0,
  rows: [],
  loading: false,
  copiedRow: null,
};

const tableSlice = createSlice({
  name: "table",

  initialState,

  reducers: {
    
    // إنشاء جدول

    createRows: (
      state,
      action: PayloadAction<number>
    ) => {

      state.rowCount = action.payload;

      // loading إذا العدد كبير

      if (action.payload > 10) {
        state.loading = true;
      }

      state.rows = Array.from(
        { length: action.payload },
        () => ({
          id: crypto.randomUUID(),
          bikeName: "",
          engineNumber: "",
        })
      );

      state.loading = false;
    },

    // تعديل input

    updateRow: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof RowData;
        value: string;
      }>
    ) => {

      const row = state.rows.find(
        (r) => r.id === action.payload.id
      );

      if (row) {
        row[action.payload.field] =
          action.payload.value;
      }
    },

    // إضافة سطر

    addRow: (state) => {
      state.rows.push({
        id: crypto.randomUUID(),
        bikeName: "",
        engineNumber: "",
      });

      state.rowCount += 1;
    },

    // حذف سطر

    deleteRow: (
      state,
      action: PayloadAction<string>
    ) => {

      state.rows = state.rows.filter(
        (row) => row.id !== action.payload
      );

      state.rowCount -= 1;
    },

    // نسخ سطر
    copyRow: (state, action: PayloadAction<string>) => {
      const row = state.rows.find((r) => r.id === action.payload);
      state.copiedRow = row ? { ...row } : null;
    },

    // لصق السطر المنسوخ على سطر موجود
    pasteRow: (state, action: PayloadAction<string>) => {
      if (!state.copiedRow) return;

      const target = state.rows.find(
        (r) => r.id === action.payload
      );

      if (target) {
        target.bikeName = state.copiedRow.bikeName;
        target.engineNumber = state.copiedRow.engineNumber;
      }
    },
  },
});

export const {
  createRows,
  updateRow,
  addRow,
  deleteRow,
  copyRow,
  pasteRow,
} = tableSlice.actions;

export default tableSlice.reducer;