import React, { Component } from 'react';
import Message from './Message';

const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

const botAnswers = [
  'Вы очень настойчивы',
  'Кто Вы?',
  'Хватит!!!',
  'Нет!!!',
  'ля ля ля',
  'Я в нирване!!!',
  'Стоп!',
  'Нуууу нееет!',
];

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

export default class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: uuidv4(),
          text: 'Добрый вечер!',
          sender: 'not-me',
        },
        {
          id: uuidv4(),
          text: 'Привет. Вы что-то хотели? ',
          sender: 'me',
        },
      ],
      textFieldValue: '',
      overloadBot: {
        timer: null,
        tick: 0,
        maxTick: 5,
        text: 'Хватит,остановись!',
      },
    };

    this.chatWindow = React.createRef();
  }

  componentDidUpdate() {
    const { messages, overloadBot } = this.state;
    const lastSender = messages[messages.length - 1].sender;
    const preLastSender = messages[messages.length - 2].sender;
    if (overloadBot.tick === overloadBot.maxTick) {
      overloadBot.tick = 0;
      this.sendMessage(overloadBot.text, 'bot');
    } else if (lastSender === 'me' && preLastSender === 'me') {
      overloadBot.tick += 1;
      this.botSendMessage();
    } else if (lastSender === 'me') {
      this.botSendMessage();
    }
  }

  botSendMessage() {
    const { overloadBot } = this.state;
    clearTimeout(overloadBot.timer);
    overloadBot.timer = setTimeout(() => {
      overloadBot.tick = 0;
      this.sendMessage(randomChoice(botAnswers), 'bot');
    }, 1000);
  }

  sendMessage(text, sender) {
    if (text.length > 0) {
      const { messages } = this.state;
      this.setState({
        messages: [...messages, { id: uuidv4(), text, sender }],
      });

      this.setState({ textFieldValue: '' });
      const chatWindow = this.chatWindow.current;
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    }
  }

  handleChange(event) {
    this.setState({ textFieldValue: event.target.value });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      const { textFieldValue } = this.state;
      this.sendMessage(textFieldValue, 'me');
    }
  }

  render() {
    const { messages } = this.state;
    const messageElements = messages.map((message) => <Message key={message.id} message={message} />);
    return (
      <>
        <div className="message-field" ref={this.chatWindow}>{ messageElements }</div>
        <div className="text-field">
          <input
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            type="text"
            placeholder="Write a message..."
            value={this.state.textFieldValue}
          />
          <button onClick={() => this.sendMessage(this.state.textFieldValue, 'me')} type="button">Отправить сообщение</button>
        </div>
      </>
    );
  }
}