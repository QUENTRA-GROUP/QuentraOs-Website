<template>
    <header class="hero">
        <canvas ref="heroCanvas" class="hero-canvas"></canvas>
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">VERSION RELEASE // V1.0.0</div>
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

const heroCanvas = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

const roles = ["Hackers", "Security specialists", "Developers", "Sysadmins", "Network engineers"]
const typedText = ref(roles[0] || "")

let roleIndex = 0
let charIndex = (roles[0] || "").length
let isDeleting = false
let timeoutId: number | null = null

const typeEffect = () => {
    const currentRole = roles[roleIndex] || ""
    
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
    else {
        if (isDeleting) {
            charIndex--
        } else {
            charIndex++
        }
        typedText.value = currentRole.substring(0, charIndex)
    }

    timeoutId = window.setTimeout(typeEffect, typeSpeed)
}

// Canvas Animation Logic
const initCanvasAnimation = () => {
    const canvas = heroCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    let particles: { x: number, y: number, vx: number, vy: number, size: number }[] = []
    const particleCount = Math.floor(width * height / 15000) // Adaptive count

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 2 + 1
        })
    }

    let mouse = { x: width / 2, y: height / 2, radius: 150 }

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = e.clientX - rect.left
        mouse.y = e.clientY - rect.top
    }
    
    // Default to center if mouse leaves
    const handleMouseLeave = () => {
        mouse.x = width / 2
        mouse.y = height / 2
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const handleResize = () => {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    const draw = () => {
        ctx.clearRect(0, 0, width, height)
        
        // Draw Particles & Update Positions
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i]
            if (!p) continue
            p.x += p.vx
            p.y += p.vy

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1
            if (p.y < 0 || p.y > height) p.vy *= -1

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = '#ff5e00'
            ctx.shadowBlur = 10
            ctx.shadowColor = '#ff5e00'
            ctx.fill()
        }

        // Draw Connecting Lines
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i]
            if (!p1) continue

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j]
                if (!p2) continue
                let dx = p1.x - p2.x
                let dy = p1.y - p2.y
                let dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 100) {
                    ctx.beginPath()
                    ctx.strokeStyle = `rgba(255, 94, 0, ${1 - dist / 100})`
                    ctx.lineWidth = 1
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.stroke()
                }
            }

            // Connect to mouse
            let mDx = p1.x - mouse.x
            let mDy = p1.y - mouse.y
            let mDist = Math.sqrt(mDx * mDx + mDy * mDy)

            if (mDist < mouse.radius) {
                ctx.beginPath()
                ctx.strokeStyle = `rgba(255, 94, 0, ${(1 - mDist / mouse.radius) * 0.8})`
                ctx.lineWidth = 1.5
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(mouse.x, mouse.y)
                ctx.stroke()
                
                // Slight magnetic pull
                p1.x -= mDx * 0.01
                p1.y -= mDy * 0.01
            }
        }
        
        // Remove shadow for next frame lines
        ctx.shadowBlur = 0;

        animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseleave', handleMouseLeave)
        window.removeEventListener('resize', handleResize)
    }
}

let cleanupCanvas: (() => void) | undefined

onMounted(() => {
    timeoutId = window.setTimeout(typeEffect, 1000)
    cleanupCanvas = initCanvasAnimation()
})

onUnmounted(() => {
    if (timeoutId !== null) {
        clearTimeout(timeoutId)
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
    }
    if (cleanupCanvas) {
        cleanupCanvas()
    }
})
</script>

<style scoped>
.hero-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none; /* Allows clicking buttons through it */
}

.hero-content {
    position: relative;
    z-index: 1; /* Content above canvas */
}
</style>
