import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useGroupListHook } from "./hooks";
import { IGroup } from "../../types/group";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";
import { IOwner } from "../../types/owner";
import { fetchOwners } from "../../services";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants";

const UserGroupList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [owners, setOwners] = useState<IOwner[]>();
  
  const fetchOwnersList = async () => {
    try {

      const response =  await fetchOwners(1, 10000000);
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  const getOwnerName = (ownerId: string) : string => {
    const owner = owners?.find(owner => owner._id === ownerId);
    if (owner && owner.name) return owner.name;
    return "";
  };
  useEffect(() => {
    fetchOwnersList();
  }, []);
  const navigate = useNavigate();

  const handleViewClick = (groupId: string) => {
    navigate("/user/singlegroup/" + groupId);
  };

  const handleJoinClick = (groupId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.JOIN,
        currentId: groupId,
      })
    );
  };

  const [page, setPage] = useState<number>(1);
  const { data: groups } = useGroupListHook(page);

  const columns: GridColDef[] = [
    { field: "logo", headerName: "Group Logo",headerClassName:"custom-header", flex: 1,
      renderCell: (params) => (
        <img src={params.value as string} alt="Group Logo" style={{ width: 50, height: 50 }} />
      ),
    },
    { field: "name", headerName: "Group Name",headerClassName:"custom-header", flex: 1 },
    { field: "location", headerName: "Location/Territory",headerClassName:"custom-header", flex: 1 },
    { field: "owner", headerName: "Owner",headerClassName:"custom-header", flex: 1},
    { field: "counterMember", headerName: "# of Members",headerClassName:"custom-header", flex: 1 },
    { field: "seatRemaining", headerName: "Seats Remaining",headerClassName:"custom-header", flex: 1,
      renderCell: (params) => (
        params.row.groupSize - params.row.counterMember
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      headerClassName:"custom-header",
      renderCell: (params) => (
        <>
          <Tooltip title="View Group">
            <IconButton
              onClick={() => handleViewClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Join Group">
            <IconButton
              onClick={() => handleJoinClick(params.row.id as string)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <Diversity3Icon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = groups.data.map((group: IGroup) => ({
    id: group._id,
    logo: IMAGE_URL + group.logo,
    name: group.name,
    location: group.location,
    owner: getOwnerName(group?.owner as string),
    counterMember: group.counterMember,
    groupSize: group.groupSize,
    // dateCreated: group.dateCreated,
    // numberOfMembers: group.numberOfMembers,
  }));

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
          disabled={!groups.pageNumber}
          className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserGroupList;
