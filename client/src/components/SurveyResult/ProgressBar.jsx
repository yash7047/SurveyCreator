function ProgressBar(props) {
  const Parentdiv = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0df",
    borderRadius: 10,
    margin: "1em 0",
  };

  const Childdiv = {
    height: "100%",
    width: `${props.progress}%`,
    backgroundColor: props.bgcolor || "#007bff",
    borderRadius: 10,
    textAlign: "right",
    transition: "width 0.3s ease-in-out",
  };

  const progresstext = {
    padding: 10,
    color: "white",
    fontWeight: 500,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${Math.round(props.progress)}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
