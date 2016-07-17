var GenerateSlider = React.createClass({
	getInitialState: function(){
		return {
			data: [],
			id: 0,
			type: "",
			slides: 0,
			editing: false,
			fluid: true,
		};
	},
	componentWillMount: function(){
		var index = this.props.id;
		$.getJSON(this.props.source, function(result) {								
        this.setState({
          data: result[index].items,
        });	
        this.setState({id: this.props.id});
        this.setState({type: this.props.type});
        this.setState({slides: this.props.slides});
	  }.bind(this));	
	},
	componentDidMount: function(){
		var _this = this;
		setTimeout(function(){
			h.loadSlickSlider(_this.refs.slider);
		}, 0);
	},
	componentDidUpdate: function(){	
			console.log("updated");			
	},
	edit: function(){
		var value= !this.state.editing;
		this.setState({editing: value});
	},
	containerClass: function(){
		if(this.state.fluid === true) {
			return "container-fluid";
		} else {
			return "container";
		}
	},
	columnClass: function(){
		if(this.state.fluid === true) {
			return "clearfix";
		} else {
			return "col-xs-12";
		}
	},		
  handleFluidWrapper: function(){
  	var value = !this.state.fluid;
  	this.setState({fluid: value});  	
  },	
	eachItem: function(item, i) {
    return (
    	<div key={i}>
    		<Link to={item.url}><img src={item.src} alt={item.title}/></Link>
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
							<button type="button" className="conf-switch-width" data-fluid={this.state.fluid} onClick={this.handleFluidWrapper} >Switch width</button>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<div ref="slider" className="slick-slider">
								{this.state.data.map(this.eachItem)}
							</div>
						</div>
					</div>
  			</div>	  		
			</div>
  	);
  },
	renderDisplay: function(){		
		return ( 
			<div className="row-wrap">
				<div className={this.containerClass()}>
					<div className="configuration">
						<button type="button" className="edit-trigger" onClick={this.edit}><i className="fa fa-cog"></i></button>
					</div>
					<div className="row">
						<div className={this.columnClass()}>
							<div ref="slider" className="slick-slider">
								{this.state.data.map(this.eachItem)}
							</div>
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

if (document.getElementById('react-main-slider') !== null ){
	ReactDOM.render(<GenerateSlider source="/resources/slider.json" id="0" />, document.getElementById('react-main-slider'));
}