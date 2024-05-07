import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseInputField, BaseSelectField, BaseTextarea, BaseToogle } from "../common";
import { useReferralEditModalHook } from "./hooks";
import { changeModalStatus } from "../../store";

import { ModalStatus } from "../../types";

const ReferralEditModal: React.FC = () => {
  const { isOpen, register, handleSubmit, onSubmit, dispatch, errors } = useReferralEditModalHook();
  const statusOpt = [
    {_id: "Pending", name: "Pending"},
    {_id: "Accepted", name: "Accepted"},
    {_id: "Declined", name: "Declined"},
    {_id: "Completed", name: "Completed"}
  ]
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Referral Modal"
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
              Edit a referral
            </h1>
          </div>
          <BaseInputField
            type="number"
            _id="price"
            placeholder="Enter the Estimated Value"
            autoFocus={true}
            required={true}
            label="Estimated Value"
            register={register}
            error={errors.price?.message}
          />
          <BaseTextarea
            _id="desc"
            placeholder="Enter the Description"
            row={5}
            required={true}
            label="Description"
            register={register}
            error={errors.desc?.message}
          />
          <BaseSelectField
            _id="status"
            placeholder="Select Status"
            required={true}
            label="Status"
            options={statusOpt}
            register={register}
            error={errors.status?.message}
          />
          <div className="flex items-start mb-5">
            <div className="flex-grow">Paid Status:</div> {/* Align text to left */}
            <div> {/* Align ImageUpload to right */}
              <BaseToogle register={register} status={"payStatus"} trueText="Paid" falseText="Unpaid"/>
            </div>
          </div>

          <div className="flex justify-center"> 
            <button
              type="submit"
              className="w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Update
            </button>
          </div>
        </form>
      </OutsideClickHandler>
    </Modal>
  );
};

export default ReferralEditModal;
