


   export const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '4px',
                borderColor: 'var(--outline, #A5B6CD)',
            },
            '&:hover fieldset': {
                borderColor: '#127C95',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#127C95',
            },
        },
        marginTop: '5px',
        marginBottom: '20px',
        width: '100%', // Ensure inputs always fit their containers
    };
    
    export const appBarStyles = {
        backgroundColor: '#252F3D',
        '& Toolbar': {
            justifyContent: 'center' // Centers the logo for smaller screens
        }
    };

  export const textStyle = {
        style: {
            color: 'var(--Text, #2C3642)',
            fontFamily: 'Lato',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '0.36px',
        }
    };

 export const labelStyle = {
        color: 'var(--Grey-7, #333)',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '24px',
        letterSpacing: '0.15px',
    };