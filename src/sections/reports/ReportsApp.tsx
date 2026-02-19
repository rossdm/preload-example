import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

interface Report {
  id: number;
  name: string;
  category: string;
  status: "Completed" | "Pending" | "In Progress";
  date: string;
  amount: number;
}

const reports: Report[] = [
  { id: 1, name: "Q4 Revenue Summary", category: "Finance", status: "Completed", date: "2026-01-15", amount: 142500 },
  { id: 2, name: "User Growth Analysis", category: "Marketing", status: "Completed", date: "2026-01-20", amount: 0 },
  { id: 3, name: "Server Cost Breakdown", category: "Engineering", status: "In Progress", date: "2026-02-01", amount: 38750 },
  { id: 4, name: "Customer Churn Report", category: "Support", status: "Pending", date: "2026-02-10", amount: 0 },
  { id: 5, name: "Ad Campaign ROI", category: "Marketing", status: "Completed", date: "2026-01-28", amount: 24300 },
  { id: 6, name: "Annual Compliance Audit", category: "Legal", status: "In Progress", date: "2026-02-05", amount: 15000 },
  { id: 7, name: "Employee Satisfaction Survey", category: "HR", status: "Completed", date: "2026-01-12", amount: 0 },
  { id: 8, name: "Product Feature Usage", category: "Engineering", status: "Pending", date: "2026-02-15", amount: 0 },
  { id: 9, name: "Vendor Spend Analysis", category: "Finance", status: "Completed", date: "2026-01-30", amount: 67800 },
  { id: 10, name: "SEO Performance Report", category: "Marketing", status: "In Progress", date: "2026-02-08", amount: 0 },
];

type SortKey = "name" | "category" | "status" | "date" | "amount";
type Order = "asc" | "desc";

const statusColor: Record<string, "success" | "warning" | "info"> = {
  Completed: "success",
  Pending: "warning",
  "In Progress": "info",
};

export default function ReportsApp() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [order, setOrder] = useState<Order>("desc");
  const [selected, setSelected] = useState<Report | null>(null);

  const handleSort = (key: SortKey) => {
    setOrder(sortKey === key && order === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const list = reports.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return order === "asc" ? cmp : -cmp;
    });
    return list;
  }, [search, sortKey, order]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reports
      </Typography>

      <TextField
        placeholder="Search reports..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2, width: 320 }}
      />

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {(
                  [
                    ["name", "Report Name"],
                    ["category", "Category"],
                    ["status", "Status"],
                    ["date", "Date"],
                    ["amount", "Amount"],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={sortKey === key}
                      direction={sortKey === key ? order : "asc"}
                      onClick={() => handleSort(key)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSelected(row)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color={statusColor[row.status]} size="small" />
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    {row.amount ? `$${row.amount.toLocaleString()}` : "—"}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    No reports match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <>
            <DialogTitle>{selected.name}</DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                <strong>Category:</strong> {selected.category}
              </Typography>
              <Typography gutterBottom>
                <strong>Status:</strong>{" "}
                <Chip label={selected.status} color={statusColor[selected.status]} size="small" />
              </Typography>
              <Typography gutterBottom>
                <strong>Date:</strong> {selected.date}
              </Typography>
              <Typography gutterBottom>
                <strong>Amount:</strong>{" "}
                {selected.amount ? `$${selected.amount.toLocaleString()}` : "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                This is a placeholder for the full report content. In a real application this
                would contain charts, tables, and detailed analysis for the{" "}
                {selected.category.toLowerCase()} department.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelected(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
