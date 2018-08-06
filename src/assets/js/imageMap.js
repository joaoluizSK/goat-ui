/****************************
 /*
 /*    Developer: Narayana Swamy
 /*    emailID: narayanaswamy14@gmail.com
 /*
 /*****************************/
d3 = d3 || {};
(function() {

  "use strict";

  d3.imageMap = function() {

    var height, width, onDragCallback;
    var container;
    var canvas, canvasAccessObj, pixelData, circle;
    var context;
    var diameter, radius;
    var slidingBar = d3.buildSlider();
    var levels, size;
    var scale = d3.scale.linear();
    var currentLvl, imageName, mode, selectionLength;
    var splitFlag = true;

    var obj = function(selection) {

      slidingBar.width(diameter)
        .height(15)
        .partitions(levels)
        .onDragCallback(obj.onDragCallback);

      selection.each(function() {

        container = d3.select(this);

        container
          .attr('width', diameter)
          .attr('height', diameter + 200);

        var cg = container.append('g')
          .attr('class', 'cg');

        if (mode == 'slider')
          var sg = container.append('g')
            .attr('class', 'sg')
            .attr('transform', 'translate(' + 0 + ',' + diameter + ')')
            .call(slidingBar);

        obj.renderCircle(diameter / 2, diameter / 2, diameter / 2, 0, 0);

        scale = scale.range([diameter / 2, diameter]).domain([currentLvl - 1, currentLvl]);

      })

    };
    obj.buildCanvas = function() {

      var img = document.getElementById('myimage');

      var unit = 0,
        width = 0;
      height = 0;
      if(size){
        width = size[0];
        height = size[1];
      }
      else{
        width = img.naturalWidth;
        height = img.naturalHeight;
      }

      img.height = height;
      img.width = width;
      diameter = d3.max([width, height]);
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      context = canvas.getContext('2d')
      context.drawImage(img, 0, 0, width, height);
      canvasAccessObj = canvas.getContext('2d');

      levels = Math.floor(Math.log2(diameter));
      currentLvl = levels;

      return obj;

    };
    obj.onDragCallback = function(_) {


      if (diameter / 2 <= 2) return;


      if (parseInt(scale(_)) < parseInt(diameter / 2)) {

        if (!slidingBar.startStop()) return;

        slidingBar.startStop(false);

        selectionLength = container
          .select('.cg')
          .selectAll('circle')
          .size();

        container
          .select('.cg')
          .selectAll('circle')
          .each(obj.breakCircle);

        diameter = diameter / 2;
        currentLvl = currentLvl - 1;

        scale.range([diameter / 2, diameter]).domain([currentLvl - 1, currentLvl]);

      } else {
        if (diameter > 20)
          obj.renderCircleGroup(scale(_) / 2);
      }

      return true;
    };
    obj.renderCircleGroup = function(r) {

      container
        .selectAll('circle')
        .attr('r', r);

    };
    obj.breakCircle = function(d, i) {
      var c = d3.select(this);
      var t_x = parseFloat(c.attr('cx'));
      var t_y = parseFloat(c.attr('cy'));
      var t_r = mode == 'slider' ? diameter / 2 : (c.attr('r'));

      if (t_r < 2){
        splitFlag = true;
        return
      };

      var r_ = (t_r / 2);
      var cx, cy, c1x, c1y, c2x, c2y, c3x, c3y, xF, yF;

      if (mode == 'slider') {
        //SliderMode
        c.attr('r', r_)
          .attr('cx', t_x + (r_))
          .attr('cy', t_y - (r_))
          .each(function() {
            setTimeout(obj.renderCircle(t_x - (r_), t_y - (r_), r_, t_x, t_y, t_r), 0);
            setTimeout(obj.renderCircle(t_x - (r_), t_y + (r_), r_, t_x, t_y, t_r), 0);
            setTimeout(obj.renderCircle(t_x + (r_), t_y + (r_), r_, t_x, t_y, t_r), 0);

            if (i === selectionLength - 1) {
              setTimeout(function() {
                slidingBar.startStop(true);
              }, 1000);
            }
          });

      } else {

        xF = (d3.mouse(this)[0] > t_x) ? 1 : -1;
        yF = (d3.mouse(this)[1] > t_y) ? 1 : -1;

        cx = c3x = t_x + (xF) * r_;
        c1x = c2x = t_x + (xF * -1) * r_;
        cy = c1y = t_y + (yF) * r_;
        c2y = c3y = t_y + (yF * -1) * r_;

        var pixelData = context.getImageData(parseInt(cx), parseInt(cy), 1, 1).data;

        c.style('opacity',0.3)
          .transition()
          .duration(mode === 'play'?r_*5:0)
          .attr('r', r_)
          .attr('cx', cx)
          .attr('cy', cy)
          .style('opacity',1)
          .style('fill', 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ')')
          .each(function() {
            obj.renderCircle(c1x, c1y, r_, t_x, t_y, t_r);
            obj.renderCircle(c2x, c2y, r_, t_x, t_y, t_r);
            obj.renderCircle(c3x, c3y, r_, t_x, t_y, t_r);
          });
      }
    };
    obj.renderCircle = function(x, y, r, p_x, p_y, t_r) {
      var pixelData = context.getImageData(parseInt(x), parseInt(y), 1, 1).data;

      circle = container.select('.cg')
        .append('circle');

      circle.attr('cx', p_x)
        .attr('cy', p_y)
        .attr('r', t_r)
        .style('fill', 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ')')
        .transition()
        .duration(mode === 'play'?r*5:0)
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', r)
        .each('end',function(){
          splitFlag = true;

        })
      if (mode === 'play') {
        circle.on('mouseover', function() {
          if (mode === 'play' && splitFlag){
            splitFlag = false;
            obj.breakCircle.bind(this)();
          }
        })
      }

      return;

    };
    obj.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      return obj;
    };
    obj.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return obj;
    };
    obj.imageName = function(_) {
      if (!arguments.length) return imageName;
      imageName = _;
      return obj;
    };
    obj.setMode = function(_) {
      if (!arguments.length) return setMode;
      mode = _;
      return obj;
    };
    obj.setImageSize = function(_) {
      if (!arguments.length) return size;
      size = _;
      return obj;
    };

    return obj;
  }
})()
