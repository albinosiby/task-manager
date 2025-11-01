import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Flag, Check, Clock, Star } from 'lucide-react';
import './TaskItem.css';

function TaskItem({ task, index, onDelete, onToggleCompletion }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Flag className="priority-icon high" size={16} />;
      case 'medium':
        return <Flag className="priority-icon medium" size={16} />;
      default:
        return <Flag className="priority-icon low" size={16} />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f5576c';
      case 'medium':
        return '#4facfe';
      default:
        return '#667eea';
    }
  };

  return (
    <motion.div
      className={`task-item ${task.completed ? 'completed' : ''} ${task.priority}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      layout
    >
      <div className="task-content">
        <motion.button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleCompletion(task.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            borderColor: task.completed ? 'transparent' : getPriorityColor(task.priority)
          }}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <Check size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="task-details">
          <div className="task-header">
            <span className="task-text">{task.text}</span>
            <div className="task-meta-icons">
              {getPriorityIcon(task.priority)}
              {task.priority === 'high' && <Star className="priority-star" size={12} />}
            </div>
          </div>
          <div className="task-meta">
            <Clock size={12} />
            <span className="task-date">{formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>

      <motion.button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Trash2 size={16} />
      </motion.button>

      {/* Animated completion line */}
      {task.completed && (
        <motion.div 
          className="completion-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
    </motion.div>
  );
}

export default TaskItem;