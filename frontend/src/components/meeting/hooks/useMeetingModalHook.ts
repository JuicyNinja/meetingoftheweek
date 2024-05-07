import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useMeetingCreateHook, useMeetingUpdateHook, useGetMeetingHook } from "."; 
import { ModalStatus } from "../../../types";

const useMeetingModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
    const dispatch = useAppDispatch();

    const createMutation = useMeetingCreateHook();
    const updateMutation = useMeetingUpdateHook();
    
    const isEdit: boolean = modalStatus === "edit" ? true : false;

    const { data: editablemeeting }  = useGetMeetingHook(currentId, isEdit);

    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const validationSchema = z.object({
        meetingname: z.string(),
        group: z.string(),
        owner: z.string(),
        meetingtime: z.string(),
        meetinglink: z.string(),
        meetingStatus: z.boolean(),
    });

    type ValidationSchema = z.infer<typeof validationSchema>;

    const defaultValues = {
      meetingname: "",
      group: "",
      owner: "",
      meetingtime: "",
      meetinglink: "",
      meetingStatus: false,
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!currentId) {
          reset(defaultValues);
        } else if (editablemeeting)
          reset({
            meetingname: editablemeeting.meetingname,
            group: editablemeeting.group,
            owner: editablemeeting.owner,
            meetingtime: editablemeeting.meetingtime,
            meetinglink: editablemeeting.meetinglink,
            meetingStatus: editablemeeting.meetingStatus,
          });
      }, [editablemeeting, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
        isEdit ? await updateMutation.mutateAsync({updatedMeeting: {...data, _id: null}, _id: currentId}) : await createMutation.mutateAsync({...data, _id: null});
        dispatch(
            changeModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          );
          reset(defaultValues);
        };
    return {isOpen, register, handleSubmit, onSubmit, dispatch, errors}
}

export default useMeetingModalHook;