# MusicAppForReelo

## Setup

1. **Clone the Repository**:git clone https://github.com/ajitkumarpal1/musicAppForReelo.git
cd musicAppForReelo
2. **Install Dependencies**:
npm install
3. **Run the Development Server**:
npm run dev

## Offline Server Setup

To run the server offline:

1. **Clone the Server Repository**:
git clone https://github.com/ajitkumarpal1/musicAppAPIs.git
cd musicAppAPIs

2. **Update the Environment Variable**:
- Open the `.env` file in the `musicAppForReelo` project directory.
- Change the `VITE_BASE_URL` to:
  ```
  VITE_BASE_URL=http://localhost:3200
  ```

3. **Run the Server**:
- Follow the setup instructions in the `musicAppAPIs` repository to start the server.

4. **Run the Client Code**:
- Return to the `musicAppForReelo` directory and start the development server:
  ```
  npm run dev
  ```

Your application will now be running locally.

## About

This project is a comprehensive music application similar to Spotify. It includes:

- **JWT Token Authentication**: Secure user authentication.
- **State Management**: Handled using Redux with separate reducers for user and song data.

## React + Vite

This project uses Vite for fast development and build times. It includes:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utilizes Babel for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses SWC for Fast Refresh.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please reach out to [Ajit Kumar Pal](https://github.com/ajitkumarpal1).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
