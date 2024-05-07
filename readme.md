# Task Manager App

A modern task management application with client and server components built with React, TypeScript, Express, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

Welcome to the Task Manager app! This project comprises both the client and server components, providing a comprehensive solution for efficient task management. The client is built with React, TypeScript, and Vite, while the server uses Express, TypeScript, and MongoDB.

## Features

- **Task Creation:** Easily create and manage your tasks.
- **React Query:** Utilizes `react-query` for efficient data fetching and caching as well as suspense.
- **Form Handling:** Implements `react-hook-form` for robust form handling.
- **Error Handling:** Utilizes `react-error-boundary` for error handling.
- **State Management:** Utilizes `redux-toolkit` and `react-redux` for state management.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Eagle9461/Tryhackme-assessment.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Tryhackme-assessment
    ```
3.  Install dependencies:

    - For the client:

      ```bash
      cd task-manager-client
      yarn
      ```

    - For the client:

      ```bash
      cd task-manager-server
      yarn
      ```

## Usage

1. Client

   ```bash
   cd task-manager-client
   yarn dev
   ```

   Visit http://localhost:5173 in your browser to see the client app.

2. Server

   ```bash
   cd task-manager-server
   yarn dev
   ```

   The server will be running at http://localhost:3001.
