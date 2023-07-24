const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const TodoistAPI = require('@doist/todoist-api-typescript');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const port = 3000;

// Initialize Todoist API client
const todoist = new TodoistAPI.TodoistApi(process.env.TODOIST_API_KEY);

// Initialize Google Tasks API client
const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

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
      res.redirect('/auth/todoist');
    } catch (err) {
      res.status(500).send('Error authenticating with Google.');
    }
  });
  
  // Redirect to Todoist authentication page
  app.get('/auth/todoist', (req, res) => {
    todoist.getProjects()
      .then((projects) => console.log(projects))
      .catch((error) => console.log(error))
    res.redirect('/');
  });
  
  // Handle Todoist callback
  app.get('/auth/todoist/callback', async (req, res) => {
    const code = req.query.code;
    try {
      const { access_token } = await todoist.exchangeCodeForAccessToken(code, process.env.TODOIST_REDIRECT_URI);
      todoist.token = access_token;
      res.redirect('/sync');
    } catch (err) {
      res.status(500).send('Error authenticating with Todoist.');
    }
  });

  async function getTasksFromGoogle() {
    // Implement this function to fetch tasks from Google Tasks API
    // Use the oauth2Client to make API requests to Google Tasks
    // Example code:
    // const tasks = await google.tasks({ version: 'v1', auth: oauth2Client }).tasks.list({
    //   tasklist: '@default',
    // });
    // return tasks.data.items;
  }
  
  async function getTasksFromTodoist() {
    // Implement this function to fetch tasks from Todoist API
    // Use the todoist instance to make API requests to Todoist
    // Example code:
    // const tasks = await todoist.sync();
    // return tasks.items;
  }

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });   