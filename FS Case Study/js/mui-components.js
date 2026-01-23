// MUI-Inspired Components for Music Player
// These components mimic Material-UI styling and behavior

// MUI-style Button Component
function MuiButton(props = {}) {
    const {
        variant = 'text',
        color = 'primary',
        size = 'medium',
        startIcon = '',
        endIcon = '',
        onClick = '',
        disabled = false,
        children = '',
        className = ''
    } = props;
    
    const baseClass = 'mui-button';
    const variantClass = variant !== 'text' ? `mui-button-${variant}` : '';
    const sizeClass = size !== 'medium' ? `mui-button-${size}` : '';
    const disabledClass = disabled ? 'mui-button-disabled' : '';
    
    return `
        <button class="${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}"
                ${onClick ? `onclick="${onClick}"` : ''}
                ${disabled ? 'disabled' : ''}>
            ${startIcon ? `<span class="mui-button-start-icon">${startIcon}</span>` : ''}
            <span class="mui-button-label">${children}</span>
            ${endIcon ? `<span class="mui-button-end-icon">${endIcon}</span>` : ''}
        </button>
    `;
}

// MUI-style Floating Action Button
function MuiFab(props = {}) {
    const {
        color = 'primary',
        size = 'medium',
        onClick = '',
        children = '',
        className = ''
    } = props;
    
    const baseClass = 'mui-fab mui-button';
    const sizeClass = size !== 'medium' ? `mui-fab-${size}` : '';
    
    return `
        <button class="${baseClass} ${sizeClass} ${className}"
                ${onClick ? `onclick="${onClick}"` : ''}>
            ${children}
        </button>
    `;
}

// MUI-style Card Component
function MuiCard(props = {}) {
    const {
        elevation = 1,
        className = '',
        children = '',
        onClick = ''
    } = props;
    
    const baseClass = 'mui-card';
    const elevationClass = `mui-paper-elevation-${elevation}`;
    const clickableClass = onClick ? 'mui-card-clickable' : '';
    
    return `
        <div class="${baseClass} ${elevationClass} ${clickableClass} ${className}"
             ${onClick ? `onclick="${onClick}"` : ''}>
            ${children}
        </div>
    `;
}

// MUI-style Card Content
function MuiCardContent(props = {}) {
    const { className = '', children = '' } = props;
    
    return `
        <div class="mui-card-content ${className}">
            ${children}
        </div>
    `;
}

// MUI-style Chip Component
function MuiChip(props = {}) {
    const {
        label = '',
        variant = 'filled',
        color = 'default',
        size = 'medium',
        onClick = '',
        onDelete = '',
        icon = '',
        deleteIcon = '',
        className = ''
    } = props;
    
    const baseClass = 'mui-chip';
    const clickableClass = onClick ? 'mui-chip-clickable' : '';
    const variantClass = variant !== 'filled' ? `mui-chip-${variant}` : '';
    const sizeClass = size !== 'medium' ? `mui-chip-${size}` : '';
    
    return `
        <div class="${baseClass} ${clickableClass} ${variantClass} ${sizeClass} ${className}"
             ${onClick ? `onclick="${onClick}"` : ''}>
            ${icon ? `<span class="mui-chip-icon">${icon}</span>` : ''}
            <span class="mui-chip-label">${label}</span>
            ${onDelete ? `<span class="mui-chip-delete" onclick="${onDelete}">${deleteIcon || '×'}</span>` : ''}
        </div>
    `;
}

// MUI-style Avatar Component
function MuiAvatar(props = {}) {
    const {
        src = '',
        alt = '',
        children = '',
        variant = 'circular',
        size = 'medium',
        className = ''
    } = props;
    
    const baseClass = 'mui-avatar';
    const variantClass = variant !== 'circular' ? `mui-avatar-${variant}` : '';
    const sizeClass = size !== 'medium' ? `mui-avatar-${size}` : '';
    
    if (src) {
        return `
            <div class="${baseClass} ${variantClass} ${sizeClass} ${className}">
                <img src="${src}" alt="${alt}" class="mui-avatar-img">
            </div>
        `;
    }
    
    return `
        <div class="${baseClass} ${variantClass} ${sizeClass} ${className}">
            ${children}
        </div>
    `;
}

// MUI-style List Item Component
function MuiListItem(props = {}) {
    const {
        button = false,
        onClick = '',
        children = '',
        className = ''
    } = props;
    
    const baseClass = 'mui-list-item';
    const buttonClass = button ? 'mui-list-item-button' : '';
    
    return `
        <div class="${baseClass} ${buttonClass} ${className}"
             ${onClick ? `onclick="${onClick}"` : ''}>
            ${children}
        </div>
    `;
}

// MUI-style Typography Component
function MuiTypography(props = {}) {
    const {
        variant = 'body1',
        component = 'p',
        children = '',
        className = ''
    } = props;
    
    const baseClass = `mui-typography-${variant}`;
    
    return `
        <${component} class="${baseClass} ${className}">
            ${children}
        </${component}>
    `;
}

// MUI-style Progress/Slider Component
function MuiSlider(props = {}) {
    const {
        value = 0,
        min = 0,
        max = 100,
        step = 1,
        onChange = '',
        className = ''
    } = props;
    
    const percentage = ((value - min) / (max - min)) * 100;
    
    return `
        <div class="mui-slider ${className}">
            <span class="mui-slider-rail"></span>
            <span class="mui-slider-track" style="width: ${percentage}%"></span>
            <span class="mui-slider-thumb" style="left: ${percentage}%"></span>
            <input type="range" 
                   min="${min}" 
                   max="${max}" 
                   step="${step}" 
                   value="${value}"
                   ${onChange ? `onchange="${onChange}"` : ''}
                   style="opacity: 0; position: absolute; width: 100%; height: 100%; cursor: pointer;">
        </div>
    `;
}

// Enhanced Music Card with MUI styling
function MuiMusicCard(song, options = {}) {
    const { showArtist = true, showAlbum = false } = options;
    
    return MuiCard({
        elevation: 2,
        className: 'music-card mui-style',
        onClick: `playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})`,
        children: `
            <div class="album-art">
                ${song.albumArt ? 
                    `<img src="${song.albumArt}" alt="${song.album}" class="w-100 h-100 object-fit-cover">` :
                    `<span class="material-icon" style="font-size: 48px;">music_note</span>`
                }
                <div class="play-overlay">
                    ${MuiFab({
                        size: 'small',
                        onClick: `event.stopPropagation(); playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})`,
                        children: getCustomIcon('playFilled', { size: '16', className: 'text-white' })
                    })}
                </div>
            </div>
            
            ${MuiCardContent({
                children: `
                    ${MuiTypography({
                        variant: 'h6',
                        children: truncateText(song.title, 20)
                    })}
                    
                    ${showArtist ? MuiTypography({
                        variant: 'body2',
                        className: 'text-muted mt-1',
                        children: truncateText(song.artist, 18)
                    }) : ''}
                    
                    ${showAlbum ? MuiTypography({
                        variant: 'body2',
                        className: 'text-muted mt-1',
                        children: truncateText(song.album, 18)
                    }) : ''}
                    
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <span class="text-muted small">${song.duration}</span>
                        <div class="d-flex gap-1">
                            ${MuiChip({
                                label: song.genre,
                                size: 'small',
                                className: 'genre-chip'
                            })}
                        </div>
                    </div>
                `
            })}
        `
    });
}

// Enhanced Player Controls with MUI styling
function MuiPlayerControls(isPlaying = false) {
    return `
        <div class="player-controls d-flex align-items-center gap-2">
            ${MuiFab({
                size: 'small',
                onClick: 'previousSong()',
                children: getCustomIcon('skipPrevious', { size: '20' })
            })}
            
            ${MuiFab({
                onClick: 'togglePlayback()',
                children: isPlaying ? 
                    getCustomIcon('pause', { size: '24' }) : 
                    getCustomIcon('play', { size: '24' })
            })}
            
            ${MuiFab({
                size: 'small',
                onClick: 'nextSong()',
                children: getCustomIcon('skipNext', { size: '20' })
            })}
        </div>
    `;
}

// Make components globally available
window.MuiButton = MuiButton;
window.MuiFab = MuiFab;
window.MuiCard = MuiCard;
window.MuiCardContent = MuiCardContent;
window.MuiChip = MuiChip;
window.MuiAvatar = MuiAvatar;
window.MuiListItem = MuiListItem;
window.MuiTypography = MuiTypography;
window.MuiSlider = MuiSlider;
window.MuiMusicCard = MuiMusicCard;
window.MuiPlayerControls = MuiPlayerControls;