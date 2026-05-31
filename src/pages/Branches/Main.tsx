import { useState } from "react"
import { Button } from "../../components/Button/Button"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_BRANCHES } from '../../graphql/queries/branches/branches';
import { setBranches } from '../../features/filter/branches/customBranch'; // عدلي المسار بحسب مشروعكِ
import type { GetBranchesResponse } from '../../types/Branch';
import { AddMianModal } from "../../components/branch/addBranch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditBranchModal } from "../../components/branch/editBranchModal";
import { DELETE_BRANCH } from "../../graphql/mutition/branches/createBranch";
import { ConfirmModal } from "../../components/Confirm/ConfirmModal";
import { toast } from "react-toastify";
import type { RootState } from "../../app/store";
export const Main = () => {
    const dispatch = useDispatch();
  const { data, loading, error } = useQuery<GetBranchesResponse>(
  GET_BRANCHES,
  {
    fetchPolicy: "network-only",
  }
);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDlete, setIsOpenDelete] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0);
    const { mainBranches } = useSelector((state: RootState) => state.branch);
    const [deleteBranch, { error: deleteErrror }] = useMutation(DELETE_BRANCH,


        {
            variables: {
                id: selectedId
            }
        }
    )
    useEffect(() => {
        if (data?.branches) {

            dispatch(setBranches(data.branches));
        }
    }, [data, dispatch]);
    console.log(data?.branches);
    const [isOpenAdd, setIsOpenAddd] = useState(false)
    function handelDelete() {
        try {
            console.log(selectedId)
            const res = deleteBranch();
            setIsOpenDelete(false);

            console.log(res)

        } catch (err) {
            toast.error("حدث خطا ما")
        }
    }

    return (
        <div>
            <div className="flex justify-between align-middle items-center">
                <h1 className="text-1xl text-(--text-color)">رئيسي</h1>
                <Button text="اضافة فرع" onClick={() => setIsOpenAddd(true)} />
            </div>
            {loading && <p>جاري التحميل...</p>}

            {error && <p>خطأ في تحميل الشركات</p>}

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 m-2">
                {mainBranches?.map((m) => (
                    <div
                        key={m.id}
                        className="border w-fit border-gray-300 rounded-lg p-4 flex items-center justify-between gap-3"
                    >

                        <div className="flex-1 text-right">
                            <h2 className="text-lg font-bold">{m.name}</h2>
                            <h3>العنوان: {m.address}</h3>
                            <p>نوع الفرع:{m.type}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full mt-1 inline-block
          ${m.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {m.isActive ? "نشطة" : "غير نشطة"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="p-2 rounded-md hover:bg-gray-100"
                                onClick={() => {

                                    setSelectedId(m.id);
                                    setIsOpenEdit(true)
                                    // setIsEditCompanyOpen(true);
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </button>

                            <button className="p-2 rounded-md hover:bg-red-100 text-red-600"
                                onClick={() => {
                                    setIsOpenDelete(true)
                                    setSelectedId(m.id);

                                }

                                }>
                                <DeleteIcon fontSize="small" />
                            </button>
                        </div>

                    </div>
                ))}
                <AddMianModal
                    open={isOpenAdd}
                    onClose={() => setIsOpenAddd(false)}
                />
                <EditBranchModal
                    open={isOpenEdit}
                    branchId={selectedId}
                    onClose={() => setIsOpenEdit(false)}
                />
                <ConfirmModal open={isOpenDlete} onClose={() => setIsOpenDelete(false)}
                    description="هل انت متأكد من اتمام العملية ؟"
                    onConfirm={handelDelete} />

            </div>
        </div>

    );
}