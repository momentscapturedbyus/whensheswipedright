// Custom Cursor Trail
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-trail');
    const cursors = [];
    
    // Create multiple cursor trails
    for (let i = 0; i < 5; i++) {
        const trail = cursor.cloneNode(true);
        trail.style.opacity = (5 - i) * 0.1;
        trail.style.transform = `scale(${(5 - i) * 0.2})`;
        document.body.appendChild(trail);
        cursors.push(trail);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        let x = mouseX;
        let y = mouseY;
        
        cursors.forEach((cursor, index) => {
            const nextCursor = cursors[index + 1] || cursors[0];
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
            
            // Add some randomness for sparkle effect
            if (index > 0) {
                x += (Math.random() - 0.5) * 2;
                y += (Math.random() - 0.5) * 2;
            }
        });
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
});

// Landing Page Interaction
document.addEventListener('DOMContentLoaded', function() {
    const landingPage = document.getElementById('landingPage');
    const landingContent = document.querySelector('.landing-content');
    const mainContent = document.getElementById('mainContent');
    
    // Touch and click events for landing page
    let startX = 0;
    let startY = 0;
    
    landingContent.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    landingContent.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Swipe right detection
        if (deltaX > 50 && Math.abs(deltaY) < 100) {
            transitionToMainContent();
        }
    });
    
    // Click event for desktop
    landingContent.addEventListener('click', function() {
        transitionToMainContent();
    });
    
    function transitionToMainContent() {
        landingPage.classList.add('slide-out');
        setTimeout(() => {
            landingPage.style.display = 'none';
            mainContent.style.display = 'block';
            initializeAnimations();
        }, 800);
    }
    
    // Initialize animations when main content is shown
    function initializeAnimations() {
        // Animate elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });
        
        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Animate photo frames
        const photoFrames = document.querySelectorAll('.photo-frame');
        photoFrames.forEach((frame, index) => {
            setTimeout(() => {
                frame.classList.add('scale-in');
            }, index * 200);
        });
        
        // Animate journey text
        animateJourneyText();
        
        // Animate memory words
        animateMemoryWords();
        
        // Animate photo grid
        animatePhotoGrid();
    }
    
    // Journey text animation
    function animateJourneyText() {
        const journeyText = document.getElementById('journeyText');
        const text = journeyText.textContent;
        journeyText.textContent = '';
        journeyText.style.borderRight = '2px solid #ff6b9d';
        
        let index = 0;
        function typeText() {
            if (index < text.length) {
                journeyText.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    journeyText.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(typeText, 500);
    }
    
    // Memory words animation
    function animateMemoryWords() {
        const words = document.querySelectorAll('.animated-title .word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 1000);
        });
    }
    
    // Photo grid animation
    function animatePhotoGrid() {
        const photoItems = document.querySelectorAll('.photo-item');
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = entry.target.classList.contains('rotate-left') 
                            ? 'rotate(-2deg) scale(1)' 
                            : 'rotate(2deg) scale(1)';
                    }, index * 100);
                }
            });
        });
        
        photoItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            gridObserver.observe(item);
        });
    }
});

// Floating Hearts Animation
document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.color = '#ff6b9d';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear infinite`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }
    
    // Add CSS animation for floating hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 0.3;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create hearts periodically
    setInterval(createFloatingHeart, 3000);
});

// Map Interaction
document.addEventListener('DOMContentLoaded', function() {
    const locations = document.querySelectorAll('.location');
    
    locations.forEach(location => {
        location.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            const link = this.getAttribute('data-link');
            
            // Add click animation
            this.style.transform = 'scale(1.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Show country name
            showCountryPopup(country, this);
            
            // Navigate to link (you can customize these links)
            if (link) {
                // For now, just show an alert. Replace with actual navigation
                setTimeout(() => {
                    alert(`Exploring memories from ${country}! 🌍`);
                }, 300);
            }
        });
        
        // Hover effects
        location.addEventListener('mouseenter', function() {
            const country = this.getAttribute('data-country');
            showCountryPopup(country, this);
        });
        
        location.addEventListener('mouseleave', function() {
            hideCountryPopup();
        });
    });
    
    function showCountryPopup(country, element) {
        // Remove existing popup
        hideCountryPopup();
        
        const popup = document.createElement('div');
        popup.className = 'country-popup';
        popup.textContent = country;
        popup.style.position = 'absolute';
        popup.style.background = 'rgba(0, 0, 0, 0.8)';
        popup.style.color = 'white';
        popup.style.padding = '8px 12px';
        popup.style.borderRadius = '5px';
        popup.style.fontSize = '14px';
        popup.style.pointerEvents = 'none';
        popup.style.zIndex = '1000';
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(popup);
        
        // Position popup near the location
        const rect = element.getBoundingClientRect();
        popup.style.left = rect.left + rect.width / 2 - popup.offsetWidth / 2 + 'px';
        popup.style.top = rect.top - popup.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 10);
    }
    
    function hideCountryPopup() {
        const popup = document.querySelector('.country-popup');
        if (popup) {
            popup.remove();
        }
    }
});

// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.photo-frame, .polaroid, .section-title');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'all 0.6s ease';
        scrollObserver.observe(element);
    });
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Video lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.style.opacity = '1';
                video.style.transform = 'scale(1)';
                videoObserver.unobserve(video);
            }
        });
    });
    
    videos.forEach(video => {
        video.style.opacity = '0';
        video.style.transform = 'scale(0.95)';
        video.style.transition = 'all 0.6s ease';
        videoObserver.observe(video);
    });
});

// Add sparkle effect on hover for special elements
document.addEventListener('DOMContentLoaded', function() {
    const sparkleElements = document.querySelectorAll('.photo-frame, .polaroid, .location');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 5;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '12px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
            sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
    
    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
});

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.src.includes('assets/')) {
            img.addEventListener('error', function() {
                // Fallback for missing images
                this.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
                this.style.display = 'block';
            });
        }
    });
});

// Add typing effect for story text
document.addEventListener('DOMContentLoaded', function() {
    const storyParagraphs = document.querySelectorAll('.memory-story p');
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraphs = entry.target.querySelectorAll('p');
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.style.opacity = '1';
                        p.style.transform = 'translateX(0)';
                    }, index * 500);
                });
                storyObserver.unobserve(entry.target);
            }
        });
    });
    
    const memoryStory = document.querySelector('.memory-story');
    if (memoryStory) {
        storyParagraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateX(-20px)';
            p.style.transition = 'all 0.6s ease';
        });
        storyObserver.observe(memoryStory);
    }
});