// ===============================
// DONNÉES SIMULÉES
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

let optionCounter = 0;
const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];

// ===============================
// FONCTIONS GLOBALES
// ===============================

function loadData() {
    return new Promise((resolve) => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingBar = document.getElementById('loadingBar');

        loadingOverlay.style.display = 'flex';

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
    });
}

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

function removeOption(button) {
    const optionItem = button.parentElement;
    if (document.querySelectorAll('.option-item').length > 1) {
        optionItem.remove();
    } else {
        alert("Vous ne pouvez pas supprimer toutes les options. Il doit en rester au moins une.");
    }
}

function toggleDayContent(checkbox) {
    const day = checkbox.id.split('_')[0];
    const optionId = checkbox.id.split('_')[2];
    const contentId = `${day}_content_${optionId}`;
    const contentElement = document.getElementById(contentId);

    if (checkbox.checked) {
        if (!contentElement.innerHTML.trim()) {
            generateDayContent(day, optionId);
        }
        contentElement.style.display = 'block';
    } else {
        contentElement.style.display = 'none';
    }
}

function generateDayContent(day, optionId) {
    const contentElement = document.getElementById(`${day}_content_${optionId}`);

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

    // Remplissage des selects
    populateSelect(`${day}_matin_cours_nom_${optionId}`, simulatedData.cours);
    populateSelect(`${day}_matin_enseignant_${optionId}`, simulatedData.enseignants);
    populateSelect(`${day}_matin_statut_${optionId}`, simulatedData.statuts);

    populateSelect(`${day}_apres_cours_nom_${optionId}`, simulatedData.cours);
    populateSelect(`${day}_apres_enseignant_${optionId}`, simulatedData.enseignants);
    populateSelect(`${day}_apres_statut_${optionId}`, simulatedData.statuts);
}

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function previewTimetable() {

     document.getElementById('pdf-options').style.display='block';
     
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

    const today = new Date();
    document.getElementById('previewDate').textContent = today.toLocaleDateString('fr-FR');

    const tableBody = document.getElementById('previewTableBody');
    tableBody.innerHTML = '';

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

        const niveau = simulatedData.niveaux.find(n => n.id === niveauId);
        const filiere = simulatedData.filieres.find(f => f.id === filiereId);
        const salle = simulatedData.salles.find(s => s.id === salleId);

        if (!niveau || !filiere || !salle) return;

        const row = document.createElement('tr');

        const classCell = document.createElement('td');
        classCell.innerHTML = `${niveau.nom}<br>${filiere.nom}<br>(${salle.nom})`;
        classCell.style.fontWeight = 'bold';
        classCell.style.backgroundColor = 'var(--background-secondary)';
        row.appendChild(classCell);

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

    document.getElementById('previewSection').style.display = 'block';
    document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
}

function hidePreview() {
    document.getElementById('previewSection').style.display = 'none';
}


        function generatePDF() {
            try {
  
            notyf.open({
                type: 'success',
                message: ` Génération du PDF en cours... !`
            });

   

                const { jsPDF } = window.jspdf;
                
                // Configuration
                const orientation = 'landscape';
                const format = document.getElementById('format').value;
                const margins = parseInt(document.getElementById('margins').value);
                const fontSize = parseInt(document.getElementById('fontSize').value);
                const primaryColor = document.getElementById('primaryColor').value;
                const showGrid = document.getElementById('showGrid').checked;
                const alternateRows = document.getElementById('alternateRows').checked;
                const watermark = document.getElementById('watermark').value;
                
                // Création du PDF
                const pdf = new jsPDF({
                    orientation: orientation,
                    unit: 'mm',
                    format: format
                });
                
                // Conversion couleur hex vers RGB
                function hexToRgb(hex) {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : {r: 0, g: 123, b: 255};
                }
                
                const primaryRgb = hexToRgb(primaryColor);
                
                // Dimensions de la page
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const usableWidth = pageWidth - (margins * 2);
                let currentY = margins;
                
                // Filigrane
                if (watermark) {
                    pdf.setTextColor(200, 200, 200);
                    pdf.setFontSize(50);
                    pdf.text(watermark, pageWidth/2, pageHeight/2, {
                        angle: 45,
                        align: 'center'
                    });
                }
                
                // En-tête
                pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
                pdf.setFontSize(fontSize + 4);
                pdf.setFont('helvetica', 'bold');
                
                const university = document.getElementById('university').value;
                pdf.text(university, pageWidth/2, currentY, { align: 'center' });
                currentY += 8;
                
                pdf.setFontSize(fontSize + 2);
                const institute = document.getElementById('institute').value;
                pdf.text(institute, pageWidth/2, currentY, { align: 'center' });
                currentY += 6;
                
                pdf.setTextColor(100, 100, 100);
                pdf.setFontSize(fontSize);
                pdf.setFont('helvetica', 'normal');
                const department = document.getElementById('department').value;
                pdf.text(department, pageWidth/2, currentY, { align: 'center' });
                currentY += 8;
                
                // Ligne de séparation
                pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
                pdf.setLineWidth(0.5);
                pdf.line(margins, currentY, pageWidth - margins, currentY);
                currentY += 8;
                
                // Informations de période
                pdf.setTextColor(80, 80, 80);
                pdf.setFontSize(fontSize - 1);
                const period = document.getElementById('period').value;
                pdf.text(period, pageWidth/2, currentY, { align: 'center' });
                currentY += 5;
                
                const week = document.getElementById('week').value;
                pdf.text(week, pageWidth/2, currentY, { align: 'center' });
                currentY += 10;
                
                // Préparation des données du tableau
                const table = document.getElementById('previewTable');
                const headers = [];
                const rows = [];
                
                // Extraction des en-têtes
                const headerRows = table.querySelectorAll('thead tr');
                if (headerRows.length >= 2) {
                    const firstHeaderRow = ['CLASSES', 'LUNDI', '', 'MARDI', '', 'MERCREDI', '', 'JEUDI', '', 'VENDREDI', ''];
                    const secondHeaderRow = ['', 'MATIN', 'APRÈS-MIDI', 'MATIN', 'APRÈS-MIDI', 'MATIN', 'APRÈS-MIDI', 'MATIN', 'APRÈS-MIDI', 'MATIN', 'APRÈS-MIDI'];
                    headers.push(firstHeaderRow, secondHeaderRow);
                }
                
                // Extraction des données
                const bodyRows = table.querySelectorAll('tbody tr');
                bodyRows.forEach(row => {
                    const rowData = [];
                    const cells = row.querySelectorAll('td');
                    cells.forEach(cell => {
                        // Nettoyage du contenu HTML
                        let cellText = cell.textContent.trim();
                        cellText = cellText.replace(/\s+/g, ' ');
                        rowData.push(cellText);
                    });
                    if (rowData.length > 0) {
                        rows.push(rowData);
                    }
                });
                
                // Génération du tableau avec autoTable
                pdf.autoTable({
                    head: headers,
                    body: rows,
                    startY: currentY,
                    margin: { left: margins, right: margins },
                    styles: {
                        fontSize: fontSize - 1,
                        cellPadding: 2,
                        lineColor: showGrid ? [200, 200, 200] : [255, 255, 255],
                        lineWidth: showGrid ? 0.1 : 0,
                    },
                    headStyles: {
                        fillColor: [primaryRgb.r, primaryRgb.g, primaryRgb.b],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold',
                        fontSize: fontSize,
                        halign: 'center',
                        valign: 'middle'
                    },
                    bodyStyles: {
                        textColor: [50, 50, 50],
                        halign: 'center',
                        valign: 'middle'
                    },
                    alternateRowStyles: alternateRows ? {
                        fillColor: [248, 249, 250]
                    } : {},
                    columnStyles: {
                        0: { fontStyle: 'bold', fillColor: [245, 245, 245] }
                    },
                    didDrawPage: function(data) {
                        currentY = data.cursor.y;
                    }
                });
                
                // Pied de page
                currentY += 15;
                pdf.setFontSize(fontSize - 2);
                pdf.setTextColor(100, 100, 100);
                
                pdf.text('TPE : Travail Personnel de l\'étudiant', margins, currentY);
                currentY += 6;
                
                const location = document.getElementById('location').value;
                const dateValue = document.getElementById('date').value;
                const formattedDate = dateValue ? new Date(dateValue).toLocaleDateString('fr-FR') : '';
                pdf.text(`Fait à ${location}, le ${formattedDate}`, margins, currentY);
                currentY += 8;
                
                const signatory = document.getElementById('signatory').value;
                const title = document.getElementById('title').value;
                
                pdf.setFont('helvetica', 'bold');
                pdf.text(signatory, margins, currentY);
                currentY += 4;
                pdf.setFont('helvetica', 'normal');
                pdf.text(title, margins, currentY);
                
                // Téléchargement
                const filename = document.getElementById('filename').value || 'horaire_cours';
                const finalFilename = `${filename}_${new Date().toISOString().split('T')[0]}.pdf`;
                
                if (document.getElementById('autoDownload').checked) {
                    pdf.save(finalFilename);
                      
                    notyf.open({
                type: 'success',
                message: `PDF téléchargé avec succès !`
                 });

                } else {
                    notyf.open({
                type: 'success',
                message: `PDF généré avec succès ! Cliquez pour télecharger`
                 });
                
                }
                
            } catch (error) {
                console.error('Erreur lors de la génération du PDF:', error);
                                   notyf.open({
                type: 'error',
                message: `Erreur lors de la génération du PDF`
                 });

            }
        }


// ===============================
// INITIALISATION AU CHARGEMENT DU DOM
// ===============================

document.addEventListener('DOMContentLoaded', async function() {
    // Initialiser les dates par défaut
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

    try {
        await loadData();
        populateSelect('department', simulatedData.departements);
        addOption();
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        alert('Erreur lors du chargement des données. Veuillez recharger la page.');
    }
});