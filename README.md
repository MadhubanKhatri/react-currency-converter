# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

### Creating a React App with Vite

1. **Create a new Vite project:**
   ```bash
   npm create vite@latest currency_convertor -- --template react
   ```

2. **Navigate to the project directory:**
   ```bash
   cd currency_convertor
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Installing Tailwind CSS

1. **Install Tailwind CSS:**
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```


2. **Configure the Vite plugin in `vite.config.js`:**
   ```javascript
   import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'
    export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    })
   ```

4. **Add Tailwind directives to your CSS file:**
   ```css
   @import "tailwindcss";
   ```

5. **Restart your development server:**
   ```bash
   npm run dev
   ```


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

# react-currency-converter

A modern currency converter built with React, Vite, and Tailwind CSS. Features real-time currency conversion using live exchange rates from the Currency API.

## Features

- Real-time currency conversion
- Support for 170+ world currencies
- Swap currencies functionality
- Responsive design
- Loading states and error handling
- Modern UI with Tailwind CSS

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Currency API (@fawazahmed0/currency-api)
