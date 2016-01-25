var external_funcs =function(){
    var self = this;
    this.special_split=function(splitters,string){
        // it runs
        to_ret = string.split(splitters[0])
        for(var i = 1;i<splitters.length;i++){
            var tmp_list = [];
            for(var k = 0;k<to_ret.length;k++)
            tmp_list = tmp_list.concat(to_ret[k].split(splitters[i]));
            to_ret = tmp_list;
        }
        return to_ret;
    },
    this.contains= function(array,elem,eq){
        if(eq === undefined)
            eq= function(a,b){return a==b;};
        for(var i =0;i<array.length;i++)
            if(eq(elem,array[i]))
                return true;
            
        return false;
    },
    
    this.intersect=function(array1,array2,eq){
        for(var i = 0;i<array2.length;i++)
            if(self.contains(array1,array2[i],eq)){
                return true;
            
            }
        return false;
    }

    
    this.random_color = function(){
        return Math.floor((Math.random() * 16777216)).toString(16)
    }
}

var external_functions = new external_funcs();