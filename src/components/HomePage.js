import videoHomePage from '../../assets/videohomepage.mp4';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
const HomePage = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()

    return (
        <div className="homepage-containeer">
            <video autoPlay muted loop>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <h1 className='title-1'>There's a better <br />way to ask</h1>
                <p className='title-2'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead—and make everyone happy.
                </p>
                <div className='title-3'>
                    {isAuthenticated === false?
                    <button onClick={()=>navigate('/login')}>Get started-it's free</button>
                    :
                    <button onClick={()=>navigate('/users')}>Doing Quiz Now</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;