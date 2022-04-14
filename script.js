let offset = 40;
let watchColor = "#17c858"
let secondsColor = "#17c858"
let hoursColor = "#17c858"
let hoursPointerColor = "#17c858"
let minutesPointerColor = "#17c858"
let secondsPointerColor = "#17c858"
let labelColor = "#5e5eff"
let centerDotColor = "#5e5eff"
let textColor = "#17c858"
let firstGradientColor = "#6b4a38"
let secondGradientColor = "#77533f"
let thirdGradientColor = "#6b4a38"
let shadowColor = "rgba(0, 0, 0, 0.7)"
let isVertical = document.documentElement.scrollWidth < document.documentElement.scrollHeight
let screenSize = Math.min(document.documentElement.scrollWidth, document.documentElement.scrollHeight);

let hourCircleColor = "#315fea"
let minuteCircleColor = "#17c858"
let secondsCircleColor = "#5e5eff"

let degreeTraceColor = "#17c858"
let secondTraceColor = "#17c858"
let hourTraceColor = "#17c858"

let secondPointerWidth = 15
let hourPointerWidth = 25
let minutePointerWidth = 20

let externalCirclesWidth = 8

if ( isVertical ) {
    offset = 20
    externalCirclesWidth = 3
}

window.addEventListener('resize', (_) => {
    draw()
    isVertical = document.documentElement.scrollWidth < document.documentElement.scrollHeight
    screenSize = Math.min(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
});

function draw() {
    let canvas = document.getElementById("canvas");
    
    canvas.width = screenSize * ( isVertical ? 0.8 : 0.6 )
    canvas.height = screenSize  * ( isVertical ? 0.8 : 0.6 )

    let div    = document.getElementById("time");
    let date = new Date()

    if (canvas.getContext) {

        div.innerText = (date.getHours()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
                        (date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
                        (date.getSeconds()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
                        (date.getMilliseconds()).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})

        let ctx = canvas.getContext("2d");
        let centerX = canvas.width  / 2;
        let centerY = canvas.height / 2;
        let radius  = Math.min( centerX, centerY );

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let outerCircle = new Path2D();
        let outerHourCircle = new Path2D();
        let outerMinuteCircle = new Path2D();
        let outerSecondCircle = new Path2D();
        
        outerCircle.arc(centerX, centerY, Math.min(centerX, centerY) - offset, 0, 2 * Math.PI);
        outerHourCircle.arc(centerX, centerY, Math.min(centerX, centerY) - ( 0.75 * offset ), - Math.PI / 2, ( 30 * ( date.getHours() % 12 ) + 0.5 * date.getMinutes()) * Math.PI / 180 - Math.PI / 2 );
        outerMinuteCircle.arc(centerX, centerY, Math.min(centerX, centerY) - ( 0.5 * offset ), - Math.PI / 2, 6 * date.getMinutes() * Math.PI / 180 - Math.PI / 2 );
        outerSecondCircle.arc(centerX, centerY, Math.min(centerX, centerY) - ( 0.25 * offset ), - Math.PI / 2, 6 * date.getSeconds() * Math.PI / 180 - Math.PI / 2);

        ctx.lineCap = "round";

        ctx.strokeStyle = hourCircleColor
        ctx.lineWidth = externalCirclesWidth;

        ctx.stroke(outerHourCircle);

        ctx.strokeStyle = minuteCircleColor

        ctx.stroke(outerMinuteCircle);

        ctx.strokeStyle = secondsCircleColor

        ctx.stroke(outerSecondCircle);

        ctx.strokeStyle = watchColor
        ctx.lineWidth = 3;

        ctx.stroke(outerCircle);

        ctx.shadowBlur = 0;

        ctx.save()

        let labels = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII' ]
        let textAngle = Math.PI / 6
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(textAngle)
        labels.forEach ( label => {
            ctx.font = "bold " + ( Math.min(canvas.height, canvas.width) / 40).toString() + "px Times New Roman";
            ctx.textAlign = "center"
            ctx.fillStyle = labelColor;
            ctx.textBaseline = 'middle';
            ctx.fillText(label, 0, -( 0.8 * radius - 0.5 * offset ))
            ctx.rotate( Math.PI / 6 )
        })
        ctx.restore()

        ctx.restore()
        
        console.log

        ctx.font = (Math.min(canvas.height, canvas.width) / 40).toString() + "px Times New Roman";
        ctx.textAlign = "center"
        ctx.fillStyle = textColor;
        ctx.textBaseline = 'middle';
        ctx.fillText("L  E  O  N  A  M     T.   V.", centerX, centerY + offset * 3 )

        let outerInnerCircle = new Path2D();
        outerInnerCircle.arc(centerX, centerY, Math.min(centerX, centerY) - offset * 1.5, 0, 2 * Math.PI);

        ctx.strokeStyle = watchColor;
        ctx.lineWidth = 1;
        ctx.stroke(outerInnerCircle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        ctx.shadowBlur = 10
        ctx.shadowOffsetY = 5

        let secondX = centerX + ( 4 * radius / 5 - 10 ) * Math.cos ( 6 * date.getSeconds() * Math.PI / 180 - Math.PI / 2 );
        let secondY = centerY + ( 4 * radius / 5 - 10 ) * Math.sin ( 6 * date.getSeconds() * Math.PI / 180 - Math.PI / 2 );

        ctx.lineWidth = 2;
        ctx.strokeStyle = secondsPointerColor;
        ctx.lineTo( secondX, secondY )
        ctx.stroke()

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        let minuteX = centerX + 3.5 * radius / 5 * Math.cos ( 6 * date.getMinutes() * Math.PI / 180 - Math.PI / 2  );
        let minuteY = centerY + 3.5 * radius / 5 * Math.sin ( 6 * date.getMinutes() * Math.PI / 180 - Math.PI / 2  );

        ctx.lineWidth = 3;
        ctx.strokeStyle = minutesPointerColor
        ctx.lineTo( minuteX, minuteY )
        ctx.stroke()

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        let hourX = centerX + 2.5 * radius / 5 * Math.cos (( 30 * date.getHours() + 0.5 * date.getMinutes()) * Math.PI / 180 - Math.PI / 2 );
        let hourY = centerY + 2.5 * radius / 5 * Math.sin (( 30 * date.getHours() + 0.5 * date.getMinutes()) * Math.PI / 180 - Math.PI / 2 );

        ctx.lineWidth = 4;
        ctx.strokeStyle = hoursPointerColor
        ctx.lineTo( hourX, hourY )
        ctx.stroke()

        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        let circle = new Path2D();
        circle.moveTo(centerX, centerY);
        circle.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        
        ctx.fillStyle = centerDotColor;
        ctx.fill(circle);
        ctx.fill(); 

        let outerCircleRadius      = radius - offset * 0.8;
        let bigInnerCircleRadius   = radius - offset - 0.3 * offset;
        let smallInnerCircleRadius = radius - offset - 0.9 * offset;
        let degreeInnerCircleRadius = radius - offset - 0.8 * offset;

        ctx.lineWidth = 1.5;

        for ( let i = 0; i < 360; i += 1 ) {
         
            let x1 = centerX + outerCircleRadius * Math.cos ( i * Math.PI / 180 );
            let y1 = centerY + outerCircleRadius * Math.sin ( i * Math.PI / 180 );

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = degreeTraceColor;
            let x2 = centerX + degreeInnerCircleRadius * Math.cos ( i * Math.PI / 180 );
            let y2 = centerY + degreeInnerCircleRadius * Math.sin ( i * Math.PI / 180 );
            ctx.lineTo(x2, y2);
            ctx.stroke()
        }

        for ( let i = 0; i < 360; i += 6 ) {
         
            let x1 = centerX + outerCircleRadius * Math.cos ( i * Math.PI / 180 );
            let y1 = centerY + outerCircleRadius * Math.sin ( i * Math.PI / 180 );

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            if ( i % 15 == 0 ) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = hourTraceColor;
                let x2 = centerX + smallInnerCircleRadius * Math.cos ( i * Math.PI / 180 );
                let y2 = centerY + smallInnerCircleRadius * Math.sin ( i * Math.PI / 180 );
                ctx.lineTo(x2, y2);
            } else {
                ctx.lineWidth = 1;
                ctx.strokeStyle = secondTraceColor;
                let x2 = centerX + bigInnerCircleRadius * Math.cos ( i * Math.PI / 180 );
                let y2 = centerY + bigInnerCircleRadius * Math.sin ( i * Math.PI / 180 );
                ctx.lineTo(x2, y2);
            }
            ctx.stroke()
        }
    }
    window.requestAnimationFrame(draw)
}


window.requestAnimationFrame(draw)