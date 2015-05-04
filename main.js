function random (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}

window.onload = function () {
    var bezierLine = d3.svg.line()
        .x(function(d) { return d[0]; })
        .y(function(d) { return d[1]; })
        .interpolate('basis');
    var svgEl = document.querySelector('.svg');
    var scaleEl = document.querySelector('.scale-selector');

    scaleEl.addEventListener('change', function () {
        svgEl.style.transform = "scale(" +scaleEl.value+ ")";
    });

    function getTriangle (triangle, constant) {
        var pad = 10;

        if (triangle === 'center') {
            if (!constant) {constant = 280;}

            return bezierLine([
                [20, 25], [190, constant],
                    [190 + 5, constant + 5], [190 + 25, constant - 20],

                [378 + 5, pad], [378, 15],
                    [378, pad],

                [35, pad], [pad, pad],
                    [20, 28]
            ]);
        } else if (triangle === 'left') {
            if (!constant) {constant = 240;}

            return bezierLine([
                [pad, 25], [pad, constant],
                    [pad, constant],

                [378, 15],
                    [378, pad],

                [25, pad],
                    [pad, pad], [pad, 30]
            ]);
        } else if (triangle === 'right') {
            if (!constant) {constant = 195;}

            return bezierLine([
                [383, 25], [383, constant],
                    [383, constant],

                [15, 15],
                    [pad, pad],

                [358, pad],
                    [383, pad], [383, 30]
            ]);
        }
    }

    // Set up default coordinates
    document.getElementById('center').setAttribute('d', getTriangle('center'));
    document.getElementById('left').setAttribute('d', getTriangle('left'));
    document.getElementById('right').setAttribute('d', getTriangle('right'));

    var time = 1000;
    setInterval(function () {
        d3.select('#center')
            .transition()
            .ease("in-out")
            .duration(time)
            .attr('d', getTriangle('center', random(180, 280)));

        d3.select('#left')
            .transition()
            .ease("in-out")
            .duration(time)
            .attr('d', getTriangle('left', random(160, 240)));

        d3.select('#right')
            .transition()
            .ease("in-out")
            .duration(time)
            .attr('d', getTriangle('right', random(140, 195)));
      }, time);
}
