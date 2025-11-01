import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onDeleteTask, onToggleCompletion }) {
  if (tasks.length === 0) {
    return (
      <motion.div 
        className="empty-state"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="empty-icon">✨</div>
        <h3>All clear!</h3>
        <p>Nothing to see here. Add some tasks to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div className="task-list" layout>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            onDelete={onDeleteTask}
            onToggleCompletion={onToggleCompletion}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default TaskList;