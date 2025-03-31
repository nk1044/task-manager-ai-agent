# task manager ai agent

## Overview

This is an AI-powered notes application designed to help users efficiently organize, retrieve, and manage their notes. The AI agent provides intelligent suggestions, making note-taking more seamless and effective.

**Note: The project may take up to 50 seconds to load data as the backend is deployed on Render, which has limitations. Additionally, the Gemini API has a rate limit, so avoid making frequent requests.**

### Live Demo
Access the application here: [website](https://cognocore-beta.vercel.app/)

<img width="1204" alt="Screenshot 2025-03-21 at 1 10 56 AM" src="https://github.com/user-attachments/assets/d88ee168-9a58-471f-89b1-d9c8d775ac28" />


## Features

- **AI-Powered Assistance**: Understands user input, organizes notes, and suggests relevant actions.
- **Intuitive User Interface**: Clean and simple UI for a smooth experience.
- **Smart Search**: Retrieve notes quickly using natural language queries.
- **Cross-Platform Access**: Access your notes from anywhere via the web.

## Tech Stack

### Backend
- Node.js, Express.js
- MongoDB Atlas (Database)

### Frontend
- React.js, Tailwind CSS

### Deployment
- **Frontend**: [Vercel](https://cognocore-beta.vercel.app/)
- **Backend**: Render

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/nk1044/task-manager-ai-agent.git
cd task-manager-ai-agent

```

### 2. Install Dependencies
#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Run the Application
#### Start the Backend Server
```bash
cd backend
npm run start
```

#### Start the Frontend
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

## AI Agent Capabilities

The AI agent enhances the note-taking experience by providing:

- **Contextual Note Organization**: Automatically categorizes and tags notes based on their content.
- **Smart Search**: Uses NLP to retrieve notes effectively.
- **Action Recommendations**: Suggests actions like setting reminders and linking related notes.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

