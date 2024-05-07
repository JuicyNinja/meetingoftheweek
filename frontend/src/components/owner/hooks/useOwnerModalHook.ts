import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useOwnerCreateHook, useOwnerUpdateHook, useGetOwnerHook } from "."; 
import { ModalStatus } from "../../../types";

const useOwnerModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
    const dispatch = useAppDispatch();

    const createMutation = useOwnerCreateHook();
    const updateMutation = useOwnerUpdateHook();
    
    const isEdit: boolean = modalStatus === "edit" ? true : false;

    const { data: editableowner }  = useGetOwnerHook(currentId, isEdit);

    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const validationSchema = z.object({
        group: z.string(),
        clanStatus: z.boolean(),
        profileStatus: z.boolean(),
      });

    type ValidationSchema = z.infer<typeof validationSchema>;

    const defaultValues = {
        group: "",
        clanStatus: false,
        profileStatus: false,
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        // defaultValues: defaultValues,
        // resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!currentId) {
          reset(defaultValues);
        } else if (editableowner)
          reset({
            group: editableowner.rank,
            clanStatus: editableowner.clanStatus,
            profileStatus: editableowner.profileStatus
 
          });
      }, [editableowner, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
        isEdit ? await updateMutation.mutateAsync({updatedOwner: {...data, _id: null}, _id: currentId}) : await createMutation.mutateAsync({...data, _id: null});
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

export default useOwnerModalHook;