let storyData = JSON.parse(localStorage.getItem('storyData')) || [];

function renderStory() {
    const storyContent = document.getElementById('story-content');
    storyContent.innerHTML = '';
    storyData.forEach(entry => {
        const storyPart = document.createElement('div');
        storyPart.classList.add('story-part');
        storyPart.innerHTML = `
            <div class="username">${entry.username}</div>
            <div class="content">${entry.content}</div>
        `;
        storyContent.appendChild(storyPart);
    });
}

document.getElementById('story-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const storyText = document.getElementById('story-text').value.trim();
    const imageUpload = document.getElementById('image-upload').files[0];

    if (!username || !storyText) {
        alert("Please enter both your name and a part of the story.");
        return;
    }

    const readerImage = imageUpload ? URL.createObjectURL(imageUpload) : '';
    const newStoryEntry = {
        username: username,
        content: storyText,
        image: readerImage,
    };

    storyData.push(newStoryEntry);
    localStorage.setItem('storyData', JSON.stringify(storyData));

    renderStory();
});

renderStory();
