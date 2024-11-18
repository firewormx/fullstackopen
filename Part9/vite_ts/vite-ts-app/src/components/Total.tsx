  interface Total {
    total: number
  }

export const Total = (props: Total) => {
return <p>   Number of exercises {props.total}</p>
}