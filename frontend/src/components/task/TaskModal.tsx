import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseInputField, BaseTextarea, BaseToogle } from "../common";
import { useTaskModalHook } from "./hooks";
import { changeModalStatus } from "../../store";
import { ModalStatus } from "../../types";

const TaskModal: React.FC = () => {
  const { isOpen, register, handleSubmit, onSubmit, dispatch, errors } =
    useTaskModalHook();

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Task Modal"
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
            <h1
              className="flex justify-center mb-4 text-3xl font-bold text-gray-500 dark:text-gray-300"
            >
              Create a new task
            </h1>
          </div>
          <BaseInputField
            type="text"
            _id="title"
            placeholder="Enter the task title."
            autoFocus={true}
            required={true}
            label="Title"
            register={register}
            error={errors.title?.message}
          />
          <BaseTextarea
            _id="desc"
            placeholder="Enter the task description."
            row={5}
            required={true}
            label="Description"
            register={register}
            error={errors.desc?.message}
          />
          <div className="flex items-start mb-5">
            <BaseToogle register={register} />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Create New Task
            </button>
          </div>
        </form>
      </OutsideClickHandler>
    </Modal>
  );
};

export default TaskModal;
