<template>
  <div class="sweepControl">
    <canvas ref="canvas" @touchstart="touchstart_sweep" @touchmove="touchmove_sweep" style="margin: auto" width="201" height="290"></canvas>
  </div>
</template>

<script>
export default {
  name: 'sweepControl',
  data() {
    return {
      canvas:'',
      og_ud_X: '',
      og_ud_Y: '',
      area_ud: { a1: false, a2: false, a3: false, a4: false, a5: false },
      hitUD: '',
      lastHit: '',
      funcType: 0,
    };
  },
  mounted(){
    this.canvas = this.$refs.canvas;
    this.og_ud_X = this.canvas.offsetLeft + this.canvas.width;
    this.og_ud_Y = this.canvas.offsetTop + this.canvas.height / 2;
    this.DrawSector(this.canvas,Math.PI*(1/2+1/4),Math.PI*(1 + 1/4),200,false,false);
    for(let i=0;i<5;i++){
      this.DrawSector(this.canvas,Math.PI*(1/2+1/4+i/10),Math.PI*(1/2+1/4+(i+1)/10),200,true,false);
    }
  },
  methods:{
      DrawSector(canvas_tag,start_angle,angle,radius,fill,anticlockwise){
          var centerPoint = {x:201,y:145};
          start_angle = start_angle || 0;
          if (canvas_tag.getContext){
            //开始绘制路径
            var ctx = canvas_tag.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth= 2;
            ctx.strokeStyle = '#e1e1e1';
            //画出弧线
            ctx.arc(centerPoint.x,centerPoint.y,radius,start_angle,angle,anticlockwise);
            //画出结束半径
            ctx.lineTo(centerPoint.x,centerPoint.y);
            //如果需要填充就填充，不需要就算了
            if (fill) {
              ctx.lineWidth= 1;
              ctx.fillStyle = '#2397f3';
              ctx.fill();
              ctx.stroke();
            }else{
              ctx.lineWidth= 1;
              ctx.fillStyle = '#f8f8f8';
              ctx.fill();
              ctx.stroke();
            }
          } else {
            alert('You need Safari or Firefox 1.5+ to see this demo.');
          }
      },
    clearArc(canvas_tag,start_angle,angle,radius,slected,anticlockwise){
        var centerPoint = {x:201,y:145};
        start_angle = start_angle || 0;
        if (canvas_tag.getContext){
          //开始绘制路径
          var ctx = canvas_tag.getContext("2d");
          ctx.beginPath();
          ctx.lineWidth= 1;
          ctx.strokeStyle = 'e1e1e1';
          //画出弧线
          ctx.arc(centerPoint.x,centerPoint.y,radius,start_angle,angle,anticlockwise);
          //画出结束半径
          ctx.lineTo(centerPoint.x,centerPoint.y);
          //判断是填充灰色还是蓝色
          if (slected) {
            ctx.fillStyle = '#f8f8f8';
            ctx.fill();
            ctx.stroke();
          }else{
            ctx.lineWidth= 1;
            ctx.fillStyle = '#2397f3';
            ctx.fill();
          }
        } else {
          alert('You need Safari or Firefox 1.5+ to see this demo.');
        }
      },
    getUDresult(re_X, re_Y) {
      var currentHit = -1;
      var y1 = Math.tan(-45 * 0.01745) * re_X;
      var y2 = Math.tan(-27 * 0.01745) * re_X;
      var y3 = Math.tan(-9 * 0.01745) * re_X;
      var y4 = Math.tan(9 * 0.01745) * re_X;
      var y5 = Math.tan(18 * 0.01745) * re_X;
      var y6 = Math.tan(45 * 0.01745) * re_X;
      if (y1 < re_Y) {
      } else if (y2 < re_Y) {
        this.area_ud.a1 = true;
        currentHit = 6-1;
        this.DrawSector(this.canvas,Math.PI*(1/2+1/4+(currentHit-1)/10),Math.PI*(1/2+1/4+currentHit/10),200,true,false);

      } else if (y3 < re_Y) {
        this.area_ud.a2 = true;
        currentHit = 6-2;
        this.DrawSector(this.canvas,Math.PI*(1/2+1/4+(currentHit-1)/10),Math.PI*(1/2+1/4+currentHit/10),200,true,false);
      } else if (y4 < re_Y) {
        this.area_ud.a3 = true;
        currentHit = 6-3;
        this.DrawSector(this.canvas,Math.PI*(1/2+1/4+(currentHit-1)/10),Math.PI*(1/2+1/4+currentHit/10),200,true,false);
      } else if (y5 < re_Y) {
        this.area_ud.a4 = true;
        currentHit = 6-4;
        this.DrawSector(this.canvas,Math.PI*(1/2+1/4+(currentHit-1)/10),Math.PI*(1/2+1/4+currentHit/10),200,true,false);

      } else if (y6 < re_Y) {
        this.area_ud.a5 = true;
        currentHit = 6-5;
        this.DrawSector(this.canvas,Math.PI*(1/2+1/4+(currentHit-1)/10),Math.PI*(1/2+1/4+currentHit/10),200,true,false);
      } else {
        currentHit = 6;
      }
      return currentHit;
    },
    touchstart_sweep(){
        let re_X;
      let re_Y;
        re_X = event.targetTouches[0].pageX - this.og_ud_X;
        re_Y = this.og_ud_Y - event.targetTouches[0].pageY;
        for(let i= 0;i<5;i++){
            this.clearArc(this.canvas,Math.PI*(1/2+1/4+i/10),Math.PI*(1/2+1/4+(i+1)/10),200,true,false);
        }

        this.hitUD = this.getUDresult(re_X, re_Y);
    },
    touchmove_sweep(){
        let re_X;
        let re_Y;
        re_X = event.targetTouches[0].pageX - this.og_ud_X;
        re_Y = this.og_ud_Y - event.targetTouches[0].pageY;
      this.lastHit = this.getUDresult(re_X, re_Y);
        if (this.lastHit == -1 || this.lastHit == 6) {
          if (this.lastHit == this.hitUD) {
            for(let i= 0;i<5;i++){
              this.clearArc(this.canvas,Math.PI*(1/2+1/4+i/10),Math.PI*(1/2+1/4+(i+1)/10),200,true,false);
            }
          }
          return;
        }
        let s_idx, e_idx;
        if (this.hitUD >= this.lastHit) {
          s_idx = this.lastHit;
          e_idx = this.hitUD;
        }
        else {
          s_idx = this.hitUD;
          e_idx = this.lastHit;
        }
        for (let i = 1; i <= 5; i++) {
          var temp = i;
          if (i >= s_idx && i <= e_idx){
            this.DrawSector(this.canvas,Math.PI*(1/2+1/4+(temp-1)/10),Math.PI*(1/2+1/4+(temp)/10),200,true,false);

          }else{
            this.clearArc(this.canvas,Math.PI*(1/2+1/4+(temp-1)/10),Math.PI*(1/2+1/4+(temp)/10),200,true,false);
          }
        }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
