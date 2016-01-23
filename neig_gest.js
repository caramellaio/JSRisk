// TODO: continue here !!!!!!!

var neig_gest= function(){
    var self=this;
    
    this._mouse_over= undefined;
    this._mouse_out=undefined;
    this.__defineSetter__("mouse_over",function(val){
        this._mouse_over=val;
        if(self._mouse_over!== undefined && self._mouse_out !== undefined){
            self.add_neig();
        }
        }
    );
    
    this.__defineSetter__("mouse_out",function(val){
        this._mouse_over = undefined;
        this._mouse_out=val;
        });
    
    /*this.add_neig=function(){
        var el1 = self._mouse_out;
        if(el1.neig === undefined)
            el1.neig = [];
        if(!contains(el1.neig,self._mouse_over))
            el1.neig.push(self.mouse_over);
    }*/

    this.calculateM = function (rgn) {
        var delta = 0.9;
        var equal = function(a,b){return a.x >= b.x - delta && a.x <= b.x + delta && a.y >= b.y - delta && b.y <= b.y + delta;};
        var lst = self.get_all_region_point_objs(rgn);
        console.log("lst: ",lst);
        for (var i =0;i<lst.length-1;i++){
            for(var k=i+1;k<lst.length;k++)
                if(external_functions.intersect(lst[i].numbers,lst[k].numbers,equal)){
                    lst[i].region.nei.push(lst[k].region);
                    lst[k].region.nei.push(lst[i].region);
                }
        }
    }
    
    this.get_all_region_point_objs= function(rgn){
        var lst = []
        for(var i=0;i<rgn.length;i++)
            lst.push({numbers:self.rel_to_abs_svg(rgn[i].path.getAttribute("d")),region:rgn[i]});
        return lst;
    }
    this.rel_to_abs_svg=function(text){
        var array = text.replace(/[MLz]/g,',').split(',').filter(function(e){return e!=""});
        var to_ret = [];
        var last_pos = {x:0,y:0};
        var is_nxt_x = true;
        var tmp =false;
        for(var i = 0;i< array.length;i++){
            var parsed = parseFloat(array[i]);
            if(array[i].contains('l')){
                last_pos.y = tmp?last_pos.y+parsed:parsed;
                to_ret.push({x:last_pos.x,y:last_pos.y});
                last_pos.x+= parseFloat(array[i].split('l')[1]);
                tmp = true;
                
            } else{
                last_pos[is_nxt_x?"x":"y"] =tmp?last_pos[is_nxt_x?"x":"y"]+parsed:parsed;
                is_nxt_x = !is_nxt_x;
                if(is_nxt_x){
                    to_ret.push({x:last_pos.x,y:last_pos.y});
                }
                tmp = false;
            }
        }
        return to_ret;
    }
}
