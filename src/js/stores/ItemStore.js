var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GroceryListConstants = require('../constrants/GroceryListConstrants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = {};

function create(text) {
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_items[id] = {
		id: id,
		complete: false,
		text: text
	};
}

function update(id, updates) {
	_items[id] = assign({}, _items[id], updates)
}

function updateAll(updates) {
	for (var id in _items) {
		update(id, updates);
	}
}

function destroy(id) {
	delete _items[id];
}

function destroyAllItems() {
	for (var id in _items) {
		destroy(id);
	}
}

function destroyCompletedItems() {
	for (var id in _items) {
		if (_items[id].complete) {
			destroy(id);
		}
	}
}

var ItemStore = assign({}, EventEmitter.prototype, {

	areAllItemsComplete: function() {
		for (var id in _items) {
			if (!_items[id].complete) {
				return false;
			}
		}
		return true;
	},
	getAllItems: function() {
		return _items;
	},
	emitTheChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addTheChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeTheChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(action) {
	var text;

	switch(action.actionType) {
		case GroceryListConstants.CREATE_ITEM:
			text = action.text.trim();
			if (text !== '') {
				create(text);
				ItemStore.emitTheChange();
			}
			break;
		case GroceryListConstants.TOGGLE_ALL_ITEMS:
			if (ItemStore.areAllItemsComplete()) {
				updateAll({complete: false});
			} else {
				updateAll({complete: true});
			}
			ItemStore.emitTheChange();
			break;
		case GroceryListConstants.UNDO_COMPLETED_ITEM:
			update(action.id, {complete: false});
			ItemStore.emitTheChange();
			break;
		case GroceryListConstants.COMPLETE_ITEM:
			update(action.id, {complete: true});
			break:
		case GroceryListConstants.UPDATE_THE_ITEM:
			text = action.text.trim();
			if (text !== '') {
				update(action.id, {text: text});
			}
			break;
		case GroceryListConstants.DESTROY_ITEM:
			destroy(action.id);
			ItemStore.emitTheChange();
			break;
		case GroceryListConstants.DESTROY_ALL_ITEMS:
			destroyAllItems();
			ItemStore.emitTheChange();
			break;
		case GroceryListConstants.DESTROY_COMPLETED_ITEMS:
			destroyCompletedItems();
			ItemStore.emitTheChange();
			break;
		default:
	}
});

module.exports = ItemStore;
















