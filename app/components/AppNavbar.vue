<template>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">QUENTRA<span>OS</span></a>
            <ul class="nav-links">
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#how-it-works">How it works</a></li>
                <li class="dropdown">
                    <a href="#team" class="dropdown-toggle">Team <span>&#9662;</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#about">About</a></li>
                        <li><a href="#partner">Partner</a></li>
                        <li><a href="#corsairs">Corsairs</a></li>
                    </ul>
                </li>
                <li><a href="#tools">Tools</a></li>
                <li><a href="#blog">Blog</a></li>
                <li class="dropdown">
                    <a href="#support-us" class="dropdown-toggle">Support Us <span>&#9662;</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#store">Store</a></li>
                        <li><a href="#donate">Donate</a></li>
                    </ul>
                </li>
            </ul>
            <div class="nav-actions">
                <button @click="toggleTheme" class="btn-theme-toggle" aria-label="Toggle Theme">
                    <span class="icon-dark">&#9789;</span> <!-- Moon icon -->
                    <span class="icon-light">&#9728;</span> <!-- Sun icon -->
                </button>
                <button class="btn-nav">Download</button>
                <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle Menu">
                    <span class="hamburger-box">
                        <span class="hamburger-inner" :class="{ 'is-active': isMobileMenuOpen }"></span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay" :class="{ 'is-open': isMobileMenuOpen }">
            <div class="mobile-menu-content">
                <a href="#" class="logo mobile-logo" @click="toggleMobileMenu">QUENTRA<span>OS</span></a>
                <ul class="mobile-nav-links">
                    <li><a href="#documentation" @click="toggleMobileMenu">Documentation</a></li>
                    <li><a href="#community" @click="toggleMobileMenu">Community</a></li>
                    <li><a href="#how-it-works" @click="toggleMobileMenu">How it works</a></li>
                    <li class="mobile-dropdown">
                        <button class="mobile-dropdown-toggle" @click="toggleMobileDropdown('team')">
                            Team <span :class="{ 'is-rotated': openDropdown === 'team' }">&#9662;</span>
                        </button>
                        <ul class="mobile-dropdown-menu" :class="{ 'is-open': openDropdown === 'team' }">
                            <li><a href="#about" @click="toggleMobileMenu">About</a></li>
                            <li><a href="#partner" @click="toggleMobileMenu">Partner</a></li>
                            <li><a href="#corsairs" @click="toggleMobileMenu">Corsairs</a></li>
                        </ul>
                    </li>
                    <li><a href="#tools" @click="toggleMobileMenu">Tools</a></li>
                    <li><a href="#blog" @click="toggleMobileMenu">Blog</a></li>
                    <li class="mobile-dropdown">
                        <button class="mobile-dropdown-toggle" @click="toggleMobileDropdown('support')">
                            Support Us <span :class="{ 'is-rotated': openDropdown === 'support' }">&#9662;</span>
                        </button>
                        <ul class="mobile-dropdown-menu" :class="{ 'is-open': openDropdown === 'support' }">
                            <li><a href="#store" @click="toggleMobileMenu">Store</a></li>
                            <li><a href="#donate" @click="toggleMobileMenu">Donate</a></li>
                        </ul>
                    </li>
                    <li style="margin-top: 2rem;">
                        <button class="btn-nav" style="width: 100%; text-align: center; padding: 1rem;">Download</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const themeCookie = useCookie('quentraos-theme', { 
    default: () => 'system',
    maxAge: 31536000, // 1 year
    path: '/'
})

const toggleTheme = () => {
    const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light'
    const newTheme = isCurrentlyLight ? 'dark' : 'light'
    themeCookie.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
}

// Mobile Menu State
const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (!isMobileMenuOpen.value) {
        openDropdown.value = null
    }
}

const toggleMobileDropdown = (menu: string) => {
    if (openDropdown.value === menu) {
        openDropdown.value = null
    } else {
        openDropdown.value = menu
    }
}

// Prevent body scroll when menu is open
watch(isMobileMenuOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

onMounted(() => {
    // If cookie is 'system', just sync the cookie but the script in head already handled DOM
})
</script>

<style scoped>
.dropdown {
    position: relative;
}

.dropdown-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.dropdown-toggle span {
    font-size: 0.8em;
    display: inline-block;
    transition: transform 0.3s ease;
    transform-origin: center;
}

.dropdown:hover .dropdown-toggle span {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: -10px;
    margin-top: 2.5rem; /* Push down completely below navbar */
    background: var(--bg-dark);
    border: 1px solid var(--border-color);
    list-style: none;
    padding: 0.5rem 0;
    min-width: 180px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 100;
    border-radius: 4px;
}

/* Invisible bridge to prevent hover loss when moving mouse down */
.dropdown-menu::before {
    content: '';
    position: absolute;
    top: -2.5rem;
    left: 0;
    right: 0;
    height: 2.5rem;
    background: transparent;
}

.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-menu li {
    padding: 0;
}

.dropdown-menu a {
    display: block;
    padding: 0.8rem 1.5rem;
    color: var(--text-white);
    text-transform: capitalize;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
}

.dropdown-menu a:hover {
    color: var(--accent-orange);
    background: rgba(255, 94, 0, 0.05);
    padding-left: 1.8rem;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.btn-theme-toggle {
    background: transparent;
    border: none;
    color: var(--text-white);
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
}

/* Default (Dark Mode): Show sun to switch to light */
.icon-dark { display: none; }
.icon-light { display: inline; }

/* Light Mode: Show moon to switch to dark */
:global([data-theme='light']) .icon-light { display: none; }
:global([data-theme='light']) .icon-dark { display: inline; }

.btn-theme-toggle:hover {
    color: var(--accent-orange);
}

/* Mobile Menu Button (Hidden by default) */
.mobile-menu-btn {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001; /* Above overlay */
}

.hamburger-box {
    width: 24px;
    height: 24px;
    display: inline-block;
    position: relative;
}

.hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
}

.hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
    width: 24px;
    height: 2px;
    background-color: var(--text-white);
    position: absolute;
    transition: transform 0.3s ease, background-color 0.3s ease, top 0.3s ease;
    border-radius: 4px;
}

.hamburger-inner::before {
    content: "";
    top: -8px;
}

.hamburger-inner::after {
    content: "";
    bottom: -8px;
}

/* Hamburger Active State (X) */
.hamburger-inner.is-active {
    background-color: transparent;
}
.hamburger-inner.is-active::before {
    transform: translateY(8px) rotate(45deg);
}
.hamburger-inner.is-active::after {
    transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background: var(--overlay-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 999;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.3s ease;
    overflow-y: auto;
}

.mobile-menu-overlay.is-open {
    transform: translateX(0);
}

.mobile-menu-content {
    padding: 100px 2rem 4rem; /* Space for navbar */
    display: flex;
    flex-direction: column;
}

.mobile-nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.mobile-nav-links > li > a,
.mobile-dropdown-toggle {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-white);
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: color 0.3s;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mobile-nav-links a:hover,
.mobile-dropdown-toggle:hover {
    color: var(--accent-orange);
}

.mobile-dropdown-toggle span {
    font-size: 1.2rem;
    transition: transform 0.3s;
}

.mobile-dropdown-toggle span.is-rotated {
    transform: rotate(180deg);
}

/* Mobile Dropdown (Accordion) */
.mobile-dropdown-menu {
    list-style: none;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, margin-top 0.4s ease;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mobile-dropdown-menu.is-open {
    max-height: 300px;
    margin-top: 1.5rem;
}

.mobile-dropdown-menu a {
    font-size: 1.2rem;
    color: var(--text-gray);
    text-transform: capitalize;
}

.mobile-dropdown-menu a:hover {
    color: var(--accent-orange);
}

.mobile-logo {
    position: absolute;
    top: 1.2rem;
    left: 2rem;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--text-white);
    letter-spacing: -0.05em;
    text-decoration: none;
}

@media (max-width: 968px) {
    .mobile-menu-btn {
        display: inline-block;
    }
    .nav-actions .btn-nav {
        display: none; /* Hide download button in top navbar on mobile */
    }
}

@media (max-width: 768px) {
    .mobile-logo {
        top: 1rem;
        left: 1.5rem;
    }
}

@media (max-width: 480px) {
    .mobile-logo {
        top: 1rem;
        left: 1rem;
    }
}
</style>
