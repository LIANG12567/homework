const fs = require('fs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, '../database/assignments.json');

// 确保数据库文件存在
function ensureDatabase() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2), 'utf8');
  }
}

// 读取数据库
function readDatabase() {
  ensureDatabase();
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// 写入数据库
function writeDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// 初始化数据库
ensureDatabase();

// 数据库操作方法
const Assignment = {
  // 创建作业记录
  create(assignmentData) {
    const data = readDatabase();
    const newAssignment = {
      id: data.length > 0 ? Math.max(...data.map(a => a.id)) + 1 : 1,
      student_name: assignmentData.student_name,
      student_id: assignmentData.student_id,
      title: assignmentData.title,
      description: assignmentData.description || null,
      file_path: assignmentData.file_path,
      file_name: assignmentData.file_name,
      file_size: assignmentData.file_size,
      grade: null,
      feedback: null,
      submitted_at: new Date().toISOString()
    };
    data.push(newAssignment);
    writeDatabase(data);
    return newAssignment;
  },

  // 根据 ID 查找作业
  findById(id) {
    const data = readDatabase();
    return data.find(a => a.id === parseInt(id)) || null;
  },

  // 获取所有作业
  findAll() {
    const data = readDatabase();
    return data.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
  },

  // 更新评分
  updateGrade(id, grade) {
    const data = readDatabase();
    const assignment = data.find(a => a.id === parseInt(id));
    if (assignment) {
      assignment.grade = grade;
      writeDatabase(data);
      return assignment;
    }
    return null;
  },

  // 更新反馈
  updateFeedback(id, feedback) {
    const data = readDatabase();
    const assignment = data.find(a => a.id === parseInt(id));
    if (assignment) {
      assignment.feedback = feedback;
      writeDatabase(data);
      return assignment;
    }
    return null;
  },

  // 同时更新评分和反馈
  updateGradeAndFeedback(id, grade, feedback) {
    const data = readDatabase();
    const assignment = data.find(a => a.id === parseInt(id));
    if (assignment) {
      if (grade !== null && grade !== undefined) {
        assignment.grade = grade;
      }
      if (feedback !== null && feedback !== undefined) {
        assignment.feedback = feedback;
      }
      writeDatabase(data);
      return assignment;
    }
    return null;
  }
};

module.exports = Assignment;
