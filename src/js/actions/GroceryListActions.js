var AppDispatcher = require('../dispatchers/AppDispatcher');
var GroceryListConstrants = require('../constrants/GroceryListConstrants');

var GroceryListActions = {
	create: function(text) {
		AppDispatcher.dispatch({
			actionType: GroceryListConstrants.CREATE_ITEM,
			text: text
		});
	},
	updateItem: function(id, text) {
		AppDispatcher.dispatch({
			actionType: GroceryListConstrants.UPDATE_THE_ITEM,
			id: id,
			text: text
		});
	},
	toggleItem: function(item) {
		var id = item.id;
		var actionType = item.complete ? GroceryListConstrants.UNDO_COMPLETED_ITEM : GroceryListConstrants.COMPLETE_ITEM;
		AppDispatcher.dispatch({
			actionType: actionType,
			id: id
		});
	},
	toggleAllItems: function() {
		AppDispatcher.dispatch({
			actionType: GroceryListConstrants.TOGGLE_ALL_ITEMS;
		});
	},
	destroy: function(id) {
		AppDispatcher.dispatch({
			actionType: GroceryListConstrants.DESTROY_ITEM,
			id: id
		});
	},
	destroyAllItems: function() {
		AppDispatcher.dispatch({
			actionType: GroceryListConstrants.DESTROY_ALL_ITEMS;
		});
	},
	destroyAllCompletedItems: function() {
		AppDispatcher.dispatch({
			actionType: GroceryListConstrants.DESTROY_COMPLETED_ITEMS;
		});
	}
};

module.exports = GroceryListActions;