// Course filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    const courseCards = document.querySelectorAll('.course-card-detailed');
    
    // Add click event listeners to category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Filter courses
            filterCourses(category);
        });
    });
    
    // Filter courses function
    function filterCourses(category) {
        courseCards.forEach(card => {
            const courseCategory = card.getAttribute('data-category');
            
            if (category === 'all' || courseCategory === category) {
                card.style.display = 'block';
                // Add animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Course card hover effects
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enroll button functionality
    const enrollButtons = document.querySelectorAll('.course-actions .btn-primary');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseTitle = this.closest('.course-card-detailed').querySelector('h3').textContent;
            showEnrollmentModal(courseTitle);
        });
    });
    
    // Preview button functionality
    const previewButtons = document.querySelectorAll('.course-actions .btn-secondary');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseTitle = this.closest('.course-card-detailed').querySelector('h3').textContent;
            showPreviewModal(courseTitle);
        });
    });
});

// Show enrollment modal
function showEnrollmentModal(courseTitle) {
    const modal = createModal('Course Enrollment', `
        <div class="enrollment-content">
            <h3>Enroll in: ${courseTitle}</h3>
            <p>Thank you for your interest in this course! Please fill out the form below to get started.</p>
            <form class="enrollment-form">
                <div class="form-group">
                    <label for="student-name">Full Name</label>
                    <input type="text" id="student-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="student-email">Email Address</label>
                    <input type="email" id="student-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="student-phone">Phone Number</label>
                    <input type="tel" id="student-phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="experience-level">Experience Level</label>
                    <select id="experience-level" name="experience" required>
                        <option value="">Select your level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="motivation">Why do you want to take this course?</label>
                    <textarea id="motivation" name="motivation" rows="4"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Enroll Now</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `);
    
    // Handle form submission
    const form = modal.querySelector('.enrollment-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Simulate enrollment process
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            closeModal();
            showNotification(`Thank you ${name}! Your enrollment request has been submitted. We'll contact you at ${email} with next steps.`, 'success');
        }, 2000);
    });
}

// Show preview modal
function showPreviewModal(courseTitle) {
    const modal = createModal('Course Preview', `
        <div class="preview-content">
            <h3>${courseTitle} - Course Preview</h3>
            <div class="preview-video">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Course Introduction Video</p>
                    <span>Click to watch preview</span>
                </div>
            </div>
            <div class="preview-details">
                <h4>What you'll learn:</h4>
                <ul>
                    <li>Fundamental concepts and principles</li>
                    <li>Practical applications and examples</li>
                    <li>Problem-solving techniques</li>
                    <li>Real-world case studies</li>
                </ul>
                <h4>Course Structure:</h4>
                <div class="course-modules">
                    <div class="module">
                        <h5>Module 1: Introduction</h5>
                        <p>Basic concepts and overview</p>
                    </div>
                    <div class="module">
                        <h5>Module 2: Core Principles</h5>
                        <p>Fundamental principles and theories</p>
                    </div>
                    <div class="module">
                        <h5>Module 3: Applications</h5>
                        <p>Practical applications and examples</p>
                    </div>
                </div>
            </div>
            <div class="preview-actions">
                <button class="btn btn-primary" onclick="closeModal(); showEnrollmentModal('${courseTitle}')">Enroll Now</button>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `);
    
    // Add click event to video placeholder
    const videoPlaceholder = modal.querySelector('.video-placeholder');
    videoPlaceholder.addEventListener('click', function() {
        this.innerHTML = '<p>Video preview would play here</p>';
        this.style.background = '#000';
    });
}

// Create modal function
function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Add styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-container {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal-overlay.active {
            opacity: 1;
        }
        
        .modal-overlay.active .modal-container {
            transform: scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-header h2 {
            margin: 0;
            color: #1f2937;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }
        
        .modal-close:hover {
            background: #f3f4f6;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .enrollment-content h3,
        .preview-content h3 {
            margin-bottom: 1rem;
            color: #1f2937;
        }
        
        .enrollment-content p,
        .preview-content p {
            margin-bottom: 1.5rem;
            color: #6b7280;
            line-height: 1.6;
        }
        
        .enrollment-form .form-group {
            margin-bottom: 1.5rem;
        }
        
        .enrollment-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #1f2937;
        }
        
        .enrollment-form input,
        .enrollment-form select,
        .enrollment-form textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .enrollment-form input:focus,
        .enrollment-form select:focus,
        .enrollment-form textarea:focus {
            outline: none;
            border-color: #2563eb;
        }
        
        .form-actions,
        .preview-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .form-actions .btn,
        .preview-actions .btn {
            flex: 1;
            justify-content: center;
        }
        
        .preview-video {
            margin-bottom: 2rem;
        }
        
        .preview-video .video-placeholder {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .preview-video .video-placeholder:hover {
            transform: scale(1.02);
        }
        
        .preview-video .video-placeholder i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .preview-video .video-placeholder p {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .preview-video .video-placeholder span {
            font-size: 0.875rem;
            opacity: 0.8;
        }
        
        .preview-details h4 {
            margin-bottom: 1rem;
            color: #1f2937;
        }
        
        .preview-details ul {
            margin-bottom: 2rem;
            padding-left: 1.5rem;
        }
        
        .preview-details li {
            margin-bottom: 0.5rem;
            color: #6b7280;
        }
        
        .course-modules {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .module {
            padding: 1rem;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        
        .module h5 {
            margin-bottom: 0.5rem;
            color: #1f2937;
        }
        
        .module p {
            margin: 0;
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
            .modal-container {
                width: 95%;
                margin: 1rem;
            }
            
            .modal-header,
            .modal-body {
                padding: 1.5rem;
            }
            
            .form-actions,
            .preview-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(overlay);
    
    // Show modal with animation
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // Close modal when clicking overlay
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    return overlay;
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Learning path step animation
document.addEventListener('DOMContentLoaded', function() {
    const pathSteps = document.querySelectorAll('.path-step');
    
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    pathSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        step.style.transition = 'all 0.6s ease';
        pathObserver.observe(step);
    });
});

// YouTube stats counter animation
document.addEventListener('DOMContentLoaded', function() {
    const youtubeStats = document.querySelectorAll('.youtube-stats .stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateNumber(target, finalValue);
            }
        });
    }, { threshold: 0.5 });
    
    youtubeStats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Animate number function
function animateNumber(element, finalValue) {
    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
    const suffix = finalValue.replace(/[0-9]/g, '');
    let currentValue = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue) + suffix;
    }, 50);
}

// Course search functionality (bonus feature)
function addSearchFunctionality() {
    const searchContainer = document.querySelector('.section-header');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search courses...';
    searchInput.className = 'course-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 16px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        margin-top: 1rem;
        transition: border-color 0.3s;
    `;
    
    searchContainer.appendChild(searchInput);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card-detailed');
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const topics = Array.from(card.querySelectorAll('.topic')).map(topic => topic.textContent.toLowerCase());
            
            const isMatch = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          topics.some(topic => topic.includes(searchTerm));
            
            if (isMatch || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});