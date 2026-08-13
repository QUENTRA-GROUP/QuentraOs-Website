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
                <li><a href="#support-us">Support Us</a></li>
            </ul>
            <div class="nav-actions">
                <button @click="toggleTheme" class="btn-theme-toggle" aria-label="Toggle Theme">
                    <span class="icon-dark">&#9789;</span> <!-- Moon icon -->
                    <span class="icon-light">&#9728;</span> <!-- Sun icon -->
                </button>
                <button class="btn-nav">Download</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

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
</style>
