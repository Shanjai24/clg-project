// import React, { useState } from "react";
// import { Box, Button } from "@mui/material";
// import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const DatePicker = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs("2025-06-14"));

//   return (
//     <Box
//       sx={{
//         width: 320,
//         p: 2,
//         borderRadius: 3,
//         boxShadow: 3,
//         bgcolor: "white",
//         textAlign: "center",
//       }}
//     >
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
//       </LocalizationProvider>
//     </Box>
//   );
// };

// export default DatePicker;


import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Box, 
  IconButton, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Fab,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon, 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { 
  format, 
  addWeeks, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  addDays,
  isSameDay, 
  parseISO,
  isWithinInterval,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  differenceInMinutes
} from 'date-fns';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

// Content status options with colors exactly matching the image
const contentStatusOptions = [
  { value: 'grievance', label: 'Grievance Meeting', color: '#c8e6c9' },
  { value: 'academic', label: 'Academic Meeting', color: '#bbdefb' },
  { value: 'scheduled', label: 'Scheduled Meeting', color: '#ffe0b2' },
  { value: 'group', label: 'Group Meeting', color: '#f8bbd0' },
];

// Generate all hours for the day (1 AM to 11 PM as in the image)
const generateHours = () => {
  const hours = [];
  for (let i = 1; i <= 24; i++) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 || i === 24 ? 'AM' : 'PM';
    hours.push({ hour: i, display: `${hour} ${period}` });
  }
  return hours;
};

export default function WeeklyContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 16)); // January 16, 2025
  const [calendarItems, setCalendarItems] = useState([
    {
      id: 1,
      title: 'Grievance Meeting',
      contentType: 'meeting',
      status: 'grievance',
      date: new Date(2025, 0, 14, 9, 0).toISOString(), // Jan 14, 9:00 AM
      endTime: new Date(2025, 0, 14, 10, 0).toISOString(), // Jan 14, 10:00 AM
    },
    {
      id: 2,
      title: 'Academic Meeting',
      contentType: 'meeting',
      status: 'academic',
      date: new Date(2025, 0, 15, 9, 0).toISOString(), // Jan 15, 9:00 AM
      endTime: new Date(2025, 0, 15, 10, 0).toISOString(), // Jan 15, 10:00 AM
    },
    {
      id: 3,
      title: 'Scheduled Meeting',
      contentType: 'meeting',
      status: 'scheduled',
      date: new Date(2025, 0, 16, 10, 0).toISOString(), // Jan 16, 10:00 AM
      endTime: new Date(2025, 0, 16, 11, 0).toISOString(), // Jan 16, 11:00 AM
    },
    {
      id: 4,
      title: 'Grievance Meeting',
      contentType: 'meeting',
      status: 'grievance',
      date: new Date(2025, 0, 17, 9, 0).toISOString(), // Jan 17, 9:00 AM
      endTime: new Date(2025, 0, 17, 10, 10).toISOString(), // Jan 17, 10:10 AM
    },
    {
      id: 5,
      title: 'Grievance Meeting',
      contentType: 'meeting',
      status: 'group',
      date: new Date(2025, 0, 16, 10, 0).toISOString(), // Jan 16, 10:00 AM
      endTime: new Date(2025, 0, 16, 13, 0).toISOString(), // Jan 16, 1:00 PM
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'meeting',
    status: 'grievance',
    date: new Date(),
    endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
  });

  // Calendar navigation handlers
  const handlePrevWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  // Dialog handlers
  const handleOpenDialog = (date, hourIndex, item = null) => {
    const selectedDateTime = new Date(date);
    
    // Set the hour based on the clicked time slot
    if (hourIndex !== undefined) {
      selectedDateTime.setHours(hourIndex);
      selectedDateTime.setMinutes(0);
    }
    
    setSelectedDateTime(selectedDateTime);
    
    if (item) {
      setSelectedItem(item);
      const startDate = new Date(item.date);
      const endDate = new Date(item.endTime);
      
      setFormData({
        title: item.title,
        description: item.description || '',
        contentType: item.contentType || 'meeting',
        status: item.status,
        date: startDate,
        endTime: endDate,
      });
    } else {
      setSelectedItem(null);
      const endTime = new Date(selectedDateTime);
      endTime.setHours(endTime.getHours() + 1);
      
      setFormData({
        title: '',
        description: '',
        contentType: 'meeting',
        status: 'grievance',
        date: selectedDateTime,
        endTime: endTime,
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleStartTimeChange = (time) => {
    if (!time) return;
    
    const newDate = new Date(formData.date);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const handleEndTimeChange = (time) => {
    if (!time) return;
    
    const newEndTime = new Date(formData.endTime);
    newEndTime.setHours(time.getHours());
    newEndTime.setMinutes(time.getMinutes());
    
    setFormData({
      ...formData,
      endTime: newEndTime,
    });
  };

  // Save content item
  const handleSaveItem = () => {
    if (!formData.title.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a title for your content',
        severity: 'error'
      });
      return;
    }

    const newItem = {
      id: selectedItem ? selectedItem.id : Date.now(),
      title: formData.title,
      description: formData.description,
      contentType: formData.contentType,
      status: formData.status,
      date: formData.date.toISOString(),
      endTime: formData.endTime.toISOString(),
    };

    if (selectedItem) {
      // Update existing item
      setCalendarItems(
        calendarItems.map((item) => (item.id === selectedItem.id ? newItem : item))
      );
      setSnackbar({
        open: true, 
        message: 'Content updated successfully', 
        severity: 'success'
      });
    } else {
      // Add new item
      setCalendarItems([...calendarItems, newItem]);
      setSnackbar({
        open: true, 
        message: 'Content added successfully', 
        severity: 'success'
      });
    }

    handleCloseDialog();
  };

  // Delete content item
  const handleDeleteItem = () => {
    if (selectedItem) {
      setCalendarItems(calendarItems.filter((item) => item.id !== selectedItem.id));
      setSnackbar({
        open: true, 
        message: 'Content deleted successfully', 
        severity: 'info'
      });
      handleCloseDialog();
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Generate week days
  const generateWeekDays = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Week starts on Sunday
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  };

  // Get content items for a specific day and hour
  const getItemsForHour = (day, hour) => {
    if (!day) return [];
    
    // Create date objects for the hour range
    const hourStart = new Date(day);
    hourStart.setHours(hour);
    hourStart.setMinutes(0);
    hourStart.setSeconds(0);
    
    const hourEnd = new Date(day);
    hourEnd.setHours(hour);
    hourEnd.setMinutes(59);
    hourEnd.setSeconds(59);
    
    return calendarItems.filter((item) => {
      const itemStart = new Date(item.date);
      const itemEnd = new Date(item.endTime);
      
      // Check if item overlaps with this hour
      return (
        (itemStart <= hourEnd && itemEnd >= hourStart) ||
        (hourStart >= itemStart && hourStart <= itemEnd) ||
        (hourEnd >= itemStart && hourEnd <= itemEnd)
      );
    });
  };

  // Check if an item starts in this hour (for proper rendering)
  const itemStartsInHour = (item, day, hour) => {
    const itemStart = new Date(item.date);
    return itemStart.getHours() === hour && isSameDay(day, itemStart);
  };

  // Calculate the event height and position based on its start/end times
  const calculateEventStyle = (item, hour) => {
    const itemStart = new Date(item.date);
    const itemEnd = new Date(item.endTime);
    
    // Calculate duration in minutes
    const durationMinutes = differenceInMinutes(itemEnd, itemStart);
    
    // Calculate top position based on minutes past the hour
    const startMinutes = itemStart.getMinutes();
    const topPercentage = (startMinutes / 60) * 100;
    
    // Calculate height based on duration
    const heightPercentage = (durationMinutes / 60) * 100;
    
    // Adjust height if event spans multiple hours
    const adjustedHeight = itemStart.getHours() === hour 
      ? Math.min(heightPercentage, 100 - topPercentage)
      : Math.min(heightPercentage, 100);
    
    // Adjust top if event doesn't start in this hour
    const adjustedTop = itemStart.getHours() === hour ? topPercentage : 0;
    
    return {
      top: `${adjustedTop}%`,
      height: `${adjustedHeight}%`,
    };
  };

  // Find status color
  const getStatusColor = (status) => {
    const option = contentStatusOptions.find(opt => opt.value === status);
    return option ? option.color : '#e0e0e0';
  };

  // Format time for display (e.g., "9:00 AM")
  const formatEventTime = (date) => {
    return format(date, 'h:mm a');
  };

  // Format the time range for display in events
  const formatEventTimeRange = (start, end) => {
    return `${formatEventTime(start)} - ${formatEventTime(end)}`;
  };

  const weekDays = generateWeekDays();
  const hours = generateHours();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Calendar Header */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h5" component="h1">
              Content Calendar
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={handlePrevWeek}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="h6" sx={{ mx: 2 }}>
                {format(currentDate, 'MMMM, yyyy')}
              </Typography>
              <IconButton onClick={handleNextWeek}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
            <Box>
              <Button variant="outlined">Week</Button>
            </Box>
          </Box>

          {/* Weekly Calendar View */}
          <Box sx={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh', border: '1px solid #e0e0e0' }}>
            {/* Calendar Grid */}
            <Box sx={{ display: 'flex', minWidth: 800 }}>
              {/* Time column */}
              <Box sx={{ width: 60, flexShrink: 0, borderRight: '1px solid #e0e0e0' }}>
                {/* Empty header cell */}
                <Box sx={{ height: 50, borderBottom: '1px solid #e0e0e0' }}></Box>
                
                {/* Time labels */}
                {hours.map((hourData, index) => (
                  <Box 
                    key={`time-${index}`} 
                    sx={{ 
                      height: 60, 
                      borderBottom: '1px solid #e0e0e0',
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      justifyContent: 'center', 
                      pt: 1,
                      pr: 1,
                      fontSize: '0.75rem'
                    }}
                  >
                    {hourData.display}
                  </Box>
                ))}
              </Box>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => (
                <Box 
                  key={`day-${dayIndex}`} 
                  sx={{ 
                    flex: 1, 
                    minWidth: 120, 
                    borderRight: dayIndex < 6 ? '1px solid #e0e0e0' : 'none',
                    backgroundColor: isSameDay(day, new Date(2025, 0, 16)) ? '#f5f5f5' : 'transparent'
                  }}
                >
                  {/* Day header */}
                  <Box 
                    sx={{ 
                      height: 50, 
                      borderBottom: '1px solid #e0e0e0', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      pt: 1
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {format(day, 'EEE')}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        backgroundColor: isSameDay(day, new Date(2025, 0, 16)) ? 'primary.main' : 'transparent',
                        color: isSameDay(day, new Date(2025, 0, 16)) ? 'white' : 'inherit',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {format(day, 'd')}
                    </Typography>
                  </Box>

                  {/* Hour cells for this day */}
                  {hours.map((hourData, hourIndex) => {
                    const hourItems = getItemsForHour(day, hourData.hour);
                    const startingItems = hourItems.filter(item => itemStartsInHour(item, day, hourData.hour));
                    
                    return (
                      <Box 
                        key={`${dayIndex}-${hourIndex}`} 
                        sx={{ 
                          height: 60, 
                          borderBottom: '1px solid #e0e0e0',
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleOpenDialog(day, hourData.hour)}
                      >
                        {/* Render only items that start in this hour */}
                        {startingItems.map((item) => {
                          const itemStart = new Date(item.date);
                          const itemEnd = new Date(item.endTime);
                          const eventStyle = calculateEventStyle(item, hourData.hour);
                          
                          return (
                            <Box 
                              key={item.id} 
                              sx={{ 
                                position: 'absolute',
                                left: 2,
                                right: 2,
                                top: eventStyle.top,
                                height: eventStyle.height,
                                backgroundColor: getStatusColor(item.status),
                                borderRadius: 1,
                                zIndex: 10,
                                padding: '2px 4px',
                                overflow: 'hidden',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                  opacity: 0.9
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog(day, hourData.hour, item);
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.title}
                              </Typography>
                              <Typography variant="caption" sx={{ fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {formatEventTimeRange(itemStart, itemEnd)}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Add Content FAB */}
          <Fab 
            color="primary" 
            aria-label="add" 
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => handleOpenDialog(new Date(), 9)}
          >
            <AddIcon />
          </Fab>

          {/* Content Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
              {selectedItem ? 'Edit Meeting' : 'Add New Meeting'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={handleDateChange}
                    slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                  />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TimePicker
                        label="Start Time"
                        value={formData.date}
                        onChange={handleStartTimeChange}
                        slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePicker
                        label="End Time"
                        value={formData.endTime}
                        onChange={handleEndTimeChange}
                        slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <TextField
                  margin="normal"
                  name="title"
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />

                <TextField
                  margin="normal"
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                />

                <TextField
                  select
                  margin="normal"
                  name="status"
                  label="Meeting Type"
                  fullWidth
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  {contentStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: option.color,
                            mr: 1
                          }}
                        />
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              {selectedItem && (
                <Button 
                  onClick={handleDeleteItem} 
                  color="error" 
                  startIcon={<DeleteIcon />}
                  sx={{ mr: 'auto' }}
                >
                  Delete
                </Button>
              )}
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSaveItem} variant="contained" color="primary">
                {selectedItem ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar 
            open={snackbar.open} 
            autoHideDuration={4000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}