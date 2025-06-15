function goBack() {
  history.back();
}

function goPrev() {
 history.forward();
}

function refresh(){
    window.location.reload()
}


// Fonction pour vérifier si l'historique arrière est vide
function checkBackHistory() {
  // Vérifier si l'utilisateur a navigué (a un historique arrière)
  if (window.history.state !== null || window.history.length > 1) {
    // Active le bouton si l'historique contient des pages
    document.getElementById('backButton').classList.remove('disabled');
    document.getElementById('backButton').onclick = function() {
      history.back();
    };
  } else {
    // Garde le bouton désactivé si l'historique est vide
    document.getElementById('backButton').classList.add('disabled');
    document.getElementById('backButton').onclick = function(e) {
      e.preventDefault();
      return false;
    };
  }
}

// Initialiser le bouton comme désactivé au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  // Désactiver le bouton par défaut
  document.getElementById('backButton').classList.add('disabled');
  
  // Puis vérifier l'historique
  checkBackHistory();
});

// Vérifier aussi quand l'utilisateur navigue
window.addEventListener('popstate', checkBackHistory);


// Exécuter au chargement de la page
window.addEventListener('load', checkBackHistory);
// Vérifier aussi quand l'utilisateur navigue
window.addEventListener('popstate', checkBackHistory);



   const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.startsWith('fr') ? 'fr' : 'en';

  function updateClock() {
    const now = new Date();

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: lang === 'fr' ? '2-digit' : 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: lang === 'en' // 12h format for English, 24h for French
    };

    let dateString = now.toLocaleDateString(lang, options);
    let timeString = now.toLocaleTimeString(lang, options);

    let fullDateTime;

    if (lang === 'fr') {
  
      const dayName = now.toLocaleDateString('fr-FR', { weekday: 'long' });
      const datePart = now.toLocaleDateString('fr-FR');
      const timePart = now.toLocaleTimeString('fr-FR', { hour12: false });
      fullDateTime = `${dayName}, le ${datePart} ${timePart}`;
    } else {
    
      const datePart = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const timePart = now.toLocaleTimeString('en-US', { hour12: true });
      fullDateTime = `${datePart} ${timePart}`;
    }

    document.getElementById('clock').textContent = fullDateTime;
  }

  // Lancer l'horloge
  updateClock();
  setInterval(updateClock, 1000);



// Éléments DOM pour l'interface de chargement
const loadingBar = document.getElementById('loadingBar');
const overlay = document.getElementById('loadingOverlay');

// Variables pour le suivi des ressources
let resourcesLoaded = 0;
let resourcesTotal = 0;
let isPageTransition = false;

// Observer pour suivre le chargement des ressources
const observer = new PerformanceObserver((list) => {
  resourcesLoaded++;
  const progress = Math.min(Math.round((resourcesLoaded / resourcesTotal) * 100), 99);
  loadingBar.style.width = progress + "%";
});

// Fonction pour afficher l'overlay de chargement sans masquer le contenu
function showLoadingOverlay() {
  // Réinitialiser
  resourcesLoaded = 0;
  loadingBar.style.width = "0%";
  
  // Afficher l'overlay avec un style approprié
  overlay.style.display = "block";
  overlay.style.pointerEvents = "all"; // Bloquer les interactions
}

// Initialiser le compteur de ressources au chargement initial
document.addEventListener('DOMContentLoaded', () => {
  // Compter les ressources principales
  const resources = document.querySelectorAll('img, script, link[rel="stylesheet"], video, iframe');
  resourcesTotal = Math.max(resources.length, 1); // Au moins 1 ressource
  
  // Démarrer l'observation
  observer.observe({ entryTypes: ['resource'] });
});

// Quand le chargement initial est terminé
window.addEventListener('load', () => {
  if (!isPageTransition) {
    // Fin du chargement initial
    loadingBar.style.width = "100%";
    
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);
  }
});

// Intercepter les clics sur les liens
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach(link => {
    // Exclure les liens internes/ancres ou liens externes si nécessaire
    if (link.getAttribute('href') && !link.getAttribute('href').startsWith('#') && 
        !link.getAttribute('target') === '_blank') {
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        isPageTransition = true;
        
        // Afficher l'overlay de chargement
        showLoadingOverlay();
        
        // Précharger la page de destination
        const xhr = new XMLHttpRequest();
        xhr.open('GET', href, true);
        
        xhr.onprogress = function(e) {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            loadingBar.style.width = percentComplete + "%";
          }
        };
        
        xhr.onload = function() {
          // Une fois le chargement terminé
          loadingBar.style.width = "100%";
          
          // Petit délai avant la redirection
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        };
        
        xhr.onerror = function() {
          // En cas d'erreur, rediriger quand même
          window.location.href = href;
        };
        
        xhr.send();
      });
    }
  });
});


  document.addEventListener('DOMContentLoaded', function() {
            initMenu();
            initThemeSwitch();
            generateFontMenu();
            initFontSwitch();
            generateSoundMenu();
            initSoundToggle();

        });

        // Initialisation des interactions du menu
        function initMenu() {
            // Gérer l'affichage des sous-menus
            const menuItems = document.querySelectorAll('ul.menu li');
            
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Si l'élément a un sous-menu
                    const subMenu = this.querySelector('ul');
                    if (subMenu) {
                        e.stopPropagation(); // Empêcher la propagation aux éléments parents
                        
                        // Vérifier si c'est un élément désactivé
                        if (this.classList.contains('disabled')) {
                            return; // Ne rien faire si l'élément est désactivé
                        }
                        
                        // Basculer la classe 'open' pour afficher/masquer le sous-menu
                        this.classList.toggle('open');
                    }
                });
            });
            
            // Fermer les sous-menus lorsqu'on clique ailleurs dans la page
            document.addEventListener('click', function(e) {
                if (!e.target.closest('ul.menu')) {
                    const openMenus = document.querySelectorAll('ul.menu li.open');
                    openMenus.forEach(menu => {
                        menu.classList.remove('open');
                    });
                }
            });
        }

        // Initialisation de la gestion des thèmes
        function initThemeSwitch() {
            // Utiliser querySelectorAll avec filter pour trouver les éléments de thème
            const themeItems = Array.from(document.querySelectorAll('ul.menu li ul li ul li')).filter(item => 
                item.textContent.includes('Système') || 
                item.textContent.includes('Light') || 
                item.textContent.includes('Dark')
            );
            
            // Définir le thème initial (stocké ou système)
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                applyTheme(savedTheme);
            } else {
                // Appliquer le thème système par défaut
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    applyTheme('dark');
                } else {
                    applyTheme('light');
                }
            }
            
            // Ajouter les écouteurs d'événements pour les options de thème
            themeItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Récupérer le nom du thème à partir du texte de l'élément
                    let themeName = this.textContent.trim().toLowerCase();
                    
                    // Gérer le cas "Système"
                    if (themeName === 'système') {
                        themeName = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                        localStorage.removeItem('theme'); // Supprimer le thème sauvegardé pour suivre le système
                    } else {
                        localStorage.setItem('theme', themeName);
                    }
                    
                    applyTheme(themeName);
                    
                    // Fermer le menu après la sélection
                    const openMenus = document.querySelectorAll('ul.menu li.open');
                    openMenus.forEach(menu => {
                        menu.classList.remove('open');
                    });
                });
            });
            
            // Écouter les changements de thème du système
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                    if (!localStorage.getItem('theme')) {
                        // Suivre le thème du système uniquement si aucun thème n'est explicitement défini
                        applyTheme(e.matches ? 'dark' : 'light');
                    }
                });
            }
        }

        // Fonction pour appliquer le thème
        function applyTheme(theme) {
            // Appliquer la classe de thème
            if (theme === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            
            // Mettre à jour l'état "coché" dans le menu
            updateSelectedTheme(theme);
        }

        // Fonction pour mettre à jour l'affichage du thème sélectionné
        function updateSelectedTheme(theme) {
            // Récupérer tous les éléments de thème
            const themeItems = Array.from(document.querySelectorAll('ul.menu li ul li ul li')).filter(item => 
                item.textContent.includes('Système') || 
                item.textContent.includes('Light') || 
                item.textContent.includes('Dark')
            );
            
            // Supprimer la classe "selected" de tous les éléments
            themeItems.forEach(item => {
                item.classList.remove('selected');
            });
            
            // Ajouter la classe "selected" à l'élément correspondant au thème actif
            let selectedTheme;
            if (!localStorage.getItem('theme')) {
                // Si mode système
                selectedTheme = themeItems.find(item => item.textContent.includes('Système'));
            } else if (theme === 'dark') {
                selectedTheme = themeItems.find(item => item.textContent.includes('Dark'));
            } else {
                selectedTheme = themeItems.find(item => item.textContent.includes('Light'));
            }
            
            if (selectedTheme) {
                selectedTheme.classList.add('selected');
            }
        }

            const availableFonts = {
                "Century": "century, sans-serif",
                "Arial": "Arial, sans-serif",
                "Verdana": "Verdana, sans-serif",
                "Times New Roman": "'Times New Roman', serif",
                "Courier New": "'Courier New', monospace",
                "Georgia": "Georgia, serif",
                "Tahoma": "Tahoma, sans-serif",
                "Bahnschrift": " Bahnschrift", 
                "Calibri": "Calibri, sans-serif", 
                "Segoe UI": "Segoe UI, sans-serif", 
                "Impact": "Impact, sans-serif", 
                "Candara": "Candara, sans-serif", 
                "Impact": "Impact, sans-serif", 
            };


                function generateFontMenu() {
                    const fontMenuParent = Array.from(document.querySelectorAll('ul.menu li')).find(li => {
                        const span = li.querySelector('span');
                        return span && span.textContent.trim().toLowerCase() === 'police';
                    });

                    if (!fontMenuParent) return;

                    const fontSubmenu = fontMenuParent.querySelector('ul');
                    fontSubmenu.innerHTML = ''; // Vider d'abord le sous-menu au cas où

                    for (const [label, fontValue] of Object.entries(availableFonts)) {
                        const li = document.createElement('li');
                        li.textContent = label;
                        li.style.fontFamily = fontValue; // prévisualisation dans le menu
                        fontSubmenu.appendChild(li);
                    }
                }


            function initFontSwitch() {
                const savedFont = localStorage.getItem('font');
                const currentFont = savedFont && availableFonts[savedFont] ? savedFont : 'Arial';

                applyFont(currentFont);
                updateSelectedFont(currentFont);

                const fontItems = Array.from(document.querySelectorAll('ul.menu li ul li')).filter(item =>
                    Object.keys(availableFonts).includes(item.textContent.trim())
                );

                fontItems.forEach(item => {
                    item.addEventListener('click', function (e) {
                        e.stopPropagation();

                        const fontName = this.textContent.trim();
                        if (!availableFonts[fontName]) return;

                        localStorage.setItem('font', fontName);
                        applyFont(fontName);
                        updateSelectedFont(fontName);

                        // Fermer les menus ouverts
                        document.querySelectorAll('ul.menu li.open').forEach(menu => {
                            menu.classList.remove('open');
                        });
                    });
                });
            }

            function applyFont(fontName) {
                document.body.style.fontFamily = availableFonts[fontName] || 'Arial, sans-serif';
            }

            function updateSelectedFont(selectedFont) {
                const fontItems = Array.from(document.querySelectorAll('ul.menu li ul li')).filter(item =>
                    Object.keys(availableFonts).includes(item.textContent.trim())
                );

                fontItems.forEach(item => item.classList.remove('selected'));

                const match = fontItems.find(item => item.textContent.trim() === selectedFont);
                if (match) {
                    match.classList.add('selected');
                }
            }


            function generateSoundMenu() {
                const soundOptions = ['Activé', 'Désactivé'];

                const soundMenuParent = Array.from(document.querySelectorAll('ul.menu li')).find(li => {
                    const span = li.querySelector('span');
                    return span && span.textContent.trim().toLowerCase() === 'son';
                });

                if (!soundMenuParent) return;

                const submenu = soundMenuParent.querySelector('ul');
                submenu.innerHTML = '';

                soundOptions.forEach(option => {
                    const li = document.createElement('li');
                    li.textContent = option;
                    submenu.appendChild(li);
                });
            }


            function initSoundToggle() {
                const soundItems = Array.from(document.querySelectorAll('ul.menu li ul li')).filter(item =>
                    item.textContent.trim() === 'Activé' || item.textContent.trim() === 'Désactivé'
                );

                const savedSound = localStorage.getItem('sound') || 'on';
                applySoundSetting(savedSound);
                updateSelectedSound(savedSound);

                soundItems.forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const soundChoice = this.textContent.trim() === 'Désactivé' ? 'off' : 'on';
                        localStorage.setItem('sound', soundChoice);
                        applySoundSetting(soundChoice);
                        updateSelectedSound(soundChoice);

                        document.querySelectorAll('ul.menu li.open').forEach(menu => {
                            menu.classList.remove('open');
                        });
                    });
                });
            }

            function applySoundSetting(soundChoice) {
            window.soundEnabled = (soundChoice === 'on');
             }


            function updateSelectedSound(choice) {
                const soundItems = Array.from(document.querySelectorAll('ul.menu li ul li')).filter(item =>
                    item.textContent.trim() === 'Activé' || item.textContent.trim() === 'Désactivé'
                );

                soundItems.forEach(item => item.classList.remove('selected'));

                const selectedItem = soundItems.find(item => {
                    return (choice === 'on' && item.textContent.trim() === 'Activé') ||
                        (choice === 'off' && item.textContent.trim() === 'Désactivé');
                });

                if (selectedItem) {
                    selectedItem.classList.add('selected');
                }
            }
feather.replace();

      const notyf = new Notyf({
      duration: 5000,
      dismissible: true,
      position: {
        x: 'left',
        y: 'bottom'
      },
      types: [
        {
          type: 'success',
          background: '#28a745',
      
        },
        {
          type: 'error',
          background: '#dc3545',
        },
        {
          type: 'warning',
          background: '#ffc107',
          icon: {
            tagName: 'i',
            className: 'feather-icon',
            text: '',
          }
        },
        {
          type: 'info',
          background: '#17a2b8',
          icon: {
            tagName: 'i',
            className: 'feather-icon',
            text: '',
          }
        }
      ]
    });


      function load(button) {
    button.classList.add('loader__btn');

    button.innerHTML = '';
    const loader = document.createElement('div');
    loader.classList.add('loader');


    const span = document.createElement('span');
    span.textContent = 'Loading ...';

 
    button.appendChild(loader);
    button.appendChild(span);

    button.disabled
    button.style.opacity='0.7'
  }