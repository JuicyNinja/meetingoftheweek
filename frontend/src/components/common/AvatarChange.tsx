import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import MuiAvatar from '@mui/material/Avatar';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UploadService from "../../services/FileUploadService";
import { IAvatarChange } from "../../types";
import { IMAGE_URL } from "../../utils/constants";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AvatarChange: React.FC<IAvatarChange> = ({ filename, width, height, btntext, onFileNameChange}) => {
  const [mainImg, setMainImg] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [file, setFile] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setPreviewImage(mainImg);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const handleSaveImage = () => {
    if (!file) {
      setOpen(false);
      return;
    }
    UploadService.upload(file, () => {})
      .then((response) => {
        setMainImg(IMAGE_URL + response.data.filename);
        onFileNameChange(response.data.filename);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  useEffect(() => {
    setMainImg(IMAGE_URL + ((filename && filename.length > 0) ? filename as string : "avatar.png"));
  }, [filename])

  const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    const uploadFile = selectedFiles?.[0];
    const imageUrl = URL.createObjectURL(uploadFile);
    setFile(uploadFile);
    setPreviewImage(imageUrl);
  }
  useEffect(() => {
    
  }, [mainImg]);

  // const profileImg = sotreImage.map((ele) => ele.img);
  // console.log(props.personalInfo, errors);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <MuiAvatar
        sx={{
            marginBottom: 1,
            width: {width},
            height: {height},
            borderRadius: 0, // Set borderRadius to 0 for square corners
        }}
        alt="Avatar Change"
        src={ mainImg }
      />
      <Button
          variant="outlined"
          style={{textTransform: 'none', paddingBottom: 1, paddingTop: 1}}
          onClick={handleClickOpen}>
          {btntext}
        </Button>
      <div>
        
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}>
            Update Image
          </BootstrapDialogTitle>
          <DialogContent>
            <label className="btn btn-default p-0">
              <input
                  type="file" 
                  accept="image/*"
                  className="hidden-input"
                  onChange={handleChooseFile}
              />
              <div>
                  <MuiAvatar
                    sx={{
                        width: 400,
                        height: 400,
                        borderRadius: 0, // Set borderRadius to 0 for square corners
                    }}
                    alt="Avatar Change"
                    src={ previewImage }
                  />
              </div>
            </label>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleSaveImage}>
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </Box>
  );
};

export default AvatarChange;
