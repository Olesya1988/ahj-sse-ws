export default class Draw {
  constructor(container) {
    this.container = container;
  }

  drawUI() {
    const container = document.createElement('div');
    container.classList.add('container');
    this.container.appendChild(container);

    const chatHeader = document.createElement('h1');
    chatHeader.classList.add('chat__header');
    chatHeader.textContent = 'Добро пожаловать в наш чат!';
    container.appendChild(chatHeader);

    const chatConnect = document.createElement('div');
    chatConnect.classList.add('chat__connect');
    chatConnect.textContent = 'Подключиться';
    container.appendChild(chatConnect);

    const chatDisonnect = document.createElement('div');
    chatDisonnect.classList.add('chat__disconnect', 'hidden');
    chatDisonnect.textContent = 'Отключиться';
    container.appendChild(chatDisonnect);

    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat__container', 'hidden');
    container.appendChild(chatContainer);

    const chatUserlist = document.createElement('div');
    chatUserlist.classList.add('chat__userlist');
    chatContainer.appendChild(chatUserlist);

    const chatArea = document.createElement('div');
    chatArea.classList.add('chat__area');
    chatContainer.appendChild(chatArea);

    const chatMessagesContainer = document.createElement('div');
    chatMessagesContainer.classList.add('chat__messages-container');
    chatArea.appendChild(chatMessagesContainer);

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message__container');
    chatMessagesContainer.appendChild(messageContainer);

    const chatMessagesInput = document.createElement('div');
    chatMessagesInput.classList.add('chat__messages-input');
    chatArea.appendChild(chatMessagesInput);

    const formGroup = document.createElement('div');
    formGroup.classList.add('form__group');
    chatMessagesInput.appendChild(formGroup);

    const form = document.createElement('form');
    form.classList.add('form');
    formGroup.appendChild(form);

    const formInput = document.createElement('input');
    formInput.classList.add('form-message__input');
    formInput.placeholder = 'Введите сообщение';
    formInput.required = true;
    form.appendChild(formInput);
  }

  drawModals() {
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal__background', 'hidden');
    this.container.appendChild(modalBackground);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    modalBackground.appendChild(modalContent);

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');
    modalHeader.textContent = 'Введите имя';
    modalContent.appendChild(modalHeader);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal__body');
    modalContent.appendChild(modalBody);

    const formGroup = document.createElement('form');
    formGroup.classList.add('form__group');
    modalBody.appendChild(formGroup);

    const formLabel = document.createElement('label');
    formLabel.classList.add('form__label');
    formGroup.appendChild(formLabel);

    const formInput = document.createElement('input');
    formInput.classList.add('form__input');
    formInput.placeholder = 'Например, Иван';
    formInput.required = true;
    formInput.name = 'name';
    formGroup.appendChild(formInput);

    const formHint = document.createElement('div');
    formHint.classList.add('form__hint');
    formGroup.appendChild(formHint);

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal__footer');
    formGroup.appendChild(modalFooter);

    const modalClose = document.createElement('button');
    modalClose.classList.add('modal__close');
    modalClose.textContent = 'Отмена';
    modalFooter.appendChild(modalClose);

    const modalOk = document.createElement('button');
    modalOk.classList.add('modal__ok');
    modalOk.textContent = 'ОК';
    modalFooter.appendChild(modalOk);
  }

  drawMessage(user, data, message, name) {
    const chatMessagesContainer = document.querySelector('.chat__messages-container');

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message__container', 'message__container-yourself');
    chatMessagesContainer.appendChild(messageContainer);

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message__header');
    messageHeader.textContent = `${user} ${data}`;
    messageContainer.appendChild(messageHeader);

    const messageText = document.createElement('div');
    messageText.classList.add('message__text');
    messageText.textContent = message;
    messageContainer.appendChild(messageText);
    document.querySelector('.form-message__input').value = '';

    if (user === name) {
      messageContainer.classList.add('message__container-yourself');
      messageHeader.textContent = 'Вы' + ` ${data}`;
    } else {
      messageContainer.classList.remove('message__container-yourself');
      messageContainer.classList.add('message__container-interlocutor');
    }
  }

  drawUser(name) {
    const list = document.querySelector('.chat__userlist');
    const user = document.createElement('div');
    user.classList.add('chat__user');
    user.textContent = name;
    list.appendChild(user);
  }

  drawChat() {
    document.querySelector('.modal__background').classList.add('hidden');
    document.querySelector('.chat__container').classList.remove('hidden');
    document.querySelector('.chat__connect').classList.add('hidden');
    document.querySelector('.chat__disconnect').classList.remove('hidden');
  }

  drawError(error) {
    document.querySelector('.form__hint').textContent = error;
  }

  clearList() {
    if (document.querySelectorAll('.chat__user').length > 0) {
      document.querySelector('.chat__userlist').innerHTML = '';
    }
  }
}
