// TODO: continue here !!!!!!!

var neig_gest= function(){
    var self=this;
    
    this._mouse_over= undefined;
    this._mouse_out=undefined;
    this.__defineSetter__("mouse_over",function(val){
        //console.log("setting mouse_over value to"+val);
        this._mouse_over=val;
        if(self._mouse_over!== undefined && self._mouse_out !== undefined){
            self.add_neig();
        }
        }
    );
    
    this.__defineSetter__("mouse_out",function(val){
        //console.log("setting mouse_out value to "+val);
        this._mouse_over = undefined;
        this._mouse_out=val;
        });
    
    this.add_neig=function(){
        var el1 = self._mouse_out;
        if(el1.neig === undefined)
            el1.neig = [];
        if(!contains(el1.neig,self._mouse_over))
            el1.neig.push(self.mouse_over);
        console.log([el1.path,self._mouse_over]);
    }

    this.calculateM = function (rgn) {
        var lst = self.get_all_region_point_objs(rgn);
        for (var i = 0; i < lst.length; i++) {
            for(var k=i+1;k<lst.length;k++)
                if (lst[i].intersect(lst[k])&& !list[i].nei.contains(lst[k])) {
                    lst[i].nei.add(lst[k]);
                    lst[k].nei.add(lst[i]);
                }
        }
        console.log(lst); 
    }

    this.get_all_region_point_objs=function(rgn){
        var lst = [];
        for (var i = 0; i < rgn.length; i++) {
            var intrsct = function(num) {
                return lst.contains(num)
            }
            lst.push({ nums: (rgn[i].path.getAttribute("d").split(',')), region: rgn[i] });
            var numss = lst[i].nums;
            var intrsct = function (nums) {
                for (var i = 0; i < nums.length; i++) {
                    if (numss.contains(nums[i]))
                        return true;
                }
                return false;
            }
            lst[i].intersect = intrsct;
            lst[i].nei = [];
            console.log(lst[i]);
            for (var k = 0; k < lst[i].nums.length; k++)
                lst[i].nums[k] = parseFloat(lst[i].nums[k].substring(1));
            console.log(lst[i]);
        }
        console.log(lst);
        return lst;
    }
}

function contains(array,elem){
    for(var i =0;i<array.length;i++)
        if(elem==array[i])
            return true;
    return false;
}