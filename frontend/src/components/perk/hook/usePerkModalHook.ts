import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { usePerkCreateHook, usePerkUpdateHook, useGetPerkHook } from "."; 
import { ModalStatus } from "../../../types";

const usePerkModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
    const dispatch = useAppDispatch();

    const createMutation = usePerkCreateHook();
    const updateMutation = usePerkUpdateHook();
    
    const isEdit: boolean = modalStatus === "edit" ? true : false;

    const { data: editableperk }  = useGetPerkHook(currentId, isEdit);

    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;

    const validationSchema = z.object({
        name: z.string(),
        price: z.string().transform(value => parseFloat(value)),
        desc: z.string(),
        terms: z.string(),
      });

    type ValidationSchema = z.infer<typeof validationSchema>;

    const defaultValues = {
        name: "",
        price: 0,
        desc: "",
        terms: "",
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!currentId) {
          reset(defaultValues);
        } else if (editableperk)
          reset({
            name: editableperk.name,
            price: editableperk.price,
            desc: editableperk.desc,
            terms: editableperk.terms
          });
      }, [editableperk, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
        console.log(data);
        isEdit ? await updateMutation.mutateAsync({updatedPerk: {...data, _id: null, user_id: null}, _id: currentId}) : await createMutation.mutateAsync({...data, _id: null, user_id: ""});
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

export default usePerkModalHook;