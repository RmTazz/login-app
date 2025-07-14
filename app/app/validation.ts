// Validation for Sign Up Page
interface SignupData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface SignupErrors {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

export const validateSignupForm = (data: SignupData): SignupErrors => {
    const errors: SignupErrors = {};

    // 1. Name Validation
    if (!data.name.trim()) {
        errors.name = 'Name is required.';
    }

    // 2. Email Validation
    if (!data.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        // A simple regex for email format
        errors.email = 'Email address is invalid.';
    }

    // 3. Password Validation
    if (!data.password) {
        errors.password = 'Password is required.';
    } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }

    // 4. Password Confirmation Validation
    if (!data.password_confirmation) {
        errors.password_confirmation = 'Please confirm your password.';
    } else if (data.password !== data.password_confirmation) {
        errors.password_confirmation = 'Passwords do not match.';
    }

    return errors;
};

// Validation for Login Page
interface LoginData {
    email: string;
    password: string;
}

interface LoginErrors {
    email?: string;
    password?: string;
}

export const validateLoginForm = (data: LoginData): LoginErrors => {
    const errors: LoginErrors = {};

    // 1. Email Validation
    if (!data.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email address is invalid.';
    }

    // 2. Password Validation
    if (!data.password) {
        errors.password = 'Password is required.';
    }

    return errors;
};
