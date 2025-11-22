import * as React from "react";
import { Drawer, Button, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LeftDrawerOrganizer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Tableau de bord", path: "/playerDashboard" },
    { text: "Tournois", path: "/tournaments" },
    { text: "Equipes", path: "/teams" },
    { text: "Adhesion", path: "/adhesionCreate" },
    { text: "Profil", path: "/playProfil" },
  ];

  const toggleDrawer = (value) => () => {
    setOpen(value);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Ouvrir menu
      </Button>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}