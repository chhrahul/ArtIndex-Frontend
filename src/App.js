import { Routes, Route, useLocation } from 'react-router-dom';
import Artwork from './pages/Artwork';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import AddArtwork from './pages/AddArtwork';
import ArtworkGrid from './pages/ArtworkGrid';
import ArtworkListing from './pages/ArtworkListing';
import NewContact from './pages/NewContact';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';
import Email from './pages/Email';
import SendEmail from './pages/SendEmail';
import EditEvent from './pages/EditEvent';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import EditArtwork from './pages/EditArtwork';
import EditContact from './pages/EditContact';
import SentEmail from './pages/SentEmail';
import GoogleEmails from './pages/GoogleEmails';
import TrashEmail from './pages/TrashEmail';
import SingleEmail from './pages/SingleEmail';

function App() {

  const [homeUrl, setHomeUrl] = React.useState('')
  const location = useLocation()

  React.useEffect(() => {
    setHomeUrl(location.pathname)
    // console.log(location.pathname)
  }, [location])


  const isLogin = () => {
    const userId = localStorage.getItem("userId")
    return userId ? true : false
  }

  return (
    <>

      {homeUrl !== '/home' && homeUrl !=='/' && isLogin() && <Sidebar />}

      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/GoogleEmails" element={<GoogleEmails />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/contact" element={<Contacts />} />
          <Route exact path="/contact/create" element={<NewContact />} />
          <Route exact path="/contact/edit" element={<EditContact />} />
          <Route exact path="/artwork" element={<Artwork />} />
          <Route exact path="/artwork/grid" element={<ArtworkGrid />} />
          <Route exact path="/artwork/listing" element={<ArtworkListing />} />
          <Route exact path="/artwork/create" element={<AddArtwork />} />
          <Route exact path="/artwork/edit" element={<EditArtwork />} />
          <Route exact path="/emails" element={<Email />} />
          <Route exact path="/email/sent" element={<SentEmail />} />
          <Route exact path="/email/send" element={<SendEmail />} />
          <Route exact path="/email/trash" element={<TrashEmail />} />
          <Route exact path="/email/single" element={<SingleEmail />} />
          <Route exact path="/event/edit" element={<EditEvent />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/Logout" />
        </Route>

    

      </Routes>
    </>

  );
}

export default App;
