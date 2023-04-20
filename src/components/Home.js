import "./Home.scss";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="homepage-content col-6">
        <h1 className="title-1">
          There's a better <br />
          way to ask
        </h1>
        <p className="title-2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </p>
        <div className="title-3">
          {user.auth === true 
          ?
          <button onClick={()=>navigate('/users')} className="btn btn-lg btn-dark">
            Doing Quiz Now  
          </button>
          :
          <button onClick={()=>navigate('/login')} className="btn btn-lg btn-dark">
            Get started - it's free
          </button>
        }
        </div>
      </div>
    </div>
  );
};
export default Home;
