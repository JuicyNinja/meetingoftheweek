import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Avatar, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { IUserItemProps } from "../../types/user";
import { CustomAvatar } from "..";

const today: string = format(new Date(), "yyyy-MM-dd");

const UserItem: React.FC<IUserItemProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: user._id as string,
      })
    );
  };

  const handleDeleteClick = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: user._id as string,
      })
    );
  };

  return (
    <TableRow className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <TableCell
        align="center"
        width="150px" // Adjust the width as needed
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <CustomAvatar width="3rem" height="3rem" />
          </Grid>{" "}
          <Grid item xs={12} md={6}>
            <span>&nbsp;&nbsp;{user.name}</span>
          </Grid>
        </div>
      </TableCell>

      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.clan}
      </TableCell>
      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center justify-center">
          <div
            className={`h-2.5 w-2.5 rounded-full me-2 ${
              user.clanStatus ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          {user.clanStatus ? "Active" : "Inactive"}
        </div>
      </TableCell>
      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full me-2 ${
              user.profileStatus ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span>{user.profileStatus ? "Active" : "Inactive"}</span>
        </div>
      </TableCell>

      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {today}
      </TableCell>
      <TableCell align="center" className="gap-5 px-6 py-4">
        <IconButton
          onClick={handleEditClick}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center" className="gap-5 px-6 py-4">
        <IconButton
          onClick={handleEditClick}
          className="text-blue-600 dark:text-blue-500 hover:underline"
          sx={{ fontSize: "1rem" }}
        >
          pass
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
          className="text-blue-600 dark:text-blue-500 hover:underline"
          sx={{ fontSize: "1rem" }}
        >
          reset
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserItem;
