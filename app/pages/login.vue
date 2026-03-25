<template>
    <div class="login-page">
        <div class="main-card">
            <!-- Left Side: Illustration & Marketing -->
            <div class="left-section">
                <div class="illustration-container">
                    <img src="/images/skeleton_illustration.png" alt="Creative Skeleton" class="hero-img" />
                </div>
                <div class="marketing-text">
                    <h2>Turn your ideas into reality.</h2>
                    <p>Start for free and get attractive offers from the community</p>
                </div>
            </div>

            <!-- Right Side: Login Form -->
            <div class="right-section">
                <div class="form-container">
                    <div class="back-nav">
                        <button @click="navigateTo('/')" class="back-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to Home
                        </button>
                    </div>
                    <div class="logo-area">
                        <div class="abstract-logo">
                            <span></span><span></span><span></span><span></span>
                        </div>
                    </div>

                    <h1 class="welcome-title">Login to your Account</h1>
                    <p class="welcome-sub">See what is going on with your business</p>

                    <!-- <button class="google-login-btn" @click="handleGoogleSignIn">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Continue with Google
          </button> -->

                    <!-- <div class="form-separator">
                        <span>or Sign in with Email</span>
                    </div> -->

                    <form @submit.prevent="handleLogin" class="row g-3">
                        <div class="col-md-12">
                            <div class="form-label">Username</div>
                            <CustomInputText v-model="form.username" className="form-control-lg" placeholder="Username"
                                required />
                        </div>

                        <div class="col-md-12">
                            <div class="form-label">Password</div>
                            <CustomInputPassword v-model="form.password" className="form-control-lg"
                                placeholder="Password" required />
                        </div>

                        <div class="col-md-12 mt-4">
                            <CustomInputSubmitButton type="submit" className="btn-theme btn-lg w-100">
                                Login
                            </CustomInputSubmitButton>
                        </div>
                    </form>

                    <!-- <div class="signup-footer">
                        Not Registered Yet? <a href="#" class="create-account-link">Create an account</a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
    email: '',
    password: '',
    rememberMe: false
});

const handleLogin = () => {
    console.log('Login submitted:', form);
};

const handleGoogleSignIn = () => {
    console.log('Google Sign-in clicked');
};
</script>

<style scoped>
.login-page {
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fcece0;
    /* Subtle peach background for the whole page */
    padding: 20px;
    overflow: hidden;
}

.main-card {
    display: flex;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    max-height: calc(100vh - 40px);
    background: #ffffff;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.08);
}

/* Left Section Styles */
.left-section {
    flex: 1.1;
    background-color: #fdf0e6;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.illustration-container {
    width: 100%;
    max-width: 450px;
    margin-bottom: 40px;
}

.hero-img {
    width: 100%;
    height: auto;
    border-radius: 20px;
}

.marketing-text h2 {
    color: #2d3436;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 15px;
}

.marketing-text p {
    color: #636e72;
    font-size: 1rem;
    line-height: 1.6;
}

/* Right Section Styles */
.right-section {
    flex: 1;
    padding: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-container {
    width: 100%;
    max-width: 400px;
}

.back-nav {
    margin-bottom: 25px;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    color: #b2bec3;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
}

.back-btn:hover {
    color: #7b1fa2;
    transform: translateX(-3px);
}

.logo-area {
    margin-bottom: 40px;
}

.abstract-logo {
    display: grid;
    grid-template-columns: repeat(2, 12px);
    gap: 8px;
    justify-content: flex-start;
}

.abstract-logo span {
    width: 12px;
    height: 12px;
    background-color: #7b1fa2;
    border-radius: 2px;
}

.welcome-title {
    color: #2d3436;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.welcome-sub {
    color: #b2bec3;
    font-size: 0.9rem;
    margin-bottom: 35px;
}


/* Responsiveness */
@media (max-width: 1024px) {
    .left-section {
        display: none;
    }

    .main-card {
        max-width: 550px;
    }
}

@media (max-width: 576px) {
    .right-section {
        padding: 30px;
    }

    .welcome-title {
        font-size: 1.5rem;
    }
}
</style>