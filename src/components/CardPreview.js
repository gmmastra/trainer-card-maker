import React, { useRef, useEffect } from "react";
import p5 from "p5";

const CardPreview = props => {
  const sketchRef = useRef();

  const Sketch = p => {

    p.canvas = null;

    p.canvasWidth = 100;

    p.canvasHeight = 100;

    p.setup = () => {
      p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
    };

    p.draw = () => {
      p.background(0);
    };

    p.updateCanvasDimensions = () => {
      p.canvasWidth = window.innerWidth;
      p.canvasHeight = window.innerHeight;
      p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
    }

    if (window.attachEvent) {
      window.attachEvent(
        'onresize',
        function () {
          p.updateCanvasDimensions();
        }
      );
    }
    else if (window.addEventListener) {
      window.addEventListener(
        'resize',
        function () {
          p.updateCanvasDimensions();
        },
        true
      );
    }
    else {
      //The browser does not support Javascript event binding
    }
  };

  useEffect(
    () => {
      let inst = new p5(Sketch, sketchRef.current);

      // Cleanup function! Without this the new p5.js sketches
      // generated with each click will just appear one after the other.
      return () => inst.remove();
    },
    // Let React know that this effect needs re-rendering when the dataFromSibling prop changes
    [props.cardFrame]
  );

  return (
    <div ref={sketchRef}>
    </div>
  );
};

export default CardPreview;