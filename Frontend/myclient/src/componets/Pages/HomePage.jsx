import React from "react";

const HomePage = () => {

    return(
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <header style={{ textAlign: "center", marginBottom: "30px" }}>
                  <h1>Welcome to Blog System</h1>
                  <p>Share your thoughts, explore content, and join the community!</p>
         </header>
         <main style={{ textAlign: "center" }}>
         <h2>What is Blog System?</h2>
        <p>
          Blog System is your go-to platform for creating and sharing blogs with a like-minded
          community. Whether you're an avid reader, an inspiring author, or an administrator
          managing content, Blog System caters to all.
        </p>
        <h3>Features:</h3>
        <ul style={{ listStyleType: "disc", margin: "20px auto", display: "inline-block", textAlign: "left" }}>
          <li>Write and publish your own blogs</li>
          <li>Read blogs from other authors</li>
          <li>Engage with the community through comments and likes</li>
        </ul>
      </main>                                                                                                                                               

        </div>

    );
}

export default HomePage;