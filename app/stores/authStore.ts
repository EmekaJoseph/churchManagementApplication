const state = reactive({
    user: null as any,
    isLoggedIn: false
})

export const useAuthStore = () => {
    const login = (username: string, password: string) => {
        // Hardcoded credentials for Church Manager
        if (username === 'admin' && password === 'admin') {
            state.user = {
                name: 'Admin User',
                email: 'admin@churchmanager.com',
                role: 'Administrator'
            }
            state.isLoggedIn = true
            return true
        }
        return false
    }

    const logout = () => {
        state.user = null
        state.isLoggedIn = false
    }

    return {
        user: computed(() => state.user),
        isLoggedIn: computed(() => state.isLoggedIn),
        login,
        logout
    }
}
