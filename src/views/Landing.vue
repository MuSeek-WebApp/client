<template>
  <div class="navigation">
    <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
    <header class="header">
      <div class="header__logo-box">
        <img
          src="../../public/img/logo-white.png"
          alt="Logo"
          class="header__logo"
        />
      </div>

      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">Museek</span>
          <span class="heading-primary--sub">Find your stage</span>
        </h1>
        <router-link :to="'/login'">
          <a class="btn btn--white btn--animated">Sign In</a>
        </router-link>
      </div>
    </header>

    <main>
      <section class="section-about">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">Our Story</h2>
        </div>

        <div class="row">
          <div class="col-1-of-2">
            <h3 class="heading-tertiary u-margin-bottom-small">
              You're going to fall in love with music
            </h3>
            <p class="paragraph">
              There are so much anonymous artists today who are looking for
              expand their circle of familiarity, artists who want to play their
              creations in public and amateurs who want to play just as a hobby.
              On the other hand there is many bars and pubs that want to add
              live music on opening hours and trying to promote and help young
              artists. Although there is here a mutual aim, there is no platform
              that connects them. These is why we created museek. We want to
              create a world that those people help each other and benefit from
              the cooperation. We always will recommend the businesses new bands
              for them and the artists could find easily new events to attend
              in. Join us and lets find a stage for everyone.
            </p>
          </div>
          <div class="col-1-of-2">
            <div class="composition">
              <img
                srcset="
                  ../../public/img/nat-1.jpg        300w,
                  ../../public/img/nat-1-large.jpg 1000w
                "
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 1"
                class="composition__photo composition__photo--p1"
                src="../../public/img/nat-1-large.jpg"
              />

              <img
                srcset="
                  ../../public/img/nat-2.jpg        300w,
                  ../../public/img/nat-2-large.jpg 1000w
                "
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 2"
                class="composition__photo composition__photo--p2"
                src="../../public/img/nat-2-large.jpg"
              />

              <img
                srcset="
                  ../../public/img/nat-3.jpg        300w,
                  ../../public/img/nat-3-large.jpg 1000w
                "
                sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                alt="Photo 3"
                class="composition__photo composition__photo--p3"
                src="../../public/img/nat-3-large.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section-features">
        <div class="row">
          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-world"></i>
              <h3 class="heading-tertiary u-margin-bottom-small">
                Artist/band view
              </h3>
              <p class="feature-box__text">
                Manage the events you’re connected to in a simple way. Look for
                new events that can suit you and expand your regular circle.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-compass"></i>
              <h3 class="heading-tertiary u-margin-bottom-small">
                Business view
              </h3>
              <p class="feature-box__text">
                Plan your events with a customized calendar. Discover new
                artists and bands based on your choices the choices of others.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-map"></i>
              <h3 class="heading-tertiary u-margin-bottom-small">
                Promote your profile
              </h3>
              <p class="feature-box__text">
                It is important that you invest in your profile both as a
                business and as an artist so that they can more connect to you
                and choose you
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <i class="feature-box__icon icon-basic-heart"></i>
              <h3 class="heading-tertiary u-margin-bottom-small">
                Recommendations
              </h3>
              <p class="feature-box__text">
                Reviews are followed by the match in an event. If the
                cooperation was successful you can share it with others and more
                important share it if you didn’t like.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="section-stories">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">We make people genuinely happy</h2>
        </div>

        <div class="row">
          <div class="story">
            <figure class="story__shape">
              <img
                src="../../public/img/nat-8.jpg"
                alt="Person on a tour"
                class="story__img"
              />
              <figcaption class="story__caption">Mary Smith</figcaption>
            </figure>
            <div class="story__text">
              <h3 class="heading-tertiary u-margin-bottom-small">
                Mary Smith, a young singer:
              </h3>
              <p>
                “I really like this website, It increased my shows from one show
                in month to more than five. It’s very important that i can
                command on the business after the shows because they are more
                motivated to be nice and helpful. I hope that more artists and
                businesses will join and increase the options and opportunities
                here.”
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="story">
            <figure class="story__shape">
              <img
                src="../../public/img/nat-9.jpg"
                alt="Person on a tour"
                class="story__img"
              />
              <figcaption class="story__caption">Jack Wilson</figcaption>
            </figure>
            <div class="story__text">
              <h3 class="heading-tertiary u-margin-bottom-small">
                Jack Wilson, the 'Amerson Pub' owner:
              </h3>
              <p>
                “Museek is the best. I love that I've known a lot of new artists
                lately. It really improves the night when there is a live music
                in the bar. I like that the website recommend me the bands, all
                the bands that i tried were awesome! ”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-book">
        <div class="row">
          <div>
            <router-link :to="'/login'">
              <a class="btn btn--white-big">Sign In</a>
            </router-link>
          </div>
        </div>
      </section>
    </main>
    <div class="popup" id="popup">
      <div class="popup__content">
        <div class="popup__left">
          <img
            src="../../public/img/nat-8.jpg"
            alt="Tour photo"
            class="popup__img"
          />
          <img
            src="../../public/img/nat-9.jpg"
            alt="Tour photo"
            class="popup__img"
          />
        </div>
        <div class="popup__right">
          <a href="#section-tours" class="popup__close">&times;</a>
          <h2 class="heading-secondary u-margin-bottom-small">
            Start booking now
          </h2>
          <h3 class="heading-tertiary u-margin-bottom-small">
            Important &ndash; Please read these terms before booking
          </h3>
          <p class="popup__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed
            risus pretium quam. Aliquam sem et tortor consequat id. Volutpat
            odio facilisis mauris sit amet massa vitae. Mi bibendum neque
            egestas congue. Placerat orci nulla pellentesque dignissim enim sit.
            Vitae semper quis lectus nulla at volutpat diam ut venenatis.
            Malesuada pellentesque elit eget gravida cum sociis natoque
            penatibus et. Proin fermentum leo vel orci porta non pulvinar neque
            laoreet. Gravida neque convallis a cras semper. Molestie at
            elementum eu facilisis sed odio morbi quis. Faucibus vitae aliquet
            nec ullamcorper sit amet risus nullam eget. Nam libero justo laoreet
            sit. Amet massa vitae tortor condimentum lacinia quis vel eros
            donec. Sit amet facilisis magna etiam. Imperdiet sed euismod nisi
            porta.
          </p>
          <a href="#" class="btn btn--green">Book now</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/*
0 - 600px:      Phone
600 - 900px:    Tablet portrait
900 - 1200px:   Tablet landscape
[1200 - 1800] is where our normal styles apply
1800px + :      Big desktop

$breakpoint arguement choices:
- phone
- tab-port
- tab-land
- big-desktop

ORDER: Base + typography > general layout + grid > page layout > components

1em = 16px
*/
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem);
  }
  80% {
    transform: translateX(1rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }
  80% {
    transform: translateX(-1rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}
@media only screen and (max-width: 75em) {
  html {
    font-size: 56.25%;
  }
}
@media only screen and (max-width: 56.25em) {
  html {
    font-size: 50%;
  }
}
@media only screen and (min-width: 112.5em) {
  html {
    font-size: 75%;
  }
}

body {
  box-sizing: border-box;
  padding: 3rem;
}
@media only screen and (max-width: 56.25em) {
  body {
    padding: 0;
  }
}

::selection {
  background-color: #be53b9;
  color: #fff;
}

body {
  font-family: "Lato", sans-serif;
  font-weight: 400;
  /*font-size: 16px;*/
  line-height: 1.7;
  color: #777;
}

.heading-primary {
  color: #fff;
  text-transform: uppercase;
  backface-visibility: hidden;
  margin-bottom: 6rem;
}
.heading-primary--main {
  display: block;
  font-size: 6rem;
  font-weight: 400;
  letter-spacing: 3.5rem;
  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  /*
        animation-delay: 3s;
        animation-iteration-count: 3;
        */
}
@media only screen and (max-width: 37.5em) {
  .heading-primary--main {
    letter-spacing: 1rem;
    font-family: 5rem;
  }
}
.heading-primary--sub {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1.75rem;
  animation: moveInRight 1s ease-out;
}
@media only screen and (max-width: 37.5em) {
  .heading-primary--sub {
    letter-spacing: 0.5rem;
  }
}

.heading-secondary {
  font-size: 3.5rem;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  background-image: linear-gradient(to right, #df80dacb, #963591);
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 0.2rem;
  transition: all 0.2s;
}
@media only screen and (max-width: 56.25em) {
  .heading-secondary {
    font-size: 3rem;
  }
}
@media only screen and (max-width: 37.5em) {
  .heading-secondary {
    font-size: 2.5rem;
  }
}
.heading-secondary:hover {
  transform: skewY(2deg) skewX(15deg) scale(1.1);
  text-shadow: 0.5rem 1rem 2rem rgba(0, 0, 0, 0.2);
}

.heading-tertiary {
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
}

.paragraph {
  font-size: 1.6rem;
}
.paragraph:not(:last-child) {
  margin-bottom: 3rem;
}

.u-center-text {
  text-align: center !important;
}

.u-margin-bottom-small {
  margin-bottom: 1.5rem !important;
}

.u-margin-bottom-medium {
  margin-bottom: 4rem !important;
}
@media only screen and (max-width: 56.25em) {
  .u-margin-bottom-medium {
    margin-bottom: 3rem !important;
  }
}

.u-margin-bottom-big {
  margin-bottom: 8rem !important;
}
@media only screen and (max-width: 56.25em) {
  .u-margin-bottom-big {
    margin-bottom: 5rem !important;
  }
}

.u-margin-top-big {
  margin-top: 8rem !important;
}

.u-margin-top-huge {
  margin-top: 10rem !important;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.15;
  overflow: hidden;
}
.bg-video__content {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.btn,
.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.5rem 4rem;
  display: inline-block;
  border-radius: 10rem;
  transition: all 0.2s;
  position: relative;
  font-size: 1.6rem;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}
.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.btn:active,
.btn:focus {
  outline: none;
  transform: translateY(-1px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.btn--white {
  background-color: #fff;
  color: #777;
}
.btn--white::after {
  background-color: #fff;
}

.btn--green {
  background-color: #be53b9;
  color: #fff;
}
.btn--green::after {
  background-color: #be53b9;
}

.btn--white-big {
  background-color: #f1e9e9;
  color: #be53b9;
  left: 36%;
  width: 20vw;
  text-align: center;
  box-shadow: 9px 9px 214px 17px #f2e9f2;
}
.btn--white-big::after {
  background-color: white;
}

.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 10rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.btn--animated {
  animation: moveInBottom 0.5s ease-out 0.75s;
  animation-fill-mode: backwards;
}

.btn-text:link,
.btn-text:visited {
  font-size: 1.6rem;
  color: #be53b9;
  display: inline-block;
  text-decoration: none;
  border-bottom: 1px solid #be53b9;
  padding: 3px;
  transition: all 0.2s;
}

.btn-text:hover {
  background-color: #be53b9;
  color: #fff;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.btn-text:active {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transform: translateY(0);
}

.card {
  perspective: 150rem;
  -moz-perspective: 150rem;
  position: relative;
  height: 52rem;
}
.card__side {
  height: 52rem;
  transition: all 0.8s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
}
.card__side--front {
  background-color: #fff;
}
.card__side--back {
  transform: rotateY(180deg);
}
.card__side--back-1 {
  background-image: linear-gradient(to right bottom, #ffb900, #ff7730);
}
.card__side--back-2 {
  background-image: linear-gradient(to right bottom, #df80dacb, #963591);
}
.card__side--back-3 {
  background-image: linear-gradient(to right bottom, #2998ff, #5643fa);
}
.card:hover .card__side--front {
  transform: rotateY(-180deg);
}
.card:hover .card__side--back {
  transform: rotateY(0);
}
.card__picture {
  background-size: cover;
  height: 23rem;
  background-blend-mode: screen;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.card__picture--1 {
  background-image: linear-gradient(to right bottom, #ffb900, #ff7730),
    url(../../public/img/nat-5.jpg);
}
.card__picture--2 {
  background-image: linear-gradient(to right bottom, #df80dacb, #963591),
    url(../../public/img/nat-6.jpg);
}
.card__picture--3 {
  background-image: linear-gradient(to right bottom, #2998ff, #5643fa),
    url(../../public/img/nat-7.jpg);
}
.card__heading {
  font-size: 2.8rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: right;
  color: #fff;
  position: absolute;
  top: 12rem;
  right: 2rem;
  width: 75%;
}
.card__heading-span {
  padding: 1rem 1.5rem;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.card__heading-span--1 {
  background-image: linear-gradient(
    to right bottom,
    rgba(255, 185, 0, 0.85),
    rgba(255, 119, 48, 0.85)
  );
}
.card__heading-span--2 {
  background-image: linear-gradient(
    to right bottom,
    rgba(223, 128, 218, 0.85),
    rgba(150, 53, 145, 0.85)
  );
}
.card__heading-span--3 {
  background-image: linear-gradient(
    to right bottom,
    rgba(41, 152, 255, 0.85),
    rgba(86, 67, 250, 0.85)
  );
}
.card__details {
  padding: 3rem;
}
.card__details ul {
  list-style: none;
  width: 80%;
  margin: 0 auto;
}
.card__details ul li {
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.card__details ul li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.card__cta {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  text-align: center;
}
.card__price-box {
  text-align: center;
  color: #fff;
  margin-bottom: 8rem;
}
.card__price-only {
  font-size: 1.4rem;
  text-transform: uppercase;
}
.card__price-value {
  font-size: 6rem;
  font-weight: 100;
}
@media only screen and (max-width: 56.25em), only screen and (hover: none) {
  .card {
    height: auto;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
  }
  .card__side {
    height: auto;
    position: relative;
    box-shadow: none;
  }
  .card__side--back {
    transform: rotateY(0);
    clip-path: polygon(0 15%, 100% 0, 100% 100%, 0% 100%);
  }
  .card:hover .card__side--front {
    transform: rotateY(0);
  }
  .card__details {
    padding: 1rem 3rem;
  }
  .card__cta {
    position: relative;
    top: 0%;
    left: 0;
    transform: translate(0);
    width: 100%;
    padding: 7rem 4rem 4rem 4rem;
  }
  .card__price-box {
    margin-bottom: 3rem;
  }
  .card__price-value {
    font-size: 4rem;
  }
}

.composition {
  position: relative;
}
.composition__photo {
  width: 55%;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  position: absolute;
  z-index: 10;
  transition: all 0.2s;
  outline-offset: 2rem;
}
@media only screen and (max-width: 56.25em) {
  .composition__photo {
    float: left;
    position: relative;
    width: 33.33333333%;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.2);
  }
}
.composition__photo--p1 {
  left: 0;
  top: -2rem;
}
@media only screen and (max-width: 56.25em) {
  .composition__photo--p1 {
    top: 0;
    transform: scale(1.2);
  }
}
.composition__photo--p2 {
  right: 0;
  top: 2rem;
}
@media only screen and (max-width: 56.25em) {
  .composition__photo--p2 {
    top: -1rem;
    transform: scale(1.3);
    z-index: 100;
  }
}
.composition__photo--p3 {
  left: 20%;
  top: 10rem;
}
@media only screen and (max-width: 56.25em) {
  .composition__photo--p3 {
    top: 1rem;
    left: 0;
    transform: scale(1.1);
  }
}
.composition__photo:hover {
  outline: 1.5rem solid #be53b9;
  transform: scale(1.05) translateY(-0.5rem);
  box-shadow: 0 2.5rem 4rem rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.composition:hover .composition__photo:not(:hover) {
  transform: scale(0.95);
}

.feature-box {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  border-radius: 3px;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
}
@media only screen and (max-width: 56.25em) {
  .feature-box {
    padding: 2rem;
  }
}
.feature-box__icon {
  font-size: 6rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  background-image: linear-gradient(to right, #df80dacb, #963591);
  -webkit-background-clip: text;
  color: transparent;
}
@media only screen and (max-width: 56.25em) {
  .feature-box__icon {
    margin-bottom: 0;
  }
}
.feature-box:hover {
  transform: translateY(-1.5rem) scale(1.03);
}

.form__group:not(:last-child) {
  margin-bottom: 2rem;
}

.form__input {
  font-size: 1.5rem;
  font-family: inherit;
  color: inherit;
  padding: 1.5rem 2rem;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-bottom: 3px solid transparent;
  width: 90%;
  display: block;
  transition: all 0.3s;
}
@media only screen and (max-width: 56.25em) {
  .form__input {
    width: 100%;
  }
}
.form__input:focus {
  outline: none;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #be53b9;
}
.form__input:focus:invalid {
  border-bottom: 3px solid #ff7730;
}
.form__input::-webkit-input-placeholder {
  color: #999;
}

.form__label {
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 2rem;
  margin-top: 0.7rem;
  display: block;
  transition: all 0.3s;
}

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4rem);
}

.form__radio-group {
  width: 49%;
  display: inline-block;
}
@media only screen and (max-width: 56.25em) {
  .form__radio-group {
    width: 100%;
    margin-bottom: 2rem;
  }
}

.form__radio-input {
  display: none;
}

.form__radio-label {
  font-size: 1.6rem;
  cursor: pointer;
  position: relative;
  padding-left: 4.5rem;
}

.form__radio-button {
  height: 3rem;
  width: 3rem;
  border: 5px solid #be53b9;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: -0.4rem;
}
.form__radio-button::after {
  content: "";
  display: block;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #be53b9;
  opacity: 0;
  transition: opacity 0.2s;
}

.form__radio-input:checked ~ .form__radio-label .form__radio-button::after {
  opacity: 1;
}

.popup {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}
@supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
  .popup {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.popup__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  background-color: #fff;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  display: table;
  overflow: hidden;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.25);
  transition: all 0.5s 0.2s;
}
.popup__left {
  width: 33.333333%;
  display: table-cell;
}
.popup__right {
  width: 66.6666667%;
  display: table-cell;
  vertical-align: middle;
  padding: 3rem 5rem;
}
.popup__img {
  display: block;
  width: 100%;
}
.popup__text {
  font-size: 1.4rem;
  margin-bottom: 4rem;
  -moz-column-count: 2;
  -moz-column-gap: 4rem;
  -moz-column-rule: 1px solid #eee;
  column-count: 2;
  column-gap: 4rem;
  column-rule: 1px solid #eee;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
.popup:target {
  opacity: 1;
  visibility: visible;
}
.popup:target .popup__content {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.popup__close:link,
.popup__close:visited {
  color: #777;
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  font-size: 3rem;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
  line-height: 1;
}
.popup__close:hover {
  color: #be53b9;
}

.story {
  width: 75%;
  margin: 0 auto;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  padding: 6rem;
  padding-left: 9rem;
  font-size: 1.6rem;
  transform: skewX(-12deg);
}
@media only screen and (max-width: 56.25em) {
  .story {
    width: 100%;
    padding: 4rem;
    padding-left: 7rem;
  }
}
@media only screen and (max-width: 37.5em) {
  .story {
    transform: skewX(0);
  }
}
.story__shape {
  width: 15rem;
  height: 15rem;
  float: left;
  transform: translateX(-3rem) skewX(12deg);
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
@supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
  .story__shape {
    -webkit-clip-path: circle(50% at 50% 50%);
    clip-path: circle(50% at 50% 50%);
    -webkit-shape-outside: circle(50% at 50% 50%);
    shape-outside: circle(50% at 50% 50%);
    border-radius: none;
  }
}
@media only screen and (max-width: 37.5em) {
  .story__shape {
    transform: translateX(-3rem) skewX(0);
  }
}
.story__img {
  height: 100%;
  transform: translateX(-4rem) scale(1.4);
  backface-visibility: hidden;
  transition: all 0.5s;
}
.story__text {
  transform: skewX(12deg);
}
@media only screen and (max-width: 37.5em) {
  .story__text {
    transform: skewX(0);
  }
}
.story__caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20%);
  color: #fff;
  text-transform: uppercase;
  font-size: 1.7rem;
  text-align: center;
  opacity: 0;
  transition: all 0.5s;
  backface-visibility: hidden;
}
.story:hover .story__caption {
  opacity: 1;
  transform: translate(-50%, -50%);
}
.story:hover .story__img {
  transform: translateX(-4rem) scale(1);
  filter: blur(3px) brightness(80%);
}

.footer {
  background-color: #333;
  padding: 10rem 0;
  font-size: 1.4rem;
  color: #f7f7f7;
}
@media only screen and (max-width: 56.25em) {
  .footer {
    padding: 8rem 0;
  }
}
.footer__logo-box {
  text-align: center;
  margin-bottom: 8rem;
}
@media only screen and (max-width: 56.25em) {
  .footer__logo-box {
    margin-bottom: 6rem;
  }
}
.footer__logo {
  width: 15rem;
  height: auto;
}
.footer__navigation {
  border-top: 1px solid #777;
  padding-top: 2rem;
  display: inline-block;
}
@media only screen and (max-width: 56.25em) {
  .footer__navigation {
    width: 100%;
    text-align: center;
  }
}
.footer__list {
  list-style: none;
}
.footer__item {
  display: inline-block;
}
.footer__item:not(:last-child) {
  margin-right: 1.5rem;
}
.footer__link:link,
.footer__link:visited {
  color: #f7f7f7;
  background-color: #333;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  transition: all 0.2s;
}
.footer__link:hover,
.footer__link:active {
  color: #be53b9;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
  transform: rotate(5deg) scale(1.3);
}
.footer__copyright {
  border-top: 1px solid #777;
  padding-top: 2rem;
  width: 80%;
  float: right;
}
@media only screen and (max-width: 56.25em) {
  .footer__copyright {
    width: 100%;
    float: none;
  }
}

.row {
  max-width: 114rem;
  margin: 0 auto;
}
.row:not(:last-child) {
  margin-bottom: 8rem;
}
@media only screen and (max-width: 56.25em) {
  .row:not(:last-child) {
    margin-bottom: 6rem;
  }
}
@media only screen and (max-width: 56.25em) {
  .row {
    max-width: 50rem;
    padding: 0 3rem;
  }
}
.row::after {
  content: "";
  display: table;
  clear: both;
}
.row [class^="col-"] {
  float: left;
}
.row [class^="col-"]:not(:last-child) {
  margin-right: 6rem;
}
@media only screen and (max-width: 56.25em) {
  .row [class^="col-"]:not(:last-child) {
    margin-right: 0;
    margin-bottom: 6rem;
  }
}
@media only screen and (max-width: 56.25em) {
  .row [class^="col-"] {
    width: 100% !important;
  }
}
.row .col-1-of-2 {
  width: calc((100% - 6rem) / 2);
}
.row .col-1-of-3 {
  width: calc((100% - 2 * 6rem) / 3);
}
.row .col-2-of-3 {
  width: calc(2 * ((100% - 2 * 6rem) / 3) + 6rem);
}
.row .col-1-of-4 {
  width: calc((100% - 3 * 6rem) / 4);
}
.row .col-2-of-4 {
  width: calc(2 * ((100% - 3 * 6rem) / 4) + 6rem);
}
.row .col-3-of-4 {
  width: calc(3 * ((100% - 3 * 6rem) / 4) + 2 * 6rem);
}

.header {
  height: 85vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(223, 128, 218, 0.8),
      rgba(150, 53, 145, 0.8)
    ),
    url(../../public/img/hero-small.jpg);
  background-size: cover;
  background-position: top;
  position: relative;
}
@supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
  .header {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
    height: 95vh;
  }
}
@media only screen and (min-resolution: 192dpi) and (min-width: 37.5em),
  only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 37.5em),
  only screen and (min-width: 125em) {
  .header {
    background-image: linear-gradient(
        to right bottom,
        rgba(223, 128, 218, 0.8),
        rgba(150, 53, 145, 0.8)
      ),
      url(../../public/img/hero.jpg);
  }
}
@media only screen and (max-width: 37.5em) {
  .header {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%);
  }
}
.header__logo-box {
  position: absolute;
  top: 4rem;
  left: 4rem;
}
.header__logo {
  height: 15rem;
  filter: drop-shadow(0px 0px 20px #ece6e6);
}
.header__text-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.navigation__checkbox {
  display: none;
}

.navigation__button {
  background-color: #fff;
  height: 7rem;
  width: 7rem;
  position: fixed;
  top: 6rem;
  right: 6rem;
  border-radius: 50%;
  z-index: 2000;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
}
@media only screen and (max-width: 56.25em) {
  .navigation__button {
    top: 4rem;
    right: 4rem;
  }
}
@media only screen and (max-width: 37.5em) {
  .navigation__button {
    top: 3rem;
    right: 3rem;
  }
}

.navigation__background {
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient(#df80dacb, #963591);
  z-index: 1000;
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
}
@media only screen and (max-width: 56.25em) {
  .navigation__background {
    top: 4.5rem;
    right: 4.5rem;
  }
}
@media only screen and (max-width: 37.5em) {
  .navigation__background {
    top: 3.5rem;
    right: 3.5rem;
  }
}

.navigation__nav {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  opacity: 0;
  width: 0;
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.navigation__list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  width: 100%;
}

.navigation__item {
  margin: 1rem;
}

.navigation__link:link,
.navigation__link:visited {
  display: inline-block;
  font-size: 3rem;
  font-weight: 300;
  padding: 1rem 2rem;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 220%;
  transition: all 0.4s;
}
.navigation__link:link span,
.navigation__link:visited span {
  margin-right: 1.5rem;
  display: inline-block;
}

.navigation__link:hover,
.navigation__link:active {
  background-position: 100%;
  color: #be53b9;
  transform: translateX(1rem);
}

.navigation__checkbox:checked ~ .navigation__background {
  transform: scale(80);
}

.navigation__checkbox:checked ~ .navigation__nav {
  opacity: 1;
  width: 100%;
}

.navigation__icon {
  position: relative;
  margin-top: 3.5rem;
}
.navigation__icon,
.navigation__icon::before,
.navigation__icon::after {
  width: 3rem;
  height: 2px;
  background-color: #333;
  display: inline-block;
}
.navigation__icon::before,
.navigation__icon::after {
  content: "";
  position: absolute;
  left: 0;
  transition: all 0.2s;
}
.navigation__icon::before {
  top: -0.8rem;
}
.navigation__icon::after {
  top: 0.8rem;
}

.navigation__button:hover .navigation__icon::before {
  top: -1rem;
}

.navigation__button:hover .navigation__icon::after {
  top: 1rem;
}

.navigation__checkbox:checked + .navigation__button .navigation__icon {
  background-color: transparent;
}

.navigation__checkbox:checked + .navigation__button .navigation__icon::before {
  top: 0;
  transform: rotate(135deg);
}

.navigation__checkbox:checked + .navigation__button .navigation__icon::after {
  top: 0;
  transform: rotate(-135deg);
}

.section-about {
  background-color: #f7f7f7;
  padding: 25rem 0;
  margin-top: -20vh;
}
@media only screen and (max-width: 56.25em) {
  .section-about {
    padding: 20rem 0;
  }
}

.section-features {
  padding: 20rem 0;
  background-image: linear-gradient(
      to right bottom,
      rgba(223, 128, 218, 0.8),
      rgba(150, 53, 145, 0.8)
    ),
    url(../../public/img/nat-4.jpg);
  background-size: cover;
  transform: skewY(-7deg);
  margin-top: -10rem;
  z-index: 2;
}
.section-features > * {
  transform: skewY(7deg);
}
@media only screen and (max-width: 56.25em) {
  .section-features {
    padding: 10rem 0;
  }
}

.section-tours {
  background-color: #f7f7f7;
  padding: 25rem 0 15rem 0;
  margin-top: -10rem;
}
@media only screen and (max-width: 56.25em) {
  .section-tours {
    padding: 20rem 0 10rem 0;
  }
}

.section-stories {
  background-image: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(196, 161, 194, 0.8)
    ),
    url(../../public/img/prsguitar.jpg);
  background-size: cover;
  position: relative;
  padding: 15rem 0;
  clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
}
@media only screen and (max-width: 56.25em) {
  .section-stories {
    padding: 10rem 0;
  }
}

.section-book {
  padding: 15rem 0;
  background-image: linear-gradient(to right bottom, #df80dacb, #963591);
}
@media only screen and (max-width: 56.25em) {
  .section-book {
    padding: 10rem 0;
  }
}

.book {
  background-image: linear-gradient(
      105deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.9) 50%,
      transparent 50%
    ),
    url(../../public/img/nat-10.jpg);
  background-size: 100%;
  border-radius: 3px;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
}
@media only screen and (max-width: 75em) {
  .book {
    background-image: linear-gradient(
        105deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.9) 65%,
        transparent 65%
      ),
      url(../../public/img/nat-10.jpg);
    background-size: cover;
  }
}
@media only screen and (max-width: 56.25em) {
  .book {
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.9) 100%
      ),
      url(../../public/img/nat-10.jpg);
  }
}
.book__form {
  width: 50%;
  padding: 6rem;
}
@media only screen and (max-width: 75em) {
  .book__form {
    width: 65%;
  }
}
@media only screen and (max-width: 56.25em) {
  .book__form {
    width: 100%;
  }
}
</style>
