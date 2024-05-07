import { useLogin } from "../../context/LoginContext/LoginContext";

const Home = () => {
  const {userData} = useLogin();
    return (
      <div style={{height: "200vh", padding: "100px 20px"}}>
        <h1>Home Page</h1>
        <p>Hello {userData?.name}</p>
      </div>
    );
  };
  
  export default Home;