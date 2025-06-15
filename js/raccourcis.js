// Gérer les raccourcis clavier
document.addEventListener('keydown', function (e) {

	// Ctrl+Z pour revenir en arrière dans l'historique
	if (e.ctrlKey && e.key === 'z') {
		e.preventDefault();
		history.back();
	}

	// Ctrl+Y pour avancer dans l'historique
	if (e.ctrlKey && e.key === 'y') {
		e.preventDefault();
		history.forward();
	}
});