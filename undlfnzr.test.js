var undlfnzr = require('./undlfnzr');

exports.testLevenshteinDistance = function(test) {
	converter = new undlfnzr();
	test.equal(converter.levenshteinDistance("", ""), 0);
	test.equal(converter.levenshteinDistance("bacon", "bacon"), 0);
	test.equal(converter.levenshteinDistance("bacon", ""), 5);
	test.equal(converter.levenshteinDistance("", "bacon"), 5);
	test.equal(converter.levenshteinDistance("bacon", "salad"), 4);
	test.equal(converter.levenshteinDistance("ttttttt", "aaaaaaa"), 7);
	test.equal(converter.levenshteinDistance("abcde", "edcba"), 4);
	test.equal(converter.levenshteinDistance("onebigstring", "one"), 9);
	test.equal(converter.levenshteinDistance("onereallyreallybigstring", "two"), 23);
	test.done();
};

exports.testFind = function(test) {
	converter = new undlfnzr();
	test.deepEqual(converter.find('caqe'),["cake"]);
	test.deepEqual(converter.find('bookx'),["book","books"]);
	test.deepEqual(converter.find('boks'),["books"]);
	test.done();
}