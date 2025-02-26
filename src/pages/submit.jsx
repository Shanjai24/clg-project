import { Card,Typography,Box } from "@mui/material";
import crt from "../assets/Featured icon.png";

const Submit = () => {
  return (
    <Card sx={{borderRadius: "12px",boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",maxWidth: 400,padding: "16px"}}>
          <img src={crt} alt="Success" style={{ width: 50,height: 50}}/>
        <Box>
          <Typography sx={{ fontWeight: "bold",fontSize: "18px",marginTop:'10px' }}>
            Meeting initiated
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "16px",marginTop:'15px'}}>
            Created successfully members got notified the meeting.
          </Typography>
        </Box>
    </Card>
  );
};

export default Submit;
