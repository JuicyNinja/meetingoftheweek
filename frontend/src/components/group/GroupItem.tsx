import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { IGroupItemProps } from "../../types/group";

const today: string = format(new Date(), "yyyy-MM-dd");

const GroupItem: React.FC<IGroupItemProps> = ({ group }) => {
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: group._id as string,
      })
    );
  };

  const handleDeleteClick = () => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: group._id as string,
      })
    );
  };

  return (
    <TableRow className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
     <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {group.name}
      </TableCell>

      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {group.location}
      </TableCell>
      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {group.owner}
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
              group.profileStatus ? "bg-green-500" : "bg-red-500"
            }`}                                                                                                                    
          ></div>
          <span>{group.profileStatus ? "Active" : "Inactive"}</span>
        </div>
      </TableCell>

      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {today}
      </TableCell>
      <TableCell
        align="center"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {group.counterMember.toString()}
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
      
    </TableRow>
  );
};

export default GroupItem;
