import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../features/users/UserSlice";
import MyTable from "./controls/MyTable";
import UpdateUserForm from "../forms/UpdateUserForm";
import MyModal from "./MyModal";
import CreateUserForm from "../forms/CreateUserForm";
import { Controls } from "./controls/controls";

const headCells = [
  // { id: "id", label: "Responsable Id" },
  { id: "nom", label: "Nom" },
  { id: "prenom", label: "Prenom" },
  { id: "email", label: "Email" },
  { id: "dateBirth", label: "Date de naissance" },
  { id: "actions", label: "Actions", disableSorting: true },
];
function UsersTable() {
  const users = useSelector(selectUsers);
  const [userEdit, setUserEdit] = useState(null);
  const [openDialogCreateUser, setopenDialogCreateUser] = useState(false);
  const [openDialogUpdateUser, setopenDialogUpdateUser] = useState(false);
  const handleOpenDialogCreationUser = () => {
    setopenDialogCreateUser(true);
  };
  const handleOpenDialogUpdateUser = (user) => {
    setopenDialogUpdateUser(true);
    setUserEdit(user);
  };
  const handleCloseDialogCreateUser = () => setopenDialogCreateUser(false);
  const handleCloseDialogUpdateUser = () => setopenDialogUpdateUser(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  return (
    <>
      <MyTable
        list={users}
        headCells={headCells}
        handleOpenDialogCreationUser={handleOpenDialogCreationUser}
        handleOpenDialogUpdateUser={handleOpenDialogUpdateUser}
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
        setNotify={setNotify}
      />
      <MyModal
        openDialog={openDialogCreateUser}
        handleCloseDialog={handleCloseDialogCreateUser}
      >
        <CreateUserForm handleCloseDialog={handleCloseDialogCreateUser}
        setNotify={setNotify} />
      </MyModal>
      <MyModal
        openDialog={openDialogUpdateUser}
        handleCloseDialog={handleCloseDialogUpdateUser}
      >
        <UpdateUserForm
          userEdit={userEdit}
          handleCloseDialog={handleCloseDialogUpdateUser}
          setNotify={setNotify}
        />
      </MyModal>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default UsersTable;
