import { useAuth } from "../../context/LoginContext/LoginContext";

const Home = () => {
  const { userData } = useAuth();

  return (
    <div style={{ padding: "100px 20px" }}>
      <h1>Home Page</h1>
      <p>Hello {userData?.firstName}</p>
      <p>You are logged in as {userData?.email}</p>
    </div>
  );
};

export default Home;
