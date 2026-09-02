import css from "./style/hero.module.css";
import a from "./assets/a.png";
import b from "./assets/b.png";
import c from "./assets/c.png";
import d from "./assets/d.png";
import e from "./assets/e.png";

const slides = [
  {
    title: "Home",
    accent: "#7ecb32",
    image: a,
  },
  {
    title: "Create Rooms",
    accent: "#ff2626",
    image: b,
  },
  {
    title: "Code Rooms",
    accent: "#f23b32",
    image: d,
  },
  {
    title: "User config",
    accent: "#f79b2f",
    image: c,
  },
  {
    title: "Room config",
    accent: "#37b7d8",
    image: e,
  },
];

export function Hero() {
  return (
    <section
      className={css.outerdiv}
      aria-label="Featured image stories"
    >
      <div className={css.backdrops}>
        {slides.map((slide, index) => (
          <div
            className={css.backdrop}
            key={slide.title}
            style={{
              "--image": `url(${slide.image})`,
              "--delay": `${index * 4}s`,
            }}
          />
        ))}
      </div>

      <div className={css.copy}>
        {slides.map((slide, index) => (
          <div
            className={css.copySlide}
            key={slide.title}
            style={{
              "--delay": `${index * 4}s`,
              "--accent": slide.accent,
            }}
          >
            <h1>{slide.title}</h1>

            <button type="button">
              Explore Now
            </button>
          </div>
        ))}
      </div>

      <div className={css.slider}>
        {slides.map((slide, index) => (
          <article
            className={css.card}
            key={slide.title}
            style={{
              "--image": `url(${slide.image})`,
              "--delay": `${index * -4}s`,
              "--accent": slide.accent,
            }}
          >
            <span>{slide.title}</span>
          </article>
        ))}
      </div>

      <div className={css.dots} aria-hidden="true">
        {slides.map((slide, index) => (
          <span
            key={slide.title}
            style={{
              "--delay": `${index * 4}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}