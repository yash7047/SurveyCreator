function ProgressBar(props) {
       const Parentdiv = {
        height: 30,
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: 10,
        margin: '1em 3em',
      }
      
      const Childdiv = {
        height: '100%',
        width: `${props.progress}%`,
        backgroundColor: 'rgba(7, 0, 31, 0.932)',
        borderRadius:10,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 500
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${Math.round(props.progress)}%`}</span>
      </div>
    </div>
    )
}

export default ProgressBar;