class Notification {

    /**
     * @param title
     * @param message
     * @param type
     * @returns {HTMLDivElement}
     */
    constructor( { title, message, type } ) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);

        const domTitle = document.createElement('h1');
        domTitle.classList.add('notification-title');
        domTitle.textContent = title;

        const domMessage = document.createElement('p');
        domMessage.classList.add('notification-message');
        domMessage.textContent = message;

        const domClose = document.createElement('i');
        domClose.className = 'notification-close fa-solid fa-xmark';
        domClose.addEventListener('click', () => backdrop.remove());

        notification.appendChild(domTitle);
        notification.appendChild(domMessage);
        notification.appendChild(domClose);

        const backdrop = document.createElement('div');
        backdrop.classList.add('notification-backdrop');
        backdrop.appendChild(notification);

        return backdrop;
    }
}

export default Notification;