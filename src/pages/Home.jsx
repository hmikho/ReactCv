import { useEffect, useState } from "react";
import "../App.css"; // Lägg till den här raden!

export default function Home() {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <p>Welcome to my website! </p>
      <br />
     <p> Click on the links above to view my CV and portfolio.</p>
    </div>
  );
}
