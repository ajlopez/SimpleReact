
var sr = require('..');

exports['Register get and run once using set'] = function (test) {
    test.async();
    
    var ds = sr.createDataSource();
    var total = 0;
    
    sr.register(function () {        
        total += ds.get('value');        
        
        if (total == 0)
            return;
            
        test.ok(total);
        test.equal(total, 10);
        test.done();
    });
    
    ds.set('value', 10);
};

exports['Register get and run set many times'] = function (test) {
    test.async();
    
    var ds = sr.createDataSource();
    var total = 0;
    
    sr.register(function () {        
        total += ds.get('value');      
        
        if (total < 20)
            return;
            
        test.ok(total);
        test.equal(total, 20);
        test.done();
    });

    setTimeout(function () { ds.set('value', 10); }, 200);
    setTimeout(function () { ds.set('value', 6); }, 300);
    setTimeout(function () { ds.set('value', 4); }, 400);
};