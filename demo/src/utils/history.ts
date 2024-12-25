import { createBrowserHistory } from 'history';
import { ConfirmBeforeLeavePage } from './ConfirmBeforeLeavePage';

export const history = createBrowserHistory({
  basename: '/email_builder',
  getUserConfirmation(message, callback) {
    if (ConfirmBeforeLeavePage.confirmBeforeLeave) {
      ConfirmBeforeLeavePage.confirmBeforeLeave(message, callback);
    } else {
      callback(window.confirm(message));
    }
  },
});
