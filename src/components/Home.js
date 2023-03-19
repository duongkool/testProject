import "./Home.scss";
const Home = () => {
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
          <button className="btn btn-lg btn-dark">
            Get started - it's free
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
