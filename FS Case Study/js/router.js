// SPA Router for Music App
const Router = {
    routes: {
        'home': {
            title: 'Home',
            render: renderHomePage
        },
        'search': {
            title: 'Search',
            render: renderSearchPage
        },
        'library': {
            title: 'Your Library',
            render: renderLibraryPage
        },
        'profile': {
            title: 'Profile',
            render: renderProfilePage
        }
    },
    
    currentRoute: 'home'
};

// Navigation function
function navigateTo(route) {
    if (!Router.routes[route]) {
        console.error(`Route '${route}' not found`);
        return;
    }
    
    Router.currentRoute = route;
    AppState.currentRoute = route;
    
    // Update URL without page reload
    history.pushState({ route }, '', `#${route}`);
    
    // Update page title
    document.title = `${Router.routes[route].title} - Music Player`;
    
    // Render the new page
    renderCurrentPage();
    
    // Update navigation active state
    updateNavigationState();
}

// Render current page content
function renderCurrentPage() {
    const app = document.getElementById('app');
    const route = Router.routes[Router.currentRoute];
    
    if (route && route.render) {
        // Show loading state
        AppState.isLoading = true;
        
        // Create main layout with sidebar and content area
        const layout = createMainLayout();
        app.innerHTML = layout;
        
        // Render page content
        const contentArea = document.querySelector('.content-area');
        contentArea.innerHTML = route.render();
        
        // Render bottom player
        const playerContainer = document.querySelector('.bottom-player');
        playerContainer.innerHTML = renderPlayer();
        
        // Hide loading state
        AppState.isLoading = false;
        
        // Add fade-in animation
        contentArea.classList.add('fade-in');
    }
}

// Create main app layout
function createMainLayout() {
    return `
        <div class="main-container">
            <div class="sidebar">
                ${renderNavbar()}
            </div>
            <div class="content-area">
                <!-- Page content will be injected here -->
            </div>
        </div>
        <div class="bottom-player">
            <!-- Player will be injected here -->
        </div>
    `;
}

// Update navigation active states
function updateNavigationState() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const route = item.getAttribute('data-route');
        if (route === Router.currentRoute) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Handle browser back/forward buttons
function handlePopState(event) {
    if (event.state && event.state.route) {
        Router.currentRoute = event.state.route;
        AppState.currentRoute = event.state.route;
        renderCurrentPage();
        updateNavigationState();
    }
}

// Initialize router
function initializeRouter() {
    // Handle browser navigation
    window.addEventListener('popstate', handlePopState);
    
    // Handle initial route from URL hash
    const hash = window.location.hash.slice(1);
    if (hash && Router.routes[hash]) {
        Router.currentRoute = hash;
        AppState.currentRoute = hash;
    }
    
    // Set initial history state
    history.replaceState({ route: Router.currentRoute }, '', `#${Router.currentRoute}`);
    
    // Render initial page
    renderCurrentPage();
}

// Utility function to get current route
function getCurrentRoute() {
    return Router.currentRoute;
}

// Extension points for future routing features
// TODO: Add route parameters (e.g., /playlist/:id)
// TODO: Implement route guards for authentication
// TODO: Add nested routing for complex pages
// TODO: Implement lazy loading for page components