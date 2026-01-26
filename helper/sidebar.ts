import {
  LayoutGrid,
  User,
  List,
  SquarePlus,
  UserPlus,
  Plus,
  Phone,
  CheckCheck,
  Shield,
  UserStar,
  LogOut,
  UserPen,
  CreditCard,
  PanelBottom,
  FileTerminal,
  Users,
  Calculator,
} from "lucide-react";

export const sidebarMenu = [
  { id: 1, label: "Overview", icon: LayoutGrid, path: "/dashboard" },
  {
    id: 2,
    label: "All Job Seeker",
    icon: User,
    path: "/dashboard/all-job-seeker",
  },
  {
    id: 3,
    label: "All Employer List",
    icon: Users,
    path: "/dashboard/all-employee-list",
  },
  {
    id: 4,
    label: "Category System",
    icon: List,
    path: "/dashboard/all-category",
  },
  {
    id: 5,
    label: "Subscription Plan",
    icon: SquarePlus,
    path: "/dashboard/subscription",
  },
  {
    id: 6,
    label: "Subscribed  Users",
    icon: UserPlus,
    path: "/dashboard/subscriber-users",
  },
  {
    id: 20,
    label: "Payment/Invoices",
    icon: CreditCard,
    path: "/dashboard/payment-invoices",
  },
  {
    id: 7,
    label: "Upload Documents",
    icon: Plus,
    path: "/dashboard/upload-document",
  },

  { id: 9, label: "Support Request", icon: Phone, path: "/dashboard/support" },
  {
    id: 10,
    label: "Verify Request",
    icon: CheckCheck,
    path: "/dashboard/verify-request",
  },

  {
    id: 11,
    label: "Privacy Policy",
    icon: Shield,
    path: "/dashboard/privacy-policy",
  },
  {
    id: 12,
    label: "Terms & Condition",
    icon: FileTerminal,
    path: "/dashboard/terms-condition",
  },
  {
    id: 14,
    label: "Impressum",
    icon: PanelBottom,
    path: "/dashboard/impressum",
  },
  {
    id: 13,
    label: "Create Sub Admin",
    icon: UserStar,
    path: "/dashboard/sub-admin",
  },
  { id: 8, label: "My Profile", icon: UserPen, path: "/dashboard/my-profile" },
  // {
  //   id: 21,
  //   label: "My Number",
  //   icon: Phone,
  //   path: "/dashboard/number-verification",
  // },
  // {
  //   id: 22,
  //   label: "Tax Calculator",
  //   icon: Calculator,
  //   path: "/dashboard/tax",
  // },
  {
    id: 23,
    label: "Manage Contact Info",
    icon: Phone,
    path: "/dashboard/contact",
  },
];

export const serverSidebarItem = sidebarMenu?.map((item) => ({
  label: item.label,
  path: item.path,
}));
