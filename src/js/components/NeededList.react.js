var React = require('react');
var ReactPropTypes = React.PropTypes;
var GroceryListActions = require('../actions/GroceryListActions');
var NeededItem = require('./NeededItem.react');
var classNames = require('classnames');

var NeededList = React.createClass({
	propTypes: {
		allNeededItems: ReactPropTypes.object.isRequired,
		areItemsCollected: ReactPropTypes.bool.isRequired
	},
	render: function() {
		if (Object.keys(this.props.allNeededItems).length < 1) {
			return null;
		}
		var allNeededItems = this.props.allNeededItems;
		var items = [];
		for (var key in allNeededItems) {
			if (!allNeededItems.complete) {
				items.push(<NeededItem key={key} item={allNeededItems[key]} />);
			}
		}
		return (
			<div>
				<input
					type="checkbox"
					onChange={this.props.areItemsCollected ? 'checked' : ''}
				/>
				<label htmlFor="toggle-all">Mark all as collected</label>
				<ul className="list-group">{items}</ul>
			</div>
		);
	},
	_onToggleCollectItems: function() {
		GroceryListActions.toggleAllItems();
	}
});

module.exports = NeededList;
