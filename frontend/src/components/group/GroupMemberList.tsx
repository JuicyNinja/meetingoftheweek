import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import OutboxIcon from '@mui/icons-material/Outbox';
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { CustomAvatar } from "..";
import { Grid, Tooltip, Typography } from "@mui/material";
import useGroupMemberListHook from "./hooks/useGroupMemberListHook";
import { useNavigate, useParams } from "react-router-dom";
import { IMember } from "../../types/group";

const GroupMemberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string}>();
  const groupId = id? id:"";
  const navigate = useNavigate();
  const handleViewClick = (userId: string) => {
    navigate("/user/profile/" + userId);
  };

  const handleSendClick = (userId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.OPEN,
        currentId: userId,
      })
    );
  };

  const { data: members } = useGroupMemberListHook(groupId);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Clan Members",
      flex: 2,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <CustomAvatar width="5rem" height="5rem" url={params.row.profilePhoto}/>
          </Grid>{" "}
          <Grid item xs={12} md={6} marginLeft={2}>
            <div>
              <Typography variant="body1" align="left">{params.row.name}</Typography>
              <Typography variant="body2" align="left">{params.row.businessName}</Typography>
              <Typography variant="body2" align="left">{params.row.phone}</Typography>
              <Typography variant="body2" align="left">{params.row.email}</Typography>
            </div>
          </Grid>
        </div>
      ),
    },
    { field: "clan", headerName: "Clan Name", flex: 1,headerClassName:"custom-header"},
    { field: "rank", headerName: "Clan Rank", flex: 1,headerClassName:"custom-header"},
    { field: "seat", headerName: "Seat", flex: 1,headerClassName:"custom-header"},
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 120,
        headerClassName:"custom-header",
        renderCell: (params) => (
          <>
            <Tooltip title="View Member Profile">
              <IconButton
                onClick={() => handleViewClick(params.row.user_id as string)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send Referral">
              <IconButton
                onClick={() => handleSendClick(params.row.user_id as string)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <OutboxIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
    },
  ];

  const rows = members?.map((member: IMember) => ({
    id: member._id,
    user_id: member.user_id?._id,
    name: member.user_id?.name,
    businessName: member.user_id?.businessName,
    profilePhoto: member.user_id?.profilePhoto,
    phone: member.user_id?.phone,
    email: member.user_id?.email,
    clan: member.group_id?.name,
    seat: member?.seat,
  }))||[];
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
      <div style={{ height: 600, width: "100%", paddingBottom: 20}}>
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
          rowHeight={90}
        />
      </div>
    </div>
  );
};

export default GroupMemberList;
