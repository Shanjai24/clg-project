import { Box,Divider,Typography,TextField,Button,InputAdornment,IconButton } from "@mui/material";
import { useState } from "react";
import FitbitIcon from "@mui/icons-material/Fitbit";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import store from "../assets/store.png";
import home from "../assets/home.png";
import graph from "../assets/graph.png";

import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BoxBasic from "../components/createmeeting";


export default function MainPage() {
  const [navselect, setNavselect] = useState("home");
  const [selectedTab, setSelectedTab] = useState("Todo");

  const [expanded, setExpanded] = useState(false);
  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  const [meetvisible, setMeetVisible] = useState(false);

  return (
    <Box sx={{backgroundColor:'#F5F9FF',display:'flex'}}>

      <Box
        sx={{
          width: expanded ? "220px" : "60px",
          height: "96vh",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 1, position: "relative", width: "100%" }}>
          <FitbitIcon />
          <Box
          onClick={toggleSidebar}
            sx={{
              position: "absolute",
              right:expanded ? "-10px" : "-10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 20,
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
          >
            <KeyboardArrowRightIcon sx={{ fontSize: "15px" }} />
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          {[
            { id: "home", src: home, label: "Home" },
            { id: "store", src: store, label: "Store" },
            { id: "graph", src: graph, label: "Graph" },
          ].map((item) => (
            <Box
              key={item.id}
              onClick={() => setNavselect(item.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                my: 1,
                gap: 1.2,
              }}
            >
              <Box
                sx={{
                  bgcolor: navselect === item.id ? "#E8F0FF" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  transition: "0.75s",
                  width: 40,
                  height: 40,
                }}
              >
                <img src={item.src} alt={item.id} style={{ width: 24, height: 24 }} />
              </Box>
              {expanded && (
              <Typography variant="body2" sx={{ color: "#333", fontWeight: 500 }}>
                {item.label}
              </Typography>
            )}
            </Box>
          ))}
        </Box>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Box sx={{ textAlign: "center", my: 1 }}>
          <HeadsetMicOutlinedIcon />
        </Box>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 2 }}>
          <LogoutOutlinedIcon sx={{ color: "red" }} />
          <AccountCircleOutlinedIcon sx={{ width: 30, height: 30 }} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 3 }}>
        <Box sx={{display:'flex',gap:10}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              paddingTop:0.5,
              paddingBottom:0.5,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              width: "800px",
            }}
          >
            <Box
              onClick={() => setSelectedTab("Todo")}
              sx={{
                width: "300px",
                borderRight: selectedTab === "Todo" ? "none" : "1px solid black",
                p: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: selectedTab === "Todo" ? "#1976D2" : "white",
                color: selectedTab === "Todo" ? "white" : "black",
                transition: "0.50s",
              }}
            >
              <EventNoteOutlinedIcon />
              <Typography>Todo</Typography>
            </Box>

            <Box
              onClick={() => setSelectedTab("Scheduled")}
              sx={{
                width: "300px",
                p: 1,
                borderRight: selectedTab === "Scheduled" ? "none" : "1px solid black",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: selectedTab === "Scheduled" ? "#1976D2" : "white",
                color: selectedTab === "Scheduled" ? "white" : "black",
                transition: "0.50s",
              }}
            >
              <SpeakerNotesOutlinedIcon />
              <Typography>Scheduled</Typography>
            </Box>

            <Box
              onClick={() => setSelectedTab("Draft")}
              sx={{
                width: "300px",
                p: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: selectedTab === "Draft" ? "#1976D2" : "white",
                color: selectedTab === "Draft" ? "white" : "black",
                transition: "0.50s",
              }}
            >
              <CalendarMonthOutlinedIcon />
              <Typography>Draft</Typography>
            </Box>
          </Box>
        
          <Box sx={{padding:'10px',width:'250px',backgroundColor:'green',color:'white',textAlign:'center',borderRadius:'6px',display:'flex',justifyContent:'center',gap:1,cursor:'pointer'}}
          onClick={() => setMeetVisible(true)}
          >
              <AddCircleOutlineOutlinedIcon />
              <Typography>
                Create Meeting
              </Typography>
          </Box>
          {meetvisible && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}>
              <BoxBasic/>
            </div>
          )}
      </Box>


        <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 ,width:'800px'}}>
          <TextField
          sx={{backgroundColor:'white'}}
            fullWidth
            placeholder="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", width: "15%", p: "8px", border: "1px solid #ccc", borderRadius: "6px",backgroundColor:'white' }}>
            <FilterAltOutlinedIcon />
            <Typography sx={{ fontSize: "12px", color: "#546773" }}>Filter By</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh",ml:'-300px' }}>
          <Box sx={{ width: 100, height: 100, backgroundColor: "#E8F0FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h4" color="#A0AEC0">📄</Typography>
          </Box>
          <Typography variant="h6" fontWeight={600} mt={2}>No todo Works</Typography>
          <Typography color="gray">Any assets used in projects will live here. Start creating by uploading your files.</Typography>
        </Box>

      </Box>

    </Box>
  );
}