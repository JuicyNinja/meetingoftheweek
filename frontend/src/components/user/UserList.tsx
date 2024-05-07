import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { IUser } from "../../types/user";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from '@mui/icons-material/LockReset';
import ReplyIcon from '@mui/icons-material/Reply';
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { CustomAvatar } from "..";
import { Grid, Tooltip } from "@mui/material";
import { useUserListHook } from "../user";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleEditClick = (userId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: userId,
      })
    );
  };

  const handleDeleteClick = (userId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: userId,
      })
    );
  };

  const handlePassResetClick = (userId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.RESET,
        currentId: userId,
      })
    );
  };

  const handleConvertClick = (userId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.CONVERT,
        currentId: userId,
      })
    );
  };

  const [page, setPage] = React.useState<number>(1);
  const { data: users } = useUserListHook(page);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <CustomAvatar width="3rem" height="3rem" url={params.row.photo}/>
          </Grid>{" "}
          <Grid item xs={12} md={6}>
            <span>&nbsp;&nbsp;{params.value}</span>
          </Grid>
        </div>
      ),
    },
    { field: "clan", headerName: "Clan Name", flex: 1,headerClassName:"custom-header"},
    { field: "seat", headerName: "Clan Seat", flex: 1,headerClassName:"custom-header"},
   
    {
      field: "clanStatus",
      headerName: "Clan Status",
      flex: 1,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <>
          {" "}
          <div
            className={`h-2.5 w-2.5 rounded-full me-2 ${
              params.value ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span>{params.value ? "Active" : "Inactive"}</span>
        </>
      ),
    },
    {
      field: "profileStatus",
      headerName: "Profile Status",
      flex: 1,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <>
          {" "}
          <div
            className={`h-2.5 w-2.5 rounded-full me-2 ${
              params.value ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span>{params.value ? "Active" : "Inactive"}</span>
        </>
      ),
    },
    {
      field: "dateCreated",
      headerName: "Data Created",
      flex: 1,
      headerClassName:"custom-header",
      valueFormatter: (params) => dateFormatter.format(params.value),
    },
    
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 180,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <>
          <Tooltip title="Edit User">
            <IconButton
              onClick={() => handleEditClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset password">
            <IconButton
              onClick={() => handlePassResetClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <LockResetIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Convert to owner">
            <IconButton
              onClick={() => handleConvertClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              onClick={() => handleDeleteClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    }
  ];

  const rows = users.data.map((user: IUser) => ({
    id: user._id,
    name: user.name,
    photo: user.profilePhoto,
    clan: user.group_id?.name,
    seat: user.seat,
    clanStatus: user.clanStatus,
    profileStatus: user.profileStatus,
    dateCreated: user.createdAt ? new Date(user.createdAt) : ""
    // numberOfMembers: user.numberOfMembers,
  }));

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });
  const [ignoreDiacritics, setIgnoreDiacritics] = React.useState(true);

  return (
    <div style={{ width: "100%" }}>
      <FormControlLabel
        checked={ignoreDiacritics}
        onChange={(event) =>
          setIgnoreDiacritics((event.target as HTMLInputElement).checked)
        }
        control={<Switch />}
        label="Ignore diacritics"
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          key={ignoreDiacritics.toString()}
          rows={rows}
          columns={columns}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          disableColumnSelector
          disableDensitySelector
          hideFooter
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          ignoreDiacritics={ignoreDiacritics}
        />
      </div>
      <div className="flex justify-between mt-4" aria-label="Table navigation">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!users.pageNumber}
          className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
