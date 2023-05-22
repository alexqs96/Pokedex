import styled, {css} from 'styled-components'

export const Button = styled.button`
  background-color: transparent;
  border-radius: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  padding: 0.8rem 1.5rem;
  transition: border-color .3s, background-color .3s;
  font-weight: bold;

  &:hover{
    border-color: rgba(0,0,0,.5);
  }

  ${props => props.$black && css`
    background-color: black;
    color: white;

    &:hover{
      background-color: white;
      color: black;
    }
  `}

`

export const Tag = styled.div`
  display: flex;
  gap: .3rem;
  position: absolute;
  top: -20%;
  margin-inline: auto;
  inset-inline: 0;
  width: fit-content;
  transform: skew(-15deg);
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  border-radius: 0.5rem;
  border: 1px solid rgba(0,0,0,.5);
  background: linear-gradient(to bottom, ${props => props.$color} 0%, #fff 65%);
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  cursor: pointer;
  font-family: "Flexo";
  font-weight: bold;
  font-size: 1.8rem;
  transition: background-color .3s, border .3s;
  text-transform: capitalize;
  overflow: hidden;

  img{
    height: 100%;
    aspect-ratio: 1/1;
    transition: transform .3s, background-position .5s;
  }

  &:hover img{
    transform: scale(1.04);
  }

  h3{
    letter-spacing: .1rem;
    color: #000;
  }

  #details{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: .3rem;
    justify-content: center;
    margin-top: 1.5rem;
    padding: 1.5rem 0 1rem;
    font-size: small;
    border-top: 1px solid #000;
    background: linear-gradient(to right, #b07a05 25%, #b9b9b9 100%), url("/img/bg_pattern.png");
    background-blend-mode: color-burn;
    position: relative;
  }

  #details h6{
    background: linear-gradient(to top, rgba(0,0,0, .85) 0%, #FF0000 50%), #fff;
    width: fit-content;
    color: #fff;
    font-family: "Inter";
    font-weight: 600;
    font-size: medium;
    border-radius: .3rem;
    padding: .2rem .8rem;
    border: 2px solid #000;
  }

  #details h6:nth-of-type(2){
    background: linear-gradient(to top, rgba(0,0,0, .85) 0%, #545454 50%), #fff;
  }

  #details span{
    font-family: "Inter";
    transform: skew(-15deg);
    background-color: #000;
    border-radius: .5rem;
    color: #fff;
    padding: .3rem .5rem .3rem .45rem;
  }

`
export const ItemsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.$width}, 1fr));
  place-items: center;
  gap: 1rem;
  height: fit-content;
  width: 95%;
  margin-inline: auto;
`

export const FilterOption = styled.span`
  background-color: ${props => props.$color};
  border-radius: 50%;
  height: 20px;
  width: 20px;
`

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  height: 100%;
  width: 100%;
  background: url('/img/bg_pattern.png'), linear-gradient(to top, #000 0%, #6600ff 100%);
  background-blend-mode: overlay;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: .8rem;
  color: #fff;

  h2{
    text-transform: capitalize;
  }

  p{
    letter-spacing: .1rem;
  }
`