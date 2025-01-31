# Fullstack Medical Journaling System - Frontend

## Overview

The **Frontend** of the Fullstack Medical Journaling System is a **React.js** application designed to provide an intuitive interface for managing patient records and medical data. It interacts with a **Spring Boot backend** via REST API and supports role-based access for **patients, doctors, and staff**.

## Features

- **User Authentication & Role-Based Access**
  - Patients, doctors, and staff have distinct permissions.
- **Patient Information Management**
  - Doctors and staff can add observations and diagnoses.
  - Patients can view their own medical records.
- **Messaging System**
  - Patients can send messages to doctors/staff and receive replies.
  - Doctors/staff can view and respond to messages.
- **Responsive UI**
  - Designed for both desktop and mobile devices.

## Technologies Used

- **React.js** (Component-based UI framework)
- **React Router** (Navigation management)
- **Redux (Optional)** (State management)
- **Axios** (REST API communication)
- **Bootstrap/Material UI** (Styling and UI components)
- **Docker** (Containerization)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js (Latest LTS version)**
- **Docker** (if using containerized setup)

### Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/frontend-medical-system.git
   cd frontend-medical-system
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the application:**
   ```sh
   npm start
   ```
4. **Access the application:**
   - Open `http://localhost:3000` in a web browser.

### Running with Docker

If using Docker to run the frontend:

```sh
   docker build -t frontend-medical-system .
   docker run -p 3000:3000 frontend-medical-system
```

## Backend Integration

- The frontend communicates with a **Spring Boot backend**.
- API base URL is configured in `src/config.js` (or `.env` file).
- Ensure the backend is running at `http://localhost:8080/api`.
- Authentication and authorization handled via **Spring Security**.

## Deployment

For production builds:

```sh
npm run build
```

The build files will be generated in the `build/` folder and can be deployed on a server.



**Note:** Ensure the backend is running before testing frontend features.

