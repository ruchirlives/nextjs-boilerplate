import React from 'react';
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a simple nested About.tsx webpage using the app directory.</p>
      <Image/>
    </div>
  );
}

export default AboutPage;

