import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Container } from "@mui/material";
import "../styles/Profile.css";
import PasswordResetProfile from "../components/PasswordResetProfile";
import InfosProfile from "../components/InfosProfile";
import Sommaire from "../components/Sommaire";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, selectUser } from "../features/auth/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  const user = useSelector(selectUser);

  return (
    <div>
      <Container fixed>
        <h2 className="page-title">Profile Page</h2>
        <div className="profile-container">
          <Tabs>
            <TabList>
              <Tab>
                <p>Sommaire</p>
              </Tab>
              {/* <Tab>
                <p>Image</p>
              </Tab> */}
              <Tab>
                <p>Infos Personnelles</p>
              </Tab>
              <Tab>
                <p>Mot de passe</p>
              </Tab>
            </TabList>

            <TabPanel>
              <div className="panel-content">
                <Sommaire user={user} />
              </div>
            </TabPanel>
            {/* <TabPanel>
              <div className="panel-content">
                <UploadProfileImage />
              </div>
            </TabPanel> */}
            <TabPanel>
              <div className="panel-content">
                <InfosProfile user={user} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <PasswordResetProfile />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
