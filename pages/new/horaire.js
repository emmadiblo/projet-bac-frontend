  document.addEventListener('DOMContentLoaded', () => {

 // ===============================
        // DONNÉES SIMULÉES (à remplacer par des appels AJAX réels à une base de données)
        // ===============================
        const simulatedData = {
            departements: [
                { id: 'tic', nom: 'TIC' },
                { id: 'construction', nom: 'Construction' },
                { id: 'em', nom: 'EM' },
                { id: 'au', nom: 'AU' }
            ],
            niveaux: [
                { id: 'bac1', nom: 'BAC 1' },
                { id: 'bac2', nom: 'BAC 2' },
                { id: 'bac3', nom: 'BAC 3' }
            ],
            filieres: [
                { id: 'info', nom: 'Info' },
                { id: 'tmi', nom: 'TMI' },
                { id: 'el', nom: 'EL' }
            ],
            salles: [
                { id: 'salle24', nom: 'Salle 24' },
                { id: 'salle6', nom: 'Salle 6' },
                { id: 'salle4', nom: 'Salle 4' },
                { id: 'salleR01', nom: 'Salle R01' },
                { id: 'salleR04', nom: 'Salle R04' }
            ],
            cours: [
                { id: 'prog_web', nom: 'Programmation web' },
                { id: 'securite_reseaux', nom: 'Sécurité Réseaux' },
                { id: 'bases_donnees', nom: 'Bases de données' },
                { id: 'algorithmes', nom: 'Algorithmes' }
            ],
            enseignants: [
                { id: 'ntayagabiri', nom: 'Ntayagabiri J pierre' },
                { id: 'hilaire', nom: 'Prof Hilaire' },
                { id: 'leonard', nom: 'Prof Léonard' },
                { id: 'marie', nom: 'Prof Marie' }
            ],
            statuts: [
                { id: 'debut', nom: 'Début du cours' },
                { id: 'encours', nom: 'En cours' },
                { id: 'fin', nom: 'Fin du cours' }
            ]
        };

        // ===============================
        // VARIABLES GLOBALES
        // ===============================
        let optionCounter = 0;
        const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
        
        // ===============================
        // FONCTIONS DE CHARGEMENT DE DONNÉES
        // ===============================
        
        // Fonction pour charger les données (simulation)
        function loadData() {
            return new Promise((resolve) => {
                // Afficher l'overlay de chargement
                const loadingOverlay = document.getElementById('loadingOverlay');
                loadingOverlay.style.display = 'flex';
                const loadingBar = document.getElementById('loadingBar');
                
                // Simuler un chargement progressif
                let width = 0;
                const interval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                        loadingOverlay.style.display = 'none';
                        resolve(simulatedData);
                    } else {
                        width += 5;
                        loadingBar.style.width = width + '%';
                    }
                }, 50);
                
                // Dans un environnement réel, vous feriez un appel AJAX ici :
                /*
                fetch('/api/get-data')
                    .then(response => response.json())
                    .then(data => {
                        loadingOverlay.style.display = 'none';
                        resolve(data);
                    })
                    .catch(error => {
                        console.error('Erreur de chargement:', error);
                        loadingOverlay.style.display = 'none';
                    });
                */
            });
        }
        
        // Fonction pour remplir un élément select avec des options
        function populateSelect(selectId, options) {
            const select = document.getElementById(selectId);
            if (!select) return;
            
            select.innerHTML = '';
            options.forEach(option => {
                const optElement = document.createElement('option');
                optElement.value = option.id;
                optElement.textContent = option.nom;
                select.appendChild(optElement);
            });
        }
        
        // ===============================
        // FONCTIONS DE GESTION DES OPTIONS
        // ===============================
        
        // Fonction pour ajouter une nouvelle option
        function addOption() {
            optionCounter++;
            
            const optionsContainer = document.getElementById('optionsContainer');
            const newOption = document.createElement('div');
            newOption.className = 'option-item';
            newOption.innerHTML = `
                <button type="button" class="remove-option" onclick="removeOption(this)">×</button>
                <fieldset>
                    <legend>Option #${optionCounter}</legend>
                    <div class="input-group">
                        <label for="niveau_${optionCounter}">Niveau</label>
                        <select name="niveau_${optionCounter}" id="niveau_${optionCounter}"></select>
                    </div>
                    <div class="input-group">
                        <label for="filiere_${optionCounter}">Filière</label>
                        <select name="filiere_${optionCounter}" id="filiere_${optionCounter}"></select>
                    </div>
                    <div class="input-group">
                        <label for="salle_${optionCounter}">Salle</label>
                        <select name="salle_${optionCounter}" id="salle_${optionCounter}"></select>
                    </div>

                    <fieldset>
                        <legend>Jours et horaires</legend>
                        
                        ${generateDaysFieldsets(optionCounter)}
                    </fieldset>
                </fieldset>
            `;
            
            optionsContainer.appendChild(newOption);
            
            // Remplir les sélecteurs
            populateSelect(`niveau_${optionCounter}`, simulatedData.niveaux);
            populateSelect(`filiere_${optionCounter}`, simulatedData.filieres);
            populateSelect(`salle_${optionCounter}`, simulatedData.salles);
        }
        
        // Fonction pour générer les fieldsets des jours
        function generateDaysFieldsets(optionId) {
            let html = '';
            
            days.forEach(day => {
                html += `
                    <fieldset>
                        <legend>${capitalizeFirstLetter(day)}</legend>
                        <div class="input-group">
                            <label for="${day}_programme_${optionId}">Le jour est programmé</label>
                            <input type="checkbox" name="${day}_programme_${optionId}" id="${day}_programme_${optionId}" onchange="toggleDayContent(this)">
                        </div>
                        
                        <div id="${day}_content_${optionId}" class="day-content"></div>
                    </fieldset>
                `;
            });
            
            return html;
        }
        
        // Fonction pour supprimer une option
        function removeOption(button) {
            const optionItem = button.parentElement;
            if (document.querySelectorAll('.option-item').length > 1) {
                optionItem.remove();
            } else {
                alert("Vous ne pouvez pas supprimer toutes les options. Il doit en rester au moins une.");
            }
        }
        
        // ===============================
        // FONCTIONS DE GESTION DES JOURS
        // ===============================
        
        // Fonction pour afficher/masquer le contenu d'un jour
        function toggleDayContent(checkbox) {
            const day = checkbox.id.split('_')[0]; // Récupérer le jour (lundi, mardi, etc.)
            const optionId = checkbox.id.split('_')[2]; // Récupérer l'ID de l'option
            const contentId = `${day}_content_${optionId}`;
            const contentElement = document.getElementById(contentId);
            
            if (checkbox.checked) {
                // Si le contenu est vide, le générer
                if (!contentElement.innerHTML.trim()) {
                    generateDayContent(day, optionId);
                }
                contentElement.style.display = 'block';
            } else {
                contentElement.style.display = 'none';
            }
        }
        
        // Fonction pour générer le contenu d'un jour
        function generateDayContent(day, optionId) {
            const contentElement = document.getElementById(`${day}_content_${optionId}`);
            
            // Créer le contenu HTML pour le jour
            const dayContent = `
                <div class="day-periods">
                    <div class="period">
                        <h4>Avant pause</h4>
                        <div class="period-option">
                            <input type="radio" name="${day}_matin_type_${optionId}" id="${day}_matin_cours_${optionId}" value="cours" checked onchange="togglePeriodContent(this)">
                            <label for="${day}_matin_cours_${optionId}">Cours</label>
                            
                            <input type="radio" name="${day}_matin_type_${optionId}" id="${day}_matin_tpe_${optionId}" value="tpe" onchange="togglePeriodContent(this)">
                            <label for="${day}_matin_tpe_${optionId}">TPE</label>
                            
                            <input type="radio" name="${day}_matin_type_${optionId}" id="${day}_matin_conge_${optionId}" value="conge" onchange="togglePeriodContent(this)">
                            <label for="${day}_matin_conge_${optionId}">Congé</label>
                        </div>
                        
                        <div id="${day}_matin_cours_content_${optionId}" class="period-content">
                            <div class="input-group">
                                <label for="${day}_matin_cours_nom_${optionId}">Cours</label>
                                <select name="${day}_matin_cours_nom_${optionId}" id="${day}_matin_cours_nom_${optionId}"></select>
                            </div>
                            
                            <div class="input-group">
                                <label for="${day}_matin_enseignant_${optionId}">Enseignant</label>
                                <select name="${day}_matin_enseignant_${optionId}" id="${day}_matin_enseignant_${optionId}"></select>
                            </div>
                            
                            <div class="input-group">
                                <label for="${day}_matin_statut_${optionId}">Statut</label>
                                <select name="${day}_matin_statut_${optionId}" id="${day}_matin_statut_${optionId}"></select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="period">
                        <h4>Après pause</h4>
                        <div class="period-option">
                            <input type="radio" name="${day}_apres_type_${optionId}" id="${day}_apres_cours_${optionId}" value="cours" checked onchange="togglePeriodContent(this)">
                            <label for="${day}_apres_cours_${optionId}">Cours</label>
                            
                            <input type="radio" name="${day}_apres_type_${optionId}" id="${day}_apres_tpe_${optionId}" value="tpe" onchange="togglePeriodContent(this)">
                            <label for="${day}_apres_tpe_${optionId}">TPE</label>
                            
                            <input type="radio" name="${day}_apres_type_${optionId}" id="${day}_apres_conge_${optionId}" value="conge" onchange="togglePeriodContent(this)">
                            <label for="${day}_apres_conge_${optionId}">Congé</label>
                        </div>
                        
                        <div id="${day}_apres_cours_content_${optionId}" class="period-content">
                            <div class="input-group">
                                <label for="${day}_apres_cours_nom_${optionId}">Cours</label>
                                <select name="${day}_apres_cours_nom_${optionId}" id="${day}_apres_cours_nom_${optionId}"></select>
                            </div>
                            
                            <div class="input-group">
                                <label for="${day}_apres_enseignant_${optionId}">Enseignant</label>
                                <select name="${day}_apres_enseignant_${optionId}" id="${day}_apres_enseignant_${optionId}"></select>
                            </div>
                            
                            <div class="input-group">
                                <label for="${day}_apres_statut_${optionId}">Statut</label>
                                <select name="${day}_apres_statut_${optionId}" id="${day}_apres_statut_${optionId}"></select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            contentElement.innerHTML = dayContent;
            
            // Remplir les sélecteurs
            populateSelect(`${day}_matin_cours_nom_${optionId}`, simulatedData.cours);
            populateSelect(`${day}_matin_enseignant_${optionId}`, simulatedData.enseignants);
            populateSelect(`${day}_matin_statut_${optionId}`, simulatedData.statuts);
            
            populateSelect(`${day}_apres_cours_nom_${optionId}`, simulatedData.cours);
            populateSelect(`${day}_apres_enseignant_${optionId}`, simulatedData.enseignants);
            populateSelect(`${day}_apres_statut_${optionId}`, simulatedData.statuts);
        }
        
        // Fonction pour afficher/masquer le contenu d'une période selon le type sélectionné
        function togglePeriodContent(radio) {
            const [day, period, type, optionId] = radio.id.split('_');
            const coursContentId = `${day}_${period}_cours_content_${optionId}`;
            const coursContent = document.getElementById(coursContentId);
            
            if (type === 'cours') {
                coursContent.style.display = 'block';
            } else {
                coursContent.style.display = 'none';
            }
        }
        
        // ===============================
        // FONCTIONS DE PRÉVISUALISATION
        // ===============================
        
        // Fonction pour prévisualiser l'horaire
        function previewTimetable() {
            // Mise à jour des informations d'en-tête
            const departementSelect = document.getElementById('department');
            const departementId = departementSelect.value;
            const departement = simulatedData.departements.find(d => d.id === departementId);
            
            if (departement) {
                let departementNom = '';
                switch(departement.id) {
                    case 'tic':
                        departementNom = 'Département des Technologies de l\'Information et de la Communication';
                        break;
                    case 'construction':
                        departementNom = 'Département de Construction';
                        break;
                    case 'em':
                        departementNom = 'Département d\'Électromécanique';
                        break;
                    case 'au':
                        departementNom = 'Département d\'Architecture et Urbanisme';
                        break;
                    default:
                        departementNom = departement.nom;
                }
                document.getElementById('previewDepartment').textContent = departementNom;
            }
            
            const semaine = document.getElementById('semaine').value;
            document.getElementById('previewWeek').textContent = `${semaine}ème SEMAINE - ${departementId.toUpperCase()}`;
            
            const periodeDebut = document.getElementById('periode_debut').value;
            const periodeFin = document.getElementById('periode_fin').value;
            const formatDate = (dateStr) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                return date.toLocaleDateString('fr-FR');
            };
            document.getElementById('previewPeriod').textContent = 
                `HORAIRE DES COURS POUR LA PERIODE DU ${formatDate(periodeDebut)} AU ${formatDate(periodeFin)}`;
            
            // Date du document (généralement quelques jours avant la période)
            const today = new Date();
            document.getElementById('previewDate').textContent = today.toLocaleDateString('fr-FR');
            
            // Générer le contenu du tableau
            const tableBody = document.getElementById('previewTableBody');
            tableBody.innerHTML = '';
            
            // Pour chaque option, créer une ligne dans le tableau
            const optionItems = document.querySelectorAll('.option-item');
            optionItems.forEach((optionItem, index) => {
                const optionId = index + 1;
                const niveauSelect = document.getElementById(`niveau_${optionId}`);
                const filiereSelect = document.getElementById(`filiere_${optionId}`);
                const salleSelect = document.getElementById(`salle_${optionId}`);
                
                if (!niveauSelect || !filiereSelect || !salleSelect) return;
                
                const niveauId = niveauSelect.value;
                const filiereId = filiereSelect.value;
                const salleId = salleSelect.value;
                
                // Trouver les noms correspondants
                const niveau = simulatedData.niveaux.find(n => n.id === niveauId);
                const filiere = simulatedData.filieres.find(f => f.id === filiereId);
                const salle = simulatedData.salles.find(s => s.id === salleId);
                
                if (!niveau || !filiere || !salle) return;
                
                const row = document.createElement('tr');
                
                // Cellule pour la classe
                const classCell = document.createElement('td');
                classCell.innerHTML = `${niveau.nom}<br>${filiere.nom}<br>(${salle.nom})`;
                classCell.style.fontWeight = 'bold';
                classCell.style.backgroundColor = 'var(--background-secondary)';
                row.appendChild(classCell);
                
                // Jours de la semaine
                days.forEach(day => {
                    const periods = ['matin', 'apres'];
                    
                    periods.forEach(period => {
                        const cell = document.createElement('td');
                        const isProgrammed = document.getElementById(`${day}_programme_${optionId}`)?.checked;
                        
                        if (isProgrammed) {
                            const typeRadioName = `${day}_${period}_type_${optionId}`;
                            const typeRadios = document.querySelectorAll(`input[name="${typeRadioName}"]`);
                            let selectedType = '';
                            
                            typeRadios.forEach(radio => {
                                if (radio.checked) {
                                    selectedType = radio.value;
                                }
                            });
                            
                            if (selectedType === 'cours') {
                                const coursSelect = document.getElementById(`${day}_${period}_cours_nom_${optionId}`);
                                const enseignantSelect = document.getElementById(`${day}_${period}_enseignant_${optionId}`);
                                const statutSelect = document.getElementById(`${day}_${period}_statut_${optionId}`);
                                
                                if (coursSelect && enseignantSelect && statutSelect) {
                                    const coursId = coursSelect.value;
                                    const enseignantId = enseignantSelect.value;
                                    const statutId = statutSelect.value;
                                    
                                    // Trouver les noms correspondants
                                    const cours = simulatedData.cours.find(c => c.id === coursId);
                                    const enseignant = simulatedData.enseignants.find(e => e.id === enseignantId);
                                    const statut = simulatedData.statuts.find(s => s.id === statutId);
                                    
                                    if (cours && enseignant) {
                                        cell.innerHTML = `
                                            <div class="course-cell">
                                                <div class="course-name">${cours.nom}</div>
                                                <div class="course-details">${enseignant.nom}</div>
                                                ${statutId === 'debut' ? '<div class="course-status">DEBUT DU COURS</div>' : ''}
                                            </div>
                                        `;
                                    }
                                }
                            } else if (selectedType === 'tpe') {
                                cell.innerHTML = '<div class="course-cell">TPE</div>';
                            } else if (selectedType === 'conge') {
                                cell.innerHTML = '<div class="course-cell">CONGÉ</div>';
                            }
                        }
                        
                        row.appendChild(cell);
                    });
                });
                
                tableBody.appendChild(row);
            });
            
            // Afficher la section de prévisualisation
            document.getElementById('previewSection').style.display = 'block';
            document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Fonction pour masquer la prévisualisation
        function hidePreview() {
            document.getElementById('previewSection').style.display = 'none';
        }
        
        // ===============================
        // FONCTIONS UTILITAIRES
        // ===============================
        
        // Fonction pour mettre en majuscule la première lettre
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        


        

    });

        // ===============================
        // INITIALISATION
        // ===============================
        
        // Initialiser les dates par défaut
        document.addEventListener('DOMContentLoaded', async function() {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            
            const formatDateForInput = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            
            document.getElementById('periode_debut').value = formatDateForInput(today);
            document.getElementById('periode_fin').value = formatDateForInput(nextWeek);
            
            // Charger les données
            try {
                await loadData();
                
                // Remplir les sélecteurs principaux
                populateSelect('department', simulatedData.departements);
                
                // Ajouter la première option
                addOption();
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                alert('Erreur lors du chargement des données. Veuillez recharger la page.');
            }
        });