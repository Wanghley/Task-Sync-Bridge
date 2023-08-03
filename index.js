const express = require('express');
const { google } = require('googleapis');
const TodoistAPI = require('@doist/todoist-api-typescript');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const port = 3000;
const GoogleTasks = [];
const GoogleTaskLists = []; // Initialize GoogleTaskLists as an empty array
const TODOIstTasks = [];
const TODOIstBoards = [];

// Initialize Todoist API client
const todoist = new TodoistAPI.TodoistApi(process.env.TODOIST_API_KEY);

// Initialize Google Tasks API client
const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

// Set up the Google Tasks API
const tasks = google.tasks({ version: 'v1', auth: oauth2Client });

// Redirect to Google authentication page
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/tasks'],
  });
  res.redirect(authUrl);
});

// Handle Google callback
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    await getTasksFromGoogle();
    res.redirect('/auth/todoist');
  } catch (err) {
    res.status(500).send('Error authenticating with Google.');
  }
});

// Redirect to Todoist authentication page
app.get('/auth/todoist', async (req, res) => {
  try {
    const projects = await todoist.getProjects();
    projects.forEach((project) => {
      TODOIstBoards.push(project.id);
    });
    res.redirect('/auth/todoist/callback');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error authenticating with Todoist.');
  }
});

// Handle Todoist callback
app.get('/auth/todoist/callback', async (req, res) => {
  try {
    await getTasksFromTodoist();
    res.redirect('/sync');
  } catch (err) {
    console.error('Error fetching tasks from Todoist:', err.message);
    res.status(500).send('Error fetching tasks from Todoist.');
  }
});

async function getTasksFromGoogle() {
  const service = google.tasks({ version: 'v1', auth: oauth2Client });
  const res = await service.tasklists.list({
  });
  const taskLists = res.data.items;
  GoogleTaskLists.length = 0; // Clear the existing task lists array
  GoogleTaskLists.push(...taskLists); // Push the new task lists into the array
  const tasks = [];
  for (const tl of taskLists) {
    const response = await service.tasks.list({ tasklist: tl.id });
    const taskres = response.data.items || [];
    tasks.push(...taskres);
  }
  GoogleTasks.length = 0; // Clear the existing tasks array
  GoogleTasks.push(...tasks); // Push the new tasks into the array
}

async function getTasksFromTodoist() {
  TODOIstTasks.length = 0; // Clear the existing tasks array
  const tasks = await todoist.getTasks();
  TODOIstTasks.push(...tasks); // Push the new tasks into the array
}

function addTaskToGoogle(task) {
  // Convert the Todoist due date to the format used by Google Tasks
  let dueDate;
  if (task.due) {
    const todoistDueDate = new Date(task.due.date);
    dueDate = todoistDueDate.toISOString(); // Convert to ISO format
  }
  tasks.tasks.insert({
    tasklist: GoogleTaskLists[0].id,
    requestBody: {
      title: task.content,
      notes: task.id,
      due: dueDate, // Include the due date if it exists
    },
  });
}

function isTODOIstTaskOnGoogle(task) {
  return GoogleTasks.some((gtask) => gtask.notes && gtask.notes.includes(task.id));
}

app.get('/sync', async (req, res) => {

  // Fetch tasks from Google and Todoist
  await getTasksFromGoogle();
  await getTasksFromTodoist();

  // Check tasks from Todoist and add to Google if they don't exist
  for (const todoistTask of TODOIstTasks) {
    if (!isTODOIstTaskOnGoogle(todoistTask)) {
      await addTaskToGoogle(todoistTask);
      console.log(`Task "${todoistTask.content}" added to Google Tasks.`);
    }
  }

  // Check tasks from Google and add to Todoist if they don't exist
  for (const googleTask of GoogleTasks) {
    const todoistTaskExists = TODOIstTasks.some((task) => googleTask.notes?.includes(task.id));
    if (!todoistTaskExists) {
      // Add the logic to create the task in Todoist if needed
      // For example: await todoist.createTask({ content: googleTask.title, ... });
      console.log(`Task "${googleTask.title}" exists in Google Tasks but not in Todoist.`);
    }
  }

  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
