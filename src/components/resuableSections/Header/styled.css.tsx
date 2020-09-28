import { css } from 'styled-components';

const styles = css`
  min-height: 362px;
  height: 50vh;


  p, p > span, h1 {
    color: white;
    text-shadow: 1px 2px 2px black;
    font-weight: bold;
  }

  svg {
    font-size: 2rem;

    path {
      color: red;
    }
  }

  div.bg {
    min-height: 362px;
    height: 50vh;
    width: 100%;
    position: absolute;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-bottom-right-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }
  }

  div.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;

    div.nav{
      padding: 1rem 5rem;
      display: flex;
      &.offline {
        justify-content: space-between;
        background: #ff920057;
      }
      a {
        height: 2rem;
        font-weight: bold;
        background: linear-gradient(to right,#00d2ff 0%,#3a7bd5 51%);
        color: white;
        transition: 0.5s linear;
        position: relative;
        padding: .4rem 1rem;
        border-radius: .4rem;
        opacity: 0.8;
        box-shadow: 1px 2px #00000047;

        &:hover, &:focus {
          opacity: 1;
          top: -1px;
          box-shadow: 2px 3px 9px #00000047;
        }
      }

      div {
        width: 100%;
        display: flex;
        justify-content: center;
        height: 2rem;
        align-items: center;
        color: red;
        font-weight: bold;
        max-width: 30rem;
        border-radius: .3rem;
        text-shadow: 1px 1px white;
        font-size: 1.2rem;
      }
    }

    div.below {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;

      & > div.left {
        padding-left: 10%;
        align-items: flex-start;

        > div {
          display: flex;
          flex-flow: column;
          width: fit-content;
        }

        > div > div {
          display: flex;

          svg {
            margin-right: 0.8rem;
            font-size: 1.4rem;
            position: relative;
            top: 0.35rem;

            path {
              fill: #59576d;
            }
          }
        }

        div.deg {
          display: flex;
          flex-flow: column;
          align-items: center;

          img {
            margin: 1rem 0;
            border-radius: 50%;
            height: 4rem;
            width: 4rem;
          }
        }

        .location {
          .city {
            font-size: 2rem;
          }
          .country {
            font-size: 0.8rem;
            font-weight: normal;
          }
        }
      }

      & > div.right {
        display: flex;
        justify-content: flex-end;
        padding-right: 10%;
        flex-flow: column;
        align-items: center;

        h1 {
          font-family: cursive;
          font-size: 6rem;
        }
        button {
          background: none;
        }
      }
    }

    div.last {
      display: none;
    }
  }


  @media screen and (max-width: 1000px)   {
    div.content > div.nav {
      padding: 1rem;
    }
  }
  @media screen and (max-width: 650px) {
    div.content {
      div.below {
        & > div.left {
          padding-left: 5%;
        }
        & > div.right {
          padding-right: 5%;

          h1 {
            font-size: 3rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 420px) {
    div.content {

    div.nav{
      padding: .5rem 1rem;
    }
      div.below  {
        display: flex;
        flex-flow: column-reverse;
        justify-content: space-around;
        & > div {
          width: 100%;
        }

        & > div.left {
          padding-left: 0;
          align-items: center;
          justify-content: center;
          display: flex;

          div.deg {
            p {
              font-size: 2rem;
            }
            span:last-child{
              bottom: 0.8rem;
            }
          }
        }
        & > div.right {
          padding-right: 0;
          justify-content: center;

          button {
            display: none;
          }
        }
      }

      div.last {
        display: flex;
        justify-content: center;
        padding: 1rem;

        button {
          background: none;
        }
      }
    }
  }
`;

export default styles;
