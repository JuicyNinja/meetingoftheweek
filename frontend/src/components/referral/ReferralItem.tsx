import { changeModalStatus, useAppDispatch } from "../../store";
import { IReferralItemProps, ModalStatus } from "../../types/referral";
import { truncateSentence } from "../../utils";

const ReferralItem: React.FC<IReferralItemProps> = ({ referral }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {referral?.title}
        </th>
        <td className="px-6 py-4">{truncateSentence(referral?.desc)}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full me-2 ${
                referral?.referralStatus ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            {referral?.referralStatus ? "ToDo" : "Done"}
          </div>
        </td>
        <td className="flex gap-5 px-6 py-4">
          <a
            href="#"
            onClick={() =>
              dispatch(
                changeModalStatus({
                  modalStatus: ModalStatus.EDIT,
                  currentId: referral._id as string,
                })
              )
            }
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
          <a
            href="#"
            onClick={() =>
              dispatch(
                changeModalStatus({
                  modalStatus: ModalStatus.REMOVE,
                  currentId: referral._id as string,
                })
              )
            }
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Delete
          </a>
        </td>
      </tr>
    </>
  );
};

export default ReferralItem;
