import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useSeatCreateHook, useSeatUpdateHook, useGetSeatHook } from "."; 
import { ModalStatus } from "../../../types";
import { useParams } from "react-router-dom";

const useSeatModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string}>();
    const groupId = id? id:"";

    const createMutation = useSeatCreateHook();
    const updateMutation = useSeatUpdateHook();
    
    const isEdit: boolean = modalStatus === "edit" ? true : false;

    const { data: editableseat }  = useGetSeatHook(currentId, isEdit);

    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const validationSchema = z.object({
        seat: z.string(),
    });

    type ValidationSchema = z.infer<typeof validationSchema>;

    const defaultValues = {
        seat: "",
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        // defaultValues: defaultValues,
        // resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!currentId) {
          reset(defaultValues);
        } else if (editableseat)
          {
            reset({
              seat: editableseat.seat,
            });
        }
      }, [editableseat, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
      console.log(data);
      isEdit ? updateMutation.mutateAsync({updatedSeat: {...data, _id: null, group_id: groupId}, _id: currentId}) : createMutation.mutateAsync({...data, _id: null, group_id: groupId});
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

export default useSeatModalHook;