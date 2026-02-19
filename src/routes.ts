import { lazy, type ComponentType } from "react";

export interface AppRoute {
  path: string;
  label: string;
  icon: string; // MUI icon name — mapped in NavBar
  component: React.LazyExoticComponent<ComponentType>;
  preload: () => Promise<unknown>;
}

const dashboardImport = () => import("./sections/dashboard/DashboardApp");
const reportsImport = () => import("./sections/reports/ReportsApp");
const settingsImport = () => import("./sections/settings/SettingsApp");
const usersImport = () => import("./sections/users/UsersApp");

const routes: AppRoute[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "Dashboard",
    component: lazy(dashboardImport),
    preload: dashboardImport,
  },
  {
    path: "/reports",
    label: "Reports",
    icon: "Assessment",
    component: lazy(reportsImport),
    preload: reportsImport,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: "Settings",
    component: lazy(settingsImport),
    preload: settingsImport,
  },
  {
    path: "/users",
    label: "Users",
    icon: "People",
    component: lazy(usersImport),
    preload: usersImport,
  },
];

export default routes;
