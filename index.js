const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');
const { OAuth2Client, auth } = require('google-auth-library');
const TodoistAPI = require('@doist/todoist-api-typescript');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const port = 3000;
var GoogleTasks = [];
var TODOIstTasks = [];
var TODOIstBoards = [];

// Initialize Todoist API client
const todoist = new TodoistAPI.TodoistApi(process.env.TODOIST_API_KEY);

// Initialize Google Tasks API client
const oauth2Client = new OAuth2Client({
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
      GoogleTasks = await getTasksFromGoogle();
      await new Promise(r => setTimeout(r, 1500));
      res.redirect('/auth/todoist');
    } catch (err) {
      res.status(500).send('Error authenticating with Google.');
    }
  });
  
  // Redirect to Todoist authentication page
  app.get('/auth/todoist', (req, res) => {
    todoist.getProjects()
      .then((projects) => projects.forEach(
        (project) => {
          TODOIstBoards.push(project.id);
        }
      ))
      .catch((error) => console.log(error))
    res.redirect('/auth/todoist/callback');
  });
  
  // Handle Todoist callback
  app.get('/auth/todoist/callback', async (req, res) => {
    const code = req.query.code;
    try {
      getTasksFromTodoist();
      await new Promise(r => setTimeout(r, 1500));
      res.redirect('/sync');
    } catch (err) {
      res.status(500).send('Error authenticating with Todoist.');
    }
  });

  async function getTasksFromGoogle() {
    const service = google.tasks({version: 'v1', auth: oauth2Client});
    const res = await service.tasklists.list({
      maxResults: 10,
    });
    const taskLists = res.data.items;
    const tasks = []
    taskLists.forEach((tl) => {
      service.tasks.list({ tasklist: tl.id }, (err, response) => {
        if (err) {
          console.error('Error fetching tasks:', err);
          res.send('Error fetching tasks');
          return;
        }
        const taskres = response.data.items;
        taskres.forEach((task) => {
          GoogleTasks.push(task);
        });
      });
    });
    return GoogleTasks;
  }
  
  async function getTasksFromTodoist() {
    // TODO: Implement this function to fetch tasks from Todoist API
    // Use the todoist instance to make API requests to Todoist
    (await todoist.getTasks()).forEach((task) => {
      TODOIstTasks.push(task);
    });
  }

  function isTODOIstTaskOnGoogle(task) {
    GoogleTasks.forEach(gtask => {
      if(gtask.notes !== undefined){
        console.log(gtask.notes.includes(task.id));
        console.log(task.id+" "+gtask.notes);
      }
    });
    return GoogleTasks.includes(task);
  }

  app.get('/sync', async (req, res) => {
    TODOIstTasks.forEach(async (task) => {
      console.log(task);
      if (!GoogleTasks.includes(task)) {
        // console.log("Task not found in Google Tasks, adding...");
      }
    });
    await new Promise(r => setTimeout(r, 5000));
    console.log("#####################")
    GoogleTasks.forEach(async (task) => {
      // console.log(task);
      if (isTODOIstTaskOnGoogle(task)) {
        // console.log(isTODOIstTaskOnGoogle(task));
        // console.log("Task not found in Todoist, adding...");
        // console.log(task);
      }
    });

    res.redirect('/');
  });

  // app.get('/sync', async (req, res) => syncTasks(req,res));

  // async function syncTasks(req, res) {
  //   getTasksFromGoogle();
  //   getTasksFromTodoist();
  //   await new Promise(r => setTimeout(r, 1500));
  //   TODOIstTasks.forEach((task) => {
  //     if (!GoogleTasks.includes(task)) {
  //       console.log("Task not found in Google Tasks, adding...");
  //     }
  //   })

  // }

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });   