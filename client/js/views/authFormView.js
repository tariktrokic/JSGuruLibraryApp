export const getCredentialsAndAction = () => { 
    let confirmPasswordField;
    let password = document.querySelector('#user_password').value;
    let action = document.querySelector('.authsubmit').dataset.type;
    if (action === 'signup') {
        confirmPasswordField = document.querySelector('#user_confirmpassword');
        if (confirmPasswordField.value !== password) return renderMessage({status: 404, data: {message: 'Password do not match'}});
    };
    let username = document.querySelector('#user_name').value;
    return {
        username,
        password,
        action
    };
};

export const renderMessage = (response) => {
    removeMessage();
    let html;
    let statusCode = response.status + '';
    let display = document.body;
    if (!statusCode.startsWith('4')) {
        html = '<div class="message success"><p>Success! Redirecting...</p></div>';
        display.insertAdjacentHTML('afterbegin',html);
        setTimeout(() => window.location.replace('/'),1500);
    } else {
        html = `<div class="message failed"><p>Error! - ${response.data.message}</p></div>`;
        display.insertAdjacentHTML('afterbegin',html);
        setTimeout(removeMessage,2000);
    };
};

const removeMessage = () => {
    let message = document.querySelector('.message');
    if (message) {
        message.parentElement.removeChild(message);
    };
};
