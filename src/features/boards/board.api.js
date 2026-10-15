import api from "../../shared/lib/axios";

export const getBoards = async () => {
  const response = await api.get("/boards");
  return response.data.boards;
};

export const getBoard = async (boardId) => {
  const response = await api.get(`/boards/${boardId}`);
  return response.data.board;
};

export const createBoard = async (data) => {
  const response = await api.post("/boards", data);
  return response.data.board;
};

export const updateBoard = async (boardId, data) => {
  const response = await api.patch(`/boards/${boardId}`, data);
  return response.data.board;
};

export const deleteBoard = async (boardId) => {
  const response = await api.delete(`/boards/${boardId}`);
  return response.data;
};

export const leaveBoard = async (boardId) => {
  const response = await api.delete(`/boards/${boardId}/leave`);
  return response.data;
};

export const shareBoard = async (boardId, email) => {
  const response = await api.post(`/boards/${boardId}/members`, { email });
  return response.data.board;
};

export const removeBoardMember = async (boardId, memberId) => {
  const response = await api.delete(`/boards/${boardId}/members/${memberId}`);
  return response.data.board;
};
