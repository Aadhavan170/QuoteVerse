const quoteList = document.getElementById('quote-list');
const quoteForm = document.getElementById('quote-form');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

// display quotes
async function loadQuotes() {
    const res = await fetch('/api/quotes');
    const quotes = await res.json();
    quoteList.innerHTML = '';
    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.innerHTML = `
            <p>"${quote.text}"</p>
            <p><strong>- ${quote.author}</strong></p>
        `;
        quoteList.appendChild(quoteCard);
    });
}



// Add new quote
quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newQuote = {
        text: quoteText.value,
        author: quoteAuthor.value
    };
    const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuote)
    });

    if (response.ok) {
        alert('Your quote was added!');
        quoteText.value = '';
        quoteAuthor.value = '';
        loadQuotes();
    } else {
        alert('Something went wrong. Please try again!');
    }

    // Initial load
loadQuotes();
});
