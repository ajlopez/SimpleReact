
var fns = [];
var currentfn = null;

function DataSource() {
    var values = { };
    
    this.get = function (name) {
        assoc(name);
        
        return values[name].value;
    };
    
    this.set = function (name, value) {
        assoc(name);
        
        var cell = values[name];
        
        if (cell.value == value)
            return;
            
        cell.value = value;
            
        var valfns = cell.fns;
        
        for (var k = 0; k < valfns.length; k++)
            setImmediate(makeCall(valfns[k]));
    }
    
    function makeCall(n) {
        return function () { fns[n](); };
    }
    
    function assoc(name) {
        if (!values[name])
            values[name] = { fns: [], value: null };
        
        if (currentfn == null)
            return;
            
        var position = values[name].fns.indexOf(currentfn);
        
        if (position < 0)
            values[name].fns.push(currentfn);
    }
}

function createDataSource() {
    return new DataSource();
}

function register(fn) {
    var position = fns.indexOf(fn);
    
    if (position < 0) {
        position = fns.length;
        fns.push(fn);
    }
    
    currentfn = position;
}

module.exports = {
    createDataSource: createDataSource,
    register: register
}

