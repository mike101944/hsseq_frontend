import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { getPageTitle, getBreadcrumb } from "./navigationUtils";

export function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const path = location.pathname;

  const [profileAnchor, setProfileAnchor] = useState(null);
  const [messageAnchor, setMessageAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  return (
    <AppBar
      position="relative"
      color="inherit"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT SECTION */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={toggleSidebar} color="success">
            <MenuIcon />
          </IconButton>
        </Box>

        {/* RIGHT SECTION */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* 📨 MESSAGES DROPDOWN */}
          <Tooltip title="Messages">
            <IconButton color="default" onClick={handleMenuOpen(setMessageAnchor)}>
              <Badge badgeContent={3} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={messageAnchor}
            open={Boolean(messageAnchor)}
            onClose={handleMenuClose(setMessageAnchor)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: { width: 320, borderRadius: 2, overflow: "hidden", mt: 1 },
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="success"
              indicatorColor="success"
              sx={{ borderBottom: "1px solid #e0e0e0" }}
            >
              <Tab label="Inbox" />
              <Tab label="Sent" />
            </Tabs>

            <Box sx={{ p: 1 }}>
              {tabValue === 0 && (
                <List>
                  <ListItem button>
                    <ListItemText
                      primary="John Doe"
                      secondary="Hey, are we still meeting today?"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Jane Smith"
                      secondary="Don’t forget to send the report."
                    />
                  </ListItem>
                </List>
              )}
              {tabValue === 1 && (
                <Typography variant="body2" color="text.secondary">
                  No sent messages.
                </Typography>
              )}
            </Box>
          </Menu>

          {/* 🔔 NOTIFICATIONS DROPDOWN */}
          <Tooltip title="Notifications">
            <IconButton
              color="default"
              onClick={handleMenuOpen(setNotificationAnchor)}
            >
              <Badge badgeContent={7} color="warning">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleMenuClose(setNotificationAnchor)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: { width: 320, borderRadius: 2, overflow: "hidden", mt: 1 },
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="success"
              indicatorColor="success"
              sx={{ borderBottom: "1px solid #e0e0e0" }}
            >
              <Tab label="All" />
              <Tab label="Unread" />
            </Tabs>

            <Box sx={{ p: 1 }}>
              {tabValue === 0 && (
                <List>
                  <ListItem>
                    <ListItemText
                      primary="New order received"
                      secondary="You have a new order #1234"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="System update"
                      secondary="Version 2.0 deployed successfully"
                    />
                  </ListItem>
                </List>
              )}
              {tabValue === 1 && (
                <Typography variant="body2" color="text.secondary">
                  You have 2 unread notifications.
                </Typography>
              )}
            </Box>
          </Menu>

          {/* 👤 PROFILE DROPDOWN */}
          <Box>
            <IconButton onClick={handleMenuOpen(setProfileAnchor)}>
              <Avatar sx={{ bgcolor: "success.main", width: 36, height: 36 }}>
                A
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleMenuClose(setProfileAnchor)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: { width: 280, borderRadius: 2, overflow: "visible", mt: 1 },
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="success"
                indicatorColor="success"
                sx={{ borderBottom: "1px solid #e0e0e0" }}
              >
                <Tab label="Profile" />
                <Tab label="Settings" />
              </Tabs>

              <Box sx={{ p: 2 }}>
                {tabValue === 0 && (
                  <>
                    <Typography variant="subtitle1" fontWeight="600">
                      Admin User
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      admin@example.com
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2" sx={{ cursor: "pointer" }}>
                      View Profile
                    </Typography>
                    <Typography variant="body2" sx={{ cursor: "pointer", mt: 1 }}>
                      Logout
                    </Typography>
                  </>
                )}
                {tabValue === 1 && (
                  <>
                    <Typography variant="body2" sx={{ cursor: "pointer" }}>
                      Account Settings
                    </Typography>
                    <Typography variant="body2" sx={{ cursor: "pointer", mt: 1 }}>
                      Privacy & Security
                    </Typography>
                    <Typography variant="body2" sx={{ cursor: "pointer", mt: 1 }}>
                      Notification Preferences
                    </Typography>
                  </>
                )}
              </Box>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
