import "../App.css";
import spiderMan from "../assets/spider-man.jpg";

function Home() {
  return (
    <div className="page home">
      <h1>
        This is <span className="highlight">Samarth Raina</span>! 🚀
      </h1>

      <div className="image-container">
        <img src={spiderMan} alt="Iron Spider" />
      </div>
    </div>
  );
}

export default Home;
