import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseInputField, BaseSelectField, BaseToogle} from "../common";
import { useMeetingModalHook } from "./hooks";
import { changeModalStatus, useAppSelector } from "../../store";
import { ModalStatus } from "../../types";
import { useState, useEffect} from "react";
import { IOwner } from "../../types/owner";
import { fetchGroups, fetchOwners} from "../../services";
import { IGroup } from "../../types/group";
import { useGetGroupHook } from "../group";


const MeetingModal: React.FC = () => {
  const { isOpen, register, handleSubmit, onSubmit, dispatch, errors } = useMeetingModalHook();
  const [owners, setOwners] = useState<IOwner[]>();
  const [groups, setGroups] = useState<IGroup[]>();
  const [owner, setOwner] = useState("");

  const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
  const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
  const isEdit: boolean = modalStatus === "edit" ? true : false;
  const { data: editablegroup }  = useGetGroupHook(currentId, isEdit);

  useEffect(() => {
    fetchOwnersList();
    fetchGroupList();
    if (editablegroup) {
      setOwner(editablegroup.owner);
    }
  }, [editablegroup]);

  const fetchOwnersList = async () => {
    try {

      const response =  await fetchOwners(1, 10000000);
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  const fetchGroupList = async () => {
    try {
      const response = await fetchGroups(1, 100000000);
      setGroups(response.data) ;
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  const handleOnChange = (value: string) => {
    const group = groups?.find(group => group._id === value);
    const owner = group? group.owner : "undefined";
    setOwner(owner);
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Meeting Modal"
      ariaHideApp={false}
      className="relative modal-container dark:bg-gray-800"
      overlayClassName="modal-overlay"
    >
      <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(
            changeModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          )
        }
      >
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit((data) => onSubmit({ ...data, owner}))}>
          <button
            type="button"
            onClick={() =>
              dispatch(
                changeModalStatus({
                  modalStatus: ModalStatus.CLOSE,
                  currentId: undefined,
                })
              )
            }
            className="absolute text-white hover:text-gray-300 focus:outline-none top-3 right-3"
          >
            &#10006;
          </button>
          <div className="mb-5">
            <h1 className="flex justify-center mb-4 text-3xl font-bold text-gray-500 dark:text-gray-300">
              Create a new meeting
            </h1>
          </div>
          <BaseInputField
            type="text"
            _id="meetingname"
            placeholder="Enter the meeting name"
            autoFocus={true}
            required={true}
            label="Meeting Name"
            register={register}
            error={errors.meetingname?.message}
          />
          <BaseSelectField
            _id="group"
            placeholder=""
            autoFocus={true}
            required={true}
            label="Group"
            register={register}
            error={errors.group?.message}
            options={groups? groups : []}
            onChange={handleOnChange}
          />
          <BaseSelectField
            _id="owner"
            placeholder=""
            autoFocus={true}
            label="Owner"
            register={register}
            error={errors.owner?.message}
            value={owner}
            options={owners? owners : []}
            readonly={true}
          />
         <BaseInputField
            type="text"
            _id="meetingtime"
            placeholder="Enter the meeting clan name"
            autoFocus={false}
            required={true}
            label="Meeting Time"
            register={register}
            error={errors.meetingtime?.message}
          />
          <BaseInputField
            type="text"
            _id="meetinglink"
            placeholder="Enter the meeting clan name"
            autoFocus={false}
            required={true}
            label="Meeting Link"
            register={register}
            error={errors.meetinglink?.message}
          />

          <div className="flex items-start mb-5">
            Meeting Status:&nbsp;{" "}
            <BaseToogle register={register} status={"meetingStatus"} />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Create
            </button>
          </div>
        </form>
      </OutsideClickHandler>
    </Modal>
  );
};

export default MeetingModal;
