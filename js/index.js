window.onload = function () {
    var aLi = document.getElementsByTagName('li');
    var izIndex = 2;
    var arr = [];
    var oInput = document.getElementById('input1');

    for (var i = 0; i < aLi.length; i++) {
        arr.push([aLi[i].offsetLeft, aLi[i].offsetTop]);
    }

    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.position = 'absolute';
        aLi[i].style.left = arr[i][0] + 'px';
        aLi[i].style.top = arr[i][1] + 'px';
        aLi[i].style.margin = 0;
    }

    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        drag(aLi[i]);
    }

    oInput.onclick = function () {

        var randomArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        randomArr.sort(function (n1, n2) {
            return Math.random() - 0.5;//Math.random()��ֵΪ0-1
        });

        for (var i = 0; i < aLi.length; i++) {
            startMove(aLi[i], {left: arr[randomArr[i]][0], top: arr[randomArr[i]][1]});

            aLi[i].index = randomArr[i];

        }

    };

    function drag(obj) {
        var disX = 0;
        var disY = 0;
        obj.onmousedown = function (ev) {

            obj.style.zIndex = izIndex++;

            var ev = ev || window.event;
            disX = ev.clientX - obj.offsetLeft;
            disY = ev.clientY - obj.offsetTop;

            document.onmousemove = function (ev) {
                var ev = ev || window.event;
                obj.style.left = ev.clientX - disX + 'px';
                obj.style.top = ev.clientY - disY + 'px';

                for (var i = 0; i < aLi.length; i++) {
                    aLi[i].style.border = '';
                }

                var nL = nearLi(obj);

                if (nL) {
                    nL.style.border = '2px red solid';
                }

            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;

                var nL = nearLi(obj);
                var tmp = 0;

                if (nL) {
                    startMove(nL, {left: arr[obj.index][0], top: arr[obj.index][1]});
                    startMove(obj, {left: arr[nL.index][0], top: arr[nL.index][1]});
                    nL.style.border = '';

                    tmp = obj.index;
                    obj.index = nL.index;
                    nL.index = tmp;
                }
                else {
                    startMove(obj, {left: arr[obj.index][0], top: arr[obj.index][1]});
                }

            };

            return false;

        };
    }

    function nearLi(obj) {

        var value = 9999;
        var index = -1;

        for (var i = 0; i < aLi.length; i++) {
            if (pz(obj, aLi[i]) && obj != aLi[i]) {

                var c = jl(obj, aLi[i]);

                if (c < value) {
                    value = c;
                    index = i;
                }

            }
        }

        if (index != -1) {
            return aLi[index];
        }
        else {
            return false;
        }


    }

    function jl(obj1, obj2) {

        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;

        return Math.sqrt(a * a + b * b);

    }


    function pz(obj1, obj2) {
        var L1 = obj1.offsetLeft;
        var R1 = obj1.offsetLeft + obj1.offsetWidth;
        var T1 = obj1.offsetTop;
        var B1 = obj1.offsetTop + obj1.offsetHeight;

        var L2 = obj2.offsetLeft;
        var R2 = obj2.offsetLeft + obj2.offsetWidth;
        var T2 = obj2.offsetTop;
        var B2 = obj2.offsetTop + obj2.offsetHeight;

        if (R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2) {
            return false;
        }
        else {
            return true;
        }

    }

};
