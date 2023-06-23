import Draw from './Draw';

export default class Chat {
  constructor(container) {
    this.draw = new Draw(container);
    this.apiUrl = 'http://localhost:3000/';
    this.user;
    this.currentUser;
    this.websocket;
  }

  init() {
    this.draw.drawUI(this.container);
    this.draw.drawModals(this.container);
    this.bindToDOM();
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('submit', this.submit.bind(this));
  }

  click(e) {
    e.preventDefault();
    const { target } = e;

    if (target.classList.contains('chat__connect')) {
      document.querySelector('.modal__background').classList.remove('hidden');
    } else if (target.classList.contains('modal__close')) {
      document.querySelector('.modal__background').classList.add('hidden');
    } else if (target.classList.contains('modal__ok')) {
      this.user = document.querySelector('.form__input').value;
      const user = { name: this.user };
      this.add(user);
    } else if (target.classList.contains('chat__disconnect')) {
      document.querySelector('.chat__container').classList.add('hidden');
      document.querySelector('.chat__connect').classList.remove('hidden');
      document.querySelector('.chat__disconnect').classList.add('hidden');

      this.currentUser[0].type = 'exit';
      this.websocket.send(JSON.stringify(this.currentUser[0]));
      location.reload();
    }
  }

  submit(e) {
    e.preventDefault();
    const { target } = e;
    const message = document.querySelector('.form-message__input').value;
    if (target.classList.contains('form')) {
      this.websocket.send(JSON.stringify({
        message, type: 'send', user: this.user, date: new Date().toLocaleString(),
      }));
    }
  }

  async add(user) {
    const request = fetch(`${this.apiUrl}new-user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');
    }

    const json = await result.json();
    const { status } = json;

    if (status !== 'ok') {
      this.draw.drawError(json.message);
    } else {
      this.draw.drawChat();
      this.connectToWebsoket();
    }
  }

  connectToWebsoket() {
    this.websocket = new WebSocket('ws://localhost:3000/ws');
    this.websocket.addEventListener('open', (e) => {});
    this.websocket.addEventListener('close', (e) => {});
    this.websocket.addEventListener('error', (e) => {});

    this.websocket.addEventListener('message', (e) => {
      this.data = JSON.parse(e.data);

      const arrOfNames = [];

      this.data
        .filter((o) => o.name !== undefined)
        .forEach((o) => arrOfNames.push(o));

      this.draw.clearList();
      arrOfNames.forEach((el) => {
        this.draw.drawUser(el.name);
      });

      this.currentUser = arrOfNames.filter((el) => el.name === this.user);

      const arrOfMessages = [];

      this.data
        .filter((o) => o.message !== undefined)
        .forEach((o) => arrOfMessages.push(o));

      if (arrOfMessages.length > 0) {
        const data = new Date().toLocaleString();
        const chat = arrOfMessages[arrOfMessages.length - 1].message;
        const { user } = arrOfMessages[arrOfMessages.length - 1];
        this.draw.drawMessage(user, data, chat, this.user);
      }
    });
  }
}
