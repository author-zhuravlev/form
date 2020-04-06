const formInit = {
    conteiner: '.conteiner',
    title: 'Register With Us',
    inputs: [
        // [tittle, type, placeholder, id]
        ['Username', 'text', 'Enter username'],
        ['Email', 'email', 'Enter email'],
        ['Phone', 'tel', 'Enter phone'],
        ['Password', 'password', 'Enter password', 'password'],
        ['Confirm Password', 'password', 'Enter password again', 'confirm-pass']
    ],
    buttonTitle: 'Submit',
    colorsForInput: [
        '#f9fd01', 'darkorange', '#66fd01', '#0144fd', 
        'indigo', '#ad01fd', 'gold', 'blueviolet'
    ],
    k: 0, // input counter
    sendRequest: {
        url: 'http://server.php', 
        method: 'POST'
    },
    messages: {
        success: 'Registration completed successfully!',
        loading: 'Loading...',
        failure: 'Something went wrong...'
    },
    errorMessages: {
        enter: {
            message: 'Enter ',
        },
        text: {
            shortText: 'Username must be at least 3 characters',
            numeric: 'Username must not be numbers'
        },
        email: {
            invalid: 'Email is not valid'
        },
        tel: {
            invalid: 'Phone is not valid'
        },
        password: {
            shortPassword: 'Password must be at least 6 characters'
        },
        confirmPassword: {
            dontMatch: 'Passwords do not match',
        }
    }
};

const form = new Form(formInit);
form.init();
