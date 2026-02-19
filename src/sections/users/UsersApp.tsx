import BusinessIcon from "@mui/icons-material/Business";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  department: string;
  phone: string;
  avatar: string;
  joined: string;
}

const users: User[] = [
  { id: 1, name: "Alice Chen", email: "alice@example.com", role: "Admin", department: "Engineering", phone: "(555) 100-0001", avatar: "AC", joined: "2024-03-12" },
  { id: 2, name: "Bob Martinez", email: "bob@example.com", role: "Editor", department: "Marketing", phone: "(555) 100-0002", avatar: "BM", joined: "2024-06-22" },
  { id: 3, name: "Carol Kim", email: "carol@example.com", role: "Admin", department: "Engineering", phone: "(555) 100-0003", avatar: "CK", joined: "2024-01-08" },
  { id: 4, name: "Dan Patel", email: "dan@example.com", role: "Viewer", department: "Finance", phone: "(555) 100-0004", avatar: "DP", joined: "2025-02-15" },
  { id: 5, name: "Eva Novak", email: "eva@example.com", role: "Editor", department: "Design", phone: "(555) 100-0005", avatar: "EN", joined: "2024-09-03" },
  { id: 6, name: "Frank Lee", email: "frank@example.com", role: "Viewer", department: "Support", phone: "(555) 100-0006", avatar: "FL", joined: "2025-01-20" },
  { id: 7, name: "Grace Tanaka", email: "grace@example.com", role: "Editor", department: "Marketing", phone: "(555) 100-0007", avatar: "GT", joined: "2024-07-14" },
  { id: 8, name: "Hiro Suzuki", email: "hiro@example.com", role: "Viewer", department: "Engineering", phone: "(555) 100-0008", avatar: "HS", joined: "2024-11-28" },
  { id: 9, name: "Ivy Rodriguez", email: "ivy@example.com", role: "Admin", department: "HR", phone: "(555) 100-0009", avatar: "IR", joined: "2024-04-05" },
  { id: 10, name: "Jake Thompson", email: "jake@example.com", role: "Viewer", department: "Sales", phone: "(555) 100-0010", avatar: "JT", joined: "2025-02-01" },
];

const roleColor: Record<string, "error" | "primary" | "default"> = {
  Admin: "error",
  Editor: "primary",
  Viewer: "default",
};

const avatarColors = ["#1565c0", "#2e7d32", "#e91e63", "#ed6c02", "#9c27b0", "#00838f"];

export default function UsersApp() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Users
      </Typography>

      <TextField
        placeholder="Search users..."
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
        <List disablePadding>
          {filtered.map((user, i) => (
            <ListItemButton
              key={user.id}
              divider={i < filtered.length - 1}
              selected={selectedUser?.id === user.id}
              onClick={() => setSelectedUser(user)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: avatarColors[user.id % avatarColors.length] }}>
                  {user.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`${user.department} · ${user.email}`}
              />
              <Chip label={user.role} color={roleColor[user.role]} size="small" variant="outlined" />
            </ListItemButton>
          ))}
          {filtered.length === 0 && (
            <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
              <Typography>No users match your search.</Typography>
            </Box>
          )}
        </List>
      </Card>

      <Drawer
        anchor="right"
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        PaperProps={{ sx: { width: 380, p: 3 } }}
      >
        {selectedUser && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">User Details</Typography>
              <IconButton onClick={() => setSelectedUser(null)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  fontSize: 28,
                  bgcolor: avatarColors[selectedUser.id % avatarColors.length],
                  mb: 1,
                }}
              >
                {selectedUser.avatar}
              </Avatar>
              <Typography variant="h6">{selectedUser.name}</Typography>
              <Chip
                label={selectedUser.role}
                color={roleColor[selectedUser.role]}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">Email</Typography>
                  <Typography variant="body2">{selectedUser.email}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">Phone</Typography>
                  <Typography variant="body2">{selectedUser.phone}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <BusinessIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">Department</Typography>
                  <Typography variant="body2">{selectedUser.department}</Typography>
                </Box>
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary">Joined</Typography>
                <Typography variant="body2">{selectedUser.joined}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Drawer>
    </Box>
  );
}
