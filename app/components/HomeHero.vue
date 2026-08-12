<template>
    <header class="hero">
        <div class="hero-bg"></div>
        <div class="container">
            <div class="hero-content">
                <h1>
                    <span class="hero-pre">The operating system for</span>
                    <!-- Area untuk Animasi Mengetik -->
                    <span class="typing-container">
                        <span id="typing-text" class="typing-text">{{ typedText }}</span><span class="cursor"></span>
                    </span>
                </h1>
                <p>The ultimate framework for your Cybersecurity operations. Built for intensity, designed for professionals.</p>
                <div class="btn-group">
                    <button class="btn-primary">Get QuentraOs <span>&#8594;</span></button>
                    <button class="btn-secondary">View Documentation</button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const roles = ["Hackers", "Security specialists", "Developers", "Sysadmins", "Network engineers"]
const typedText = ref("")

let roleIndex = 0
let charIndex = 0
let isDeleting = false
let timeoutId: number | null = null

const typeEffect = () => {
    const currentRole = roles[roleIndex] || ""
    
    if (isDeleting) {
        typedText.value = currentRole.substring(0, charIndex - 1)
        charIndex--
    } else {
        typedText.value = currentRole.substring(0, charIndex + 1)
        charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 120

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000
        isDeleting = true
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        typeSpeed = 500
    }

    timeoutId = window.setTimeout(typeEffect, typeSpeed)
}

onMounted(() => {
    typeEffect()
})

onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
})
</script>
