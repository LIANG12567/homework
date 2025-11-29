import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assignmentAPI } from '../services/api';
import './AssignmentList.css';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await assignmentAPI.getAllAssignments();
      setAssignments(response.data);
      setError('');
    } catch (err) {
      setError('加载作业列表失败，请刷新重试');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await assignmentAPI.downloadAssignment(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('下载失败，请重试');
      console.error('Error downloading file:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-primary" onClick={fetchAssignments}>
          重新加载
        </button>
      </div>
    );
  }

  return (
    <div className="assignment-list-page">
      <div className="page-header">
        <h1>作业列表</h1>
        <p>查看所有已提交的作业</p>
      </div>

      {assignments.length === 0 ? (
        <div className="card">
          <p className="empty-message">暂无作业提交记录</p>
        </div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>学生姓名</th>
                  <th>学号</th>
                  <th>作业标题</th>
                  <th>文件大小</th>
                  <th>提交时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.student_name}</td>
                    <td>{assignment.student_id}</td>
                    <td>{assignment.title}</td>
                    <td>{formatFileSize(assignment.file_size)}</td>
                    <td>{formatDate(assignment.submitted_at)}</td>
                    <td>
                      <span className={`status-badge ${assignment.grade ? 'status-graded' : 'status-pending'}`}>
                        {assignment.grade ? '已评分' : '待评分'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/assignments/${assignment.id}`}
                          className="btn btn-primary action-btn"
                        >
                          查看
                        </Link>
                        <button
                          className="btn btn-secondary action-btn"
                          onClick={() => handleDownload(assignment.id, assignment.file_name)}
                        >
                          下载
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;

