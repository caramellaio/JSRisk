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
        for (var i =0;i<lst.length;i++){
            for(var k=i+1;k<lst.length;k++)
                if(external_functions.intersect(lst[i].numbers,lst[k].numbers,function(a,b){return a.x==b.x&&a.y==b.y})){
                    lst[i].region.nei.push(lst[k].region);
                    lst[k].region.nei.push(lst[i].region);
                    console.log([lst[i],lst[k]]);
                }
        }
    }

    this.get_all_region_point_objs=function(rgn){
        var list=[];
        for(var i = 0;i<rgn.length;i++){
            var nums= external_functions.special_split(
                [',','M','l','z','L'],
                rgn[i].path.getAttribute('d')
            ).filter(function(el){return el!="";});
            list.push({region:rgn[i],numbers:[]});
            for(var k=0;k<nums.length;k+=2){
                list[i].numbers.push({x:nums[k],y:nums[k+1]});
            }
            
        }
        return list;
    }
}
