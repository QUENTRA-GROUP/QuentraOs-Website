<template>
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-logo">QUENTRA<span>OS</span></div>
                    <p>The ultimate framework for your Cybersecurity operations. Built by hackers, for hackers.</p>
                    <div class="social-links">
                        <a href="#" aria-label="X (Twitter)">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                        </a>
                        <a href="#" aria-label="GitHub">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        </a>
                        <a href="#" aria-label="Discord">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                        </a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="#">Home Edition</a></li>
                        <li><a href="#">Security Edition</a></li>
                        <li><a href="#">Pwnbox</a></li>
                        <li><a href="#">Changelog</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Community</h4>
                    <ul>
                        <li><a href="#">GitLab</a></li>
                        <li><a href="#">GitHub</a></li>
                        <li><a href="#">Forum</a></li>
                        <li><a href="#">Matrix</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">Tutorials</a></li>
                        <li><a href="#">Partners</a></li>
                        <li><a href="#">Donate</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&#169; 2024 QUENTRA GROUP. ALL_RIGHTS_RESERVED.</p>
                <p>VERSION RELEASE // V1.0.0</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.social-links a {
    color: var(--text-gray);
    width: 40px;
    height: 40px;
    background: rgba(128, 128, 128, 0.1); /* Subtle background for both themes */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.social-links a:hover {
    color: var(--bg-dark); /* Icon turns dark */
    background: var(--accent-orange); /* Circle turns orange */
    transform: translateY(-3px); /* Lift effect */
}

.social-links svg {
    width: 20px;
    height: 20px;
}

/* Visually balance the icon sizes since their SVG paths have different visual weights */
.social-links a:nth-child(1) svg {
    /* X (Twitter) */
    transform: scale(0.9);
}

.social-links a:nth-child(2) svg {
    /* GitHub - naturally largest because it's a solid circle */
    transform: scale(0.85);
}

.social-links a:nth-child(3) svg {
    /* Discord - naturally smallest because it doesn't fill the viewBox */
    transform: scale(1.1);
}
</style>
