// Loading and Skeleton UI Components
function renderLoader(type = 'spinner', message = 'Loading...') {
    switch (type) {
        case 'spinner':
            return renderSpinnerLoader(message);
        case 'skeleton':
            return renderSkeletonLoader();
        case 'dots':
            return renderDotsLoader(message);
        default:
            return renderSpinnerLoader(message);
    }
}

function renderSpinnerLoader(message) {
    return `
        <div class="loader-container d-flex flex-column align-items-center justify-content-center py-5">
            <div class="spinner-border text-success mb-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="text-muted">${message}</div>
        </div>
    `;
}

function renderDotsLoader(message) {
    return `
        <div class="loader-container d-flex flex-column align-items-center justify-content-center py-5">
            <div class="dots-loader mb-3">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="text-muted">${message}</div>
        </div>
    `;
}

// Skeleton loading for music cards
function renderSkeletonLoader(count = 6) {
    return `
        <div class="skeleton-container">
            <div class="row g-3">
                ${Array(count).fill(0).map(() => `
                    <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div class="skeleton-card skeleton">
                            <div class="skeleton-album-art skeleton mb-3"></div>
                            <div class="skeleton-text skeleton mb-2" style="width: 80%;"></div>
                            <div class="skeleton-text skeleton" style="width: 60%;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Skeleton loading for list view
function renderSkeletonList(count = 8) {
    return `
        <div class="skeleton-list">
            ${Array(count).fill(0).map(() => `
                <div class="d-flex align-items-center p-3 mb-2">
                    <div class="skeleton-album-art-small skeleton me-3"></div>
                    <div class="flex-grow-1">
                        <div class="skeleton-text skeleton mb-2" style="width: 70%;"></div>
                        <div class="skeleton-text skeleton" style="width: 50%;"></div>
                    </div>
                    <div class="skeleton-text skeleton" style="width: 60px;"></div>
                </div>
            `).join('')}
        </div>
    `;
}

// Skeleton loading for player
function renderSkeletonPlayer() {
    return `
        <div class="skeleton-player d-flex align-items-center h-100 px-3">
            <div class="d-flex align-items-center" style="min-width: 200px;">
                <div class="skeleton-album-art-player skeleton me-3"></div>
                <div>
                    <div class="skeleton-text skeleton mb-1" style="width: 120px;"></div>
                    <div class="skeleton-text skeleton" style="width: 80px;"></div>
                </div>
            </div>
            
            <div class="flex-grow-1 d-flex justify-content-center">
                <div class="d-flex gap-3">
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-button-large skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                    <div class="skeleton-button skeleton"></div>
                </div>
            </div>
            
            <div class="d-flex align-items-center" style="min-width: 200px; justify-content: flex-end;">
                <div class="skeleton-button skeleton me-2"></div>
                <div class="skeleton-progress skeleton" style="width: 80px;"></div>
            </div>
        </div>
    `;
}

// Loading overlay for entire app
function renderLoadingOverlay(message = 'Loading...') {
    return `
        <div class="loading-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style="background-color: rgba(0, 0, 0, 0.8); z-index: 9999;">
            <div class="text-center">
                <div class="spinner-border text-success mb-3" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h5 class="text-light">${message}</h5>
            </div>
        </div>
    `;
}

// Progress indicator for operations
function renderProgressIndicator(progress = 0, message = 'Processing...') {
    return `
        <div class="progress-indicator">
            <div class="text-center mb-3">
                <h6>${message}</h6>
            </div>
            <div class="progress mb-2" style="height: 8px;">
                <div class="progress-bar bg-success" 
                     role="progressbar" 
                     style="width: ${progress}%" 
                     aria-valuenow="${progress}" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                </div>
            </div>
            <div class="text-center text-muted small">
                ${Math.round(progress)}% complete
            </div>
        </div>
    `;
}

// Utility functions for showing/hiding loaders
function showLoader(containerId, type = 'spinner', message = 'Loading...') {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = renderLoader(type, message);
        container.classList.add('loading');
    }
}

function hideLoader(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.classList.remove('loading');
    }
}

function showLoadingOverlay(message = 'Loading...') {
    // Remove existing overlay if present
    const existingOverlay = document.querySelector('.loading-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Add new overlay
    const overlay = document.createElement('div');
    overlay.innerHTML = renderLoadingOverlay(message);
    document.body.appendChild(overlay.firstElementChild);
}

function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Extension points for loading states
// TODO: Add animated music note icons for music-specific loading
// TODO: Implement progressive loading with percentage indicators
// TODO: Add custom loading animations for different content types
// TODO: Implement smart loading states based on connection speed