import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ViewNote from "./components/ViewNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import WriteNote from "./components/WriteNote";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Ballpit from "./Ballpit";
import { useState, useEffect } from "react";

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseLightMode = savedTheme === 'light' || (!savedTheme && !systemPrefersDark);
    setIsLightTheme(shouldUseLightMode);

    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme');
      setIsLightTheme(newTheme === 'light');
    };

    // Listen for class changes on document element
    const observer = new MutationObserver(() => {
      const hasLightTheme = document.documentElement.classList.contains('light-theme');
      setIsLightTheme(hasLightTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  // Dark theme colors (yellowish cursor + neon palette)
  const darkColors = [0xffd700, 0xff3366, 0x00ff88, 0x3366ff, 0xff6600, 0xcc00ff];
  
  // Light theme colors (golden cursor + deep jewel tones)
  const lightColors = [0xb8860b, 0x990033, 0x006644, 0x003399, 0xcc4400, 0x660099];

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000000'
      }}>
        <Ballpit
          count={60}
          colors={isLightTheme ? lightColors : darkColors}
          gravity={0.015}
          friction={0.998}
          wallBounce={0.8}
          maxVelocity={0.06}
        />
        <div className="snow">
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
        </div>
      </div>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/getallnotes" element={<ViewNote />}></Route>
            <Route path="/addnote" element={<WriteNote />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
