import React from 'react';

const HtmlStage = ({ advanceStage }) => {
  return (
    <section className="stage-section html-stage">

      <div className="intro-message">
        <p><strong>Vekommen</strong></p>
      </div>

      <h1>Viljen Apalset Vassbø</h1>

      <h2>Om meg</h2>
      <p>
       ...
            </p>

      <h2>Prosjekt</h2>
      <ul>
        <li><a href="#">Prosjekt 1: Beskrivelse</a></li>
        <li><a href="#">Prosjekt 2: Beskrivelse</a></li>
        <li><a href="#">Prosjekt 3: Beskrivelse</a></li>
      </ul>

      <h2>Kontakt</h2>
      <ul>
        <li><a href="#">Email</a></li>
        <li><a href="#">LinkedIn</a></li>
        <li><a href="#">GitHub</a></li>
      </ul>

      <button onClick={() => advanceStage('css')}>
		 Skru på CSS
      </button>

    </section>
  );
}

export default HtmlStage;
