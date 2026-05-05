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
  ListItemAvatar,
  Slide,
  Paper,
  Grow,
  ClickAwayListener,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";

// === SlidePanel Component ===
const SlidePanel = ({ open, onClose, children, isMobile }) => {
  const panelWidth = isMobile ? "90%" : 320;

  return (
    // ClickAwayListener inafunga paneli inapotoka nje yake
    <ClickAwayListener onClickAway={onClose}>
      <Slide
        direction={isMobile ? "up" : "left"}
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <Paper
          elevation={16}
          sx={{
            position: "fixed",
            bottom: isMobile ? 0 : 0,
            top: isMobile ? "auto" : 0,
            right: isMobile ? "5%" : 0,
            height: isMobile ? "50vh" : "100vh",
            width: panelWidth,
            maxWidth: "100%",
            zIndex: 2000,
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: isMobile ? "16px 16px 0 0" : 0,
          }}
        >
          {children}
        </Paper>
      </Slide>
    </ClickAwayListener>
  );
};

export function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [profileAnchor, setProfileAnchor] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [msgTab, setMsgTab] = useState(0);
  const [notifTab, setNotifTab] = useState(0);
  const [profileTab, setProfileTab] = useState(0);

  // 🔥 MANTIKI ILIYOREKEBISHWA
  const handleMessageToggle = () => {
    // 1. Funga paneli nyingine
    if (notificationOpen) { 
      setNotificationOpen(false);
    }
    // 2. Geuza hali ya paneli hii (functional update)
    setMessageOpen(prev => !prev); 
  };

  const handleNotificationToggle = () => {
    // 1. Funga paneli nyingine
    if (messageOpen) {
      setMessageOpen(false);
    }
    // 2. Geuza hali ya paneli hii (functional update)
    setNotificationOpen(prev => !prev); 
  };

  const handleCloseProfileMenu = () => setProfileAnchor(null);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid #e0e0e0",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        {/* LEFT SECTION */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={toggleSidebar} color="success">
            <MenuIcon />
          </IconButton>
        </Box>

        {/* RIGHT SECTION */}
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Messages">
            <IconButton
              color="default"
              onClick={handleMessageToggle}
              sx={{ 
                "&:hover": { bgcolor: "rgba(76,175,80,0.08)" }, 
                bgcolor: messageOpen ? "rgba(76,175,80,0.15)" : "transparent",
                transition: "0.2s" 
              }}
            >
              <Badge
                badgeContent={3}
                color="error"
                sx={{ "& .MuiBadge-badge": { minWidth: 16, height: 16, fontSize: 10, fontWeight: 600 } }}
              >
                <ChatIcon fontSize="small" sx={{ color: "text.primary" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              color="default"
              onClick={handleNotificationToggle}
              sx={{ 
                "&:hover": { bgcolor: "rgba(76,175,80,0.08)" }, 
                bgcolor: notificationOpen ? "rgba(76,175,80,0.15)" : "transparent",
                transition: "0.2s" 
              }}
            >
              <Badge
                badgeContent={7}
                color="warning"
                sx={{ "& .MuiBadge-badge": { minWidth: 16, height: 16, fontSize: 10, fontWeight: 600 } }}
              >
                <NotificationsIcon fontSize="small" sx={{ color: "text.primary" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton
              onClick={(e) => setProfileAnchor(profileAnchor ? null : e.currentTarget)}
              sx={{ "&:hover": { bgcolor: "rgba(76,175,80,0.08)" }, transition: "0.2s" }}
            >
              <Avatar sx={{ bgcolor: "success.main", width: 28, height: 28 }}>A</Avatar>
            </IconButton>
          </Tooltip>
        </Box>

      </Toolbar>

      {/* 1. Messages Panel (Right Sidebar) */}
      <SlidePanel open={messageOpen} onClose={() => setMessageOpen(false)} isMobile={isMobile}>
        <Tabs
          value={msgTab}
          onChange={(e, v) => setMsgTab(v)}
          variant="fullWidth"
          textColor="success"
          indicatorColor="success"
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <Tab label="Inbox" />
          <Tab label="Sent" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {msgTab === 0 ? (
            <List dense>
              <ListItem component="button" sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }} onClick={handleMessageToggle}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "success.main" }}>J</Avatar>
                </ListItemAvatar>
                <ListItemText primary="John Doe" secondary="Hey, are we still meeting today?" />
              </ListItem>
              <Divider component="li" sx={{ my: 0.5 }} />
              <ListItem component="button" sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }} onClick={handleMessageToggle}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "info.main" }}>S</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Sarah Kim" secondary="Project updates have been uploaded." />
              </ListItem>
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No sent messages yet.
            </Typography>
          )}
        </Box>
      </SlidePanel>

      {/* 2. Notifications Panel (Right Sidebar) */}
      <SlidePanel open={notificationOpen} onClose={() => setNotificationOpen(false)} isMobile={isMobile}>
        <Tabs
          value={notifTab}
          onChange={(e, v) => setNotifTab(v)}
          variant="fullWidth"
          textColor="success"
          indicatorColor="success"
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <Tab label="All" />
          <Tab label="Unread" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {notifTab === 0 ? (
            <List dense>
              <ListItem component="button" sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }} onClick={() => setNotificationOpen(false)}>
                <ListItemText primary="New Incident Reported" secondary="INC-2024-0043 filed by Safety Team" />
              </ListItem>
              <Divider component="li" sx={{ my: 0.5 }} />
              <ListItem component="button" sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }} onClick={() => setNotificationOpen(false)}>
                <ListItemText primary="Audit Scheduled" secondary="Q3 Compliance Audit set for next Monday" />
              </ListItem>
              <Divider component="li" sx={{ my: 0.5 }} />
              <ListItem component="button" sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }} onClick={() => setNotificationOpen(false)}>
                <ListItemText primary="Training Complete" secondary="John Doe finished Fire Safety Training" />
              </ListItem>
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              You have 7 unread notifications.
            </Typography>
          )}
        </Box>
      </SlidePanel>

      {/* 3. Profile Menu (Dropdown) */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleCloseProfileMenu}
        TransitionComponent={Grow}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 280, borderRadius: 3, overflow: "hidden", mt: 1.5 } }}
      >
        <Tabs
          value={profileTab}
          onChange={(e, v) => setProfileTab(v)}
          variant="fullWidth"
          textColor="success"
          indicatorColor="success"
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <Tab label="Profile" />
          <Tab label="Settings" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {profileTab === 0 ? (
            <>
              <Typography variant="subtitle1" fontWeight="600">Admin User</Typography>
              <Typography variant="body2" color="text.secondary">admin@example.com</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" sx={{ cursor: "pointer", color: "success.main", '&:hover': { textDecoration: 'underline' } }} onClick={handleCloseProfileMenu}>View Profile</Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", mt: 1, color: "error.main", '&:hover': { textDecoration: 'underline' } }} onClick={handleCloseProfileMenu}>Logout</Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ cursor: "pointer", '&:hover': { color: 'success.main' } }} onClick={handleCloseProfileMenu}>Account Settings</Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", mt: 1, '&:hover': { color: 'success.main' } }} onClick={handleCloseProfileMenu}>Privacy & Security</Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", mt: 1, '&:hover': { color: 'success.main' } }} onClick={handleCloseProfileMenu}>Notification Preferences</Typography>
            </>
          )}
        </Box>
      </Menu>
    </AppBar>
  );
}