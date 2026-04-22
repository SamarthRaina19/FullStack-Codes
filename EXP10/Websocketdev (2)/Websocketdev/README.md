# 💬 NexusChat

NexusChat is a full-stack, real-time messaging application that mimics a classic Discord-like interface. It pairs a **React (Vite)** frontend with a **Spring Boot** backend, utilizing WebSockets and STOMP to deliver instant messaging, voice clips, images, and stickers in a highly concurrent environment.

## ✨ Features

- **Instant Delivery**: Messages are sent and received in milliseconds using STOMP over WebSockets for bi-directional communication.
- **Media Support**: Send text, images, stickers, and up to ~30 seconds of high-fidelity voice messages seamlessly in the same chat stream.
- **Modern UI**: A responsive, rich dark-mode design inspired heavily by Discord, featuring categorized sidebar servers, user connection states, and fluid message layouts.
- **Broadcasting & State**: See who joins the network live! A real-time updating user list shows everyone currently active in the `#general` channel.
- **Large Payload Support**: Configured to handle chunks up to 10MB to guarantee that large pictures and recorded voice blobs don't freeze the connection.

## 🚀 Tech Stack

- **Frontend**: React (Vite), JavaScript, HTML5/CSS3 (Custom flexbox design properties).
- **Backend**: Java 21, Spring Boot, Spring WebSockets, Spring Messaging.
- **Protocols**: SockJS (WebSocket Fallback), STOMP.

## 🛠️ Installation & Setup

Before running the application, ensure you have **Java 21** and **Node.js** installed on your machine.

### 1. Starting the Spring Boot Backend

The backend server relies on Maven wrapper and contains all the logic for state tracking and the STOMP message broker.

```bash
cd Websocketdev
./mvnw.cmd spring-boot:run
```
> **Note**: The API broker defaults to running on port `8081`. 

### 2. Starting the React Vite Frontend

The Frontend uses standard NPM commands. Open a separate terminal from your backend and run:

```bash
cd frontend
npm install
npm run dev
```

> **Note**: The Vite client will spawn on `http://localhost:5173`. We have allowed Cross-Origin (CORS) limits in the backend to ensure local pairing runs efficiently.

## 🧪 Usage

Once both environments are successfully running, open your web browser to `http://localhost:5173`. 
1. Enter any display name for your avatar proxy.
2. Start typing to send a message.
3. Click the 📷 icon to upload local photos up to 5MB.
4. Click the 😀 icon to deploy a quick SVG sticker to the chatroom.
5. Click the 🎤 icon to authorize your microphone, record a snippet, and dispatch a voice message.

To test concurrent broadcasting, attempt opening the application in an incognito window or alternate browser alongside your main window!

## 🤝 Project Structure Quick Look

```
Websocketdev/
 ├── frontend/               # Vite Context
 │   ├── src/                
 │   │   ├── App.jsx         # Main Socket logic, View Models, Audio tools
 │   │   ├── App.css         # Discord-Like structural styling 
 │   ├── public/stickers/    # Default SVGs
 ├── Websocketdev/           # Spring Boot Context
 │   ├── src/main/java/com/aml3A/Websocketdev/
 │   │   ├── Message.java    # Universal Payload Object (Text/Voice/Images)
 │   │   ├── config/         # Message broker registry & 10MB limit params
 │   │   ├── controller/     # Websocket destination mapping handles
```
![WorkingScreenshot](frontend\Screenshot1.png)
![WorkingScreenshot](frontend\Screenshot2.png)