var neig_gest= function(){
    var self=this;

    this.calculateM = function (rgn,delta) {
        delta = delta === undefined? 0.9:delta;
        var equal = function(a,b){return a.x >= b.x - delta && a.x <= b.x + delta && a.y >= b.y - delta && a.y <= b.y + delta;};
        var lst = self.get_all_region_point_objs(rgn);
        for (var i =0;i<lst.length-1;i++){
            for(var k=i+1;k<lst.length;k++)
                if (external_functions.intersect(lst[i].numbers, lst[k].numbers, equal)) {
                    lst[i].region.nei.push(lst[k].region);
                    lst[k].region.nei.push(lst[i].region);
                }
        }
        
        self.set_islands_nei(rgn.filter(function(e){return e.nei.length == 0;}),rgn);
    }
    
    this.find_island_nei = function(region,rgns,delta,region_points){
        delta = delta === undefined ? 1.9 : delta;
        rgns = rgns.filter(function (e) { return e.nei.length > 0 });
        var equal = function(a,b){return a.x >= b.x - delta && a.x <= b.x + delta && a.y >= b.y - delta && a.y <= b.y + delta;};
        region_points = region_points===undefined ? self.rel_to_abs_svg(region.path.getAttribute("d")) : region_points;
        
        for(var i = 0;i<rgns.length;i++) {
            if (external_functions.intersect(region_points, self.rel_to_abs_svg(rgns[i].path.getAttribute("d")),equal)) {
                region.nei.push(rgns[i]);
                rgns[i].nei.push(region);
            }
        }
        if(region.nei.length == 0)
            self.find_island_nei(region, rgns, delta + 20,region_points);
    }

    this.set_islands_nei = function (islands, rgns) {
        for (var i = 0; i < islands.length; i++) {
            self.find_island_nei(islands[i],rgns)
        }
    }

    this.get_all_region_point_objs= function(rgn){
        var lst = []
        for(var i=0;i<rgn.length;i++)
            lst.push({numbers:self.rel_to_abs_svg(rgn[i].path.getAttribute("d"),i==20||i==21),region:rgn[i]});
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
            if(array[i].includes('l')){
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
