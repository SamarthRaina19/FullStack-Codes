// Custom SVG Icons for Music Player
const CustomIcons = {
    // Play icon with custom styling
    play: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="custom-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
        </svg>
    `,
    
    // Pause icon
    pause: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="custom-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
        </svg>
    `,
    
    // Alternative filled play icon
    playFilled: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="custom-icon">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
        </svg>
    `,
    
    // Skip previous
    skipPrevious: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="custom-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 11.25 8.689v8.122Z" />
        </svg>
    `,
    
    // Skip next
    skipNext: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="custom-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954L4.683 16.79A1.125 1.125 0 0 1 3 15.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
        </svg>
    `
};

// Function to get custom icon
function getCustomIcon(iconName, options = {}) {
    const { size = '24', className = '' } = options;
    const icon = CustomIcons[iconName];
    
    if (!icon) {
        console.warn(`Custom icon '${iconName}' not found`);
        return `<span class="material-icons">${iconName}</span>`;
    }
    
    // Add custom sizing and classes
    return icon
        .replace('class="custom-icon"', `class="custom-icon ${className}" width="${size}" height="${size}"`)
        .replace('stroke-width="1.5"', `stroke-width="${options.strokeWidth || '1.5'}"`);
}