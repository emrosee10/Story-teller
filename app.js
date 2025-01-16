let storyData = JSON.parse(localStorage.getItem('storyData')) || [];

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

function renderStory() {
    const storyContent = document.getElementById('story-content');
    storyContent.innerHTML = '';
    storyData.forEach((entry, index) => {
        const storyPart = document.createElement('div');
        storyPart.classList.add('story-part');
        storyPart.style.backgroundColor = entry.color || '#f0f0f0';
        storyPart.innerHTML = `
            <div class="username">${entry.username}</div>
            <div class="contribution">${entry.content}</div>
            <div class="like-dislike-buttons">
                <button class="like-button" onclick="voteOnStory(${index}, 'like')">Like</button>
                <button class="dislike-button" onclick="voteOnStory(${index}, 'dislike')">Dislike</button>
                <span class="like-count">${entry.likes} Likes</span>
                <span class="dislike-count">${entry.dislikes} Dislikes</span>
            </div>
        `;
        storyContent.appendChild(storyPart);
    });
}

function voteOnStory(index, type) {
    if (type === 'like') {
        storyData[index].likes++;
    } else if (type === 'dislike') {
        storyData[index].dislikes++;
    }

    localStorage.setItem('storyData', JSON.stringify(storyData));
    renderStory();
}

document.getElementById('story-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const storyText = document.getElementById('story-text').value.trim();
    const imageUpload = document.getElementById('image-upload').files[0];

    if (!username || !storyText) {
        alert("Please enter your name and a part of the story.");
        return;
    }

    const readerImage = imageUpload ? URL.createObjectURL(imageUpload) : '';
    const newStoryEntry = {
        username: username,
        content: storyText,
        likes: 0,
        dislikes: 0,
        image: readerImage,
        color: getRandomColor()
    };

    storyData.push(newStoryEntry);
    localStorage.setItem('storyData', JSON.stringify(storyData));

    document.getElementById('add-button').disabled = true;  // Disable the button
    document.getElementById('rights-info').style.display = 'block';  // Show rights info

    renderStory();
});

function getRandomColor() {
    const colors = ['#FFB6C1', '#FF7F50', '#FFD700', '#ADFF2F', '#8A2BE2', '#7FFF00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

renderStory();
