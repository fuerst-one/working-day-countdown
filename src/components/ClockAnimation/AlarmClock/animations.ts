import * as THREE from "three";

export const animateIdle =
  (model: THREE.Group, repeat = 5) =>
  (tl: gsap.core.Timeline) => {
    return tl.to(
      model.position,
      {
        y: 0.1,
        duration: 0.5,
        repeat,
        yoyoEase: "power2.in",
      },
      0,
    );
  };

export const animatePush = (model: THREE.Group) => (tl: gsap.core.Timeline) => {
  const duration = 0.25;
  return tl
    .to(
      model.position,
      {
        y: -0.7,
        z: -4,
        duration,
        yoyoEase: "power2.in",
      },
      0,
    )
    .to(
      model.rotation,
      {
        y: 0.2,
        x: -Math.PI / 2,
        z: 0.2,
        duration,
        yoyoEase: "power2.in",
      },
      0,
    )
    .to(model.rotation, {
      y: -0.05,
      x: -Math.PI / 2 + 0.05,
      duration: duration * 0.5,
      yoyoEase: "power2.out",
    })
    .to(model.rotation, {
      y: 0,
      duration: duration * 0.5,
      yoyoEase: "power2.out",
    })
    .to(
      model.rotation,
      {
        z: 0.5,
        duration: duration * 0.5,
        yoyoEase: "power2.out",
      },
      "-=" + duration * 2,
    );
};

export const animateAlarm =
  (model: THREE.Group) => (tl: gsap.core.Timeline) => {
    const duration = 0.025;
    return tl
      .to(model.position, {
        y: 0.3,
        duration: duration * 10,
        repeat: -1,
        yoyoEase: "power2.in",
      })
      .to(
        model.rotation,
        {
          keyframes: [
            { z: 0.15, duration, ease: "power2.out" },
            { z: 0, duration, ease: "power2.in" },
            { z: -0.15, duration, ease: "power2.out" },
            { z: 0, duration, ease: "power2.in" },
          ],
          repeat: -1,
          ease: "linear",
        },
        "-=" + duration * 5,
      );
  };
