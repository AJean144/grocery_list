var React = require('react');
var GroceryListActions = require('../actions/GroceryListActions');
var InputItem = require('./InputItem.react');
var classNames = require('classnames');

var AddItem = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					<h1>Needed List</h1>
					<div className="form-group">
						<InputItem
						className="form-control"
						placeholder="add an item to the grocery list"
						onSave={this._onSave}
						/>
					</div>
					<button className="btn btn-primary">Add</button>
				</div>
			</div>
		);
	},
	_onSave: function(text) {
		if (text.trim()){
			GroceryListActions.create(text);
		}
	}
});

module.exports = AddItem;