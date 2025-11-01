import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap } from 'lucide-react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <motion.div 
      className="task-form-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <form className="task-form" onSubmit={handleSubmit}>
        <div className={`input-container ${isFocused ? 'focused' : ''}`}>
          <Zap className="input-icon" />
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What amazing thing will you accomplish today?"
            className="task-input"
          />
          <AnimatePresence>
            {taskText && (
              <motion.button
                type="submit"
                className="submit-btn"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="input-underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </form>
    </motion.div>
  );
}

export default TaskForm;