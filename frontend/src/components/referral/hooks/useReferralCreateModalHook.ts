import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useReferralCreateHook } from "."; 
import { ModalStatus } from "../../../types";

const useReferralCreateModalHook = () => {
    const dispatch = useAppDispatch();
    const createMutation = useReferralCreateHook();
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const receiverId = useAppSelector(state => state.modalStatus.currentId) as string;

    const validationSchema = z.object({
      price: z.string().transform(value => parseFloat(value)),
      desc: z.string(),
    });

    type ValidationSchema = z.infer<typeof validationSchema>;
    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const defaultValues = {
      price: 0,
      desc: "" 
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
      reset(defaultValues);
    }, []);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
        await createMutation.mutateAsync({...data, _id: null, receiver: receiverId});
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

export default useReferralCreateModalHook;