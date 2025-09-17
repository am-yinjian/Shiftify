# Shiftify  

Shiftify is a simple scheduling web app that helps managers and employees collaborate on weekly shift planning. Employees can submit their availability, managers can create schedules, and both can view the finalized shifts. Future versions will integrate with LLMs (AI models) to automatically generate optimized schedules.  

---

## 🚀 Features  

- 📅 **Employee Availability**  
  Employees submit weekly availability using an interactive calendar + time picker.  

- 📝 **Schedule Creation**  
  Managers generate schedules based on submitted availability.  

- 👀 **View Schedule**  
  Both employees and managers can view the finalized schedule.  

- 🧠 **LLM Integration (Planned)**  
  We aim to integrate AI models to automatically generate optimized schedules, compare different LLM providers, and evaluate cost-effectiveness and quality.  

---

## 🖼️ Screenshots (coming soon)

- **Home Page** — Overview of Shiftify with navigation to features.  
- **Availability Form** — Calendar to pick a week and submit availability.  
- **Manager Tools** — Create and manage schedules.  

---

## 🛠️ Tech Stack  

- **Frontend:** React (Vite/CRA) + React Router  
- **Styling:** CSS (custom components with a clean, modern theme)  
- **Backend:** Node.js / Express  
- **Database:** MongoDB (via Mongoose)  
- **Future AI Integration:** OpenAI / Anthropic / other LLM providers  

---

## 📂 Project Structure  

```
shiftify/
│── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── Availability.jsx
│   │   └── Schedule.jsx (planned)
│   ├── css/
│   │   ├── Home.css
│   │   └── Availability.css
│   ├── App.jsx
│   └── main.jsx
│
│── server/
│   ├── models/
│   │   └── schedule.model.js
│   ├── routes/
│   │   └── shifts.js
│   └── index.js
│
│── README.md
│── package.json
```

---

## ⚡ Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/your-username/shiftify.git
cd shiftify
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Run frontend  
```bash
npm run dev
```

### 4. Run backend (from `server/`)  
```bash
cd server
npm install
npm run dev
```

### 5. Open in browser  
Navigate to [http://localhost:5173](http://localhost:5173)  

---

## ✅ Roadmap  

- [x] Availability submission  
- [x] Weekly selection via calendar  
- [ ] Manager schedule builder  
- [ ] Notes + AI schedule generation  
- [ ] Compare multiple LLM providers  
- [ ] Deploy to production  

---

## 🤝 Contributing  

Pull requests are welcome! Please fork the repo and open a PR. For major changes, open an issue first to discuss.  

---

## 📜 License  

MIT License © 2025 Shiftify Team  
