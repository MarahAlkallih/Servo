import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import {
  addRow,
  deleteRow,
  updateRow,
  copyRow,
  pasteRow,
} from "../../features/DnamicTable/tableSlice";

import { useAppDispatch } from "../../hooks/redux";
import { useAppSelector } from "../../hooks/redux";

const DynamicTable = () => {
  const dispatch = useAppDispatch();

  const { rows, loading, copiedRow } = useAppSelector(
    (state) => state.table
  );
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-10">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => dispatch(addRow())}
          className="
            flex
            items-center
            gap-2
            bg-red-700
            hover:bg-red-800
            text-white
            px-4
            py-2
            rounded-xl
            transition-all
          "
        >
          <AddIcon />
          إضافة سطر
        </button>
      </div>
      <table className="w-full border overflow-hidden rounded-2xl" dir="rtl">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-3 border border-gray-300 text-right font-medium">
              اسم الدراجة
            </th>

            <th className="px-3 py-3 border border-gray-300 text-right font-medium">
              رقم المحرك
            </th>

            <th className="px-3 py-3 border border-gray-300 text-center font-medium">
              إجراءات
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-all"
            >
              <td className="px-2.5 py-2.5 border-b border-gray-300">
                <input
                  type="text"
                  dir="ltr"
                  value={row.bikeName}
                  onChange={(e) =>
                    dispatch(
                      updateRow({
                        id: row.id,
                        field: "bikeName",
                        value: e.target.value,
                      })
                    )
                  }
                  className="
                    w-full
                    p-2.5
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                  "
                />
              </td>

              {/* engine number */}

              <td className="px-2.5 py-2.5 border-b border-gray-300">
                <input
                  type="text"
                  dir="ltr"
                  value={row.engineNumber}
                  onChange={(e) =>
                    dispatch(
                      updateRow({
                        id: row.id,
                        field: "engineNumber",
                        value: e.target.value,
                      })
                    )
                  }
                  className="
                    w-full
                    p-2.5
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                  "
                />
              </td>

              {/* actions: copy / paste / delete */}

              <td className="px-2.5 py-2.5 border-b border-gray-300 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => dispatch(copyRow(row.id))}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                    title="نسخ"
                  >
                    <ContentCopyIcon />
                  </button>

                  <button
                    onClick={() => dispatch(pasteRow(row.id))}
                    disabled={!copiedRow}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all disabled:opacity-50"
                    title="لصق"
                  >
                    <ContentPasteIcon />
                  </button>

                  <button
                    onClick={() =>
                      dispatch(deleteRow(row.id))
                    }
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all"
                    title="حذف"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;