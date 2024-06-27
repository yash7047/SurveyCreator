function OptionCreator(props) {
  return (
    <div className="OptionCreator">
      <input
        id={props.index}
        type="text"
        className="form-control"
        onChange={props.onChange}
      />
    </div>
  );
}

export default OptionCreator;
