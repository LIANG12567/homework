import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 作业相关 API
export const assignmentAPI = {
  // 提交作业
  submitAssignment: (formData) => {
    return api.post('/assignments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 获取所有作业
  getAllAssignments: () => {
    return api.get('/assignments');
  },

  // 获取单个作业详情
  getAssignmentById: (id) => {
    return api.get(`/assignments/${id}`);
  },

  // 下载作业文件
  downloadAssignment: (id) => {
    return api.get(`/assignments/${id}/download`, {
      responseType: 'blob',
    });
  },

  // 更新评分
  updateGrade: (id, grade) => {
    return api.put(`/assignments/${id}/grade`, { grade });
  },

  // 更新反馈
  updateFeedback: (id, feedback) => {
    return api.put(`/assignments/${id}/feedback`, { feedback });
  },

  // 同时更新评分和反馈
  updateGradeAndFeedback: (id, grade, feedback) => {
    return api.put(`/assignments/${id}/grade-feedback`, { grade, feedback });
  },
};

export default api;

