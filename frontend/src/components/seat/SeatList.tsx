import { useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useSeatListHook } from "./hooks";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { Tooltip } from "@mui/material";
import { IMember } from "../../types/group";
import { useParams } from "react-router-dom";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const SeatList: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const groupId = id? id:"";
  const dispatch = useAppDispatch();

  const handleEditClick = (seatId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: seatId,
      })
    );
  };

  const handleDeleteClick = (seatId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: seatId,
      })
    );
  };

  const { data: seats } = useSeatListHook(groupId, 'ALL');

  const columns: GridColDef[] = [
    { field: "seat", headerName: "Seat",headerClassName:"custom-header", flex: 1 },
    { field: "user", headerName: "User",headerClassName:"custom-header", flex: 1},
    {
      field: "status",
      headerName: "Status",
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
      width: 140,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <>
          <Tooltip title="Edit Seat">
            <IconButton
              onClick={() => handleEditClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Seat">
            <IconButton
              onClick={() => handleDeleteClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = seats ? seats.map((seat: IMember) => ({
    id: seat._id,
    seat: seat.seat,
    status: seat.clanStatus,
    user: seat.user_id?.name,
    dateCreated: new Date(seat?.createdAt as string),
  })) : [];

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });
  const [ignoreDiacritics, setIgnoreDiacritics] = useState(true);

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
      <div style={{ height: 600, width: "100%", paddingBottom: 20 }}>
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
    </div>
  );
};

export default SeatList;
