
var sr = require('..');

exports['Create datasource'] = function (test) {
    var ds = sr.createDataSource();
    test.ok(ds);
}