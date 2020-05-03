import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import './Notifications.css';


const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/been_tree.mp3`;
const notificationSound = new Audio(soundUrl);

class Notifications extends React.Component {
  //3 faze:mounting, updating, unmounting
  /*1)mounting:1.constructor,2.getderivatedstatefromprops,3.render,4.componentdidmount
    2)updating:1.getderivatedstatefromprops,2.shouldComponentUpdate(),3.render(),4.getSnapshotBeforeUpdate(),5.componentDidUpdate()
    3)unmounting:1.componentWillUnmount()
  */
  //metode
  //constructor
  constructor(props){
    super(props);
    this.state={
      count: 0,
      isAnimating: false,
      mute: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.notify = this.notify.bind(this)
  }

  componentDidMount(){
    this.countNotifications = setInterval(this.notify, 2000);
  }

  componentWillUnmount(){
    clearInterval(this.countNotifications);
  }

  notify(){
    if (this.state.mute) {
      return null
    }

    this.setState({
      count: this.state.count += 1,
      isAnimating: !this.state.mute ? true : false
    })

    notificationSound.play()
    setTimeout(() => this.setState({ isAnimating: false }), 1000)
  }

  handleClick(){
   this.setState({ mute: !this.state.mute })
    console.log(this.state)
  }

  render(){
    const { count, mute, isAnimating } = this.state
    return (
      <div onClick={ this.handleClick }>
        <Notification
          count={ count }
          isAnimating={ isAnimating }
          mute={ mute } />
      </div>
    )
  }
}

const NotificationIcon = () => (
  <svg width='42' height='40' viewBox='0 0 21 20'>
    <g transform='translate(2, 0)'>
      <path className='notification-bell__bow' d='M15,8.5 C15,5.43 12.86,2.86 10,2.18 L10,1.5 C10,0.671572875 9.32842712,0 8.5,0 C7.67157288,0 7,0.671572875 7,1.5 L7,2.18 C4.13,2.86 2,5.43 2,8.5 L2,14 L0,16 L0,17 L17,17 L17,16 L15,14 L15,8.5 Z' />
      <path className='notification-bell__clapper' d='M2.5,2 C2.64,2 2.77,2 2.9,1.96 C3.55,1.82 4.09,1.38 4.34,0.78 C4.44,0.54 4.5,0.27 4.5,0 L0.5,0 C0.5,1.1045695 1.3954305,2 2.5,2 L2.5,2 Z'  />
    </g>
  </svg>
 )

const Notification = ({ count, mute, isAnimating }) => (
  <div
    className={`notification-bell ${isAnimating ? 'is-animating' : ''} ${mute ? 'is-muted' : ''}`}
    data-count={ count > 9 ? '9+' : count }>
    <NotificationIcon />
  </div>
)

/*
ReactDOM.render(<NotificationContainer />, document.getElementById('artboard-1'))
ReactDOM.render(<NotificationContainer />, document.getElementById('artboard-2'))
*/

export default Notifications;
