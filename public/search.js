const searchBar = document.getElementById('search-bar');
const quoteFeed = document.getElementById('quote-feed');

// Load all quotes on page load
async function loadQuotes(query = '') {
    const res = await fetch('/api/quotes');
    const quotes = await res.json();

    // Filter by author name if query is provided
    const filteredQuotes = quotes.filter(quote =>
        quote.author.toLowerCase().includes(query.toLowerCase())
    );

    // Clear feed
    quoteFeed.innerHTML = '';

    // Render quotes
    filteredQuotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.innerHTML = `
            <p>"${quote.text}"</p>
            <p><strong>- ${quote.author}</strong></p>
        `;
        quoteFeed.appendChild(quoteCard);
    });
}

// Search as user types
searchBar.addEventListener('input', (e) => {
    loadQuotes(e.target.value);
});

// Initial load (show all quotes)
loadQuotes();
