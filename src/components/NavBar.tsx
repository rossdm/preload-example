import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import routes, { type AppRoute } from "../routes";

const iconMap: Record<string, React.ElementType> = {
  Dashboard: DashboardIcon,
  Assessment: AssessmentIcon,
  Settings: SettingsIcon,
  People: PeopleIcon,
};

export default function NavBar() {
  const { pathname } = useLocation();

  const handleNav = useCallback(
    (path: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    },
    []
  );

  const handlePreload = useCallback(
    (route: AppRoute) => () => route.preload(),
    []
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        viewTransitionName: "navbar",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", mr: 4, userSelect: "none" }}
        >
          PreloadApp
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          {routes.map((route) => {
            const Icon = iconMap[route.icon];
            const isActive = pathname.startsWith(route.path);

            return (
              <Button
                key={route.path}
                component="a"
                href={route.path}
                startIcon={Icon ? <Icon /> : undefined}
                onClick={handleNav(route.path)}
                onMouseEnter={handlePreload(route)}
                onFocus={handlePreload(route)}
                sx={{
                  color: isActive ? "primary.main" : "text.secondary",
                  bgcolor: isActive ? "primary.main" : "transparent",
                  textDecoration: "none",
                  ...(isActive && {
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                  }),
                  px: 2,
                  borderRadius: 2,
                }}
              >
                {route.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
