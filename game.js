function void_region(){return {tank:1,player:null,path:null}}
function region(_n_tanks,_player,_path){
    var self = this;
    this.n_tanks=_n_tanks;
    this.player=_player;
    this.path=_path;
    this.atk=function(el){
        var a =[], b=[];
        for(var i=0;i<self.n_tanks;i++)
            a.push(Math.floor((Math.random()*6)+1));
        
        for(var i=0;i<el.n_tanks;i++)
            b.push(Math.floor((Math.random()*6)+1));
        
        a.sort();
        b.sort();
        console.log("a="+a);
        console.log("b="+b);
        for(var i=0;i< Math.min(Math.min(a.length,b.length),3);i++){
            (a[i]>b[i]?el:self).n_tanks--;
            console.log(a[i]+" "+b[i]);
        }
        console.log("self:"+self.n_tanks+" el="+el.n_tanks);
    
    }
}

var rg1 = new region(3);
var rg2 = new region(3);
rg1.atk(rg2);