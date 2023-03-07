import { Link } from "react-router-dom"


const ChildDetails = ({ child }) => {
    const h2Style = {
        margin: '0 10px', 
        padding: '10px 0px 0px 0px',
        fontWeight: 'bolder',
        fontSize: '26px',
    }
    const h3Style = {
        margin: '0 10px', 
        padding: '10px 0px',
        fontWeight: 'bold',
        fontSize: '16px',
    }
    const h4Style = {
        margin: '0 10px', 
        padding: '0px 0px 10px 0px',
        fontWeight: 'lighter',
        fontSize: '16px',
    }
    return (
    
        <div className="child-details">
            {/* <ButtonBig text={child.name} /> */}
            <Link to={`/children/${child.id}`} >
            <h2 style={h2Style} >{child.name}</h2>
            <h3 style={h3Style} >Level: {child.level.name}</h3>
            <h4 style={h4Style} >Subjects: {child.subjects.map(subject=>(
                `${subject.name}` 
            )).join(', ')}</h4>
            </Link>
        </div>
    
    )
}

export default ChildDetails