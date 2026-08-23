<div align="center">

# 🍳 cookAI — Intelligent Recipe Generator

### Turn ingredients into recipe ideas using AI-powered image recognition and recipe discovery

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Cloud](https://img.shields.io/badge/Google_Vision-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![API](https://img.shields.io/badge/Recipe_API-Edamam-6DB33F?style=for-the-badge)
![Status](https://img.shields.io/badge/University-Final_Year_Project-blue?style=for-the-badge)

</div>

---

## 🥗 Overview

**cookAI** is an intelligent recipe-discovery application developed as a Computer Science final-year project.

The idea is simple: instead of deciding what to cook first and then buying ingredients, cookAI helps users start with **ingredients they already have**.

Users can provide ingredient information—including through images—and the application helps identify ingredients, discover suitable recipes and apply dietary or availability filters.

---

## 💡 The Problem

People often have food at home but still struggle with the question:

> **"What can I cook with what I already have?"**

This can lead to unnecessary shopping and unused ingredients.

cookAI explores how computer vision, APIs and a user-friendly interface can make recipe discovery more contextual and convenient.

---

## ✨ Features

- 📷 Select/upload ingredient images
- 👁️ Detect ingredient information using **Google Vision API**
- 🍽️ Search recipes through the **Edamam API**
- 🥬 Vegan and dietary filtering
- ⚠️ Allergen-aware filtering
- 🚫 Exclude ingredients the user does not have/want
- 🧾 Identify missing ingredients for recipes
- 🌐 Recipe information extraction / web-data integration
- 📱 User-focused React / React Native interface experimentation

---

## 🔄 How It Works

```text
┌─────────────────────┐
│ User adds ingredients│
│  / selects an image │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Google Vision API   │
│ Ingredient Detection│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Filters & Ingredient│
│ Processing          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Edamam Recipe API   │
│ + Recipe Sources    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Relevant Recipes +  │
│ Missing Ingredients │
└─────────────────────┘
```

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Frontend | React.js / React Native |
| Mobile tooling | Expo |
| Language | JavaScript |
| HTTP client | Axios |
| Image selection | Expo ImagePicker |
| File handling | Expo FileSystem |
| Computer vision | Google Vision API |
| Recipe data | Edamam API |
| Web-data parsing | Cheerio |

---

## 🧠 Key Technical Concepts

The project gave me practical experience combining several parts of a modern application:

- Third-party REST API integration
- Asynchronous JavaScript
- Image/file processing
- Computer-vision API integration
- Data filtering and transformation
- Web data extraction
- Frontend state and UI development
- User-centred application design
- Handling multiple external data sources

---

## 🎓 Academic Context

cookAI was developed as part of my **BSc Computer Science final-year work at Middlesex University London**.

The project combines software engineering with applied AI concepts to solve an everyday problem through a practical application.

---

## 🚀 Future Improvements

- [ ] Modernise the original application architecture
- [ ] Improve ingredient recognition accuracy
- [ ] Add an LLM-powered recipe assistant
- [ ] Add Retrieval-Augmented Generation (RAG) for recipe knowledge
- [ ] Personalised recipe recommendations
- [ ] Nutrition summaries
- [ ] Saved favourites and cooking history
- [ ] Shopping-list generation
- [ ] Better allergy and dietary controls
- [ ] Cloud deployment
- [ ] Automated tests and CI/CD

---

## 🔐 API Key Safety

API keys must not be committed to the repository. Public source code should use environment variables and example configuration files.

```text
.env
.env.local
*.key
```

---

## 🌟 What This Project Demonstrates

`React` • `JavaScript` • `REST APIs` • `Computer Vision` • `Google Vision` • `Data Processing` • `UI/UX` • `Applied AI`

---

## 👨‍💻 Author

**Subanan Subathevan**  
BSc Computer Science — First Class Honours

[![GitHub](https://img.shields.io/badge/GitHub-subanan18-181717?style=for-the-badge&logo=github)](https://github.com/subanan18)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-000000?style=for-the-badge&logo=vercel)](https://subanan18.github.io/)

---

<div align="center">

### 🍽️ From ingredients → intelligence → inspiration.

</div>
