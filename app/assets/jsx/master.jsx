

var Test = React.createClass({
    
    getDefaultProps: function() {
        return {
            text : 'String coming from getDefaultProps',
        }
    },
    
    render: function() {
     
        return (
            <div className="col-md-6">ES5 syntax! {this.props.text}</div>
        )
    }
});

ReactDOM.render(<Test/> , document.getElementById('app'));