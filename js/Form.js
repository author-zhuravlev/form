export default class Form {
  constructor(options = {
    conteiner: '.conteiner',
    title: 'Form',
    inputs: [
      ['Name', 'text', 'Enter username'],
      ['Password', 'password', 'Enter password', 'password'],
    ],
    buttonTitle: 'Submit',
    colorsForInput: ['#3498db'],
    k: 0,
    sendRequest: {
      url: '',
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
  }) {
    this.conteiner = options.conteiner;
    this.title = options.title;
    this.inputs = options.inputs;
    this.buttonTitle = options.buttonTitle;
    this.colorsForInput = options.colorsForInput;
    this.k = options.k;
    this.sendRequest = options.sendRequest;
    this.messages = options.messages;
    this.errorMessages = options.errorMessages;
  }

  init() {
    const conteiner = document.querySelector(this.conteiner);
    conteiner.append(this.createForm());
  }

  createForm() {
    const form = document.createElement('form');
    form.classList.add('form');
    form.append(
      this.createTitle(),
      this.createFields(),
      this.createButton()
    );
    return form;
  }

  createTitle() {
    const title = document.createElement('h1');
    title.textContent = this.title;
    title.classList.add('title');
    return title;
  }

  createFields() {
    const fields = document.createElement('div');

    for (let i = 0; i < this.inputs.length; i++) {
      const wrapp = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const divError = document.createElement('div');

      wrapp.classList.add('wrapp');
      label.classList.add('label');
      input.classList.add('input');
      fields.classList.add('wrapp-label');
      divError.classList.add('error');

      label.textContent = this.inputs[i][0];
      divError.textContent = 'Error messsge';

      input.type = this.inputs[i][1];
      input.name = this.inputs[i][1];
      input.placeholder = this.inputs[i][2];
      input.required = 'true';

      if (input.type === 'password') {
        input.id = this.inputs[i][3];
      }

      input.addEventListener('input', () => { // change color input
        this.changeColorInput(input);
      });
      input.addEventListener('focus', function () {
        this.style.borderColor = '#f0f0f0';
      });

      wrapp.append(label, input, divError);

      fields.append(wrapp);
    }
    return fields;
  }

  createButton() {
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.classList.add('btn');
    btn.textContent = this.buttonTitle;

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      this.checkInput();
      this.sendForm();
    });

    return btn;
  }

  changeColorInput(input) {
    if (this.k >= this.colorsForInput.length) {
      this.k = 0;
      input.style.outlineColor = this.colorsForInput[this.k];
      this.k++;
    } else {
      input.style.outlineColor = this.colorsForInput[this.k];
      this.k++;
    }
  }

  checkInput() {
    const inputs = document.querySelectorAll('.input');
    const label = document.querySelectorAll('.label');
    const divError = document.querySelectorAll('.error');

    inputs.forEach((item, i) => {
      const itemValue = item.value.trim();
      if (itemValue === '') {
        this.incorrectInput(item, divError, i, this.errorMessages.enter.message + label[i].textContent);
      } else {
        this.checkInputByType(item, itemValue, divError, i);
      }
    });
  }

  checkInputByType(item, itemValue, divError, i) {
    if (item.type === 'text') {
      this.checkInpTypeText(item, itemValue, divError, i);
    } else if (item.type === 'email') {
      this.checkInpTypeEmail(item, itemValue, divError, i);
    } else if (item.type === 'tel') {
      this.checkInpTypeTel(item, itemValue, divError, i);
    } else if (item.type === 'password') {
      this.checkPasswords(item, divError, i);
    } else {
      this.correctInput(item, divError, i);
    }
  }

  checkInpTypeText(text, textValue, divError, i) {
    if (textValue.length < 3) {
      this.incorrectInput(text, divError, i, this.errorMessages.text.shortText);
    } else if (!isNaN(textValue)) {
      this.incorrectInput(text, divError, i, this.errorMessages.text.numeric);
    } else {
      this.correctInput(text, divError, i);
    }
  }

  checkInpTypeTel(phone, phoneValue, divError, i) {
    (phoneValue.match(/^(\s*)?(\+)?([-_():=+]?\d[-_():=+]?){10,14}(\s*)?$/))
      ? this.correctInput(phone, divError, i)
      : this.incorrectInput(phone, divError, i, this.errorMessages.tel.invalid);
  }

  checkInpTypeEmail(email, emailValue, divError, i) {
    (emailValue.match(/.+?\@.+/g))
      ? this.correctInput(email, divError, i)
      : this.incorrectInput(email, divError, i, this.errorMessages.email.invalid);
  }

  checkPasswords(pass, divError, i) {
    if (pass.value.length < 6) {
      this.incorrectInput(pass, divError, i, this.errorMessages.password.shortPassword);
    } else if (pass.id === 'confirm-pass') {
      const password = document.getElementById('password');

      (pass.value === password.value)
        ? this.correctInput(pass, divError, i)
        : this.incorrectInput(pass, divError, i, this.errorMessages.confirmPassword.dontMatch);
    } else {
      this.correctInput(pass, divError, i);
    }
  }

  incorrectInput(input, divError, i, textError) {
    divError[i].textContent = textError;
    divError[i].style.visibility = 'visible';
    input.style.borderColor = '#ff0000';
  }

  correctInput(input, divError, i) {
    divError[i].textContent = 'Error message';
    divError[i].style.visibility = 'hidden';
    input.style.borderColor = '#07ff13';
  }

  sendForm() {
    const inputs = document.querySelectorAll('.input');

    const checkInp = () => {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style.borderColor === 'rgb(255, 0, 0)') {
          return false;
        }
      }
      return true;
    };

    const send = () => {
      const form = document.querySelector('.form');
      const message = document.createElement('div');
      const formData = new FormData(form);

      message.classList.add('message');

      const request = new XMLHttpRequest();

      request.open(this.sendRequest.method, this.sendRequest.url);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      request.addEventListener('readystatechange', () => {
        if (request.readyState < 4) {
          form.textContent = '';
          message.textContent = this.messages.loading;
          form.append(message);
        } else if (request.readyState === 4 && request.status === 200) {
          form.textContent = '';
          message.textContent = this.messages.success;
          form.append(message);
        } else {
          form.textContent = '';
          message.textContent = this.messages.failure;
          form.append(message);
        }
      });
      request.send(formData);
    };

    if (checkInp()) {
      send();
    }
  }
}
