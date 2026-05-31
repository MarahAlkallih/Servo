import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import type { RootState } from "../../app/store";
import { AddSubModal } from "../../components/branch/addSub";
import { EditBranchModal } from "../../components/branch/editBranchModal";
import { ConfirmModal } from "../../components/Confirm/ConfirmModal";
import { DELETE_BRANCH } from "../../graphql/mutition/branches/createBranch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "../../components/Button/Button";

export const Sub = () => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false); 
    const [selectedId, setSelectedId] = useState<number>(0);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const { subBranches, loading, error } = useSelector((state: RootState) => state.branch);
    const [deleteBranch] = useMutation(DELETE_BRANCH, {
        variables: { id: selectedId }
    });

    const handelDelete = async () => {
        try {
            const res = await deleteBranch();
            if (res.data) {
                toast.success("تم الحذف بنجاح");
                setIsOpenDelete(false);
              
            }
        } catch (err) {
            toast.error("حدث خطأ أثناء الحذف");
            console.log(err);
        }
    };

    return (
        <div>
            <div className="flex justify-between align-middle items-center mb-6">
                <h1 className="text-xl font-bold">الأفرع التابعة</h1>
                <Button text="إضافة فرع" onClick={() => setIsOpenAdd(true)} />
            </div>

            {/* حالات التحميل والأخطاء (إن كنتِ تديرينها عبر Redux) */}
            {loading && <p className="text-gray-500">جاري التحميل...</p>}
            {error && <p className="text-red-500">خطأ في تحميل الفروع</p>}

            {/* التحقق من وجود بيانات قبل عمل map */}
            {!loading && subBranches.length === 0 && (
                <p className="text-gray-400 mt-4 text-center">لا توجد أفرع تابعة حالياً.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 m-2">
                {subBranches?.map((m) => (
                    <div
                        key={m.id}
                        className=" width-fit  border border-gray-300 rounded-lg p-4 flex items-center justify-between gap-3 bg-(--bg-color)"
                    >
                        <div className="flex-1 text-right">
                            <h2 className="text-lg font-bold text-(--text-color)">{m.name}</h2>
                            <h3 className="text-sm text-(--text-color) mt-1">العنوان: {m.address}</h3>
                            <p className="text-sm text-(--text-color)">نوع الفرع: {m.type}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                                    m.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {m.isActive ? "نشطة" : "غير نشطة"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                                onClick={() => {
                                    setSelectedId(m.id);
                                    setIsOpenEdit(true);
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </button>

                            <button
                                className="p-2 rounded-md hover:bg-red-100 text-red-600 transition-colors"
                                onClick={() => {
                                    setSelectedId(m.id);
                                    setIsOpenDelete(true);
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* الـ Modals */}
            <AddSubModal
                open={isOpenAdd}
                onClose={() => setIsOpenAdd(false)}
            />
            <EditBranchModal
                open={isOpenEdit}
                branchId={selectedId}
                onClose={() => setIsOpenEdit(false)}
            />
            <ConfirmModal 
                open={isOpenDelete} 
                onClose={() => setIsOpenDelete(false)}
                description="هل انت متأكد من إتمام العملية وحذف الفرع؟"
                onConfirm={handelDelete} 
            />
        </div>
    );
};