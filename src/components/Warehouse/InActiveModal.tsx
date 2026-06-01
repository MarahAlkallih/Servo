import { Modal } from "../global/Modal";
import { GET_WAREHOUSE_BY_ID, GET_WAREHOUSES } from "../../graphql/queries/warehouses/warehouses";
import { DELETE_WAREHOUSES } from "../../graphql/mutition/warehouses/warehouses"
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import { CancelBtn } from "../Button/Cancel"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { Branch } from "../../types/Branch"
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

export const EditActiveWarehouseModal: React.FC<WarehouseEditModalProps> = ({ open, onClose, warehouseId: warehouseId }) => {
    useSelector((state: RootState) => (state.branch))
   const { data } = useQuery<WarehouseByIdResponse>(
  GET_WAREHOUSE_BY_ID,
  {
    variables: {
      id: warehouseId,
    },
    skip: !warehouseId,
  }
);
    const [deleteWarehouse, { error ,loading}] = useMutation(DELETE_WAREHOUSES, {
        variables: {
            id: warehouseId,
        },
          refetchQueries: [GET_WAREHOUSES],
    });
   const isActive=data?.warehouse?.isActive;

    function handelConfirm() {
        try {
            const res = deleteWarehouse();
            console.log(res)
            if (!error) {
                toast.success("تم التعديل بنجاح")
                onClose();
            }

        } catch (err) {
            console.log(err)
        }
    }

    function handleClose() {
        onClose();

    }

    return (
        <div className="w-full">


            <Modal open={open} onClose={onClose}  >
              
                <h1 className="text-(--text-color) p-4 text-center text-1xl">
                الغاء تنشيط المخزن
                </h1>
               
                {typeof isActive === "boolean" && (
  <button
    onClick={() => {
      handelConfirm();
    }}
    className={`w-full mt-2 py-2 rounded-lg text-(--text-color)  cursor-pointer
      ${isActive ? "bg-red-500" : "bg-green-500"}`}
  >
    {loading?"جاري المعالجة...": isActive ? "إلغاء تنشيط المخزن" : "تنشيط المخزن"}
    
  </button>
)} 
                <div className="flex justify-between pt-3">
                    {/* <Button text="تأكيد" onClick={handelEdit} /> */}
                    <CancelBtn text="الغاء" onClick={handleClose} />
                </div>


            </Modal>
        </div>
    );
};