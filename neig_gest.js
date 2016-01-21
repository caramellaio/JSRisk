// TODO: continue here !!!!!!!

var neig_gest= function(){
    var self=this;
    
    this._mouse_over= undefined;
    this._mouse_out=undefined;
    this.__defineSetter__("mouse_over",function(val){
        console.log("setting mouse_over value to"+val);
        this._mouse_over=val;
        if(self._mouse_over!== undefined && self._mouse_out !== undefined){
            self.add_neig();
        }
        }
    );
    
    this.__defineSetter__("mouse_out",function(val){
        console.log("setting mouse_out value to "+val);
        this._mouse_over = undefined;
        this._mouse_out=val;
        });
    
    this.add_neig=function(){
        var el1 = self._mouse_out;
        if(el1.neig === undefined)
            el1.neig = [];
        if(!contains(el1.neig,self._mouse_over))
            el1.neig.push(self.mouse_over);
        console.log("added neig to: "+el1.path);
    }
}

function contains(array,elem){
    for(var i =0;i<array.length;i++)
        if(elem==array[i])
            return true;
    return false;
}