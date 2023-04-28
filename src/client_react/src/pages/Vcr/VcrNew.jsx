import "./Vcr.css";

import React, { useEffect, useRef, useState } from "react";

export const VcrNew = () => {
  // new aproaach

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateSnow(ctx) {
    var w = ctx.canvas.width,
      h = ctx.canvas.height,
      d = ctx.createImageData(w, h),
      b = new Uint32Array(d.data.buffer),
      len = b.length;

    for (var i = 0; i < len; i++) {
      b[i] = ((255 * Math.random()) | 0) << 24;
    }

    ctx.putImageData(d, 0, 0);
  }

  const add = (type, options) => {
    console.log("Add");
    console.log(type, options);
    const config = Object.assign({}, { fps: 30, blur: 1 }, options);

    // if (Array.isArray(type)) {
    //   for (const t of type) {
    //     add(t);
    //   }

    //   return this;
    // }

    if (type === "snow") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.classList.add(type);
      const rect = customThis.parent.current.getBoundingClientRect();
      canvas.width = rect.width / 2;
      canvas.height = rect.height / 2;
      customThis.wrap2Ref.current.appendChild(canvas);

      animate();
      generateSnow(ctx);

      function animate() {
        generateSnow(ctx);
        // that.snowframe = requestAnimationFrame(animate);
        setCustomThis({
          ...customThis,
          snowframe: requestAnimationFrame(animate),
        });
      }

      setCustomThis({ ...customThis });
      console.log(customThis.snowframe);
      // this.effects[type] = {
      //   wrapper: this.nodes.wrapper2,
      //   node: canvas,
      //   enabled: true,
      //   config,
      // };

      // return this;
    }
  };

  const remove = () => {
    console.log("Remove");
  };

  const renderTrackingNoise = (radius = 2, xmax, ymax) => {
    console.log("Reder Tracking noise");
    const canvas = customThis?.effects.vcr.node;
    const ctx = customThis?.effects.vcr.ctx;
    const config = customThis?.effects.vcr.config;
    let posy1 = config.miny || 0;
    let posy2 = config.maxy || canvas.height;
    let posy3 = config.miny2 || 0;
    const num = config.num || 20;

    if (xmax === undefined) {
      xmax = canvas.width;
    }

    if (ymax === undefined) {
      ymax = canvas.height;
    }

    canvas.style.filter = `blur(${config.blur}px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;

    ctx.beginPath();
    for (var i = 0; i <= num; i++) {
      var x = Math.random(i) * xmax;
      var y1 = getRandomInt((posy1 += 3), posy2);
      var y2 = getRandomInt(0, (posy3 -= 3));
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();

      customThis?.renderTail(ctx, x, y1, radius);
      customThis?.renderTail(ctx, x, y2, radius);
    }
    ctx.closePath();
  };

  const generateVCRNoise = () => {
    const canvas = customThis.effects?.vcr?.node;
    const config = customThis.effects?.vcr?.config;
    const div = customThis.effects?.vcr?.node;

    if (config?.fps >= 60) {
      cancelAnimationFrame(customThis?.vcrInterval);
      const animate = () => {
        renderTrackingNoise();
        customThis.vcrInterval = requestAnimationFrame(animate);
      };
    }
  };

  const handleResize = () => {
    generateVCRNoise();
  };

  function onResize() {
    console.log("Resized inside the function");
    setCustomThis((obj) => {
      return { ...obj, rect: obj.parent.current.getBoundingClientRect() };
    });
    if (customThis.effects?.vcr && !!customThis.effects?.vcr?.enabled) {
      generateVCRNoise();
    }
  }

  // this acts as a contructor
  const [customThis, setCustomThis] = useState({
    parent: useRef(null),
    rect: null,
    config: {
      effects: {
        roll: {
          enabled: false,
          options: {
            speed: 1000,
          },
        },
        image: {
          enabled: true,
          options: {
            src: "https://images.unsplash.com/photo-1505977404378-3a0e28ec6488?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
            blur: 1.2,
          },
        },
        vignette: { enabled: true },
        scanlines: { enabled: true },
        vcr: {
          enabled: false,
          options: {
            opacity: 1,
            miny: 220,
            miny2: 220,
            num: 70,
            fps: 60,
          },
        },
        wobbley: { enabled: true },
        snow: {
          enabled: true,
          options: {
            opacity: 0.2,
          },
        },
      },
    },
    effects: {
      vcr: {
        enabled: true,
        options: {
          opacity: 1,
          miny: 220,
          miny2: 220,
          num: 70,
          fps: 60,
        },
      },
    },
    events: {
      resize: handleResize,
    },
    // render
    contRef: useRef(null),
    wrap1Ref: useRef(null),
    wrap2Ref: useRef(null),
    wrap3Ref: useRef(null),
    nodes: { contRef: null, wrap1Ref: null, wrap2Ref: null, wrap3Ref: null },

    // onResize
    // a function that gets the bounding clinet rect of the screen
    // and if vcr is enabled generates vcr noise
    vcrInterval: null,
    snowframe: null,
  });

  // GUI setup
  let gui, f1, f2, f3, f4, f5;
  if (document.getElementsByClassName("dg")?.length == 0) {
    gui = new window.dat.GUI();
    f1 = gui.addFolder("Effects");
    f2 = gui.addFolder("Snow");
    f3 = gui.addFolder("VCR");
    f4 = gui.addFolder("Roll");
    f5 = gui.addFolder("Image");
  }

  // setting up GUI values
  if (gui) {
    for (const effect in customThis.config.effects) {
      const type = customThis.config.effects[effect];

      f1.add(type, "enabled")
        .name(effect)
        .onChange((bool) => {
          if (bool) {
            add(effect, customThis.config.effects[effect].options);
          } else {
            remove(effect);
          }
        });
    }
    f1.open();
    f2.open();
    f3.open();
    f4.open();
    f5.open();
  }
  //

  useEffect(() => {
    // console.log(customThis);
    // adding event listner constructor
    // not working
    // can use window.inner width
    window.addEventListener("resize", onResize, false);
    // render method
    // we already created those divs manually
    // we have to set nodes i havent set nodes yet
    // making on resize method
    onResize();

    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);

  // console.log(customThis.rect);
  console.log(customThis.parent);

  return (
    <div className="vcr-container">
      <div className="screen-container" ref={customThis.contRef}>
        <div className="screen-wrapper" ref={customThis.wrap1Ref}>
          <div className="screen-wrapper" ref={customThis.wrap2Ref}>
            <div className="screen-wrapper" ref={customThis.wrap3Ref}>
              <div id="screen" ref={customThis.parent}>
                <div className="vcr-console">
                  <p>ls</p>
                  <p>
                    Mandatory arguments to long options are mandatory for short
                    options too.
                  </p>
                  <p>-a, --all do not ignore entries starting with . </p>
                  <p>-A, --almost-all do not list implied . and .. </p>
                  <p>--author with -l, print the author of each file </p>
                  <p>
                    -b, --escape print C-style escapes for nongraphic characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
