import { useState } from "react";

let colors = ['red', 'blue', 'yellow', 'green', 'orange'];
let figures = ['Star', 'Circle', 'Polygon'];

function generateArray(count){
    let arr = [];
    for (let i = 0; i < figures.length; i++){
        for (let j = 0; j < colors.length; j++){
            if (i * colors.length + j >= count){
                return arr;
            } 
            arr.push(colors[j] + figures[i]);
            arr.push(colors[j] + figures[i]);
        }
    }
    return arr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArray(count){
    let arr = generateArray(count);
    let newArr = [];

    for (let i = arr.length; i > 0; i--){
        let r = getRandomInt(i);
        newArr.push(arr[r]);
        arr.splice(r, 1);
    }
    return newArr;
}

function GameImg(props){
    let src = props.imgSrc;

    const [frStyle, setFrStyle] = useState(
        {
            width: '100px',
            position: 'absolute',
            transitionDuration: '0.5s',
            cursor: 'pointer',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
        }
    )
    const [bcStyle, setBcStyle] = useState(
        {
            width: '100px',
            position: 'absolute',
            transitionDuration: '0.5s',
            cursor: 'pointer',
            backfaceVisibility: 'hidden'
        }
    )

    let click = () => {
        let r1 = 'perspective(300px) rotateY(-180deg)';
        let r2 = 'perspective(300px) rotateY(0deg)';
        let r3 = 'perspective(300px) rotateY(180deg)';

        let a;
        let b;

        if (bcStyle.transform == 'perspective(300px) rotateY(-180deg)'){
            a = r2;
            b = r3;
        }
        else{
            a = r1;
            b = r2;
        }

        setBcStyle(
            {
                ...bcStyle,
                transform: a
            }
        )
        setFrStyle(
            {
                ...frStyle,
                transform: b
            }
        )
    }

    return(
        <div onClick={click} style={{width: '100px', height: '100px'}}>
            <img style={bcStyle}src={"imgs/back.png"}></img>  
            <img style={frStyle} src={"imgs/" + src + ".png"}></img>       
        </div>
    )
}
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 100px)'
}
export function Game(){
    let arr = getRandomArray(15);
    return(
        <div style={gridStyle}>
            {
                arr.map((val, i) => {
                    return(
                        <GameImg key={i} imgSrc={val}></GameImg>
                    )
                })
            }
        </div>
    )
}