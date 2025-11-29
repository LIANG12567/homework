const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// 提交作业
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择要上传的文件' });
    }

    const { student_name, student_id, title, description } = req.body;

    // 验证必填字段
    if (!student_name || !student_id || !title) {
      // 如果验证失败，删除已上传的文件
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: '请填写所有必填字段' });
    }

    // 创建作业记录
    const assignment = Assignment.create({
      student_name,
      student_id,
      title,
      description: description || null,
      file_path: req.file.path,
      file_name: req.file.originalname,
      file_size: req.file.size
    });

    res.status(201).json({
      message: '作业提交成功',
      assignment
    });
  } catch (error) {
    // 如果出错，删除已上传的文件
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// 获取所有作业列表
router.get('/', (req, res) => {
  try {
    const assignments = Assignment.findAll();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个作业详情
router.get('/:id', (req, res) => {
  try {
    const assignment = Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: '作业不存在' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 下载作业文件
router.get('/:id/download', (req, res) => {
  try {
    const assignment = Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: '作业不存在' });
    }

    const filePath = assignment.file_path;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: '文件不存在' });
    }

    const encodedName = encodeURIComponent(assignment.file_name);
    res.setHeader('Content-Disposition', `attachment; filename="${encodedName}"; filename*=UTF-8''${encodedName}`);
    res.download(filePath, assignment.file_name, (err) => {
      if (err) {
        res.status(500).json({ error: '文件下载失败' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新作业评分
router.put('/:id/grade', (req, res) => {
  try {
    const { grade } = req.body;
    
    if (grade === undefined || grade === null) {
      return res.status(400).json({ error: '请提供评分' });
    }

    const gradeNum = parseInt(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      return res.status(400).json({ error: '评分必须是 0-100 之间的数字' });
    }

    const assignment = Assignment.updateGrade(req.params.id, gradeNum);
    if (!assignment) {
      return res.status(404).json({ error: '作业不存在' });
    }

    res.json({
      message: '评分更新成功',
      assignment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新作业反馈
router.put('/:id/feedback', (req, res) => {
  try {
    const { feedback } = req.body;
    
    if (!feedback) {
      return res.status(400).json({ error: '请提供反馈内容' });
    }

    const assignment = Assignment.updateFeedback(req.params.id, feedback);
    if (!assignment) {
      return res.status(404).json({ error: '作业不存在' });
    }

    res.json({
      message: '反馈更新成功',
      assignment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 同时更新评分和反馈
router.put('/:id/grade-feedback', (req, res) => {
  try {
    const { grade, feedback } = req.body;
    
    let gradeNum = null;
    if (grade !== undefined && grade !== null) {
      gradeNum = parseInt(grade);
      if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
        return res.status(400).json({ error: '评分必须是 0-100 之间的数字' });
      }
    }

    const assignment = Assignment.updateGradeAndFeedback(
      req.params.id,
      gradeNum,
      feedback || null
    );
    
    if (!assignment) {
      return res.status(404).json({ error: '作业不存在' });
    }

    res.json({
      message: '评分和反馈更新成功',
      assignment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

