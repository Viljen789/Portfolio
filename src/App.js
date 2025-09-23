import React, { useState, useEffect } from 'react'; // Add useEffect here
import './index.css';

import HtmlStage from './components/1_HtmlStage/HtmlStage';
import CssStage from './components/2_CssStage/CssStage';

function App() {
	const [portfolioStage, setPortfolioStage] = useState('html');

	const advanceStage = (newStage) => {
		setPortfolioStage(newStage);
	};

	// --- ADD THIS NEW EFFECT ---
	useEffect(() => {
		// This sets <body data-stage="html"> (or "css", "react")
		document.body.dataset.stage = portfolioStage;
	}, [portfolioStage]);
	// ---------------------------

	return (
		<main className="app-container">
			{portfolioStage === 'html' && <HtmlStage advanceStage={advanceStage} />}

			{/* For CSS and later stages, we wrap them in a div that our CSS can target */}
			{portfolioStage !== 'html' && (
				<div className="styled-content-wrapper">
					{portfolioStage === 'css' && <CssStage advanceStage={advanceStage} />}
					{/* React/Backend stages go here too */}
				</div>
			)}
		</main>
	);
}

export default App;
