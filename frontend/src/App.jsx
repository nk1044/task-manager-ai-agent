import { useState, useEffect } from 'react';
import { Plus, BrainCircuit, Edit, Trash2, CheckCircle } from 'lucide-react';
import { GetAllTasks } from './server/server.js';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
      const fetchTasks = async () => {
          const response = await GetAllTasks();
          setTasks(response);
      }
      fetchTasks();
  }, [])

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-200 py-10 px-6 md:px-20 lg:px-40">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Notes</h1>
          <p className="text-neutral-400">Organize your thoughts and tasks in one place</p>
        </header>

        <div className="w-full h-full border border-neutral-800 rounded-xl bg-neutral-900/50 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-lg shadow-md group cursor-pointer">
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white group-hover:text-indigo-300 transition-colors">Add New Note</h3>
                    <p className="text-neutral-400 text-sm">Create a new note or task</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 rounded-lg shadow-md group cursor-pointer">
                <div className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <BrainCircuit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white group-hover:text-purple-300 transition-colors">Ask AI Assistant</h3>
                    <p className="text-neutral-400 text-sm">Get help with your tasks</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Your Tasks</h2>
                <div className="text-sm text-neutral-400">{tasks.length} items</div>
              </div>

            <div className="mb-6 max-h-96 overflow-y-auto">
              
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div 
                    key={index} 
                    className="group bg-neutral-800 hover:bg-neutral-750 rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        <span className={`text-lg ${task.status === 'completed' ? 'line-through text-neutral-500' : 'text-neutral-200'}`}>
                          {task?.title || 'title'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-md text-neutral-400 hover:text-red-400 hover:bg-neutral-700 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-md text-neutral-400 hover:text-green-400 hover:bg-neutral-700 transition-colors">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;