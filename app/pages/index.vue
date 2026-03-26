<template>
    <div class="landing-page">
        <div class="content-wrapper">
            <!-- Logo area -->
            <div class="logo-area animate-fade-in-down">
                <div class="abstract-logo">
                    <span></span><span></span><span></span><span></span>
                </div>
                <h5 class="brand-name">CHURCH MANAGER</h5>
            </div>

            <!-- Hero Section -->
            <div class="hero animate-fade-in-up">
                <h1 class="main-title">Smart Church Management, <br /> Built for Reliability</h1>
                <p class="subtext">
                    A simple and reliable church management system designed to help you track members, attendance, and
                    finances with ease.
                </p>

                <div class="actions">
                    <button class="get-started-btn" @click="navigateToLogin">
                        Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                    <!-- Small subtle link to more info if they want, but no scrolling -->
                </div>
            </div>
        </div>

        <!-- Decorative background elements -->
        <div class="gradient-overlay"></div>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    </div>
</template>

<script setup>
const navigateToLogin = () => {
    navigateTo('/login');
};
</script>

<style scoped>
.landing-page {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: #fcece0;
    /* The base peach color from login */
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(123, 31, 162, 0.05), transparent),
        radial-gradient(circle at bottom left, rgba(252, 236, 224, 1), transparent);
    z-index: 1;
}

.content-wrapper {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 2rem;
    max-width: 900px;
}

.logo-area {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.abstract-logo {
    display: grid;
    grid-template-columns: repeat(2, 12px);
    gap: 8px;
}

.abstract-logo span {
    width: 12px;
    height: 12px;
    background-color: #7b1fa2;
    border-radius: 2px;
}

.brand-name {
    color: #7b1fa2;
    font-weight: 700;
    letter-spacing: 0.2rem;
    font-size: 0.9rem;
}



.main-title {
    font-size: 4rem;
    font-weight: 800;
    color: #2d3436;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -1px;
}

.subtext {
    font-size: 1.25rem;
    color: #636e72;
    line-height: 1.6;
    max-width: 650px;
    margin: 0 auto 3rem;
}

.get-started-btn {
    background-color: #7b1fa2;
    color: white;
    border: none;
    padding: 1.1rem 2.8rem;
    border-radius: 50px;
    font-size: 1.15rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px rgba(123, 31, 162, 0.2);
}

.get-started-btn:hover {
    background-color: #6a1b9a;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 35px rgba(123, 31, 162, 0.3);
}

.get-started-btn:active {
    transform: translateY(-2px);
}

.get-started-btn svg {
    transition: transform 0.3s ease;
}

.get-started-btn:hover svg {
    transform: translateX(6px);
}

/* Decorative Blobs */
.blob {
    position: absolute;
    filter: blur(100px);
    opacity: 0.6;
    z-index: 0;
}

.blob-1 {
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background-color: rgba(123, 31, 162, 0.1);
    border-radius: 50%;
}

.blob-2 {
    bottom: -150px;
    left: -150px;
    width: 600px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
}



@media (max-width: 992px) {
    .main-title {
        font-size: 3.2rem;
    }
}

@media (max-width: 768px) {
    .main-title {
        font-size: 2.5rem;
    }

    .subtext {
        font-size: 1.1rem;
    }

    .get-started-btn {
        padding: 1rem 2.2rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 2rem;
    }
}
</style>