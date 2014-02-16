
var sr = require('..');

exports['Register get and run once using set'] = function (test) {
    test.async();
    
    var ds = sr.createDataSource();
    var total = 0;
    
    sr.register(function () {
        total += ds.get('value');
        test.ok(total);
        test.equal(total, 10);
        test.done();
    });
    
    ds.set('value', 10);
};