import Box from "@mui/material/Box";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PageSkeleton from "./components/PageSkeleton";
import routes from "./routes";

export default function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: "64px", bgcolor: "background.default" }}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={`${route.path}/*`}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}
