import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function TabPanel({ value, index, children }: { value: number; index: number; children: React.ReactNode }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

export default function SettingsApp() {
  const [tab, setTab] = useState(0);
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    displayName: "Jane Doe",
    email: "jane.doe@example.com",
    language: "en",
    timezone: "America/New_York",
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    pushNotifications: true,
    weeklyReport: false,
    mentionAlerts: true,
    marketingEmails: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
  });

  const handleSave = () => setSaved(true);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Card>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <Tab label="General" />
          <Tab label="Notifications" />
          <Tab label="Security" />
        </Tabs>

        <CardContent>
          <TabPanel value={tab} index={0}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 480 }}>
              <TextField
                label="Display Name"
                value={general.displayName}
                onChange={(e) => setGeneral((s) => ({ ...s, displayName: e.target.value }))}
              />
              <TextField
                label="Email"
                type="email"
                value={general.email}
                onChange={(e) => setGeneral((s) => ({ ...s, email: e.target.value }))}
              />
              <TextField
                label="Language"
                select
                value={general.language}
                onChange={(e) => setGeneral((s) => ({ ...s, language: e.target.value }))}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Espa&ntilde;ol</MenuItem>
                <MenuItem value="fr">Fran&ccedil;ais</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </TextField>
              <TextField
                label="Timezone"
                select
                value={general.timezone}
                onChange={(e) => setGeneral((s) => ({ ...s, timezone: e.target.value }))}
              >
                <MenuItem value="America/New_York">Eastern (ET)</MenuItem>
                <MenuItem value="America/Chicago">Central (CT)</MenuItem>
                <MenuItem value="America/Denver">Mountain (MT)</MenuItem>
                <MenuItem value="America/Los_Angeles">Pacific (PT)</MenuItem>
                <MenuItem value="Europe/London">GMT</MenuItem>
              </TextField>
              <Button variant="contained" sx={{ alignSelf: "flex-start" }} onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 480 }}>
              {(
                [
                  ["emailDigest", "Daily email digest"],
                  ["pushNotifications", "Push notifications"],
                  ["weeklyReport", "Weekly summary report"],
                  ["mentionAlerts", "Mention alerts"],
                  ["marketingEmails", "Marketing emails"],
                ] as const
              ).map(([key, label]) => (
                <Box key={key}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications[key]}
                        onChange={(e) =>
                          setNotifications((s) => ({ ...s, [key]: e.target.checked }))
                        }
                      />
                    }
                    label={label}
                  />
                  <Divider />
                </Box>
              ))}
              <Button variant="contained" sx={{ alignSelf: "flex-start", mt: 2 }} onClick={handleSave}>
                Save Preferences
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 480 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={security.twoFactor}
                    onChange={(e) => setSecurity((s) => ({ ...s, twoFactor: e.target.checked }))}
                  />
                }
                label="Enable two-factor authentication"
              />
              {security.twoFactor && (
                <Alert severity="info">
                  Two-factor authentication is enabled. You'll be prompted for a code on login.
                </Alert>
              )}
              <TextField
                label="Session Timeout (minutes)"
                select
                value={security.sessionTimeout}
                onChange={(e) => setSecurity((s) => ({ ...s, sessionTimeout: e.target.value }))}
              >
                <MenuItem value="15">15 minutes</MenuItem>
                <MenuItem value="30">30 minutes</MenuItem>
                <MenuItem value="60">1 hour</MenuItem>
                <MenuItem value="480">8 hours</MenuItem>
              </TextField>
              <Divider />
              <Button variant="outlined" color="error">
                Change Password
              </Button>
              <Button variant="contained" sx={{ alignSelf: "flex-start" }} onClick={handleSave}>
                Save Security Settings
              </Button>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      <Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)}>
        <Alert severity="success" onClose={() => setSaved(false)} variant="filled">
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
