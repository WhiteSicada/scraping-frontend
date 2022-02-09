import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";

export const MyButton = styled(Button)(({ theme, color1, color2, width }) => ({
  color: theme.palette.getContrastText(color1),
  backgroundColor: color1,
  width: width,
  marginTop: 15,
  "&:hover": {
    backgroundColor: color2,
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.2)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const userPlaceholderImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

export function isoFormatDMY(d) {
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  return (
    pad(d.getUTCDate()) +
    "/" +
    pad(d.getUTCMonth() + 1) +
    "/" +
    d.getUTCFullYear()
  );
}
export function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export const getFullName = (user) => {
  return user.nom + " " + user.prenom;
};

export const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
