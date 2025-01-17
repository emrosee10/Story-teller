document.getElementById('preview-btn').addEventListener('click', function () {
  document.getElementById('story-builder').classList.add('hidden');
  document.getElementById('preview-area').classList.remove('hidden');
});

document.getElementById('back-btn').addEventListener('click', function () {
  document.getElementById('preview-area').classList.add('hidden');
  document.getElementById('story-builder').classList.remove('hidden');
});
