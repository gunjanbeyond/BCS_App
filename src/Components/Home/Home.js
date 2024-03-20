import React,{ useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = "https://localhost:7199/WeatherForecast/GetWeatherForecastItem"; 
//const baseURL = "https://jsonplaceholder.typicode.com/posts";

const Home = () => {

    // const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [products, setProducts] = useState([])

    React.useEffect(() => {
        debugger;
        // axios.get(`${baseURL}/4`).then((response) => {
        //     debugger;
        //   setPost(response.data);
        // });

            axios.get(`${baseURL}`).then((response) => {
                debugger;
            setProducts(response.data);
             });

      }, []);
      console.log(products);
    
      function createPost() {
        debugger;
        axios
          .post(baseURL, {
            title: "Hello World!",
            body: "This is a new post."
          })
          .then((response) => {
            setPost(response.data);
          });
      }

      if (!post) return "No post!"

    return (
        <div>
            <h1>Welcome to Home Component</h1>
            <br></br>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
};
export default Home;