interface CourseParts {
    parts :{
    name: string,
    exerciseCount: number
    }[]
}

export const Content = (props: CourseParts) => {
    return <>
        <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </>
}