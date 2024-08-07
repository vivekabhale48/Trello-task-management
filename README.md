# Trello Task Management System

Welcome to the Trello Task Management System! This project is a task management application inspired by Trello. The application consists of two main components: the client and the server. The client is built with Next.js, while the server is built with NestJS and uses MongoDB as the database.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration system.
- **Task Management**: Create, update, and delete tasks.
- **Boards and Lists**: Organize tasks into boards and lists, similar to Trello.
- **Real-time Updates**: Experience real-time updates with WebSockets.
- **Responsive Design**: Fully responsive design for mobile and desktop devices.

## Tech Stack

**Client**: Next.js, TypeScript, CSS Modules  
**Server**: NestJS, TypeScript, MongoDB

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB (v4.x or later)

## Installation
### Client Setup

1. **Clone the repository**:

    bash
    `git clone https://github.com/vivekabhale48/Trello-task-management.git`
   
    `cd Trello-task-management/client`
    
3. **Install dependencies**:

    bash
    `npm install`
    # or
    `yarn install`
    
4. **Start the development server**:

    bash
    `npm run dev`
    # or
    yarn dev
    
    The client will be running on `http://localhost:3000`.

### Server Setup

1. **Navigate to the server directory**:

    bash
    `cd ../server`

2. **Install dependencies**:

    bash
    `npm install`
    # or
    `yarn install`

3. **Configure environment variables**:

    Create a `.env` file in the `server` directory and add your MongoDB connection string:

    `MONGODB_URI=your_mongodb_connection_string`
   
    `JWT_SECRET=your_jwt_secret`

5. **Start the server**:

    bash
    `npm run start:dev`
    # or
    `yarn start:dev`

    The server will be running on `http://localhost:8080`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with your existing account.
3. Create boards, lists, and tasks to manage your workflow efficiently.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch `git checkout -b feature-branch`.
3. Make your changes and commit them `git commit -m 'Add some feature'`.
4. Push to the branch `git push origin feature-branch`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
