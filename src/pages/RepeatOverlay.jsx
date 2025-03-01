import React, { useState } from "react";
import "../pages/RepeatOverlay.css";
import { Box,Button,Typography,IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const RepeatOverlay = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("Do not repeat");
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const tabs = ["Do not repeat", "Every day", "Every week", "Every month", "Custom"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleSave = () => {
    let repeatText = "";
    if (activeTab === "Every day") repeatText = "Daily";
    else if (activeTab === "Every week") repeatText = "Weekly";
    else if (activeTab === "Every month") repeatText = "Monthly";
    else if (activeTab === "Custom") repeatText = "Custom";
    
    onSave(repeatText);
  };

  return (
    <div className="repeat-overlay-container">
      <div className="repeat-overlay">

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px" }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
              <Typography sx={{ color: "#3D3939", fontWeight: "bold" }}>Repeat</Typography>
          </div>
          <IconButton
              sx={{ border: "2px solid #FB3748", borderRadius: "50%", padding: "4px", "&:hover": { backgroundColor: "transparent" } }}
              onClick={onClose}
          >
              <Close sx={{ fontSize: "12px", color: "#FB3748" }} />
          </IconButton>
        </Box>

        <div className="repeat-overlay-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`repeat-overlay-tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="repeat-overlay-content">
          {activeTab === "Do not repeat" && <p>No repeat options selected.</p>}
          {activeTab === "Every day" && (
            <div className="repeat-overlay-form-group">
              <label>Starting from</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label>For no of days</label>
              <input type="number" defaultValue="4" />
            </div>
          )}
          {activeTab === "Every week" && (
            <div className="repeat-overlay-form-group">
              <label>Starting from</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
              <label>For no of weeks</label>
              <input type="number" defaultValue="4" />
            </div>
          )}
          {activeTab === "Every month" && (
            <div className="repeat-overlay-form-group">
              <label>Starting from</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              
              <label>For no of months</label>
              <input type="number" defaultValue="4" />
            </div>
          )}
          {activeTab === "Custom" && (
            <div className="repeat-overlay-form-group">
              <label>Starting from</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              
              <label>Repeat every weeks</label>
              <input type="number" defaultValue="4" />
              <label>On</label>
              <div className="repeat-overlay-days">
                {daysOfWeek.map((day) => (
                  <span
                    key={day}
                    className={`repeat-overlay-day ${selectedDays.includes(day) ? "selected" : ""}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <label>Series end</label>
              <div className="repeat-overlay-series-end">
                <div>
                  <input type="radio" id="never" name="end" defaultChecked />
                  <label htmlFor="never">Never</label>
                </div>
                <div>
                  <input type="radio" id="appearances" name="end" />
                  <label htmlFor="appearances">After appearances</label>
                  <input type="number" defaultValue="4" />
                </div>
                <div>
                  <input type="radio" id="endOn" name="end" />
                  <label htmlFor="endOn">End on</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            </div>
          )}
        </div>

        <Box sx={{marginTop:'50px',display:'flex',justifyContent:'flex-end'}}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "red",
              color: "red",
              textTransform: "none",
              marginRight: "10px",
              width:'130px',
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#408FEA",
              color: "white",
              textTransform: "none",
              width:'130px',
            }}
            onClick={handleSave}
          >
            Save & Next
          </Button>
        </Box>

      </div>
    </div>
  );
};

export default RepeatOverlay;
