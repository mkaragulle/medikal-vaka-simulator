# Google Login Setup for Vercel

This project supports Google email login through Google Identity Services.

1. Google Cloud Console > APIs & Services > Credentials.
2. Create Credentials > OAuth client ID > Web application.
3. Add Authorized JavaScript origins:
   - http://localhost:5173
   - your Vercel domain, for example https://your-project.vercel.app
4. Copy the Client ID.
5. In Vercel > Project Settings > Environment Variables, add:

```
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

6. Redeploy.

Local and Vercel builds work without this variable, but the Google button will show a setup warning until it is added.
