import {
  Building2, ClipboardList, CreditCard, FileText, LayoutDashboard,
  PlusCircle, UserRound, Users, Wallet, Wrench, type LucideIcon,
} from "lucide-react";
import type { Role } from "@/types";

export const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Browse Rooms" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  ADMIN: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/reports", label: "Reports", icon: FileText },
  ],
  TENANT: [
    { href: "/dashboard", label: "My Activity", icon: LayoutDashboard },
    { href: "/dashboard/roommates", label: "Roommates", icon: Users },
    { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
    { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  ],
  OWNER: [
    { href: "/provider", label: "My Listings", icon: Building2 },
    { href: "/provider/applications", label: "Applications", icon: ClipboardList },
    { href: "/provider/earnings", label: "Earnings", icon: Wallet },
    { href: "/provider/properties/new", label: "New Listing", icon: PlusCircle },
    { href: "/provider/profile", label: "Profile", icon: UserRound },
  ],
};