import React from "react";
import { getAge, getFullName } from "../Utils";
import { useStylesSommaire } from "../styles/ComponentStyles";
import moment from "moment";
function Sommaire({ user }) {
  const classes = useStylesSommaire();
  const { email, dateBirth, authorities } = user;
  return (
    <div className={classes.sommaireContainer}>
      {/* <div className="sommaire-img">
        <img
          src={require("../../images/adnane3.png")}
          alt=""
          className="sommaire-profile-img"
        />
      </div> */}
      <div className={classes.sommaireContent}>
        <div className={classes.sommaireName}>
          Nom Complet : {getFullName(user)}
        </div>
        <div className={classes.sommaireEmail}>Email : {email}</div>
        <div className={classes.sommaireBirth}>
          Date de naissance :{" "}
          {dateBirth && moment(dateBirth).format("DD/MM/yyyy")} ,{" "}
          {getAge(moment(dateBirth).format("yyyy-MM-DD"))} ans.
        </div>
        {authorities && authorities[0] === "ROLE_USER" ? (
          <div className={classes.sommaireRole}>Vous êtes un User 👷</div>
        ) : (
          <div className={classes.sommaireRole}>Vous êtes un Admin 👑</div>
        )}
      </div>
    </div>
  );
}

export default Sommaire;
