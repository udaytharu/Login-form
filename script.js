document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('rememberMe');
    const signInOtherBtn = document.querySelector('.login-btn-alt');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const signUpLink = document.querySelector('.signup-link a');

    // Get message display area
    let messageDisplayArea = document.createElement('div');
    messageDisplayArea.id = 'formMessage';
    loginForm.insertBefore(messageDisplayArea, loginForm.firstChild);

    // Function to show a message
    function showMessage(type, message) {
        messageDisplayArea.textContent = message;
        messageDisplayArea.className = type === 'success' ? 'success-message' : 'error-message';
        messageDisplayArea.style.display = 'block';
        setTimeout(hideMessage, 3000);
    }

    // Function to hide messages
    function hideMessage() {
        messageDisplayArea.style.display = 'none';
        messageDisplayArea.textContent = '';
        messageDisplayArea.className = '';
    }

    // Clear individual input errors
    function clearInputError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Show individual input error
    function showInputError(input, message) {
        clearInputError(input);
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }

    // Check for remembered credentials
    if (localStorage.getItem('rememberedUser')) {
        const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        usernameInput.value = rememberedUser.username;
        passwordInput.value = rememberedUser.password;
        rememberMe.checked = true;
    }

    // Check for logged-in user
    if (localStorage.getItem('currentUser')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = (type === 'password') ? 'SHOW' : 'HIDE';
    });

    // Clear input errors on focus/input
    usernameInput.addEventListener('input', () => clearInputError(usernameInput));
    passwordInput.addEventListener('input', () => clearInputError(passwordInput));

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        hideMessage();
        clearInputError(usernameInput);
        clearInputError(passwordInput);

        // Basic validation
        if (!usernameInput.value.trim()) {
            showInputError(usernameInput, 'Username is required');
            return;
        }

        if (!passwordInput.value.trim()) {
            showInputError(passwordInput, 'Password is required');
            return;
        }

        // Simple client-side validation (you can add more complex validation here)
        if (passwordInput.value.length < 6) {
            showInputError(passwordInput, 'Password must be at least 6 characters long');
            return;
        }

        // Remember me functionality
        if (rememberMe.checked) {
            localStorage.setItem('rememberedUser', JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value
            }));
        } else {
            localStorage.removeItem('rememberedUser');
        }

        // Set logged in user
        const loggedInUser = usernameInput.value.trim();
        localStorage.setItem('currentUser', JSON.stringify({
            username: loggedInUser,
            loggedInAt: new Date().toISOString()
        }));

        showMessage('success', `Sign in successfully! Welcome, ${loggedInUser}! Redirecting...`);

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });

    // Navigation event listeners
    signInOtherBtn.addEventListener('click', () => {
        window.location.href = 'sign-in-other.html';
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'forgot-password.html';
    });

    signUpLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
}); 