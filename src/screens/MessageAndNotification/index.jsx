import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssistantIcon from '@mui/icons-material/Assistant';
import Paper from '@mui/material/Paper';

// Import components for each tab
import { Message } from './Message';
import { Notification } from './Notification';
import { Archive } from './Archive';

export function Charts() {
  return (
    <div className="relative h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        <FixedBottomNavigation />
      </div>
    </div>
  );
}

export function FixedBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box className="flex flex-col h-full">
      <CssBaseline />
      {/* Render components based on selected tab */}
      <div className="flex-1 overflow-auto p-4">
        {value === 0 && <Message />}
        {value === 1 && <Notification />}
        {value === 2 && <Archive />}
      </div>

      {/* Bottom Navigation */}
      <Paper sx={{ position: "relative", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          <BottomNavigationAction label="Notifications" icon={<NotificationsActiveIcon />} />
          <BottomNavigationAction label="Global notes" icon={<AssistantIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
