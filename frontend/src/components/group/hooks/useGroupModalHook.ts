import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { useGroupCreateHook, useGroupUpdateHook, useGetGroupHook } from "."; 
import { ModalStatus } from "../../../types";
import UploadService from "../../../services/FileUploadService";

const useGroupModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;
    const dispatch = useAppDispatch();

    const createMutation = useGroupCreateHook();
    const updateMutation = useGroupUpdateHook();
    
    const isEdit: boolean = modalStatus === "edit" ? true : false;

    const { data: editablegroup }  = useGetGroupHook(currentId, isEdit);

    const isOpen = modalStatus === "open" || modalStatus === "edit" ? true : false;
    const [logoFile, setLogoFile] = useState<string>("");
    // const logoFile = editablegroup.logo;

    const onLogoFileChange = (filename: string) => {
      setLogoFile(filename);
    }

    const validationSchema = z.object({
        name: z.string(),
        location: z.string(),
        owner: z.string(),
        profileStatus: z.boolean(),
        logo: z.any(),
        message: z.string(),
    });

    type ValidationSchema = z.infer<typeof validationSchema>;

    const defaultValues = {
        name: "",
        location: "",
        owner:"",
        profileStatus: false,
        logo: undefined,
        message: "",
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ValidationSchema>({
        // defaultValues: defaultValues,
        // resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (!currentId) {
          reset(defaultValues);
          setLogoFile("");
        } else if (editablegroup)
          {
            reset({
              name: editablegroup.name,
              location: editablegroup.location,
              owner: editablegroup.owner,
              profileStatus: editablegroup.profileStatus,
              message: editablegroup.message,
            });
            setLogoFile(editablegroup.logo);
        }
      }, [editablegroup, currentId]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
      isEdit ? updateMutation.mutateAsync({updatedGroup: {...data, _id: null, logo: logoFile}, _id: currentId}) : createMutation.mutateAsync({...data, _id: null, logo: logoFile});
      dispatch(
          changeModalStatus({
            modalStatus: ModalStatus.CLOSE,
            currentId: undefined,
          })
        );
        reset(defaultValues);
      };
    return {isOpen, register, handleSubmit, onSubmit, dispatch, errors, logoFile, onLogoFileChange}
}

export default useGroupModalHook;