import * as React from "react";
import { Drawer, Button, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export const LeftDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value) => () => {
    setOpen(value);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Ouvrir menu
      </Button>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {["Accueil", "Profil", "Messages", "Paramètres"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
