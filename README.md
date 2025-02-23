# LinguaChain

LinguaChain is a Web3-based language learning platform built on the Edu Chain blockchain. Users can sign up using their Web3 wallets and subscribe to access premium features. The platform offers an AI Tutor, interactive courses, and a dashboard to track progress.

## 🚀 Features
- Web3 Authentication: Users sign in using their Web3 wallets.
- AI Tutor: A chatbot for interactive language learning (premium feature).
- Courses: Enroll in free or premium courses.
- Dashboard: Track progress, enrolled courses, badges, and NFT certificates.

## 🛠 Tech Stack
- Frontend: React.js, TailwindCSS
- Backend: Edu Chain blockchain (for authentication & subscriptions)
- State Management: wagmi, React Query
- Web3 Integration: Reown AppKit

## 🔗 Live Demo
[Deployed Website](https://resilient-sunflower-279993.netlify.app/)

## 📜 Smart Contract Details
- Network: Edu Chain Testnet
- Contract Address: 0xF268a967f51802362FA774A077637cd216519486

## 📂 Project Structure
src/
 ├── components/        # UI components
 │   ├── AITutor.tsx
 │   ├── Courses.tsx
 │   ├── Dashboard.tsx
 │   ├── Header.tsx
 │   ├── Hero.tsx
 │   ├── Subscription.tsx
 │
 ├── lib/               # State management & Web3 integration
 │   ├── store.ts
 │   ├── wagmi.ts
 │
 ├── App.tsx            # Main app component
 ├── index.css          # Global styles
 ├── main.tsx           # React entry point

## 📦 Installation
git clone [https://github.com/riddhikakundu06/LinguaChain.git](https://github.com/riddhikakundu06/LinguaChain.git)
cd linguachain
npm install

## 🏃‍♂️ Running the Project
npm run dev

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📜 License
This project is licensed under the MIT License.
