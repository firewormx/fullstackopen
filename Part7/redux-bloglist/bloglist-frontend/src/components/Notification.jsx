import { useSelector} from "react-redux";

const Notification = () => {
const successStyle = {
    color: 'green',
    background: 'lightgrey',
    border: '1px solid green',
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    marginBottom: 10
}

const errorStyle = {
  color: 'red',
  fontSize: 20,
  background: 'white',
  border: '1px solid red',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10
}

const notification = useSelector(({notification}) => {
 return notification
})

  if(notification ===(null || '')) {
    return null
  }else if(notification.toLowerCase().includes('fail')){
    return <div style={errorStyle}>{notification}</div>
  }else{
    return <div style={successStyle}>{notification}</div>
  }
};

export default Notification;
