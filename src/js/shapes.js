import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

const currShapesAmout = document.getElementById('ShapesAmount');
const btnSpeedIncrease = document.getElementById('BtnSpeedIncrease');
const btnSpeedDecrease = document.getElementById('BtnSpeedDecrease');
const currShapesSpeed = document.getElementById('ShapesSpeed');
const btnGravityIncrease = document.getElementById('BtnGravityIncrease');
const btnGravityDecrease = document.getElementById('BtnGravityDecrease');
const currGravity = document.getElementById('Gravity');

let app; 
let activeShapesAmount = 0; 
let shapesSpeed = 1;
let gravity = 1;
let figuresTotalAmount = -1; 
const figures = []; 

const width = window.innerWidth; 
const height = window.innerHeight; 

const controller = {
    clearFigure() {
        this.clear();
        figures[this.num].live = false;
        activeShapesAmount -= 1;
    }
}

const model = {
    createCanvas: () => {
        app = new PIXI.Application({
            width: width - 0.2 * width, 
            height: height - 0.2 * height, 
            backgroundColor: 0x1099bb, 
            antialias: true,  
        });
        document.getElementById('MainArea').appendChild(app.view);
    },
    drawShape: (posX, posY) => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const radius = 50;
        const inAreaX = width - 0.2 * width - 100; 
        const shapeX = posX || Math.floor(Math.random() * inAreaX);
        const shapeY = posY || -50;
        const randRotation = Math.floor(Math.random() * 360);

        const shapesArr = []; // Array of created shapes

        const shape0 = new PIXI.Graphics();
        shape0.lineStyle(0)
              .beginFill(`0x${randomColor}`, 1)
              .drawRegularPolygon(shapeX, shapeY, radius, 3, randRotation)
              .endFill();
        shapesArr.push(shape0); 

        const shape1 = new PIXI.Graphics();
        shape1.lineStyle(0)
              .beginFill(`0x${randomColor}`, 1)
              .drawRegularPolygon(shapeX, shapeY, radius, 4, randRotation)
              .endFill();
        shapesArr.push(shape1);  

        const shape2 = new PIXI.Graphics();
        shape2.lineStyle(0)
              .beginFill(`0x${randomColor}`, 1)
              .drawRegularPolygon(shapeX, shapeY, radius, 5, randRotation)
              .endFill();
        shapesArr.push(shape2);  

        const shape3 = new PIXI.Graphics();
        shape3.lineStyle(0)
              .beginFill(`0x${randomColor}`, 1)
              .drawRegularPolygon(shapeX, shapeY, radius, 6, randRotation)
              .endFill();
        shapesArr.push(shape3);

        const shape4 = new PIXI.Graphics();
        shape4.lineStyle(0)
              .beginFill(`0x${randomColor}`, 1)
              .drawCircle(shapeX, shapeY, radius)
              .endFill();
        shapesArr.push(shape4);  

        const shape5 = new PIXI.Graphics();
        shape5.lineStyle(0)
              .beginFill(`0x${randomColor}`, 1)
              .drawEllipse(shapeX, shapeY, radius, radius / 2)
              .endFill();
        shapesArr.push(shape5);  

        const randShape = shapesArr[Math.floor(Math.random() * 6)];

        figures.push(randShape); // add shape to the array of all created figures

        randShape.interactive = true;
        randShape.buttonMode = true;
        randShape.live = true;
        figuresTotalAmount += 1;
        randShape.num = figuresTotalAmount; 

        activeShapesAmount += 1;

        app.stage.addChild(randShape);
        randShape.addListener('pointerdown', controller.clearFigure);
    },
}

const view = {
    loadGame() {
        model.createCanvas();
        model.drawShape();

        btnSpeedDecrease.addEventListener("click", () => {
            if (shapesSpeed > 1) { shapesSpeed -= 1; }
        });
        btnSpeedIncrease.addEventListener("click", () => {
            shapesSpeed += 1;
        });
        
        btnGravityDecrease.addEventListener("click", () => {
            if (gravity > 1) { gravity -= 1; }
        });
        btnGravityIncrease.addEventListener("click", () => {
            gravity += 1;
        });

        let counter;
        const shapesSpeedInterval = () => {
            counter = 1000 / shapesSpeed;
            setTimeout(shapesSpeedInterval, counter);
            model.drawShape();
        }
        setTimeout(shapesSpeedInterval, counter);

        // generate a shape inside a rectangle at mouse position
        const mouseposition = app.renderer.plugins.interaction.mouse.global;
        app.renderer.plugins.interaction.on('pointerdown', (e) => { 
            // click on area outside of any figure
            if (e.target === null) {
                model.drawShape(mouseposition.x, mouseposition.y);
            } 
        });

        app.ticker.add(() => {
            
            for (let i = 0; i < figuresTotalAmount; i++) {
                
                figures[i].position.y += gravity; 
                
                currShapesAmout.value = activeShapesAmount - 1;
                
                if (figures[i].position.y > height && figures[i].live === true) {
                    figures[i].live = false;
                    activeShapesAmount -= 1;
                }
            }
            
            currShapesSpeed.value = shapesSpeed;
            currGravity.value = gravity;
                
        });
    }
}

view.loadGame();