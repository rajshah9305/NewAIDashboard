import React, { useState, useEffect } from 'react';
import { 
  Bot, TrendingUp, ListTodo, Layers, PlayCircle, BarChart3, Folder,
  Menu, Bell, UserCircle, Plus, Search, Star, Clock, CheckCircle,
  AlertCircle, DollarSign, ArrowUp, FileText, Edit, Play, Pause,
  Settings, Trash2, Eye, Download, Filter, X, Save, RefreshCw,
  Zap, Target, Users, Activity, Calendar, MessageSquare, Code,
  Database, Globe, Calculator, FileSearch, Cpu, Gauge, Award,
  TrendingDown, MoreHorizontal, ExternalLink, Copy, Share2,
  ChevronDown, ChevronUp, LogOut, User, HelpCircle, Mail,
  Send, Upload, Link, Hash, ArrowRight
} from 'lucide-react';

const CrewAIDashboardProV9 = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionOutput, setExecutionOutput] = useState('');
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditAgentModal, setShowEditAgentModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [crewTopic, setCrewTopic] = useState('');
  const [isRunningCrew, setIsRunningCrew] = useState(false);
  const [crewProgress, setCrewProgress] = useState(0);
  const [crewOutput, setCrewOutput] = useState('');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeExecutions: 0,
    queuedTasks: 0,
    totalTokensToday: 15420,
    costToday: 12.45,
    avgResponseTime: '2.3s',
    successRate: 94.2
  });

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        totalTokensToday: prev.totalTokensToday + Math.floor(Math.random() * 50),
        costToday: prev.costToday + (Math.random() * 0.1),
        avgResponseTime: (2.0 + Math.random() * 1.0).toFixed(1) + 's',
        successRate: 93.5 + Math.random() * 1.4
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced mock data with edit capabilities
  const [agents, setAgents] = useState([
    { 
      id: 1, 
      name: 'Senior Marketing Analyst', 
      role: 'Market Research Specialist',
      goal: 'Analyze market trends and competitor strategies to provide actionable insights',
      backstory: 'Expert in market analysis with 10+ years experience in strategic planning',
      model: 'llama-3.3-70b',
      temperature: 70,
      maxIterations: 10,
      tools: ['web_search', 'data_analysis', 'report_generator'],
      status: 'active', 
      score: 94, 
      tasks: 12,
      tokensUsed: 45230,
      avgResponseTime: '2.3s',
      createdAt: '2024-01-15',
      lastActive: new Date().toISOString()
    },
    { 
      id: 2, 
      name: 'Content Strategist Pro', 
      role: 'Content Creation Specialist',
      goal: 'Create engaging, brand-aligned content across multiple channels',
      backstory: 'Creative content strategist with expertise in digital marketing and brand storytelling',
      model: 'llama-4-scout-17b',
      temperature: 85,
      maxIterations: 8,
      tools: ['content_generator', 'seo_optimizer', 'social_media'],
      status: 'idle', 
      score: 89, 
      tasks: 8,
      tokensUsed: 32150,
      avgResponseTime: '1.8s',
      createdAt: '2024-01-12',
      lastActive: new Date(Date.now() - 300000).toISOString()
    },
    { 
      id: 3, 
      name: 'Research Specialist', 
      role: 'Data Research Analyst',
      goal: 'Conduct comprehensive research and data analysis for strategic decision making',
      backstory: 'PhD in Data Science with specialization in market research and competitive intelligence',
      model: 'llama-4-maverick-17b',
      temperature: 60,
      maxIterations: 15,
      tools: ['web_search', 'data_mining', 'statistical_analysis', 'academic_search'],
      status: 'busy', 
      score: 96, 
      tasks: 15,
      tokensUsed: 67890,
      avgResponseTime: '3.1s',
      createdAt: '2024-01-08',
      lastActive: new Date().toISOString()
    }
  ]);

  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      name: 'Q1 Market Analysis Report', 
      description: 'Comprehensive market analysis including competitor research, trend analysis, and strategic recommendations for Q1 2024.',
      expectedOutput: 'Detailed PDF report with executive summary, market insights, competitor analysis, and actionable recommendations.',
      agentId: 1,
      agentName: 'Senior Marketing Analyst',
      priority: 'high', 
      status: 'in-progress', 
      progress: 75,
      outputFormat: 'PDF',
      dueDate: '2024-02-15',
      estimatedTime: '4 hours',
      createdAt: '2024-01-20',
      lastUpdated: new Date().toISOString()
    },
    { 
      id: 2, 
      name: 'Competitor Strategy Research', 
      description: 'In-depth analysis of top 5 competitors including their marketing strategies, pricing models, and market positioning.',
      expectedOutput: 'Research document with competitor profiles, SWOT analysis, and strategic insights.',
      agentId: 3,
      agentName: 'Research Specialist',
      priority: 'urgent', 
      status: 'pending', 
      progress: 0,
      outputFormat: 'Markdown',
      dueDate: '2024-02-10',
      estimatedTime: '6 hours',
      createdAt: '2024-01-22',
      lastUpdated: new Date(Date.now() - 600000).toISOString()
    },
    { 
      id: 3, 
      name: 'Content Calendar Q1 2024', 
      description: 'Create comprehensive content calendar for Q1 with themes, topics, publication schedule, and platform-specific adaptations.',
      expectedOutput: 'Interactive content calendar with detailed content briefs and scheduling recommendations.',
      agentId: 2,
      agentName: 'Content Strategist Pro',
      priority: 'medium', 
      status: 'completed', 
      progress: 100,
      outputFormat: 'JSON',
      dueDate: '2024-02-01',
      estimatedTime: '3 hours',
      createdAt: '2024-01-18',
      completedAt: '2024-01-25',
      lastUpdated: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  const [templates, setTemplates] = useState([
    { 
      id: 1, 
      name: 'Research & Analysis Team', 
      description: 'Complete research workflow with market analysis, competitor research, and strategic recommendations.',
      agents: 3, 
      tasks: 5, 
      rating: 4.6, 
      category: 'Research',
      downloads: 1247,
      author: 'CrewAI Team',
      featured: true,
      estimatedTime: '8-12 hours',
      complexity: 'Advanced',
      config: {
        agents: [
          { name: 'Market Analyst', role: 'Research Lead' },
          { name: 'Data Specialist', role: 'Data Analyst' },
          { name: 'Strategy Advisor', role: 'Strategic Planner' }
        ],
        tasks: [
          'Market Research', 'Competitor Analysis', 'Data Processing', 'Strategic Planning', 'Report Generation'
        ]
      }
    },
    { 
      id: 2, 
      name: 'Content Creation Crew', 
      description: 'End-to-end content creation workflow from ideation to publication across multiple channels.',
      agents: 2, 
      tasks: 4, 
      rating: 4.8, 
      category: 'Marketing',
      downloads: 892,
      author: 'Marketing Pros',
      featured: true,
      estimatedTime: '4-6 hours',
      complexity: 'Intermediate',
      config: {
        agents: [
          { name: 'Content Creator', role: 'Content Writer' },
          { name: 'SEO Specialist', role: 'SEO Optimizer' }
        ],
        tasks: [
          'Content Ideation', 'Content Creation', 'SEO Optimization', 'Publishing'
        ]
      }
    },
    { 
      id: 3, 
      name: 'Data Processing Pipeline', 
      description: 'Automated data processing and analysis workflow with visualization and reporting capabilities.',
      agents: 4, 
      tasks: 7, 
      rating: 4.5, 
      category: 'Analytics',
      downloads: 634,
      author: 'DataFlow Inc',
      featured: false,
      estimatedTime: '6-10 hours',
      complexity: 'Advanced',
      config: {
        agents: [
          { name: 'Data Engineer', role: 'Data Processing' },
          { name: 'Data Analyst', role: 'Analysis' },
          { name: 'Visualization Expert', role: 'Charts & Graphs' },
          { name: 'Report Writer', role: 'Documentation' }
        ],
        tasks: [
          'Data Collection', 'Data Cleaning', 'Analysis', 'Visualization', 'Quality Check', 'Report Writing', 'Delivery'
        ]
      }
    }
  ]);

  const [files, setFiles] = useState([
    { 
      id: 1, 
      name: 'Q4_Market_Analysis.pdf', 
      type: 'report', 
      size: '2.4 MB', 
      downloads: 23,
      createdAt: '2024-01-25',
      agent: 'Senior Marketing Analyst',
      task: 'Q4 Market Analysis Report',
      status: 'published',
      content: 'This is a comprehensive market analysis report covering Q4 2023 performance, market trends, competitor analysis, and strategic recommendations for Q1 2024. The report includes detailed charts, graphs, and actionable insights for stakeholders.',
      url: '#'
    },
    { 
      id: 2, 
      name: 'Content_Strategy_2024.docx', 
      type: 'strategy', 
      size: '1.8 MB', 
      downloads: 15,
      createdAt: '2024-01-24',
      agent: 'Content Strategist Pro',
      task: 'Content Calendar Q1 2024',
      status: 'published',
      content: 'Content strategy document outlining themes, topics, publication schedules, and platform-specific content adaptations for 2024.',
      url: '#'
    },
    { 
      id: 3, 
      name: 'Customer_Data_Analysis.csv', 
      type: 'data', 
      size: '5.2 MB', 
      downloads: 8,
      createdAt: '2024-01-23',
      agent: 'Research Specialist',
      task: 'Customer Behavior Analysis',
      status: 'draft',
      content: 'Raw customer data analysis with behavioral patterns, purchase trends, and demographic insights.',
      url: '#'
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Agent "Marketing Analyst" created successfully', time: '2 min ago', read: false },
    { id: 2, type: 'info', message: 'Task "Market Research" assigned to Research Specialist', time: '5 min ago', read: false },
    { id: 3, type: 'warning', message: 'Execution queue has 3 pending workflows', time: '10 min ago', read: true },
    { id: 4, type: 'success', message: 'Report "Q4_Analysis.pdf" generated', time: '15 min ago', read: true },
    { id: 5, type: 'error', message: 'Agent "Data Processor" execution failed', time: '20 min ago', read: false }
  ]);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'agents', label: 'Agents', icon: Bot, badge: agents.length },
    { id: 'tasks', label: 'Tasks', icon: ListTodo, badge: tasks.filter(t => t.status !== 'completed').length },
    { id: 'templates', label: 'Templates', icon: Layers },
    { id: 'crew-goal', label: 'Crew Goal', icon: Target },
    { id: 'execution', label: 'Execution', icon: PlayCircle, badge: isExecuting ? 'Live' : null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'files', label: 'Files', icon: Folder, badge: files.length }
  ];

  const cerebrasModels = [
    { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', description: 'General purpose, balanced performance' },
    { id: 'llama-4-scout-17b', name: 'Llama 4 Scout 17B', description: 'Fast inference, optimized for quick responses' },
    { id: 'llama-4-maverick-17b', name: 'Llama 4 Maverick 17B', description: 'Extended context, complex reasoning' }
  ];

  const availableTools = [
    { id: 'web_search', name: 'Web Search', icon: Globe },
    { id: 'data_analysis', name: 'Data Analysis', icon: BarChart3 },
    { id: 'file_reader', name: 'File Reader', icon: FileText },
    { id: 'calculator', name: 'Calculator', icon: Calculator },
    { id: 'code_interpreter', name: 'Code Interpreter', icon: Code },
    { id: 'report_generator', name: 'Report Generator', icon: FileSearch },
    { id: 'database_query', name: 'Database Query', icon: Database }
  ];

  // Form states
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    goal: '',
    backstory: '',
    model: 'llama-3.3-70b',
    temperature: 70,
    maxIterations: 10,
    tools: []
  });

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    expectedOutput: '',
    agentId: '',
    priority: 'medium',
    outputFormat: 'text',
    additionalContext: '',
    dueDate: ''
  });

  // CRUD Operations for Agents
  const createAgent = () => {
    if (!newAgent.name || !newAgent.role || !newAgent.goal || !newAgent.backstory) {
      alert('Please fill in all required fields');
      return;
    }
    
    const agent = {
      id: Math.max(...agents.map(a => a.id)) + 1,
      ...newAgent,
      status: 'idle',
      score: Math.floor(Math.random() * 20) + 80,
      tasks: 0,
      tokensUsed: 0,
      avgResponseTime: '0s',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString()
    };
    
    setAgents(prev => [...prev, agent]);
    setNewAgent({
      name: '', role: '', goal: '', backstory: '',
      model: 'llama-3.3-70b', temperature: 70, maxIterations: 10, tools: []
    });
    setShowCreateAgentModal(false);
    
    addNotification('success', `Agent "${agent.name}" created successfully`);
  };

  const editAgent = (agent) => {
    setSelectedAgent(agent);
    setNewAgent({
      name: agent.name,
      role: agent.role,
      goal: agent.goal,
      backstory: agent.backstory,
      model: agent.model,
      temperature: agent.temperature,
      maxIterations: agent.maxIterations,
      tools: agent.tools
    });
    setShowEditAgentModal(true);
  };

  const saveAgent = () => {
    if (!selectedAgent) return;
    
    const updatedAgent = {
      ...selectedAgent,
      ...newAgent,
      lastActive: new Date().toISOString()
    };
    
    setAgents(prev => prev.map(a => a.id === selectedAgent.id ? updatedAgent : a));
    setShowEditAgentModal(false);
    setSelectedAgent(null);
    addNotification('success', `Agent "${updatedAgent.name}" updated successfully`);
  };

  const deleteAgent = (id) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      const agent = agents.find(a => a.id === id);
      setAgents(prev => prev.filter(a => a.id !== id));
      addNotification('warning', `Agent "${agent?.name}" deleted`);
    }
  };

  const playAgent = (agent) => {
    setAgents(prev => prev.map(a => 
      a.id === agent.id ? { ...a, status: 'active', lastActive: new Date().toISOString() } : a
    ));
    addNotification('info', `Agent "${agent.name}" activated`);
  };

  // CRUD Operations for Tasks
  const createTask = () => {
    if (!newTask.name || !newTask.description || !newTask.expectedOutput || !newTask.agentId) {
      alert('Please fill in all required fields');
      return;
    }
    
    const selectedAgent = agents.find(a => a.id === parseInt(newTask.agentId));
    const task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      ...newTask,
      agentId: parseInt(newTask.agentId),
      agentName: selectedAgent?.name || 'Unknown Agent',
      status: 'pending',
      progress: 0,
      estimatedTime: '2-4 hours',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({
      name: '', description: '', expectedOutput: '', agentId: '',
      priority: 'medium', outputFormat: 'text', additionalContext: '', dueDate: ''
    });
    setShowCreateTaskModal(false);
    
    addNotification('info', `Task "${task.name}" created and assigned to ${selectedAgent?.name}`);
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setNewTask({
      name: task.name,
      description: task.description,
      expectedOutput: task.expectedOutput,
      agentId: task.agentId.toString(),
      priority: task.priority,
      outputFormat: task.outputFormat,
      additionalContext: task.additionalContext || '',
      dueDate: task.dueDate
    });
    setShowEditTaskModal(true);
  };

  const saveTask = () => {
    if (!selectedTask) return;
    
    const selectedAgent = agents.find(a => a.id === parseInt(newTask.agentId));
    const updatedTask = {
      ...selectedTask,
      ...newTask,
      agentId: parseInt(newTask.agentId),
      agentName: selectedAgent?.name || 'Unknown Agent',
      lastUpdated: new Date().toISOString()
    };
    
    setTasks(prev => prev.map(t => t.id === selectedTask.id ? updatedTask : t));
    setShowEditTaskModal(false);
    setSelectedTask(null);
    addNotification('success', `Task "${updatedTask.name}" updated successfully`);
  };

  const deleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const task = tasks.find(t => t.id === id);
      setTasks(prev => prev.filter(t => t.id !== id));
      addNotification('warning', `Task "${task?.name}" deleted`);
    }
  };

  const playTask = (task) => {
    setTasks(prev => prev.map(t => 
      t.id === task.id ? { 
        ...t, 
        status: 'in-progress', 
        progress: Math.min(100, t.progress + 25),
        lastUpdated: new Date().toISOString()
      } : t
    ));
    addNotification('info', `Task "${task.name}" started`);
  };

  // Template Operations
  const useTemplate = async (template) => {
    addNotification('info', `Loading template "${template.name}"...`);
    
    setTimeout(() => {
      template.config.agents.forEach((agentConfig, index) => {
        const newAgent = {
          id: Math.max(...agents.map(a => a.id)) + index + 1,
          name: agentConfig.name,
          role: agentConfig.role,
          goal: `Execute ${template.name} workflow objectives`,
          backstory: `Specialized agent for ${template.category} workflows`,
          model: 'llama-3.3-70b',
          temperature: 70,
          maxIterations: 10,
          tools: ['web_search', 'data_analysis'],
          status: 'idle',
          score: 85 + Math.floor(Math.random() * 15),
          tasks: 0,
          tokensUsed: 0,
          avgResponseTime: '0s',
          createdAt: new Date().toISOString().split('T')[0],
          lastActive: new Date().toISOString()
        };
        setAgents(prev => [...prev, newAgent]);
      });
      
      addNotification('success', `Template "${template.name}" applied successfully!`);
      setActiveTab('agents');
    }, 2000);
  };

  // File Operations
  const previewFile = (file) => {
    setSelectedFile(file);
    setShowFilePreview(true);
  };

  const downloadFile = (file) => {
    setFiles(prev => prev.map(f => 
      f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f
    ));
    addNotification('success', `File "${file.name}" downloaded`);
  };

  const exportAllFiles = () => {
    addNotification('info', 'Preparing file export...');
    setTimeout(() => {
      addNotification('success', 'All files exported successfully');
    }, 2000);
  };

  // Crew Goal Assignment
  const runCrew = async () => {
    if (!crewTopic.trim()) {
      alert('Please enter a topic or goal for the crew');
      return;
    }

    setIsRunningCrew(true);
    setCrewProgress(0);
    setCrewOutput('');

    const steps = [
      `🎯 Crew Goal Set: "${crewTopic}"`,
      '🤖 Initializing available agents...',
      '📋 Assigning roles and responsibilities...',
      '🔄 Starting collaborative workflow...',
      '📊 Agent 1: Gathering initial data and insights...',
      '🔍 Agent 2: Conducting detailed analysis...',
      '📝 Agent 3: Synthesizing findings and recommendations...',
      '✅ Quality assurance and validation checks...',
      '📄 Generating comprehensive report...',
      '🎉 Crew execution completed successfully!',
      `📊 Results: High-quality deliverable for "${crewTopic}"`,
      '💰 Cost: $3.45 | Duration: 4m 12s | Agents Used: 3'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      setCrewOutput(prev => prev + steps[i] + '\n');
      setCrewProgress(((i + 1) / steps.length) * 100);
    }

    setTimeout(() => {
      setIsRunningCrew(false);
      const newFile = {
        id: Math.max(...files.map(f => f.id)) + 1,
        name: `Crew_Report_${crewTopic.replace(/\s+/g, '_')}.pdf`,
        type: 'report',
        size: '4.2 MB',
        downloads: 0,
        createdAt: new Date().toISOString().split('T')[0],
        agent: 'Crew Collaboration',
        task: `Crew Goal: ${crewTopic}`,
        status: 'published',
        content: `Collaborative report generated by the crew for the topic: ${crewTopic}`,
        url: '#'
      };
      setFiles(prev => [newFile, ...prev]);
      addNotification('success', 'Crew execution completed! Report generated.');
    }, 1000);
  };

  // Execution Operations
  const startExecution = async () => {
    setIsExecuting(true);
    setExecutionProgress(0);
    setExecutionOutput('');
    
    const steps = [
      'Initializing CrewAI execution environment...',
      'Loading selected agents and validating configurations...',
      'Establishing connection to Cerebras AI models...',
      '🤖 Agent "Senior Marketing Analyst" activated',
      '📊 Processing real-time market data sources...',
      '🔍 Analyzing competitor strategies and market trends...',
      '📈 Generating data visualizations and insights...',
      '🤖 Agent "Research Specialist" joining workflow...',
      '📑 Cross-referencing research findings...',
      '✅ Quality assurance checks completed',
      '📄 Compiling comprehensive report...',
      '🎯 Applying business intelligence algorithms...',
      '💾 Saving results to file system...',
      '✨ Workflow execution completed successfully!',
      '📊 Performance metrics: 94.2% accuracy, 15,420 tokens used',
      '💰 Total cost: $2.45 | Duration: 2m 34s'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 400));
      setExecutionOutput(prev => prev + steps[i] + '\n');
      setExecutionProgress(((i + 1) / steps.length) * 100);
      
      setRealTimeMetrics(prev => ({
        ...prev,
        activeExecutions: 1,
        totalTokensToday: prev.totalTokensToday + Math.floor(Math.random() * 100),
        costToday: prev.costToday + 0.15
      }));
    }
    
    setTimeout(() => {
      setIsExecuting(false);
      setRealTimeMetrics(prev => ({
        ...prev,
        activeExecutions: 0
      }));
      
      const newFile = {
        id: Math.max(...files.map(f => f.id)) + 1,
        name: 'Live_Execution_Report.pdf',
        type: 'report',
        size: '3.2 MB',
        downloads: 0,
        createdAt: new Date().toISOString().split('T')[0],
        agent: 'Senior Marketing Analyst',
        task: 'Live Workflow Execution',
        status: 'published',
        content: 'Real-time execution report with comprehensive analysis and recommendations.',
        url: '#'
      };
      setFiles(prev => [newFile, ...prev]);
      addNotification('success', 'Execution completed! New report generated.');
    }, 1000);
  };

  // Utility Functions
  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      time: 'just now',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'busy': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'idle': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CrewAI Dashboard Pro v9</h1>
                <p className="text-blue-100 text-sm">Enterprise Multi-Agent Workflow Manager</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">System Online</span>
              </div>
              <div className="h-6 w-px bg-white bg-opacity-30"></div>
              
              {/* Notifications Button */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-background rounded-lg shadow-xl border border-border z-50">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                        <button 
                          onClick={clearAllNotifications}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-muted" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => markNotificationAsRead(notification.id)}
                            className={`p-4 border-b border-border hover:bg-muted cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-400' :
                                notification.type === 'info' ? 'bg-blue-400' :
                                notification.type === 'warning' ? 'bg-orange-400' :
                                'bg-red-400'
                              }`}></div>
                              <div className="flex-1">
                                <p className={`text-sm ${!notification.read ? 'font-medium' : ''} text-foreground`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Button */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <UserCircle className="w-5 h-5" />
                </button>
                
                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-12 w-64 bg-background rounded-lg shadow-xl border border-border z-50">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Admin User</p>
                          <p className="text-sm text-muted-foreground">admin@crewai.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Preferences</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>
                      <hr className="my-2 border-border" />
                      <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-background border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex space-x-1 overflow-x-auto ${mobileMenuOpen ? 'flex-col md:flex-row space-y-1 md:space-y-0' : ''}`}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                  setShowNotifications(false);
                  setShowProfileMenu(false);
                }}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === item.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.badge === 'Live' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Welcome to CrewAI Dashboard Pro v9</h2>
                      <p className="text-blue-100 mb-4">
                        Complete multi-agent AI workflow management with advanced functionality and real-time monitoring.
                      </p>
                      <div className="flex space-x-4">
                        <button 
                          onClick={() => setShowCreateAgentModal(true)}
                          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Create Agent</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('crew-goal')}
                          className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors"
                        >
                          Crew Goal Assignment
                        </button>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="text-right">
                        <div className="text-3xl font-bold">v9</div>
                        <div className="text-sm text-blue-200">Latest Version</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Agents</p>
                        <p className="text-2xl font-bold text-foreground">{agents.length}</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          +2 this week
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Tasks</p>
                        <p className="text-2xl font-bold text-foreground">{tasks.filter(t => t.status !== 'completed').length}</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {realTimeMetrics.queuedTasks} queued
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <ListTodo className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold text-foreground">{realTimeMetrics.successRate.toFixed(1)}%</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +1.2% today
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Cost Today</p>
                        <p className="text-2xl font-bold text-foreground">${realTimeMetrics.costToday.toFixed(2)}</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {realTimeMetrics.totalTokensToday.toLocaleString()} tokens
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setShowCreateAgentModal(true)}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">Create Agent</p>
                        <p className="text-sm text-muted-foreground">Add new AI agent</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setShowCreateTaskModal(true)}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">Create Task</p>
                        <p className="text-sm text-muted-foreground">Assign new task</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('execution')}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">Start Execution</p>
                        <p className="text-sm text-muted-foreground">Run workflow</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Real-time Activity Feed */}
                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Real-time Activity</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-400' :
                          notification.type === 'info' ? 'bg-blue-400' :
                          notification.type === 'warning' ? 'bg-orange-400' :
                          'bg-red-400'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Agents Tab */}
            {activeTab === 'agents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">AI Agents</h2>
                    <p className="text-muted-foreground">Manage your intelligent agents and their configurations</p>
                  </div>
                  <button 
                    onClick={() => setShowCreateAgentModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Agent</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agents.map((agent) => (
                    <div key={agent.id} className="bg-background border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Bot className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground">{agent.role}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Performance Score</span>
                          <span className="font-medium text-foreground">{agent.score}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tasks Completed</span>
                          <span className="font-medium text-foreground">{agent.tasks}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Model</span>
                          <span className="font-medium text-foreground">{agent.model}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Avg Response</span>
                          <span className="font-medium text-foreground">{agent.avgResponseTime}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => editAgent(agent)}
                          className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => playAgent(agent)}
                          className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Play className="w-4 h-4" />
                          <span>Run</span>
                        </button>
                        <button 
                          onClick={() => deleteAgent(agent.id)}
                          className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
                    <p className="text-muted-foreground">Manage and monitor task execution</p>
                  </div>
                  <button 
                    onClick={() => setShowCreateTaskModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Task</span>
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                    />
                  </div>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="bg-background border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">{task.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Agent: {task.agentName}</span>
                            <span>Due: {task.dueDate}</span>
                            <span>Format: {task.outputFormat}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => editTask(task)}
                            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => playTask(task)}
                            className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {task.status === 'in-progress' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Workflow Templates</h2>
                    <p className="text-muted-foreground">Pre-built agent workflows for common use cases</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-background border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-foreground">{template.name}</h3>
                            {template.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{template.agents} agents</span>
                            <span>{template.tasks} tasks</span>
                            <span>⭐ {template.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Category</span>
                          <span className="font-medium text-foreground">{template.category}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Complexity</span>
                          <span className="font-medium text-foreground">{template.complexity}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Est. Time</span>
                          <span className="font-medium text-foreground">{template.estimatedTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Downloads</span>
                          <span className="font-medium text-foreground">{template.downloads.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => useTemplate(template)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Download className="w-4 h-4" />
                          <span>Use Template</span>
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crew Goal Assignment Tab */}
            {activeTab === 'crew-goal' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Crew Goal Assignment</h2>
                  <p className="text-muted-foreground">Assign goals and topics for collaborative crew execution</p>
                </div>

                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Crew Topic / Main Instruction
                      </label>
                      <textarea
                        value={crewTopic}
                        onChange={(e) => setCrewTopic(e.target.value)}
                        placeholder="Enter the main topic or goal for the crew to work on..."
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                        rows={4}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={runCrew}
                        disabled={isRunningCrew || !crewTopic.trim()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRunningCrew ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Running Crew...</span>
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4" />
                            <span>Run Crew</span>
                          </>
                        )}
                      </button>

                      {isRunningCrew && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-muted-foreground">
                            Progress: {Math.round(crewProgress)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {isRunningCrew && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${crewProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {crewOutput && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Crew Execution Output</h3>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap">{crewOutput}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Agents for Crew */}
                <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Available Agents for Crew</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bot className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.role}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Execution Tab */}
            {activeTab === 'execution' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Live Execution</h2>
                    <p className="text-muted-foreground">Real-time AI workflow simulation and monitoring</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={startExecution}
                      disabled={isExecuting}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isExecuting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Executing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Start Execution</span>
                        </>
                      )}
                    </button>
                    {isExecuting && (
                      <button 
                        onClick={() => setIsExecuting(false)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Pause className="w-4 h-4" />
                        <span>Stop</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Execution Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-foreground">Status</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {isExecuting ? 'Running' : 'Idle'}
                    </p>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {isExecuting ? `${Math.round(executionProgress * 2.5 / 100)}m ${Math.round((executionProgress * 34) % 60)}s` : '0m 0s'}
                    </p>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-foreground">Tokens Used</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {isExecuting ? Math.round(executionProgress * 154).toLocaleString() : '0'}
                    </p>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-foreground">Cost</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      ${isExecuting ? (executionProgress * 0.0245).toFixed(3) : '0.000'}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                {isExecuting && (
                  <div className="bg-background border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Execution Progress</span>
                      <span className="text-sm text-muted-foreground">{Math.round(executionProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${executionProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Console Output */}
                <div className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Live Console Output</h3>
                    {isExecuting && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">Live</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                    {executionOutput ? (
                      <pre className="whitespace-pre-wrap">{executionOutput}</pre>
                    ) : (
                      <p className="text-gray-500">Click "Start Execution" to begin workflow simulation...</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
                    <p className="text-muted-foreground">Performance insights and metrics</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Reports</span>
                  </button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-background border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Executions</p>
                        <p className="text-2xl font-bold text-foreground">1,247</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +12% this month
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold text-foreground">{realTimeMetrics.successRate.toFixed(1)}%</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          +2.3% this week
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Response Time</p>
                        <p className="text-2xl font-bold text-foreground">{realTimeMetrics.avgResponseTime}</p>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          -0.2s improved
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Cost</p>
                        <p className="text-2xl font-bold text-foreground">${realTimeMetrics.costToday.toFixed(2)}</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Today's usage
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Performance */}
                <div className="bg-background border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Agent Performance Breakdown</h3>
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Bot className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{agent.name}</p>
                            <p className="text-sm text-muted-foreground">{agent.tasks} tasks completed</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{agent.score}%</p>
                            <p className="text-xs text-muted-foreground">Success Rate</p>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${agent.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Analysis */}
                <div className="bg-background border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Cost Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">${realTimeMetrics.costToday.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">${(realTimeMetrics.costToday * 7).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">${(realTimeMetrics.costToday * 30).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">This Month</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Generated Files</h2>
                    <p className="text-muted-foreground">Manage and download generated reports and outputs</p>
                  </div>
                  <button 
                    onClick={exportAllFiles}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export All</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {files.map((file) => (
                    <div key={file.id} className="bg-background border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            {file.type === 'report' && <FileText className="w-6 h-6 text-blue-600" />}
                            {file.type === 'data' && <Database className="w-6 h-6 text-green-600" />}
                            {file.type === 'strategy' && <Target className="w-6 h-6 text-purple-600" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">{file.name}</h3>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(file.status)}`}>
                          {file.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Agent:</span>
                          <span className="text-foreground">{file.agent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Created:</span>
                          <span className="text-foreground">{file.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Downloads:</span>
                          <span className="text-foreground">{file.downloads}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => previewFile(file)}
                          className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview</span>
                        </button>
                        <button 
                          onClick={() => downloadFile(file)}
                          className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Modals */}
      
      {/* Create Agent Modal */}
      {showCreateAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Create New Agent</h3>
                <button 
                  onClick={() => setShowCreateAgentModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Agent Name *</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  placeholder="e.g., Senior Marketing Analyst"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role *</label>
                <input
                  type="text"
                  value={newAgent.role}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  placeholder="e.g., Market Research Specialist"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Goal *</label>
                <textarea
                  value={newAgent.goal}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                  placeholder="What is this agent's primary objective?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Backstory *</label>
                <textarea
                  value={newAgent.backstory}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, backstory: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                  placeholder="Agent's background and expertise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cerebras Model</label>
                <select
                  value={newAgent.model}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                >
                  {cerebrasModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Temperature</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newAgent.temperature}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, temperature: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground text-center">{newAgent.temperature}%</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Max Iterations</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newAgent.maxIterations}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, maxIterations: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateAgentModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={createAgent}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {showEditAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Edit Agent</h3>
                <button 
                  onClick={() => setShowEditAgentModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Agent Name *</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role *</label>
                <input
                  type="text"
                  value={newAgent.role}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Goal *</label>
                <textarea
                  value={newAgent.goal}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Backstory *</label>
                <textarea
                  value={newAgent.backstory}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, backstory: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button 
                onClick={() => setShowEditAgentModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveAgent}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Create New Task</h3>
                <button 
                  onClick={() => setShowCreateTaskModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Task Name *</label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  placeholder="e.g., Market Analysis Report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                  placeholder="Detailed description of the task"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Expected Output *</label>
                <textarea
                  value={newTask.expectedOutput}
                  onChange={(e) => setNewTask(prev => ({ ...prev, expectedOutput: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                  placeholder="What should the output look like?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assign to Agent *</label>
                <select
                  value={newTask.agentId}
                  onChange={(e) => setNewTask(prev => ({ ...prev, agentId: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                >
                  <option value="">Select an agent</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} - {agent.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Output Format</label>
                  <select
                    value={newTask.outputFormat}
                    onChange={(e) => setNewTask(prev => ({ ...prev, outputFormat: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  >
                    <option value="text">Text</option>
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateTaskModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={createTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Edit Task</h3>
                <button 
                  onClick={() => setShowEditTaskModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Task Name *</label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Expected Output *</label>
                <textarea
                  value={newTask.expectedOutput}
                  onChange={(e) => setNewTask(prev => ({ ...prev, expectedOutput: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assign to Agent *</label>
                <select
                  value={newTask.agentId}
                  onChange={(e) => setNewTask(prev => ({ ...prev, agentId: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                >
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} - {agent.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button 
                onClick={() => setShowEditTaskModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {showFilePreview && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{selectedFile.name}</h3>
                <button 
                  onClick={() => setShowFilePreview(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2 text-foreground">{selectedFile.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 text-foreground">{selectedFile.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agent:</span>
                    <span className="ml-2 text-foreground">{selectedFile.agent}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <span className="ml-2 text-foreground">{selectedFile.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Content Preview</h4>
                <p className="text-sm text-foreground">{selectedFile.content}</p>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <button 
                onClick={() => downloadFile(selectedFile)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrewAIDashboardProV9;
