const likedFeed = document.getElementById('liked-feed');

// Load liked quotes
async function loadLikedQuotes() {
    const res = await fetch('/api/quotes');
    const quotes = await res.json();

    // Filter only liked quotes
    const likedQuotes = quotes.filter(quote => quote.liked);

    // Clear feed
    likedFeed.innerHTML = '';

    // Render liked quotes
    if (likedQuotes.length === 0) {
        likedFeed.innerHTML = '<p>No liked quotes yet. Go like some!</p>';
        return;
    }

    likedQuotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.innerHTML = `
            <p>"${quote.text}"</p>
            <p><strong>- ${quote.author}</strong></p>
            <button onclick="toggleLike(${quote.id})">💔 Unlike</button>
        `;
        likedFeed.appendChild(quoteCard);
    });
}

// Toggle like/unlike
async function toggleLike(id) {
    await fetch(`/api/quotes/${id}/like`, { method: 'PUT' });
    loadLikedQuotes();
}

// Initial load
loadLikedQuotes();
