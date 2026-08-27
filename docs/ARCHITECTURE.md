# cookAI architecture

```text
Camera / Gallery
      │
      ▼
Expo ImagePicker + FileSystem
      │
      ▼
Google Vision label detection
      │
      ▼
Ingredient normalisation + allergen filtering
      │
      ▼
Edamam recipe search
      │
      ├── recipe metadata / calories / cuisine
      └── BBC Good Food source URL
                    │
                    ▼
             Cheerio extraction
                    │
                    ▼
          ingredients + method modal
```

## Portfolio note

The original university prototype called Google Vision and Edamam directly from the client. The public repository now reads credentials from local environment variables and contains no live API keys. In a production deployment, API calls that require secret credentials should be proxied through a backend service rather than shipped in a mobile/web bundle.
