class TimeTrackingCard extends HTMLElement {
  categories = {
    work: {
      name: 'Work',
      icon: 'work'
    },
    play: {
      name: 'Play',
      icon: 'play',
      style: 'play'
    },
    study: {
      name: 'Study',
      icon: 'study',
      style: 'study'
    },
    exercise: {
      name: 'Exercise',
      icon: 'exercise',
      style: 'exercise'
    },
    social: {
      name: 'Social',
      icon: 'social',
      style: 'social'
    },
    'self-care': {
      name: 'Self Care',
      icon: 'self_care',
      style: 'self-care'
    }
  }

  constructor() {
    super()

    this.category =
      this.categories[this.getAttribute('category')] ?? this.categories.work

    this.cstyle =
      this.category.name != 'work' ? `card-${this.category.style}` : ''

    this.innerHTML = /*html*/ `
        <style>
          ${TimeTrackingCard.style}
          </style>

        <article class="card ${this.cstyle}">
            <div class="card-content">
                <div class="card-nav">
                  <h4 class="card-title">${this.category.name}</h4>
                  <button>
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
                  <h1 class="card-current-time">32hrs</h1>
                  <p class="card-previous-time">Last Week - 36hr</p>    
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

              &:hover .card-content {
                  background-color: #34397b;
              }
            }

            .card-content {
              width: 100%;
              height: var(--size-y);
              margin-top: 50px;
              padding: 32px;
              border-radius: var(--rounded);
              
              color: #fff;
              background-color: hsl(235, 46%, 20%);
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

            .card-self-care {
              background-image: url(${`./assets/icon-self-care.svg`});
              background-color: var(--soft-orange-self-care);
              background-position-y: -18px;
            }

            @media screen and (min-width: 768px) {
              .card {
                --size-x: 280px;
                --size-y: 210px;
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
        }
    `
  }
}

customElements.define('time-tracking-card', TimeTrackingCard)
