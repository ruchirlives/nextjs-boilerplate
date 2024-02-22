import React from 'react';
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a simple nested About.tsx webpage using the app directory.</p>
      <Image
        src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority/>
    </div>
    <div>
      <img src="https://res.cloudinary.com/ruchirlives/image/upload/v1615313157/Scotland_AMO_2008129_lrg_vbmnom.jpg"></img>
    <\div>
  );
}

export default AboutPage;

