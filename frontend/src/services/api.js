import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getContents = (role) => API.get("/content", { headers: { role } });

export const createContent = (data, role) =>
  API.post("/content", data, { headers: { role } });

export const editContent = (id, data, role) => 
    API.put(`/content/${id}`, data, { headers: { role } })

export const submitContent = (id, role) =>
  API.post(`/content/${id}/submit`, {}, { headers: { role } });

export const approveContent = (id, role, comment) =>
  API.post(
    `/content/${id}/approve`,
    { comment },
    { headers: { role } }
  );

export const rejectContent = (id, role, comment) =>
  API.post(
    `/content/${id}/reject`,
    { comment },
    { headers: { role } }
  );

export const getApprovals = (id) =>
  API.get(`/content/${id}/approvals`);