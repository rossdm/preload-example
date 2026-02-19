import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$48,295",
    change: 12.5,
    icon: <AttachMoneyIcon />,
    color: "#1565c0",
  },
  {
    title: "Orders",
    value: "1,284",
    change: 8.2,
    icon: <ShoppingCartIcon />,
    color: "#2e7d32",
  },
  {
    title: "New Users",
    value: "642",
    change: -3.1,
    icon: <PersonAddIcon />,
    color: "#e91e63",
  },
  {
    title: "Page Views",
    value: "89,421",
    change: 24.7,
    icon: <VisibilityIcon />,
    color: "#ed6c02",
  },
];

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

const allActivities: Activity[] = [
  { id: 1, user: "Alice Chen", action: "placed order #1092", time: "2 min ago", avatar: "AC" },
  { id: 2, user: "Bob Martinez", action: "left a 5-star review", time: "8 min ago", avatar: "BM" },
  { id: 3, user: "Carol Kim", action: "signed up for Pro plan", time: "15 min ago", avatar: "CK" },
  { id: 4, user: "Dan Patel", action: "updated billing info", time: "22 min ago", avatar: "DP" },
  { id: 5, user: "Eva Novak", action: "submitted support ticket", time: "31 min ago", avatar: "EN" },
  { id: 6, user: "Frank Lee", action: "downloaded invoice #847", time: "45 min ago", avatar: "FL" },
  { id: 7, user: "Grace Tanaka", action: "completed onboarding", time: "1 hr ago", avatar: "GT" },
  { id: 8, user: "Hiro Suzuki", action: "cancelled subscription", time: "1.5 hr ago", avatar: "HS" },
];

export default function DashboardApp() {
  const [timeRange, setTimeRange] = useState<string>("week");
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleActivities = allActivities.slice(0, visibleCount);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={(_, v) => v && setTimeRange(v)}
          size="small"
        >
          <ToggleButton value="day">Day</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2, mb: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                <Avatar sx={{ bgcolor: stat.color, width: 40, height: 40 }}>
                  {stat.icon}
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {stat.value}
              </Typography>
              <Chip
                size="small"
                icon={stat.change > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                label={`${stat.change > 0 ? "+" : ""}${stat.change}%`}
                color={stat.change > 0 ? "success" : "error"}
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                vs last {timeRange}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Recent Activity
          </Typography>
          <List disablePadding>
            {visibleActivities.map((activity) => (
              <ListItem key={activity.id} divider>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.light", color: "primary.contrastText", fontSize: 14 }}>
                    {activity.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <strong>{activity.user}</strong> {activity.action}
                    </>
                  }
                  secondary={activity.time}
                />
              </ListItem>
            ))}
          </List>
          {visibleCount < allActivities.length && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setVisibleCount((c) => Math.min(c + 4, allActivities.length))}
              >
                Load More
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
