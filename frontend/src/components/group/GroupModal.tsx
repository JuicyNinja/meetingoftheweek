import Modal from "react-modal";
// import OutsideClickHandler from "react-outside-click-handler";
import { BaseInputField, BaseSelectField, BaseTextarea} from "../common";
import { useGroupModalHook } from "./hooks";
import { changeModalStatus } from "../../store";
import { ModalStatus} from "../../types";
import { useState, useEffect} from "react";
import {fetchOwners} from "../../services/OwnerService";
import { IOwner } from '../../types/owner'; 
import AvatarChange from "../common/AvatarChange";

const GroupModal: React.FC = () => {
  const { isOpen, register, handleSubmit, onSubmit, dispatch, errors , logoFile, onLogoFileChange } = useGroupModalHook();
  const [owners, setOwners] = useState<IOwner[]>();

  useEffect(() => {
    fetchOwnersList();
  }, []);

  const fetchOwnersList = async () => {
    try {

      const response =  await fetchOwners(1, 10000000);
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Group Modal"
      ariaHideApp={false}
      className="relative modal-container dark:bg-gray-800"
      overlayClassName="modal-overlay"
    >
      {/* <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(
            changeModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          )
        }
      > */}
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
              Create a new group
            </h1>
          </div>
          <AvatarChange
            _id="profilePhoto"
            width={120}
            height={120}
            btntext="Change Group Logo"
            filename={logoFile}
            onFileNameChange={onLogoFileChange}
            />
          <BaseInputField
            type="text"
            _id="name"
            placeholder="Enter the group name"
            autoFocus={true}
            required={true}
            label="Group Name"
            register={register}
            error={errors.name?.message}
          />
          <BaseInputField
            type="text"
            _id="location"
            placeholder="Enter the group location"
            autoFocus={true}
            required={true}
            label="Location/Territory"
            register={register}
            error={errors.location?.message}
          />
          <BaseSelectField
            _id="owner"
            placeholder="Select group owner"
            autoFocus={true}
            required={true}
            label="Owner"
            register={register}
            error={errors.owner?.message}
            options={owners? owners : []}
          />
          <BaseTextarea
            _id="message"
            placeholder="Enter the Group Message"
            row={4}
            required={false}
            label="Message"
            register={register}
            error={errors.message?.message}
          />

          <div className="flex justify-center mt-4"> 
            <button
              type="submit"
              className="w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Create
            </button>
          </div>
        </form>
      {/* </OutsideClickHandler> */}
    </Modal>
  );
};

export default GroupModal;
