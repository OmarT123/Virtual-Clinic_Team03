import { Box, Container, Grid } from "@mui/material";
import SquareCard from "../SquareCard";
import HomeNavBar from "./HomeNavBar";
import { useState } from "react";
import ProfilePage from "../ProfilePage";
import { HomePageContext } from "../../pages/HomePage";
import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PatientsView from "../PatientsView";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Fab from "@mui/material/Fab";
import PharmacistsStage from "../AdminEmployees/PharmacistsStage";

const DoctorHomePage = () => {
  const [page, setPage] = useState("home");
  const { user } = useContext(HomePageContext);

  const Home = () => {
    return (
      <>
        <Grid container spacing={5} sx={{ minHeight: "100vh" }}>
          <Grid item xs={12} sm={12} />
          <Grid item xs={12} sm={4}>
            <SquareCard
              title="APPOINTMENTS"
              body="Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales."
              icon={EventNoteIcon}
              isLearnMore={false}
              changeFunction={() => setPage("appointments")}
              closeFunction={() => setPage("home")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SquareCard
              title="PATIENTS"
              body="Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales."
              icon={PersonIcon}
              isLearnMore={false}
              changeFunction={() => setPage("patients")}
              closeFunction={() => setPage("home")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              />
            </>
          ) : (
            <PharmacistsStage
              setStage={() => setPage("home")}
              together={true}
              userType="doctor"
            />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default DoctorHomePage;
