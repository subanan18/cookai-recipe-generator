<div align="center">

# 🍳 cookAI — Intelligent Recipe Generator

### React Native • Expo • Google Vision • Edamam • Recipe Intelligence

A mobile recipe-discovery application that turns **photos of ingredients into practical recipe suggestions**, with calorie filtering, missing-ingredient analysis and recipe-detail extraction.

![React Native](https://img.shields.io/badge/React_Native-0.72-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-49-000020?style=for-the-badge&logo=expo)
![Google Vision](https://img.shields.io/badge/Google_Vision-Computer_Vision-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Edamam](https://img.shields.io/badge/Edamam-Recipe_API-6DB33F?style=for-the-badge)

</div>

---

## 🎯 Problem

People often have ingredients at home but still struggle to answer: **“What can I cook with what I already have?”**

cookAI was built as my Computer Science final-year project to explore how mobile UX, computer vision and external recipe data can reduce that friction.

## 📱 App in action

<p align="center">
  <img src="screenshots/demo.jpg" width="900" alt="cookAI ingredient image flowing into recipe recommendations" />
</p>

The original mobile prototype demonstrates ingredient selection, computer-vision-based recognition, recipe results, calorie filtering, missing ingredients and recipe-detail modals.

## ✨ Core features

- 📷 Capture an ingredient with the camera or choose images from the gallery
- 👁️ Send image content to **Google Vision** for label detection
- 🧠 Normalise detected labels into supported food ingredients
- ⚠️ Exclude configured allergens before recipe search
- 🍽️ Search the **Edamam API** using the recognised ingredients
- 🔎 Restrict recipe results to supported recipe sources
- 🧾 Compare recognised ingredients against each recipe and show **missing ingredients**
- 🔢 Filter recipe results by calorie range
- 🌍 Display diet, meal, dish and cuisine metadata
- 📖 Extract recipe ingredients and preparation methods for an in-app details modal
- 🔥 Surface trending recipes on the discovery screen

## 🧠 How it works

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
Ingredient normalisation
      │
      ├── allergen filtering
      └── duplicate removal
      │
      ▼
Edamam recipe search
      │
      ├── calories / diet / cuisine metadata
      ├── missing-ingredient calculation
      └── source recipe URL
                 │
                 ▼
          Recipe extraction
                 │
                 ▼
      Ingredients + method modal
```

A more detailed architecture note is available in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## 🛠️ Technology

| Area | Technology |
|---|---|
| Mobile UI | React Native |
| Development platform | Expo |
| Language | JavaScript |
| Navigation | React Navigation |
| Image capture | Expo ImagePicker |
| Local image processing | Expo FileSystem |
| Computer vision | Google Vision API |
| Recipe discovery | Edamam API |
| HTTP | Axios |
| HTML parsing | Cheerio |

## 📂 Repository structure

```text
cookai-recipe-generator/
├── App.js
├── index.js
├── src/
│   ├── CookAIApp.js
│   ├── services/
│   │   ├── vision.js
│   │   └── recipes.js
│   └── utils/
│       └── ingredients.js
├── screenshots/
├── docs/
│   └── ARCHITECTURE.md
├── background.jpg
├── user_icon.jpg
├── .env.example
├── app.json
├── babel.config.js
├── metro.config.js
└── package.json
```

## 🚀 Run locally

This repository contains a cleaned public version of the original university prototype. It does **not** contain live API credentials.

```bash
npm install
cp .env.example .env.local
npm start
```

Add your own development credentials to `.env.local`:

```env
EXPO_PUBLIC_GOOGLE_VISION_API_KEY=your_google_vision_api_key
EXPO_PUBLIC_EDAMAM_APP_ID=your_edamam_app_id
EXPO_PUBLIC_EDAMAM_APP_KEY=your_edamam_app_key
```

Then launch the project with Expo on Android, iOS or web.

## 🔐 Security note

The original student prototype used development API credentials directly in the mobile source. Those values have been **removed from the public repository** and replaced by environment-based configuration.

For a production application, calls requiring private credentials should be moved behind a backend/API proxy because `EXPO_PUBLIC_*` variables are bundled into the client and should not be treated as secret storage.

## 🧪 Engineering decisions demonstrated

`Computer vision integration` • `Async API workflows` • `Image/base64 processing` • `Data filtering` • `Missing-data comparison` • `Recipe metadata modelling` • `Mobile UX` • `Third-party API integration`

## 🗺️ Next improvements

- [ ] Move Vision and recipe credentials behind a backend service
- [x] Split API and ingredient logic into focused service/utility modules
- [ ] Replace source-page scraping with a stable recipe-detail provider where possible
- [ ] Add persisted user profiles and configurable allergens
- [ ] Add automated tests for ingredient normalisation and missing-ingredient logic
- [ ] Add saved recipes and shopping-list generation
- [ ] Add an LLM/RAG recipe assistant as a separate, testable feature

## 🎓 Academic context

cookAI was developed as part of my **BSc Computer Science final-year work at Middlesex University London**. The public repository preserves the real project concept and implementation while removing local build artefacts, machine-specific paths and development credentials.

---

<div align="center">

**Subanan Subathevan**  
First Class Honours BSc Computer Science

[![Portfolio](https://img.shields.io/badge/Portfolio-Explore_My_Work-000000?style=for-the-badge&logo=vercel)](https://subanan18.github.io/)

### From ingredients → recognition → recipes. 🍽️

</div>
