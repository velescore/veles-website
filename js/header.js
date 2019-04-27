// Wrapper object
var indexHeaderWidget = {
    'mapRatio': 1.576344086,
    'mapSelector': '#under-canvas'
};

(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    indexHeaderWidget.init = function() {
        // Main
        initHeader();
        initAnimation();
        addListeners();
        indexHeaderWidget.updateLocation([{"lat": 50.1109, "lon": 8.68213}, {"lat": 52.3909, "lon": 4.66476}, {"lat": 50.9871, "lon": 2.12554}, {"lat": 51.4742, "lon": -0.0797189}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 45.9974, "lon": 15.4784}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 50.475, "lon": 12.365}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 52.4791, "lon": 10.544}, {"lat": 50.117, "lon": 8.72776}, {"lat": 48.5831, "lon": 7.74788}, {"lat": 48.5831, "lon": 7.74788}, {"lat": 43.652, "lon": -79.3633}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 48.9167, "lon": 14.1333}, {"lat": 42.7027, "lon": 23.3063}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 40.8302, "lon": -74.1299}, {"lat": 48.5831, "lon": 7.74788}, {"lat": 25.7617, "lon": -80.1918}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 8.29903, "lon": 77.2144}, {"lat": 51.4742, "lon": -0.0797189}, {"lat": 51.5204, "lon": -0.0737773}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 39.776, "lon": -86.0427}, {"lat": 47.6062, "lon": -122.332}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 25.7617, "lon": -80.1918}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 42.7027, "lon": 23.3063}, {"lat": 8.29903, "lon": 77.2144}, {"lat": 51.2529, "lon": 6.80122}, {"lat": 34.0581, "lon": -118.235}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 48.5831, "lon": 7.74788}, {"lat": 48.9167, "lon": 14.1331}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 48.5831, "lon": 7.74788}, {"lat": 37.3341, "lon": -121.892}, {"lat": 50.6916, "lon": 3.20026}, {"lat": 42.7027, "lon": 23.3063}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 51.5353, "lon": -0.6658}, {"lat": 52.5192, "lon": 13.4061}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 50.3986, "lon": 8.07958}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 47.6062, "lon": -122.332}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 60.1699, "lon": 24.9384}, {"lat": 48.9167, "lon": 14.1331}, {"lat": 45.9974, "lon": 15.4784}, {"lat": 1.32123, "lon": 103.695}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 42.1409, "lon": 24.7523}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 50.3986, "lon": 8.07958}, {"lat": 60.1699, "lon": 24.9384}, {"lat": 51.5204, "lon": -0.0737773}, {"lat": 52.4791, "lon": 10.544}, {"lat": 51.5204, "lon": -0.0737773}, {"lat": 41.9943, "lon": -87.962}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 52.5192, "lon": 13.4061}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 52.3909, "lon": 4.66476}, {"lat": 48.1044, "lon": 11.601}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 51.4742, "lon": -0.0797189}, {"lat": 49.452, "lon": 11.0767}, {"lat": 51.5074, "lon": -0.127758}, {"lat": 39.0438, "lon": -77.4874}, {"lat": 52.4791, "lon": 10.544}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 52.3909, "lon": 4.66476}, {"lat": 48.8683, "lon": 2.36197}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 51.4742, "lon": -0.0797189}, {"lat": 48.5831, "lon": 7.74788}, {"lat": 51.4742, "lon": -0.0797189}, {"lat": 52.5192, "lon": 13.4061}, {"lat": 40.5569, "lon": -74.4847}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 60.404, "lon": 25.0131}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 48.9167, "lon": 14.1331}, {"lat": 43.4598, "lon": 11.8364}, {"lat": 48.1342, "lon": 17.1054}, {"lat": 49.4, "lon": 15.5833}, {"lat": 25.7975, "lon": -80.23}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 55.1516, "lon": 61.4045}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 48.9167, "lon": 14.1331}, {"lat": 33.7777, "lon": -84.4211}, {"lat": 60.404, "lon": 25.0131}, {"lat": 52.4791, "lon": 10.544}, {"lat": 42.6978, "lon": 23.3217}, {"lat": 50.0755, "lon": 14.4378}, {"lat": 50.1109, "lon": 8.68213}, {"lat": 55.1516, "lon": 61.4045}, {"lat": 60.404, "lon": 25.0131}, {"lat": 51.5074, "lon": -0.127758}, {"lat": 51.5204, "lon": -0.0737773}]);

    }
    indexHeaderWidget.updateLocation = function(gps) {
        if (gps.length) {
            initPoints(gps);
            initAnimation();
        }
    }

    function initHeader() {
        //width = window.innerWidth;
        //height = window.innerHeight;
        width = $('.movething').width();
        height = $('.movething').height();

        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        initPoints();
    }

    indexHeaderWidget.gpsToMapPos = function(lon, lat) {
        $map = $(indexHeaderWidget.mapSelector);
        ratio = $map.width() / $map.height();
        lonOffset = -5;

        lonStepPx = $map.width() / 360;
        latStepPx = (lonStepPx * indexHeaderWidget.mapRatio) / 2;


        //if (ratio > indexHeaderWidget.mapRatio) {
        offsetY = ((1 - indexHeaderWidget.mapRatio / ratio) / 2) * $map.height();
        //} else {
       //     offsetY = ((1 - indexHeaderWidget.mapRatio / ratio) / 2) * $map.width();
        //}

        lon += lonOffset;

        if (lon < -180)
            lon += 360;

        if (lon > 180)
            lon -= 360;

        result = {
            'lon': lon,
            'lat': lat,
            'lonStepPx': lonStepPx,
            'latStepPx': latStepPx,
            'offsetY': offsetY,
            'x': ((lon + 180) * lonStepPx),
            'y': (((lat * -1) + 90) * latStepPx) - offsetY + 30
        }

        return result;
    }

    function initPoints(gps = null) {
         // create movable points
        points = [];
        for(var x = 0; x < width; x = x + width / 10 / $('.movething').css('zoom')) {   /* / 10 */
            for(var y = 0; y < height; y = y + height / 10) {
                var px = x + Math.random()*width / 10;
                var py = y + Math.random()*height / 10;
                var p = {x: px, originX: px, y: py, originY: py, isStatic: false };
                points.push(p);
            }
        }
        // create static points
        if (gps == null) {   // random points
            for(var x = 0; x < width; x = x + width / 5 / $('.movething').css('zoom')) {
                for(var y = 0; y < height; y = y + height / 10) {
                    var px = x + Math.random()*width / 10;
                    var py = y + Math.random()*height / 10;
                    var p = {x: px, originX: px, y: py, originY: py, isStatic: true };
                    points.push(p);
                }
            }
        } else {
            for (var i = gps.length - 1; i >= 0; i--) {
                map_pos = indexHeaderWidget.gpsToMapPos(gps[i].lon, gps[i].lat);
                var px = map_pos.x;
                var py = map_pos.y;
                var p = {x: px, originX: px, y: py, originY: py, isStatic: true };
                points.push(p);
            }
        }


        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
        indexHeaderWidget.points = indexHeaderWidget.points;
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        var maxX = $('.movething').width();
        var maxY= $('.movething').height();

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        /* baggins: zoom support, keep animation inside the canvas */
        target.x = Math.min(posx / $('.movething').css('zoom'), maxX);
        target.y = Math.min(posy / $('.movething').css('zoom'), maxY);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        //width = window.innerWidth;
        //height = window.innerHeight;
        width = $('.movething').width();
        height = $('.movething').height();
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
        initPoints();   // Baggins: fix for resize
        initAnimation();
        target = {x: width/2, y: height/2};    // Re-center the animation
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        if (!p.isStatic) {
            TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
                y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
                onComplete: function() {
                    shiftPoint(p);
                }});
        }
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(228,185,156,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            
            if (pos.isStatic) {
                ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(155, 255,126,' + Math.min(_this.active * 1.2, 1) + ')';
            } else {
                ctx.arc(_this.pos.x, _this.pos.y, Math.max(_this.radius - 1, 2), 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(228,185,156,' + (_this.active * 0.8) + ')';
            }
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

   })();
