var neig_gesture,rgn,player_count=0,style;

function region(_n_tanks,_path,p_id){
    var self = this;
    this.n_tanks=_n_tanks;
    this.nei = [];
    this.path=_path;
    this.selected = false;
    this.parent_id = p_id;
    this.atk=function(el){
        var a =[], b=[];
        for(var i=0;i<self.n_tanks;i++)
            a.push(Math.floor((Math.random()*6)+1));
        
        for(var i=0;i<el.n_tanks;i++)
            b.push(Math.floor((Math.random()*6)+1));
        
        a.sort();
        b.sort();
        for(var i=0;i< Math.min(Math.min(a.length,b.length),3);i++){
            (a[i]>b[i]?el:self).n_tanks--;
        }
    
    }
    
    // click zone
    this.click=function(){
        if(self.selected===undefined)
            self.selected=false;
        self.selected=!self.selected;
        self.path.classList.remove(self.selected?"player"+self.parent_id:"pressed");//self.selected?"land":"pressed");
        self.path.classList.add(self.selected?"pressed":"player"+self.parent_id);
        self.setNei(self.selected);
    }
    
    this.path.onclick=function(){
        
        self.click();
    }
    
    this.path.onmouseover=function(){
        self.path.classList.add("mouseover");
    }
    
    this.path.onmouseout=function(){
        self.path.classList.remove("mouseover");
    }
    
    this.setNei=function(b){
        for(var i=0;i<self.nei.length;i++){
            self.nei[i].path.classList.remove(b?"player"+self.nei[i].parent_id:"nei");
            self.nei[i].path.classList.add(b?"nei":"player"+self.nei[i].parent_id);
        }
    }
    //end click zone
}

function player(_regions, _total_army, _color) {
    
    var self = this;
    this.id = player_count;
    this.regions = _regions;
    /*this.__defineSetter__("regions",function(a){self._regions=a;self.apply_style();});
    this.__defineGetter__("regions",function(){self.apply_style();return self._regions});
    */this._army_count = _total_army;
    this.__defineGetter__("army_count", function () { var count = 0; for (var i = 0; i < self.regions.length; i++) { count += self.regions[i].n_tanks; } });
    var add_to_style = function (color) {
        //var style_text = document.createTextNode(".player" + self.id + " {fill-opacity: 1; stroke-opacity: 1;stroke-width:0.5;fill:"+color+"}")
        var text = ".player"+self.id+ " \
            { \
                fill:" +color+";\
				fill-opacity: 1;\
				stroke:white;\
				stroke-opacity: 1;\
				stroke-width:0.5;\
            }\n";
        style.innerHTML+= text;
    }
    this.atk = function (str_rgn, dest_rgn) {
        if (self.regions.indexOf(str_rgn) != -1 && str_rgn.nei.indexOf(dest_rgn) != -1 && str_rgn.n_tanks>=2) {
            str_rgn.atk(dest_rgn);
        } else{alert("cannot attack!!!")}
    }
    
    this.apply_style = function(){
        for(var i=0;i<self.regions.length;i++){
            self.regions[i].path.classList.remove(self.regions[i].path.classList[0]);
            self.regions[i].parent_id = self.id;
            self.regions[i].path.classList.add("player"+self.id);
        }
    }
    add_to_style(_color===undefined?"#"+external_functions.random_color():_color);
    this.apply_style();
    player_count++;
}

function a(){
    neig_gesture = new neig_gest();
    rgn = [];
    var paths = document.getElementById("it").contentDocument.children[0].getElementsByTagName("g")[0].getElementsByTagName("path");
    style = document.getElementById("it").contentDocument.children[0].getElementsByTagName("style")[0];
    for(var i=0;i<paths.length;i++)
        rgn.push(new region(3,paths[i]));
    rgn[0].atk(rgn[1]);
    neig_gesture.calculateM(rgn);
    assign_regions([new player([],0),new player([],0),new player([],0)],rgn);
}


function assign_regions(players,regions){
    var index_array = [];
    var land_per_player = Math.floor(regions.length / players.length);
    var remain= {num:land_per_player,index:0}
    while(index_array.length < regions.length){
        var rnd = Math.floor(Math.random() * regions.length);
        if(index_array.indexOf(rnd) == -1){
            index_array.push(rnd);
        }
    }
    
    for(var i = 0;i < players.length;i++){
        var sub_array = index_array.subArray(i*land_per_player,i*land_per_player+land_per_player);
        players[i].regions = regions.getMultipleElements(sub_array);
        players[i].apply_style();
    }
    
}

