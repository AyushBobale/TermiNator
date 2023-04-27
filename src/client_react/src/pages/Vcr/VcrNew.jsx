import "./Vcr.css";

import React, { useEffect, useRef, useState } from "react";

export const VcrNew = () => {
  // new aproaach

  // render method initalization
  const contRef = useRef(null);
  const wrap1Ref = useRef(null);
  const wrap2Ref = useRef(null);
  const wrap3Ref = useRef(null);
  const [nodes, setNodes] = useState({ contRef, wrap1Ref, wrap2Ref, wrap3Ref });

  // this acts as a contructor
  const screenRef = useRef(null);
  const [effects, setEffects] = useState({});
  // dunno what this is
  const [events, setEvents] = useState({});
  const [config, setConfig] = useState({
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
        enabled: true,
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
  });

  const handleResize = () => {
    generateVCRNoise();
  };

  const generateVCRNoise = () => {
    const canvas = effects?.vcr?.node;
    const config = effects?.vcr?.node;
    const div = effects?.vcr?.node;

    if (config?.fps >= 60) {
      cancelAnimationFrame(this.vcrInterval);
    }
  };

  useEffect(() => {
    // adding event listner in constructor
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // render method
  }, []);

  return (
    <div className="vcr-container">
      <div className="screen-container" ref={contRef}>
        <div className="screen-wrapper" ref={wrap1Ref}>
          <div className="screen-wrapper" ref={wrap2Ref}>
            <div className="screen-wrapper" ref={wrap3Ref}>
              <div id="screen" ref={screenRef}>
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
