function Campaign(props) {
  const { title, description, currentAmount, goalAmount } = props.data;
  const progress = (currentAmount / goalAmount) * 100;
  const style = { width: `${progress}%` };
  return (
    <div className="campaign">
      <p className="title">
        <b>Title: </b>
        {title}
      </p>
      <p className="description">
        <b>Descrition: </b>
        {description}
      </p>
      <p className="progress">
        <b>Progress: </b>Raised ${currentAmount} of ${goalAmount} goal
      </p>
      <div className="progress-bar">
        <div className="bar" style={style}></div>
      </div>
      <button>Donate Now</button>
    </div>
  );
}

export default Campaign;
