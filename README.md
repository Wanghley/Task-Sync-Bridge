# 2-Way Sync App for Google Tasks and Todoist

![Project Image](project-image-url)

## Table of Contents

- [2-Way Sync App for Google Tasks and Todoist](#2-way-sync-app-for-google-tasks-and-todoist)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Setting Up API Credentials](#setting-up-api-credentials)
      - [Google Tasks API Credentials](#google-tasks-api-credentials)
      - [Todoist API Key](#todoist-api-key)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [Authentication](#authentication)
    - [Syncing Tasks](#syncing-tasks)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This project is a 2-way sync app that enables seamless synchronization of tasks between Google Tasks and Todoist. It allows you to keep your tasks in sync across both platforms, so you can manage your tasks effectively without duplication.

## Features

- Authentication with Google and Todoist APIs for accessing tasks.
- Fetching tasks from Google Tasks and Todoist.
- Synchronizing tasks between the two platforms.
- Periodic sync to keep tasks up-to-date.

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Google Tasks API credentials (Client ID and Client Secret)
- Todoist API key

## Getting Started

### Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/2-way-sync-app.git
cd 2-way-sync-app
```

2. Install the dependencies.

```bash
npm install
```

### Setting Up API Credentials

Before running the app, you'll need to set up API credentials for Google Tasks and obtain a Todoist API key.

#### Google Tasks API Credentials

1. Go to the Google Cloud Console: https://console.cloud.google.com/.
2. Create a new project (if you don't have one).
3. Enable the "Tasks API" for your project.
4. Create credentials (OAuth 2.0 Client ID).
5. Note down the "Client ID" and "Client Secret".

#### Todoist API Key

1. Go to the Todoist Developer Console: https://developer.todoist.com/appconsole.html.
2. Create a new app and obtain the API key.

### Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```dotenv
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
TODOIST_API_KEY=your_todoist_api_key
```

Replace `your_google_client_id`, `your_google_client_secret`, and `your_todoist_api_key` with the credentials you obtained in the previous step.

## Usage

### Authentication

1. Start the app.

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000/auth/google` to authenticate with Google. Grant the necessary permissions to access Google Tasks.

3. After authenticating with Google, you will be redirected to `http://localhost:3000/auth/todoist`. Authenticate with Todoist and grant the app access to your tasks.

### Syncing Tasks

To initiate the sync process, navigate to `http://localhost:3000/sync` in your browser. The app will fetch tasks from both Google Tasks and Todoist, compare them, and sync the tasks between the two platforms.

**Note**: For periodic sync, the app is set to automatically sync tasks every hour.

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Note**: Replace `project-image-url` with the URL of an image representing your project, if applicable. Also, ensure to include the `LICENSE` file in your project directory and update the license information in the "License" section of the README.