/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Person = ({ person, onClose }) => {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street} {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={onClose}>close</button>
      </div>
    )
  }
  
  export default Person