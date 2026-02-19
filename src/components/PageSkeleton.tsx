import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function PageSkeleton() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Skeleton variant="text" width={260} height={48} sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width="25%"
            height={120}
            sx={{ borderRadius: 3 }}
          />
        ))}
      </Box>
      <Skeleton
        variant="rounded"
        width="100%"
        height={320}
        sx={{ borderRadius: 3 }}
      />
    </Box>
  );
}
