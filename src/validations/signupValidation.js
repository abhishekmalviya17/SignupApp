import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full Name is required').matches(/^[a-zA-Z\s]*$/, 'Only letters and spaces are allowed'),
    contact_number: Yup.string().required('Contact Number is required')
        .matches(/^\+?1?[-\s\.]?\(?\d{3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4}$/, 'Invalid phone format. Format must include valid country code and follow (XXX) XXX-XXXX'),
    email: Yup.string().email('Invalid email address').required('Email Address is required'),
    day: Yup.number().min(1).max(31).required('Day is required'),
    month: Yup.string().required('Month is required').oneOf(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 'Invalid month'),
    year: Yup.number().min(1900).max(new Date().getFullYear()).required('Year is required'),
    password: Yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must have a lower case letter')
        .matches(/[A-Z]/, 'Password must have an upper case letter')
        .matches(/[0-9]/, 'Password must contain a number'),
    confirm_password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});
