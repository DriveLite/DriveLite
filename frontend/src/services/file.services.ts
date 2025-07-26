import api from "@/libs/axios";

export const uploadFile = (formData: FormData) =>
  api.post("/files/upload", formData);
export const getFiles = () => api.get("/files");
export const deleteFile = (id: string) => api.delete(`/files/${id}`);
