function Undlfnzr(config) {
	this._config = config || {};
};

Undlfnzr.prototype = {
	bktree: [{
		value: "book",
		children: [{
			id: 1,
			distance: 1
		}, {
			id: 2,
			distance: 4
		}]
	}, {
		value: "books",
		children: []
	}, {
		value: "cake",
		children: []
	}],
	// https://en.wikipedia.org/wiki/Levenshtein_distance
	levenshteinDistance: function(first, second) {
		if (first === second) {
			return 0;
		} else if (first.length == 0) {
			return second.length;
		} else if (second.length == 0) {
			return first.length;
		}

		var vector0 = [];
		var vector1 = [];

		for (var i = 0; i <= second.length; i++) {
			vector0[i] = i;
		}

		for (var i = 0; i < first.length; i++) {
			vector1[0] = i + 1;

			for (var j = 0; j < second.length; j++) {
				var cost = (first[i] === second[j]) ? 0 : 1;
				vector1[j + 1] = Math.min(vector1[j] + 1, vector0[j + 1] + 1, vector0[j] + cost);
			}

			for (var j = 0; j < vector0.length; j++) {
				vector0[j] = vector1[j];
			}
		}

		return vector1[second.length];
	},
	find: function(query) {
		var matches = [];
		this._recursiveFind(0, query, matches);
		return matches;
	},
	_recursiveFind: function(node, query, matches) {
		var distanceToNode = this.levenshteinDistance(this.bktree[node].value, query);

		if(distanceToNode <= 1) {
			matches.push(this.bktree[node].value);
		}

		for(var i=0; i<this.bktree[node].children.length; i++) {
			var child      = this.bktree[node].children[i];
			var lowerLimit = distanceToNode-1;
			var upperLimit = distanceToNode+1;

			if(child.distance >= lowerLimit && child.distance <= upperLimit) {
				this._recursiveFind(child.id, query, matches);
			}
		}
	}
};

module.exports = Undlfnzr;