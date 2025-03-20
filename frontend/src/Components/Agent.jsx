import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, UserCircle, Loader2 } from 'lucide-react';
import { AgentCall } from '../server/server.js';
import MdText from './MdText.jsx'

function Agent() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I can help you manage your tasks. What would you like to do today?' 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    try {
      const result = await AgentCall(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: result }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const taskSuggestions = [
    'Create a new task for tomorrow',
    'Which tasks are pending?',
    'Mark the shopping task as complete'
  ];

  return (
    <div className='w-full h-screen bg-neutral-950 flex items-center justify-center p-6'>
      <div className="w-full max-w-2xl h-[85vh] bg-neutral-900 border border-neutral-600 rounded-xl shadow-lg flex flex-col">
        

        <header className="border-b border-neutral-700 p-4 flex items-center justify-between bg-neutral-800 rounded-t-xl">
          <button
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
          <div className="w-20"></div>
        </header>


        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}> 
              <div className={`rounded-lg px-4 py-3 max-w-[75%] flex flex-col ${
                msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-200'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1 text-indigo-400">
                    <Bot size={16} /> <span className="text-xs">AI</span>
                  </div>
                )}
                <MdText content={msg.content} />
                {msg.role === 'user' && (
                  <div className="flex items-center gap-2 mt-1 text-indigo-200">
                    <UserCircle size={16} /> <span className="text-xs">You</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-3 bg-neutral-800 text-neutral-200 flex items-center">
                <Loader2 size={16} className="text-indigo-400 animate-spin mr-2" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
   
        <div className="px-4 py-2 border-t border-neutral-700 bg-neutral-900">
          <div className="text-sm text-neutral-400 mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {taskSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-full hover:bg-neutral-700 transition"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        
        <div className="border-t border-neutral-700 p-4 bg-neutral-900 rounded-b-xl">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your tasks..."
              className="flex-grow p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`p-3 rounded-lg transition ${
                loading || !input.trim()
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Agent;
