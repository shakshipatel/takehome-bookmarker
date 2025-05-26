# 🌐 **Link Saver + Auto-Summary**

A full-stack web application that lets users save bookmarks with auto-generated summaries. Secure login, responsive UI, and seamless integration with Jina AI summarization.

---

## 🚀 **Tech Stack**

* **Frontend:** React + TailwindCSS
* **Backend:** Bun (high-speed runtime) + Express.js-like server
* **Database:** PostgreSQL (managed with Prisma or pg library)
* **Authentication:** JWT + bcrypt
* **Summary Generation:** Jina AI Free API (`https://r.jina.ai`)
* **Deployment:** Vercel (frontend), Render (backend), or any preferred host

---

## 🔐 **Features**

✅ User registration & login with secure password hashing (bcrypt)
✅ JWT-based session management
✅ Paste URL to fetch and store metadata (title, favicon)
✅ Generate summary via Jina AI API
✅ Responsive list/grid view of bookmarks
✅ Delete bookmark with authorization check
✅ Optional: Dark mode, tag filters, drag-and-drop reorder

---

## ⚙️ **Setup Instructions**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/shakshipatel/takehome-bookmarker.git
cd takehome-bookmarker
```

### 2️⃣ **Backend Setup (Bun + PostgreSQL)**

1. Install [Bun](https://bun.sh):

   ```bash
   curl https://bun.sh/install | bash
   ```

2. Configure `.env` with your PostgreSQL credentials:

   ```dotenv
   DATABASE_URL=postgresql://user:password@host:port/dbname
   JWT_SECRET=random_string
   JWT_REFRESH_TOKEN_EXPIRY=7d
   JWT_ACCESS_TOKEN_EXPIRY=7d
   IV_HEX_STRING=your_hext_string
   ENCRYPTION_SECRET=your_key
   PORT:4000
   ```

3. Install backend dependencies:

   ```bash
   bun install
   ```

4. Run database migrations (if using Prisma):

   ```bash
   bunx prisma generate && bunx prisma db push
   ```

5. Start the backend server:

   ```bash
   bun dev
   ```

---

### 3️⃣ **Frontend Setup (React + Tailwind)**

1. Navigate to frontend folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (if needed):

   ```dotenv
   REACT_APP_BACKEND_URL=http://localhost:4000
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

---

### 🌍 **Live Demo**

🔗 [Live App URL (Vercel)](https://takehome-bookmarker.vercel.app)

---

### 🖼️ **Screenshots**

1. ![Signup](screenshots/signup.png)
2. ![Save Bookmark](screenshots/save_bookmark.png)
3. ![Bookmark List](screenshots/bookmark_list.png)

---

### 🧪 **Tests**

* Backend tests with **Bun test runner** (unit & integration)
* Frontend component tests with **React Testing Library**

---

### 💡 **What I'd Do Next**

* Add tag filtering and search
* Implement drag-and-drop reordering
* Enhance mobile responsiveness
* Improve summary accuracy with fallback parsing
* Dark mode toggle

---

### 📂 **Folder Structure**

```
/ (root)
├── backend/ (Bun server)
│   ├── src/
│   ├── prisma/
│   ├── .env
├── frontend/ (React)
│   ├── src/
│   ├── public/
│   ├── .env
└── README.md
```
