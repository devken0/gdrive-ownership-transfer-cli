# Google Drive File Ownership Transfer

A Node.js application to Transfer Google Docs/Files Ownership using Google Drive API.

## Setup

1. Create a OAuth2 Client ID and download the json file to the root of this project as `credentials.json`.
2. Open `.env.sample` in a text editor.
3. Input the values for the environment variables. `REFRESH_TOKEN` the refresh token generated from https://developers.google.com/oauthplayground, `NEW_OWNER_EMAIL` new owner's email, and `FILE_ID_TO_TRANSFER` the file ID that will be transferred ownership.
4. Rename `.env.sample` to `.env`. 