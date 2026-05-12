import type { MenuItem } from "../../types/MenuItem";

import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
export const menuItems: MenuItem[] = [
  { icon: BarChartIcon, label: "الاحصائيات", path: "/statistics" },
  { icon: PeopleIcon, label: "المستخدمون", path: "/users" },
  { icon: AdminPanelSettingsIcon, label: "الأدوار", path: "/roles" },
  { icon: TwoWheelerIcon, label: "الدراجات", path: "/motors" },
  { icon: BusinessIcon, label: "الشركات", path: "/companies" },
  { icon: LocalShippingIcon, label: "موردين", path: "/suppliers" },
  { icon: ReceiptLongIcon, label: "فواتير", path: "/invoices" },
];