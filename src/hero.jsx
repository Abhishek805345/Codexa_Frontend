import css from "./style/hero.module.css";

const slides = [
  {
    title: "Landscapes",
    accent: "#7ecb32",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Portraits",
    accent: "#ff2626",
    image:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Abstracts",
    accent: "#f23b32",
    image:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Athletics",
    accent: "#f79b2f",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Escapes",
    accent: "#37b7d8",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
  },
];

export function Hero() {
  return (
    <section className={css.outerdiv} aria-label="Featured image stories">
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
            style={{ "--delay": `${index * 4}s`, "--accent": slide.accent }}
          >
            <h1>{slide.title}</h1>
            
            <button type="button">Explore Now</button>
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
          <span key={slide.title} style={{ "--delay": `${index * 4}s` }} />
        ))}
      </div>
    </section>
  );
}
