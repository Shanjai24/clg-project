import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, subDays, addDays, subMonths, addMonths, isSameMonth } from "date-fns";
import CreateMeeting from "../pages/CreateMeeting";
import Template1 from "../components/template1";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const generateTimeSlots = (meetings) => {
  const slots = [];
  const currentHour = new Date().getHours();
  const startHour = Math.max(0, currentHour - 2); // Start 2 hours before current time
  let endHour = Math.min(23, currentHour + 3); // End 3 hours after current time

  for (let i = startHour; i <= endHour; i++) {
    slots.push(i % 24);
  }

  // Ensure at least 6 slots are shown
  while (slots.length < 6) {
    slots.push((endHour + 1) % 24);
    endHour++;
  }

  return slots;
};

const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const DashboardRightPanel = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set to today's date
  const [meetings] = useState([
    {
      id: 1,
      title: 'BOS Meeting',
      date: new Date(2025, 0, 28),
      startTime: '15:00',
      endTime: '16:00',
      color: 'bg-purple-200',
      borderColor: 'border-purple-500'
    },
    {
      id: 2,
      title: 'Grievance Meeting',
      date: new Date(2025, 0, 28),
      startTime: '13:00',
      endTime: '14:00',
      color: 'bg-orange-200',
      borderColor: 'border-orange-500'
    }
  ]);
  const [showTemplateOverlay, setShowTemplateOverlay] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

const calculatePosition = (meeting) => {
  const slots = generateTimeSlots(meetings);
  const startHour = slots[0];
  
  // Convert times to minutes from start of timeline
  const [startH, startM] = meeting.startTime.split(':').map(Number);
  const [endH, endM] = meeting.endTime.split(':').map(Number);
  
  const startMinutes = ((startH - startHour) * 60) + startM;
  const endMinutes = ((endH - startHour) * 60) + endM;
  
  // Convert to percentages
  const top = (startMinutes / 360) * 100 + 10;  // 360 = 6 hours * 60 minutes
  const height = ((endMinutes - startMinutes) / 360) * 100;
  
  return { top, height };
};

const calculateCurrentTimePosition = () => {
  const now = new Date();
  const slots = generateTimeSlots(meetings);
  const startHour = slots[0];
  
  // Calculate total minutes from start of the timeline
  const currentHourDiff = now.getHours() - startHour;
  const totalMinutes = (currentHourDiff * 60) + now.getMinutes();
  
  // Each hour is 60px, so multiply by 60 to get total height
  const totalHeight = 6 * 60; // 6 hours * 60px
  
  // Determine if the current time is within the first half or the second half of the hour
  if (now.getMinutes() < 30) {
    // Place at the bottom of the current hour box
    return (totalMinutes / totalHeight) * 100 +12;
  } else {
    // Place at the top of the next hour box
    return ((currentHourDiff + 1) * 60) / totalHeight * 100 + 5 ;
  }
};

  const groupMeetingsByTime = (meetings) => {
    const grouped = [];
    meetings.forEach(meeting => {
      const overlappingGroup = grouped.find(group =>
        group.some(m => 
          (meeting.startTime < m.endTime && meeting.endTime > m.startTime)
        )
      );
      if (overlappingGroup) {
        overlappingGroup.push(meeting);
      } else {
        grouped.push([meeting]);
      }
    });
    return grouped;
  };

  const groupedMeetings = groupMeetingsByTime(meetings);

  const getCalendarDays = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const startDay = start.getDay();
    const endDay = end.getDay();

    const daysBefore = Array.from({ length: startDay }, (_, i) => subDays(start, startDay - i));
    const daysInMonth = eachDayOfInterval({ start, end });
    const daysAfter = Array.from({ length: 6 - endDay }, (_, i) => addDays(end, i + 1));

    return [...daysBefore, ...daysInMonth, ...daysAfter];
  };

  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const handleCreateMeetingClick = () => {
    setShowCreateMeeting(true);
  };

  const handleTemplateSelect = (selectedTemplate) => {
    setShowCreateMeeting(false);
    navigate('/template1', { state: { selectedTemplate } });
  };

  const days = getCalendarDays(selectedDate);

  return (
    <>
      {/* Template Selection Overlay */}
      {showCreateMeeting && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <CreateMeeting
            onUseTemplate={handleTemplateSelect}
            onClose={() => setShowCreateMeeting(false)}
          />
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column' , gap:'5px',marginTop:'16px'}}>
        <div>
            <button style={{
              padding: '0.5rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'center',
              width:'100%',
              borderRadius: '5px'
            }} onClick={handleCreateMeetingClick}>
              <AddCircleOutlineIcon/>
              Create Meeting
            </button>
        </div>
        
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div style={{ backgroundColor: 'white', padding: '0.25rem', borderRadius: '0.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: 'black' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>{format(selectedDate, 'MMM dd-yyyy')}</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', padding: '0.25rem', color: '#666' }} onClick={handlePrevMonth}><i className="fi fi-rr-caret-left"></i></button>
                <button style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', padding: '0.25rem', color: '#666' }} onClick={handleNextMonth}><i className="fi fi-rr-caret-right"></i></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem'}}>
              {weekDays.map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: '#666', padding: '0.25rem', fontSize: '0.75rem' }}>{day}</div>
              ))}
              {days.map(day => (
                <div
                  key={day.toString()}
                  style={{
                    aspectRatio: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    position: 'relative',
                    fontSize: '0.875rem',
                    color: isSameMonth(day, selectedDate) ? '#1a1a1a' : '#ccc',
                    width: '30px',
                    height: '30px',
                    margin: 'auto',
                    backgroundColor: isSameDay(day, selectedDate) ? '#4299e1' : 'transparent'
                  }}
                  onClick={() => setSelectedDate(day)}
                >
                  {format(day, 'd')}
                  {meetings.some(meeting => isSameDay(meeting.date, day)) && (
                    <div style={{ width: '3px', height: '3px', backgroundColor: '#e1a942', borderRadius: '50%', position: 'absolute', bottom: '2px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', margin: '0 0 1rem 0' }}>Today's Schedule</h3>
            <div style={{ position: 'relative', flex: 1, margin: '0 auto', padding: '0', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '8px', width: '100%', maxHeight: '300px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {generateTimeSlots(meetings).map(hour => (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '40px' }} key={hour}>
                  <div style={{ minWidth: '50px', padding: '0 4px', color: '#585858', fontSize: '10px', textAlign: 'right' }}>{`${hour}:00`}</div>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#8e8d8d', marginRight: '5px' }}></div>
                </div>
              ))}
              <div
                style={{ position: 'absolute', left: '70px', right: '10px', height: '2px', backgroundColor: '#4caf50', borderRadius: 0, transform: 'translateY(-50%)', zIndex: 4, top: `${calculateCurrentTimePosition()}%` }}
              >
                <span style={{ position: 'absolute', left: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', backgroundColor: '#4caf50', borderRadius: '50%' }}></span>
              </div>
              {groupedMeetings.map((group, groupIndex) => 
                group.map((meeting, index) => {
                  const { top, height } = calculatePosition(meeting);
                  return (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      top={top}
                      height={height}
                      formatTime={formatTime}
                    />
                  );
                })
              )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

const MeetingCard = ({ meeting, top, height, formatTime }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        position: 'absolute',
        left: '80px',
        width: 'calc(100% - 100px)',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        top: `${top}%`,
        height: `${height}%`,
        backgroundColor: meeting.color,
        border: `1px solid ${meeting.borderColor}`,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <strong>{meeting.title}</strong>
      <div>{`${formatTime(meeting.startTime)} - ${formatTime(meeting.endTime)}`}</div>
    </div>
  );
};


export default DashboardRightPanel;