<<<<<<< HEAD
# 👻 Phasmophobia App

A companion web app for **Phasmophobia** players to track evidence, identify ghosts, learn about equipment, and test their knowledge with trivia.

![Phasmophobia](https://img.shields.io/badge/Game-Phasmophobia-red?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## 🎮 Features

### 🔍 Evidence Tracker

Track evidence found during investigations to narrow down which ghost is haunting the location. Click evidence items to select/deselect and see matching ghosts update in real-time.

### 📖 Ghost Guide

Browse all 24 ghost types with detailed information including:

- Required evidence
- Unique abilities
- Weaknesses
- Hunt thresholds

### 🧰 Equipment Guide

Learn about all ghost hunting equipment including items from the Chronicle update:

- Starter equipment
- Detection tools
- Protection items
- Utility gear

Filter by category to find what you need quickly.

### 🧠 Hunting Trivia

Test your Phasmophobia knowledge with a quiz featuring questions about ghosts, evidence, and game mechanics. Track your high score!

---

## 📁 Project Structure

```
Phasmo-App/
├── index.html          # Home page with navigation
├── style.css           # Main stylesheet
├── script.js           # Core JavaScript functionality
├── ghosts.json         # Ghost data (24 types)
├── equipment.json      # Equipment data
├── trivia.json         # Trivia questions
├── assets/
│   └── spooky-img.png  # Background image
└── pages/
    ├── evidence.html   # Evidence tracker page
    ├── guide.html      # Ghost guide page
    ├── equipment.html  # Equipment guide page
    └── trivia.html     # Trivia game page
```

---

## 🎨 Design

- **Theme**: Dark horror aesthetic with red (#ff4444) and green (#66ff66) accents
- **Font**: Creepster for headers, Verdana for body text
- **Effects**: Glowing text, hover animations, smooth transitions
- **Layout**: Responsive design that works on desktop and mobile

---

## 📊 Data

The app uses JSON files to store game data:

- **ghosts.json** - 24 ghost types with evidence, abilities, and weaknesses
- **equipment.json** - All equipment with descriptions, usage tips, and categories
- **trivia.json** - Quiz questions with multiple choice answers

---

_Made with ❤️ for ghost hunters_
