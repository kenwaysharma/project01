const axios = require('axios').default;
const {useState, useEffect} = require('react')
const {Link} = require('react-router-dom')

const Home = (props)=>{

const [state, setState] = useState([]);

useEffect(()=>{
    axios.get('http://localhost:5000/post/')
    .then((res)=>{
        console.log(res.data)
        setState(res.data)

        
    })
},[])
console.log("state",state)

const posts = 
    state.map(x=>{
        return(
            <div key={x._id}>
                <h1 >{x.title}</h1>
            </div>
            
        )
    })

console.log(posts)
    return(
        <div>
            <h1>This is the Home page!{state.msg}</h1>
            {posts}
            <Link to="/login">Login</Link>
        </div>
    )

}


export default Home;