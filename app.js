// Initialize story data
let storyData = JSON.parse(localStorage.getItem('storyData')) || [];

// Function to apply text formatting (bold, italic, underline)
function applyFormatting(style) {
    const textArea = document.getElementById('story-text');
    const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    if (selectedText) {
        let formattedText;
        if (style === 'bold') {
            formattedText = `<b>${selectedText}</b>`;
        } else if (style === 'italic') {
            formattedText = `<i>${selectedText}</i>`;
        } else if (style === 'underline') {
            formattedText = `<u>${selectedText}</u>`;
        }
        textArea.value = textArea.value.substring(0, textArea.selectionStart) + formattedText + textArea.value.substring(textArea.selectionEnd);
    }
}

// Function to render the story content
function renderStory() {
    const storyContent = document.getElementById('story-content');
    storyContent.innerHTML = ''; // Clear current content

    storyData.forEach((entry, index) => {
        const storyPart = document.createElement('div');
        storyPart.classList.add('story-part');
        storyPart.style.backgroundColor = entry.color || '#f0f0f0'; // Apply unique background color per user
        storyPart.innerHTML = `
            <div class="username">${entry.username}</div>
            <div class="contribution">${entry.content}</div>
        `;
        storyContent.appendChild(storyPart);
    });
}

// Event listener for form submission
document.getElementById('story-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const storyText = document.getElementById('story-text').value.trim();

    if (!username || !storyText) {
        alert("Please enter your name and a part of the story.");
        return;
    }

    const newStoryEntry = {
        username: username,
        content: storyText,
        timestamp: new Date().toISOString(),
        color: getRandomColor()
    };

    storyData.push(newStoryEntry);

    // Save to localStorage
    localStorage.setItem('storyData', JSON.stringify(storyData));

    // Clear the form
    document.getElementById('username').value = '';
    document.getElementById('story-text').value = '';

    // Re-render the story
    renderStory();
});

// Function to generate a random color for each user
function getRandomColor() {
    const colors = ['#FFB6C1', '#FF7F50', '#FFD700', '#ADFF2F', '#8A2BE2', '#7FFF00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initial render of the story
renderStory();