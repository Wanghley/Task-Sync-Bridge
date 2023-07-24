<!-- Project Logo -->
<br />
<div align="center">
  <a href="https://github.com/your-username/2-way-sync-app">
    <img src="project-logo-url" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">2-Way Sync App for Google Tasks and Todoist</h3>

  <p align="center">
    An app to sync tasks between Google Tasks and Todoist seamlessly.
    <br />
    <a href="#about-the-project">About The Project</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#requirements">Requirements</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#usage">Usage</a>
    ·
    <a href="#testing">Testing</a>
    ·
    <a href="#contributing">Contributing</a>
    ·
    <a href="#license">License</a>
  </p>
</div>

<!-- Project Shields -->
<p align="center">
  <a href="https://github.com/your-username/2-way-sync-app/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/your-username/2-way-sync-app.svg?style=for-the-badge" alt="Contributors">
  </a>
  <a href="https://github.com/your-username/2-way-sync-app/network/members">
    <img src="https://img.shields.io/github/forks/your-username/2-way-sync-app.svg?style=for-the-badge" alt="Forks">
  </a>
  <a href="https://github.com/your-username/2-way-sync-app/stargazers">
    <img src="https://img.shields.io/github/stars/your-username/2-way-sync-app.svg?style=for-the-badge" alt="Stargazers">
  </a>
  <a href="https://github.com/your-username/2-way-sync-app/issues">
    <img src="https://img.shields.io/github/issues/your-username/2-way-sync-app.svg?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/your-username/2-way-sync-app/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/github/license/your-username/2-way-sync-app.svg?style=for-the-badge" alt="License">
  </a>
  <a href="https://linkedin.com/in/your-linkedin-username">
    <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555" alt="LinkedIn">
  </a>
</p>

<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li><a href="#requirements">Requirements</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setting-up-api-credentials">Setting Up API Credentials</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- About The Project -->
## About The Project

[![Project Screenshot][project-screenshot]](https://example.com)

The 2-Way Sync App is designed to simplify the synchronization of tasks between Google Tasks and Todoist. Managing tasks on different platforms can be cumbersome, and this app allows you to seamlessly sync your tasks, ensuring they stay up-to-date across both Google Tasks and Todoist.

### Features

- Authentication with Google and Todoist APIs for accessing tasks.
- Fetching tasks from Google Tasks and Todoist.
- Synchronizing tasks between the two platforms.
- Periodic sync to keep tasks up-to-date.

<!-- Requirements -->
## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Google Tasks API credentials (Client ID and Client Secret)
- Todoist API key

<!-- Getting Started -->
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
4. Create credentials (OAuth

 2.0 Client ID).
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

<!-- Usage -->
## Usage

To use the app, follow the steps below:

1. Start the app.

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000/auth/google` to authenticate with Google. Grant the necessary permissions to access Google Tasks.

3. After authenticating with Google, you will be redirected to `http://localhost:3000/auth/todoist`. Authenticate with Todoist and grant the app access to your tasks.

4. To initiate the sync process, navigate to `http://localhost:3000/sync` in your browser. The app will fetch tasks from both Google Tasks and Todoist, compare them, and sync the tasks between the two platforms.

**Note**: For periodic sync, the app is set to automatically sync tasks every hour.

<!-- Testing -->
## Testing

To run the tests, use the following command:

```bash
npm test
```

<!-- Contributing -->
## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, feel free to open an issue or submit a pull request.

<!-- License -->
## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

---
**Note**: Replace `project-logo-url` with the URL of the project logo, if applicable. Also, ensure to include the `project-screenshot` image in your project directory and update the screenshot information in the "About The Project" section of the README. Additionally, don't forget to update the links in the shields section with the correct URLs for your project.