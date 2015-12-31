var React = require('react');
var ReactPropTypes = React.PropTypes;
var GroceryListActions = require('../actions/GroceryListActions');
var InputItem = require('./InputItem.react');
var classNames = require('classnames');

var NeededItem = React.createClass({
	propTypes: {
		item: ReactPropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			isEditing: false
		};
	},
	render: function() {
		var item = this.props.item;
		var input;
		if (this.state.isEditing) {
			input = <InputItem
								className="edit"
								onSave={this._onSave}
								value={item.text}
							/>;
		}
//
		return (
			<li
				className={classNames({
					'completed': item.complete,
					'editing': this.state.isEditing,
					'list-group-item': true
				})}
				key={item.id}>
				<div className="checkbox">
					<input className="toggle"
					type="checkbox"
					checked={item.complete}
					onChange={this._onItemToggle}
					/>
					<label onDoubleClick={this._onDoubleClick}>
						{item.text}
					</label>
					<button className="destroy" onClick={this._onDestroyClick} />
				</div>
				{input}
			</li>
		);
	},
	_onItemToggle: function() {
		GroceryListActions.toggleItem(this.props.item);
	},
	_onDoubleClick: function() {
		this.setState({isEditing: true});
	},
	_onSave: function() {
		GroceryListActions.updateItem(this.props.id, text);
		this.setState({isEditing: false});
	},
	_onDestroyClick: function() {
		GroceryListActions.destroy(this.props.id);
	}
});

module.exports = NeededItem;




