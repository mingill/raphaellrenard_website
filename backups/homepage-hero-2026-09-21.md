# Homepage Hero Backup

Created 2026-09-21 before moving the homepage hero below the book catalogue.

The hero styling remains in the existing shared stylesheets. These are the original locale-specific hero blocks from `index.html` and `en/index.html`.

## German — `index.html`

```html
<!-- SECTION HERO -->
<section class="section section-hero" id="hero">
  <div class="hero">
    <h1 class="heading-primary">Starte ins Abenteuer</h1>
    <div class="hero-img-box">
      <figure class="hero-img-item">
        <a href="festung.html">
          <img
            srcset="
              img/hero/hero_single_1_w120.avif 120w,
              img/hero/hero_single_1.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                    200px"
            src="img/hero/hero_single_1.avif"
            class="hero-img"
            alt="Festung in einer Wüste"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="apt.html">
          <img
            srcset="
              img/hero/hero_single_2_w120.avif 120w,
              img/hero/hero_single_2.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="img/hero/hero_single_2.avif"
            class="hero-img"
            alt="grüner Dschungel mit klarem Fluss"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="abenteurer.html">
          <img
            srcset="
              img/hero/hero_single_3_w120.avif 120w,
              img/hero/hero_single_3.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="img/hero/hero_single_3.avif"
            class="hero-img"
            alt="Steinwüste und orangener Sand"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="abenteurer.html">
          <img
            srcset="
              img/hero/hero_single_4_w120.avif 120w,
              img/hero/hero_single_4.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="img/hero/hero_single_4.avif"
            class="hero-img"
            alt="Salzsee mit strahlend blauem Himmel"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="apt.html">
          <img
            srcset="
              img/hero/hero_single_5_w120.avif 120w,
              img/hero/hero_single_5.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="img/hero/hero_single_5.avif"
            class="hero-img"
            alt="Strand einer mysteriösen karibischen Insel"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="festung.html">
          <img
            srcset="
              img/hero/hero_single_6_w120.avif 120w,
              img/hero/hero_single_6.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="img/hero/hero_single_6.avif"
            class="hero-img"
            alt="Stadtmauer einer Wüstenfestung bei Nacht"
          />
        </a>
      </figure>
    </div>
    <div class="btn--hero">
      <a
        href="#books"
        class="btn btn--full margin-right-sm"
        >Wähle ein Buch</a
      >
      <a
        href="https://www.amazon.de/stores/Raphael-L.-Renard/author/B076V2Z5L5?ref=ap_rdr&store_ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true"
        class="btn btn--outline"
        target="_blank"
        rel="noopener noreferrer"
        >Jetzt kaufen!</a
      >
    </div>
  </div>
</section>
```

## English — `en/index.html`

```html
<!-- SECTION HERO -->
<section class="section section-hero" id="hero">
  <div class="hero">
    <h1 class="heading-primary">Begin Your Adventure</h1>
    <div class="hero-img-box">
      <figure class="hero-img-item">
        <a href="../festung.html">
          <img
            srcset="
              ../img/hero/hero_single_1_w120.avif 120w,
              ../img/hero/hero_single_1.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                    200px"
            src="../img/hero/hero_single_1.avif"
            class="hero-img"
            alt="Fortress in a desert"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="apt.html">
          <img
            srcset="
              ../img/hero/hero_single_2_w120.avif 120w,
              ../img/hero/hero_single_2.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="../img/hero/hero_single_2.avif"
            class="hero-img"
            alt="Green jungle with a clear river"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="../abenteurer.html">
          <img
            srcset="
              ../img/hero/hero_single_3_w120.avif 120w,
              ../img/hero/hero_single_3.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="../img/hero/hero_single_3.avif"
            class="hero-img"
            alt="Rocky desert and orange sand"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="../abenteurer.html">
          <img
            srcset="
              ../img/hero/hero_single_4_w120.avif 120w,
              ../img/hero/hero_single_4.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="../img/hero/hero_single_4.avif"
            class="hero-img"
            alt="Salt lake under a bright blue sky"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="apt.html">
          <img
            srcset="
              ../img/hero/hero_single_5_w120.avif 120w,
              ../img/hero/hero_single_5.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="../img/hero/hero_single_5.avif"
            class="hero-img"
            alt="Beach of a mysterious Caribbean island"
          />
        </a>
      </figure>
      <figure class="hero-img-item">
        <a href="../festung.html">
          <img
            srcset="
              ../img/hero/hero_single_6_w120.avif 120w,
              ../img/hero/hero_single_6.avif      200w
            "
            sizes="(max-width: 416px) 120px,
                200px"
            src="../img/hero/hero_single_6.avif"
            class="hero-img"
            alt="City wall of a desert fortress at night"
          />
        </a>
      </figure>
    </div>
    <div class="btn--hero">
      <a
        href="#books"
        class="btn btn--full margin-right-sm"
        >Choose a book</a
      >
      <a
        href="https://www.amazon.de/stores/Raphael-L.-Renard/author/B076V2Z5L5?ref=ap_rdr&store_ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true"
        class="btn btn--outline"
        target="_blank"
        rel="noopener noreferrer"
        >Buy Now!</a
      >
    </div>
  </div>
</section>
```
