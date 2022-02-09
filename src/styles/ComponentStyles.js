import { makeStyles } from "@mui/styles";

export const useStylesHeader = makeStyles((theme) => ({
  header: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  header__logo: { width: "100px !important", objectFit: "contain" },
  loginButton: {
    textDecoration: "none",
    color: "#000",
    borderRadius: "5px",
    border: "2px black solid",
    lineHeight: "19px",
    fontWeight: 400,
    boxShadow: "none",
    textShadow: "none",
    padding: "10px",
    fontSize: "16px",
  },
  headerOptions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerOption: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export const useStylesInfosProfile = makeStyles((theme) => ({
  infoProfileContainer: {
    width: "90%",
    textAlign: "center",
  },
  infoProfilecTitle: { marginBottom: 50 },
}));

export const useStylesSommaire = makeStyles((theme) => ({
  sommaireContainer: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sommaireProfileImg: {
    height: 400,
    width: 400,
    objectFit: "contain",
    borderRadius: 50,
  },
  sommaireContent: { paddingTop: 50 },
  sommaireName: { margin: "10px 0", fontSize: 20 },
  sommaireEmail: { margin: "10px 0", fontSize: 20 },
  sommaireBirth: { margin: "10px 0", fontSize: 20 },
  sommaireRole: { margin: "10px 0", fontSize: 20 },
}));

export const useStylesPasswordProfileReset = makeStyles((theme) => ({
  passwordResetontainer: {
    width: "90%",
    textAlign: "center",
  },
  inputPassword: {
    width: "80%",
  },
  passwordTitle: { marginBottom: 50 },
}));
