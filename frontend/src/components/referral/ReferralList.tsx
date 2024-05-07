import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useReferralListHook } from "./hooks";
import { IReferral } from "../../types/referral";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeModalStatus, useAppDispatch } from "../../store";
import { ModalStatus } from "../../types";


const ReferralList: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleEditClick = (referralId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.EDIT,
        currentId: referralId,
      })
    );
  };

  const handleDeleteClick = (referralId: string) => {
    dispatch(
      changeModalStatus({
        modalStatus: ModalStatus.REMOVE,
        currentId: referralId,
      })
    );
  };

  const [page, setPage] = React.useState<number>(1);
  const { data: referrals } = useReferralListHook(page);

  const columns: GridColDef[] = [
    { field: "groupname", headerName: "Group", flex: 1,headerClassName:"custom-header", },
    { field: "fullname", headerName: "Full Name", headerClassName:"custom-header",flex: 1 },
    { field: "phone", headerName: "Phone", headerClassName:"custom-header",flex: 1 },
    { field: "from", headerName: "From", headerClassName:"custom-header",flex: 1 },
    { field: "price", headerName: "Estimated Value", headerClassName:"custom-header",flex: 1 },
    {
      field: "payStatus",
      headerName: "Paid / Unpaid",
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
          <span>{params.value ? "Paid" : "Unpaid"}</span>
        </>
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

  const rows = referrals.data.map((referral: IReferral) => ({
    id: referral._id,
    groupname: referral.group?.name,
    fullname: referral.receiver?.name,
    phone: referral.receiver?.phone,
    from: referral.sender?.name,
    price: "$" + referral.price,
    payStatus: referral.payStatus,
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
          disabled={!referrals.pageNumber}
          className="p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReferralList;
