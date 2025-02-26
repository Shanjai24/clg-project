import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BoxBasic from './components/createmeeting.jsx'
import Cmeeting from './components/template.jsx'
import VenueTable from './pages/venue.jsx'
import Submit from './pages/submit.jsx'
import MainPage from './pages/mainpage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BoxBasic /> */}
    {/* <Cmeeting/> */}
    {/* <VenueTable/> */}
    {/* <Submit/> */}
    <MainPage/>
  </StrictMode>,
)
