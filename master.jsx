// wrapper
var Test = React.createClass({
    
    getInitialState: function() {
        return {
            data : {}
        }
    },
    
    componentWillMount: function() {
        
        $.getJSON(this.props.url , function(result){
           
           this.setState({
               data: result
           })
           
        }.bind(this));
        
    },
    componentDidMount: function(){
        $('#options-list').children().removeClass("children");
        $('body').on("click", "#options-list button.open", function(e){
            e.preventDefault();
//            console.log($(this).parent().children(".children")[0]);
            $(this).find(".fa").toggleClass("fa-plus").toggleClass("fa-minus");
            $(this).parent().children(".children").eq(0).toggleClass("show");
        });
    },
    getDefaultProps: function() {
        return {
            text : 'From master component',
            class : 'row myClass',
            url : 'resources/test.json'
        }
    },
    
    
    addToList: function(e, name , value) {
                  console.log(name + ", " + value);
    },
    
    


    
    render: function() {
        var options = this.state.data.options === undefined ? [] : this.state.data.options;


        return (
            <div className={this.props.class}>
           
                <div className="col-md-6">
                   <div id="options-list">
                        <OptionList addToList = {this.addToList} options = {options}/>
                   </div>    
                </div>
                <div className="col-md-6">
                    
                </div>
                
            </div>
        )
    }
});


// option list
var OptionList = React.createClass({
    
    addToList: function(e){
        e.preventDefault();
        var index = $(e.currentTarget).attr("data-index");
        var name = this.props.options[index].name;
        var value = this.props.options[index].value;
        console.log("child-name: " + name + " child-value: " + value);
        console.log(this.props.options[index]);
        this.props.addToList(e, name , value);
        
    },
    
    
    eachItem: function(item , i) {
        var options = item.children ===  undefined ? [] : item.children;
               
        if(_.size(item.children)) {
            
            return (
                
                    <div key={i} className="hasChildren">
                        <button className="open"><i className="fa fa-plus"></i></button>
                        <button onClick = {this.addToList} data-index={i} className="btn btn-primary">Name: {item.name} - Value: {item.value} </button>
                        <OptionList addToList = {this.props.addToList} options = {options}/>
                    </div>
                
            )
        } else {
            return (
                    <div key={i}>
                       <button onClick = {this.addToList} className="btn btn-default" key={i} data-index={i} >{item.name} - {item.value}</button>
                    </div>
            )
        }
    },

    render: function() {
        
        var output = this.props.options;

        return (
            <div className="children">
                {output.map(this.eachItem)}
            </div>
        );
    }
});

ReactDOM.render(<Test/> , document.getElementById('app'));
