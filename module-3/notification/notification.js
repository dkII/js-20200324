export default class NotificationMessage {
  //
  element;
  root = document.querySelector('body');

  // remove all exist notifications from DOM
  removeAllNotifications () {
    let notifications = this.root.querySelectorAll('.notification');
    if (notifications?.length) {
      notifications.forEach((node) => node.remove());
    }

    //clear timer -- не уверен что сюда нужно очистку таймера выносить, как лучше?
    if (NotificationMessage.timerID) {
      console.log("clear timer " + NotificationMessage.timerID);
      clearTimeout(NotificationMessage.timerID);

    }
  }
  
  //append notification to DOM
  appendToDOM() {
    this.root.append(this.element);
    NotificationMessage.timerID = setTimeout(()=> {
      this.removeAllNotifications();
    }, this.duration);
    console.log("create timer " + NotificationMessage.timerID)
  }

  // запутался с параметрами, наверно можно лучше организовать -деструктуризаци и значени по умолчанию?
  constructor(
    title = 'success',
    prop = {
      msg: 'Hello world',
      duration: 20000,
      type: 'success'
    }
   ) {

    //read resp prop 
    let { msg= 'Hello world', duration= 20000, type= 'success' } = prop;

    this.title = title;
    this.type = type;
    this.duration = duration;
    this.msg = msg;

    //generate html template 
    this.render();
  }

  get template () {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.title}</div>
          <div class="notification-body">
            ${this.msg}
          </div>
        </div>
      </div>
    `;
  }

  show() {
    this.removeAllNotifications();
    this.appendToDOM();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }
  
  update ({headerData, bodyData}) {
    //todo 
    //don't need maybe?
  }

  destroy() {
    this.element.remove();
  }
}
