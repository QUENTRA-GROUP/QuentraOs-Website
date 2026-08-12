<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const themeCookie = useCookie('quentraos-theme', { 
  default: () => 'system',
  maxAge: 31536000,
  path: '/'
})

useHead({
  script: [
    {
      innerHTML: `
        (function() {
          try {
            var theme = document.cookie.match(/quentraos-theme=([^;]+)/);
            var activeTheme = theme ? theme[1] : 'system';
            if (activeTheme === 'system') {
              var isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
              document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
            } else {
              document.documentElement.setAttribute('data-theme', activeTheme);
            }
          } catch (e) {}
        })();
      `
    }
  ],
  title: 'QuentraOs - The Operating System for Hackers',
  meta: [
    { name: 'description', content: 'The ultimate framework for your Cybersecurity operations. Built for intensity, designed for professionals.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700&display=block' }
  ]
})
</script>
