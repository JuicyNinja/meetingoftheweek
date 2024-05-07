import instance from '../utils/axiosInstance';
import { SERVER_URL } from '../utils/constants';

const baseUrl = SERVER_URL + 'api/files/';

const upload = (file: File, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);
  return instance.post(baseUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () : Promise<any> => {
  return instance.get(baseUrl);
};

const getFile = (filename : string) : Promise<any> => {
    return instance.get(baseUrl + filename);
}

const FileUploadService = {
  upload,
  getFiles,
  getFile
};

export default FileUploadService;