# Introduction

 A Full Stack Web app I built to make life easier for competitive programmers like me. It connects to the Codeforces API and pulls in all the useful stuff—your profile, contest ratings, how many problems you've solved, and even your submission history.
It also keeps track of upcoming and past contests so you never miss a challenge. You can quickly see what contests are scheduled, how long they’ll last, and even revisit previous ones to analyze your progress or retry problems.



## Tech Stack 
   ###  Frontend

   - **React.js** – For building fast and interactive UIs  
   - **Tailwind CSS** – For utility-first and responsive styling  
   - **Axios** – To make API requests from the frontend

   ###  Backend

   - **Node.js** – JavaScript runtime for server-side logic  
   - **Express.js** – Minimalist web framework to handle API routes  
   - **PostgreSQL** – For storing profiles, submissions, and contests  
   - **Redis** – For caching API responses (like profiles & contests)  
   - **Node-Cron** – To schedule background jobs like fetching contests every 24 hours

---

## Backend Architecture

    server/
    ├── controller/            
    │   ├── authController.js
    │   └── ProfileController.js
    │
    ├── Cron/                
    │   └── CronJob.js
    │
    ├── middleware/           
    │   └── authmiddleware.js
    │
    ├── routes/                
    │   ├── auth.js
    │   └── ProfileCF.js
    │
    ├── utils/                 
    │   ├── GenerateToken.js
    │   ├── Rating.js
    │   ├── Submission.js
    │   └── Topics.js
    │
    ├── .env                   
    ├── Clusters.js            
    ├── db.js                
    ├── fetchcontest.js        
    ├── index.js              
    ├── leetcode.js           
    ├── Profile.js             
    └── redis.js               


##  Contributing

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


## Author 


