import React, {useState, useEffect} from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useMeetingListHook } from "./hooks";
import { IMeeting } from "../../types/meeting";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { IGroup } from "../../types/group";
import { IOwner } from "../../types/owner";
import { fetchGroups, fetchOwners } from "../../services";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const MeetingList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [groups, setGroups] = useState<IGroup[]>();
  const [owners, setOwners] = useState<IOwner[]>();
  const fetchGroupsList = async () => {
    try {

      const response =  await fetchGroups(1, 10000000);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  
  const fetchOwnersList = async () => {
    try {

      const response =  await fetchOwners(1, 10000000);
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  useEffect(() => {
    fetchGroupsList();
    fetchOwnersList();
  }, []);
  const getGroupName = (groupId: string) : string => {
    const group = groups?.find(group => group._id === groupId);
    return group?group.name : "";
  };
  const getOwnerName = (ownerId: string) : string => {
    const owner = owners?.find(owner => owner._id === ownerId);
    return owner?owner.name : "";
  };

  const handleEditClick = (meetingId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: meetingId,
      })
    );
  };

  const handleDeleteClick = (meetingId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: meetingId,
      })
    );
  };

  const [page, setPage] = React.useState<number>(1);
  const { data: meetings } = useMeetingListHook(page);

  const columns: GridColDef[] = [
    { field: "meetingname", headerName: "Meeting Name", headerClassName:"custom-header",flex: 1 },
    { field: "groupname", headerName: "Clan/Group Name", headerClassName:"custom-header",flex: 1 },
    { field: "groupowner", headerName: "Group Owner", headerClassName:"custom-header",flex: 1 },
    { field: "meetingtime", headerName: "Meeting Time", headerClassName:"custom-header",flex: 1 },
    { field: "meetinglink", headerName: "Meeting Link", headerClassName:"custom-header",flex: 1 },
    {
      field: "meetingStatus",
      headerName: "Meeting Status",
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
      width: 120,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEditClick(params.row.id as string)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row.id as string)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = meetings.data.map((meeting: IMeeting) => ({
    id: meeting._id,
    meetingname: meeting.meetingname,
    groupname: getGroupName(meeting.group),
    groupowner: getOwnerName(meeting.owner),
    meetingtime: meeting.meetingtime,
    meetinglink: meeting.meetinglink,
    meetingStatus: meeting.meetingStatus,
    dateCreated: meeting.createdAt ? new Date(meeting.createdAt) : ""
    // numberOfMembers: meeting.numberOfMembers,
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
          disabled={!meetings.pageNumber}
          className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MeetingList;
