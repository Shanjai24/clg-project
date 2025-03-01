import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BoxBasic from './pages/createmeeting.jsx'
import Cmeeting from './components/template.jsx'
import VenueTable from './pages/venue.jsx'
import Submit from './pages/submit.jsx'
import MainPage from './components/mainpage.jsx'
import JoinMeet from './pages/joinmeet.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MainPage/> */}
    {/* <Cmeeting/> */}
    <JoinMeet/>
  </StrictMode>,
)
