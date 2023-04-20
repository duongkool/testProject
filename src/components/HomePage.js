
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const HomePage = (props) => {

const { user } = useContext(UserContext);
console.log(user);

  const navigate = useNavigate()

    return (
        <div className="homepage-containeer">
            <div className='homepage-content'>
                <h1 className='title-1'>There's a better <br />way to ask</h1>
                <p className='title-2'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead—and make everyone happy.
                </p>
                <div className='title-3'>
                    {user.auth === true
                    ?
                    <button onClick={()=>navigate('/users')}>Doing Quiz Now</button>
                    :
                    <button onClick={()=>navigate('/login')}>Get started-it's freenbnb</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;