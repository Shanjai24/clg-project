import { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { Cancel } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";

import image from "../assets/image.png";

export default function JoinMeet({ onBack }) {

  const [discussionPoints, setDiscussionPoints] = useState([
    { id: "01", point: "Revision of Vision, Mission of the Department, PEOs, PSOs (if required):" },
    { id: "02", point: "Discussion on Curriculum & syllabi of Proposed Regulations. (Based on revision of regulations):" },
    { id: "03", point: "Suggestions for innovative teaching methodology/ Evaluation /Question Paper:" },
  ]);


    return (
        <Box sx={{ display: "flex",justifyContent: "center",alignItems: "center",minHeight: "90vh"}}>
            <Box sx={{ display: "flex",flexDirection: "column",minHeight: "90vh",backgroundColor: "#f5f5f5",padding: "16px",borderRadius: "8px",boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"}}>
                <Box sx={{ display: "flex",alignItems: "center",justifyContent: "space-between",padding: "12px 0",gap:80}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: "flex", padding: "5px", backgroundColor: "white" }}>
                            <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={onBack}/>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">
                            BOS Meeting
                            <Typography sx={{ fontSize:'12px'}}>
                                SF Board Room 12 Nov,2021 at 9:40 PM
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex",alignItems: "center",gap: 1,padding: "6px",backgroundColor: "white",borderRadius: "8px" }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#6c757d",textTransform: "none",gap: "5px",
                            "&:hover": { backgroundColor: "#5a6268" },
                            }}
                        >
                            <DescriptionOutlinedIcon sx={{ fontSize: "18px" }} />
                            Edit Points
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                            backgroundColor: "#007bff",
                            textTransform: "none",
                            gap: "5px",
                            "&:hover": { backgroundColor: "#0069d9" },
                            }}
                        >
                            <AutoAwesomeOutlinedIcon sx={{ fontSize: "18px" }} />
                            Join Meeting
                        </Button>
                    </Box>
                </Box>
                <Box sx={{display:'flex',padding:'8px',backgroundColor:'white',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:'15px'}}>Accepted To Join The Meeting</Typography>
                    <Box sx={{ display: "flex",alignItems: "center",gap: 1,padding: "6px",backgroundColor: "white",borderRadius: "8px" }}>
                        <Button
                            variant="outlined"
                            sx={{
                            color: "red",
                            borderColor: "red",
                            backgroundColor: "#fdecec",
                            textTransform: "none",
                            borderRadius: "14px",
                            padding: "6px 40px",
                            fontSize:'10px',
                            gap:0.5,
                            "&:hover": {
                                backgroundColor: "#f8d7da",
                            },
                            }}
                        >
                            <Cancel sx={{ color: "red",fontSize:'10px' }} />
                            Reject
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                            color: "green",
                            borderColor: "green",
                            backgroundColor: "#e6f8e6",
                            textTransform: "none",
                            borderRadius: "14px",
                            padding: "6px 40px",
                            fontSize:'10px',
                            gap:0.5,
                            "&:hover": {
                                backgroundColor: "#d4edda",
                            },
                            }}
                        >
                            <CheckBox sx={{ color: "green",fontSize:'10px'}} />
                            Accept
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: 'column',marginTop:'10px' }}>
                    <img src={image} alt="Example" style={{ width: "50%", height: "50%", padding: "10px" }} />

                    {/* first part */}
                    <TableContainer sx={{ maxWidth: 1150, margin: "auto", mt: 3, border: "1px solid #ddd",borderBottom:'none' }}>
                        <Table sx={{ borderCollapse: "collapse" }}>
                        <TableBody>

                            <TableRow>
                                <TableCell sx={cellStyle}>Name of the Meeting</TableCell>
                                <TableCell sx={cellStyle}>
                                    <TextField 
                                    variant="standard" 
                                    placeholder="Ex..8th BoS Meeting"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }} 
                                    />
                                </TableCell>
                                <TableCell sx={cellStyle}>Reference Number</TableCell>
                                <TableCell sx={cellStyle}>
                                    <TextField 
                                    variant="standard" 
                                    placeholder="Auto generate" 
                                    fullWidth 
                                    InputProps={{ 
                                        disableUnderline: true,
                                        sx: { fontStyle: 'italic', color: '#777' }
                                    }} 
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={cellStyle}>Meeting Description</TableCell>
                                <TableCell colSpan={3} sx={{ ...cellStyle }}>
                                    <TextField
                                    variant="standard"
                                    multiline
                                    fullWidth
                                    placeholder="Ex..Lorem ipsum dolor sit amet consectetur. Arcu vel egestas rutrum in magna semper dolor sem. Bibendum tristique quisque facilisis cursus mus malesuada mattis et erat. Pellentesque sed congue tellus massa aliquam. Augue erat nunc mauris consectetur."
                                    rows={4}
                                    InputProps={{ 
                                        disableUnderline: true,
                                        sx: { fontStyle: 'italic', color: '#555' }
                                    }}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={cellStyle}>Repeat Type</TableCell>
                                <TableCell sx={cellStyle}>
                                    <TextField
                                    placeholder="Ex..Monthly"
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>

                                <TableCell sx={cellStyle}>Priority Type</TableCell>
                                <TableCell sx={cellStyle}>
                                    <Autocomplete
                                    disablePortal
                                    sx={{
                                        "& .MuiAutocomplete-endAdornment": { display: "none" },
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        placeholder="Ex..High Priority"
                                        variant="standard"
                                        InputProps={{
                                            ...params.InputProps,
                                            disableUnderline: true,
                                        }}
                                        />
                                    )}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={cellStyle}>Venue Details</TableCell>
                                <TableCell sx={cellStyle}>
                                    <TextField 
                                        variant="standard" 
                                        placeholder="Select venue" 
                                        fullWidth 
                                        InputProps={{ 
                                        disableUnderline: true, 
                                        style: { color: "#999" } 
                                        }} 
                                    />
                                </TableCell>

                                <TableCell sx={cellStyle}>Date & Time</TableCell>
                                <TableCell sx={cellStyle}>
                                <TextField
                                    variant="standard"
                                    placeholder="Select time"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                                </TableCell>
                            </TableRow>

                            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                <TableCell sx={headerStyle}>Roles</TableCell>
                                <TableCell colSpan={3} sx={headerStyle}>Member list</TableCell>
                            </TableRow>

                            {["Chairman", "University Nominee", "Academic Council Member"].map((role, index) => (
                            <TableRow key={index}>
                                <TableCell sx={cellStyle}>{`${String.fromCharCode(97 + index)}. ${role}`}</TableCell>
                                <TableCell colSpan={3} sx={cellStyle}>
                                <TextField 
                                    variant="standard" 
                                    placeholder="Select Member" 
                                    fullWidth 
                                    InputProps={{ 
                                    disableUnderline: true, 
                                    }} 
                                />
                                </TableCell>
                            </TableRow>
                            ))}

                        </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer sx={{ maxWidth: 1150, margin: "auto", border: "1px solid #ddd", borderTop: "none" }}>
                        <Table sx={{ borderCollapse: "collapse" }}>
                        <TableHead>
                            <TableRow>
                            <TableCell width="5%" sx={headerCellStyle}>S.No</TableCell>
                            <TableCell width="30%" sx={headerCellStyle}>Points to be Discussed</TableCell>
                            <TableCell width="20%" sx={headerCellStyle}>Todo</TableCell>
                            <TableCell width="20%" sx={headerCellStyle}>Responsibility</TableCell>
                            <TableCell width="20%" sx={headerCellStyle}>Deadline</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discussionPoints.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell sx={cellStyle}>{item.id}</TableCell>
                                <TableCell sx={{ ...cellStyle, fontWeight: "normal", maxWidth: "300px" }}>
                                <TextField
                                    variant="standard"
                                    placeholder="Enter discussion topic"
                                    multiline
                                    fullWidth
                                    minRows={1}
                                    maxRows={4}
                                    InputProps={{ 
                                    disableUnderline: true,
                                    sx: { fontSize: '14px',fontWeight:'bold'}
                                    }}
                                    value={item.point}
                                />
                                </TableCell>
                                <TableCell sx={cellStyle}>
                                <TextField variant="standard" placeholder="Add remarks" fullWidth InputProps={{ disableUnderline: true }}/>
                                </TableCell>
                                <TableCell sx={cellStyle}>
                                <TextField variant="standard" placeholder="Select Member" fullWidth InputProps={{ disableUnderline: true }} />
                                </TableCell>
                                <TableCell sx={cellStyle}>
                                <TextField variant="standard" placeholder="Select Date" fullWidth 
                                    InputProps={{ disableUnderline: true }} 
                                />
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

const cellStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    fontWeight: "bold",
  };

const headerStyle = {
    ...cellStyle,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
};

const headerCellStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
};
