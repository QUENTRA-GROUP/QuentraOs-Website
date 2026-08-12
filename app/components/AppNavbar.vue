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
                    <span v-if="isLightMode">&#9789;</span> <!-- Moon icon for switching back to dark -->
                    <span v-else>&#9728;</span> <!-- Sun icon for switching to light -->
                </button>
                <button class="btn-nav">Download</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLightMode = ref(false)

const toggleTheme = () => {
    isLightMode.value = !isLightMode.value
    const theme = isLightMode.value ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('quentraos-theme', theme)
}

onMounted(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('quentraos-theme')
    if (savedTheme === 'light') {
        isLightMode.value = true
        document.documentElement.setAttribute('data-theme', 'light')
    } else {
        document.documentElement.setAttribute('data-theme', 'dark')
    }
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

.btn-theme-toggle:hover {
    color: var(--accent-orange);
}
</style>
