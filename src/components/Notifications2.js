import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './Notifications.css';

//za stomp
const socket = new SockJS('https://log-server-si.herokuapp.com/ws');
const stompClient = Stomp.over(socket);
//zvuk notifikacije
const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/been_tree.mp3`;
const notificationSound = new Audio(soundUrl);

//koristeni izmijenjeni: zvonce sa https://codepen.io/patryklizon/pen/WEoNJd i react bootstrat drodpown
class Notifications extends React.Component {
  //3 faze:mounting, updating, unmounting
  /*
    1)mounting:1.constructor,2.getderivatedstatefromprops,3.render,4.componentdidmount
    2)updating:1.getderivatedstatefromprops,2.shouldComponentUpdate(),3.render(),4.getSnapshotBeforeUpdate(),5.componentDidUpdate()
    3)unmounting:1.componentWillUnmount()
  */
  //metode
  constructor(props){
    super(props);
    this.state={
      count: 0,
      isAnimating: false,
      mute: false
    }
    this.notify = this.notify.bind(this)
  }

  async componentDidMount(){
    //ucitat localStorage i definisat dataNotifikacije;localStorage je objekat
    const nizNotif=[];
    let dataNotifikacije=<div><Dropdown.Menu className="bootstrapiso">{nizNotif}</Dropdown.Menu></div>;//ubacujemo u div dinamicki, preko ref
    let refNotif=this.refs.notif_ek1;
    console.log('local '+JSON.stringify(localStorage));
    //popunit iz localStorage u nizNotif

    //dobavljanje notifikacije
    stompClient.connect({}, ()=>{
      console.log('konektovao sam se');
      stompClient.subscribe(`/topic/public_relations`, (notif)=>{
        console.log(notif);
        let e=JSON.parse(notif.body);
        console.log(e.payload);
        //handlanje notifikacije
        let idNoveNotifikacije=localStorage.length;
        localStorage.setItem(idNoveNotifikacije,JSON.stringify(e.payload));
        this.notify();
        //formirat element pomocu f-je formirajDropDownItem i dodat u nizNotif, kao u questions.js
      });
    }, (err)=>{
      console.log('error pri konekciji '+err);
    });

    ReactDOM.render(<div>{dataNotifikacije}</div>, refNotif);//ubacivanje u div
  }

  //metoda da zazvoni i poveca onaj broj
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

  render(){
    const { count, mute, isAnimating } = this.state;
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
          this.setState({count:0});
        }}
      >
      <Notification
        count={ count }
        isAnimating={ isAnimating }
        mute={ mute } />

        {children}
        &#x25bc;
      </a>
    ));

    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        </Dropdown.Toggle>
        <div ref="notif_ek1"></div>
      </Dropdown>
    )
  }
}
//fja za kreiranje Dropdown.Item od notifikacije
function formirajDropDownItem(){

}

//za izgled i animaciju zvonceta
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

export default Notifications;
