<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const downloads = ref<number | string>(50)
const community = ref<number | string>(95.5)
const partners = ref<number | string>(60)
const sectionRef = ref<HTMLElement | null>(null)
const statsCanvas = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

const animateValue = (targetRef: any, start: number, end: number, duration: number, decimals = 0) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart for smooth deceleration
        const ease = 1 - Math.pow(1 - progress, 4);
        
        const current = start + ease * (end - start);
        targetRef.value = current.toFixed(decimals);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            targetRef.value = end.toFixed(decimals);
        }
    };
    window.requestAnimationFrame(step);
}

// Matrix Animation Logic
const initMatrixAnimation = () => {
    const canvas = statsCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = canvas.parentElement?.clientHeight || 400
    canvas.width = width
    canvas.height = height

    const chars = '01'
    const fontSize = 14
    const columns = Math.floor(width / fontSize)
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * height // Random start position
    }

    const draw = () => {
        // Semi-transparent black to create trailing effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = '#ff5e00' // QuentraOS Orange
        ctx.font = `${fontSize}px monospace`
        ctx.textAlign = 'center'

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)]
            // Add a slight glow to the characters
            ctx.shadowBlur = 5
            ctx.shadowColor = '#ff5e00'
            
            if (text) {
                ctx.fillText(text, i * fontSize, drops[i]! * fontSize)
            }

            // Reset drops to top randomly to create endless effect
            if (drops[i]! * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0
            }

            drops[i]!++
        }
        
        ctx.shadowBlur = 0 // Reset shadow for the fade rect

        animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
        width = window.innerWidth
        height = canvas.parentElement?.clientHeight || 400
        canvas.width = width
        canvas.height = height
        
        const newColumns = Math.floor(width / fontSize)
        if (newColumns > drops.length) {
            for (let x = drops.length; x < newColumns; x++) {
                drops[x] = Math.random() * height
            }
        }
    }
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
}

let cleanupCanvas: (() => void) | undefined

onMounted(() => {
    // Reset to 0 after hydration so they can count up when visible
    downloads.value = 0
    community.value = 0
    partners.value = 0

    const observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
            animateValue(downloads, 0, 50, 2500, 0)
            animateValue(community, 0, 95.5, 2500, 1)
            animateValue(partners, 0, 60, 2500, 0)
            observer.disconnect()
        }
    }, { threshold: 0.2 })

    if (sectionRef.value) {
        observer.observe(sectionRef.value)
    }

    cleanupCanvas = initMatrixAnimation()
})

onUnmounted(() => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
    }
    if (cleanupCanvas) {
        cleanupCanvas()
    }
})
</script>

<template>
    <section id="project" class="stats-section" ref="sectionRef">
        <canvas ref="statsCanvas" class="stats-canvas"></canvas>
        <div class="container">
            <div class="stats-container">
                <div class="stat-box">
                    <h2>+{{ downloads }}M</h2>
                    <h3>QuentraOs Downloads</h3>
                    <p>More new people download and update the system daily. This OS is made to respect your freedom, so share it, read the source code, and configure it as you like!</p>
                </div>
                <div class="stat-box">
                    <h2>+{{ community }}k</h2>
                    <h3>Community Members</h3>
                    <p>A worldwide network of passionate users collaborating, learning, and building together. The backbone of our ecosystem.</p>
                </div>
                <div class="stat-box">
                    <h2>+{{ partners }}</h2>
                    <h3>Worldwide Partners</h3>
                    <p>QuentraOs continues to grow thanks to its collaborations with various universities, organizations, companies, and more.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.stats-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Below the text but inside the section */
    pointer-events: none;
    opacity: 0.5; /* Dim the animation slightly so text remains readable */
}
</style>
