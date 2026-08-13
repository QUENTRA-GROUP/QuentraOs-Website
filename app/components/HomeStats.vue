<script setup lang="ts">
import { ref, onMounted } from 'vue'

const downloads = ref<number | string>(50)
const community = ref<number | string>(95.5)
const partners = ref<number | string>(60)
const sectionRef = ref<HTMLElement | null>(null)

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
})
</script>

<template>
    <section id="project" class="stats-section" ref="sectionRef">
        <div class="stats-overlay"></div>
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
