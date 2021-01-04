import {showMessage} from 'react-native-flash-message';

const protection = (message, defaultMessage = 'Sorry Some error Occured') => {
  let formattedMessage = defaultMessage;
  if (typeof message === 'string') {
    formattedMessage = message;
  }
  return formattedMessage;
};

const showError = (rawMessage) => {
  const message = protection(rawMessage);
  showMessage({
    message: 'Error',
    description: message,
    type: 'danger',
  });
};

const showSuccess = (rawMessage) => {
  const message = protection(rawMessage);
  showMessage({
    message: 'Success',
    description: message,
    type: 'success',
  });
};

// const onNotification = (rawTitle, rawBody) => {
//   const body = protection(rawBody, 'Sorry! An Error Occured!');
//   const title = protection(rawTitle, 'Error');
//   showMessage({
//     message: title,
//     description: body,
//     type: 'info',
//     autoHide: true,
//     duration: 5000,
//   });
// };

export default {showError, showSuccess, onNotification};
