import { data as DATA } from './assets/data.js'

const $controls = document.querySelectorAll('input[type="radio"]')
const $card = document.querySelectorAll('time-tracking-card')

$controls.forEach((el) => {
  el.addEventListener('click', (_) => {
    $card.forEach((card) => {
      card.setAttribute('time', el.value)
    })
  })
})

class TimeTrackingCard extends HTMLElement {
  categories = {
    WORK: 'work',
    PLAY: 'play',
    STUDY: 'study',
    EXERCISE: 'exercise',
    SOCIAL: 'social',
    SELFCARE: 'selfcare'
  }

  timeFrequencies = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
  }

  data = DATA
  time = null
  category = null

  constructor() {
    super()

    this.category =
      this.data[this.getAttribute('category')] ??
      this.data[this.categories.WORK]

    this.time = this.getAttribute('time') ?? this.timeFrequencies.WEEKLY

    console.log(this.category)

    this.cstyle =
      this.category.slug !== this.categories.WORK
        ? `card-${this.category.slug}`
        : ''

    this.renderCard()
  }

  static get observedAttributes() {
    return ['time']
  }

  attributeChangedCallback(_, __, now) {
    this.renderCard(now)
  }

  renderCard(curretnTime = this.time) {
    const current = this.data[this.category.slug]
    const timeframe = current.timeframes[curretnTime]

    this.innerHTML = /*html*/ `
        <style>
          ${TimeTrackingCard.style}
        </style>

        <article class="card ${this.cstyle}">
          <div class="card-content">
            <div class="card-nav">
              <h4 class="card-title">${current.title}</h4>
              <button id="btnCard">
                <span class="sr-only">options</span>
                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="card-time">
              <h1 class="card-current-time">${timeframe.current}hrs</h1>
              <p class="card-previous-time">Last Week - ${timeframe.previous}hr</p>    
            </div>
          </div>
        </article>
    `
  }

  static get style() {
    return /*css*/ `
        @scope {
            .card {
              --size-x: 100%;
              --size-y: auto;

              width: var(--size-x);
              height: auto;

              border-radius: var(--rounded);
              background-color: var(--light-red-work);
              background-image: url("./assets/icon-work.svg");
              background-repeat: no-repeat;
              background-size: 82px;
              background-position-x: 90%;
              background-position-y: -10px;

              cursor: pointer;
              overflow: hidden;

              box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);

              &:hover .card-content {
                background-color: #34397b;
              }
            }

            .card-content {
              width: var(--size-x);
              height: var(--size-y);
              margin-top: 50px;
              padding: 32px;
              border-radius: var(--rounded);
              
              color: #fff;
              background-color: hsl(235, 46%, 20%);
              box-shadow: 0px -10px 15px -3px rgba(0,0,0,.2);

              transition-property: background-color;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 300ms;
            }

            .card-nav {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }

            .card-title {
              font-size: 18px;
              font-weight: 500;
            }

            .card-time {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .card-current-time {
              font-size: 40px;
              font-weight: 300;
            }

            .card-previous-time {
              font-size: 14px;
              font-weight: 400;
              color: var(--pale-blue);
            }

            button {
              background: transparent;
              border: none;
              cursor: pointer;

              &>svg {
                color: #BBC0FF;
              }

              &:hover svg {
                color: white;
              }
            }

            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border-width: 0;
            }

            .card-play {
              background-image: url(${`./assets/icon-play.svg`});
              background-color: var(--soft-blue-play);
            }

            .card-study {
              background-image: url(${`./assets/icon-study.svg`});
              background-color: var(--light-red-study);
              background-position-y: -6px;
            }

            .card-exercise {
              background-image: url(${`./assets/icon-exercise.svg`});
              background-color: var(--lime-green-exercise);
              background-position-y: 0px;
            }

            .card-social {
              background-image: url(${`./assets/icon-social.svg`});
              background-color: var(--violet-social);
              background-position-y: -18px;
            }

            .card-selfcare {
              background-image: url(${`./assets/icon-self-care.svg`});
              background-color: var(--soft-orange-self-care);
              background-position-y: -18px;
            }

            @media screen and (min-width: 768px) {
              .card {
                --size-y: 200px;
              }

              .card-nav {
                margin-bottom: 20px; 
              }

              .card-time {
                flex-direction: column;
                align-items: flex-start;
              }

              .card-current-time {
                font-size: 54px;
                margin-bottom: 10px; 
              }

              .card-previous-time {
                font-size: 16px;
              }
            }

            @media screen and (min-width: 1024px) {
              .card {
                --size-x: 100%;
              }
            }
        }
    `
  }
}

customElements.define('time-tracking-card', TimeTrackingCard)
