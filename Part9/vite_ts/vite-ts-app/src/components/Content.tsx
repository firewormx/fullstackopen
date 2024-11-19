// interface CourseParts {
//     parts :{
//     name: string,
//     exerciseCount: number
//     }[]
// }
import { CoursePart, Part } from "../App";

export const Content = ({parts}: {parts: CoursePart[]}) => {
    return (
      <div>
        {parts.map(part => {
          return (
            <div key={part.name}>
              <Part part={part}/>
             </div>
          )
        }
        )}
      </div>
    )
}