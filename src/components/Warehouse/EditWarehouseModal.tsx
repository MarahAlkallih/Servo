import { Modal } from "../global/Modal";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { GET_WAREHOUSE_BY_ID } from "../../graphql/queries/warehouses/warehouses";
import { EDIT_WAREHOUSES } from "../../graphql/mutition/warehouses/warehouses"
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { CancelBtn } from "../Button/Cancel"
import { useSelector } from "react-redux";
import { setBranches } from "../../features/filter/branches/customBranch";
import { GET_BRANCHES } from "../../graphql/queries/branches/branches";
import { toast } from "react-toastify";
import type { Branch } from "../../types/Branch"
import CustomDropdown from "../DropDown/CustomDropdown";
import type { RootState } from "../../app/store";

interface WarehouseEditModalProps {
    open: boolean;
    onClose: () => void;
    warehouseId?: number;

}

type WarehouseByIdResponse = {
    warehouse?: {
        id: number;
        name: string;
        address: string;
        isActive: boolean;
        branch: Branch

    };
};

export const EditWarehouseModal: React.FC<WarehouseEditModalProps> = ({ open, onClose, warehouseId: warehouseId }) => {
    const { allBranches } = useSelector((state: RootState) => (state.branch))
    const { data, loading, error: getWarehouseError } = useQuery<WarehouseByIdResponse>(GET_WAREHOUSE_BY_ID, {
        variables: {
            id: warehouseId,
        },
        skip: !warehouseId
    });
    const [branch, setBranch] = useState({
        name: data?.warehouse?.name,
        id: 0
    })
    console.log("data", data);
    const [form, setForm] = useState({
        name: "",
        address: "",
        isActive: true,
    });
  useEffect(() => {
  if (data?.warehouse) {
    setForm({
      name: data.warehouse.name,
      address: data.warehouse.address,
      isActive: data.warehouse.isActive,
    });

    setBranch({
      id: data.warehouse.branch.id,
      name: data.warehouse.branch.name,
    });
  }
}, [data]);
    const [editWarehouse, { error }] = useMutation(EDIT_WAREHOUSES,
        {
            variables: {
                id: warehouseId,
                input: form,
            }
        }
    )

    function handelEdit() {
        try {
            const res = editWarehouse();
            console.log(res)
            if (!error) {
                toast.success("تم التعديل بنجاح")
                onClose();
            }

        } catch (err) {
            console.log(err)
        }
    }

    const isActive = data?.warehouse?.isActive;
    function handleClose() {
        onClose();

    }

    return (
        <div className="w-full">


            <Modal open={open} onClose={onClose}  >
                {loading && <p>جاري التحميل...</p>}
                {getWarehouseError && <p>حدث خطأ أثناء تحميل بيانات ة.</p>}
                <h1 className="text-(--text-color) p-4 text-center text-1xl">
                    تعديل معلومات المخزن
                </h1>
                <div className="p-3 flex flex-col gap-3">
                    <InputField
                        label="اسم المخزن"
                        value={form.name}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                        icon={<BusinessOutlinedIcon fontSize="small" />}
                    />
                    <InputField
                        label="العنوان"
                        value={form.address}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, address: e.target.value }))
                        }
                        icon={<BusinessOutlinedIcon fontSize="small" />}
                    />

                </div>
                <CustomDropdown
                    options={allBranches}
                    labelKey="name"
                    valueKey="id"
                    placeholder={branch.name}
                    onSelect={(selectedId) => setBranch({ ...branch, id: Number(selectedId) })}
                />
                {/* {typeof isActive === "boolean" && (
  <button
    onClick={() => {
      setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
    }}
    className={`w-full mt-2 py-2 rounded-lg text-white
      ${isActive ? "bg-red-500" : "bg-green-500"}`}
  >
    {isActive ? "إلغاء تنشيط الفرع" : "تنشيط الفرع"}
  </button>
)}  */}
                <div className="flex justify-between pt-3">
                    <Button text="تعديل" onClick={handelEdit} />
                    <CancelBtn text="الغاء" onClick={handleClose} />
                </div>


            </Modal>
        </div>
    );
};