import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_BRANCHES } from '../../graphql/queries/branches/branches';
import { setBranches } from '../../features/filter/branches/customBranch'; // عدلي المسار بحسب مشروعكِ
import type { GetBranchesResponse } from '../../types/Branch';

export const BranchesLayout = () => {
 const dispatch = useDispatch();
  

  const { data, loading, error } = useQuery<GetBranchesResponse>(GET_BRANCHES);

  useEffect(() => {
    if (data?.branches) {

      dispatch(setBranches(data.branches));
    }
  }, [data, dispatch]);

  if (loading) return <div className="p-6 text-(--text-color)">جاري تحميل الفروع...</div>;
  if (error) return <div className="p-6 text-red-500">حدث خطأ أثناء جلب البيانات: {error.message}</div>;

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
      isActive
        ? ' text-(--text-color) font-semibold'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  return (
    <div className="w-full min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text-color)">إدارة الفروع</h1>
      </div>

      <div className="border-b border-gray-200 mb-6 flex space-x-1 rtl:space-x-reverse">
        <NavLink to="main" className={tabClass}>الفرع الرئيسي</NavLink>
        <NavLink to="sub" className={tabClass}>الفرع الابن</NavLink>
      </div>

      <div className=" p-6 rounded-2xl shadow-sm border border-gray-100">
        <Outlet />
      </div>
    </div>
  );
};