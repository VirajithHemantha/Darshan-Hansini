1. Open your Google Spreadsheet: https://docs.google.com/spreadsheets/d/12TXhiY47REwJ1fXO2sPrH5fZ2jSRjnrEvBWRrHko64s/edit?usp=sharing
2. Open Extensions > Apps Script.
3. Replace the script content with the code from google-apps-script/code.gs.
4. Click Deploy > New deployment.
5. Select type: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Click Deploy and copy the Web App URL.
9. In your project root, create or update the file named .env with:

VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_WEB_APP_URL

10. Restart the Vite dev server.

Notes:
- The script automatically creates the `RSVP` and `WISH` tabs/sheets if they do not exist.
- The script automatically writes the header rows for each tab on their first submission.
- If you update Apps Script code later, remember to redeploy a new version.
- The frontend sends RSVP responses to the RSVP tab, and guest messages to the WISH tab. WISH entries are fetched automatically to show up in the blessings feed.
