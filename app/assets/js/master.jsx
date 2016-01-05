
var Navigation = React.createClass({
	getInitialState: function(){
		return {
			data: []
		}
	},
	componentDidMount: function() {
    $.getJSON(this.props.source, function(result) {     	
	      if (this.isMounted()) {
	        this.setState({
	          data: result[this.props.target]
	        });	        
	      }
	  }.bind(this))
  },  
 eachItem: function(item, i) { 	
      return (
              <li key={i}
                  index={i}
                  className={(i === this.props.active - 1) ? 'dropdown active' : 'dropdown'}
              ><a href={item.url} >{item.name}</a></li>
          );
  },
  render: function() {
      return (
      		<ul>
      			{this.state.data.map(this.eachItem)}
          </ul>

      );
  }
});
var NewsletterBlock = React.createClass({
	render: function(){
		return (
			<div className={this.props.className}>
				<div className="item-newsletter">
					<div className="newsletter">
						<p>Stay in touch with our newest collections</p>
						<input type="email" placeholder="Enter your email address." />
						<button type="button">Subscribe to Newsletter</button>	
					</div>
				</div>
			</div>	
		);
	}
});

var Banner = React.createClass({
	getInitialState: function(){
		return {	
			imageSrc: "",
			title: "Placeholder Title",
			url: "",
			newItem: true,
			data: [
				{
					"title": "Half",
					"src": "assets/img/eva-banner-wide-1.jpg",
					"url": "#"
				},
				{
					"title": "Half",
					"src": "assets/img/eva-banner-wide-2.jpg",
					"url": "#"
				}
			]	
		}
	},
	remove: function() {
    this.props.onRemove(this.props.index);
  },
  eachItem: function(item, i) {
      return (      		
			  <button key={i} className="col-xs-2">
			  	<img index={i} src={item.src} title={item.title} />
        </button>      	
      );
  },  
	renderDisplay: function(){
    return (
			<a href={this.props.url} ><img src={this.props.imageSrc} title={this.props.title} /></a>
		)    
  },
  renderConfig: function(){
  	return (
  		<div className="editing-banner">
				<a href={this.props.url} ><img src={this.props.imageSrc} title={this.props.title} /></a>
				<button type="button" className="delete-banner" onClick={this.remove} ><i className="fa fa-trash-o"></i></button>				
			</div>
		)
  },
  renderNewItem: function() {
  	return (
  		<div className="editing-banner">
				<a href={this.props.url} ><img src={this.props.imageSrc} title={this.props.title} /></a>
				<button type="button" className="delete-banner" onClick={this.remove} ><i className="fa fa-trash-o"></i></button>	
				{this.state.data.map(this.eachItem)}	
			</div>
		)
  	
  },
	render: function(){
		 if (this.props.newItem) {
	    	return this.renderNewItem();
	    }	
		 if (this.props.editing === true) {
	       return this.renderConfig();
	    } else {
	      return this.renderDisplay();
	    }

	}
});
var GenerateRow = React.createClass({
	getInitialState: function(){
		return {
			data: [],
			fluid: false,
			columnNumber: 3,
			editing: false
		}
	},
	componentDidMount: function() {		
		this.setState({columnNumber: this.props.columns === "" ? this.state.columnNumber : this.props.columns});
		this.setState({editing: this.props.editing === "" ? this.state.editing : this.props.editing});
		this.setState({data: this.props.source});
  },  
	containerClass: function(){
		if(this.state.fluid === true) {
			return "container-fluid"
		} else {
			return "container"
		}
	},
	handleColumnNumber: function(e) {
    var value = e.target.value;
    this.setState({columnNumber: value});
  },	
	dynamicClass: function(){
  	 var columnClass = "" + 12 / this.state.columnNumber;
     return "item col-sm-" + columnClass
  },
  edit: function(){
		var value= !this.state.editing;
		this.setState({editing: value});
	},
	add: function() {
	  var arr = this.state.data;
	  arr.push(this.state.data[0]);
	  this.setState({data: arr});
  },
  remove: function(i) {
    var arr = this.state.data;
    arr.splice(i, 1);
    this.setState({data: arr});
  },
  addNewsletter: function(){
  	if (this.props.newsletter) {
  		return (
  			<NewsletterBlock className={this.dynamicClass()} />
  		)				
		} 
  },
	eachItem: function(item, i) {
      return (      		
			  <div key={i} className={this.dynamicClass()}>
      	  <Banner index={i} url={item.url} imageSrc={item.src} title={item.title} editing={this.state.editing} onRemove={this.remove} />
        </div>      	
      );
  } , 
	renderDisplay: function(){
		return (		
			<div className="row-wrap">	 
			<div className={this.containerClass()}>	
				<div className="configuration">
					<button type="button" className="edit-trigger" onClick={this.edit} data-toggle="tooltip" data-placement="top" title="Row Configuration"><i className="fa fa-cog"></i></button>
				</div>
				<div className="row">
					{this.state.data.map(this.eachItem)}												
				</div>
			</div>
			</div>
		);
	},
	renderConfig: function(){
		return (
			<div className="row-wrap edit">
				<div className={this.containerClass()}>
					<div className="configuration">
							<button type="button" className="edit-trigger" onClick={this.edit} data-toggle="tooltip" data-placement="top" title="Row Configuration"><i className="fa fa-cog"></i></button>
							<div className="content">
								<p>Columns: <span className="modifier">{this.state.columnNumber}</span></p>				
								<input onChange={this.handleColumnNumber} type="range" name="columnNumbers" min="1" max="12" list="numbers" defaultValue={this.state.columnNumber} />
								<datalist id="numbers">
								  <option>1</option>
								  <option>2</option>
								  <option>3</option>
								  <option>4</option>
								  <option>6</option>
								  <option>12</option>
							</datalist>
						</div>
					</div>
					<div className="row">
						{this.state.data.map(this.eachItem)}	
						<div className="col-xs-12">
							<button type="button" className="add-banner" onClick={this.add}>Add new banner</button>
						</div>					
					</div>
				</div>
			</div>
		);
	},
	render: function(){		
	    if (this.state.editing === true) {
	      return this.renderConfig();
	    } else {
	      return this.renderDisplay();
	    }
	}
});
var Banners = React.createClass({
	getInitialState: function(){
		return {
			data: [],
			editing: false
		}
	},
	componentDidMount: function() {
		this.setState({columnNumber: this.props.columns});
    $.getJSON(this.props.source, function(result) {
	      if (this.isMounted()) {
	        this.setState({
	          data: result
	        });	        
	      }
	  }.bind(this))
  },  
	edit: function(){
		var value= !this.state.editing;
		this.setState({editing: value});
	},
	remove: function(i) {
    var arr = this.state.data;
    arr.splice(i, 1);
    this.setState({data: arr});
  },
  addNewsletter: function(){
  	if (this.props.newsletter) {
  		return (
  			<NewsletterBlock className={this.dynamicClass()} />
  		)				
		} 
  },
 	eachItem: function(item, i) {
      return (
      	<GenerateRow key={i} editing={this.state.editing} source={this.state.data[i]} columns={this.props.columns} newsletter="true" />
      );
  },  
  renderDisplay: function(){
  	return (
      		<div className="banner-zone">      			 
	      	
	      				{this.state.data.map(this.eachItem)}
	      	
          </div>
      );
  },
  renderConfig: function(){
  	return (
      		<div className="banner-zone edit">      			
	      		
	      				{this.state.data.map(this.eachItem)}
	      		         
          </div>
      );
  },
  render: function() {
      if (this.state.editing) {
	       return this.renderConfig();
	    } else {
	      return this.renderDisplay();
	    }
  }
});
ReactDOM.render(<Navigation source="http://localhost:3000/resources/navigation.json" target="mainNav" active="2" />, 
    document.getElementById('react-main-navigation'));
ReactDOM.render(<Navigation source="http://localhost:3000/resources/navigation.json" target="headerNav" />, 
    document.getElementById('react-header-navigation'));
ReactDOM.render(<Banners source="http://localhost:3000/resources/homepage.json" newsletter="true" columns="3" />, 
    document.getElementById('react-homepage-middle-banners'));
ReactDOM.render(<Banners source="http://localhost:3000/resources/homepage-lower-banners.json" columns="2" />, 
    document.getElementById('react-homepage-lower-banners'));
