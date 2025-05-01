import { google } from 'googleapis';
import fs from 'fs/promises';
import 'dotenv/config';

const credentials = JSON.parse(await fs.readFile('./credentials.json', 'utf-8'));

// --- Configuration ---
const fileIdToTransfer = process.env.FILE_ID_TO_TRANSFER;
const newOwnerEmailAddress = process.env.NEW_OWNER_EMAIL;
const refreshToken = process.env.REFRESH_TOKEN;

// --- Set up auth and drive client globally ---
const auth = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

auth.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({ version: 'v3', auth });

// --- Function to Initiate Transfer ---
async function initiatePendingOwnershipTransfer(fileId, newOwnerEmail) {
  try {
    const permission = {
      role: 'writer',
      type: 'user',
      emailAddress: newOwnerEmail,
      pendingOwner: true,
    };

    console.log(`Attempting to grant pending ownership to ${newOwnerEmail} for file ${fileId}...`);

    const permissionResponse = await drive.permissions.create({
      fileId,
      requestBody: permission,
      sendNotificationEmail: true,
    });

    console.log('Permission creation response status:', permissionResponse.status);
    console.log('Created Permission ID:', permissionResponse.data.id);
    console.log(`---> Ownership transfer initiated for file "${fileId}" to ${newOwnerEmail}.`);
    console.log(`---> ${newOwnerEmail} must manually accept the transfer request.`);
    return true;

  } catch (error) {
    console.error('Error initiating pending ownership transfer:');
    if (error.response && error.response.data) {
      console.error('API Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    return false;
  }
}

// --- Check Current Owner ---
const metadata = await drive.files.get({
  fileId: fileIdToTransfer,
  fields: 'owners',
});

console.log('File is currently owned by:', metadata.data.owners.map(o => o.emailAddress).join(', '));

// --- Run Transfer ---
await initiatePendingOwnershipTransfer(fileIdToTransfer, newOwnerEmailAddress);
