let offset = 15;

setInterval(
    function(){
        draw();
    }, 
    1000
);

function draw() {
    var canvas = document.getElementById("canvas");
    var div    = document.getElementById("time");
    var date = new Date()
    if (canvas.getContext) {

        div.innerText = (date.getHours()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
                        (date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
                        (date.getSeconds()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

        let ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let centerX = canvas.width  / 2;
        let centerY = canvas.height / 2;
        let radius  = Math.min(centerX, centerY);
        
        let outerCircle = new Path2D();
        outerCircle.arc(centerX, centerY, Math.min(centerX, centerY) - offset, 0, 2 * Math.PI);

        ctx.strokeStyle = "#3794e6";
        ctx.lineWidth = 1;
        ctx.stroke(outerCircle);

        let outerInnerCircle = new Path2D();
        outerInnerCircle.arc(centerX, centerY, Math.min(centerX, centerY) - offset * 2, 0, 2 * Math.PI);

        ctx.strokeStyle = "#3794e6";
        ctx.lineWidth = 1;
        ctx.stroke(outerInnerCircle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        let secondX = centerX + 4 * radius / 5 * Math.cos ( 6 * date.getSeconds() * Math.PI / 180 - Math.PI / 2  );
        let secondY = centerY + 4 * radius / 5 * Math.sin ( 6 * date.getSeconds() * Math.PI / 180 - Math.PI / 2  );

        ctx.lineWidth = 2;
        ctx.lineTo( secondX, secondY )
        ctx.stroke()

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        let minuteX = centerX + 3.5 * radius / 5 * Math.cos ( 6 * date.getMinutes() * Math.PI / 180 - Math.PI / 2  );
        let minuteY = centerY + 3.5 * radius / 5 * Math.sin ( 6 * date.getMinutes() * Math.PI / 180 - Math.PI / 2  );

        ctx.lineWidth = 3;
        ctx.lineTo( minuteX, minuteY )
        ctx.stroke()

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        let hourX = centerX + 2.5 * radius / 5 * Math.cos (( 30 * date.getHours() + 0.5 * date.getMinutes()) * Math.PI / 180 - Math.PI / 2 );
        let hourY = centerY + 2.5 * radius / 5 * Math.sin (( 30 * date.getHours() + 0.5 * date.getMinutes()) * Math.PI / 180 - Math.PI / 2 );

        ctx.lineWidth = 4;
        ctx.lineTo( hourX, hourY )
        ctx.stroke()

        let circle = new Path2D();
        circle.moveTo(centerX, centerY);
        circle.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        
        ctx.fillStyle = "#3794e6";
        ctx.fill(circle);
        ctx.fill(); 

        let outerCircleRadius      = radius - offset;
        let bigInnerCircleRadius   = radius - offset - 8;
        let smallInnerCircleRadius = radius - offset - 25;

        ctx.lineWidth = 1.5;

        for ( let i = 0; i < 360; i += 6 ) {
         
            let x1 = centerX + outerCircleRadius * Math.cos ( i * Math.PI / 180 );
            let y1 = centerY + outerCircleRadius * Math.sin ( i * Math.PI / 180 );

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            if ( i % 15 == 0 ) {
                let x2 = centerX + smallInnerCircleRadius * Math.cos ( i * Math.PI / 180 );
                let y2 = centerY + smallInnerCircleRadius * Math.sin ( i * Math.PI / 180 );
                ctx.lineTo(x2, y2);
            } else {
                let x2 = centerX + bigInnerCircleRadius * Math.cos ( i * Math.PI / 180 );
                let y2 = centerY + bigInnerCircleRadius * Math.sin ( i * Math.PI / 180 );
                ctx.lineTo(x2, y2);
            }
            ctx.stroke()
        }
    }
}