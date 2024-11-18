interface CourseName {
    name: string
}

export const Header = (props: CourseName) => {
    return   <h1>{props.name}</h1>
}