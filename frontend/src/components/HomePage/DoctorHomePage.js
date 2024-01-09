import { Box, Container, Grid } from "@mui/material";
import SquareCard from "../SquareCard";
import HomeNavBar from "./HomeNavBar";
import { useState } from "react";
import ProfilePage from "../ProfilePage";
import { HomePageContext } from "../../pages/HomePage";
import { useContext, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PatientsView from "../PatientsView";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Fab from "@mui/material/Fab";
import PharmacistsStage from "../AdminEmployees/PharmacistsStage";
import axios from 'axios';
import Chat from "../Chat";

const DoctorHomePage = () => {
  const [page, setPage] = useState("home");
  const { user } = useContext(HomePageContext);
  const [chat, setChat] = useState(false);
  const [chatterID, setChatterID] = useState('');
  const [chatterName, setChatterName] = useState('');

  useEffect(() => {
    const login = async () => {
      await axios.get("/loginAuthentication").then(async (response) => {
        const { success, type, user } = response.data;
        if (success && type === 'doctor' && user.status === 'approved') {
          window.location.href = '/doctorContract'
        }
        else if (success && type === 'doctor' && user.status === 'rejected') {
          localStorage.clear()
          await axios.get('/logout')
          window.location.href = '/'
        }
      });
    }
    login()
  }, []);


  const Home = () => {
    return (
      <>
        <Grid container spacing={5} sx={{ minHeight: "100vh" }}>
          <Grid item xs={12} sm={12} />
          <Grid item xs={12} sm={4} sx={{ marginTop: "-95px" }}>
            <SquareCard
              title="APPOINTMENTS"
              body="Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales."
              icon={EventNoteIcon}
              isLearnMore={false}
              changeFunction={() => setPage("appointments")}
              closeFunction={() => setPage("home")}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginTop: "-95px" }}>
            <SquareCard
              title="PATIENTS"
              body="Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales."
              icon={PersonIcon}
              isLearnMore={false}
              changeFunction={() => setPage("patients")}
              closeFunction={() => setPage("home")}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginTop: "-95px" }}>
            <SquareCard
              title="PHARMACISTS"
              body="Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales."
              icon={LocalHospitalIcon}
              isLearnMore={false}
              changeFunction={() => setPage("pharmacists")}
              closeFunction={() => setPage("home")}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <HomeNavBar homeButton={() => setPage("home")} setPage={setPage} />
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={5}>
          {page === "profile" ? (
            <ProfilePage userData={user} />
          ) : page === "home" ? (
            <Home />
          ) : page === "appointments" ? (
            "appointments"
          ) : page === "patients" ? (
            <>
              <PatientsView
                userType={"doctor"}
                backButton={() => setPage("home")}
                setChat={setChat}
                setChatterID={setChatterID}
                setChatterName={setChatterName}
              />
            </>
          ) : (
            <PharmacistsStage
              setStage={() => setPage('home')}
              together={true}
              userType='doctor'
              setChat={setChat}
              setChatterID={setChatterID}
              setChatterName={setChatterName}
            />
          )}
          {chat && <Chat partner={chatterID} name={chatterName} setChat={setChat} />}
        </Grid>
      </Container>
    </>
  );
};

export default DoctorHomePage;
