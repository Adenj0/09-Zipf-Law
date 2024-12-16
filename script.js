// Fonction principale pour analyser le texte
function analyzeText() {
    // Récupérer le texte de l'utilisateur
    const inputElement = document.getElementById("inputText");
    const text = inputElement.value;
  
    // Validation : texte vide ou trop long
    if (!text.trim()) {
      alert("Veuillez entrer un texte à analyser.");
      return;
    }
    if (text.length > 100000) {
      alert("Le texte est trop long. Veuillez limiter l'analyse à 100 000 caractères.");
      return;
    }
  
    try {
      // Nettoyage du texte (suppression des caractères spéciaux, mise en minuscule)
      const cleanText = text.replace(/[^\w\s]/gi, '').toLowerCase();
  
      // Découper le texte en mots
      const words = cleanText.split(/\s+/);
  
      // Comptage des mots
      const wordFrequency = new Map();
      words.forEach(word => {
        if (word) {
          wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
        }
      });
  
      // Trier les mots par fréquence décroissante
      const sortedWords = [...wordFrequency.entries()].sort((a, b) => b[1] - a[1]);
  
      // Afficher les résultats
      displayResults(sortedWords);
    } catch (error) {
      console.error("Erreur lors de l'analyse :", error);
      alert("Une erreur est survenue lors de l'analyse. Consultez la console pour plus de détails.");
    }
  }
  
  // Fonction pour afficher les résultats dans le tableau
  function displayResults(sortedWords) {
    const tableBody = document.querySelector("#resultsTable tbody");
  
    // Effacer les anciens résultats
    tableBody.innerHTML = "";
  
    // Ajouter les nouveaux résultats
    sortedWords.forEach(([word, count]) => {
      const row = document.createElement("tr");
  
      const wordCell = document.createElement("td");
      wordCell.textContent = word;
  
      const countCell = document.createElement("td");
      countCell.textContent = count;
  
      row.appendChild(wordCell);
      row.appendChild(countCell);
      tableBody.appendChild(row);
    });
  }
  
  // Ajouter un écouteur d'événement au bouton
  document.getElementById("analyzeButton").addEventListener("click", analyzeText);
  