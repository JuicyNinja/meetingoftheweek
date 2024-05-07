import MuiAvatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LogoImg from "../../assets/img/business.png";
import React from 'react';
import { IMAGE_URL } from '../../utils/constants';

interface BusinessInfoProps {
  url?: string | null;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ url }) => {
  const imgUrl = url && url != "" ? IMAGE_URL + url : LogoImg
  return (
    <Stack direction="row" spacing={2}>
      <MuiAvatar
        alt="Business Logo"
        src={imgUrl}
        sx={{
          marginTop: "2rem",
          width: "10rem",
          height: "10rem",
          borderRadius: 0, // Set borderRadius to 0 for square corners
        }}
      />
    </Stack>
  );
}

export default BusinessInfo;
