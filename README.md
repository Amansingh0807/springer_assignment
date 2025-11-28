# Sales Dashboard

A modern, interactive sales dashboard built with Next.js 15, TypeScript, and Tailwind CSS, following Atomic Design principles. This project showcases sales data visualization with advanced filtering, multiple chart types, and year-over-year comparisons.

## ✨ Features

### Core Features
-   **Atomic Design Structure**: Components are organized into Atoms, Molecules, Organisms, and Templates for maximum reusability and maintainability.
-   **Interactive Charts**: Visualizes sales data for 2022, 2023, and 2024 using Recharts library.
-   **Chart Switching**: Toggle between Bar, Line, and Pie charts for each year.
-   **Data Filtering**: Filter sales data based on a custom minimum threshold input.
-   **Responsive Design**: Fully responsive layout optimized for all device sizes.
-   **Dark Mode Support**: Complete dark/light theme toggle with system preference detection.

### Enhanced Features ✅
-   **📊 Year Comparison Chart**: Side-by-side visualization comparing all three years (2022, 2023, 2024).
-   **📈 Statistics Dashboard**: Real-time calculation and display of:
    - Total sales per year
    - Average monthly sales
    - Year-over-year growth percentages
    - Trend indicators (up/down arrows)
-   **💾 CSV Export**: Export sales data for any year as CSV files with a single click.
-   **🎨 Smooth Animations**: Fade-in and slide-in animations for better UX.
-   **🎯 Professional UI**: Modern card-based layout with hover effects and smooth transitions.

## 🏗️ Project Structure

This project follows the Atomic Design methodology:

```
assignment/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── atoms/              # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ThemeToggle.tsx
│   ├── molecules/          # Combinations of atoms
│   │   ├── ChartSwitcher.tsx
│   │   ├── FilterInput.tsx
│   │   └── StatCard.tsx    # ✨ NEW: Statistics card component
│   ├── organisms/          # Complex UI sections
│   │   ├── SalesChart.tsx
│   │   └── YearComparisonChart.tsx  # ✨ NEW: Multi-year comparison
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   └── templates/
│       └── DashboardTemplate.tsx    # Main dashboard layout
├── lib/
│   ├── data.ts             # Mock sales data
│   └── utils.ts            # Utility functions (calculations, export)
└── public/
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Technologies Used

-   **Next.js 15**: React framework with App Router for production-ready applications.
-   **TypeScript**: Static typing for enhanced developer experience and code quality.
-   **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development.
-   **Recharts**: Composable charting library built on React components.
-   **Lucide React**: Beautiful & consistent icon set.
-   **next-themes**: Perfect dark mode implementation with system preference support.
-   **clsx & tailwind-merge**: Utility for constructing conditional className strings.

## 📊 What I Did in This Project

### 1. **Initial Setup**
   - Created Next.js 15 project with TypeScript and Tailwind CSS
   - Set up atomic design folder structure
   - Configured dark mode with next-themes

### 2. **Data Layer**
   - Created mock sales data for 2022, 2023, and 2024
   - Implemented TypeScript interfaces for type safety
   - Added utility functions for calculations (totals, averages, growth)

### 3. **Component Development**
   - **Atoms**: Built reusable Button, Card, Input, and ThemeToggle components
   - **Molecules**: Created FilterInput, ChartSwitcher, and StatCard components
   - **Organisms**: Developed SalesChart with multiple chart type support
   - **Templates**: Assembled DashboardTemplate combining all components

### 4. **Advanced Features**
   - Implemented custom threshold filtering
   - Added year-over-year comparison chart
   - Created statistics cards with automatic calculations
   - Built CSV export functionality
   - Added smooth animations and transitions

### 5. **Bug Fixes** 🐛
   - Fixed TypeScript compilation errors with Recharts types
   - Resolved `percent` possibly undefined issue in PieChart
   - Fixed data type compatibility issues

### 6. **UI/UX Enhancements**
   - Professional color scheme with proper dark mode support
   - Responsive grid layouts for all screen sizes
   - Hover effects and smooth transitions
   - Theme toggle button in header
   - Clear visual hierarchy and spacing

## 🎯 Future Enhancements

-   **API Integration**: Replace mock data with real-time API calls
-   **Advanced Filtering**: Add date range pickers and category filters
-   **More Chart Types**: Add area charts, scatter plots, and radar charts
-   **Data Analytics**: Implement predictive analytics and forecasting
-   **User Authentication**: Add user login and personalized dashboards
-   **Export Options**: PDF reports and image exports
-   **Real-time Updates**: WebSocket integration for live data

## 📝 Assignment Requirements Completed

✅ Created with Next.js 15, TypeScript, and Tailwind CSS  
✅ Implemented Atomic Design principles  
✅ Multiple chart components using Recharts library  
✅ Empty dashboard page with all components integrated  
✅ Custom filter input for sales threshold  
✅ Multiple chart types (Bar, Line, Pie) with switching  
✅ Proper README documentation  
✅ Theme toggle button on landing page  
✅ All TypeScript errors resolved  

## 🙏 Acknowledgments

- Mock sales data structure inspired by Kaggle datasets
- UI design patterns from modern SaaS dashboards
- Recharts documentation and examples

---

**Made with ❤️ using Next.js 15 and TypeScript**

