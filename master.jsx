// wrapper
var Test = React.createClass({
    
    getInitialState: function() {
        return {
            data : {},
            searchString : ''
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
//        $('#search , #options').children().removeClass("children");
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
            class : 'row',
            url : 'resources/test.json'
        }
    },
    
    
    addToList: function(e, name , value) {
//        console.log(name + ", " + value);
        
        var out = {
            "name": name,
            "value": value
        };
        
        
        // get the results array
        var results = this.state.data.results;
        
        // get the data 
        var data = this.state.data;
        
        // push the recieved object to the empty results array
        results.push(out);
        
        // update the results array in the state
        data.results = results;
        
//        console.log(results);
        
        
        // update the state
        this.setState({
            data: data
        })
        
        
    },
    
    removeFromList: function(e , i) {
        e.preventDefault();
        
        // get event index
        var index = $(e.currentTarget).attr("data-index");
        
        // get the results array
        var results = this.state.data.results;
        
        // get the data
        var data = this.state.data;
        
        // remove the item from the array
        results.splice(index , 1);
        
        // update the results
        data.results = results;
        

        // update the state
        this.setState({
            data: data
        })
    },
    
    handleInputChange: function(e) {
        
        var that = this;
        
        $.getJSON('resources/search.json' , function(result){
           
            console.log(result);
           
        }).done(function(response){
            console.log("done");
            
            // get data object
            var data = that.state.data;

            // assign the response to the empty search array 
            data.search = response;
            

            // update the state
            that.setState({
                data: data
            })
            
        });
        
        this.setState({
            searchString: e.currentTarget.value
        });
        
    },


    
    render: function() {
        var options = this.state.data.options === undefined ? [] : this.state.data.options;
        
        var search = this.state.data.search === undefined ? [] : this.state.data.search;
        


        return (
                 <div id = "controller-wrapper">        
                    <div className = "container-fluid">    
                        <div className={this.props.class}>

                            <div className="col-md-6 col-sm-6 col-xs-6" style = {{borderRight: "0.2px solid black"}}>
                               <div id="options-list">
                                    
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li role="presentation" className="active">
                                               <a href="#options" aria-controls="options" role="tab" data-toggle="tab">Options</a>
                                            </li>
                                            <li role="presentation">
                                               <a href="#search" aria-controls="search" role="tab" data-toggle="tab">Search</a>
                                            </li>
                                        </ul>
                                        
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane active" id="options">
                                                   <OptionList addToList = {this.addToList} options = {options}/>
                                            </div>
                                            <div role="tabpanel" className="tab-pane" id="search">
                                                <div className="controller-search">
                                                    <input value={this.state.searchString}
                                                           onChange={this.handleInputChange}
                                                           className="form-control search-list-input" 
                                                           type="text" 
                                                           id="searchList" 
                                                           placeholder="Search..."
                                                    />
                                                </div>
                                                    <OptionList addToList = {this.addToList} options = {search}/>
                                            </div>
                                        </div>
                                    
                               </div>
                            
                               <button style = {{marginTop: "1rem"}} className="btn btn-primary">Save</button>                               
                            </div>
                            
                            
                            
                            <div className="col-md-6 col-sm-6 col-xs-6" style = {{paddingLeft: "32px"}}>
                               <div id="results-list">
                                    <b>Results</b>
                                    <OptionResults source = {this.state.data.results} removeItem = {this.removeFromList}/>
                               </div>
                            </div>

                        </div>
                    </div>
                </div>
        )
    }
});



// option results
var OptionResults = React.createClass({
    
    eachItem: function(item , i) {
        return (
            <div key = {i}>
                <div className="items-container" > 
                    {item.name}
                    <span data-index={i} onClick = {this.props.removeItem} style = {{marginLeft: "1rem"}} className="fa fa-times"></span>
                </div>
            </div>
        )
    },
    
    render: function() {
        
        var output = this.props.source === undefined ? [] : this.props.source;
//        console.log(output);
   
        
        return (
            <div>    
                {output.map(this.eachItem)}
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
//        console.log("child-name: " + name + " child-value: " + value);
//        console.log(this.props.options[index]);
        this.props.addToList(e, name , value);
        
        
    },
    
    
    eachItem: function(item , i) {
        var options = item.children ===  undefined ? [] : item.children;
               
        if(_.size(item.children)) {
            
            return (
                
                    <div key={i} className="hasChildren">
                        <button className="open"><i className="fa fa-plus"></i></button>
                        
                        <div className="items-container" onClick = {this.addToList} data-index={i}>
                            {item.name}
                        </div>
                        <OptionList addToList = {this.props.addToList} options = {options}/>
                    </div>
                
            )
        } else {
            return (
                    <div key={i}>   
                       <div className="items-container"  onClick = {this.addToList} key={i} data-index={i}>
                           {item.name}
                       </div>
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
