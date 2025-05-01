# OAuth 2.0 Playground Guide

A guide to help in acquiring a refresh token for the project.

## Select and Authorize APIs

1. Select the scope for the APIs you would like to access or input your own OAuth scopes below. 

- Drive API v3
  - https://www.googleapis.com/auth/drive.file

2. Click the "Authorize APIs" button.

## OAuth 2.0 Configuration

1. Click on settings. [Create an OAuth 2.0 Client ID](docs/). 
2. Click the checkbox "Use your own OAuth credentials.
3. Copy the Client ID from [Google Auth Platform / Clients](https://console.cloud.google.com/auth/clients). Then paste it in "OAuth Client ID" field.
4. Copy the Client secret as well and paste it in "OAuth Client secret" field.

## Exchange authorization code for tokens

1. Click on "Exchange authorization code for tokens".
2. A refresh token and access token will be auto generated. Copy the refresh token and use it as the value of `REFRESH_TOKEN`.