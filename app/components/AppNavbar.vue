<template>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">QUENTRA<span>OS</span></a>
            <ul class="nav-links">
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#team">Team</a></li>
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
