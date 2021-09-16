import React, {useState, useEffect} from "react"
import './students.css';
import Student from "../student/student"


function Students() {

  const [response, setResponse] = useState([])
  const [open, setOpen] = useState([])
  const [tag, setTag] = useState([])
  const [temp, setTemp] = useState([false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,false, false, false, false, false])


  useEffect(() => {
    const data = () => {
      fetch("https://api.hatchways.io/assessment/students").then(response => response.json()).then(data => {
        setResponse(data.students)
        let booleans = []
        data.students.map(element => {
          booleans.push(false)
        })
        setOpen(booleans)
      })
    }
    data()


  }, [])

  console.log(response)
  console.log(open)


  useEffect(() => {
    setOpen(temp)
  }, [temp])

  const tags = (event) => {

    if(event.key === "Enter"){
      setTag([...tag, event.target.value])
      event.target.value = ""
    }
  }

console.log("OPEN", open)
console.log("TEMP", temp)
  return (
    <div>
      {response.length?(response.map((student, index) => {
        return(
          <div className="student">
          <div><img src={student.pic} alt=""/></div>
          <div>
            <h2>{student.firstName}</h2>
            <p>EMAIL: {student.email}</p>
            <p>COMPANY:{student.company}</p>
            <p>SKILL:{student.skill}</p>
            <p>AVERAGE:{(student.grades.reduce((accumulator, currentValue) => (parseInt(accumulator) + parseInt(currentValue))))/student.grades.length}%</p>
            {open[index] === true?(
              <div>
                <p>TEST1:{student.grades[0]}%</p>
                <p>TEST2:{student.grades[1]}%</p>
                <p>TEST3:{student.grades[2]}%</p>
                <p>TEST4:{student.grades[3]}%</p>
                <p>TEST5:{student.grades[4]}%</p>
                <p>TEST6:{student.grades[5]}%</p>
                <p>TEST7:{student.grades[6]}%</p>
                <p>TEST8:{student.grades[7]}%</p>
                <p>{tag.join(" ")}</p>
                <input type="text" placeholder="Add Tags" onKeyPress={(event) => tags(event)}/>
              </div>
            ):""
          }
          </div>
          <div className="plus" onClick={(event) => {
            if(temp[index] === true){
              let copy = [...temp]
              copy[index] = false
              setTemp(copy)
            }else{
              let copy = [...temp]
              copy[index] = true
              setTemp(copy)
            }
          }}>{open[index]?(<div>-</div>):(<div>+</div>)}</div>
          </div>
        )
      })):""
      }
    </div>
  );
}

export default Students;
