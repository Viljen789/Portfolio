import React from "react";

const PortfolioContent = () => {
  return (
    <div>
      <h1>Viljen Apalset Vassbø</h1>

      <h2>Om meg</h2>
      <p>...</p>

      <h2>Prosjekt</h2>
      <div className="project-gallery">
        <div className="card">
          <h3>Prosjekt 1</h3>
          <p>...</p>
          <a href="#">Detaljer</a>
        </div>
        <div className="card">
          <h3>Prosjekt 2</h3>
          <p>...</p>
          <a href="#">Detaljer</a>
        </div>
        <div className="card">
          <h3>Project 2</h3>
          <p>...</p>
          <a href="#">Detaljer</a>
        </div>
      </div>

      <h2>Kontakt</h2>
      <div className="contact-links">
        <a href="#" className="btn btn-secondary">
          Email
        </a>
        <a href="#" className="btn btn-secondary">
          LinkedIn
        </a>
        <a href="#" className="btn btn-secondary">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default PortfolioContent;
