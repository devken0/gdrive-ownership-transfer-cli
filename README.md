# Google Drive File Ownership Transfer

A Node.js application to Transfer Google Docs/Files Ownership using Google Drive API.

## Setup 

1. Create a OAuth2 Client ID and download the json file to the root of this project as `credentials.json`.
2. Open `.env.sample` in a text editor.
3. Input the values for the environment variables. `REFRESH_TOKEN` the refresh token generated from https://developers.google.com/oauthplayground, `NEW_OWNER_EMAIL` new owner's email, and `FILE_ID_TO_TRANSFER` the file ID that will be transferred ownership.
4. Rename `.env.sample` to `.env`. 
5. Run `npm install` to install package dependencies.

## Usage

```sh
node transfer.js
```

## Limitations 

New owner will only receive a notification of a shared file with edit permissions instead of an ownership invitation. 

### Details

**Ownership Transfer Limitations**

- According to Google's official documentation, *"You can only transfer ownership of a file to someone within the same organization."* For Google Drive, this means that ownership transfer via the API is only supported for users within the same Google Workspace (formerly G Suite) domain, not between two personal Gmail accounts[^1][^7].
- The Drive API documentation also states: *"Only users in the same domain can transfer ownership."* This restriction blocks API-based ownership transfers between two @gmail.com accounts[^7].

**What Happens in Practice**

- When you attempt to transfer ownership between two personal Gmail accounts using the API (by setting `pendingOwner: true`), the API request does not complete the ownership transfer. Instead, the recipient is added as an editor (writer) and receives a sharing notification, but ownership does not change[^7].
- This is consistent with user reports and error logs, where attempts to transfer ownership across domains (including between two personal Gmail accounts) result in a "Bad Request" error or silent failure, with the file simply being shared as editable but not transferred in ownership[^7][^8].

**Manual Transfer Is Still Possible**

- Manual ownership transfer through the Google Drive web interface (UI) between two @gmail.com accounts is still supported. You can share the file with the other account as an editor, then use the "Make owner" option in the sharing settings to transfer ownership. This manual process is not subject to the same API restrictions[^6].

**Workspace Accounts**

- If both accounts are under the same Google Workspace domain, API-based ownership transfer is allowed and works as expected[^1][^9].


### Summary Table

| Method | Gmail → Gmail | Workspace → Workspace | Gmail ↔ Workspace |
| :-- | :--: | :--: | :--: |
| API Ownership Transfer | ❌ Blocked | ✅ Allowed | ❌ Blocked |
| Manual (UI) Ownership Transfer | ✅ Allowed | ✅ Allowed | ❌ Blocked |

### Conclusion

- **Google does silently block API-based ownership transfers between personal Gmail accounts, only allowing sharing as editor.**
- **Manual transfer via the Drive UI is still permitted for @gmail.com accounts.**
- **API-based transfers are only supported within the same Google Workspace domain**[^1][^7][^8].

<div style="text-align: center">⁂</div>

[^1]: https://support.google.com/a/answer/1247799

[^2]: https://developers.google.com/drive/api/guides/limits

[^3]: https://www.reddit.com/r/gsuite/comments/u7sagw/google_drive_only_allows_25_to_30_file_ownership/

[^4]: https://support.google.com/drive/thread/171539496/limitations-on-size-number-of-files-to-transfer-ownership

[^5]: https://documentation.its.umich.edu/google-transfer-ownership

[^6]: https://www.youtube.com/watch?v=XPaD7_eRjg0

[^7]: https://www.positioniseverything.net/ownership-can-only-be-transferred-to-another-user-in-the-same-domain-as-the-current-owner./

[^8]: https://groups.google.com/g/google-apps-manager/c/uP5623AGEsw

[^9]: https://support.cloudm.io/hc/en-us/articles/9116366016412-Google-Data-Transfer-API-use-case-and-limitations

[^10]: https://www.reddit.com/r/gsuite/comments/mws29r/moving_folder_from_personal_gdrive_account_to/
