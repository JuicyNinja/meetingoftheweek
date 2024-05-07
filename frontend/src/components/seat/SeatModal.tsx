import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseInputField } from "../common";
import { useSeatModalHook } from "./hooks";
import { changeModalStatus } from "../../store";
import { ModalStatus} from "../../types";

const SeatModal: React.FC = () => {
  const { isOpen, register, handleSubmit, onSubmit, dispatch, errors} = useSeatModalHook();

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Seat Modal"
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
              Create a new seat
            </h1>
          </div>
          <BaseInputField
            type="text"
            _id="seat"
            placeholder="Enter the seat name"
            autoFocus={true}
            required={true}
            label="Seat Name"
            register={register}
            error={errors.seat?.message}
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
      </OutsideClickHandler>
    </Modal>
  );
};

export default SeatModal;
