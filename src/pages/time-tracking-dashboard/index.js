class TimeTrackingCard extends HTMLElement {
  categories = {
    work: {
      name: 'Work',
      icon: 'work'
    },
    play: {
      name: 'Play',
      icon: 'play'
    },
    study: {
      name: 'Study',
      icon: 'study'
    },
    exercise: {
      name: 'Exercise',
      icon: 'exercise'
    },
    social: {
      name: 'Social',
      icon: 'social'
    },
    self_care: {
      name: 'Self Care',
      icon: 'self_care'
    }
  }

  constructor() {
    super()

    this.category =
      this.categories[this.getAttribute('category')] ?? this.categories.work

    this.innerHTML = /*html*/ `
        <style>${TimeTrackingCard.style}</style>
        <div class="card">
            <div class="card-container">
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
                <h1 class="card-current-time">32hrs</h1>
                <p class="card-previous-time">Last Week - 36hr</p>
            </div>
        </div>
    `
  }

  static get style() {
    return /*css*/ `
        @scope {
            .card {
                --size-x: 280px;
                --size-y: 200px;

                position: relative;
                width: var(--size-x);
                height: var(--size-y);
                padding: 32px;
                background-color: var(--dark-blue);
                border-radius: 16px;
                color: #fff;
                cursor: pointer;

                &:hover {
                    background-color: hsl(236, 41%, 34%);
                }
            }

            .card::before {
                content: '';
                width: 100%;
                height: 80px;
                display: block;
                position: absolute;
                top: -50px;
                right:0;
                z-index: -10;
                background-color: var(--light-red-work);
                border-radius: 16px;
                background-image: url('./assets/icon-work.svg');
                background-repeat: no-repeat;
                background-position: right;
                background-position-x: 90%;
                background-position-y: -10px;
                background-size: 90px;
            }

            .card-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                width: 100%;
                height: 100%;
            }

            .card-nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .card-title {
                font-size: 18px;
            }

            .card-current-time {
                font-size: 54px;
                font-weight: 300;
            }

            .card-previous-time {
                font-size: 16px;
                font-weight: 400;
                color: var(--pale-blue);
            }

            button {
                background: transparent;
                border: none;
                cursor: pointer;
                
                &>svg {
                    width: 30px;
                    height: 10px;
                    color: #BBC0FF;

                    &:hover {
                        color: white;
                    }
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
        }
    `
  }
}

customElements.define('time-tracking-card', TimeTrackingCard)
