document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fruitSearchForm');
    const input = document.querySelector('#searchInput');
    const suggestions = document.querySelector('.suggestions ul');
    const searchResults = document.getElementById('searchResults');

    const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const fruitName = input.value.trim(); // Get the entered fruit name
        searchResults.textContent = `You searched for: ${fruitName}`;
        const results = search(fruitName);
        displayResults(results);
    });

    function search(searchTerm) {
        return fruit.filter(fruit => {
            const lowerCaseFruit = fruit.toLowerCase();
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return lowerCaseFruit.includes(lowerCaseSearchTerm);
        });
    }

    function displayResults(results) {
        suggestions.innerHTML = ''; // Clear previous suggestions
        if (results.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No suggestions available';
            suggestions.appendChild(listItem);
        } else {
            results.forEach(fruit => {
                const listItem = document.createElement('li');
                listItem.textContent = fruit;
                listItem.addEventListener('click', useSuggestion);
                listItem.addEventListener('mouseover', highlightSuggestion);
                listItem.addEventListener('mouseout', removeHighlight);
                suggestions.appendChild(listItem);
            });
        }
    }

    function useSuggestion(e) {
        const suggestionText = e.target.textContent; // Get the text content of the clicked suggestion
        input.value = suggestionText;
        suggestions.innerHTML = '';
        searchResults.textContent = `You selected: ${suggestionText}`;
    }

    function highlightSuggestion(e) {
        e.target.style.backgroundColor = '#f0f0f0';
    }

    function removeHighlight(e) {
        e.target.style.backgroundColor = '';
    }

    input.addEventListener('keyup', function(event) {
        const searchTerm = event.target.value.trim();
        const searchResults = search(searchTerm);
        displayResults(searchResults);
    });

    suggestions.addEventListener('click', useSuggestion);
});
