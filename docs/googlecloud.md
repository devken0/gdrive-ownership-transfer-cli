# Google Cloud Project Guide

A simple documentation of steps to use a Google Cloud project for the Google Drive API.

## Pre-requisites

* A Google Cloud account

## Create Google Cloud Project

1. Go to https://console.cloud.google.com and login.
2. Click on "My First Project" to open the project picker.
3. Click "New Project".
4. Input the Project name. Organization and location are both optional.
5. Click "Create". 

## Setup APIs and Services

1. In [Google Cloud's Welcome page](https://console.cloud.google.com/welcome) click on "APIs and Services".
2. Click on "Enable APIs and services" and find enable Google Drive API.

### Branding

This part is straight forward, you may skip the optional or non-mandatory details like the App logo.

### Audience

Make sure the User type is External and in testing mode.

1. Click on "Add users" and add the emails of the accounts that you will be using for testing the application.

### Credentials

1. Click on "Credentials" on the left sidebar.
2. Create credentials of type OAuth client ID.
3. Choose Web application as the Application type and give it a name.
4. Use "https://developers.google.com/oauthplayground" as the Authorized redirect URls.
5. Click "Create".
6. Save the Client ID and Client secret for [OAuth 2.0 Configuration](docs/oauthplayground.md#oauth-2.0-configuration)
7. Make sure to Download the JSON file. Rename it as `credentials.json` and move to the project's root.

### Data Access

1. Navigate to "Data Access" from the left sidebar.
2. Click on "Add or remove scopes".
3. Select scope named ".../auth/drive.file" then click "Update".


