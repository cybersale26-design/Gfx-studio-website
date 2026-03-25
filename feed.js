// feed.js

// Infinite Scroll Functionality
let page = 1;
const loadMoreContent = () => {
    // Logic to fetch more content from the server
    fetch(`/api/content?page=${page}`)
        .then(response => response.json())
        .then(data => {
            // Append new content to the feed
            const feed = document.getElementById('feed');
            data.forEach(item => {
                const newItem = document.createElement('div');
                newItem.classList.add('feed-item');
                newItem.innerHTML = item.content;
                feed.appendChild(newItem);
            });
            page++;
        });
};

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreContent();
    }
});

// Double-Tap Likes
let lastTap = 0;
const likePost = (postId) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTap < 300) {
        // Logic to like the post
        fetch(`/api/like/${postId}`, { method: 'POST' });
    }
    lastTap = currentTime;
};

// Comments Functionality
const submitComment = (postId, comment) => {
    fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ comment })
    });
};

// Sharing Functionality
const sharePost = (postId) => {
    // Assuming we have a share link prepared
    const shareLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(shareLink);
    alert('Post link copied to clipboard!');
};

// Collections Functionality
const addToCollection = (postId, collectionId) => {
    fetch(`/api/collections/${collectionId}/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ postId })
    });
};

// Event Listeners for like, comment, share, and add to collection functionality
// Documented buttons for events should be added in HTML
