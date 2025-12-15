# How to Setup Locally

Follow these steps to set up and run the project locally using Docker Compose:

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed (for running migration commands)

## Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/Lokeshranjan8/contest-tracker.git
    cd contest-tracker
    ```

2. **Start all services using Docker Compose**

    ```bash
    docker compose up --build
    ```

    This will build and start the backend, frontend, and database containers.

3. **Run database migrations**

    Open a new terminal and navigate to the `server` directory:

    ```bash
    cd server
    npx knex migrate:latest
    ```

    This will apply all database migrations to set up the schema.

4. **Access the application**

    - The frontend should be available at [http://localhost:3000](http://localhost:3000) (or the port specified in your Docker setup).
    - The backend API should be available at [http://localhost:5000](http://localhost:5000) (or the port specified in your Docker setup).

## Stopping the Services

To stop all running containers:

```bash
docker compose down
```

---

# 🏆 Contest Tracker

A Full Stack Web app I built to make life easier for competitive programmers like me. It connects to the Codeforces API and pulls in all the useful stuff—your profile, contest ratings, how many problems you've solved.

It also keeps track of upcoming and past contests so you never miss a challenge. You can quickly see what contests are scheduled, how long they'll last, and even revisit previous ones to analyze your progress or retry problems.

## ✨ Features

-  **Profile Analytics** - View your Codeforces profile with detailed statistics
-  **Rating Tracking** - Monitor your contest rating progress over time
-  **Submission Sorted By Tags** - "Accepted Problems Sorted by Ratings and  Topic Tags"
-  **Contest Schedule** - Never miss upcoming contests with real-time updates
-  **Smart Caching** - Fast performance with Redis-powered caching
-  **Secure Authentication** - JWT-based user authentication systemtroduction

 A Full Stack Web app I built to make life easier for competitive programmers like me. It connects to the Codeforces API and pulls in all the useful stuff—your profile, contest ratings, how many problems you've solved, and even your submission history.
It also keeps track of upcoming and past contests so you never miss a challenge. You can quickly see what contests are scheduled, how long they’ll last, and even revisit previous ones to analyze your progress or retry problems.



## 🏗️ Backend Architecture

## Tech Stack 
   ###  Frontend

   - **React.js** – For building fast and interactive UIs  
   - **Tailwind CSS** – For utility-first and responsive styling  

   ###  Backend

   - **Node.js** – JavaScript runtime for server-side logic  
   - **Express.js** – Minimalist web framework to handle API routes  
   - **PostgreSQL** – For storing profiles, submissions, and contests  
   - **Redis** – For caching API responses (like profiles & contests)  
   - **Node-Cron** – To schedule background jobs like fetching contests every 24 hours

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b Branch-Name

# 3. Commit your changes
git commit -m "Add some Contribution"

# 4. Push to the branch
git push origin Branch-Name

# 5. Open a Pull Request
```

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for more details.

## 👨‍💻 Author

**Lokesh Ranjan**

- GitHub: [@Lokesh Ranjan](https://github.com/Lokeshranjan8)

## 🙏 Acknowledgments

- **Codeforces** – for providing the public APIs
- **Redis, PostgreSQL, Render, Vercel** – for backend & deployment stack
- All the amazing open-source libraries and tools used throughout

---

Built with ❤️ by **Lokesh Ranjan**



