# fourthWeekTamrin
# Full-Stack Task Manager

A simple full-stack Task Manager application built with HTML, CSS, JavaScript, Node.js, and Express.js.

The application allows users to create tasks, view their tasks, mark tasks as completed, filter tasks by status, and delete tasks through a responsive web interface connected to a REST API.

## Features

- Create new tasks.
- View all tasks.
- Mark tasks as completed or active.
- Filter tasks by status: All, Active, and Completed.
- Delete tasks.
- Validate task titles on both the frontend and backend.
- Handle API errors and display appropriate messages.
- Responsive user interface for desktop and mobile devices.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API

**Backend**
- Node.js
- Express.js
- CORS
- REST API

## Project Structure

```text
fullstack-task-manager/
├── client/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── server/
│   ├── app.js
│   └── package.json
└── README.md
```

## Requirements

- Node.js
- npm
- A modern web browser
- Visual Studio Code with the Live Server extension (recommended)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd fullstack-task-manager
```

Replace `<YOUR_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Install Backend Dependencies

Navigate to the server directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

If Express and CORS are not already listed in `package.json`, install them with:

```bash
npm install express cors
```

### 3. Start the Backend Server

Run the following command from the `server/` directory:

```bash
node app.js
```

The server runs at:

```text
http://localhost:3000
```

### 4. Start the Frontend

Open `client/index.html` using the VS Code Live Server extension.

Make sure the frontend API URL in `client/js/app.js` points to the backend:

```javascript
const API_URL = "http://localhost:3000/tasks";
```

The application is now ready to use.

## API Endpoints

The backend provides the following REST API endpoints.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a specific task |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task's title or completion status |
| DELETE | `/tasks/:id` | Delete a task |

### Example Requests

#### Get All Tasks

```http
GET /tasks
```

#### Create a Task

```http
POST /tasks
Content-Type: application/json
```

Request body:

```json
{
  "title": "Learn Node.js"
}
```

#### Update a Task

```http
PATCH /tasks/1
Content-Type: application/json
```

Request body:

```json
{
  "completed": true
}
```

#### Delete a Task

```http
DELETE /tasks/1
```

## Validation and Error Handling

The API validates task IDs and request data and returns appropriate HTTP status codes.

| Status Code | Description |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | Task created successfully |
| `400 Bad Request` | Invalid task ID or request data |
| `404 Not Found` | Task or endpoint not found |

The frontend displays messages for loading errors and unsuccessful API requests.

## Data Storage

Tasks are currently stored in an in-memory JavaScript array on the server.

**Note:** Task data is not persisted in a database. Changes are lost when the server restarts, and the initial sample tasks are restored.

## Future Improvements

- Add persistent database storage.
- Implement unit and integration tests.
- Add task editing functionality.
- Add search and pagination.
- Implement user authentication.
- Deploy the application online.

## License

This project is intended for educational and personal development purposes.
