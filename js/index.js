

angular.module('app', [])
  .controller('ctrMan',
    function ($scope) {
      var modCtg = document.getElementById('modCtg');
      var modSrt = document.getElementById('modSrt');
      var modCrt = document.getElementById('modCrt');
      var bdgCrt = document.getElementById("bdgCrt");
      window.onclick = function (event) {
        if (event.target == modCtg) {
          modCtg.style.display = "none";
        } else if (event.target == modSrt) {
          modSrt.style.display = "none";
        }
        else if (event.target == modCrt) {
          modCrt.style.display = "none";
        }
      }
      $scope.currentPage = 0;
      $scope.pagSiz = 0;
      $scope.pageSize = 6;
      $scope.pages = [];
      $scope.itms = [];
      $scope.itmsCur = [];
      $scope.ctgs = [];
      $scope.itmsCrt = [];
      $scope.txtSrt = '...';
      $scope.txtCtg = '...';
      $scope.txtAlf = '...';
      $scope.txtMay = '...';
      $scope.txtMen = '...';
      $scope.txtNxt = '...';
      $scope.txtPrv = '...';
      $scope.txtSrtCrt = $scope.txtAlf;
      $scope.sort = 'd';
      $scope.ctg = '';
      $scope.txtTel = '';
      $scope.txtCor = '';
      $scope.txtInf = '';
      $scope.txtSct = '';
      $scope.txtPlaNam = '';
      $scope.txtSct = '';
      $scope.txtSin = '';
      $scope.uni = false;
      $scope.cla = false;
      $scope.wat = false;
      $scope.crt = false;
      $scope.lod = true;
      $scope.btc = false;
      $scope.img = true;
      $scope.ctok = '';
      $scope.ernw = '';
      $scope.clt = 'w3-black';
      $scope.cblu = '#1A73E8';
      $scope.cgre = '#33AA66';
      $scope.clo = 'close';

      $scope.configPages = function () {
        var q = $scope.srch;
        try {
          q = $scope.srch.replace(" ", "");
        } catch (e) {

        }
        if ($scope.ctg == '' && q == '') {
          $scope.itmsCur = $scope.itms;
        } else {

          if (q != '') {
            $scope.txtCtgCrt = $scope.ctgs[0].n;
            $scope.ctg = 0;
            $scope.currentPage = 0;
          }
          $scope.itmsCur = [];
          try {
            $scope.itms.forEach(function (val, ind, arr) {

              var ax = q == "" ? true : (val.d.toUpperCase().search(q.toUpperCase()) > -1);

              if (($scope.ctg == '' || val.c == $scope.ctg) && ax) {
                $scope.itmsCur.push(val);
              }
            });
          } catch (e) {

          }
        }
        var intRef = 20;
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          fin = Math.ceil($scope.itmsCur.length / $scope.pageSize);
        } else {
          ini = -1;
          fin = Math.ceil($scope.itmsCur.length / $scope.pageSize);
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length;
      };



      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
      };

      $scope.nxt = function () {
        $scope.currentPage = $scope.currentPage + 1;
        topScr();
      };
      $scope.ntr = function () {
        $scope.currentPage = $scope.currentPage - 1;
        topScr();
      };


      $scope.addCrt = function (e, itm) {
        e.setAttribute('class', 'fa fa-check-circle w3-xxlarge pointer');
        e.style.color = $scope.cgre;
        addItmCrt(itm);
        setTimeout(function () {
          e.setAttribute('class', 'fa fa-cart-plus w3-xxlarge pointer');
          e.style.color = $scope.cblu;
        }, 600);


      }

      $scope.myCrt = function () {
        modCrt.style.display = 'block';
        $scope.itmsCrt = getStg();
      }
      $scope.delItmCrt = function (itm) {
        $scope.itmsCrt = delItmCrt(itm);
      }
      $scope.selSrt = function (sel) {
        switch (sel) {
          case 0:
            $scope.txtSrtCrt = $scope.txtAlf;
            $scope.sort = 'd';
            break;
          case 1:
            $scope.txtSrtCrt = $scope.txtMyp;
            $scope.sort = '-v';
            break;
          case 2:
            $scope.txtSrtCrt = $scope.txtMnp;
            $scope.sort = 'v';
            break;
        }
        modSrt.style.display = "none";
      }
      $scope.selCtg = function (ctg) {

        $scope.txtCtgCrt = ctg.n;
        $scope.ctg = ctg.i == 0 ? '' : ctg.i;
        modCtg.style.display = "none";
        $scope.currentPage = 0;
        $scope.srch = '';
        $scope.configPages();
      }
      $scope.srchAll = function () {
        console.log("mycart: " + $scope.srch);

      }
      $scope.snd = function () {

        var text = $scope.txtPlaNam + ": " + $scope.namc + "\n\n";
        var suc = true;

        $scope.itmsCrt.itms.forEach(function (v, i, ar) {

          if (!(!isNaN(v.q) && !isNaN(parseFloat(v.q)))) {
            suc = false;
            return;
          }

          text += "*" + v.q + " -> " + v.d + " :" + v.u + " : " + v.k + "\n";
        });

        if (suc) {
          setStg({});
          $scope.itmsCrt = [];
          bdgCrt.style.visibility = "hidden";
          modCrt.style.display = "none";

          window.open(
            encodeURI('https://api.whatsapp.com/send?phone=' + $scope.txtTel + '&text=' + text),
            '_blank'
          );
        } else {
          alert("only numeric values");
        }


      }
      addItmCrt(null);
      var unts = {};
      var result = data;


      var ctnMan = document.getElementById("ctnMan");
      ctnMan.style.visibility = "visible";
      var loader = document.getElementById("loader");
      loader.style.visibility = "hidden";
      var lg_v = document.getElementById("lg");
      var ngc = result.ngc;


      $scope.txtSrt = result.orp;
      $scope.txtCtg = result.ctgs;
      $scope.txtAlf = result.alf;
      $scope.txtMyp = result.myp;
      $scope.txtMnp = result.mnp;
      $scope.txtBsc = result.bsc;
      $scope.txtNxt = result.nxt;
      $scope.txtPrv = result.prv;
      $scope.ctok = result.ctok;
      $scope.ernw = result.ernw;

      $scope.txtTel = result.tel2;
      $scope.txtCor = result.cor2;
      $scope.txtInf = result.dir2;

      $scope.img = result.img;

      $scope.uni = !result.uni;
      $scope.cla = !result.cla;
      $scope.clo = result.clo;


      $scope.wat = result.wha && result.tel2 != '';
      $scope.crt = result.crt && result.tel2 != '';
      $scope.txtSct = result.sct;
      $scope.txtPlaNam = result.nam;

      $scope.txtSin = result.sin;

      $scope.txtSct = result.sct;
      $scope.txtSrtCrt = $scope.txtAlf;

      $scope.clt = result.clt;
      $scope.ngc = ngc;


      if (result.lg.length > 0) {
        $scope.lg = result.lg;
      } else {
        lg_v.style.visibility = "hidden";
        $scope.lg = "0=="
      }

      result.und.forEach(function (val, ind, arr) {
        unts[val.i] = val.n;
      });


      $scope.itms = result.itm;
      $scope.ctgs = result.ctg;
      $scope.txtCtgCrt = $scope.ctgs[0].n;


      $scope.itms.forEach(function (val, ind, arr) {
        val.u = unts[val.u];

      });



      var link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
      link.href = 'logo.png';
      $scope.currentPage = 1;
      $scope.configPages();
      topScr();
      setTimeout(function () {
        var el = document.getElementById('labNeg');
        var divHeight = el.offsetHeight
        var lineHeight = parseInt(el.style.lineHeight);
        var lines = divHeight / lineHeight;
        if (lines < 2) {
          el.style.lineHeight = "50px";
        }
        if ($scope.ngc.length > 25) {
          el.style.fontSize = "16px";
        }
        if ($scope.ngc.length > 40) {
          el.style.fontSize = "14px";
        }
        el.style.visibility = "visible";
      }, 400);
    })
  .filter('startFromGrid', function () {
    return function (input, start) {
      start = +start;
      return input.slice(start);
    }
  });
var stgLoc = {};
function stgChk() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
function getStg() {
  if (stgChk()) {
    var itmsAux = localStorage.getItem("mn_shop_13x");
    return itmsAux == null ? {} : JSON.parse(itmsAux);
  } else {
    return stgLoc;
  }
}
function setStg(itms) {
  if (stgChk()) {
    localStorage.setItem("mn_shop_13x", JSON.stringify(itms));
  } else {
    stgLoc = itms;
  }
}
function addItmCrt(itm) {
  var itmsCrt = getStg();
  if (itmsCrt.itms == undefined) {
    itmsCrt.itms = [];
    if (itm != null) {
      itm.q = 1;
      itmsCrt.itms.push(itm);
    }
  } else if (itm != null) {
    var aux = null;
    for (var i = 0; i < itmsCrt.itms.length; i++) {
      if (itmsCrt.itms[i].i == itm.i) {
        aux = itmsCrt.itms[i];
        break;
      }
    }
    if (aux == null) {
      itm.q = 1;
      itmsCrt.itms.push(itm);
    } else {
      aux.q += 1;
    }

  }
  setStg(itmsCrt);
  bdgCrt.innerHTML = itmsCrt.itms.length;
  bdgCrt.style.visibility = itmsCrt.itms.length == 0 ? "hidden" : "visible";

}
function delItmCrt(itm) {
  var itmsCrt = getStg();
  var ind = -1;
  for (var i = 0; i < itmsCrt.itms.length; i++) {
    if (itmsCrt.itms[i].i == itm.i) {
      ind = i;
      break;
    }
  }
  if (ind > -1) {
    itmsCrt.itms.splice(ind, 1);
  }
  setStg(itmsCrt);
  bdgCrt.innerHTML = itmsCrt.itms.length;
  bdgCrt.style.visibility = itmsCrt.itms.length == 0 ? "hidden" : "visible";
  return itmsCrt;
}
function topScr() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function ajIm(el) {
  el.style.marginTop = ((260 - el.offsetHeight) / 2) + "px";
}
var data = /*#d4t4#*/ {
  "itm": [{
    "c": 1,
    "d": "KIEL BOX 20",
    "i": 6,
    "k": "Sin Clave",
    "l": "img/img_6",
    "p": "$1.650,00",
    "u": 1,
    "v": 1650,
    "z": 10
  },
  { "c": 1, "d": "LIVERPOOL AZUL", "i": 5, "k": "77969682", "l": "img/img_5", "p": "$1.950,00", "u": 1, "v": 1950, "z": 10 }, { "c": 1, "d": "LIVERPOOL ROJO", "i": 2, "k": "Sin Clave", "l": "img/img_2", "p": "$1.950,00", "u": 1, "v": 1950, "z": 10 }, { "c": 1, "d": "LIVERPOOL VERDE", "i": 4, "k": "Sin Clave", "l": "img/img_4", "p": "$1.950,00", "u": 1, "v": 1950, "z": 10 }, { "c": 1, "d": "MILENIO ROJO", "i": 1, "k": "Sin Clave", "l": "img/img_1", "p": "$1.800,00", "u": 1, "v": 1800, "z": 10 }, { "c": 1, "d": "MILENIO VERDE", "i": 3, "k": "Sin Clave", "l": "img/img_3", "p": "$1.800,00", "u": 1, "v": 1800, "z": 10 }, { "c": 1, "d": "PIER", "i": 7, "k": "Sin Clave", "l": "img/img_7", "p": "$2.300,00", "u": 1, "v": 2300, "z": 10 }], "ctg": [{ "i": 1, "n": "CIGARRILLOS" }], "und": [{ "i": 1, "n": "PAQUETES" }], "ngc": "MisNegocios", "tel2": "+543816163841", "cor2": "", "dir2": "", "alf": "Alfabeto", "myp": "Mayor Precio", "mnp": "Menor Precio", "ctgs": "Categoría", "orp": "Ordenar Por", "bsc": "Buscar", "crt": true, "nam": "Nombre", "sct": "Comprar Ahora", "ernw": "Error al conectarse al servidor, compruebe su conexión a internet e intente nuevamente.", "img": true, "uni": false, "cla": false, "wha": true, "clo": "Cerrar", "nxt": "Siguiente", "prv": "Anterior", "sin": "Sin Información", "clt": "w3-black", "tmp": 1678417668662, "lg": "logo"
} /*#d4t4#*/;
