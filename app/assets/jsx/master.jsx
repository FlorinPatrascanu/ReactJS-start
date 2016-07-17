var h =  {
  rando : function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  loadSlickSlider: function(arg) {  	
   		$(arg).slick({
   			infinite: true,
   			dots: true,
   			arrows: false,
   			autoplay: true,
   			speed: 1000,
   			autoplaySpeed: 4000,
   			cssEase: 'ease-out',
   			fade: true,
   			mobileFirst: true,
   			pauseOnHover: false
   		});
  }
}  

var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var Link = window.ReactRouter.Link;
var browserHistory = window.ReactRouter.browserHistory;
var ReactCSSTransitionGroup = window.React.addons.CSSTransitionGroup;

var HeaderReact =  React.createClass({
	render: function(){
		return(
			<header>
				<div className="header">
					<div className="header-upper">
						<div className="container">
							<div className="row">
								<div className="col-xs-12">
									<div className="row">
											<nav className="header-nav col-sm-6">
												<Navigation source="/resources/navigation.json" target="headerNav" />
											</nav>
											<div className="header-upper-content col-sm-6">
												<div className="header-login">
													<a href="/myaccount.html"><i className="ion-person"></i> Daniel`s Account </a>
												</div>
												<form method="GET" action="/search.html" className="header-search" autocomplete="off" spellcheck="false">
													<input type="search" name="eComQuery" id="q" placeholder="Search" />
													<button type="submit">
														<i className="ion-ios-search"></i>
													</button>
												</form>
											 	<div className="header-mail">
											 		<button type="button"><i className="ion-ios-email"></i></button>
											 	</div>
											 	<div className="header-phone">
											 		<button type="button"><i className="ion-android-call"></i></button>
											 	</div>	
											</div>
									</div>
								</div>		
							</div>
						</div>
					</div>
					<div className="header-middle">
						<div className="container">
							<div className="row">
								<div className="col-xs-12">				
									<div className="logo"><h1><a href="/">Eva <small>| Only for you.</small></a></h1></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<nav className="nav-main" role="navigation">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<Navigation source="/resources/navigation.json" target="mainNav" active="2" />		
							</div>			
						</div>
					</div>
				</nav>
			</header>
		);
	}
});
var Navigation = React.createClass({
	getInitialState: function(){
		return {
			data: []
		};
	},
	componentWillMount: function() {
    $.getJSON(this.props.source, function(result) {
	        this.setState({
	          data: result[this.props.target]
	        });	
	  }.bind(this));
  },  
 eachItem: function(item, i) { 	
      return (
              <li key={i}
                  index={i}
                  className={(i === this.props.active - 1) ? 'dropdown active' : 'dropdown'}
              ><a href={item.url}>{item.name}</a></li>
          );
  },
  render: function() {
      return (
      	<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      		<ul>
      			{this.state.data.map(this.eachItem)}
          </ul>
        </ReactCSSTransitionGroup>  

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
	remove: function() {
    this.props.onRemove(this.props.index);
  },  
	renderDisplay: function(){		
    return (
			<a href={this.props.source.url} ><img src={this.props.source.src} title={this.props.source.title} /></a>
		);
  },
  renderConfig: function(){
  	return (
  		<div className="editing-banner">
				<a href={this.props.source.url} ><img src={this.props.source.src} title={this.props.source.title} /></a>
				<button type="button" className="delete-banner" onClick={this.remove} ><i className="fa fa-trash-o"></i></button>				
			</div>
		);
  },
	render: function(){
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
			data: {},
			fluid: false,
			columnNumber: 3,
			editing: false,
			db_resource: []
		};
	},
	componentWillMount: function() {	
		this.setState({columnNumber: this.props.columns === "" ? this.state.columnNumber : this.props.columns});
		this.setState({data: this.props.source.items});
		this.setState({fluid: this.props.fluid === undefined ? this.state.fluid : true});
		// this.setState({db_resource: this.props.source.db_load});
		var db_type = this.props.source.db_load; 
		$.getJSON("/resources/db_banners.json", function(result) { 
				var resultArray = result[db_type];
        this.setState({
          db_resource: resultArray
        });	
	  }.bind(this));
  },  
  // componentDidMount: function() {
  // 	console.dir(this.state.db_resource);
  // },
  componentDidMount: function() {
  	// var _this = this;
  	// var fluidProp = _this.props.fluid === undefined ? _this.state.fluid : true;
  	// setTimeout(function(){
  	// 	_this.setState({fluid: fluidProp});  	
  	// 	console.log(_this.containerClass());
  	// },500);
  	
  },
	containerClass: function(){
		if(this.state.fluid === true) {
			return "container-fluid";
		} else {
			return "container";
		}
	},
	handleColumnNumber: function() {
    var value = this.refs.range.value;
    if (value == 1 || value == 2 || value == 3 || value == 4 || value == 6 || value == 12) {
    	this.setState({columnNumber: value});
    }    
  },
  handleFluidWrapper: function(){
  	var value = !this.state.fluid;
  	this.setState({fluid: value});  	
  },	
	dynamicClass: function(){
  	 var columnClass = 12 / this.state.columnNumber;
     return "item col-sm-" + columnClass;
  },
  edit: function(){
		var value= !this.state.editing;
		this.setState({editing: value});
	},
	add: function() {
	  var arr = this.state.data;
	  var db_arr = this.state.db_resource;
	  var randomItem = h.rando(db_arr);	 
	  arr.push(randomItem);
	  this.setState({data: arr});
  },
  remove: function(i) {
    var arr = this.state.data;
    arr.splice(i, 1);
    this.setState({data: arr});
  },
	eachItem: function(item, i) {		
      return (      		
			  <div key={i} className={this.dynamicClass()}>
      	  <Banner index={i} source={item} editing={this.state.editing} onRemove={this.remove} />
        </div>      	
      );
  } , 
	renderDisplay: function(){	
		// console.log(this.state.fluid);	
		// console.log(this.containerClass());
		return (		
			<div className="row-wrap">	 
				<div className={this.containerClass()}>	
					<div className="configuration">
						<button type="button" className="edit-trigger" onClick={this.edit}><i className="fa fa-cog"></i></button>
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
							<button type="button" className="edit-trigger" onClick={this.edit}><i className="fa fa-cog"></i></button>
							<div className="content">
								<p>Columns: <span className="modifier">{this.state.columnNumber}</span></p>				
								<input onChange={this.handleColumnNumber} type="range" ref="range" name="columnNumbers" min="1" max="12" list="numbers"  defaultValue={this.state.columnNumber} />
								<datalist id="numbers">
								  <option>1</option>
								  <option>2</option>
								  <option>3</option>
								  <option>4</option>
								  <option>6</option>
								  <option>12</option>
								</datalist>								
								<button type="button" className="conf-switch-width" data-fluid={this.state.fluid} onClick={this.handleFluidWrapper} >Switch width</button>
								<button type="button" className="conf-add-item" onClick={this.add}>Add new banner</button>
						</div>
					</div>
					<div className="row">
						{this.state.data.map(this.eachItem)}
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
var GenerateBanners = React.createClass({
	getInitialState: function(){
		return {
			data: []
		};
	},
	componentWillMount: function() {
		this.setState({columnNumber: this.props.columns});		
    $.getJSON(this.props.source, function(result) {	      
        this.setState({
          data: result
        });	
	  }.bind(this));
  },
 	eachItem: function(item, i) {
    return (
    	<GenerateRow key={i} source={this.state.data[i]} columns={this.props.columns} fluid={this.props.fluid} />
    );
  },  
  renderDisplay: function(){
  	return (
  		<div className="banner-zone">
    		{this.state.data.map(this.eachItem)}
      </div>
    );
  },
  render: function() {     
	  return this.renderDisplay();
  }
});
// var Home = React.createClass({
// 	render: function(){
// 		return (
// 			 <div>HELLOW HOMEPAGE</div>
// 		);
// 	}
// });




ReactDOM.render(<HeaderReact />, document.getElementById('react-header'));

// ReactDOM.render((

// 	<Router history={browserHistory} >
//     <Route path="/category" component={Home} />
//   </Router>
// 	), document.getElementById('homepage'));



// ReactDOM.render(<Navigation source="/resources/navigation.json" target="mainNav" active="2" />, document.getElementById('react-main-navigation'));
// ReactDOM.render(<Navigation source="/resources/navigation.json" target="headerNav" />, document.getElementById('react-header-navigation'));

if (document.getElementById('react-homepage-middle-banners') !== null ){
	ReactDOM.render(<GenerateBanners source="/resources/homepage.json" columns="3" />, document.getElementById('react-homepage-middle-banners'));
}
if (document.getElementById('react-homepage-lower-banners') !== null ){
	ReactDOM.render(<GenerateBanners source="/resources/homepage-lower-banners.json" columns="2" />, document.getElementById('react-homepage-lower-banners'));
}
if (document.getElementById('react-wishlist') !== null ){
	ReactDOM.render(<GenerateBanners source="/resources/wishlist.json" columns="6" />, document.getElementById('react-wishlist'));
}
if (document.getElementById('react-special-offers') !== null ){
	ReactDOM.render(<GenerateBanners source="/resources/homepage-lower-banners.json" columns="2" />, document.getElementById('react-special-offers'));
}
if (document.getElementById('react-category-head-banner') !== null ){
	ReactDOM.render(<GenerateBanners source="/resources/category.json" columns="1" fluid="true" />, document.getElementById('react-category-head-banner'));
}