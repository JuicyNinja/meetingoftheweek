import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useReferralUpdateHook, useGetReferralHook} from "."; 
import { ModalStatus } from "../../../types";

const useReferralEditModalHook = () => {
    const dispatch = useAppDispatch();
    const updateMutation = useReferralUpdateHook();
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;

    const validationSchema = z.object({
      price: z.string().transform(value => parseFloat(value)),
      desc: z.string(),
      status: z.string(),
      payStatus: z.boolean(),
    });
    const isEdit: boolean = modalStatus === "edit" ? true : false;
    const {data: editableReferral} = useGetReferralHook(currentId, isEdit);

    type ValidationSchema = z.infer<typeof validationSchema>;
    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const defaultValues = {
      price: 0,
      desc: "",
      status: "Pending",
      payStatus: false,
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
      if (!currentId) {
        reset(defaultValues);
      } else if (editableReferral) {
        reset({
          price: editableReferral.price,
          desc: editableReferral.desc,
          status: editableReferral.status,
          payStatus: editableReferral.payStatus
        })
      }
      
    }, [editableReferral, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
        await updateMutation.mutateAsync({updatedReferral: {...data, _id: null}, _id: currentId});
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

export default useReferralEditModalHook;