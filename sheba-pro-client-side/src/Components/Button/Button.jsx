import "../Button/button.css";
const Button = ({ text }) => {
  return (
    <div className="my-10">
      <button className="button-82-pushable" role="button">
        <span className="button-82-shadow"></span>
        <span className="button-82-edge"></span>
        <span className="button-82-front text">{text}</span>
      </button>
    </div>
  );
};

export default Button;
