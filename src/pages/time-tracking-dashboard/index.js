class TimeTrackingCard extends HTMLElement {
  constructor() {
    super()

    this.category = this.getAttribute('category') ?? 'default'

    this.innerHTML = /*html*/ `
        <style>${TimeTrackingCard.style}</style>
        <div class="card">
            <div class="card-container">
                <div class="card-nav">
                <h4 class="card-title">${this.category}</h4>
                <img src="./assets/icon-ellipsis.svg" alt="" />
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
                --size-x: 300px;
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
                background-position-x: 190px;
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
                font-size: 52px;
                font-weight: 300;
            }

            .card-previous-time {
                font-size: 14px;
                font-weight: 400;
                color: var(--pale-blue);
            }
        }
    `
  }
}

customElements.define('time-tracking-card', TimeTrackingCard)
