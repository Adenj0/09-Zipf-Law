// Fonction pour afficher le graphique
function displayChart(sortedWords) {
    const labels = sortedWords.map((entry, index) => `Mot ${index + 1}`);
    const frequencies = sortedWords.map(entry => entry[1]);
  
    const ctx = document.getElementById('frequencyChart').getContext('2d');
  
    // Détruire l'ancien graphique s'il existe
    if (window.frequencyChart) {
      window.frequencyChart.destroy();
    }
  
    // Créer le nouveau graphique
    window.frequencyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Fréquence des mots',
            data: frequencies,
            borderColor: '#0078d7',
            borderWidth: 2,
            tension: 0.4, // Lissage de la courbe
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Rang des mots (log)',
            },
          },
          y: {
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Fréquence (log)',
            },
          },
        },
      },
    });
  }
  
  // Fonction pour afficher les résultats dans le tableau
  function displayResults(sortedWords) {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = ''; // Réinitialiser les anciennes données
  
    sortedWords.forEach(([word, frequency]) => {
      const row = document.createElement('tr');
      const wordCell = document.createElement('td');
      const frequencyCell = document.createElement('td');
  
      wordCell.textContent = word;
      frequencyCell.textContent = frequency;
  
      row.appendChild(wordCell);
      row.appendChild(frequencyCell);
      tableBody.appendChild(row);
    });
  }
  
  // Fonction principale pour analyser le texte
  function analyzeText() {
    const inputElement = document.getElementById('inputText');
    const text = inputElement.value;
  
    if (!text.trim()) {
      alert("Veuillez entrer un texte à analyser.");
      return;
    }
  
    const cleanText = text.replace(/[^\w\s]/gi, '').toLowerCase();
    const words = cleanText.split(/\s+/);
  
    const wordFrequency = new Map();
    words.forEach(word => {
      if (word) {
        wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
      }
    });
  
    const sortedWords = [...wordFrequency.entries()].sort((a, b) => b[1] - a[1]);
    displayChart(sortedWords); // Afficher le graphique
    displayResults(sortedWords); // Afficher le tableau
  }
  