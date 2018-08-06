/****************************
 /*
 /*    Developer: Narayana Swamy
 /*    emailID: narayanaswamy14@gmail.com
 /*
 /*****************************/

d3 = d3||{};
(function(){
  "use strict";

  d3.buildSlider = function(){

    var height,width,onDragCallback,startStop = true;
    var scale = d3.scale.linear();
    var msg = "loading...",loadingMsg,partitions;

    var obj = function(selection){

      var x = width;

      scale.range([0,partitions]).domain([0,width]);

      var drag = d3.behavior.drag()
        .on('dragstart', function () {
        })
        .on('drag', function (d, i) {
          if(!startStop) return;
          if(d3.event.dx>0) return;

          x += d3.event.dx;

          if(x<0 || x>width-10) return;
          d3.select(this).attr("x", x);
          d3.select('.loading').attr("x", x-30);

          return onDragCallback(scale(x));
        })
        .on('dragend',function(){
        });

      selection.each(function(d){

        var container = d3.select(this);

        var parentBar = container.append('rect')
          .attr('x',0)
          .attr('y',0)
          .attr('width',width)
          .attr('height',height)
          .attr('rx',5)
          .attr('ry',5)
          .style('fill','#44ABA9');

        var slidingBar = container.append('rect')
          .attr('class','slidingBar')
          .attr('x',width-10)
          .attr('y',-2.5)
          .attr('rx',3)
          .attr('ry',3)
          .attr('width',10)
          .attr('height',20)
          .style('fill','#00E1FF')
          .call(drag);

        loadingMsg = container.append('text')
          .attr('x',width-30)
          .attr('y',30)
          .attr('class','loading')
          .style('font-size','15px')
          .style('fill','black')
          .style('display','none')
          .text(msg);

      })
    }
    obj.height = function(_){
      if(!arguments.length) return height;
      height = _;
      return obj;
    };
    obj.width = function(_){
      if(!arguments.length) return width;
      width = _;
      return obj;
    };
    obj.onDragCallback = function(_){

      if(typeof _ !== 'function') return;
      onDragCallback = _;
      return obj;
    };
    obj.partitions = function(_){
      if(!arguments.length) return partitions;
      partitions = _;
      return obj;
    };
    obj.startStop = function(_){
      if(!arguments.length) return startStop;
      startStop = _;
      if(!_)
        loadingMsg.style('display','block');
      else
        loadingMsg.style('display','none')
      return obj;
    };

    return obj;
  }
})()
