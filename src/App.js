import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Sparkles, Trophy, Clock, Plus, Zap } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleEffect from './components/ParticleEffect';
import { useSound } from './hooks/useSound';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const { playCompleteSound, playAddSound, playDeleteSound } = useSound();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('nexus-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('nexus-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now() + Math.random(),
      text: taskText,
      completed: false,
      createdAt: new Date(),
      priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    };
    setTasks([...tasks, newTask]);
    playAddSound();
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    playDeleteSound();
  };

  const toggleTaskCompletion = (taskId) => {
    const taskToToggle = tasks.find(task => task.id === taskId);
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Trigger celebration and sound when completing a task (not uncompleting)
    if (taskToToggle && !taskToToggle.completed) {
      playCompleteSound();
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000);
    }
  };

  const clearCompleted = () => {
    if (tasks.some(task => task.completed)) {
      playDeleteSound();
    }
    setTasks(tasks.filter(task => !task.completed));
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const highPriorityTasks = pendingTasks.filter(task => task.priority === 'high');

  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <AnimatedBackground />
      <AnimatePresence>
        {celebrate && <ParticleEffect />}
      </AnimatePresence>
      
      <motion.div 
        className="app-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.header 
          className="app-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="header-content">
            <motion.div 
              className="title-section"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="sparkle-icon" />
              <h1>Nexus Tasks</h1>
              <div className="badge">
                {tasks.length} tasks
              </div>
            </motion.div>

            <div className="header-actions">
              <motion.button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="stat-card">
              <Clock className="stat-icon" />
              <span className="stat-number">{pendingTasks.length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <Trophy className="stat-icon" />
              <span className="stat-number">{completedTasks.length}</span>
              <span className="stat-label">Completed</span>
            </div>
            
            <div className="stat-card productivity">
              <Sparkles className="stat-icon" />
              <span className="stat-number">{completionPercentage}%</span>
              <span className="stat-label">Productivity</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Main Content */}
        <main className="app-main">
          <TaskForm onAddTask={addTask} />
          
          <div className="tasks-layout">
            {/* Pending Tasks */}
            <motion.section 
              className="tasks-section pending"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="section-header">
                <h2>To Do</h2>
                <span className="task-count">{pendingTasks.length}</span>
              </div>
              <TaskList
                tasks={pendingTasks}
                onDeleteTask={deleteTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            </motion.section>

            {/* Completed Tasks */}
            <motion.section 
              className="tasks-section completed"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="section-header">
                <h2>Completed</h2>
                <div className="header-actions">
                  <span className="task-count">{completedTasks.length}</span>
                  {completedTasks.length > 0 && (
                    <motion.button
                      className="clear-btn"
                      onClick={clearCompleted}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </motion.button>
                  )}
                </div>
              </div>
              <TaskList
                tasks={completedTasks}
                onDeleteTask={deleteTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            </motion.section>
          </div>
        </main>

        {/* Floating Action Button */}
        <motion.button
          className="fab"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => document.querySelector('.task-input')?.focus()}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Plus size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;