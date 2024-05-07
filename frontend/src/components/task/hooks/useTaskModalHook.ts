import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useTaskCreateHook, useTaskUpdateHook, useGetTaskHook } from "."; 
import { ModalStatus } from "../../../types";

const useTaskModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
    const dispatch = useAppDispatch();

    const createMutation = useTaskCreateHook();
    const updateMutation = useTaskUpdateHook();
    
    const isEdit: boolean = modalStatus === "edit" ? true : false;

    const { data: editabletask }  = useGetTaskHook(currentId, isEdit);

    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const validationSchema = z.object({
        title: z.string().min(5, {message: "Title must be at least 5 letters."}),
        desc: z.string().min(5, {message: "Description must be at least 5 letters."}),
        taskStatus: z.boolean(),
    });

    type ValidationSchema = z.infer<typeof validationSchema>;

    const defaultValues = {
        title: "",
        desc: "",
        taskStatus: false,
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!currentId) {
          reset(defaultValues);
        } else if (editabletask)
          reset({
            title: editabletask.title,
            desc: editabletask.desc,
            taskStatus: editabletask.taskStatus,
          });
      }, [editabletask, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
        isEdit ? await updateMutation.mutateAsync({updatedTask: {...data, _id: null}, _id: currentId}) : await createMutation.mutateAsync({...data, _id: null});
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

export default useTaskModalHook;