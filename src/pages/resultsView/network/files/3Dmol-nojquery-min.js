$3Dmol = (function(a) {
  return a.$3Dmol || {};
})(window);
$3Dmol.createViewer = function(a, b) {
  "string" === $.type(a) && (a = $("#" + a));
  if (a) {
    b = b || {};
    try {
      return new $3Dmol.GLViewer(a, b);
    } catch (c) {
      throw "error creating viewer: " + c;
    }
  }
};
$3Dmol.viewers = {};
$3Dmol.download = function(a, b, c, m) {
  var s = "",
    B = "",
    w = b.addModel();
  if ("pdb:" === a.substr(0, 4)) {
    B = c && c.pdbUri ? c.pdbUri : "http://www.rcsb.org/pdb/files/";
    s = c && c.format ? c.format : "pdb";
    a = a.substr(4).toUpperCase();
    if (!a.match(/^[1-9][A-Za-z0-9]{3}$/)) {
      alert("Wrong PDB ID");
      return;
    }
    uri = c && c.format ? B + a + "." + c.format : B + a + ".pdb";
  } else if ("cid:" == a.substr(0, 4)) {
    s = "sdf";
    a = a.substr(4);
    if (!a.match(/^[1-9]+$/)) {
      alert("Wrong Compound ID");
      return;
    }
    uri =
      "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" +
      a +
      "/SDF?record_type=3d";
  }
  $.get(uri, function(a) {
    w.addMolData(a, s, c);
    b.zoomTo();
    b.render();
    m && m(w);
  });
  return w;
};
$3Dmol.SurfaceType = { VDW: 1, MS: 2, SAS: 3, SES: 4 };
$3Dmol.mergeGeos = function(a, b) {
  var c = b.geometry;
  void 0 !== c && a.geometryGroups.push(c.geometryGroups[0]);
};
$3Dmol.multiLineString = function(a) {
  return a
    .toString()
    .replace(/^[^\/]+\/\*!?/, "")
    .replace(/\*\/[^\/]+$/, "");
};
$3Dmol.syncSurface = !1;
if (
  0 <= window.navigator.userAgent.indexOf("MSIE ") ||
  0 <= window.navigator.userAgent.indexOf("Trident/")
)
  $3Dmol.syncSurface = !0;
$3Dmol.specStringToObject = function(a) {
  if ("object" === typeof a || "undefined" === typeof a || null == a) return a;
  a = a.replace(/%7E/, "~");
  var b = function(a) {
      return $.isNumeric(a)
        ? Math.floor(parseFloat(a)) == parseInt(a)
          ? parseFloat(a)
          : 0 <= a.indexOf(".")
          ? parseFloat(a)
          : parseInt(a)
        : a;
    },
    c = {};
  a = a.split(";");
  for (var m = 0; m < a.length; m++) {
    var s = a[m].split(":"),
      B = s[0],
      w = {};
    if ((s = s[1]))
      if (((s = s.replace(/~/g, "=")), -1 !== s.indexOf("=")))
        for (var s = s.split(","), z = 0; z < s.length; z++) {
          var d = s[z].split("=", 2);
          w[d[0]] = b(d[1]);
        }
      else w = -1 !== s.indexOf(",") ? s.split(",") : b(s);
    c[B] = w;
  }
  return c;
};
$3Dmol.getExtent = function(a, b) {
  var c,
    m,
    s,
    B,
    w,
    z,
    d,
    x,
    h,
    t,
    l = !b;
  c = m = s = 9999;
  B = w = z = -9999;
  d = x = h = t = 0;
  if (0 === a.length) return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (var e = 0; e < a.length; e++) {
    var G = a[e];
    if (
      "undefined" !== typeof G &&
      isFinite(G.x) &&
      isFinite(G.y) &&
      isFinite(G.z) &&
      (t++,
      (d += G.x),
      (x += G.y),
      (h += G.z),
      (c = c < G.x ? c : G.x),
      (m = m < G.y ? m : G.y),
      (s = s < G.z ? s : G.z),
      (B = B > G.x ? B : G.x),
      (w = w > G.y ? w : G.y),
      (z = z > G.z ? z : G.z),
      G.symmetries && l)
    )
      for (var f = 0; f < G.symmetries.length; f++)
        t++,
          (d += G.symmetries[f].x),
          (x += G.symmetries[f].y),
          (h += G.symmetries[f].z),
          (c = c < G.symmetries[f].x ? c : G.symmetries[f].x),
          (m = m < G.symmetries[f].y ? m : G.symmetries[f].y),
          (s = s < G.symmetries[f].z ? s : G.symmetries[f].z),
          (B = B > G.symmetries[f].x ? B : G.symmetries[f].x),
          (w = w > G.symmetries[f].y ? w : G.symmetries[f].y),
          (z = z > G.symmetries[f].z ? z : G.symmetries[f].z);
  }
  return [[c, m, s], [B, w, z], [d / t, x / t, h / t]];
};
$3Dmol.getAtomProperty = function(a, b) {
  var c = null;
  a.properties && "undefined" != typeof a.properties[b]
    ? (c = a.properties[b])
    : "undefined" != typeof a[b] && (c = a[b]);
  return c;
};
$3Dmol.getPropertyRange = function(a, b) {
  for (
    var c = Number.POSITIVE_INFINITY,
      m = Number.NEGATIVE_INFINITY,
      s = 0,
      B = a.length;
    s < B;
    s++
  ) {
    var w = $3Dmol.getAtomProperty(a[s], b);
    null != w && (w < c && (c = w), w > m && (m = w));
  }
  isFinite(c) || isFinite(m)
    ? isFinite(c)
      ? isFinite(m) || (m = c)
      : (c = m)
    : (c = m = 0);
  return [c, m];
};
var $3Dmol = $3Dmol || {};
$3Dmol.Math = {
  clamp: function(a, b, c) {
    return Math.min(Math.max(a, b), c);
  },
  degToRad: (function() {
    var a = Math.PI / 180;
    return function(b) {
      return b * a;
    };
  })()
};
$3Dmol.Quaternion = function(a, b, c, m) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
  this.w = void 0 !== m ? m : 1;
};
$3Dmol.Quaternion.prototype = {
  constructor: $3Dmol.Quaternion,
  set: function(a, b, c, m) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.w = m;
    return this;
  },
  copy: function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  },
  conjugate: function() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  },
  inverse: function() {
    return this.conjugate().normalize();
  },
  length: function() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function() {
    var a = this.length();
    0 === a
      ? ((this.z = this.y = this.x = 0), (this.w = 1))
      : ((a = 1 / a),
        (this.x *= a),
        (this.y *= a),
        (this.z *= a),
        (this.w *= a));
    return this;
  },
  multiply: function(a) {
    return this.multiplyQuaternions(this, a);
  },
  multiplyQuaternions: function(a, b) {
    var c = a.x,
      m = a.y,
      s = a.z,
      B = a.w,
      w = b.x,
      z = b.y,
      d = b.z,
      x = b.w;
    this.x = c * x + B * w + m * d - s * z;
    this.y = m * x + B * z + s * w - c * d;
    this.z = s * x + B * d + c * z - m * w;
    this.w = B * x - c * w - m * z - s * d;
  }
};
$3Dmol.Vector2 = function(a, b) {
  this.x = a || 0;
  this.y = b || 0;
};
$3Dmol.Vector2.prototype = {
  constructor: $3Dmol.Vector2,
  set: function(a, b) {
    this.x = a;
    this.y = b;
    return this;
  },
  subVectors: function(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  copy: function(a) {
    this.x = a.x;
    this.y = a.y;
    return this;
  },
  clone: function() {
    return new $3Dmol.Vector2(this.x, this.y);
  }
};
$3Dmol.Vector3 = function(a, b, c) {
  this.x = a || 0;
  this.y = b || 0;
  this.z = c || 0;
};
$3Dmol.Vector3.prototype = {
  constructor: $3Dmol.Vector3,
  set: function(a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c;
    return this;
  },
  copy: function(a) {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this;
  },
  add: function(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  },
  addVectors: function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },
  sub: function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  },
  subVectors: function(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },
  multiplyScalar: function(a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  },
  divideScalar: function(a) {
    0 !== a
      ? ((this.x /= a), (this.y /= a), (this.z /= a))
      : (this.z = this.y = this.x = 0);
    return this;
  },
  distanceTo: function(a) {
    return Math.sqrt(this.distanceToSquared(a));
  },
  distanceToSquared: function(a) {
    var b = this.x - a.x,
      c = this.y - a.y;
    a = this.z - a.z;
    return b * b + c * c + a * a;
  },
  applyMatrix4: function(a) {
    var b = this.x,
      c = this.y,
      m = this.z;
    a = a.elements;
    this.x = a[0] * b + a[4] * c + a[8] * m + a[12];
    this.y = a[1] * b + a[5] * c + a[9] * m + a[13];
    this.z = a[2] * b + a[6] * c + a[10] * m + a[14];
    return this;
  },
  applyProjection: function(a) {
    var b = this.x,
      c = this.y,
      m = this.z;
    a = a.elements;
    var s = a[3] * b + a[7] * c + a[11] * m + a[15];
    this.x = (a[0] * b + a[4] * c + a[8] * m + a[12]) / s;
    this.y = (a[1] * b + a[5] * c + a[9] * m + a[13]) / s;
    this.z = (a[2] * b + a[6] * c + a[10] * m + a[14]) / s;
    return this;
  },
  applyQuaternion: function(a) {
    var b = this.x,
      c = this.y,
      m = this.z,
      s = a.x,
      B = a.y,
      w = a.z,
      z,
      d,
      x;
    z = 2 * (c * w - m * B);
    d = 2 * (m * s - b * w);
    x = 2 * (b * B - c * s);
    this.x = b + a.w * z + (d * w - x * B);
    this.y = c + a.w * d + (x * s - z * w);
    this.z = m + a.w * x + (z * B - d * s);
    return this;
  },
  negate: function() {
    return this.multiplyScalar(-1);
  },
  dot: function(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },
  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  lengthSq: function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  normalize: function() {
    return this.divideScalar(this.length());
  },
  cross: function(a) {
    var b = this.x,
      c = this.y,
      m = this.z;
    this.x = c * a.z - m * a.y;
    this.y = m * a.x - b * a.z;
    this.z = b * a.y - c * a.x;
    return this;
  },
  crossVectors: function(a, b) {
    this.x = a.y * b.z - a.z * b.y;
    this.y = a.z * b.x - a.x * b.z;
    this.z = a.x * b.y - a.y * b.x;
    return this;
  },
  getPositionFromMatrix: function(a) {
    this.x = a.elements[12];
    this.y = a.elements[13];
    this.z = a.elements[14];
    return this;
  },
  setEulerFromRotationMatrix: function(a, b) {
    var c = a.elements,
      m = c[0],
      s = c[4],
      B = c[8],
      w = c[5],
      z = c[9],
      d = c[6],
      c = c[10];
    void 0 === b || "XYZ" === b
      ? ((this.y = Math.asin($3Dmol.Math.clamp(B, -1, 1))),
        0.99999 > Math.abs(B)
          ? ((this.x = Math.atan2(-z, c)), (this.z = Math.atan2(-s, m)))
          : ((this.x = Math.atan2(d, w)), (this.z = 0)))
      : console.error(
          "Error with vector's setEulerFromRotationMatrix: Unknown order: " + b
        );
    return this;
  },
  rotateAboutVector: function(a, b) {
    a.normalize();
    var c = Math.cos(b),
      m = Math.sin(b),
      s = this.clone().multiplyScalar(c),
      m = a
        .clone()
        .cross(this)
        .multiplyScalar(m),
      c = a
        .clone()
        .multiplyScalar(a.clone().dot(this))
        .multiplyScalar(1 - c),
      s = s.add(m).add(c);
    this.x = s.x;
    this.y = s.y;
    this.z = s.z;
    return this;
  },
  clone: function() {
    return new $3Dmol.Vector3(this.x, this.y, this.z);
  }
};
$3Dmol.Matrix3 = function(a, b, c, m, s, B, w, z, d) {
  this.elements = new Float32Array(9);
  this.set(
    void 0 !== a ? a : 1,
    b || 0,
    c || 0,
    m || 0,
    void 0 !== s ? s : 1,
    B || 0,
    w || 0,
    z || 0,
    void 0 !== d ? d : 1
  );
};
$3Dmol.Matrix3.prototype = {
  constructor: $3Dmol.Matrix3,
  set: function(a, b, c, m, s, B, w, z, d) {
    var x = this.elements;
    x[0] = a;
    x[3] = b;
    x[6] = c;
    x[1] = m;
    x[4] = s;
    x[7] = B;
    x[2] = w;
    x[5] = z;
    x[8] = d;
    return this;
  },
  identity: function() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  },
  copy: function(a) {
    a = a.elements;
    this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
  },
  multiplyScalar: function(a) {
    var b = this.elements;
    b[0] *= a;
    b[3] *= a;
    b[6] *= a;
    b[1] *= a;
    b[4] *= a;
    b[7] *= a;
    b[2] *= a;
    b[5] *= a;
    b[8] *= a;
    return this;
  },
  getInverse: function(a, b) {
    var c = a.elements,
      m = this.elements;
    m[0] = c[10] * c[5] - c[6] * c[9];
    m[1] = -c[10] * c[1] + c[2] * c[9];
    m[2] = c[6] * c[1] - c[2] * c[5];
    m[3] = -c[10] * c[4] + c[6] * c[8];
    m[4] = c[10] * c[0] - c[2] * c[8];
    m[5] = -c[6] * c[0] + c[2] * c[4];
    m[6] = c[9] * c[4] - c[5] * c[8];
    m[7] = -c[9] * c[0] + c[1] * c[8];
    m[8] = c[5] * c[0] - c[1] * c[4];
    c = c[0] * m[0] + c[1] * m[3] + c[2] * m[6];
    if (0 === c) {
      if (b)
        throw Error(
          "Matrix3.getInverse(): can't invert matrix, determinant is 0"
        );
      console.warn(
        "Matrix3.getInverse(): can't invert matrix, determinant is 0"
      );
      this.identity();
      return this;
    }
    this.multiplyScalar(1 / c);
    return this;
  },
  getDeterminant: function() {
    var a = this.elements;
    return (
      a[0] * a[4] * a[8] +
      a[1] * a[5] * a[6] +
      a[2] * a[3] * a[7] -
      a[2] * a[4] * a[6] -
      a[1] * a[3] * a[8] -
      a[0] * a[5] * a[7]
    );
  },
  transpose: function() {
    var a,
      b = this.elements;
    a = b[1];
    b[1] = b[3];
    b[3] = a;
    a = b[2];
    b[2] = b[6];
    b[6] = a;
    a = b[5];
    b[5] = b[7];
    b[7] = a;
    return this;
  },
  clone: function() {
    var a = this.elements;
    return new $3Dmol.Matrix3(
      a[0],
      a[3],
      a[6],
      a[1],
      a[4],
      a[7],
      a[2],
      a[5],
      a[8]
    );
  }
};
$3Dmol.Matrix4 = function(a, b, c, m, s, B, w, z, d, x, h, t, l, e, G, f) {
  var C = (this.elements = new Float32Array(16));
  C[0] = void 0 !== a ? a : 1;
  C[4] = b || 0;
  C[8] = c || 0;
  C[12] = m || 0;
  C[1] = s || 0;
  C[5] = void 0 !== B ? B : 1;
  C[9] = w || 0;
  C[13] = z || 0;
  C[2] = d || 0;
  C[6] = x || 0;
  C[10] = void 0 !== h ? h : 1;
  C[14] = t || 0;
  C[3] = l || 0;
  C[7] = e || 0;
  C[11] = G || 0;
  C[15] = void 0 !== f ? f : 1;
};
$3Dmol.Matrix4.prototype = {
  constructor: $3Dmol.Matrix4,
  set: function(a, b, c, m, s, B, w, z, d, x, h, t, l, e, G, f) {
    var C = this.elements;
    C[0] = a;
    C[4] = b;
    C[8] = c;
    C[12] = m;
    C[1] = s;
    C[5] = B;
    C[9] = w;
    C[13] = z;
    C[2] = d;
    C[6] = x;
    C[10] = h;
    C[14] = t;
    C[3] = l;
    C[7] = e;
    C[11] = G;
    C[15] = f;
    return this;
  },
  identity: function() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  copy: function(a) {
    a = a.elements;
    this.set(
      a[0],
      a[4],
      a[8],
      a[12],
      a[1],
      a[5],
      a[9],
      a[13],
      a[2],
      a[6],
      a[10],
      a[14],
      a[3],
      a[7],
      a[11],
      a[15]
    );
    return this;
  },
  matrix3FromTopLeft: function() {
    var a = this.elements;
    return new $3Dmol.Matrix3(
      a[0],
      a[4],
      a[8],
      a[1],
      a[5],
      a[9],
      a[2],
      a[6],
      a[10]
    );
  },
  setRotationFromEuler: function(a, b) {
    var c = this.elements,
      m = a.x,
      s = a.y,
      B = a.z,
      w = Math.cos(m),
      m = Math.sin(m),
      z = Math.cos(s),
      s = Math.sin(s),
      d = Math.cos(B),
      B = Math.sin(B);
    if (void 0 === b || "XYZ" === b) {
      var x = w * d,
        h = w * B,
        t = m * d,
        l = m * B;
      c[0] = z * d;
      c[4] = -z * B;
      c[8] = s;
      c[1] = h + t * s;
      c[5] = x - l * s;
      c[9] = -m * z;
      c[2] = l - x * s;
      c[6] = t + h * s;
      c[10] = w * z;
    } else
      console.error("Error with matrix4 setRotationFromEuler. Order: " + b);
    return this;
  },
  setRotationFromQuaternion: function(a) {
    var b = this.elements,
      c = a.x,
      m = a.y,
      s = a.z,
      B = a.w,
      w = c + c,
      z = m + m,
      d = s + s;
    a = c * w;
    var x = c * z,
      c = c * d,
      h = m * z,
      m = m * d,
      s = s * d,
      w = B * w,
      z = B * z,
      B = B * d;
    b[0] = 1 - (h + s);
    b[4] = x - B;
    b[8] = c + z;
    b[1] = x + B;
    b[5] = 1 - (a + s);
    b[9] = m - w;
    b[2] = c - z;
    b[6] = m + w;
    b[10] = 1 - (a + h);
    return this;
  },
  lookAt: (function() {
    var a = new $3Dmol.Vector3(),
      b = new $3Dmol.Vector3(),
      c = new $3Dmol.Vector3();
    return function(m, s, B) {
      var w = this.elements;
      c.subVectors(m, s).normalize();
      0 === c.length() && (c.z = 1);
      a.crossVectors(B, c).normalize();
      0 === a.length() && ((c.x += 1e-4), a.crossVectors(B, c).normalize());
      b.crossVectors(c, a);
      w[0] = a.x;
      w[4] = b.x;
      w[8] = c.x;
      w[1] = a.y;
      w[5] = b.y;
      w[9] = c.y;
      w[2] = a.z;
      w[6] = b.z;
      w[10] = c.z;
      return this;
    };
  })(),
  multiplyMatrices: function(a, b) {
    var c = a.elements,
      m = b.elements,
      s = this.elements,
      B = c[0],
      w = c[4],
      z = c[8],
      d = c[12],
      x = c[1],
      h = c[5],
      t = c[9],
      l = c[13],
      e = c[2],
      G = c[6],
      f = c[10],
      C = c[14],
      u = c[3],
      q = c[7],
      g = c[11],
      c = c[15],
      E = m[0],
      I = m[4],
      A = m[8],
      D = m[12],
      p = m[1],
      y = m[5],
      L = m[9],
      O = m[13],
      J = m[2],
      H = m[6],
      K = m[10],
      M = m[14],
      P = m[3],
      U = m[7],
      N = m[11],
      m = m[15];
    s[0] = B * E + w * p + z * J + d * P;
    s[4] = B * I + w * y + z * H + d * U;
    s[8] = B * A + w * L + z * K + d * N;
    s[12] = B * D + w * O + z * M + d * m;
    s[1] = x * E + h * p + t * J + l * P;
    s[5] = x * I + h * y + t * H + l * U;
    s[9] = x * A + h * L + t * K + l * N;
    s[13] = x * D + h * O + t * M + l * m;
    s[2] = e * E + G * p + f * J + C * P;
    s[6] = e * I + G * y + f * H + C * U;
    s[10] = e * A + G * L + f * K + C * N;
    s[14] = e * D + G * O + f * M + C * m;
    s[3] = u * E + q * p + g * J + c * P;
    s[7] = u * I + q * y + g * H + c * U;
    s[11] = u * A + q * L + g * K + c * N;
    s[15] = u * D + q * O + g * M + c * m;
    return this;
  },
  multiplyScalar: function(a) {
    var b = this.elements;
    b[0] *= a;
    b[4] *= a;
    b[8] *= a;
    b[12] *= a;
    b[1] *= a;
    b[5] *= a;
    b[9] *= a;
    b[13] *= a;
    b[2] *= a;
    b[6] *= a;
    b[10] *= a;
    b[14] *= a;
    b[3] *= a;
    b[7] *= a;
    b[11] *= a;
    b[15] *= a;
    return this;
  },
  transpose: function() {
    var a = this.elements,
      b;
    b = a[1];
    a[1] = a[4];
    a[4] = b;
    b = a[2];
    a[2] = a[8];
    a[8] = b;
    b = a[6];
    a[6] = a[9];
    a[9] = b;
    b = a[3];
    a[3] = a[12];
    a[12] = b;
    b = a[7];
    a[7] = a[13];
    a[13] = b;
    b = a[11];
    a[11] = a[14];
    a[14] = b;
    return this;
  },
  getPosition: (function() {
    var a = new $3Dmol.Vector3();
    return function() {
      console.warn(
        "DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead."
      );
      var b = this.elements;
      return a.set(b[12], b[13], b[14]);
    };
  })(),
  setPosition: function(a) {
    var b = this.elements;
    b[12] = a.x;
    b[13] = a.y;
    b[14] = a.z;
    return this;
  },
  getInverse: function(a, b) {
    var c = this.elements,
      m = a.elements,
      s = m[0],
      B = m[4],
      w = m[8],
      z = m[12],
      d = m[1],
      x = m[5],
      h = m[9],
      t = m[13],
      l = m[2],
      e = m[6],
      G = m[10],
      f = m[14],
      C = m[3],
      u = m[7],
      q = m[11],
      g = m[15];
    c[0] =
      h * f * u - t * G * u + t * e * q - x * f * q - h * e * g + x * G * g;
    c[4] =
      z * G * u - w * f * u - z * e * q + B * f * q + w * e * g - B * G * g;
    c[8] =
      w * t * u - z * h * u + z * x * q - B * t * q - w * x * g + B * h * g;
    c[12] =
      z * h * e - w * t * e - z * x * G + B * t * G + w * x * f - B * h * f;
    c[1] =
      t * G * C - h * f * C - t * l * q + d * f * q + h * l * g - d * G * g;
    c[5] =
      w * f * C - z * G * C + z * l * q - s * f * q - w * l * g + s * G * g;
    c[9] =
      z * h * C - w * t * C - z * d * q + s * t * q + w * d * g - s * h * g;
    c[13] =
      w * t * l - z * h * l + z * d * G - s * t * G - w * d * f + s * h * f;
    c[2] =
      x * f * C - t * e * C + t * l * u - d * f * u - x * l * g + d * e * g;
    c[6] =
      z * e * C - B * f * C - z * l * u + s * f * u + B * l * g - s * e * g;
    c[10] =
      B * t * C - z * x * C + z * d * u - s * t * u - B * d * g + s * x * g;
    c[14] =
      z * x * l - B * t * l - z * d * e + s * t * e + B * d * f - s * x * f;
    c[3] =
      h * e * C - x * G * C - h * l * u + d * G * u + x * l * q - d * e * q;
    c[7] =
      B * G * C - w * e * C + w * l * u - s * G * u - B * l * q + s * e * q;
    c[11] =
      w * x * C - B * h * C - w * d * u + s * h * u + B * d * q - s * x * q;
    c[15] =
      B * h * l - w * x * l + w * d * e - s * h * e - B * d * G + s * x * G;
    c = m[0] * c[0] + m[1] * c[4] + m[2] * c[8] + m[3] * c[12];
    if (0 === c) {
      if (b)
        throw Error(
          "Matrix4.getInverse(): can't invert matrix, determinant is 0"
        );
      console.warn(
        "Matrix4.getInverse(): can't invert matrix, determinant is 0"
      );
      this.identity();
      return this;
    }
    this.multiplyScalar(1 / c);
    return this;
  },
  isReflected: function() {
    return 0 > this.matrix3FromTopLeft().getDeterminant();
  },
  compose: (function() {
    var a = new $3Dmol.Matrix4(),
      b = new $3Dmol.Matrix4();
    return function(c, m, s) {
      var B = this.elements;
      a.identity();
      a.setRotationFromQuaternion(m);
      b.makeScale(s.x, s.y, s.z);
      this.multiplyMatrices(a, b);
      B[12] = c.x;
      B[13] = c.y;
      B[14] = c.z;
      return this;
    };
  })(),
  decompose: (function() {
    var a = new $3Dmol.Vector3(),
      b = new $3Dmol.Vector3(),
      c = new $3Dmol.Vector3(),
      m = new $3Dmol.Matrix4();
    return function(s, B, w) {
      var z = this.elements;
      a.set(z[0], z[1], z[2]);
      b.set(z[4], z[5], z[6]);
      c.set(z[8], z[9], z[10]);
      s = s instanceof $3Dmol.Vector3 ? s : new $3Dmol.Vector3();
      B = B instanceof $3Dmol.Quaternion ? B : new $3Dmol.Quaternion();
      w = w instanceof $3Dmol.Vector3 ? w : new $3Dmol.Vector3();
      w.x = a.length();
      w.y = b.length();
      w.z = c.length();
      s.x = z[12];
      s.y = z[13];
      s.z = z[14];
      m.copy(this);
      m.elements[0] /= w.x;
      m.elements[1] /= w.x;
      m.elements[2] /= w.x;
      m.elements[4] /= w.y;
      m.elements[5] /= w.y;
      m.elements[6] /= w.y;
      m.elements[8] /= w.z;
      m.elements[9] /= w.z;
      m.elements[10] /= w.z;
      B.setFromRotationMatrix(m);
      return [s, B, w];
    };
  })(),
  scale: function(a) {
    var b = this.elements,
      c = a.x,
      m = a.y;
    a = a.z;
    b[0] *= c;
    b[4] *= m;
    b[8] *= a;
    b[1] *= c;
    b[5] *= m;
    b[9] *= a;
    b[2] *= c;
    b[6] *= m;
    b[10] *= a;
    b[3] *= c;
    b[7] *= m;
    b[11] *= a;
    return this;
  },
  getMaxScaleOnAxis: function() {
    var a = this.elements;
    return Math.sqrt(
      Math.max(
        a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
        Math.max(
          a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
          a[8] * a[8] + a[9] * a[9] + a[10] * a[10]
        )
      )
    );
  },
  makeFrustum: function(a, b, c, m, s, B) {
    var w = this.elements;
    w[0] = (2 * s) / (b - a);
    w[4] = 0;
    w[8] = (b + a) / (b - a);
    w[12] = 0;
    w[1] = 0;
    w[5] = (2 * s) / (m - c);
    w[9] = (m + c) / (m - c);
    w[13] = 0;
    w[2] = 0;
    w[6] = 0;
    w[10] = -(B + s) / (B - s);
    w[14] = (-2 * B * s) / (B - s);
    w[3] = 0;
    w[7] = 0;
    w[11] = -1;
    w[15] = 0;
    return this;
  },
  makePerspective: function(a, b, c, m) {
    a = c * Math.tan($3Dmol.Math.degToRad(0.5 * a));
    var s = -a;
    return this.makeFrustum(s * b, a * b, s, a, c, m);
  },
  isEqual: function(a) {
    a = a.elements;
    var b = this.elements;
    return b[0] == a[0] &&
      b[4] == a[4] &&
      b[8] == a[8] &&
      b[12] == a[12] &&
      b[1] == a[1] &&
      b[5] == a[5] &&
      b[9] == a[9] &&
      b[13] == a[13] &&
      b[2] == a[2] &&
      b[6] == a[6] &&
      b[10] == a[10] &&
      b[14] == a[14] &&
      b[3] == a[3] &&
      b[7] == a[7] &&
      b[11] == a[11] &&
      b[15] == a[15]
      ? !0
      : !1;
  },
  clone: function() {
    var a = this.elements;
    return new $3Dmol.Matrix4(
      a[0],
      a[4],
      a[8],
      a[12],
      a[1],
      a[5],
      a[9],
      a[13],
      a[2],
      a[6],
      a[10],
      a[14],
      a[3],
      a[7],
      a[11],
      a[15]
    );
  },
  isIdentity: function() {
    var a = this.elements;
    return 1 == a[0] &&
      0 == a[4] &&
      0 == a[8] &&
      0 == a[12] &&
      0 == a[1] &&
      1 == a[5] &&
      0 == a[9] &&
      0 == a[13] &&
      0 == a[2] &&
      0 == a[6] &&
      1 == a[10] &&
      0 == a[14] &&
      0 == a[3] &&
      0 == a[7] &&
      0 == a[11] &&
      1 == a[15]
      ? !0
      : !1;
  }
};
$3Dmol.Ray = function(a, b) {
  this.origin = void 0 !== a ? a : new $3Dmol.Vector3();
  this.direction = void 0 !== b ? b : new $3Dmol.Vector3();
};
$3Dmol.Ray.prototype = {
  constructor: $3Dmol.Ray,
  set: function(a, b) {
    this.origin.copy(a);
    this.direction.copy(b);
    return this;
  },
  copy: function(a) {
    this.origin.copy(a.origin);
    this.direction.copy(a.direction);
    return this;
  },
  at: function(a, b) {
    return (b || new $3Dmol.Vector3())
      .copy(this.direction)
      .multiplyScalar(a)
      .add(this.origin);
  },
  recast: (function() {
    var a = new $3Dmol.Vector3();
    return function(b) {
      this.origin.copy(this.at(b, a));
      return this;
    };
  })(),
  closestPointToPoint: function(a, b) {
    var c = b || new $3Dmol.Vector3();
    c.subVectors(a, this.origin);
    var m = c.dot(this.direction);
    return c
      .copy(this.direction)
      .multiplyScalar(m)
      .add(this.origin);
  },
  distanceToPoint: (function(a) {
    var b = new $3Dmol.Vector3();
    return function(a) {
      var m = b.subVectors(a, this.origin).dot(this.direction);
      b.copy(this.direction)
        .multiplyScalar(m)
        .add(this.origin);
      return b.distanceTo(a);
    };
  })(),
  isIntersectionCylinder: function() {},
  isIntersectionSphere: function(a) {
    return this.distanceToPoint(a.center) <= a.radius;
  },
  isIntersectionPlane: function(a) {
    return 0 !== a.normal.dot(this.direction) ||
      0 === a.distanceToPoint(this.origin)
      ? !0
      : !1;
  },
  distanceToPlane: function(a) {
    var b = a.normal.dot(this.direction);
    if (0 === b) {
      if (0 === a.distanceToPoint(this.origin)) return 0;
    } else return -(this.origin.dot(a.normal) + a.constant) / b;
  },
  intersectPlane: function(a, b) {
    var c = this.distanceToPlane(a);
    return void 0 === c ? void 0 : this.at(c, b);
  },
  applyMatrix4: function(a) {
    this.direction.add(this.origin).applyMatrix4(a);
    this.origin.applyMatrix4(a);
    this.direction.sub(this.origin);
    return this;
  },
  equals: function(a) {
    return a.origin.equals(this.origin) && a.direction.equals(this.direction);
  },
  clone: function() {
    return new $3Dmol.Ray().copy(this);
  }
};
$3Dmol.Sphere = function(a, b) {
  this.center = void 0 !== a ? a : new $3Dmol.Vector3();
  this.radius = void 0 !== b ? b : 0;
};
$3Dmol.Sphere.prototype = {
  constructor: $3Dmol.Sphere,
  set: function(a, b) {
    this.center.copy(a);
    this.radius = b;
    return this;
  },
  copy: function(a) {
    this.center.copy(a.center);
    this.radius = a.radius;
    return this;
  },
  applyMatrix4: function(a) {
    this.center.applyMatrix4(a);
    this.radius *= a.getMaxScaleOnAxis();
    return this;
  },
  translate: function(a) {
    this.center.add(a);
    return this;
  },
  equals: function(a) {
    return a.center.equals(this.center) && a.radius === this.radius;
  },
  clone: function() {
    return new $3Dmol.Sphere().copy(this);
  }
};
$3Dmol.Cylinder = function(a, b, c) {
  this.c1 = void 0 !== a ? a : new $3Dmol.Vector3();
  this.c2 = void 0 !== b ? b : new $3Dmol.Vector3();
  this.direction = new $3Dmol.Vector3()
    .subVectors(this.c2, this.c1)
    .normalize();
  this.radius = void 0 !== c ? c : 0;
};
$3Dmol.Cylinder.prototype = {
  constructor: $3Dmol.Cylinder,
  copy: function(a) {
    this.c1.copy(a.c1);
    this.c2.copy(a.c2);
    this.direction.copy(a.direction);
    this.radius = a.radius;
    return this;
  },
  lengthSq: (function() {
    var a = new $3Dmol.Vector3();
    return function() {
      return a.subVectors(this.c2, this.c1).lengthSq();
    };
  })(),
  applyMatrix4: function(a) {
    this.direction.add(this.c1).applyMatrix4(a);
    this.c1.applyMatrix4(a);
    this.c2.applyMatrix4(a);
    this.direction.sub(this.c1).normalize();
    this.radius *= a.getMaxScaleOnAxis();
    return this;
  }
};
$3Dmol.Triangle = function(a, b, c) {
  this.a = void 0 !== a ? a : new $3Dmol.Vector3();
  this.b = void 0 !== b ? b : new $3Dmol.Vector3();
  this.c = void 0 !== c ? c : new $3Dmol.Vector3();
};
$3Dmol.Triangle.prototype = {
  constructor: $3Dmol.Triangle,
  copy: function(a) {
    this.a.copy(a.a);
    this.b.copy(a.b);
    this.c.copy(a.c);
    return this;
  },
  applyMatrix4: function(a) {
    this.a.applyMatrix4(a);
    this.b.applyMatrix4(a);
    this.c.applyMatrix4(a);
    return this;
  },
  getNormal: (function() {
    var a = new $3Dmol.Vector3();
    return function() {
      var b = this.a.clone();
      b.sub(this.b);
      a.subVectors(this.c, this.b);
      b.cross(a);
      b.normalize();
      return b;
    };
  })()
};
$3Dmol.EventDispatcher = function() {
  var a = {};
  this.addEventListener = function(b, c) {
    void 0 === a[b] && (a[b] = []);
    -1 === a[b].indexOf(c) && a[b].push(c);
  };
  this.removeEventListener = function(b, c) {
    var m = a[b].indexOf(c);
    -1 !== m && a[b].splice(m, 1);
  };
  this.dispatchEvent = function(b) {
    var c = a[b.type];
    if (void 0 !== c) {
      b.target = this;
      for (var m = 0, s = c.length; m < s; m++) c[m].call(this, b);
    }
  };
};
$3Dmol.Color = function(a) {
  return 1 < arguments.length
    ? ((this.r = arguments[0] || 0),
      (this.g = arguments[1] || 0),
      (this.b = arguments[2] || 0),
      this)
    : this.set(a);
};
$3Dmol.Color.prototype = {
  constructor: $3Dmol.Color,
  r: 0,
  g: 0,
  b: 0,
  set: function(a) {
    if (a instanceof $3Dmol.Color) return a.clone();
    "number" === typeof a
      ? this.setHex(a)
      : "object" === typeof a &&
        "r" in a &&
        "g" in a &&
        "b" in a &&
        ((this.r = a.r), (this.g = a.g), (this.b = a.b));
  },
  setHex: function(a) {
    a = Math.floor(a);
    this.r = ((a >> 16) & 255) / 255;
    this.g = ((a >> 8) & 255) / 255;
    this.b = (a & 255) / 255;
    return this;
  },
  getHex: function() {
    var a = Math.round(255 * this.r),
      b = Math.round(255 * this.g),
      c = Math.round(255 * this.b);
    return (a << 16) | (b << 8) | c;
  },
  clone: function() {
    return new $3Dmol.Color(this.r, this.g, this.b);
  },
  copy: function(a) {
    this.r = a.r;
    this.g = a.g;
    this.b = a.b;
    return this;
  },
  scaled: function() {
    var a = {};
    a.r = Math.round(255 * this.r);
    a.g = Math.round(255 * this.g);
    a.b = Math.round(255 * this.b);
    a.a = 1;
    return a;
  }
};
$3Dmol.Object3D = function() {
  this.id = $3Dmol.Object3DIDCount++;
  this.name = "";
  this.parent = void 0;
  this.children = [];
  this.position = new $3Dmol.Vector3();
  this.rotation = new $3Dmol.Vector3();
  this.matrix = new $3Dmol.Matrix4();
  this.matrixWorld = new $3Dmol.Matrix4();
  this.quaternion = new $3Dmol.Quaternion();
  this.eulerOrder = "XYZ";
  this.up = new $3Dmol.Vector3(0, 1, 0);
  this.scale = new $3Dmol.Vector3(1, 1, 1);
  this.rotationAutoUpdate = this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
  this.useQuaternion = !1;
  this.visible = !0;
};
$3Dmol.Object3D.prototype = {
  constructor: $3Dmol.Object3D,
  lookAt: function(a) {
    this.matrix.lookAt(a, this.position, this.up);
    this.rotationAutoUpdate &&
      (!0 === this.useQuaternion
        ? this.quaternion.copy(this.matrix.decompose()[1])
        : this.rotation.setEulerFromRotationMatrix(
            this.matrix,
            this.eulerOrder
          ));
  },
  add: function(a) {
    if (a === this) console.error("Can't add $3Dmol.Object3D to itself");
    else {
      a.parent = this;
      this.children.push(a);
      for (var b = this; void 0 !== b.parent; ) b = b.parent;
      void 0 !== b && b instanceof $3Dmol.Scene && b.__addObject(a);
    }
  },
  remove: function(a) {
    var b = this.children.indexOf(a);
    if (-1 !== b) {
      a.parent = void 0;
      this.children.splice(b, 1);
      for (b = this; void 0 !== b.parent; ) b = b.parent;
      void 0 !== b && b instanceof $3Dmol.Scene && b.__removeObject(a);
    }
  },
  updateMatrix: function() {
    this.matrix.setPosition(this.position);
    !1 === this.useQuaternion
      ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder)
      : this.matrix.setRotationFromQuaternion(this.quaternion);
    (1 === this.scale.x && 1 === this.scale.y && 1 === this.scale.z) ||
      this.matrix.scale(this.scale);
    this.matrixWorldNeedsUpdate = !0;
  },
  updateMatrixWorld: function(a) {
    !0 === this.matrixAutoUpdate && this.updateMatrix();
    if (!0 === this.matrixWorldNeedsUpdate || !0 === a)
      void 0 === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiplyMatrices(
            this.parent.matrixWorld,
            this.matrix
          );
    this.matrixWorldNeedsUpdate = !1;
    for (a = 0; a < this.children.length; a++)
      this.children[a].updateMatrixWorld(!0);
  },
  clone: function(a) {
    void 0 === a && (a = new $3Dmol.Object3D());
    a.name = this.name;
    a.up.copy(this.up);
    a.position.copy(this.position);
    a.rotation.copy(this.rotation);
    a.eulerOrder = this.eulerOrder;
    a.scale.copy(this.scale);
    a.rotationAutoUpdate = this.rotationAutoUpdate;
    a.matrix.copy(this.matrix);
    a.matrixWorld.copy(this.matrixWorld);
    a.quaternion.copy(this.quaternion);
    a.matrixAutoUpdate = this.matrixAutoUpdate;
    a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
    a.useQuaternion = this.useQuaternion;
    a.visible = this.visible;
    for (var b = 0; b < this.children.length; b++)
      a.add(this.children[b].clone());
    return a;
  },
  setVisible: function(a) {
    this.visible = a;
    for (var b = 0; b < this.children.length; b++)
      this.children[b].setVisible(a);
  }
};
$3Dmol.Object3DIDCount = 0;
$3Dmol.Geometry = (function() {
  var a = function(a) {
    this.id = a || 0;
    this.lineArray = this.faceArray = this.normalArray = this.colorArray = this.vertexArray = null;
    this.lineidx = this.faceidx = this.vertices = 0;
  };
  a.prototype.getNumVertices = function() {
    return this.vertices;
  };
  a.prototype.getVertices = function() {
    return this.vertexArray;
  };
  a.prototype.getCentroid = function() {
    for (var a = new $3Dmol.Vector3(), b, c, w, z = 0; z < this.vertices; ++z)
      (b = 3 * z),
        (c = this.vertexArray[b]),
        (w = this.vertexArray[b + 1]),
        (b = this.vertexArray[b + 2]),
        (a.x += c),
        (a.y += w),
        (a.z += b);
    a.divideScalar(this.vertices);
    return a;
  };
  a.prototype.setNormals = function() {
    var a = this.faceArray,
      b = this.vertexArray,
      c = this.normalArray;
    if (this.vertices && this.faceidx)
      for (var w, z, d, x, h, t, l = 0; l < a.length / 3; ++l)
        (w = 3 * a[3 * l]),
          (z = 3 * a[3 * l + 1]),
          (d = 3 * a[3 * l + 2]),
          (x = new $3Dmol.Vector3(b[w], b[w + 1], b[w + 2])),
          (h = new $3Dmol.Vector3(b[z], b[z + 1], b[z + 2])),
          (t = new $3Dmol.Vector3(b[d], b[d + 1], b[d + 2])),
          x.subVectors(x, h),
          t.subVectors(t, h),
          t.cross(x),
          (x = t),
          x.normalize(),
          (c[w] += x.x),
          (c[z] += x.x),
          (c[d] += x.x),
          (c[w + 1] += x.y),
          (c[z + 1] += x.y),
          (c[d + 1] += x.y),
          (c[w + 2] += x.z),
          (c[z + 2] += x.z),
          (c[d + 2] += x.z);
  };
  a.prototype.setLineIndices = function() {
    if (this.faceidx) {
      var a = this.faceArray,
        b = (this.lineArray = new Uint16Array(2 * this.faceidx));
      this.lineidx = 2 * this.faceidx;
      for (var c, w = 0; w < this.faceidx / 3; ++w) {
        c = 3 * w;
        lineoffset = 2 * c;
        var z = a[c],
          d = a[c + 1];
        c = a[c + 2];
        b[lineoffset] = z;
        b[lineoffset + 1] = d;
        b[lineoffset + 2] = z;
        b[lineoffset + 3] = c;
        b[lineoffset + 4] = d;
        b[lineoffset + 5] = c;
      }
    }
  };
  a.prototype.truncateArrayBuffers = function(a, b) {
    a = !0 === a ? !0 : !1;
    var c = this.colorArray,
      w = this.normalArray,
      z = this.faceArray,
      d = this.lineArray;
    this.vertexArray = this.vertexArray.subarray(0, 3 * this.vertices);
    this.colorArray = c.subarray(0, 3 * this.vertices);
    a
      ? ((this.normalArray = w.subarray(0, 3 * this.vertices)),
        (this.faceArray = z.subarray(0, this.faceidx)),
        (this.lineArray =
          0 < this.lineidx ? d.subarray(0, this.lineidx) : new Uint16Array()))
      : ((this.normalArray = new Float32Array()),
        (this.faceArray = new Uint16Array()),
        (this.lineArray = new Uint16Array()));
    b &&
      (this.normalArray &&
        (this.normalArray = new Float32Array(this.normalArray)),
      this.faceArray && (this.faceArray = new Uint16Array(this.faceArray)),
      this.lineArray && (this.lineArray = new Uint16Array(this.lineArray)),
      this.vertexArray &&
        (this.vertexArray = new Float32Array(this.vertexArray)),
      this.colorArray && (this.colorArray = new Float32Array(this.colorArray)));
    this.__inittedArrays = !0;
  };
  var b = function(b) {
      var c = new a(b.geometryGroups.length);
      b.geometryGroups.push(c);
      b.groups = b.geometryGroups.length;
      c.vertexArray = new Float32Array(196605);
      c.colorArray = new Float32Array(196605);
      b.mesh &&
        ((c.normalArray = new Float32Array(196605)),
        (c.faceArray = new Uint16Array(393210)),
        (c.lineArray = new Uint16Array(393210)));
      return c;
    },
    c = function(a) {
      $3Dmol.EventDispatcher.call(this);
      this.id = $3Dmol.GeometryIDCount++;
      this.name = "";
      this.hasTangents = !1;
      this.dynamic = !0;
      this.mesh = !0 === a ? !0 : !1;
      this.buffersNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1;
      this.geometryGroups = [];
      this.groups = 0;
    };
  c.prototype = {
    constructor: c,
    updateGeoGroup: function(a) {
      var c = 0 < this.groups ? this.geometryGroups[this.groups - 1] : null;
      if (!c || 65535 < c.vertices + (a || 0)) c = b(this);
      return c;
    },
    addGeoGroup: function() {
      return b(this);
    },
    setUpNormals: function(a) {
      a = a || !1;
      for (var b = 0; b < this.groups; b++)
        this.geometryGroups[b].setNormals(a);
    },
    setUpWireframe: function() {
      for (var a = 0; a < this.groups; a++)
        this.geometryGroups[a].setLineIndices();
    },
    initTypedArrays: function() {
      for (var a = 0; a < this.groups; a++) {
        var b = this.geometryGroups[a];
        !0 !== b.__inittedArrays && b.truncateArrayBuffers(this.mesh, !1);
      }
    },
    dispose: function() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  return c;
})();
Object.defineProperty($3Dmol.Geometry.prototype, "vertices", {
  get: function() {
    for (var a = 0, b = 0; b < this.groups; b++)
      a += this.geometryGroups[b].vertices;
    return a;
  }
});
$3Dmol.GeometryIDCount = 0;
$3Dmol.Raycaster = (function() {
  var a = function(a, b, h, d) {
      this.ray = new $3Dmol.Ray(a, b);
      0 < this.ray.direction.lengthSq() && this.ray.direction.normalize();
      this.near = d || 0;
      this.far = h || Infinity;
    },
    b = new $3Dmol.Sphere(),
    c = new $3Dmol.Cylinder(),
    m = new $3Dmol.Triangle(),
    s = new $3Dmol.Vector3(),
    B = new $3Dmol.Vector3(),
    w = new $3Dmol.Vector3(),
    z = new $3Dmol.Vector3();
  new $3Dmol.Ray();
  new $3Dmol.Vector3();
  var d = new $3Dmol.Vector3();
  new $3Dmol.Matrix4();
  var x = function(a, b) {
      return a.distance - b.distance;
    },
    h = function(a) {
      return Math.min(Math.max(a, -1), 1);
    };
  a.prototype.precision = 1e-4;
  a.prototype.linePrecision = 0.2;
  a.prototype.set = function(a, b) {
    this.ray.set(a, b);
  };
  a.prototype.intersectObjects = function(a, l) {
    for (var e = [], G = 0, f = l.length; G < f; G++)
      a: {
        var C = a,
          u = l[G],
          q = e;
        d.getPositionFromMatrix(C.matrixWorld);
        if (!0 === u.clickable && void 0 !== u.intersectionShape) {
          var g = u.intersectionShape,
            E = this.linePrecision,
            E = E * C.matrixWorld.getMaxScaleOnAxis(),
            E = E * E;
          if (
            void 0 !== u.boundingSphere &&
            u.boundingSphere instanceof $3Dmol.Sphere &&
            (b.copy(u.boundingSphere),
            b.applyMatrix4(C.matrixWorld),
            !this.ray.isIntersectionSphere(b))
          )
            break a;
          for (
            var I = void 0,
              A = void 0,
              D = void 0,
              p = void 0,
              y = (D = void 0),
              L = void 0,
              O = void 0,
              J = void 0,
              H = void 0,
              K = (H = y = p = void 0),
              I = 0,
              A = g.triangle.length;
            I < A;
            I++
          )
            g.triangle[I] instanceof $3Dmol.Triangle &&
              (m.copy(g.triangle[I]),
              m.applyMatrix4(C.matrixWorld),
              (D = m.getNormal()),
              (p = this.ray.direction.dot(D)),
              0 <= p ||
                (s.subVectors(m.a, this.ray.origin),
                (L = D.dot(s) / p),
                0 > L ||
                  (B.copy(this.ray.direction)
                    .multiplyScalar(L)
                    .add(this.ray.origin),
                  B.sub(m.a),
                  w.copy(m.b).sub(m.a),
                  z.copy(m.c).sub(m.a),
                  (p = w.dot(z)),
                  (D = w.lengthSq()),
                  (y = z.lengthSq()),
                  (y = (D * B.dot(z) - p * B.dot(w)) / (D * y - p * p)),
                  0 > y ||
                    1 < y ||
                    ((p = (B.dot(w) - y * p) / D),
                    0 > p ||
                      1 < p ||
                      1 < p + y ||
                      q.push({ clickable: u, distance: L })))));
          I = 0;
          for (A = g.cylinder.length; I < A; I++)
            g.cylinder[I] instanceof $3Dmol.Cylinder &&
              (c.copy(g.cylinder[I]),
              c.applyMatrix4(C.matrixWorld),
              s.subVectors(c.c1, this.ray.origin),
              (D = s.dot(c.direction)),
              (y = s.dot(this.ray.direction)),
              (p = h(this.ray.direction.dot(c.direction))),
              (J = 1 - p * p),
              0 !== J &&
                ((H = (p * y - D) / J),
                (K = (y - p * D) / J),
                B.copy(c.direction)
                  .multiplyScalar(H)
                  .add(c.c1),
                w
                  .copy(this.ray.direction)
                  .multiplyScalar(K)
                  .add(this.ray.origin),
                (O = z.subVectors(B, w).lengthSq()),
                (H = c.radius * c.radius),
                O <= H &&
                  ((H =
                    (p * D - y) * (p * D - y) - J * (s.lengthSq() - D * D - H)),
                  (y =
                    0 >= H
                      ? (L = Math.sqrt(O))
                      : (L = (y - p * D - Math.sqrt(H)) / J)),
                  (p = p * y - D),
                  0 > p ||
                    p * p > c.lengthSq() ||
                    0 > y ||
                    q.push({ clickable: u, distance: L }))));
          I = 0;
          for (A = g.line.length; I < A; I += 2)
            B.copy(g.line[I]),
              B.applyMatrix4(C.matrixWorld),
              w.copy(g.line[I + 1]),
              w.applyMatrix4(C.matrixWorld),
              z.subVectors(w, B),
              (L = z.lengthSq()),
              z.normalize(),
              s.subVectors(B, this.ray.origin),
              (lineProj = s.dot(z)),
              (y = s.dot(this.ray.direction)),
              (p = h(this.ray.direction.dot(z))),
              (J = 1 - p * p),
              0 !== J &&
                ((H = (p * y - lineProj) / J),
                (K = (y - p * lineProj) / J),
                B.add(z.multiplyScalar(H)),
                w
                  .copy(this.ray.direction)
                  .multiplyScalar(K)
                  .add(this.ray.origin),
                (O = z.subVectors(w, B).lengthSq()),
                O < E && H * H < L && q.push({ clickable: u, distance: K }));
          I = 0;
          for (A = g.sphere.length; I < A; I++)
            if (
              g.sphere[I] instanceof $3Dmol.Sphere &&
              (b.copy(g.sphere[I]),
              b.applyMatrix4(C.matrixWorld),
              this.ray.isIntersectionSphere(b))
            ) {
              B.subVectors(b.center, this.ray.origin);
              C = B.dot(this.ray.direction);
              H = C * C - (B.lengthSq() - b.radius * b.radius);
              if (0 > C) break a;
              L = 0 >= H ? C : C - Math.sqrt(H);
              q.push({ clickable: u, distance: L });
              break a;
            }
        }
      }
    e.sort(x);
    return e;
  };
  return a;
})();
$3Dmol.Projector = function() {
  new $3Dmol.Matrix4();
  var a = new $3Dmol.Matrix4();
  this.projectVector = function(b, c) {
    c.matrixWorldInverse.getInverse(c.matrixWorld);
    a.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
    return b.applyProjection(a);
  };
  this.unprojectVector = function(b, c) {
    c.projectionMatrixInverse.getInverse(c.projectionMatrix);
    a.multiplyMatrices(c.matrixWorld, c.projectionMatrixInverse);
    return b.applyProjection(a);
  };
};
$3Dmol.Camera = function(a, b, c, m) {
  $3Dmol.Object3D.call(this);
  this.fov = void 0 !== a ? a : 50;
  this.aspect = void 0 !== b ? b : 1;
  this.near = void 0 !== c ? c : 0.1;
  this.far = void 0 !== m ? m : 2e3;
  this.projectionMatrix = new $3Dmol.Matrix4();
  this.projectionMatrixInverse = new $3Dmol.Matrix4();
  this.matrixWorldInverse = new $3Dmol.Matrix4();
  this.updateProjectionMatrix();
};
$3Dmol.Camera.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Camera.prototype.lookAt = function(a) {
  this.matrix.lookAt(this.position, a, this.up);
  this.rotationAutoUpdate &&
    (!1 === this.useQuaternion
      ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
      : this.quaternion.copy(this.matrix.decompose()[1]));
};
$3Dmol.Camera.prototype.updateProjectionMatrix = function() {
  this.projectionMatrix.makePerspective(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );
};
$3Dmol.SpritePlugin = function() {
  function a(a, b) {
    return a.z !== b.z ? b.z - a.z : b.id - a.id;
  }
  var b, c, m, s, B, w, z, d, x, h;
  this.init = function(a) {
    b = a.context;
    c = a;
    m = a.getPrecision();
    s = new Float32Array(16);
    B = new Uint16Array(6);
    a = 0;
    s[a++] = -1;
    s[a++] = -1;
    s[a++] = 0;
    s[a++] = 0;
    s[a++] = 1;
    s[a++] = -1;
    s[a++] = 1;
    s[a++] = 0;
    s[a++] = 1;
    s[a++] = 1;
    s[a++] = 1;
    s[a++] = 1;
    s[a++] = -1;
    s[a++] = 1;
    s[a++] = 0;
    s[a++] = 1;
    a = 0;
    B[a++] = 0;
    B[a++] = 1;
    B[a++] = 2;
    B[a++] = 0;
    B[a++] = 2;
    B[a++] = 3;
    w = b.createBuffer();
    z = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, w);
    b.bufferData(b.ARRAY_BUFFER, s, b.STATIC_DRAW);
    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, z);
    b.bufferData(b.ELEMENT_ARRAY_BUFFER, B, b.STATIC_DRAW);
    a = $3Dmol.ShaderLib.sprite;
    var l = m,
      e = b.createProgram(),
      G = b.createShader(b.FRAGMENT_SHADER),
      f = b.createShader(b.VERTEX_SHADER),
      l = "precision " + l + " float;\n";
    b.shaderSource(G, l + a.fragmentShader);
    b.shaderSource(f, l + a.vertexShader);
    b.compileShader(G);
    b.compileShader(f);
    b.getShaderParameter(G, b.COMPILE_STATUS) &&
    b.getShaderParameter(f, b.COMPILE_STATUS)
      ? (b.attachShader(e, G),
        b.attachShader(e, f),
        b.linkProgram(e),
        b.getProgramParameter(e, b.LINK_STATUS) ||
          console.error("Could not initialize shader"),
        (a = e))
      : (console.error(b.getShaderInfoLog(G)),
        console.error("could not initialize shader"),
        (a = null));
    d = a;
    x = {};
    h = {};
    x.position = b.getAttribLocation(d, "position");
    x.uv = b.getAttribLocation(d, "uv");
    h.uvOffset = b.getUniformLocation(d, "uvOffset");
    h.uvScale = b.getUniformLocation(d, "uvScale");
    h.rotation = b.getUniformLocation(d, "rotation");
    h.scale = b.getUniformLocation(d, "scale");
    h.alignment = b.getUniformLocation(d, "alignment");
    h.color = b.getUniformLocation(d, "color");
    h.map = b.getUniformLocation(d, "map");
    h.opacity = b.getUniformLocation(d, "opacity");
    h.useScreenCoordinates = b.getUniformLocation(d, "useScreenCoordinates");
    h.screenPosition = b.getUniformLocation(d, "screenPosition");
    h.modelViewMatrix = b.getUniformLocation(d, "modelViewMatrix");
    h.projectionMatrix = b.getUniformLocation(d, "projectionMatrix");
    h.fogType = b.getUniformLocation(d, "fogType");
    h.fogDensity = b.getUniformLocation(d, "fogDensity");
    h.fogNear = b.getUniformLocation(d, "fogNear");
    h.fogFar = b.getUniformLocation(d, "fogFar");
    h.fogColor = b.getUniformLocation(d, "fogColor");
    h.alphaTest = b.getUniformLocation(d, "alphaTest");
  };
  this.render = function(t, l, e, G) {
    var f = t.__webglSprites,
      C = f.length;
    if (C) {
      var u = x,
        q = h,
        g = 0.5 * e,
        E = 0.5 * G;
      b.useProgram(d);
      b.enableVertexAttribArray(u.position);
      b.enableVertexAttribArray(u.uv);
      b.disable(b.CULL_FACE);
      b.enable(b.BLEND);
      b.bindBuffer(b.ARRAY_BUFFER, w);
      b.vertexAttribPointer(u.position, 2, b.FLOAT, !1, 16, 0);
      b.vertexAttribPointer(u.uv, 2, b.FLOAT, !1, 16, 8);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, z);
      b.uniformMatrix4fv(q.projectionMatrix, !1, l.projectionMatrix.elements);
      b.activeTexture(b.TEXTURE0);
      b.uniform1i(q.map, 0);
      var m = (u = 0);
      (u = t.fog)
        ? (b.uniform3f(q.fogColor, u.color.r, u.color.g, u.color.b),
          b.uniform1f(q.fogNear, u.near),
          b.uniform1f(q.fogFar, u.far),
          b.uniform1i(q.fogType, 1),
          (m = u = 1))
        : (b.uniform1i(q.fogType, 0), (m = u = 0));
      var A,
        D,
        p,
        y = [];
      for (A = 0; A < C; A++)
        (D = f[A]),
          (p = D.material),
          D.visible &&
            0 !== p.opacity &&
            (p.useScreenCoordinates
              ? (D.z = -D.position.z)
              : (D._modelViewMatrix.multiplyMatrices(
                  l.matrixWorldInverse,
                  D.matrixWorld
                ),
                (D.z = -D._modelViewMatrix.elements[14])));
      f.sort(a);
      for (A = 0; A < C; A++)
        (D = f[A]),
          (p = D.material),
          D.visible &&
            0 !== p.opacity &&
            p.map &&
            p.map.image &&
            p.map.image.width &&
            (b.uniform1f(q.alphaTest, p.alphaTest),
            (l = p.map.image.height),
            (y[0] = (p.map.image.width * c.devicePixelRatio) / e),
            (y[1] = (l * c.devicePixelRatio) / G),
            !0 === p.useScreenCoordinates
              ? (b.uniform1i(q.useScreenCoordinates, 1),
                b.uniform3f(
                  q.screenPosition,
                  (D.position.x * c.devicePixelRatio - g) / g,
                  (E - D.position.y * c.devicePixelRatio) / E,
                  Math.max(0, Math.min(1, D.position.z))
                ))
              : (b.uniform1i(q.useScreenCoordinates, 0),
                b.uniformMatrix4fv(
                  q.modelViewMatrix,
                  !1,
                  D._modelViewMatrix.elements
                )),
            (l = t.fog && p.fog ? m : 0),
            u !== l && (b.uniform1i(q.fogType, l), (u = l)),
            (l = 1 / (p.scaleByViewport ? G : 1)),
            (y[0] = y[0] * l * D.scale.x),
            (y[1] = y[1] * l * D.scale.y),
            b.uniform2f(q.uvScale, p.uvScale.x, p.uvScale.y),
            b.uniform2f(q.uvOffset, p.uvOffset.x, p.uvOffset.y),
            b.uniform2f(q.alignment, p.alignment.x, p.alignment.y),
            b.uniform1f(q.opacity, p.opacity),
            b.uniform3f(q.color, p.color.r, p.color.g, p.color.b),
            b.uniform1f(q.rotation, D.rotation),
            b.uniform2fv(q.scale, y),
            c.setDepthTest(p.depthTest),
            c.setDepthWrite(p.depthWrite),
            c.setTexture(p.map, 0),
            b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
      b.enable(b.CULL_FACE);
    }
  };
};
$3Dmol.Light = function(a, b) {
  $3Dmol.Object3D.call(this);
  this.color = new $3Dmol.Color(a);
  this.position = new $3Dmol.Vector3(0, 1, 0);
  this.target = new $3Dmol.Object3D();
  this.intensity = void 0 !== b ? b : 1;
  this.onlyShadow = this.castShadow = !1;
};
$3Dmol.Light.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Material = function() {
  $3Dmol.EventDispatcher.call(this);
  this.id = $3Dmol.MaterialIdCount++;
  this.name = "";
  this.side = $3Dmol.FrontSide;
  this.opacity = 1;
  this.transparent = !1;
  this.stencilTest = this.depthWrite = this.depthTest = !0;
  this.polygonOffset = !1;
  this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
  this.needsUpdate = this.visible = !0;
};
$3Dmol.Material.prototype.setValues = function(a) {
  if (void 0 !== a)
    for (var b in a) {
      var c = a[b];
      if (void 0 === c)
        console.warn("$3Dmol.Material: '" + b + "' parameter is undefined.");
      else if (b in this) {
        var m = this[b];
        m instanceof $3Dmol.Color && c instanceof $3Dmol.Color
          ? m.copy(c)
          : m instanceof $3Dmol.Color
          ? m.set(c)
          : m instanceof $3Dmol.Vector3 && c instanceof $3Dmol.Vector3
          ? m.copy(c)
          : (this[b] = c);
      }
    }
};
$3Dmol.Material.prototype.clone = function(a) {
  void 0 === a && (a = new $3Dmol.Material());
  a.name = this.name;
  a.side = this.side;
  a.opacity = this.opacity;
  a.transparent = this.transparent;
  a.depthTest = this.depthTest;
  a.depthWrite = this.depthWrite;
  a.stencilTest = this.stencilTest;
  a.polygonOffset = this.polygonOffset;
  a.polygonOffsetFactor = this.polygonOffsetFactor;
  a.polygonOffsetUnits = this.polygonOffsetUnits;
  a.alphaTest = this.alphaTest;
  a.overdraw = this.overdraw;
  a.visible = this.visible;
  return a;
};
$3Dmol.Material.prototype.dispose = function() {
  this.dispatchEvent({ type: "dispose" });
};
$3Dmol.MaterialIdCount = 0;
$3Dmol.LineBasicMaterial = function(a) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.linewidth = 1;
  this.linejoin = this.linecap = "round";
  this.vertexColors = !1;
  this.fog = !0;
  this.shaderID = "basic";
  this.setValues(a);
};
$3Dmol.LineBasicMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.LineBasicMaterial.prototype.clone = function() {
  var a = new $3Dmol.LineBasicMaterial();
  $3Dmol.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  return a;
};
$3Dmol.MeshLambertMaterial = function(a) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.ambient = new $3Dmol.Color(1048575);
  this.emissive = new $3Dmol.Color(0);
  this.wrapAround = !1;
  this.wrapRGB = new $3Dmol.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = "lambert";
  this.vertexColors = $3Dmol.NoColors;
  this.skinning = !1;
  this.setValues(a);
};
$3Dmol.MeshLambertMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.MeshLambertMaterial.prototype.clone = function(a) {
  "undefined" === typeof a && (a = new $3Dmol.MeshLambertMaterial());
  $3Dmol.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.shaderID = this.shaderID;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
$3Dmol.MeshDoubleLambertMaterial = function(a) {
  $3Dmol.MeshLambertMaterial.call(this, a);
  this.shaderID = "lambertdouble";
  this.side = $3Dmol.DoubleSide;
};
$3Dmol.MeshDoubleLambertMaterial.prototype = Object.create(
  $3Dmol.MeshLambertMaterial.prototype
);
$3Dmol.MeshDoubleLambertMaterial.prototype.clone = function() {
  var a = new $3Dmol.MeshDoubleLambertMaterial();
  $3Dmol.MeshLambertMaterial.prototype.clone.call(this, a);
  return a;
};
$3Dmol.MeshOutlineMaterial = function(a) {
  $3Dmol.Material.call(this);
  a = a || {};
  this.fog = !0;
  this.shaderID = "outline";
  this.wireframe = !1;
  this.outlineColor = a.color || new $3Dmol.Color(0, 0, 0);
  this.outlineWidth = a.width || 0.1;
  this.outlinePushback = a.pushback || 1;
};
$3Dmol.MeshOutlineMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.MeshOutlineMaterial.prototype.clone = function(a) {
  "undefined" === typeof a && (a = new $3Dmol.MeshOutlineMaterial());
  $3Dmol.Material.prototype.clone.call(this, a);
  a.fog = this.fog;
  a.shaderID = this.shaderID;
  a.wireframe = this.wireframe;
  return a;
};
$3Dmol.ImposterMaterial = function(a) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.ambient = new $3Dmol.Color(1048575);
  this.emissive = new $3Dmol.Color(0);
  this.imposter = !0;
  this.wrapAround = !1;
  this.wrapRGB = new $3Dmol.Vector3(1, 1, 1);
  this.envMap = this.specularMap = this.lightMap = this.map = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  this.fog = !0;
  this.wireframe = !1;
  this.wireframeLinewidth = 1;
  this.wireframeLinejoin = this.wireframeLinecap = "round";
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = "sphereimposter";
  this.vertexColors = $3Dmol.NoColors;
  this.skinning = !1;
  this.setValues(a);
};
$3Dmol.ImposterMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.ImposterMaterial.prototype.clone = function() {
  var a = new $3Dmol.ImposterMaterial();
  $3Dmol.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.ambient.copy(this.ambient);
  a.emissive.copy(this.emissive);
  a.wrapAround = this.wrapAround;
  a.wrapRGB.copy(this.wrapRGB);
  a.map = this.map;
  a.lightMap = this.lightMap;
  a.specularMap = this.specularMap;
  a.envMap = this.envMap;
  a.combine = this.combine;
  a.reflectivity = this.reflectivity;
  a.refractionRatio = this.refractionRatio;
  a.fog = this.fog;
  a.shading = this.shading;
  a.shaderID = this.shaderID;
  a.vertexColors = this.vertexColors;
  a.skinning = this.skinning;
  a.morphTargets = this.morphTargets;
  a.morphNormals = this.morphNormals;
  return a;
};
$3Dmol.SpriteMaterial = function(a) {
  $3Dmol.Material.call(this);
  this.color = new $3Dmol.Color(16777215);
  this.map = new $3Dmol.Texture();
  this.useScreenCoordinates = !0;
  this.depthTest = !this.useScreenCoordinates;
  this.sizeAttenuation = !this.useScreenCoordinates;
  this.scaleByViewPort = !this.sizeAttenuation;
  this.alignment = $3Dmol.SpriteAlignment.center.clone();
  this.fog = !1;
  this.uvOffset = new $3Dmol.Vector2(0, 0);
  this.uvScale = new $3Dmol.Vector2(1, 1);
  this.setValues(a);
  a = a || {};
  void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates);
  void 0 === a.sizeAttenuation &&
    (this.sizeAttenuation = !this.useScreenCoordinates);
  void 0 === a.scaleByViewPort &&
    (this.scaleByViewPort = !this.sizeAttenuation);
};
$3Dmol.SpriteMaterial.prototype = Object.create($3Dmol.Material.prototype);
$3Dmol.SpriteMaterial.prototype.clone = function() {
  var a = new $3Dmol.SpriteMaterial();
  $3Dmol.Material.prototype.clone.call(this, a);
  a.color.copy(this.color);
  a.map = this.map;
  a.useScreenCoordinates = useScreenCoordinates;
  a.sizeAttenuation = this.sizeAttenuation;
  a.scaleByViewport = this.scaleByViewPort;
  a.alignment.copy(this.alignment);
  a.uvOffset.copy(this.uvOffset);
  return a;
};
$3Dmol.SpriteAlignment = {};
$3Dmol.SpriteAlignment.topLeft = new $3Dmol.Vector2(1, -1);
$3Dmol.SpriteAlignment.topCenter = new $3Dmol.Vector2(0, -1);
$3Dmol.SpriteAlignment.topRight = new $3Dmol.Vector2(-1, -1);
$3Dmol.SpriteAlignment.centerLeft = new $3Dmol.Vector2(1, 0);
$3Dmol.SpriteAlignment.center = new $3Dmol.Vector2(0, 0);
$3Dmol.SpriteAlignment.centerRight = new $3Dmol.Vector2(-1, 0);
$3Dmol.SpriteAlignment.bottomLeft = new $3Dmol.Vector2(1, 1);
$3Dmol.SpriteAlignment.bottomCenter = new $3Dmol.Vector2(0, 1);
$3Dmol.SpriteAlignment.bottomRight = new $3Dmol.Vector2(-1, 1);
$3Dmol.Texture = function(a) {
  $3Dmol.EventDispatcher.call(this);
  this.id = $3Dmol.TextureIdCount++;
  this.name = "";
  this.image = a;
  this.mipmaps = [];
  this.mapping = new $3Dmol.UVMapping();
  this.wrapT = this.wrapS = $3Dmol.ClampToEdgeWrapping;
  this.magFilter = $3Dmol.LinearFilter;
  this.minFilter = $3Dmol.LinearMipMapLinearFilter;
  this.anisotropy = 1;
  this.format = $3Dmol.RGBAFormat;
  this.type = $3Dmol.UnsignedByteType;
  this.offset = new $3Dmol.Vector2(0, 0);
  this.repeat = new $3Dmol.Vector2(1, 1);
  this.generateMipmaps = !0;
  this.premultiplyAlpha = !1;
  this.flipY = !0;
  this.unpackAlignment = 4;
  this.needsUpdate = !1;
  this.onUpdate = null;
};
$3Dmol.Texture.prototype = {
  constructor: $3Dmol.Texture,
  clone: function(a) {
    void 0 === a && (a = new $3Dmol.Texture());
    a.image = this.image;
    a.mipmaps = this.mipmaps.slice(0);
    a.mapping = this.mapping;
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.format = this.format;
    a.type = this.type;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.generateMipmaps = this.generateMipmaps;
    a.premultiplyAlpha = this.premultiplyAlpha;
    a.flipY = this.flipY;
    a.unpackAlignment = this.unpackAlignment;
    return a;
  },
  dispose: function() {
    this.dispatchEvent({ type: "dispose" });
  }
};
$3Dmol.TextureIdCount = 0;
$3Dmol.FrontSide = 0;
$3Dmol.BackSide = 1;
$3Dmol.DoubleSide = 2;
$3Dmol.NoShading = 0;
$3Dmol.FlatShading = 1;
$3Dmol.SmoothShading = 2;
$3Dmol.NoColors = 0;
$3Dmol.FaceColors = 1;
$3Dmol.VertexColors = 2;
$3Dmol.MultiplyOperation = 0;
$3Dmol.MixOperation = 1;
$3Dmol.AddOperation = 2;
$3Dmol.UVMapping = function() {};
$3Dmol.ClampToEdgeWrapping = 1001;
$3Dmol.LinearFilter = 1006;
$3Dmol.LinearMipMapLinearFilter = 1008;
$3Dmol.UnsignedByteType = 1009;
$3Dmol.RGBAFormat = 1021;
$3Dmol.Line = function(a, b, c) {
  $3Dmol.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new $3Dmol.LineBasicMaterial({ color: 16777215 * Math.random() });
  this.type = void 0 !== c ? c : $3Dmol.LineStrip;
};
$3Dmol.LineStrip = 0;
$3Dmol.LinePieces = 1;
$3Dmol.Line.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Line.prototype.clone = function(a) {
  void 0 === a &&
    (a = new $3Dmol.Line(this.geometry, this.material, this.type));
  $3Dmol.Object3D.prototype.clone.call(this, a);
  return a;
};
$3Dmol.Mesh = function(a, b) {
  $3Dmol.Object3D.call(this);
  this.geometry = a;
  this.material =
    void 0 !== b
      ? b
      : new $3Dmol.MeshBasicMaterial({
          color: 16777215 * Math.random(),
          wireframe: !0
        });
};
$3Dmol.Mesh.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Mesh.prototype.clone = function(a) {
  void 0 === a && (a = new $3Dmol.Mesh(this.geometry, this.material));
  $3Dmol.Object3D.prototype.clone.call(this, a);
  return a;
};
$3Dmol.Sprite = function(a) {
  $3Dmol.Object3D.call(this);
  this.material = void 0 !== a ? a : new $3Dmol.SpriteMaterial();
  this.rotation3d = this.rotation;
  this.rotation = 0;
};
$3Dmol.Sprite.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Sprite.prototype.updateMatrix = function() {
  this.matrix.setPosition(this.position);
  this.rotation3d.set(0, 0, this.rotation);
  this.matrix.setRotationFromEuler(this.rotation3d);
  (1 === this.scale.x && 1 === this.scale.y) || this.matrix.scale(this.scale);
  this.matrixWorldNeedsUpdate = !0;
};
$3Dmol.Sprite.prototype.clone = function(a) {
  void 0 === a && (a = new $3Dmol.Sprite(this.material));
  $3Dmol.Object3D.prototype.clone.call(this, a);
  return a;
};
$3Dmol.Renderer = function(a) {
  function b(a) {
    S[a] || (F.enableVertexAttribArray(a), (S[a] = !0));
  }
  function c(a, b) {
    var h;
    "fragment" === a
      ? (h = F.createShader(F.FRAGMENT_SHADER))
      : "vertex" === a && (h = F.createShader(F.VERTEX_SHADER));
    F.shaderSource(h, b);
    F.compileShader(h);
    return F.getShaderParameter(h, F.COMPILE_STATUS)
      ? h
      : (console.error(F.getShaderInfoLog(h)),
        console.error("could not initialize shader"),
        null);
  }
  function m(a, b, h, d, y, p, e, A) {
    var g, x, c;
    b ? ((x = a.length - 1), (A = b = -1)) : ((x = 0), (b = a.length), (A = 1));
    for (var w = x; w !== b; w += A)
      if (
        ((g = a[w]), g.render && ((x = g.object), (c = g.buffer), (g = g[h])))
      ) {
        e && C.setBlending(!0);
        C.setDepthTest(g.depthTest);
        C.setDepthWrite(g.depthWrite);
        var t = g.polygonOffset;
        null !== t &&
          (t
            ? F.enable(F.POLYGON_OFFSET_FILL)
            : F.disable(F.POLYGON_OFFSET_FILL));
        t = x._modelViewMatrix.isReflected();
        C.setMaterialFaces(g, t);
        C.renderBuffer(d, y, p, g, c, x);
        f &&
          !g.wireframe &&
          "basic" !== g.shaderID &&
          0 !== g.opacity &&
          C.renderBuffer(d, y, p, f, c, x);
      }
  }
  function s(a) {
    return 0 === (a & (a - 1));
  }
  function B(a) {
    return a === $3Dmol.UnsignedByteType
      ? F.UNSIGNED_BYTE
      : a === $3Dmol.RGBAFormat
      ? F.RGBA
      : 0;
  }
  a = a || {};
  var w = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
    z = void 0 !== a.precision ? a.precision : "highp",
    d = void 0 !== a.alpha ? a.alpha : !0,
    x = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
    h = void 0 !== a.antialias ? a.antialias : !1,
    t = void 0 !== a.stencil ? a.stencil : !0,
    l = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
    e =
      void 0 !== a.clearColor
        ? new $3Dmol.Color(a.clearColor)
        : new $3Dmol.Color(0),
    G = void 0 !== a.clearAlpha ? a.clearAlpha : 0,
    f = void 0 !== a.outline ? new $3Dmol.MeshOutlineMaterial(a.outline) : null;
  this.domElement = w;
  this.context = null;
  this.devicePixelRatio =
    void 0 !== a.devicePixelRatio
      ? a.devicePixelRatio
      : void 0 !== self.devicePixelRatio
      ? self.devicePixelRatio
      : 1;
  this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
  this.renderPluginsPost = [];
  this.info = {
    memory: { programs: 0, geometries: 0, textures: 0 },
    render: { calls: 0, vertices: 0, faces: 0, points: 0 }
  };
  var C = this,
    u = [],
    q = 0,
    g = null,
    E = -1,
    I = null,
    A = null,
    D = 0,
    p = -1,
    y = -1,
    L = -1,
    O = -1,
    J = null,
    H = 0,
    K = 0,
    M = 0,
    P = 0,
    U = 0,
    N = 0,
    S = {},
    Q = new $3Dmol.Matrix4(),
    T = new $3Dmol.Vector3(),
    R = new $3Dmol.Vector3(),
    X = !0,
    Z = [0, 0, 0],
    Y = [],
    aa = [],
    F;
  try {
    if (
      !(F = w.getContext("experimental-webgl", {
        alpha: d,
        premultipliedAlpha: x,
        antialias: h,
        stencil: t,
        preserveDrawingBuffer: l
      })) &&
      !(F = w.getContext("webgl", {
        alpha: d,
        premultipliedAlpha: x,
        antialias: h,
        stencil: t,
        preserveDrawingBuffer: l
      }))
    )
      throw "Error creating WebGL context.";
  } catch (ba) {
    console.error(ba);
  }
  F.getExtension("EXT_frag_depth");
  F.clearColor(0, 0, 0, 1);
  F.clearDepth(1);
  F.clearStencil(0);
  F.enable(F.DEPTH_TEST);
  F.depthFunc(F.LEQUAL);
  F.frontFace(F.CCW);
  F.cullFace(F.BACK);
  F.enable(F.CULL_FACE);
  F.enable(F.BLEND);
  F.blendEquation(F.FUNC_ADD);
  F.blendFunc(F.SRC_ALPHA, F.ONE_MINUS_SRC_ALPHA);
  F.clearColor(e.r, e.g, e.b, G);
  F.getExtension("EXT_frag_depth");
  this.context = F;
  this.getContext = function() {
    return F;
  };
  this.getPrecision = function() {
    return z;
  };
  this.setClearColorHex = function(a, b) {
    e.setHex(a);
    G = b;
    F.clearColor(e.r, e.g, e.b, G);
  };
  this.enableOutline = function(a) {
    f = new $3Dmol.MeshOutlineMaterial(a);
  };
  this.disableOutline = function() {
    f = null;
  };
  this.setSize = function(a, b) {
    w.width = a * this.devicePixelRatio;
    w.height = b * this.devicePixelRatio;
    w.style.width = a + "px";
    w.style.height = b + "px";
    this.setViewport(0, 0, w.width, w.height);
  };
  this.setViewport = function(a, b, h, d) {
    H = void 0 !== a ? a : 0;
    K = void 0 !== b ? b : 0;
    M = void 0 !== h ? h : w.width;
    P = void 0 !== d ? d : w.height;
    F.viewport(H, K, M, P);
  };
  this.clear = function(a, b, h) {
    var d = 0;
    if (void 0 === a || a) d |= F.COLOR_BUFFER_BIT;
    if (void 0 === b || b) d |= F.DEPTH_BUFFER_BIT;
    if (void 0 === h || h) d |= F.STENCIL_BUFFER_BIT;
    F.clear(d);
  };
  this.clearTarget = function(a, b, h) {
    this.clear(a, b, h);
  };
  this.setMaterialFaces = function(a, b) {
    var h = a.side === $3Dmol.DoubleSide,
      d = a.side === $3Dmol.BackSide,
      d = b ? !d : d;
    p !== h && (h ? F.disable(F.CULL_FACE) : F.enable(F.CULL_FACE), (p = h));
    y !== d && (d ? F.frontFace(F.CW) : F.frontFace(F.CCW), (y = d));
  };
  this.setDepthTest = function(a) {
    L !== a && (a ? F.enable(F.DEPTH_TEST) : F.disable(F.DEPTH_TEST), (L = a));
  };
  this.setDepthWrite = function(a) {
    O !== a && (F.depthMask(a), (O = a));
  };
  this.setBlending = function(a) {
    a
      ? (F.enable(F.BLEND),
        F.blendEquationSeparate(F.FUNC_ADD, F.FUNC_ADD),
        F.blendFuncSeparate(
          F.SRC_ALPHA,
          F.ONE_MINUS_SRC_ALPHA,
          F.ONE,
          F.ONE_MINUS_SRC_ALPHA
        ))
      : F.disable(F.BLEND);
  };
  this.addPostPlugin = function(a) {
    a.init(this);
    this.renderPluginsPost.push(a);
  };
  var V = function(a) {
      a = a.target;
      a.removeEventListener("dispose", V);
      a.__webglInit = void 0;
      void 0 !== a.__webglVertexBuffer && F.deleteBuffer(a.__webglVertexBuffer);
      void 0 !== a.__webglColorBuffer && F.deleteBuffer(a.__webglColorBuffer);
      if (void 0 !== a.geometryGroups)
        for (var b = 0, h = a.groups; b < h; b++) {
          var d = a.geometryGroups[b];
          void 0 !== d.__webglVertexBuffer &&
            F.deleteBuffer(d.__webglVertexBuffer);
          void 0 !== d.__webglColorBuffer &&
            F.deleteBuffer(d.__webglColorBuffer);
          void 0 !== d.__webglNormalBuffer &&
            F.deleteBuffer(d.__webglNormalBuffer);
          void 0 !== d.__webglFaceBuffer && F.deleteBuffer(d.__webglFaceBuffer);
          void 0 !== d.__webglLineBuffer && F.deleteBuffer(d.__webglLineBuffer);
        }
      C.info.memory.geometries--;
    },
    da = function(a) {
      a = a.target;
      a.removeEventListener("dispose", da);
      a.image && a.image.__webglTextureCube
        ? F.deleteTexture(a.image.__webglTextureCube)
        : a.__webglInit &&
          ((a.__webglInit = !1), F.deleteTexture(a.__webglTexture));
      C.info.memory.textures--;
    },
    ta = function(a) {
      a = a.target;
      a.removeEventListener("dispose", ta);
      Pa(a);
    },
    Pa = function(a) {
      var b = a.program;
      if (void 0 !== b) {
        a.program = void 0;
        var h,
          d,
          y = !1;
        a = 0;
        for (h = u.length; a < h; a++)
          if (((d = u[a]), d.program === b)) {
            d.usedTimes--;
            0 === d.usedTimes && (y = !0);
            break;
          }
        if (!0 === y) {
          y = [];
          a = 0;
          for (h = u.length; a < h; a++)
            (d = u[a]), d.program !== b && y.push(d);
          u = y;
          F.deleteProgram(b);
          C.info.memory.programs--;
        }
      }
    };
  this.initMaterial = function(a, b, h, d) {
    a.addEventListener("dispose", ta);
    if ((b = a.shaderID))
      (b = $3Dmol.ShaderLib[b]),
        (a.vertexShader = b.vertexShader),
        (a.fragmentShader = b.fragmentShader),
        (a.uniforms = $3Dmol.ShaderUtils.clone(b.uniforms));
    var y;
    a: {
      var p = a.fragmentShader;
      d = a.vertexShader;
      h = a.uniforms;
      var e = { wireframe: a.wireframe, fragdepth: a.imposter },
        g,
        f;
      b = [];
      b.push(p);
      b.push(d);
      for (g in e) b.push(g), b.push(e[g]);
      b = b.join();
      g = 0;
      for (f = u.length; g < f; g++) {
        var A = u[g];
        if (A.code === b) {
          A.usedTimes++;
          y = A.program;
          break a;
        }
      }
      g = F.createProgram();
      A = "precision " + z + " float;";
      f = "" + A;
      e = [
        e.fragdepth ? "#extension GL_EXT_frag_depth: enable" : "",
        e.wireframe ? "#define WIREFRAME 1" : "",
        A
      ].join("\n");
      p = c("fragment", e + p);
      d = c("vertex", f + d);
      F.attachShader(g, d);
      F.attachShader(g, p);
      F.linkProgram(g);
      F.getProgramParameter(g, F.LINK_STATUS) ||
        console.error("Could not initialize shader");
      g.uniforms = {};
      g.attributes = {};
      d = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition".split(
        " "
      );
      for (y in h) d.push(y);
      for (y = 0; y < d.length; y++)
        (h = d[y]), (g.uniforms[h] = F.getUniformLocation(g, h));
      d = ["position", "normal", "color", "lineDistance"];
      for (y = 0; y < d.length; y++)
        (h = d[y]), (g.attributes[h] = F.getAttribLocation(g, h));
      g.id = q++;
      u.push({ program: g, code: b, usedTimes: 1 });
      C.info.memory.programs = u.length;
      y = g;
    }
    a.program = y;
  };
  this.renderBuffer = function(a, h, d, y, p, e) {
    if (y.visible) {
      var f;
      y.needsUpdate &&
        (y.program && Pa(y), C.initMaterial(y, h, d, e), (y.needsUpdate = !1));
      var x = !1,
        c = y.program,
        w = c.uniforms;
      f = y.uniforms;
      c != g && (F.useProgram(c), (g = c), (x = !0));
      y.id != E && ((E = y.id), (x = !0));
      a != A && ((A = a), (x = !0));
      F.uniformMatrix4fv(w.projectionMatrix, !1, a.projectionMatrix.elements);
      F.uniformMatrix4fv(w.modelViewMatrix, !1, e._modelViewMatrix.elements);
      F.uniformMatrix3fv(w.normalMatrix, !1, e._normalMatrix.elements);
      if (x) {
        f.fogColor.value = d.color;
        f.fogNear.value = d.near;
        f.fogFar.value = d.far;
        if (0 === y.shaderID.lastIndexOf("lambert", 0)) {
          F.uniformMatrix4fv(w.viewMatrix, !1, a.matrixWorldInverse.elements);
          if (X) {
            var t,
              q,
              z = 0,
              l = 0,
              u = 0;
            a = 0;
            for (d = h.length; a < d; a++)
              if (
                ((x = h[a]),
                (t = x.color),
                (q = x.intensity),
                x instanceof $3Dmol.Light &&
                  (z++,
                  R.getPositionFromMatrix(x.matrixWorld),
                  T.getPositionFromMatrix(x.target.matrixWorld),
                  R.sub(T),
                  R.normalize(),
                  0 !== R.x || 0 !== R.y || 0 !== R.z))
              )
                (aa[u] = R.x),
                  (aa[u + 1] = R.y),
                  (aa[u + 2] = R.z),
                  (Y[u] = t.r * q),
                  (Y[u + 1] = t.g * q),
                  (Y[u + 2] = t.b * q),
                  (u += 3),
                  l++;
            Z[0] = 0;
            Z[1] = 0;
            Z[2] = 0;
            X = !1;
          }
          f.ambientLightColor.value = Z;
          f.directionalLightColor.value = Y;
          f.directionalLightDirection.value = aa;
          f.ambient.value = y.ambient;
          f.emissive.value = y.emissive;
        } else
          "outline" === y.shaderID
            ? ((f.outlineColor.value = y.outlineColor),
              (f.outlineWidth.value = y.outlineWidth),
              (f.outlinePushback.value = y.outlinePushback))
            : "sphereimposter" === y.shaderID &&
              (F.uniformMatrix4fv(
                w.viewMatrix,
                !1,
                a.matrixWorldInverse.elements
              ),
              F.uniformMatrix3fv(w.normalMatrix, !1, e._normalMatrix.elements));
        f.opacity.value = y.opacity;
        f.diffuse.value = y.color;
        for (var D in f)
          w[D] &&
            ((h = f[D].type),
            (a = f[D].value),
            (d = w[D]),
            "f" === h
              ? F.uniform1f(d, a)
              : "fv" === h
              ? F.uniform3fv(d, a)
              : "c" === h && F.uniform3f(d, a.r, a.g, a.b));
      }
      f = c.attributes;
      w = !1;
      c = 16777215 * p.id + 2 * c.id + (y.wireframe ? 1 : 0);
      c !== I && ((I = c), (w = !0));
      if (w) {
        for (var L in S) S[L] && (F.disableVertexAttribArray(L), (S[L] = !1));
        0 <= f.position &&
          (F.bindBuffer(F.ARRAY_BUFFER, p.__webglVertexBuffer),
          b(f.position),
          F.vertexAttribPointer(f.position, 3, F.FLOAT, !1, 0, 0));
        0 <= f.color &&
          (F.bindBuffer(F.ARRAY_BUFFER, p.__webglColorBuffer),
          b(f.color),
          F.vertexAttribPointer(f.color, 3, F.FLOAT, !1, 0, 0));
        0 <= f.normal &&
          (F.bindBuffer(F.ARRAY_BUFFER, p.__webglNormalBuffer),
          b(f.normal),
          F.vertexAttribPointer(f.normal, 3, F.FLOAT, !1, 0, 0));
      }
      var O;
      e instanceof $3Dmol.Mesh
        ? (y.wireframe
            ? ((e = p.lineidx),
              (y = y.wireframeLinewidth),
              y !== J && (F.lineWidth(y), (J = y)),
              w && F.bindBuffer(F.ELEMENT_ARRAY_BUFFER, p.__webglLineBuffer),
              F.drawElements(F.LINES, e, F.UNSIGNED_SHORT, 0))
            : ((O = p.faceidx),
              w && F.bindBuffer(F.ELEMENT_ARRAY_BUFFER, p.__webglFaceBuffer),
              F.drawElements(F.TRIANGLES, O, F.UNSIGNED_SHORT, 0)),
          C.info.render.calls++,
          (C.info.render.vertices += O),
          (C.info.render.faces += O / 3))
        : e instanceof $3Dmol.Line &&
          ((e = p.vertices),
          (p = y.linewidth),
          p !== J && (F.lineWidth(p), (J = p)),
          F.drawArrays(F.LINES, 0, e),
          C.info.render.calls++);
    }
  };
  this.render = function(a, b, h) {
    if (!1 === b instanceof $3Dmol.Camera)
      console.error(
        "$3Dmol.Renderer.render: camera is not an instance of $3Dmol.Camera."
      );
    else {
      var d,
        f,
        e,
        x,
        w = a.__lights,
        c = a.fog;
      E = -1;
      X = !0;
      this.autoUpdateScene && a.updateMatrixWorld();
      void 0 === b.parent && b.updateMatrixWorld();
      b.matrixWorldInverse.getInverse(b.matrixWorld);
      Q.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
      this.autoUpdateObjects && this.initWebGLObjects(a);
      C.info.render.calls = 0;
      C.info.render.vertices = 0;
      C.info.render.faces = 0;
      C.info.render.points = 0;
      U = M;
      N = P;
      (this.autoClear || h) &&
        this.clear(
          this.autoClearColor,
          this.autoClearDepth,
          this.autoClearStencil
        );
      x = a.__webglObjects;
      h = 0;
      for (d = x.length; h < d; h++)
        if (((f = x[h]), (e = f.object), (f.render = !1), e.visible)) {
          e._modelViewMatrix.multiplyMatrices(
            b.matrixWorldInverse,
            e.matrixWorld
          );
          e._normalMatrix.getInverse(e._modelViewMatrix);
          e._normalMatrix.transpose();
          e = f;
          var t = e.object.material;
          t.transparent
            ? ((e.opaque = null),
              (e.transparent = t),
              t.wireframe || ((t = t.clone()), (t.opacity = 0), (e.blank = t)))
            : ((e.opaque = t), (e.transparent = null));
          f.render = !0;
        }
      this.setBlending(!1);
      m(a.__webglObjects, !0, "opaque", b, w, c, !1, null);
      m(a.__webglObjects, !0, "blank", b, w, c, !0, null);
      m(a.__webglObjects, !1, "transparent", b, w, c, !0, null);
      w = this.renderPluginsPost;
      I = -1;
      A = g = null;
      y = E = p = L = O = -1;
      if (w.length)
        for (c = 0, h = w.length; c < h; c++)
          (X = !0),
            w[c].render(a, b, U, N),
            (I = -1),
            (A = g = null),
            (y = E = p = L = O = -1);
      this.setDepthTest(!0);
      this.setDepthWrite(!0);
    }
  };
  this.initWebGLObjects = function(a) {
    a.__webglObjects ||
      ((a.__webglObjects = []),
      (a.__webglObjectsImmediate = []),
      (a.__webglSprites = []),
      (a.__webglFlares = []));
    if (a.__objectsAdded.length) {
      for (; a.__objectsAdded.length; ) {
        var b = a.__objectsAdded[0],
          h = a,
          d = void 0,
          y = void 0,
          e = void 0,
          p = void 0;
        if (
          !b.__webglInit &&
          ((b.__webglInit = !0),
          (b._modelViewMatrix = new $3Dmol.Matrix4()),
          (b._normalMatrix = new $3Dmol.Matrix3()),
          void 0 !== b.geometry &&
            void 0 === b.geometry.__webglInit &&
            ((b.geometry.__webglInit = !0),
            b.geometry.addEventListener("dispose", V)),
          b instanceof $3Dmol.Mesh || b instanceof $3Dmol.Line)
        )
          for (e = b.geometry, d = 0, y = e.geometryGroups.length; d < y; d++)
            (p = e.geometryGroups[d]),
              (p.id = D++),
              p.__webglVertexBuffer ||
                (b instanceof $3Dmol.Mesh
                  ? ((p.__webglVertexBuffer = F.createBuffer()),
                    (p.__webglNormalBuffer = F.createBuffer()),
                    (p.__webglColorBuffer = F.createBuffer()),
                    (p.__webglFaceBuffer = F.createBuffer()),
                    (p.__webglLineBuffer = F.createBuffer()),
                    C.info.memory.geometries++,
                    (e.elementsNeedUpdate = !0),
                    (e.normalsNeedUpdate = !0))
                  : b instanceof $3Dmol.Line &&
                    ((p.__webglVertexBuffer = F.createBuffer()),
                    (p.__webglColorBuffer = F.createBuffer()),
                    C.info.memory.geometries++),
                (e.verticesNeedUpdate = !0),
                (e.colorsNeedUpdate = !0));
        if (!b.__webglActive) {
          if (b instanceof $3Dmol.Mesh || b instanceof $3Dmol.Line)
            for (e = b.geometry, d = 0, y = e.geometryGroups.length; d < y; d++)
              (p = e.geometryGroups[d]),
                h.__webglObjects.push({
                  buffer: p,
                  object: b,
                  opaque: null,
                  transparent: null
                });
          else b instanceof $3Dmol.Sprite && h.__webglSprites.push(b);
          b.__webglActive = !0;
        }
        a.__objectsAdded.splice(0, 1);
      }
      I = -1;
    }
    for (; a.__objectsRemoved.length; ) {
      b = a.__objectsRemoved[0];
      h = a;
      if (b instanceof $3Dmol.Mesh || b instanceof $3Dmol.Line)
        for (h = h.__webglObjects, d = b, y = h.length - 1; 0 <= y; --y)
          h[y].object === d && h.splice(y, 1);
      else if (b instanceof $3Dmol.Sprite)
        for (h = h.__webglSprites, d = b, y = h.length - 1; 0 <= y; --y)
          h[y] === d && h.splice(y, 1);
      b.__webglActive = !1;
      a.__objectsRemoved.splice(0, 1);
    }
    b = 0;
    for (h = a.__webglObjects.length; b < h; b++)
      if (
        ((y = a.__webglObjects[b].object),
        (d = y.geometry),
        (p = void 0),
        y instanceof $3Dmol.Mesh || y instanceof $3Dmol.Line)
      ) {
        y = 0;
        for (e = d.geometryGroups.length; y < e; y++)
          if (
            ((p = d.geometryGroups[y]),
            d.verticesNeedUpdate ||
              d.elementsNeedUpdate ||
              d.colorsNeedUpdate ||
              d.normalsNeedUpdate)
          ) {
            var f = F.STATIC_DRAW,
              g = p.vertexArray,
              A = p.colorArray;
            F.bindBuffer(F.ARRAY_BUFFER, p.__webglVertexBuffer);
            F.bufferData(F.ARRAY_BUFFER, g, f);
            F.bindBuffer(F.ARRAY_BUFFER, p.__webglColorBuffer);
            F.bufferData(F.ARRAY_BUFFER, A, f);
            void 0 !== p.normalArray &&
              void 0 !== p.__webglNormalBuffer &&
              ((g = p.normalArray),
              F.bindBuffer(F.ARRAY_BUFFER, p.__webglNormalBuffer),
              F.bufferData(F.ARRAY_BUFFER, g, f));
            void 0 !== p.faceArray &&
              void 0 !== p.__webglFaceBuffer &&
              ((g = p.faceArray),
              F.bindBuffer(F.ELEMENT_ARRAY_BUFFER, p.__webglFaceBuffer),
              F.bufferData(F.ELEMENT_ARRAY_BUFFER, g, f));
            void 0 !== p.lineArray &&
              void 0 !== p.__webglLineBuffer &&
              ((g = p.lineArray),
              F.bindBuffer(F.ELEMENT_ARRAY_BUFFER, p.__webglLineBuffer),
              F.bufferData(F.ELEMENT_ARRAY_BUFFER, g, f));
          }
        d.verticesNeedUpdate = !1;
        d.elementsNeedUpdate = !1;
        d.normalsNeedUpdate = !1;
        d.colorsNeedUpdate = !1;
        d.buffersNeedUpdate = !1;
      }
  };
  this.setTexture = function(a, b) {
    if (a.needsUpdate) {
      a.__webglInit ||
        ((a.__webglInit = !0),
        a.addEventListener("dispose", da),
        (a.__webglTexture = F.createTexture()),
        C.info.memory.textures++);
      F.activeTexture(F.TEXTURE0 + b);
      F.bindTexture(F.TEXTURE_2D, a.__webglTexture);
      F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL, a.flipY);
      F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
      F.pixelStorei(F.UNPACK_ALIGNMENT, a.unpackAlignment);
      var h = a.image,
        h = s(h.width) && s(h.height),
        d = B(a.format),
        y = B(a.type),
        p = F.TEXTURE_2D;
      h
        ? (F.texParameteri(p, F.TEXTURE_WRAP_S, B(a.wrapS)),
          F.texParameteri(p, F.TEXTURE_WRAP_T, B(a.wrapT)),
          F.texParameteri(p, F.TEXTURE_MAG_FILTER, B(a.magFilter)),
          F.texParameteri(p, F.TEXTURE_MIN_FILTER, B(a.minFilter)))
        : (F.texParameteri(p, F.TEXTURE_WRAP_S, F.CLAMP_TO_EDGE),
          F.texParameteri(p, F.TEXTURE_WRAP_T, F.CLAMP_TO_EDGE),
          F.texParameteri(p, F.TEXTURE_MAG_FILTER, F.LINEAR),
          F.texParameteri(p, F.TEXTURE_MIN_FILTER, F.LINEAR));
      var e = a.mipmaps;
      if (0 < e.length && h) {
        for (var f = 0, g = e.length; f < g; f++)
          (p = e[f]), F.texImage2D(F.TEXTURE_2D, f, d, d, y, p);
        a.generateMipmaps = !1;
      } else F.texImage2D(F.TEXTURE_2D, 0, d, d, y, a.image);
      a.generateMipmaps && h && F.generateMipmap(F.TEXTURE_2D);
      a.needsUpdate = !1;
      if (a.onUpdate) a.onUpdate();
    } else
      F.activeTexture(F.TEXTURE0 + b),
        F.bindTexture(F.TEXTURE_2D, a.__webglTexture);
  };
  this.addPostPlugin(new $3Dmol.SpritePlugin());
};
$3Dmol.Scene = function() {
  $3Dmol.Object3D.call(this);
  this.overrideMaterial = this.fog = null;
  this.matrixAutoUpdate = !1;
  this.__objects = [];
  this.__lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
};
$3Dmol.Scene.prototype = Object.create($3Dmol.Object3D.prototype);
$3Dmol.Scene.prototype.__addObject = function(a) {
  a instanceof $3Dmol.Light
    ? (-1 === this.__lights.indexOf(a) && this.__lights.push(a),
      a.target && void 0 === a.target.parent && this.add(a.target))
    : -1 === this.__objects.indexOf(a) &&
      (this.__objects.push(a),
      this.__objectsAdded.push(a),
      -1 !== this.__objectsRemoved.indexOf(a) &&
        this.__objectsRemoved.splice(b, 1));
  for (var b = 0; b < a.children.length; b++) this.__addObject(a.children[b]);
};
$3Dmol.Scene.prototype.__removeObject = function(a) {
  var b;
  a instanceof $3Dmol.Light
    ? ((b = this.__lights.indexOf(a)), -1 !== b && this.__lights.splice(b, 1))
    : ((b = this.__objects.indexOf(a)),
      -1 !== b &&
        (this.__objects.splice(b, 1),
        this.__objectsRemoved.push(a),
        -1 !== this.__objectsAdded.indexOf(a) &&
          this.__objectsAdded.splice(b, 1)));
  for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b]);
};
$3Dmol.Fog = function(a, b, c) {
  this.name = "";
  this.color = new $3Dmol.Color(a);
  this.near = void 0 !== b ? b : 1;
  this.far = void 0 !== c ? c : 1e3;
};
$3Dmol.Fog.prototype.clone = function() {
  return new $3Dmol.Fog(this.color.getHex(), this.near, this.far);
};
$3Dmol.ShaderUtils = {
  clone: function(a) {
    var b,
      c = {};
    for (b in a) {
      c[b] = {};
      c[b].type = a[b].type;
      var m = a[b].value;
      m instanceof $3Dmol.Color
        ? (c[b].value = m.clone())
        : "number" === typeof m
        ? (c[b].value = m)
        : m instanceof Array
        ? (c[b].value = [])
        : console.error(
            "Error copying shader uniforms from ShaderLib: unknown type for uniform"
          );
    }
    return c;
  }
};
$3Dmol.ShaderLib = {
  basic: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( diffuse, opacity );\n    gl_FragColor = gl_FragColor * vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 color;\nvarying vec3 vColor;\nvoid main() {\n    vColor = color;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      diffuse: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 }
    }
  },
  sphereimposter: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform float uDepth;\nvarying vec3 vColor;\nvarying vec2 mapping;\nvarying float rval;\nvoid main() {\n    float lensqr = dot(mapping,mapping);\n    float rsqr = rval*rval;\n    if(lensqr > rsqr)\n       discard;\n    float z = sqrt(rsqr-lensqr);\n    float zscale = z/rval;\n    gl_FragColor = vec4(zscale*vColor, 1 );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    gl_FragDepthEXT = gl_FragCoord.z-z/depth;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec2 mapping;\nvarying vec3 vColor;\nvarying float rval;\nvoid main() {\n    vColor = color;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vec4 projPosition = projectionMatrix * mvPosition;\n    vec4 adjust = projectionMatrix* vec4(normal,0.0); adjust.z = 0.0; adjust.w = 0.0;\n    mapping = normal.xy;\n    rval = abs(normal.x);\n    gl_Position = projPosition+adjust;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      diffuse: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 }
    }
  },
  lambert: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vLightFront;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\n    #ifndef WIREFRAME\n    gl_FragColor.xyz *= vLightFront;\n    #endif\n    gl_FragColor = gl_FragColor * vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec3 vColor;\nvarying vec3 vLightFront;\nvoid main() {\n    vColor = color;\n    vec3 objectNormal = normal;\n    vec3 transformedNormal = normalMatrix * objectNormal;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vLightFront = vec3( 0.0 );\n    transformedNormal = normalize( transformedNormal );\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vec3 dirVector = normalize( lDirection.xyz );\n    float dotProduct = dot( transformedNormal, dirVector );\n    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;\n    vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      diffuse: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      ambient: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      emissive: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      ambientLightColor: { type: "fv", value: [] },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] }
    }
  },
  outline: {
    fragmentShader:
      "uniform float opacity;\nuniform vec3 outlineColor;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvoid main() {\n    gl_FragColor = vec4( outlineColor, 1 );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float outlineWidth;\nuniform float outlinePushback;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvoid main() {\n    vec4 norm = modelViewMatrix*vec4(normalize(normal),0.0);\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    mvPosition.xy += norm.xy*outlineWidth;\n    gl_Position = projectionMatrix * mvPosition;\n    mvPosition.z -= outlinePushback;\n    vec4 pushpos = projectionMatrix*mvPosition;\n    gl_Position.z = gl_Position.w*pushpos.z/pushpos.w;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      diffuse: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      outlineColor: { type: "c", value: new $3Dmol.Color(0, 0, 0) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      outlineWidth: { type: "f", value: 0.1 },
      outlinePushback: { type: "f", value: 1 }
    }
  },
  lambertdouble: {
    fragmentShader:
      "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\nuniform float opacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying vec3 vLightFront;\nvarying vec3 vLightBack;\nvarying vec3 vColor;\nvoid main() {\n    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\n    #ifndef WIREFRAME\n    if ( gl_FrontFacing )\n       gl_FragColor.xyz *= vLightFront;\n    else\n       gl_FragColor.xyz *= vLightBack;\n    #endif\n    gl_FragColor = gl_FragColor * vec4( vColor, opacity );\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = smoothstep( fogNear, fogFar, depth );\n    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}",
    vertexShader:
      "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\nuniform vec3 directionalLightColor[ 1 ];\nuniform vec3 directionalLightDirection[ 1 ];\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 color;\nvarying vec3 vColor;\nvarying vec3 vLightFront;\nvarying vec3 vLightBack;\nvoid main() {\n    vColor = color;\n    vec3 objectNormal = normal;\n    vec3 transformedNormal = normalMatrix * objectNormal;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vLightFront = vec3( 0.0 );\n    vLightBack = vec3( 0.0 );\n    transformedNormal = normalize( transformedNormal );\n    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );\n    vec3 dirVector = normalize( lDirection.xyz );\n    float dotProduct = dot( transformedNormal, dirVector );\n    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n    vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;\n    vLightBack += directionalLightColor[ 0 ] * directionalLightWeightingBack;\n    vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n    vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n    gl_Position = projectionMatrix * mvPosition;\n}",
    uniforms: {
      opacity: { type: "f", value: 1 },
      diffuse: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogColor: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      ambient: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      emissive: { type: "c", value: new $3Dmol.Color(1, 1, 1) },
      ambientLightColor: { type: "fv", value: [] },
      directionalLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] }
    }
  },
  sprite: {
    fragmentShader:
      "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\n    vec4 texture = texture2D(map, vUV);\n    if (texture.a < alphaTest) discard;\n    gl_FragColor = vec4(color * texture.xyz, texture.a * opacity);\n    if (fogType > 0) {\n        float depth = gl_FragCoord.z / gl_FragCoord.w;\n        float fogFactor = 0.0;\n        if (fogType == 1) {\n            fogFactor = smoothstep(fogNear, fogFar, depth);\n        }\n        else {\n            const float LOG2 = 1.442695;\n            float fogFactor = exp2(- fogDensity * fogDensity * depth * depth * LOG2);\n            fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);\n        }\n        gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);\n    }\n}",
    vertexShader:
      "uniform int useScreenCoordinates;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\n    vUV = uvOffset + uv * uvScale;\n    vec2 alignedPosition = position + alignment;\n    vec2 rotatedPosition;\n    rotatedPosition.x = ( cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y ) * scale.x;\n    rotatedPosition.y = ( sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y ) * scale.y;\n    vec4 finalPosition;\n    if(useScreenCoordinates != 0) {\n        finalPosition = vec4(screenPosition.xy + rotatedPosition, screenPosition.z, 1.0);\n    }\n    else {\n        finalPosition = projectionMatrix * modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); finalPosition /= finalPosition.w;\n        finalPosition.xy += rotatedPosition; \n    }\n    gl_Position = finalPosition;\n}",
    uniforms: {}
  }
};
"undefined" === typeof console && (console = { log: function() {} });
$3Dmol.ProteinSurface = function() {
  var a = 0,
    b = 0,
    c = 0,
    m = 2,
    s = 0,
    B = 0,
    w = 0,
    z = 0,
    d = null,
    x = null,
    h = null,
    t = 0,
    l = 0,
    e = 0,
    G = 0,
    f = 0,
    C = 0,
    u = {
      H: 1.2,
      Li: 1.82,
      Na: 2.27,
      K: 2.75,
      C: 1.7,
      N: 1.55,
      O: 1.52,
      F: 1.47,
      P: 1.8,
      S: 1.8,
      CL: 1.75,
      BR: 1.85,
      SE: 1.9,
      ZN: 1.39,
      CU: 1.4,
      NI: 1.63,
      X: 2
    },
    q = function(a) {
      return a.elem && "undefined" != typeof u[a.elem] ? a.elem : "X";
    },
    g = {},
    E = {},
    I,
    A,
    D = [
      new Int32Array([1, 0, 0]),
      new Int32Array([-1, 0, 0]),
      new Int32Array([0, 1, 0]),
      new Int32Array([0, -1, 0]),
      new Int32Array([0, 0, 1]),
      new Int32Array([0, 0, -1]),
      new Int32Array([1, 1, 0]),
      new Int32Array([1, -1, 0]),
      new Int32Array([-1, 1, 0]),
      new Int32Array([-1, -1, 0]),
      new Int32Array([1, 0, 1]),
      new Int32Array([1, 0, -1]),
      new Int32Array([-1, 0, 1]),
      new Int32Array([-1, 0, -1]),
      new Int32Array([0, 1, 1]),
      new Int32Array([0, 1, -1]),
      new Int32Array([0, -1, 1]),
      new Int32Array([0, -1, -1]),
      new Int32Array([1, 1, 1]),
      new Int32Array([1, 1, -1]),
      new Int32Array([1, -1, 1]),
      new Int32Array([-1, 1, 1]),
      new Int32Array([1, -1, -1]),
      new Int32Array([-1, -1, 1]),
      new Int32Array([-1, 1, -1]),
      new Int32Array([-1, -1, -1])
    ];
  this.getFacesAndVertices = function(y) {
    var p = {},
      e,
      f;
    e = 0;
    for (f = y.length; e < f; e++) p[y[e]] = !0;
    y = A;
    e = 0;
    for (f = y.length; e < f; e++)
      (y[e].x = y[e].x / m - a),
        (y[e].y = y[e].y / m - b),
        (y[e].z = y[e].z / m - c);
    var g = [];
    e = 0;
    for (f = I.length; e < f; e += 3) {
      var w = I[e],
        t = I[e + 1],
        q = I[e + 2],
        z = y[t].atomid,
        l = y[q].atomid,
        u = y[w].atomid;
      z < u && (u = z);
      l < u && (u = l);
      p[u] &&
        w !== t &&
        t !== q &&
        w !== q &&
        (g.push(w), g.push(t), g.push(q));
    }
    h = x = d = null;
    return { vertices: y, faces: g };
  };
  this.initparm = function(y, p, g) {
    1e6 < g && (m = 1);
    g = (1 / m) * 5.5;
    t = y[0][0];
    G = y[1][0];
    l = y[0][1];
    f = y[1][1];
    e = y[0][2];
    C = y[1][2];
    p
      ? ((t -= 1.4 + g),
        (l -= 1.4 + g),
        (e -= 1.4 + g),
        (G += 1.4 + g),
        (f += 1.4 + g),
        (C += 1.4 + g))
      : ((t -= g), (l -= g), (e -= g), (G += g), (f += g), (C += g));
    t = Math.floor(t * m) / m;
    l = Math.floor(l * m) / m;
    e = Math.floor(e * m) / m;
    G = Math.ceil(G * m) / m;
    f = Math.ceil(f * m) / m;
    C = Math.ceil(C * m) / m;
    a = -t;
    b = -l;
    c = -e;
    w = Math.ceil(m * (G - t)) + 1;
    B = Math.ceil(m * (f - l)) + 1;
    s = Math.ceil(m * (C - e)) + 1;
    this.boundingatom(p);
    z = 1.4 * m;
    d = new Uint8Array(w * B * s);
    x = new Float64Array(w * B * s);
    h = new Int32Array(w * B * s);
  };
  this.boundingatom = function(a) {
    var b = [],
      h,
      d;
    flagradius = a;
    for (var p in u)
      if (u.hasOwnProperty(p))
        for (
          d = u[p],
            b[p] = a ? (d + 1.4) * m + 0.5 : d * m + 0.5,
            d = b[p] * b[p],
            E[p] = Math.floor(b[p]) + 1,
            g[p] = new Int32Array(E[p] * E[p]),
            j = indx = 0;
          j < E[p];
          j++
        )
          for (k = 0; k < E[p]; k++)
            (h = j * j + k * k),
              h > d
                ? (g[p][indx] = -1)
                : ((h = Math.sqrt(d - h)), (g[p][indx] = Math.floor(h))),
              indx++;
  };
  this.fillvoxels = function(a, b) {
    var p, e;
    p = 0;
    for (e = d.length; p < e; p++) (d[p] = 0), (x[p] = -1), (h[p] = -1);
    for (p in b) (e = a[b[p]]), void 0 !== e && this.fillAtom(e, a);
    p = 0;
    for (e = d.length; p < e; p++) d[p] & 1 && (d[p] |= 2);
  };
  this.fillAtom = function(p, e) {
    var f, A, x, t, z, l, u, D, C, G, I, R, X, Z, Y, aa, F;
    f = Math.floor(0.5 + m * (p.x + a));
    A = Math.floor(0.5 + m * (p.y + b));
    x = Math.floor(0.5 + m * (p.z + c));
    var ba = q(p),
      V = 0,
      da = B * s;
    G = 0;
    for (F = E[ba]; G < F; G++)
      for (I = 0; I < F; I++) {
        if (-1 != g[ba][V])
          for (Z = -1; 2 > Z; Z++)
            for (Y = -1; 2 > Y; Y++)
              for (aa = -1; 2 > aa; aa++)
                if (0 !== Z && 0 !== Y && 0 !== aa)
                  for (u = Z * G, C = aa * I, R = 0; R <= g[ba][V]; R++)
                    (D = R * Y),
                      (t = f + u),
                      (z = A + D),
                      (X = x + C),
                      0 > t ||
                        0 > z ||
                        0 > X ||
                        t >= w ||
                        z >= B ||
                        X >= s ||
                        ((X = t * da + z * s + X),
                        d[X] & 1
                          ? ((l = e[h[X]]),
                            l.serial != p.serial &&
                              ((t = f + u - Math.floor(0.5 + m * (l.x + a))),
                              (z = A + D - Math.floor(0.5 + m * (l.y + b))),
                              (l = x + C - Math.floor(0.5 + m * (l.z + c))),
                              u * u + D * D + C * C < t * t + z * z + l * l &&
                                (h[X] = p.serial)))
                          : ((d[X] |= 1), (h[X] = p.serial)));
        V++;
      }
  };
  this.fillvoxelswaals = function(a, b) {
    var h, p;
    h = 0;
    for (p = d.length; h < p; h++) d[h] &= -3;
    for (h in b) (p = a[b[h]]), void 0 !== p && this.fillAtomWaals(p, a);
  };
  this.fillAtomWaals = function(p, e) {
    var f,
      A,
      x,
      t,
      z,
      l,
      u = 0,
      D,
      C,
      G,
      I,
      R,
      X,
      Z,
      Y,
      aa,
      F,
      ba;
    f = Math.floor(0.5 + m * (p.x + a));
    A = Math.floor(0.5 + m * (p.y + b));
    x = Math.floor(0.5 + m * (p.z + c));
    var V = q(p),
      da = B * s;
    R = 0;
    for (ba = E[V]; R < ba; R++)
      for (X = 0; X < ba; X++) {
        if (-1 != g[V][u])
          for (Y = -1; 2 > Y; Y++)
            for (aa = -1; 2 > aa; aa++)
              for (F = -1; 2 > F; F++)
                if (0 !== Y && 0 !== aa && 0 !== F)
                  for (D = Y * R, G = F * X, Z = 0; Z <= g[V][u]; Z++)
                    (C = Z * aa),
                      (t = f + D),
                      (z = A + C),
                      (I = x + G),
                      0 > t ||
                        0 > z ||
                        0 > I ||
                        t >= w ||
                        z >= B ||
                        I >= s ||
                        ((I = t * da + z * s + I),
                        d[I] & 2
                          ? ((l = e[h[I]]),
                            l.serial != p.serial &&
                              ((t = f + D - Math.floor(0.5 + m * (l.x + a))),
                              (z = A + C - Math.floor(0.5 + m * (l.y + b))),
                              (l = x + G - Math.floor(0.5 + m * (l.z + c))),
                              D * D + C * C + G * G < t * t + z * z + l * l &&
                                (h[I] = p.serial)))
                          : ((d[I] |= 2), (h[I] = p.serial)));
        u++;
      }
  };
  this.buildboundary = function() {
    var a = B * s;
    for (i = 0; i < w; i++)
      for (j = 0; j < s; j++)
        for (k = 0; k < B; k++) {
          var b = i * a + k * s + j;
          if (d[b] & 1)
            for (var h = 0; 26 > h; ) {
              var p = i + D[h][0],
                e = j + D[h][2],
                f = k + D[h][1];
              if (
                -1 < p &&
                p < w &&
                -1 < f &&
                f < B &&
                -1 < e &&
                e < s &&
                !(d[p * a + f * s + e] & 1)
              ) {
                d[b] |= 4;
                break;
              } else h++;
            }
        }
  };
  var p = function(a, b, h) {
    var d = new Int32Array(a * b * h * 3);
    this.set = function(a, p, e, y) {
      a = 3 * ((a * b + p) * h + e);
      d[a] = y.ix;
      d[a + 1] = y.iy;
      d[a + 2] = y.iz;
    };
    this.get = function(a, p, e) {
      a = 3 * ((a * b + p) * h + e);
      return { ix: d[a], iy: d[a + 1], iz: d[a + 2] };
    };
  };
  this.fastdistancemap = function() {
    var a,
      b,
      h,
      e = new p(w, B, s),
      f = B * s,
      g = z * z,
      A = [];
    h = [];
    var t;
    for (a = 0; a < w; a++)
      for (b = 0; b < B; b++)
        for (h = 0; h < s; h++)
          if (((t = a * f + b * s + h), (d[t] &= -3), d[t] & 1 && d[t] & 4)) {
            var c = { ix: a, iy: b, iz: h };
            e.set(a, b, h, c);
            A.push(c);
            x[t] = 0;
            d[t] |= 2;
            d[t] &= -5;
          }
    do
      for (h = this.fastoneshell(A, e), A = [], a = 0, b = h.length; a < b; a++)
        (t = f * h[a].ix + s * h[a].iy + h[a].iz),
          (d[t] &= -5),
          x[t] <= 1.0404 * g &&
            A.push({ ix: h[a].ix, iy: h[a].iy, iz: h[a].iz });
    while (0 !== A.length);
    a = m - 0.5;
    0 > a && (a = 0);
    g -= 0.5 / (0.1 + a);
    for (a = 0; a < w; a++)
      for (b = 0; b < B; b++)
        for (h = 0; h < s; h++)
          (t = a * f + b * s + h),
            (d[t] &= -5),
            d[t] & 1 && (!(d[t] & 2) || (d[t] & 2 && x[t] >= g)) && (d[t] |= 4);
  };
  this.fastoneshell = function(a, b) {
    var h,
      p,
      e,
      f,
      g,
      t,
      A,
      c,
      q,
      z,
      l,
      u = [];
    if (0 === a.length) return u;
    tnv = { ix: -1, iy: -1, iz: -1 };
    var C = B * s;
    A = 0;
    for (q = a.length; A < q; A++)
      for (
        h = a[A].ix, p = a[A].iy, e = a[A].iz, z = b.get(h, p, e), c = 0;
        6 > c;
        c++
      )
        (tnv.ix = h + D[c][0]),
          (tnv.iy = p + D[c][1]),
          (tnv.iz = e + D[c][2]),
          tnv.ix < w &&
            -1 < tnv.ix &&
            tnv.iy < B &&
            -1 < tnv.iy &&
            tnv.iz < s &&
            -1 < tnv.iz &&
            ((l = tnv.ix * C + s * tnv.iy + tnv.iz),
            d[l] & 1 && !(d[l] & 2)
              ? (b.set(tnv.ix, tnv.iy, e + D[c][2], z),
                (f = tnv.ix - z.ix),
                (g = tnv.iy - z.iy),
                (t = tnv.iz - z.iz),
                (f = f * f + g * g + t * t),
                (x[l] = f),
                (d[l] |= 2),
                (d[l] |= 4),
                u.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz }))
              : d[l] & 1 &&
                d[l] & 2 &&
                ((f = tnv.ix - z.ix),
                (g = tnv.iy - z.iy),
                (t = tnv.iz - z.iz),
                (f = f * f + g * g + t * t),
                f < x[l] &&
                  (b.set(tnv.ix, tnv.iy, tnv.iz, z),
                  (x[l] = f),
                  d[l] & 4 ||
                    ((d[l] |= 4),
                    u.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz })))));
    A = 0;
    for (q = a.length; A < q; A++)
      for (
        h = a[A].ix, p = a[A].iy, e = a[A].iz, z = b.get(h, p, e), c = 6;
        18 > c;
        c++
      )
        (tnv.ix = h + D[c][0]),
          (tnv.iy = p + D[c][1]),
          (tnv.iz = e + D[c][2]),
          tnv.ix < w &&
            -1 < tnv.ix &&
            tnv.iy < B &&
            -1 < tnv.iy &&
            tnv.iz < s &&
            -1 < tnv.iz &&
            ((l = tnv.ix * C + s * tnv.iy + tnv.iz),
            d[l] & 1 && !(d[l] & 2)
              ? (b.set(tnv.ix, tnv.iy, e + D[c][2], z),
                (f = tnv.ix - z.ix),
                (g = tnv.iy - z.iy),
                (t = tnv.iz - z.iz),
                (f = f * f + g * g + t * t),
                (x[l] = f),
                (d[l] |= 2),
                (d[l] |= 4),
                u.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz }))
              : d[l] & 1 &&
                d[l] & 2 &&
                ((f = tnv.ix - z.ix),
                (g = tnv.iy - z.iy),
                (t = tnv.iz - z.iz),
                (f = f * f + g * g + t * t),
                f < x[l] &&
                  (b.set(tnv.ix, tnv.iy, tnv.iz, z),
                  (x[l] = f),
                  d[l] & 4 ||
                    ((d[l] |= 4),
                    u.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz })))));
    A = 0;
    for (q = a.length; A < q; A++)
      for (
        h = a[A].ix, p = a[A].iy, e = a[A].iz, z = b.get(h, p, e), c = 18;
        26 > c;
        c++
      )
        (tnv.ix = h + D[c][0]),
          (tnv.iy = p + D[c][1]),
          (tnv.iz = e + D[c][2]),
          tnv.ix < w &&
            -1 < tnv.ix &&
            tnv.iy < B &&
            -1 < tnv.iy &&
            tnv.iz < s &&
            -1 < tnv.iz &&
            ((l = tnv.ix * C + s * tnv.iy + tnv.iz),
            d[l] & 1 && !(d[l] & 2)
              ? (b.set(tnv.ix, tnv.iy, e + D[c][2], z),
                (f = tnv.ix - z.ix),
                (g = tnv.iy - z.iy),
                (t = tnv.iz - z.iz),
                (f = f * f + g * g + t * t),
                (x[l] = f),
                (d[l] |= 2),
                (d[l] |= 4),
                u.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz }))
              : d[l] & 1 &&
                d[l] & 2 &&
                ((f = tnv.ix - z.ix),
                (g = tnv.iy - z.iy),
                (t = tnv.iz - z.iz),
                (f = f * f + g * g + t * t),
                f < x[l] &&
                  (b.set(tnv.ix, tnv.iy, tnv.iz, z),
                  (x[l] = f),
                  d[l] & 4 ||
                    ((d[l] |= 4),
                    u.push({ ix: tnv.ix, iy: tnv.iy, iz: tnv.iz })))));
    return u;
  };
  this.marchingcubeinit = function(a) {
    for (var b = 0, h = d.length; b < h; b++)
      1 == a
        ? (d[b] &= -5)
        : 4 == a
        ? ((d[b] &= -3), d[b] & 4 && (d[b] |= 2), (d[b] &= -5))
        : 2 == a
        ? d[b] & 4 && d[b] & 2
          ? (d[b] &= -5)
          : d[b] & 4 && !(d[b] & 2) && (d[b] |= 2)
        : 3 == a && (d[b] &= -5);
  };
  this.marchingcube = function(a) {
    this.marchingcubeinit(a);
    A = [];
    I = [];
    $3Dmol.MarchingCube.march(d, A, I, { smooth: 1, nX: w, nY: B, nZ: s });
    a = B * s;
    for (var b = 0, p = A.length; b < p; b++)
      A[b].atomid = h[A[b].x * a + s * A[b].y + A[b].z];
    $3Dmol.MarchingCube.laplacianSmooth(1, A, I);
  };
};
$(document).ready(function() {
  void 0 !== $(".viewer_3Dmoljs")[0] && ($3Dmol.autoinit = !0);
  if ($3Dmol.autoinit) {
    $3Dmol.viewers = {};
    var a = 0;
    $(".viewer_3Dmoljs").each(function() {
      var b = $(this),
        c = null,
        m =
          "function" === typeof window[b.data("callback")]
            ? window[b.data("callback")]
            : null,
        s = null;
      b.data("pdb")
        ? ((c = "http://www.rcsb.org/pdb/files/" + b.data("pdb") + ".pdb"),
          (s = "pdb"))
        : b.data("cid")
        ? ((s = "sdf"),
          (c =
            "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" +
            b.data("cid") +
            "/SDF?record_type=3d"))
        : b.data("href") && (c = b.data("href"));
      var B = $3Dmol.CC.color(b.data("backgroundcolor")),
        w = { line: {} };
      b.data("style") && (w = $3Dmol.specStringToObject(b.data("style")));
      var z = {};
      b.data("select") && (z = $3Dmol.specStringToObject(b.data("select")));
      var d = [],
        x = [],
        h = [],
        t = b.data(),
        l = /style(.+)/,
        e = /surface(.*)/,
        G = /labelres(.*)/,
        f = [],
        C;
      for (C in t) t.hasOwnProperty(C) && f.push(C);
      f.sort();
      for (var u = 0; u < f.length; u++) {
        C = f[u];
        var q = l.exec(C);
        if (q) {
          var q = "select" + q[1],
            q = $3Dmol.specStringToObject(t[q]),
            g = $3Dmol.specStringToObject(t[C]);
          d.push([q, g]);
        }
        if ((q = e.exec(C)))
          (q = "select" + q[1]),
            (q = $3Dmol.specStringToObject(t[q])),
            (g = $3Dmol.specStringToObject(t[C])),
            x.push([q, g]);
        if ((q = G.exec(C)))
          (q = "select" + q[1]),
            (q = $3Dmol.specStringToObject(t[q])),
            (g = $3Dmol.specStringToObject(t[C])),
            h.push([q, g]);
      }
      var E = function(a) {
          a.setStyle(z, w);
          for (var b = 0; b < d.length; b++) {
            var e = d[b][0] || {},
              f = d[b][1] || { line: {} };
            a.setStyle(e, f);
          }
          for (b = 0; b < x.length; b++)
            (e = x[b][0] || {}),
              (f = x[b][1] || {}),
              a.addSurface($3Dmol.SurfaceType.VDW, f, e, e);
          for (b = 0; b < h.length; b++)
            (e = h[b][0] || {}), (f = h[b][1] || {}), a.addResLabels(e, f);
          a.zoomTo();
          a.render();
        },
        I = null;
      try {
        (I = $3Dmol.viewers[this.id || a++] = $3Dmol.createViewer(b, {
          defaultcolors: $3Dmol.rasmolElementColors
        })),
          I.setBackgroundColor(B);
      } catch (A) {
        window.location = "http://get.webgl.org";
      }
      c
        ? ((s = b.data("type") || b.data("datatype") || s) ||
            (s = c.substr(c.lastIndexOf(".") + 1)),
          $.get(
            c,
            function(a) {
              I.addModel(a, s);
              E(I);
              m && m(I);
            },
            "text"
          ))
        : (b.data("element") &&
            ((c = $("#" + b.data("element")).val() || ""),
            (s = b.data("type") || b.data("datatype")),
            s ||
              (console.log(
                "Warning: No type specified for embedded viewer with moldata from " +
                  b.data("element") +
                  "\n assuming type 'pdb'"
              ),
              (s = "pdb")),
            I.addModel(c, s)),
          E(I),
          m && m(I));
    });
  }
});
(function() {
  $3Dmol.elementColors.greenCarbon.C = 65280;
  $3Dmol.elementColors.cyanCarbon.C = 65535;
  $3Dmol.elementColors.magentaCarbon.C = 16711935;
  $3Dmol.elementColors.yellowCarbon.C = 16776960;
  $3Dmol.elementColors.whiteCarbon.C = 16777215;
  $3Dmol.elementColors.orangeCarbon.C = 16737792;
  $3Dmol.elementColors.purpleCarbon.C = 8388736;
  $3Dmol.elementColors.blueCarbon.C = 255;
});
$3Dmol.CC = {
  cache: { 0: new $3Dmol.Color(0) },
  color: function color_(b) {
    if (!b) return this.cache[0];
    if ("undefined" !== typeof this.cache[b]) return this.cache[b];
    if (b && b.constructor === Array) return b.map(color_, this);
    b = this.getHex(b);
    if ("number" === typeof b) {
      var c = new $3Dmol.Color(b);
      return (this.cache[b] = c);
    }
    return b;
  },
  colorTab: {
    white: 16777215,
    silver: 12632256,
    gray: 8421504,
    grey: 8421504,
    black: 0,
    red: 16711680,
    maroon: 8388608,
    yellow: 16776960,
    orange: 16737792,
    olive: 8421376,
    lime: 65280,
    green: 32768,
    aqua: 65535,
    cyan: 65535,
    teal: 32896,
    blue: 255,
    navy: 128,
    fuchsia: 16711935,
    magenta: 16711935,
    purple: 8388736
  },
  getHex: function(a) {
    return isNaN(parseInt(a))
      ? "string" === typeof a
        ? this.colorTab[a.trim().toLowerCase()] || 0
        : a
      : parseInt(a);
  }
};
$3Dmol.CC = $3Dmol.CC;
$3Dmol.CC.color = $3Dmol.CC.color;
$3Dmol.getColorFromStyle = function(a, b) {
  var c = a.color;
  "undefined" != typeof b.color && "spectrum" != b.color && (c = b.color);
  if ("undefined" != typeof b.colorscheme)
    if ("undefined" != typeof $3Dmol.elementColors[b.colorscheme]) {
      var m = $3Dmol.elementColors[b.colorscheme];
      "undefined" != typeof m[a.elem] && (c = m[a.elem]);
    } else if ("undefined" != typeof b.colorscheme[a.elem])
      c = b.colorscheme[a.elem];
    else if (
      "undefined" != typeof b.colorscheme.prop &&
      "undefined" != typeof b.colorscheme.gradient
    ) {
      var s = b.colorscheme.prop,
        m = b.colorscheme.gradient,
        B = m.range() || [-1, 1],
        s = $3Dmol.getAtomProperty(a, s);
      null != s && (c = m.valueToHex(s, B));
    }
  return $3Dmol.CC.color(c);
};
$3Dmol.elementColors = $3Dmol.elementColors || {};
$3Dmol.elementColors.defaultColor = 16716947;
$3Dmol.elementColors.Jmol = {
  H: 16777215,
  He: 14286847,
  HE: 14286847,
  Li: 13402367,
  LI: 13402367,
  B: 16758197,
  C: 9474192,
  N: 3166456,
  O: 16715021,
  F: 9494608,
  Na: 11230450,
  NA: 11230450,
  Mg: 9109248,
  MG: 9109248,
  Al: 12560038,
  AL: 12560038,
  Si: 1578e4,
  SI: 1578e4,
  P: 16744448,
  S: 16777008,
  Cl: 2093087,
  CL: 2093087,
  Ca: 4062976,
  CA: 4062976,
  Ti: 12567239,
  TI: 12567239,
  Cr: 9083335,
  CR: 9083335,
  Mn: 10255047,
  MN: 10255047,
  Fe: 14706227,
  FE: 14706227,
  Ni: 5296208,
  NI: 5296208,
  Cu: 13140019,
  CU: 13140019,
  Zn: 8224944,
  ZN: 8224944,
  Br: 10889513,
  BR: 10889513,
  Ag: 12632256,
  AG: 12632256,
  I: 9699476,
  Ba: 51456,
  BA: 51456,
  Au: 16765219,
  AU: 16765219
};
$3Dmol.elementColors.rasmol = {
  H: 16777215,
  He: 16761035,
  HE: 16761035,
  Li: 11674146,
  LI: 11674146,
  B: 65280,
  C: 13158600,
  N: 9408511,
  O: 15728640,
  F: 14329120,
  Na: 255,
  NA: 255,
  Mg: 2263842,
  MG: 2263842,
  Al: 8421520,
  AL: 8421520,
  Si: 14329120,
  SI: 14329120,
  P: 16753920,
  S: 16762930,
  Cl: 65280,
  CL: 65280,
  Ca: 8421520,
  CA: 8421520,
  Ti: 8421520,
  TI: 8421520,
  Cr: 8421520,
  CR: 8421520,
  Mn: 8421520,
  MN: 8421520,
  Fe: 16753920,
  FE: 16753920,
  Ni: 10824234,
  NI: 10824234,
  Cu: 10824234,
  CU: 10824234,
  Zn: 10824234,
  ZN: 10824234,
  Br: 10824234,
  BR: 10824234,
  Ag: 8421520,
  AG: 8421520,
  I: 10494192,
  Ba: 16753920,
  BA: 16753920,
  Au: 14329120,
  AU: 14329120
};
$3Dmol.elementColors.defaultColors = $3Dmol.elementColors.rasmol;
$3Dmol.elementColors.greenCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.greenCarbon.C = 65280;
$3Dmol.elementColors.cyanCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.cyanCarbon.C = 65535;
$3Dmol.elementColors.magentaCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.magentaCarbon.C = 16711935;
$3Dmol.elementColors.yellowCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.yellowCarbon.C = 16776960;
$3Dmol.elementColors.whiteCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.whiteCarbon.C = 16777215;
$3Dmol.elementColors.orangeCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.orangeCarbon.C = 16737792;
$3Dmol.elementColors.purpleCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.purpleCarbon.C = 8388736;
$3Dmol.elementColors.blueCarbon = $.extend(
  {},
  $3Dmol.elementColors.defaultColors
);
$3Dmol.elementColors.blueCarbon.C = 255;
$3Dmol = $3Dmol || {};
$3Dmol.drawCartoon = (function() {
  var a = function(a, b) {
      var d = [],
        c = a,
        c = [];
      c.push(a[0]);
      var h, t, l, e, G, f;
      h = 1;
      for (t = a.length - 1; h < t; h++)
        (e = a[h]),
          (G = a[h + 1]),
          e.smoothen
            ? c.push(
                new $3Dmol.Vector3(
                  (e.x + G.x) / 2,
                  (e.y + G.y) / 2,
                  (e.z + G.z) / 2
                )
              )
            : c.push(e);
      c.push(a[a.length - 1]);
      h = -1;
      for (t = c.length; h <= t - 3; h++)
        if (
          ((l = c[-1 === h ? 0 : h]),
          (e = c[h + 1]),
          (G = c[h + 2]),
          (f = c[h === t - 3 ? t - 1 : h + 3]),
          (l = new $3Dmol.Vector3().subVectors(G, l).multiplyScalar(0.5)),
          (f = new $3Dmol.Vector3().subVectors(f, e).multiplyScalar(0.5)),
          !G.skip)
        )
          for (var C = 0; C < b; C++) {
            var u = (1 / b) * C,
              u = new $3Dmol.Vector3(
                e.x +
                  u * l.x +
                  u * u * (-3 * e.x + 3 * G.x - 2 * l.x - f.x) +
                  u * u * u * (2 * e.x - 2 * G.x + l.x + f.x),
                e.y +
                  u * l.y +
                  u * u * (-3 * e.y + 3 * G.y - 2 * l.y - f.y) +
                  u * u * u * (2 * e.y - 2 * G.y + l.y + f.y),
                e.z +
                  u * l.z +
                  u * u * (-3 * e.z + 3 * G.z - 2 * l.z - f.z) +
                  u * u * u * (2 * e.z - 2 * G.z + l.z + f.z)
              ),
              q = Math.floor((d.length + 2) / b);
            void 0 !== a[q] && void 0 !== a[q].atom && (u.atom = a[q].atom);
            d.push(u);
          }
      d.push(c[c.length - 1]);
      return d;
    },
    b = function(a, b, d, c, h, t) {
      h = new $3Dmol.Geometry(!0);
      for (var l, e, G, f, C = 0, u = b.length; C < u; C++) {
        f = Math.round((C * (c.length - 1)) / u);
        G = $3Dmol.CC.color(c[f]);
        geoGroup = h.updateGeoGroup(2);
        var q = geoGroup.vertexArray,
          g = geoGroup.colorArray;
        f = geoGroup.faceArray;
        l = geoGroup.vertices;
        e = 3 * l;
        q[e] = b[C].x;
        q[e + 1] = b[C].y;
        q[e + 2] = b[C].z;
        q[e + 3] = d[C].x;
        q[e + 4] = d[C].y;
        q[e + 5] = d[C].z;
        for (q = 0; 6 > q; ++q)
          (g[e + 3 * q] = G.r),
            (g[e + 1 + 3 * q] = G.g),
            (g[e + 2 + 3 * q] = G.b);
        0 < C &&
          ((l = [l, l + 1, l - 1, l - 2]),
          (e = geoGroup.faceidx),
          (f[e] = l[0]),
          (f[e + 1] = l[1]),
          (f[e + 2] = l[3]),
          (f[e + 3] = l[1]),
          (f[e + 4] = l[2]),
          (f[e + 5] = l[3]),
          (geoGroup.faceidx += 6));
        geoGroup.vertices += 2;
      }
      h.initTypedArrays();
      h.setUpNormals();
      b = new $3Dmol.MeshDoubleLambertMaterial();
      "number" === typeof t &&
        0 <= t &&
        1 > t &&
        ((b.transparent = !0), (b.opacity = t));
      b.vertexColors = $3Dmol.FaceColors;
      t = new $3Dmol.Mesh(h, b);
      a.add(t);
    },
    c = function(b, c, d, x, h) {
      0 !== c.length &&
        ((h = void 0 === h ? 5 : h),
        (x = new $3Dmol.Geometry()),
        a(c, h),
        (c = new $3Dmol.LineBasicMaterial({ linewidth: d })),
        (c.vertexColors = !0),
        (c = new $3Dmol.Line(x, c)),
        (c.type = $3Dmol.LineStrip),
        b.add(c));
    },
    m = function(c, z, d, x, h, t, l) {
      (l && "default" !== l) || (l = "rectangle");
      if ("edged" === l) {
        if (!(2 > z.length)) {
          var e, G;
          e = z[0];
          G = z[z.length - 1];
          z = x || axisDIV;
          e = a(e, z);
          G = a(G, z);
          if (h) {
            z = new $3Dmol.Geometry(!0);
            var f = [],
              C,
              u,
              q,
              g,
              E,
              m = [
                [0, 2, -6, -8],
                [-4, -2, 6, 4],
                [7, -1, -5, 3],
                [-3, 5, 1, -7]
              ],
              A,
              D,
              p,
              y,
              s,
              B,
              J,
              H;
            s = 0;
            for (B = e.length; s < B; s++) {
              D = Math.round((s * (d.length - 1)) / B);
              D = $3Dmol.CC.color(d[D]);
              f.push((u = e[s]));
              f.push(u);
              f.push((q = G[s]));
              f.push(q);
              s < B - 1 &&
                ((C = e[s + 1].clone().sub(e[s])),
                (C = G[s]
                  .clone()
                  .sub(e[s])
                  .cross(C)
                  .normalize()
                  .multiplyScalar(h)));
              f.push((g = e[s].clone().add(C)));
              f.push(g);
              f.push((E = G[s].clone().add(C)));
              f.push(E);
              void 0 !== u.atom && (p = u.atom);
              l = z.updateGeoGroup(8);
              J = l.vertexArray;
              H = l.colorArray;
              var K = l.faceArray;
              x = l.vertices;
              A = 3 * x;
              J[A] = u.x;
              J[A + 1] = u.y;
              J[A + 2] = u.z;
              J[A + 3] = u.x;
              J[A + 4] = u.y;
              J[A + 5] = u.z;
              J[A + 6] = q.x;
              J[A + 7] = q.y;
              J[A + 8] = q.z;
              J[A + 9] = q.x;
              J[A + 10] = q.y;
              J[A + 11] = q.z;
              J[A + 12] = g.x;
              J[A + 13] = g.y;
              J[A + 14] = g.z;
              J[A + 15] = g.x;
              J[A + 16] = g.y;
              J[A + 17] = g.z;
              J[A + 18] = E.x;
              J[A + 19] = E.y;
              J[A + 20] = E.z;
              J[A + 21] = E.x;
              J[A + 22] = E.y;
              J[A + 23] = E.z;
              for (J = 0; 8 > J; ++J)
                (H[A + 3 * J] = D.r),
                  (H[A + 1 + 3 * J] = D.g),
                  (H[A + 2 + 3 * J] = D.b);
              if (0 < s)
                for (
                  A = void 0 !== y && void 0 !== p && y.serial !== p.serial,
                    J = 0;
                  4 > J;
                  J++
                )
                  if (
                    ((H = [x + m[J][0], x + m[J][1], x + m[J][2], x + m[J][3]]),
                    (q = l.faceidx),
                    (K[q] = H[0]),
                    (K[q + 1] = H[1]),
                    (K[q + 2] = H[3]),
                    (K[q + 3] = H[1]),
                    (K[q + 4] = H[2]),
                    (K[q + 5] = H[3]),
                    (l.faceidx += 6),
                    p.clickable || y.clickable)
                  ) {
                    E = f[H[3]].clone();
                    q = f[H[0]].clone();
                    var M = f[H[2]].clone();
                    g = f[H[1]].clone();
                    E.atom = f[H[3]].atom || null;
                    M.atom = f[H[2]].atom || null;
                    q.atom = f[H[0]].atom || null;
                    g.atom = f[H[1]].atom || null;
                    if (A) {
                      var P = E.clone()
                          .add(q)
                          .multiplyScalar(0.5),
                        U = M.clone()
                          .add(g)
                          .multiplyScalar(0.5),
                        N = E.clone()
                          .add(g)
                          .multiplyScalar(0.5);
                      0 === J % 2
                        ? (y.clickable &&
                            ((H = new $3Dmol.Triangle(P, N, E)),
                            (u = new $3Dmol.Triangle(U, M, N)),
                            (E = new $3Dmol.Triangle(N, M, E)),
                            y.intersectionShape.triangle.push(H),
                            y.intersectionShape.triangle.push(u),
                            y.intersectionShape.triangle.push(E)),
                          p.clickable &&
                            ((H = new $3Dmol.Triangle(q, g, N)),
                            (u = new $3Dmol.Triangle(g, U, N)),
                            (E = new $3Dmol.Triangle(q, N, P)),
                            p.intersectionShape.triangle.push(H),
                            p.intersectionShape.triangle.push(u),
                            p.intersectionShape.triangle.push(E)))
                        : (p.clickable &&
                            ((H = new $3Dmol.Triangle(P, N, E)),
                            (u = new $3Dmol.Triangle(U, M, N)),
                            (E = new $3Dmol.Triangle(N, M, E)),
                            p.intersectionShape.triangle.push(H),
                            p.intersectionShape.triangle.push(u),
                            p.intersectionShape.triangle.push(E)),
                          y.clickable &&
                            ((H = new $3Dmol.Triangle(q, g, N)),
                            (u = new $3Dmol.Triangle(g, U, N)),
                            (E = new $3Dmol.Triangle(q, N, P)),
                            y.intersectionShape.triangle.push(H),
                            y.intersectionShape.triangle.push(u),
                            y.intersectionShape.triangle.push(E)));
                    } else
                      p.clickable &&
                        ((H = new $3Dmol.Triangle(q, g, E)),
                        (u = new $3Dmol.Triangle(g, M, E)),
                        p.intersectionShape.triangle.push(H),
                        p.intersectionShape.triangle.push(u));
                  }
              l.vertices += 8;
              y = p;
            }
            d = f.length - 8;
            l = z.updateGeoGroup(8);
            J = l.vertexArray;
            H = l.colorArray;
            K = l.faceArray;
            x = l.vertices;
            A = 3 * x;
            q = l.faceidx;
            for (s = 0; 4 > s; s++)
              f.push(f[2 * s]),
                f.push(f[d + 2 * s]),
                (h = f[2 * s]),
                (p = f[d + 2 * s]),
                (J[A + 6 * s] = h.x),
                (J[A + 1 + 6 * s] = h.y),
                (J[A + 2 + 6 * s] = h.z),
                (J[A + 3 + 6 * s] = p.x),
                (J[A + 4 + 6 * s] = p.y),
                (J[A + 5 + 6 * s] = p.z),
                (H[A + 6 * s] = D.r),
                (H[A + 1 + 6 * s] = D.g),
                (H[A + 2 + 6 * s] = D.b),
                (H[A + 3 + 6 * s] = D.r),
                (H[A + 4 + 6 * s] = D.g),
                (H[A + 5 + 6 * s] = D.b);
            H = [x, x + 2, x + 6, x + 4];
            u = [x + 1, x + 5, x + 7, x + 3];
            K[q] = H[0];
            K[q + 1] = H[1];
            K[q + 2] = H[3];
            K[q + 3] = H[1];
            K[q + 4] = H[2];
            K[q + 5] = H[3];
            K[q + 6] = u[0];
            K[q + 7] = u[1];
            K[q + 8] = u[3];
            K[q + 9] = u[1];
            K[q + 10] = u[2];
            K[q + 11] = u[3];
            l.faceidx += 12;
            l.vertices += 8;
            z.initTypedArrays();
            z.setUpNormals();
            d = new $3Dmol.MeshDoubleLambertMaterial();
            d.vertexColors = $3Dmol.FaceColors;
            "number" === typeof t &&
              0 <= t &&
              1 > t &&
              ((d.transparent = !0), (d.opacity = t));
            t = new $3Dmol.Mesh(z, d);
            c.add(t);
          } else b(c, e, G, d, z, t);
        }
      } else if ("rectangle" === l || "oval" === l || "parabola" === l)
        if (((D = l), (p = z.length), !(2 > p || 2 > z[0].length))) {
          x = x || axisDIV;
          for (y = 0; y < p; y++) z[y] = a(z[y], x);
          C = z[0].length;
          if (h) {
            x = new $3Dmol.Geometry(!0);
            l = [];
            K = [];
            m = [];
            for (A = 0; A < p; A++)
              l.push(
                0.25 + (1.5 * Math.sqrt((p - 1) * A - Math.pow(A, 2))) / (p - 1)
              ),
                K.push(0.5),
                m.push(2 * (Math.pow(A / p, 2) - A / p) + 0.6);
            B = [];
            for (A = 0; A < 2 * p - 1; A++)
              B[A] = [A, A + 1, A + 1 - 2 * p, A - 2 * p];
            B[2 * p - 1] = [A, A + 1 - 2 * p, A + 1 - 4 * p, A - 2 * p];
            J = x.updateGeoGroup(2 * p * C);
            for (y = 0; y < C; y++) {
              A = Math.round((y * (d.length - 1)) / C);
              q = $3Dmol.CC.color(d[A]);
              H = f;
              u = s;
              f = [];
              s = [];
              g = [];
              void 0 !== z[0][y].atom &&
                ((G = z[0][y].atom),
                "oval" === D
                  ? (e = l)
                  : "rectangle" === D
                  ? (e = K)
                  : "parabola" === D && (e = m));
              e || (e = K);
              for (A = 0; A < p; A++)
                (E =
                  y < C - 1
                    ? z[A][y + 1].clone().sub(z[A][y])
                    : z[A][y - 1]
                        .clone()
                        .sub(z[A][y])
                        .negate()),
                  (M =
                    A < p - 1
                      ? z[A + 1][y].clone().sub(z[A][y])
                      : z[A - 1][y]
                          .clone()
                          .sub(z[A][y])
                          .negate()),
                  (g[A] = M.cross(E)
                    .normalize()
                    .multiplyScalar(h * e[A]));
              for (A = 0; A < p; A++)
                f[A] = z[A][y].clone().add(g[A].clone().negate());
              for (A = 0; A < p; A++) s[A] = z[A][y].clone().add(g[A]);
              P = J.vertexArray;
              U = J.colorArray;
              E = J.faceArray;
              g = J.vertices;
              M = 3 * g;
              for (A = 0; A < p; A++)
                (P[M + 3 * A + 0] = f[A].x),
                  (P[M + 3 * A + 1] = f[A].y),
                  (P[M + 3 * A + 2] = f[A].z);
              for (A = 0; A < p; A++)
                (P[M + 3 * A + 0 + 3 * p] = s[p - 1 - A].x),
                  (P[M + 3 * A + 1 + 3 * p] = s[p - 1 - A].y),
                  (P[M + 3 * A + 2 + 3 * p] = s[p - 1 - A].z);
              for (A = 0; A < 2 * p; ++A)
                (U[M + 3 * A + 0] = q.r),
                  (U[M + 3 * A + 1] = q.g),
                  (U[M + 3 * A + 2] = q.b);
              if (0 < y) {
                for (A = 0; A < 2 * p; A++)
                  (M = [g + B[A][0], g + B[A][1], g + B[A][2], g + B[A][3]]),
                    (q = J.faceidx),
                    (E[q] = M[0]),
                    (E[q + 1] = M[1]),
                    (E[q + 2] = M[3]),
                    (E[q + 3] = M[1]),
                    (E[q + 4] = M[2]),
                    (E[q + 5] = M[3]),
                    (J.faceidx += 6);
                if (G.clickable)
                  for (A in ((q = []),
                  q.push(new $3Dmol.Triangle(H[0], f[0], f[p - 1])),
                  q.push(new $3Dmol.Triangle(H[0], f[p - 1], H[p - 1])),
                  q.push(new $3Dmol.Triangle(H[p - 1], f[p - 1], s[p - 1])),
                  q.push(new $3Dmol.Triangle(H[p - 1], s[p - 1], u[p - 1])),
                  q.push(new $3Dmol.Triangle(s[0], u[0], u[p - 1])),
                  q.push(new $3Dmol.Triangle(s[p - 1], s[0], u[p - 1])),
                  q.push(new $3Dmol.Triangle(f[0], H[0], u[0])),
                  q.push(new $3Dmol.Triangle(s[0], f[0], u[0])),
                  q))
                    G.intersectionShape.triangle.push(q[A]);
              }
              J.vertices += 2 * p;
            }
            E = J.faceArray;
            g = J.vertices;
            for (y = 0; y < p - 1; y++)
              (M = [y, y + 1, 2 * p - 2 - y, 2 * p - 1 - y]),
                (q = J.faceidx),
                (E[q] = M[0]),
                (E[q + 1] = M[1]),
                (E[q + 2] = M[3]),
                (E[q + 3] = M[1]),
                (E[q + 4] = M[2]),
                (E[q + 5] = M[3]),
                (J.faceidx += 6);
            for (y = 0; y < p - 1; y++)
              (M = [g - 1 - y, g - 2 - y, g - 2 * p + y + 1, g - 2 * p + y]),
                (q = J.faceidx),
                (E[q] = M[0]),
                (E[q + 1] = M[1]),
                (E[q + 2] = M[3]),
                (E[q + 3] = M[1]),
                (E[q + 4] = M[2]),
                (E[q + 5] = M[3]),
                (J.faceidx += 6);
            x.initTypedArrays();
            x.setUpNormals();
            d = new $3Dmol.MeshDoubleLambertMaterial();
            d.vertexColors = $3Dmol.FaceColors;
            "number" === typeof t &&
              0 <= t &&
              1 > t &&
              ((d.transparent = !0), (d.opacity = t));
            t = new $3Dmol.Mesh(x, d);
            c.add(t);
          } else b(c, z[0], z[p - 1], d, x, t);
        }
    },
    s = function(a, b) {
      return (
        a &&
        b &&
        a.chain === b.chain &&
        a.reschain === b.reschain &&
        (a.resi === b.resi || a.resi === b.resi - 1)
      );
    },
    B = function(a, b, d, c, h, t, l, e, G) {
      var f,
        C = h.sub(c);
      C.normalize();
      e = (e =
        e[
          parseInt(G) +
            {
              ALA: 5,
              ARG: 11,
              ASN: 8,
              ASP: 8,
              CYS: 6,
              GLN: 9,
              GLU: 9,
              GLY: 4,
              HIS: 10,
              ILE: 8,
              LEU: 8,
              LYS: 9,
              MET: 8,
              PHE: 11,
              PRO: 7,
              SER: 6,
              THR: 7,
              TRP: 14,
              TYR: 12,
              VAL: 7
            }[l.resn]
        ])
        ? new $3Dmol.Vector3(e.x, e.y, e.z)
        : new $3Dmol.Vector3(0, 0, 0);
      e.sub(c);
      "arrow start" === l.ss &&
        ((h = e
          .clone()
          .multiplyScalar(0.3)
          .cross(h)),
        c.add(h),
        (h = e
          .clone()
          .cross(C)
          .normalize()),
        C.rotateAboutVector(h, 0.43));
      l.style.cartoon.ribbon
        ? (h = l.style.cartoon.thickness || 0.4)
        : l.style.cartoon.width
        ? (h = l.style.cartoon.width)
        : "c" === l.ss
        ? (h = "P" === l.atom ? 0.8 : 0.5)
        : "arrow start" === l.ss
        ? ((h = 1.3), (f = !0))
        : (h =
            "arrow end" === l.ss
              ? 0.5
              : ("h" === l.ss && l.style.cartoon.tubes) || "tube start" === l.ss
              ? 0.5
              : 1.3);
      null != t && 0 > C.dot(t) && C.negate();
      C.multiplyScalar(h);
      for (t = 0; t < b; t++)
        (h = -1 + (2 * t) / (b - 1)),
          (h = new $3Dmol.Vector3(c.x + h * C.x, c.y + h * C.y, c.z + h * C.z)),
          (h.atom = l),
          d && "s" === l.ss && (h.smoothen = !0),
          a[t].push(h);
      if (f)
        for (C.multiplyScalar(2), t = 0; t < b; t++)
          (h = -1 + (2 * t) / (b - 1)),
            (h = new $3Dmol.Vector3(
              c.x + h * C.x,
              c.y + h * C.y,
              c.z + h * C.z
            )),
            (h.atom = l),
            (h.smoothen = !1),
            (h.skip = !0),
            a[t].push(h);
      b = parseFloat(l.style.cartoon.opacity) || 1;
      a.opacity
        ? a.opacity != b &&
          (console.log("Warning: a cartoon-style chain's opacity is ambiguous"),
          (a.opacity = 1))
        : (a.opacity = b);
      b = l.style.cartoon.style || "default";
      a.style
        ? a.style != b &&
          (console.log("Warning: a cartoon chain's strand-style is ambiguous"),
          (a.style = "default"))
        : (a.style = b);
      if ("arrow start" === l.ss || "arrow end" === l.ss) l.ss = "s";
      return f;
    };
  return function(a, b, d, x) {
    x = parseInt(5 * parseFloat(x)) || 5;
    var h = (fill = !0),
      t = (doNotSmoothen = !1),
      l = (num = x);
    x = div = x;
    l = l || 5;
    x = x || 5;
    var e = "CA O P OP2 O5' O3' C5' C2' N1 N3".split(" "),
      G = ["DA", "DG", "A", "G"],
      f = ["DT", "DC", "U", "C"],
      C = G.concat(f),
      u,
      q,
      g,
      E,
      I,
      A,
      D,
      p,
      y,
      L,
      O,
      J,
      H,
      K,
      M,
      P,
      U,
      N = null,
      S = [],
      Q = [];
    for (p = 0; p < l; p++) Q[p] = [];
    var T = (y = !1);
    p = 0;
    for (p in b)
      if (((E = b[p]), "C" === E.elem && "CA" === E.atom)) {
        var R = s(g, E);
        R && "s" === E.ss
          ? (y = !0)
          : y &&
            (g &&
              q &&
              g.style.cartoon.arrows &&
              q.style.cartoon.arrows &&
              ((g.ss = "arrow end"), (q.ss = "arrow start")),
            (y = !1));
        R && "h" === g.ss
          ? (!T && E.style.cartoon.tubes && (E.ss = "tube start"), (T = !0))
          : T &&
            "tube start" !== g.ss &&
            (q && q.style.cartoon.tubes && (q.ss = "tube end"), (T = !1));
        q = g;
        g = E;
      }
    g = void 0;
    for (p in b)
      if (
        ((E = b[p]), void 0 !== E && -1 !== $.inArray(E.atom, e) && !E.hetflag)
      )
        if (
          ((y = -1 != $.inArray(E.resn.trim(), C)),
          (q = E.style.cartoon),
          "trace" === q.style)
        ) {
          if (
            (N || (N = new $3Dmol.Geometry(!0)),
            ("C" === E.elem && "CA" === E.atom) || (y && "P" === E.atom))
          )
            (A =
              d && "spectrum" === q.color
                ? d.valueToHex(E.resi, d.range())
                : $3Dmol.getColorFromStyle(E, q).getHex()),
              S.push(A),
              (D = $.isNumeric(q.thickness) ? q.thickness : 0.4),
              g &&
                g.chain === E.chain &&
                g.resi + 1 === E.resi &&
                (A == I
                  ? ((I = $3Dmol.CC.color(A)),
                    $3Dmol.GLDraw.drawCylinder(N, g, E, D, I, 2, 2))
                  : ((q = new $3Dmol.Vector3()
                      .addVectors(g, E)
                      .multiplyScalar(0.5)),
                    (I = $3Dmol.CC.color(I)),
                    (y = $3Dmol.CC.color(A)),
                    $3Dmol.GLDraw.drawCylinder(N, g, q, D, I, 2, 0),
                    $3Dmol.GLDraw.drawCylinder(N, q, E, D, y, 0, 2))),
              g &&
              N &&
              ((g.style.cartoon && "trace" != g.style.cartoon.style) ||
                g.chain != E.chain)
                ? ((g = new $3Dmol.MeshDoubleLambertMaterial()),
                  (g.vertexColors = $3Dmol.FaceColors),
                  "number" === typeof N.opacity &&
                    0 <= N.opacity &&
                    1 > N.opacity &&
                    ((g.transparent = !0),
                    (g.opacity = N.opacity),
                    delete N.opacity),
                  (N = new $3Dmol.Mesh(N, g)),
                  a.add(N),
                  (N = null))
                : g &&
                  (N.opacity && g.style.cartoon.opacity
                    ? N.opacity != g.style.cartoon.opacity &&
                      (console.log(
                        "Warning: a trace-style chain's opacity is ambiguous"
                      ),
                      (N.opacity = 1))
                    : (N.opacity = parseFloat(g.style.cartoon.opacity) || 1)),
              (g = E),
              (I = A);
        } else {
          u || (u = new $3Dmol.Geometry(!0));
          if (
            (E && "C" === E.elem && "CA" === E.atom) ||
            (y && ("P" === E.atom || "O5'" === E.atom))
          ) {
            if (U)
              if ("tube end" === E.ss)
                (U = !1),
                  (y = new $3Dmol.Vector3(E.x, E.y, E.z)),
                  $3Dmol.GLDraw.drawCylinder(
                    u,
                    P,
                    y,
                    2,
                    $3Dmol.CC.color(I),
                    1,
                    1
                  ),
                  (E.ss = "h");
              else continue;
            if (
              g &&
              (!s(g, E) ||
                g.style.cartoon.style !== E.style.cartoon.style ||
                "tube start" === g.ss)
            ) {
              "tube start" === g.ss &&
                ((U = !0),
                (P = new $3Dmol.Vector3(g.x, g.y, g.z)),
                (g.ss = "h"));
              M &&
                ((y = H
                  ? new $3Dmol.Vector3().addVectors(g, H).multiplyScalar(0.5)
                  : new $3Dmol.Vector3(g.x, g.y, g.z)),
                $3Dmol.GLDraw.drawCylinder(
                  u,
                  y,
                  M,
                  0.4,
                  $3Dmol.CC.color(M.color),
                  0,
                  2
                ),
                (y = B(Q, l, !t, H, K, J, g, b, p)),
                S.push(A),
                y && S.push(A),
                (M = null));
              for (p = 0; !D && p < l; p++) c(a, Q[p], 1, S, x, Q.opacity);
              h && 0 < Q[0].length && m(a, Q, S, x, D, Q.opacity, Q.style);
              null != u &&
                0 < u.vertices &&
                ((p = new $3Dmol.MeshDoubleLambertMaterial()),
                (p.vertexColors = $3Dmol.FaceColors),
                "number" === typeof Q.opacity &&
                  0 <= Q.opacity &&
                  1 > Q.opacity &&
                  ((p.transparent = !0), (p.opacity = Q.opacity)),
                (u = new $3Dmol.Mesh(u, p)),
                a.add(u),
                (u = null));
              Q = [];
              for (p = 0; p < l; p++) Q[p] = [];
              S = [];
            }
            if (void 0 === g || g.resi != E.resi)
              M &&
                ((y = new $3Dmol.Vector3()
                  .addVectors(g, E)
                  .multiplyScalar(0.5)),
                (A = y
                  .clone()
                  .sub(M)
                  .multiplyScalar(0.02)),
                y.add(A),
                $3Dmol.GLDraw.drawCylinder(
                  u,
                  y,
                  M,
                  0.4,
                  $3Dmol.CC.color(M.color),
                  0,
                  2
                ),
                (M = null)),
                (A =
                  d && "spectrum" === q.color
                    ? d.valueToHex(E.resi, d.range())
                    : $3Dmol.getColorFromStyle(E, q).getHex()),
                S.push(A),
                (D = $.isNumeric(q.thickness) ? q.thickness : 0.4),
                (g = E),
                (L = new $3Dmol.Vector3(g.x, g.y, g.z)),
                (L.resi = g.resi),
                (I = A);
            !0 !== E.clickable ||
              (void 0 !== E.intersectionShape &&
                void 0 !== E.intersectionShape.triangle) ||
              (E.intersectionShape = {
                sphere: null,
                cylinder: [],
                line: [],
                triangle: []
              });
          } else if (
            (g && "C" === g.elem && "CA" === g.atom && "O" === E.atom) ||
            (y && "P" === g.atom && "OP2" === E.atom) ||
            (y && "O5'" === g.atom && "C5'" === E.atom)
          )
            (O = new $3Dmol.Vector3(E.x, E.y, E.z)),
              (O.resi = E.resi),
              "OP2" === E.atom && (K = new $3Dmol.Vector3(E.x, E.y, E.z));
          else if (y && "O3'" === E.atom) H = new $3Dmol.Vector3(E.x, E.y, E.z);
          else if (
            ("N1" === E.atom && -1 != $.inArray(E.resn.trim(), G)) ||
            ("N3" === E.atom && -1 != $.inArray(E.resn.trim(), f))
          )
            (M = new $3Dmol.Vector3(E.x, E.y, E.z)),
              (M.color = $3Dmol.getColorFromStyle(E, q).getHex());
          O &&
            L &&
            O.resi === L.resi &&
            ((y = B(Q, l, !t, L, O, J, g, b, p)),
            (J = O),
            (O = L = null),
            S.push(A),
            y && S.push(A));
        }
    M &&
      ((y = H
        ? new $3Dmol.Vector3().addVectors(g, H).multiplyScalar(0.5)
        : new $3Dmol.Vector3(g.x, g.y, g.z)),
      $3Dmol.GLDraw.drawCylinder(u, y, M, 0.4, $3Dmol.CC.color(M.color), 0, 2),
      (y = B(Q, l, !t, H, K, J, g, b, p)),
      S.push(A),
      y && S.push(A));
    for (p = 0; !D && p < l; p++) c(a, Q[p], 1, S, x, Q.opacity);
    h && 0 < Q[0].length && m(a, Q, S, x, D, Q.opacity, Q.style);
    null != u &&
      0 < u.vertices &&
      ((p = new $3Dmol.MeshDoubleLambertMaterial()),
      (p.vertexColors = $3Dmol.FaceColors),
      "number" === typeof Q.opacity &&
        0 <= Q.opacity &&
        1 > Q.opacity &&
        ((p.transparent = !0), (p.opacity = Q.opacity)),
      (u = new $3Dmol.Mesh(u, p)),
      a.add(u));
    null != N &&
      0 < N.vertices &&
      ((g = new $3Dmol.MeshDoubleLambertMaterial()),
      (g.vertexColors = $3Dmol.FaceColors),
      "number" === typeof N.opacity &&
        0 <= N.opacity &&
        1 > N.opacity &&
        ((g.transparent = !0), (g.opacity = N.opacity), delete N.opacity),
      (N = new $3Dmol.Mesh(N, g)),
      a.add(N));
  };
})();
$3Dmol = $3Dmol || {};
$3Dmol.GLDraw = (function() {
  var a = {},
    b = (function() {
      var a = new $3Dmol.Vector3();
      return function(b) {
        a.set(b[0], b[1], b[2]);
        var d = a.x,
          c = a.y,
          h = a.z,
          t = Math.sqrt(d * d + c * c);
        1e-4 > t ? ((b = 0), (t = 1)) : ((b = -d / t), (t = c / t));
        c = -b * d + t * c;
        d = Math.sqrt(c * c + h * h);
        1e-4 > d ? ((h = 0), (c = 1)) : ((h /= d), (c /= d));
        d = new Float32Array(9);
        d[0] = t;
        d[1] = b;
        d[2] = 0;
        d[3] = -b * c;
        d[4] = t * c;
        d[5] = h;
        d[6] = b * h;
        d[7] = -t * h;
        d[8] = c;
        return d;
      };
    })(),
    c = (function() {
      var a = [],
        b = Math.pow(2, 4),
        d,
        c = Math.pow(2, 2),
        h = b / c,
        t;
      a[0] = new $3Dmol.Vector3(-1, 0, 0);
      a[h] = new $3Dmol.Vector3(0, 0, 1);
      a[2 * h] = new $3Dmol.Vector3(1, 0, 0);
      a[3 * h] = new $3Dmol.Vector3(0, 0, -1);
      for (d = 3; 4 >= d; d++) {
        c = Math.pow(2, d - 1);
        h = b / c;
        for (t = 0; t < c - 1; t++)
          a[h / 2 + t * h] = a[t * h]
            .clone()
            .add(a[(t + 1) * h])
            .normalize();
        t = c - 1;
        a[h / 2 + t * h] = a[t * h]
          .clone()
          .add(a[0])
          .normalize();
      }
      return a;
    })(),
    m = {
      cache: { false: {}, true: {} },
      getVerticesForRadius: function(a, b) {
        if (void 0 !== this.cache[b][a]) return this.cache[b][a];
        new $3Dmol.Vector3(0, 1, 0);
        for (var d = c.length, x = [], h = [], t, l = 0; l < d; l++)
          x.push(c[l].clone().multiplyScalar(a)),
            x.push(c[l].clone().multiplyScalar(a)),
            (t = c[l].clone().normalize()),
            h.push(t),
            h.push(t);
        var l = [],
          e = 2 * Math.PI,
          G = Math.PI,
          f,
          C,
          u = !1,
          q = !1;
        for (C = 0; 10 >= C; C++) {
          var u = 0 === C || 10 === C ? !0 : !1,
            q = 5 === C ? !0 : !1,
            g = [],
            m = [];
          for (f = 0; f <= d; f++)
            if (q) {
              var s = f < d ? 2 * f : 0;
              m.push(s + 1);
              g.push(s);
            } else {
              t = f / d;
              var A = C / 10;
              u && 0 !== f
                ? u && g.push(x.length - 1)
                : f < d
                ? ((s = new $3Dmol.Vector3()),
                  (s.x = -a * Math.cos(0 + t * e) * Math.sin(0 + A * G)),
                  (s.y = b ? 0 : a * Math.cos(0 + A * G)),
                  (s.z = a * Math.sin(0 + t * e) * Math.sin(0 + A * G)),
                  1e-5 > Math.abs(s.x) && (s.x = 0),
                  1e-5 > Math.abs(s.y) && (s.y = 0),
                  1e-5 > Math.abs(s.z) && (s.z = 0),
                  (t = b
                    ? new $3Dmol.Vector3(0, Math.cos(0 + A * G), 0)
                    : new $3Dmol.Vector3(s.x, s.y, s.z)),
                  t.normalize(),
                  x.push(s),
                  h.push(t),
                  g.push(x.length - 1))
                : g.push(x.length - d);
            }
          q && l.push(m);
          l.push(g);
        }
        d = { vertices: x, normals: h, verticesRows: l, w: d, h: 10 };
        return (this.cache[b][a] = d);
      }
    },
    s = 0;
  a.drawCylinder = function(a, c, d, x, h, t, l) {
    if (c && d) {
      s++;
      var e = t || l,
        G = 1 == t && 1 == l ? !0 : !1;
      h = h || { r: 0, g: 0, b: 0 };
      var f = [d.x, d.y, d.z];
      f[0] -= c.x;
      f[1] -= c.y;
      f[2] -= c.z;
      var f = b(f),
        C = m.getVerticesForRadius(x, G);
      x = C.w;
      var G = C.h,
        u = e ? G * x + 2 : 2 * x;
      a = a.updateGeoGroup(u);
      var q = C.vertices,
        g = C.normals,
        C = C.verticesRows,
        E = C[G / 2],
        B = C[G / 2 + 1],
        A = a.vertices,
        D,
        p,
        y,
        L,
        O,
        J,
        H = a.vertexArray,
        K = a.normalArray,
        M = a.colorArray,
        P = a.faceArray;
      for (y = 0; y < x; ++y)
        (p = 2 * y),
          (L = f[0] * q[p].x + f[3] * q[p].y + f[6] * q[p].z),
          (O = f[1] * q[p].x + f[4] * q[p].y + f[7] * q[p].z),
          (J = f[5] * q[p].y + f[8] * q[p].z),
          (D = 3 * (A + p)),
          (p = a.faceidx),
          (H[D] = L + c.x),
          (H[D + 1] = O + c.y),
          (H[D + 2] = J + c.z),
          (H[D + 3] = L + d.x),
          (H[D + 4] = O + d.y),
          (H[D + 5] = J + d.z),
          (K[D] = L),
          (K[D + 3] = L),
          (K[D + 1] = O),
          (K[D + 4] = O),
          (K[D + 2] = J),
          (K[D + 5] = J),
          (M[D] = h.r),
          (M[D + 3] = h.r),
          (M[D + 1] = h.g),
          (M[D + 4] = h.g),
          (M[D + 2] = h.b),
          (M[D + 5] = h.b),
          (P[p] = B[y] + A),
          (P[p + 1] = B[y + 1] + A),
          (P[p + 2] = E[y] + A),
          (P[p + 3] = E[y] + A),
          (P[p + 4] = B[y + 1] + A),
          (P[p + 5] = E[y + 1] + A),
          (a.faceidx += 6);
      if (e) {
        t = t ? G + 1 : G / 2 + 1;
        var U, N, S, Q, T, R, X, Z, Y, aa, F, ba, V;
        for (O = l ? 0 : G / 2; O < t; O++)
          if (O !== G / 2) {
            var da = O <= G / 2 ? d : c;
            for (L = 0; L < x; L++)
              (p = a.faceidx),
                (l = C[O][L + 1]),
                (y = 3 * (l + A)),
                (e = C[O][L]),
                (J = 3 * (e + A)),
                (E = C[O + 1][L]),
                (D = 3 * (E + A)),
                (B = C[O + 1][L + 1]),
                (V = 3 * (B + A)),
                (U = f[0] * q[l].x + f[3] * q[l].y + f[6] * q[l].z),
                (N = f[0] * q[e].x + f[3] * q[e].y + f[6] * q[e].z),
                (S = f[0] * q[E].x + f[3] * q[E].y + f[6] * q[E].z),
                (Q = f[0] * q[B].x + f[3] * q[B].y + f[6] * q[B].z),
                (T = f[1] * q[l].x + f[4] * q[l].y + f[7] * q[l].z),
                (R = f[1] * q[e].x + f[4] * q[e].y + f[7] * q[e].z),
                (X = f[1] * q[E].x + f[4] * q[E].y + f[7] * q[E].z),
                (Z = f[1] * q[B].x + f[4] * q[B].y + f[7] * q[B].z),
                (Y = f[5] * q[l].y + f[8] * q[l].z),
                (aa = f[5] * q[e].y + f[8] * q[e].z),
                (F = f[5] * q[E].y + f[8] * q[E].z),
                (ba = f[5] * q[B].y + f[8] * q[B].z),
                (H[y] = U + da.x),
                (H[J] = N + da.x),
                (H[D] = S + da.x),
                (H[V] = Q + da.x),
                (H[y + 1] = T + da.y),
                (H[J + 1] = R + da.y),
                (H[D + 1] = X + da.y),
                (H[V + 1] = Z + da.y),
                (H[y + 2] = Y + da.z),
                (H[J + 2] = aa + da.z),
                (H[D + 2] = F + da.z),
                (H[V + 2] = ba + da.z),
                (M[y] = h.r),
                (M[J] = h.r),
                (M[D] = h.r),
                (M[V] = h.r),
                (M[y + 1] = h.g),
                (M[J + 1] = h.g),
                (M[D + 1] = h.g),
                (M[V + 1] = h.g),
                (M[y + 2] = h.b),
                (M[J + 2] = h.b),
                (M[D + 2] = h.b),
                (M[V + 2] = h.b),
                (U = f[0] * g[l].x + f[3] * g[l].y + f[6] * g[l].z),
                (N = f[0] * g[e].x + f[3] * g[e].y + f[6] * g[e].z),
                (S = f[0] * g[E].x + f[3] * g[E].y + f[6] * g[E].z),
                (Q = f[0] * g[B].x + f[3] * g[B].y + f[6] * g[B].z),
                (T = f[1] * g[l].x + f[4] * g[l].y + f[7] * g[l].z),
                (R = f[1] * g[e].x + f[4] * g[e].y + f[7] * g[e].z),
                (X = f[1] * g[E].x + f[4] * g[E].y + f[7] * g[E].z),
                (Z = f[1] * g[B].x + f[4] * g[B].y + f[7] * g[B].z),
                (Y = f[5] * g[l].y + f[8] * g[l].z),
                (aa = f[5] * g[e].y + f[8] * g[e].z),
                (F = f[5] * g[E].y + f[8] * g[E].z),
                (ba = f[5] * g[B].y + f[8] * g[B].z),
                0 === O
                  ? ((K[y] = U),
                    (K[D] = S),
                    (K[V] = Q),
                    (K[y + 1] = T),
                    (K[D + 1] = X),
                    (K[V + 1] = Z),
                    (K[y + 2] = Y),
                    (K[D + 2] = F),
                    (K[V + 2] = ba),
                    (P[p] = l + A),
                    (P[p + 1] = E + A),
                    (P[p + 2] = B + A),
                    (a.faceidx += 3))
                  : O === t - 1
                  ? ((K[y] = U),
                    (K[J] = N),
                    (K[D] = S),
                    (K[y + 1] = T),
                    (K[J + 1] = R),
                    (K[D + 1] = X),
                    (K[y + 2] = Y),
                    (K[J + 2] = aa),
                    (K[D + 2] = F),
                    (P[p] = l + A),
                    (P[p + 1] = e + A),
                    (P[p + 2] = E + A),
                    (a.faceidx += 3))
                  : ((K[y] = U),
                    (K[J] = N),
                    (K[V] = Q),
                    (K[y + 1] = T),
                    (K[J + 1] = R),
                    (K[V + 1] = Z),
                    (K[y + 2] = Y),
                    (K[J + 2] = aa),
                    (K[V + 2] = ba),
                    (K[J] = N),
                    (K[D] = S),
                    (K[V] = Q),
                    (K[J + 1] = R),
                    (K[D + 1] = X),
                    (K[V + 1] = Z),
                    (K[J + 2] = aa),
                    (K[D + 2] = F),
                    (K[V + 2] = ba),
                    (P[p] = l + A),
                    (P[p + 1] = e + A),
                    (P[p + 2] = B + A),
                    (P[p + 3] = e + A),
                    (P[p + 4] = E + A),
                    (P[p + 5] = B + A),
                    (a.faceidx += 6));
          }
      }
      a.vertices += u;
    }
  };
  a.drawCone = function(a, z, d, x, h) {
    if (z && d) {
      h = h || { r: 0, g: 0, b: 0 };
      var t = [d.x, d.y, d.z];
      t.x -= z.x;
      t.y -= z.y;
      t.z -= z.z;
      var l = b(t),
        e = c.length;
      a = a.updateGeoGroup(e + 2);
      var s = a.vertices,
        f,
        C,
        u,
        q = a.vertexArray,
        g = a.normalArray,
        m = a.colorArray,
        B = a.faceArray;
      f = 3 * s;
      t = new $3Dmol.Vector3(t[0], t[1], t[2]).normalize();
      q[f] = z.x;
      q[f + 1] = z.y;
      q[f + 2] = z.z;
      g[f] = -t.x;
      g[f + 1] = -t.y;
      g[f + 2] = -t.z;
      m[f] = h.r;
      m[f + 1] = h.g;
      m[f + 2] = h.b;
      q[f + 3] = d.x;
      q[f + 4] = d.y;
      q[f + 5] = d.z;
      g[f + 3] = t.x;
      g[f + 4] = t.y;
      g[f + 5] = t.z;
      m[f + 3] = h.r;
      m[f + 4] = h.g;
      m[f + 5] = h.b;
      f += 6;
      for (d = 0; d < e; ++d)
        (u = c[d].clone()),
          u.multiplyScalar(x),
          (t = l[0] * u.x + l[3] * u.y + l[6] * u.z),
          (C = l[1] * u.x + l[4] * u.y + l[7] * u.z),
          (u = l[5] * u.y + l[8] * u.z),
          (q[f] = t + z.x),
          (q[f + 1] = C + z.y),
          (q[f + 2] = u + z.z),
          (g[f] = t),
          (g[f + 1] = C),
          (g[f + 2] = u),
          (m[f] = h.r),
          (m[f + 1] = h.g),
          (m[f + 2] = h.b),
          (f += 3);
      a.vertices += e + 2;
      z = a.faceidx;
      for (d = 0; d < e; d++)
        (x = s + 2 + d),
          (h = s + 2 + ((d + 1) % e)),
          (B[z] = x),
          (B[z + 1] = h),
          (B[z + 2] = s),
          (z += 3),
          (B[z] = x),
          (B[z + 1] = h),
          (B[z + 2] = s + 1),
          (z += 3);
      a.faceidx += 6 * e;
    }
  };
  var B = {
    cache: {},
    getVerticesForRadius: function(a) {
      if ("undefined" !== typeof this.cache[a]) return this.cache[a];
      var b = { vertices: [], verticesRows: [], normals: [] },
        d = 16,
        c = 10;
      1 > a && ((d = 10), (c = 8));
      var h = 2 * Math.PI,
        t = Math.PI,
        l,
        e;
      for (e = 0; e <= c; e++) {
        var s = [];
        for (l = 0; l <= d; l++) {
          var f = l / d,
            C = e / c,
            u = {};
          u.x = -a * Math.cos(0 + f * h) * Math.sin(0 + C * t);
          u.y = a * Math.cos(0 + C * t);
          u.z = a * Math.sin(0 + f * h) * Math.sin(0 + C * t);
          f = new $3Dmol.Vector3(u.x, u.y, u.z);
          f.normalize();
          b.vertices.push(u);
          b.normals.push(f);
          s.push(b.vertices.length - 1);
        }
        b.verticesRows.push(s);
      }
      return (this.cache[a] = b);
    }
  };
  a.drawSphere = function(a, b, d, c) {
    new $3Dmol.Vector3(b.x, b.y, b.z);
    var h = B.getVerticesForRadius(d),
      t = h.vertices,
      l = h.normals;
    a = a.updateGeoGroup(t.length);
    for (
      var e = a.vertices,
        s = a.vertexArray,
        f = a.colorArray,
        C = a.faceArray,
        u = a.lineArray,
        q = a.normalArray,
        g = 0,
        m = t.length;
      g < m;
      ++g
    ) {
      var I = 3 * (e + g),
        A = t[g];
      s[I] = A.x + b.x;
      s[I + 1] = A.y + b.y;
      s[I + 2] = A.z + b.z;
      f[I] = c.r;
      f[I + 1] = c.g;
      f[I + 2] = c.b;
    }
    a.vertices += t.length;
    h = h.verticesRows;
    s = h.length - 1;
    for (c = 0; c < s; c++)
      for (f = h[c].length - 1, b = 0; b < f; b++) {
        var g = a.faceidx,
          m = a.lineidx,
          I = h[c][b + 1] + e,
          A = 3 * I,
          D = h[c][b] + e,
          p = 3 * D,
          y = h[c + 1][b] + e,
          L = 3 * y,
          O = h[c + 1][b + 1] + e,
          J = 3 * O,
          H = l[I - e],
          K = l[D - e],
          M = l[y - e],
          P = l[O - e];
        Math.abs(t[I - e].y) === d
          ? ((q[A] = H.x),
            (q[L] = M.x),
            (q[J] = P.x),
            (q[A + 1] = H.y),
            (q[L + 1] = M.y),
            (q[J + 1] = P.y),
            (q[A + 2] = H.z),
            (q[L + 2] = M.z),
            (q[J + 2] = P.z),
            (C[g] = I),
            (C[g + 1] = y),
            (C[g + 2] = O),
            (u[m] = I),
            (u[m + 1] = y),
            (u[m + 2] = I),
            (u[m + 3] = O),
            (u[m + 4] = y),
            (u[m + 5] = O),
            (a.faceidx += 3),
            (a.lineidx += 6))
          : Math.abs(t[y - e].y) === d
          ? ((q[A] = H.x),
            (q[p] = K.x),
            (q[L] = M.x),
            (q[A + 1] = H.y),
            (q[p + 1] = K.y),
            (q[L + 1] = M.y),
            (q[A + 2] = H.z),
            (q[p + 2] = K.z),
            (q[L + 2] = M.z),
            (C[g] = I),
            (C[g + 1] = D),
            (C[g + 2] = y),
            (u[m] = I),
            (u[m + 1] = D),
            (u[m + 2] = I),
            (u[m + 3] = y),
            (u[m + 4] = D),
            (u[m + 5] = y),
            (a.faceidx += 3),
            (a.lineidx += 6))
          : ((q[A] = H.x),
            (q[p] = K.x),
            (q[J] = P.x),
            (q[A + 1] = H.y),
            (q[p + 1] = K.y),
            (q[J + 1] = P.y),
            (q[A + 2] = H.z),
            (q[p + 2] = K.z),
            (q[J + 2] = P.z),
            (q[p] = K.x),
            (q[L] = M.x),
            (q[J] = P.x),
            (q[p + 1] = K.y),
            (q[L + 1] = M.y),
            (q[J + 1] = P.y),
            (q[p + 2] = K.z),
            (q[L + 2] = M.z),
            (q[J + 2] = P.z),
            (C[g] = I),
            (C[g + 1] = D),
            (C[g + 2] = O),
            (C[g + 3] = D),
            (C[g + 4] = y),
            (C[g + 5] = O),
            (u[m] = I),
            (u[m + 1] = D),
            (u[m + 2] = I),
            (u[m + 3] = O),
            (u[m + 4] = D),
            (u[m + 5] = y),
            (u[m + 6] = y),
            (u[m + 7] = O),
            (a.faceidx += 6),
            (a.lineidx += 8));
      }
  };
  return a;
})();
$3Dmol = $3Dmol || {};
$3Dmol.GLModel = (function() {
  function a(a, w) {
    var z = [],
      d = [],
      x = !1,
      h = null,
      t = null,
      l = null,
      e = {},
      G = new $3Dmol.Matrix4(),
      f,
      C = $3Dmol.elementColors.defaultColor,
      u = w ? w : $3Dmol.elementColors.defaultColors,
      q = function(a, b) {
        var h = 1.5;
        "undefined" != typeof b.radius
          ? (h = b.radius)
          : c[a.elem] && (h = c[a.elem]);
        "undefined" != typeof b.scale && (h *= b.scale);
        return h;
      },
      g = function(a, b, h) {
        var d = new $3Dmol.Vector3(a.x, a.y, a.z),
          e = new $3Dmol.Vector3(b.x, b.y, b.z).clone(),
          f = null;
        e.sub(d);
        1 === a.bonds.length
          ? 1 === b.bonds.length
            ? ((f = e.clone()), 1e-4 < Math.abs(f.x) ? (f.y += 1) : (f.x += 1))
            : ((h = (h + 1) % b.bonds.length),
              (a = b.bonds[h]),
              (a = z[a]),
              (a = new $3Dmol.Vector3(a.x, a.y, a.z)),
              (a = a.clone()),
              a.sub(d),
              (f = a.clone()),
              f.cross(e))
          : ((h = (h + 1) % a.bonds.length),
            (a = a.bonds[h]),
            (a = z[a]),
            (a = new $3Dmol.Vector3(a.x, a.y, a.z)),
            (a = a.clone()),
            a.sub(d),
            (f = a.clone()),
            f.cross(e));
        0.01 > f.lengthSq() &&
          ((f = e.clone()), 1e-4 < Math.abs(f.x) ? (f.y += 1) : (f.x += 1));
        f.cross(e);
        f.normalize();
        return f;
      },
      E = function(a, b, h, d, e, f) {
        a[h] = d.x;
        a[h + 1] = d.y;
        a[h + 2] = d.z;
        b[h] = f.r;
        b[h + 1] = f.g;
        b[h + 2] = f.b;
        a[h + 3] = e.x;
        a[h + 4] = e.y;
        a[h + 5] = e.z;
        b[h + 3] = f.r;
        b[h + 4] = f.g;
        b[h + 5] = f.b;
      };
    this.getCrystData = function() {
      return e.cryst ? e.cryst : null;
    };
    this.getSymmetries = function() {
      "undefined" == typeof e.symmetries && (e.symmetries = [G]);
      return e.symmetries;
    };
    this.setSymmetries = function(a) {
      e.symmetries = "undefined" == typeof a ? [G] : a;
    };
    this.getID = function() {
      return a;
    };
    this.getFrames = function() {
      return d;
    };
    this.setFrame = function(a) {
      0 != d.length &&
        ((z = 0 <= a && a < d.length ? d[a] : d[d.length - 1]), (h = null));
    };
    this.addFrame = function(a) {
      d.push(a);
    };
    this.vibrate = function(a, b) {
      var h = [];
      b = b || 1;
      a = a || 10;
      for (var f = 0; f < z.length; f++) {
        var e = new $3Dmol.Vector3(z[f].dx, z[f].dy, z[f].dz);
        h.push(e);
      }
      a--;
      for (f = 1; f <= a; f++) {
        h = [];
        for (e = 0; e < z.length; e++) {
          var c = new $3Dmol.Vector3(z[e].dx, z[e].dy, z[e].dz),
            g = new $3Dmol.Vector3(z[e].x, z[e].y, z[e].z);
          c.sub(g);
          c.multiplyScalar((f * b) / a);
          g.add(c);
          var c = {},
            t;
          for (t in z[e]) c[t] = z[e][t];
          c.x = g.x;
          c.y = g.y;
          c.z = g.z;
          h.push(c);
        }
        d.push(h);
      }
      d.unshift(z);
    };
    this.setAtomDefaults = function(h) {
      for (var d = 0; d < h.length; d++) {
        var e = h[d];
        e &&
          ((e.style = e.style || b),
          (e.color = e.color || u[e.elem] || C),
          (e.model = a),
          e.clickable &&
            (e.intersectionShape = {
              sphere: [],
              cylinder: [],
              line: [],
              triangle: []
            }));
      }
    };
    this.addMolData = function(b, h, c) {
      c = c || {};
      b = $3Dmol.GLModel.parseMolData(b, h, c);
      f = !c.duplicateAssemblyAtoms;
      (h = b.modelData) && (e = Array.isArray(h) ? h[0] : h);
      if (0 == d.length) {
        for (c = 0; c < b.length; c++) 0 != b[c].length && d.push(b[c]);
        d[0] && (z = d[0]);
      } else if (c.frames) for (c = 0; c < b.length; c++) d.push(b[c]);
      else for (c = 0; c < b.length; c++) this.addAtoms(b[c]);
      for (c = 0; c < d.length; c++) this.setAtomDefaults(d[c], a);
    };
    this.setDontDuplicateAtoms = function(a) {
      f = a;
    };
    this.setModelData = function(a) {
      e = a;
    };
    this.atomIsSelected = function(a, b) {
      if ("undefined" === typeof b) return !0;
      var h = !!b.invert,
        d = !0,
        e;
      for (e in b)
        if ("predicate" === e) {
          if (!b.predicate(a)) {
            d = !1;
            break;
          }
        } else if (
          b.hasOwnProperty(e) &&
          "props" != e &&
          "invert" != e &&
          "model" != e &&
          "byres" != e &&
          "expand" != e &&
          "within" != e
        ) {
          if ("undefined" === typeof a[e]) {
            d = !1;
            break;
          }
          var f = !1;
          if ("bonds" === e) {
            if (((f = b[e]), f != a.bonds.length)) {
              d = !1;
              break;
            }
          } else if ($.isArray(b[e])) {
            for (var c = b[e], g = 0; g < c.length; g++)
              if (a[e] == c[g]) {
                f = !0;
                break;
              }
            if (!f) {
              d = !1;
              break;
            }
          } else if (((f = b[e]), a[e] != f)) {
            d = !1;
            break;
          }
        }
      return h ? !d : d;
    };
    this.selectedAtoms = function(a, b) {
      var h = [];
      a = a || {};
      b || (b = z);
      for (var d = b.length, e = 0; e < d; e++) {
        var f = b[e];
        f && this.atomIsSelected(f, a) && h.push(f);
      }
      if (a.hasOwnProperty("expand")) {
        var c;
        var g = parseFloat(a.expand);
        if (0 >= g) c = h;
        else {
          e = $3Dmol.getExtent(h);
          d = [[], [], []];
          for (f = 0; 3 > f; f++)
            (d[0][f] = e[0][f] - g),
              (d[1][f] = e[1][f] + g),
              (d[2][f] = e[2][f]);
          g = [];
          for (f = 0; f < z.length; f++) {
            c = z[f].x;
            var t = z[f].y,
              l = z[f].z;
            c >= d[0][0] &&
              c <= d[1][0] &&
              t >= d[0][1] &&
              t <= d[1][1] &&
              l >= d[0][2] &&
              l <= d[1][2] &&
              ((c >= e[0][0] &&
                c <= e[1][0] &&
                t >= e[0][1] &&
                t <= e[1][1] &&
                l >= e[0][2] &&
                l <= e[1][2]) ||
                g.push(z[f]));
          }
          c = g;
        }
        t = h.length;
        for (e = 0; e < c.length; e++)
          for (d = 0; d < t; d++)
            (f = I(c[e], h[d])),
              (g = Math.pow(a.expand, 2)),
              f < g && 0 < f && h.push(c[e]);
      }
      if (
        a.hasOwnProperty("within") &&
        a.within.hasOwnProperty("sel") &&
        a.within.hasOwnProperty("distance")
      ) {
        c = this.selectedAtoms(a.within.sel, z);
        t = [];
        for (e = 0; e < c.length; e++)
          for (d = 0; d < h.length; d++)
            (f = I(c[e], h[d])),
              (g = Math.pow(parseFloat(a.within.distance), 2)),
              f < g && 0 < f && t.push(h[d]);
        h = t;
      }
      if (a.hasOwnProperty("byres"))
        for (g = {}, c = [], t = [], e = 0; e < h.length; e++) {
          var f = h[e],
            l = f.chain,
            q = f.resi;
          void 0 === g[l] && (g[l] = {});
          if (f.hasOwnProperty("resi") && void 0 === g[l][q])
            for (g[l][q] = !0, t.push(f); 0 < t.length; )
              if (
                ((f = t.pop()),
                (l = f.chain),
                (q = f.resi),
                void 0 === c[f.index])
              )
                for (c[f.index] = !0, d = 0; d < f.bonds.length; d++) {
                  var u = z[f.bonds[d]];
                  void 0 === c[u.index] &&
                    u.hasOwnProperty("resi") &&
                    u.chain == l &&
                    u.resi == q &&
                    (t.push(u), h.push(u));
                }
        }
      return h;
    };
    var I = function(a, b) {
      var h = b.y - a.y,
        d = b.z - a.z;
      return Math.pow(b.x - a.x, 2) + Math.pow(h, 2) + Math.pow(d, 2);
    };
    this.addAtoms = function(d) {
      h = null;
      var e = z.length,
        f = [],
        c;
      for (c = 0; c < d.length; c++)
        "undefined" == typeof d[c].index && (d[c].index = c),
          "undefined" == typeof d[c].serial && (d[c].serial = c),
          (f[d[c].index] = e + c);
      for (c = 0; c < d.length; c++) {
        var e = d[c],
          g = f[e.index],
          t = $.extend(!1, {}, e);
        t.index = g;
        t.bonds = [];
        t.bondOrder = [];
        t.model = a;
        t.style = t.style || b;
        "undefined" == typeof t.color && (t.color = u[t.elem] || C);
        for (var g = e.bonds ? e.bonds.length : 0, l = 0; l < g; l++) {
          var q = f[e.bonds[l]];
          "undefined" != typeof q &&
            (t.bonds.push(q),
            t.bondOrder.push(e.bondOrder ? e.bondOrder[l] : 1));
        }
        z.push(t);
      }
    };
    this.removeAtoms = function(a) {
      h = null;
      var b = [],
        d;
      for (d = 0; d < a.length; d++) b[a[d].index] = !0;
      a = [];
      for (d = 0; d < z.length; d++) {
        var e = z[d];
        b[e.index] || a.push(e);
      }
      z = [];
      this.addAtoms(a);
    };
    this.setStyle = function(a, b, e) {
      "undefined" === typeof b &&
        "undefined" == typeof e &&
        ((b = a), (a = {}));
      for (var f in a)
        -1 === m.indexOf(f) && console.log("Unknown selector " + f);
      for (f in b) -1 === s.indexOf(f) && console.log("Unknown style " + f);
      var c = !1,
        g = function(h) {
          for (var d = t.selectedAtoms(a, h), g = 0; g < h.length; g++)
            h[g] && (h[g].capDrawn = !1);
          for (g = 0; g < d.length; g++)
            for (f in ((c = !0),
            d[g].clickable &&
              (d[g].intersectionShape = {
                sphere: [],
                cylinder: [],
                line: [],
                triangle: []
              }),
            e || (d[g].style = {}),
            b))
              if (b.hasOwnProperty(f)) {
                d[g].style[f] = d[g].style[f] || {};
                for (var l in b[f]) d[g].style[f][l] = b[f][l];
              }
        },
        t = this;
      g(z);
      for (var l = 0; l < d.length; l++) g(d[l]);
      c && (h = null);
    };
    this.setClickable = function(a, b, d) {
      for (var e in a)
        -1 === m.indexOf(e) && console.log("Unknown selector " + e);
      b = !!b;
      if (d && "function" != typeof d)
        console.log("Callback is not a function");
      else {
        e = this.selectedAtoms(a, z);
        var f = e.length;
        for (a = 0; a < f; a++)
          (e[a].intersectionShape = {
            sphere: [],
            cylinder: [],
            line: [],
            triangle: []
          }),
            (e[a].clickable = b),
            d && (e[a].callback = d);
        0 < f && (h = null);
      }
    };
    this.setColorByElement = function(a, b) {
      var d;
      if ((d = null !== h))
        (d = l), (d = b && d ? JSON.stringify(b) == JSON.stringify(d) : b == d);
      if (!d) {
        l = b;
        var e = this.selectedAtoms(a, e);
        0 < e.length && (h = null);
        for (d = 0; d < e.length; d++) {
          var f = e[d];
          "undefined" !== typeof b[f.elem] && (f.color = b[f.elem]);
        }
      }
    };
    this.setColorByProperty = function(a, b, d, e) {
      var f = this.selectedAtoms(a, f);
      l = null;
      0 < f.length && (h = null);
      var c;
      e || (e = d.range());
      e || (e = $3Dmol.getPropertyRange(f, b));
      for (a = 0; a < f.length; a++)
        (c = f[a]),
          null != $3Dmol.getAtomProperty(c, b) &&
            (c.color = d.valueToHex(parseFloat(c.properties[b]), [e[0], e[1]]));
    };
    this.toCDObject = function(a) {
      var b = { a: [], b: [] };
      a && (b.s = []);
      for (var h = 0; h < z.length; h++) {
        var d = {},
          e = z[h];
        d.x = e.x;
        d.y = e.y;
        d.z = e.z;
        "C" != e.elem && (d.l = e.elem);
        if (a) {
          for (
            var f = 0;
            f < b.s.length &&
            JSON.stringify(e.style) !== JSON.stringify(b.s[f]);

          )
            f++;
          f === b.s.length && b.s.push(e.style);
          0 !== f && (d.s = f);
        }
        b.a.push(d);
        for (d = 0; d < e.bonds.length; d++) {
          var f = h,
            c = e.bonds[d];
          f >= c ||
            ((f = { b: f, e: c }),
            (c = e.bondOrder[d]),
            1 != c && (f.o = c),
            b.b.push(f));
        }
      }
      return b;
    };
    this.globj = function(a) {
      if (null === h) {
        var b = z,
          d = new $3Dmol.Object3D(),
          c = [],
          l = {},
          u = {},
          C = new $3Dmol.Geometry(!0),
          m = new $3Dmol.Geometry(!0),
          s = new $3Dmol.Geometry(!0),
          w,
          G,
          B,
          I,
          S = {},
          Q = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
        w = 0;
        for (B = b.length; w < B; w++) {
          var T = b[w];
          if (T && T.style) {
            T.clickable &&
              void 0 === T.intersectionShape &&
              (T.intersectionShape = {
                sphere: [],
                cylinder: [],
                line: [],
                triangle: []
              });
            I = { line: void 0, cross: void 0, stick: void 0, sphere: void 0 };
            for (G in I)
              (I[G] = T.style[G]
                ? T.style[G].opacity
                  ? parseFloat(T.style[G].opacity)
                  : 1
                : void 0),
                S[G]
                  ? void 0 != I[G] &&
                    S[G] != I[G] &&
                    (console.log("Warning: " + G + " opacity is ambiguous"),
                    (S[G] = 1))
                  : (S[G] = I[G]);
            var R = T,
              X = C;
            if (R.style.sphere) {
              var Z = R.style.sphere;
              if (!Z.hidden) {
                var Y = $3Dmol.getColorFromStyle(R, Z),
                  aa = q(R, Z);
                if (!0 === R.clickable && void 0 !== R.intersectionShape) {
                  var F = new $3Dmol.Vector3(R.x, R.y, R.z);
                  R.intersectionShape.sphere.push(new $3Dmol.Sphere(F, aa));
                }
                $3Dmol.GLDraw.drawSphere(X, R, aa, Y);
              }
            }
            var ba = T,
              V = m;
            if (ba.style.spherei) {
              var da = ba.style.spherei;
              if (!da.hidden) {
                for (
                  var ta = q(ba, da),
                    Pa = $3Dmol.getColorFromStyle(ba, da),
                    za = V.updateGeoGroup(4),
                    La = za.vertices,
                    ga = 3 * La,
                    Wa = za.vertexArray,
                    Ta = za.colorArray,
                    Aa = 0;
                  4 > Aa;
                  Aa++
                )
                  (Wa[ga + 3 * Aa] = ba.x),
                    (Wa[ga + 3 * Aa + 1] = ba.y),
                    (Wa[ga + 3 * Aa + 2] = ba.z);
                for (
                  var sa = za.normalArray, Ta = za.colorArray, Aa = 0;
                  4 > Aa;
                  Aa++
                )
                  (Ta[ga + 3 * Aa] = Pa.r),
                    (Ta[ga + 3 * Aa + 1] = Pa.g),
                    (Ta[ga + 3 * Aa + 2] = Pa.b);
                sa[ga + 0] = -ta;
                sa[ga + 1] = ta;
                sa[ga + 2] = 0;
                sa[ga + 3] = -ta;
                sa[ga + 4] = -ta;
                sa[ga + 5] = 0;
                sa[ga + 6] = ta;
                sa[ga + 7] = -ta;
                sa[ga + 8] = 0;
                sa[ga + 9] = ta;
                sa[ga + 10] = ta;
                sa[ga + 11] = 0;
                za.vertices += 4;
                var Ga = za.faceArray,
                  Oa = za.faceidx;
                Ga[Oa + 0] = La;
                Ga[Oa + 1] = La + 1;
                Ga[Oa + 2] = La + 2;
                Ga[Oa + 3] = La + 2;
                Ga[Oa + 4] = La + 3;
                Ga[Oa + 5] = La;
                za.faceidx += 6;
              }
            }
            var va = T,
              nb = u;
            if (va.style.cross) {
              var gb = va.style.cross;
              if (!gb.hidden) {
                var ob = gb.linewidth || 1;
                nb[ob] || (nb[ob] = new $3Dmol.Geometry());
                var hb = nb[ob].updateGeoGroup(6),
                  Xa = q(va, gb),
                  Ya = [
                    [Xa, 0, 0],
                    [-Xa, 0, 0],
                    [0, Xa, 0],
                    [0, -Xa, 0],
                    [0, 0, Xa],
                    [0, 0, -Xa]
                  ],
                  Ab = va.clickable;
                Ab &&
                  void 0 === va.intersectionShape &&
                  (va.intersectionShape = {
                    sphere: [],
                    cylinder: [],
                    line: []
                  });
                for (
                  var pb = $3Dmol.getColorFromStyle(va, gb),
                    qb = hb.vertexArray,
                    rb = hb.colorArray,
                    Qa = 0;
                  6 > Qa;
                  Qa++
                ) {
                  var Za = 3 * hb.vertices;
                  hb.vertices++;
                  qb[Za] = va.x + Ya[Qa][0];
                  qb[Za + 1] = va.y + Ya[Qa][1];
                  qb[Za + 2] = va.z + Ya[Qa][2];
                  rb[Za] = pb.r;
                  rb[Za + 1] = pb.g;
                  rb[Za + 2] = pb.b;
                  if (Ab) {
                    var $a = new $3Dmol.Vector3(
                      Ya[Qa][0],
                      Ya[Qa][1],
                      Ya[Qa][2]
                    );
                    $a.multiplyScalar(0.1);
                    $a.set($a.x + va.x, $a.y + va.y, $a.z + va.z);
                    va.intersectionShape.line.push($a);
                  }
                }
              }
            }
            var ea = T,
              Ib = b,
              sb = l;
            if (ea.style.line) {
              var Bb = ea.style.line;
              if (!Bb.hidden) {
                var tb = Bb.linewidth || 1;
                sb[tb] || (sb[tb] = new $3Dmol.Geometry());
                for (
                  var ua = sb[tb].updateGeoGroup(6 * ea.bonds.length),
                    ia = ua.vertexArray,
                    ja = ua.colorArray,
                    Ha = 0;
                  Ha < ea.bonds.length;
                  Ha++
                ) {
                  var Ra = Ib[ea.bonds[Ha]];
                  if (Ra.style.line && !(ea.serial >= Ra.serial)) {
                    var Ea = new $3Dmol.Vector3(ea.x, ea.y, ea.z),
                      Ma = new $3Dmol.Vector3(Ra.x, Ra.y, Ra.z),
                      ib = Ea.clone()
                        .add(Ma)
                        .multiplyScalar(0.5),
                      Cb = !1;
                    ea.clickable &&
                      (void 0 === ea.intersectionShape &&
                        (ea.intersectionShape = {
                          sphere: [],
                          cylinder: [],
                          line: [],
                          triangle: []
                        }),
                      ea.intersectionShape.line.push(Ea),
                      ea.intersectionShape.line.push(Ma));
                    var oa = $3Dmol.getColorFromStyle(ea, ea.style.line),
                      Ia = $3Dmol.getColorFromStyle(Ra, Ra.style.line);
                    if (ea.bondStyles && ea.bondStyles[Ha]) {
                      var Sa = ea.bondStyles[Ha];
                      if (!Sa.iswire) continue;
                      Sa.radius && (bondR = Sa.radius);
                      Sa.singleBond && (Cb = !0);
                      "undefined" != typeof Sa.color1 &&
                        (oa = $3Dmol.CC.color(Sa.color1));
                      "undefined" != typeof Sa.color2 &&
                        (Ia = $3Dmol.CC.color(Sa.color2));
                    }
                    var ka = 3 * ua.vertices;
                    if (1 < ea.bondOrder[Ha] && 4 > ea.bondOrder[Ha] && !Cb) {
                      var ab = g(ea, Ra, Ha),
                        Fa = Ma.clone();
                      Fa.sub(Ea);
                      if (2 == ea.bondOrder[Ha])
                        if (
                          (ab.multiplyScalar(0.1),
                          (p1a = Ea.clone()),
                          p1a.add(ab),
                          (p1b = Ea.clone()),
                          p1b.sub(ab),
                          (p2a = p1a.clone()),
                          p2a.add(Fa),
                          (p2b = p1b.clone()),
                          p2b.add(Fa),
                          oa == Ia)
                        )
                          (ua.vertices += 4),
                            E(ia, ja, ka, p1a, p2a, oa),
                            E(ia, ja, ka + 6, p1b, p2b, oa);
                        else {
                          ua.vertices += 8;
                          Fa.multiplyScalar(0.5);
                          var Ua = p1a.clone();
                          Ua.add(Fa);
                          var Va = p1b.clone();
                          Va.add(Fa);
                          E(ia, ja, ka, p1a, Ua, oa);
                          E(ia, ja, ka + 6, Ua, p2a, Ia);
                          E(ia, ja, ka + 12, p1b, Va, oa);
                          E(ia, ja, ka + 18, Va, p2b, Ia);
                        }
                      else
                        3 == ea.bondOrder[Ha] &&
                          (ab.multiplyScalar(0.1),
                          (p1a = Ea.clone()),
                          p1a.add(ab),
                          (p1b = Ea.clone()),
                          p1b.sub(ab),
                          (p2a = p1a.clone()),
                          p2a.add(Fa),
                          (p2b = p1b.clone()),
                          p2b.add(Fa),
                          oa == Ia
                            ? ((ua.vertices += 6),
                              E(ia, ja, ka, Ea, Ma, oa),
                              E(ia, ja, ka + 6, p1a, p2a, oa),
                              E(ia, ja, ka + 12, p1b, p2b, oa))
                            : ((ua.vertices += 12),
                              Fa.multiplyScalar(0.5),
                              (Ua = p1a.clone()),
                              Ua.add(Fa),
                              (Va = p1b.clone()),
                              Va.add(Fa),
                              E(ia, ja, ka, Ea, ib, oa),
                              E(ia, ja, ka + 6, ib, Ma, Ia),
                              E(ia, ja, ka + 12, p1a, Ua, oa),
                              E(ia, ja, ka + 18, Ua, p2a, Ia),
                              E(ia, ja, ka + 24, p1b, Va, oa),
                              E(ia, ja, ka + 30, Va, p2b, Ia)));
                    } else
                      oa == Ia
                        ? ((ua.vertices += 2), E(ia, ja, ka, Ea, Ma, oa))
                        : ((ua.vertices += 4),
                          E(ia, ja, ka, Ea, ib, oa),
                          E(ia, ja, ka + 6, ib, Ma, Ia));
                  }
                }
              }
            }
            var W = T,
              Jb = b,
              ha = s;
            if (W.style.stick) {
              var jb = W.style.stick;
              if (!jb.hidden) {
                var cb = jb.radius || 0.25,
                  wa = cb,
                  Db = jb.singleBonds || !1,
                  db = 0,
                  eb = 0,
                  ma = $3Dmol.getColorFromStyle(W, jb),
                  la = void 0,
                  Ba = void 0;
                !W.capDrawn && 4 > W.bonds.length && (db = 2);
                for (var na = 0; na < W.bonds.length; na++) {
                  var fa = Jb[W.bonds[na]];
                  if (W.serial < fa.serial) {
                    var Eb = fa.style;
                    if (Eb.stick) {
                      var Ja = $3Dmol.getColorFromStyle(fa, Eb.stick),
                        wa = cb,
                        fb = Db;
                      if (W.bondStyles && W.bondStyles[na]) {
                        var Ca = W.bondStyles[na];
                        if (Ca.iswire) continue;
                        Ca.radius && (wa = Ca.radius);
                        Ca.singleBond && (fb = !0);
                        "undefined" != typeof Ca.color1 &&
                          (ma = $3Dmol.CC.color(Ca.color1));
                        "undefined" != typeof Ca.color2 &&
                          (Ja = $3Dmol.CC.color(Ca.color2));
                      }
                      var pa = new $3Dmol.Vector3(W.x, W.y, W.z),
                        Da = new $3Dmol.Vector3(fa.x, fa.y, fa.z);
                      if (1 === W.bondOrder[na] || fb) {
                        if (
                          (!fa.capDrawn && 4 > fa.bonds.length && (eb = 2),
                          ma != Ja
                            ? ((la = new $3Dmol.Vector3()
                                .addVectors(pa, Da)
                                .multiplyScalar(0.5)),
                              $3Dmol.GLDraw.drawCylinder(
                                ha,
                                pa,
                                la,
                                wa,
                                ma,
                                db,
                                0
                              ),
                              $3Dmol.GLDraw.drawCylinder(
                                ha,
                                la,
                                Da,
                                wa,
                                Ja,
                                0,
                                eb
                              ))
                            : $3Dmol.GLDraw.drawCylinder(
                                ha,
                                pa,
                                Da,
                                wa,
                                ma,
                                db,
                                eb
                              ),
                          W.clickable || fa.clickable)
                        ) {
                          la = new $3Dmol.Vector3()
                            .addVectors(pa, Da)
                            .multiplyScalar(0.5);
                          if (W.clickable) {
                            var Kb = new $3Dmol.Cylinder(pa, la, wa),
                              Lb = new $3Dmol.Sphere(pa, wa);
                            W.intersectionShape.cylinder.push(Kb);
                            W.intersectionShape.sphere.push(Lb);
                          }
                          if (fa.clickable) {
                            var Mb = new $3Dmol.Cylinder(Da, la, wa),
                              Nb = new $3Dmol.Sphere(Da, wa);
                            fa.intersectionShape.cylinder.push(Mb);
                            fa.intersectionShape.sphere.push(Nb);
                          }
                        }
                      } else if (1 < W.bondOrder[na]) {
                        var Na = 0;
                        mtoCap = 0;
                        wa != cb && (mtoCap = Na = 2);
                        var bb = Da.clone(),
                          Ka = null;
                        bb.sub(pa);
                        var ca,
                          qa,
                          ra,
                          xa,
                          ya,
                          Ka = g(W, fa, na);
                        if (2 == W.bondOrder[na]) {
                          if (
                            ((ca = wa / 2.5),
                            (Ka = g(W, fa, na)),
                            Ka.multiplyScalar(1.5 * ca),
                            (qa = pa.clone()),
                            qa.add(Ka),
                            (ra = pa.clone()),
                            ra.sub(Ka),
                            (xa = qa.clone()),
                            xa.add(bb),
                            (ya = ra.clone()),
                            ya.add(bb),
                            ma != Ja
                              ? ((la = new $3Dmol.Vector3()
                                  .addVectors(qa, xa)
                                  .multiplyScalar(0.5)),
                                (Ba = new $3Dmol.Vector3()
                                  .addVectors(ra, ya)
                                  .multiplyScalar(0.5)),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  qa,
                                  la,
                                  ca,
                                  ma,
                                  Na,
                                  0
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  la,
                                  xa,
                                  ca,
                                  Ja,
                                  0,
                                  mtoCap
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  ra,
                                  Ba,
                                  ca,
                                  ma,
                                  Na,
                                  0
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  Ba,
                                  ya,
                                  ca,
                                  Ja,
                                  0,
                                  mtoCap
                                ))
                              : ($3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  qa,
                                  xa,
                                  ca,
                                  ma,
                                  Na,
                                  mtoCap
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  ra,
                                  ya,
                                  ca,
                                  ma,
                                  Na,
                                  mtoCap
                                )),
                            W.clickable || fa.clickable)
                          )
                            (la = new $3Dmol.Vector3()
                              .addVectors(qa, xa)
                              .multiplyScalar(0.5)),
                              (Ba = new $3Dmol.Vector3()
                                .addVectors(ra, ya)
                                .multiplyScalar(0.5)),
                              W.clickable &&
                                ((cylinder1a = new $3Dmol.Cylinder(qa, la, ca)),
                                (cylinder1b = new $3Dmol.Cylinder(ra, Ba, ca)),
                                W.intersectionShape.cylinder.push(cylinder1a),
                                W.intersectionShape.cylinder.push(cylinder1b)),
                              fa.clickable &&
                                ((cylinder2a = new $3Dmol.Cylinder(xa, la, ca)),
                                (cylinder2b = new $3Dmol.Cylinder(ya, Ba, ca)),
                                fa.intersectionShape.cylinder.push(cylinder2a),
                                fa.intersectionShape.cylinder.push(cylinder2b));
                        } else
                          3 == W.bondOrder[na] &&
                            ((ca = wa / 4),
                            Ka.cross(bb),
                            Ka.normalize(),
                            Ka.multiplyScalar(3 * ca),
                            (qa = pa.clone()),
                            qa.add(Ka),
                            (ra = pa.clone()),
                            ra.sub(Ka),
                            (xa = qa.clone()),
                            xa.add(bb),
                            (ya = ra.clone()),
                            ya.add(bb),
                            ma != Ja
                              ? ((la = new $3Dmol.Vector3()
                                  .addVectors(qa, xa)
                                  .multiplyScalar(0.5)),
                                (Ba = new $3Dmol.Vector3()
                                  .addVectors(ra, ya)
                                  .multiplyScalar(0.5)),
                                (mp3 = new $3Dmol.Vector3()
                                  .addVectors(pa, Da)
                                  .multiplyScalar(0.5)),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  qa,
                                  la,
                                  ca,
                                  ma,
                                  Na,
                                  0
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  la,
                                  xa,
                                  ca,
                                  Ja,
                                  0,
                                  mtoCap
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  pa,
                                  mp3,
                                  ca,
                                  ma,
                                  db,
                                  0
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  mp3,
                                  Da,
                                  ca,
                                  Ja,
                                  0,
                                  eb
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  ra,
                                  Ba,
                                  ca,
                                  ma,
                                  Na,
                                  0
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  Ba,
                                  ya,
                                  ca,
                                  Ja,
                                  0,
                                  mtoCap
                                ))
                              : ($3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  qa,
                                  xa,
                                  ca,
                                  ma,
                                  Na,
                                  mtoCap
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  pa,
                                  Da,
                                  ca,
                                  ma,
                                  db,
                                  eb
                                ),
                                $3Dmol.GLDraw.drawCylinder(
                                  ha,
                                  ra,
                                  ya,
                                  ca,
                                  ma,
                                  Na,
                                  mtoCap
                                )),
                            W.clickable || fa.clickable) &&
                            ((la = new $3Dmol.Vector3()
                              .addVectors(qa, xa)
                              .multiplyScalar(0.5)),
                            (Ba = new $3Dmol.Vector3()
                              .addVectors(ra, ya)
                              .multiplyScalar(0.5)),
                            (mp3 = new $3Dmol.Vector3()
                              .addVectors(pa, Da)
                              .multiplyScalar(0.5)),
                            W.clickable &&
                              ((cylinder1a = new $3Dmol.Cylinder(
                                qa.clone(),
                                la.clone(),
                                ca
                              )),
                              (cylinder1b = new $3Dmol.Cylinder(
                                ra.clone(),
                                Ba.clone(),
                                ca
                              )),
                              (cylinder1c = new $3Dmol.Cylinder(
                                pa.clone(),
                                mp3.clone(),
                                ca
                              )),
                              W.intersectionShape.cylinder.push(cylinder1a),
                              W.intersectionShape.cylinder.push(cylinder1b),
                              W.intersectionShape.cylinder.push(cylinder1c)),
                            fa.clickable &&
                              ((cylinder2a = new $3Dmol.Cylinder(
                                xa.clone(),
                                la.clone(),
                                ca
                              )),
                              (cylinder2b = new $3Dmol.Cylinder(
                                ya.clone(),
                                Ba.clone(),
                                ca
                              )),
                              (cylinder2c = new $3Dmol.Cylinder(
                                Da.clone(),
                                mp3.clone(),
                                ca
                              )),
                              fa.intersectionShape.cylinder.push(cylinder2a),
                              fa.intersectionShape.cylinder.push(cylinder2b),
                              fa.intersectionShape.cylinder.push(cylinder2c)));
                      }
                    }
                  }
                }
                for (
                  var ub = !1, vb = 0, Fb = !1, na = 0;
                  na < W.bonds.length;
                  na++
                )
                  (fb = Db),
                    W.bondStyles &&
                      W.bondStyles[na] &&
                      ((Ca = W.bondStyles[na]),
                      Ca.singleBond && (fb = !0),
                      Ca.radius && Ca.radius != cb && (Fb = !0)),
                    (fb || 1 == W.bondOrder[na]) && vb++;
                Fb
                  ? 0 < vb && (ub = !0)
                  : 0 == vb && 0 < W.bonds.length && (ub = !0);
                ub && ((wa = cb), $3Dmol.GLDraw.drawSphere(ha, W, wa, ma));
              }
            }
            "undefined" === typeof T.style.cartoon ||
              T.style.cartoon.hidden ||
              ("spectrum" !== T.style.cartoon.color ||
                "number" !== typeof T.resi ||
                T.hetflag ||
                (T.resi < Q[0] && (Q[0] = T.resi),
                T.resi > Q[1] && (Q[1] = T.resi)),
              c.push(T));
          }
        }
        if (0 < c.length) {
          var Gb = null;
          Q[0] < Q[1] && (Gb = new $3Dmol.Gradient.Sinebow(Q[0], Q[1]));
          $3Dmol.drawCartoon(d, c, Gb);
        }
        if (0 < C.vertices) {
          var wb = new $3Dmol.MeshLambertMaterial({
            ambient: 0,
            vertexColors: !0,
            reflectivity: 0
          });
          1 > S.sphere &&
            0 <= S.sphere &&
            ((wb.transparent = !0), (wb.opacity = S.sphere));
          C.initTypedArrays();
          var Ob = new $3Dmol.Mesh(C, wb);
          d.add(Ob);
        }
        if (0 < m.vertices) {
          var Pb = new $3Dmol.ImposterMaterial({
            ambient: 0,
            vertexColors: !0,
            reflectivity: 0
          });
          m.initTypedArrays();
          var Qb = new $3Dmol.Mesh(m, Pb);
          console.log("spherei geometry " + m.vertices.length);
          d.add(Qb);
        }
        if (0 < s.vertices) {
          var kb = new $3Dmol.MeshLambertMaterial({
            vertexColors: !0,
            ambient: 0,
            reflectivity: 0
          });
          1 > S.stick &&
            0 <= S.stick &&
            ((kb.transparent = !0), (kb.opacity = S.stick));
          s.initTypedArrays();
          kb.wireframe && s.setUpWireframe();
          var Rb = new $3Dmol.Mesh(s, kb);
          d.add(Rb);
        }
        for (w in l)
          if (l.hasOwnProperty(w)) {
            var xb = w,
              yb = new $3Dmol.LineBasicMaterial({
                linewidth: xb,
                vertexColors: !0
              });
            1 > S.line &&
              0 <= S.line &&
              ((yb.transparent = !0), (yb.opacity = S.line));
            l[w].initTypedArrays();
            var Sb = new $3Dmol.Line(l[w], yb, $3Dmol.LinePieces);
            d.add(Sb);
          }
        for (w in u)
          if (u.hasOwnProperty(w)) {
            var xb = w,
              zb = new $3Dmol.LineBasicMaterial({
                linewidth: xb,
                vertexColors: !0
              });
            1 > S.cross &&
              0 <= S.cross &&
              ((zb.transparent = !0), (zb.opacity = S.cross));
            u[w].initTypedArrays();
            var Tb = new $3Dmol.Line(u[w], zb, $3Dmol.LinePieces);
            d.add(Tb);
          }
        if (f && e.symmetries && 0 < e.symmetries.length) {
          var Hb = new $3Dmol.Object3D(),
            lb;
          for (lb = 0; lb < e.symmetries.length; lb++) {
            var mb = new $3Dmol.Object3D(),
              mb = d.clone();
            mb.matrix.copy(e.symmetries[lb]);
            mb.matrixAutoUpdate = !1;
            Hb.add(mb);
          }
          h = Hb;
        } else h = d;
        t && (a.remove(t), (t = null));
        t = h.clone();
        x && (t.setVisible(!1), h.setVisible(!1));
        a.add(t);
      }
    };
    this.removegl = function(a) {
      t &&
        (void 0 !== t.geometry && t.geometry.dispose(),
        void 0 !== t.material && t.material.dispose(),
        a.remove(t),
        (t = null));
      h = null;
    };
    this.hide = function() {
      x = !0;
      t && t.setVisible(!1);
      h && h.setVisible(!1);
    };
    this.show = function() {
      x = !1;
      t && t.setVisible(!0);
      h && h.setVisible(!0);
    };
    this.addResLabels = function(a, b, h) {
      var d = this.selectedAtoms(a, d);
      a = {};
      for (var e = 0; e < d.length; e++) {
        var f = d[e],
          c = f.chain,
          g = f.resn + "" + f.resi;
        a[c] || (a[c] = {});
        a[c][g] || (a[c][g] = []);
        a[c][g].push(f);
      }
      h = $.extend(!0, {}, h);
      for (c in a)
        if (a.hasOwnProperty(c)) {
          var t = a[c];
          for (g in t)
            if (t.hasOwnProperty(g)) {
              for (
                var d = t[g], l = new $3Dmol.Vector3(0, 0, 0), e = 0;
                e < d.length;
                e++
              )
                (f = d[e]), (l.x += f.x), (l.y += f.y), (l.z += f.z);
              l.divideScalar(d.length);
              h.position = l;
              b.addLabel(g, h);
            }
        }
    };
  }
  var b = { line: {} },
    c = {
      H: 1.2,
      Li: 1.82,
      LI: 1.82,
      Na: 2.27,
      NA: 2.27,
      K: 2.75,
      C: 1.7,
      N: 1.55,
      O: 1.52,
      F: 1.47,
      P: 1.8,
      S: 1.8,
      CL: 1.75,
      Cl: 1.75,
      BR: 1.85,
      Br: 1.85,
      SE: 1.9,
      Se: 1.9,
      ZN: 1.39,
      Zn: 1.39,
      CU: 1.4,
      Cu: 1.4,
      NI: 1.63,
      Ni: 1.63
    },
    m = "resn x y z color surfaceColor elem hetflag chain resi icode rescode serial atom bonds ss singleBonds bondOrder properties b pdbline clickable callback invert"
      .split(" ")
      .concat("model bonds predicate invert byres expand within".split(" ")),
    s = ["line", "cross", "stick", "sphere", "cartoon"];
  a.parseMolData = function(a, b, c) {
    b = b || "";
    if (!a) return [];
    if (/\.gz$/.test(b)) {
      b = b.replace(/\.gz$/, "");
      try {
        a = pako.inflate(a, { to: "string" });
      } catch (d) {
        console.log(d);
      }
    }
    "undefined" == typeof $3Dmol.Parsers[b] &&
      ((b = b.split(".").pop()),
      "undefined" == typeof $3Dmol.Parsers[b] &&
        (console.log("Unknown format: " + b),
        (b = a.match(/^@<TRIPOS>MOLECULE/gm)
          ? "mol2"
          : a.match(/^HETATM/gm) || a.match(/^ATOM/gm)
          ? "pdb"
          : a.match(/^.*\n.*\n.\s*(\d+)\s+(\d+)/gm)
          ? "sdf"
          : "xyz"),
        console.log("Best guess: " + b)));
    return (0, $3Dmol.Parsers[b])(a, c);
  };
  a.setAtomDefaults = function(a, c) {
    for (var m = 0; m < a.length; m++) {
      var d = a[m];
      d &&
        ((d.style = d.style || b),
        (d.color = d.color || ElementColors[d.elem] || defaultColor),
        (d.model = c),
        d.clickable &&
          (d.intersectionShape = {
            sphere: [],
            cylinder: [],
            line: [],
            triangle: []
          }));
    }
  };
  return a;
})();
$3Dmol.GLShape = (function() {
  function a(a) {
    a = a || {};
    $3Dmol.ShapeIDCount++;
    this.boundingSphere = new $3Dmol.Sphere();
    this.intersectionShape = {
      sphere: [],
      cylinder: [],
      line: [],
      triangle: []
    };
    m(this, a);
    var B = [],
      w = null,
      z = null,
      d = new $3Dmol.Geometry(!0),
      x = new $3Dmol.Geometry(!0);
    this.updateStyle = function(b) {
      for (var d in b) a[d] = b[d];
      m(this, a);
    };
    this.addCustom = function(a) {
      a.vertexArr = a.vertexArr || [];
      a.faceArr = a.faceArr || [];
      a.normalArr = a.normalArr || [];
      b(this, d, a);
    };
    this.addSphere = function(a) {
      a.center = a.center || { x: 0, y: 0, z: 0 };
      a.radius = a.radius ? $3Dmol.Math.clamp(a.radius, 0, Infinity) : 1.5;
      a.color = $3Dmol.CC.color(a.color);
      this.intersectionShape.sphere.push(new $3Dmol.Sphere(a.center, a.radius));
      var b = d.addGeoGroup();
      $3Dmol.GLDraw.drawSphere(d, a.center, a.radius, a.color);
      b.truncateArrayBuffers(!0, !0);
      B.push({
        id: b.id,
        geoGroup: b,
        centroid: new $3Dmol.Vector3(a.center.x, a.center.y, a.center.z)
      });
      c(this.boundingSphere, B, b.vertexArray);
    };
    this.addCylinder = function(a) {
      a.start = a.start || {};
      a.end = a.end || {};
      var b = new $3Dmol.Vector3(
          a.start.x || 0,
          a.start.y || 0,
          a.start.z || 0
        ),
        l = new $3Dmol.Vector3(a.end.x, a.end.y || 0, a.end.z || 0);
      "undefined" == typeof l.x && (l.x = 3);
      var e = a.radius || 0.1,
        x = $3Dmol.CC.color(a.color);
      this.intersectionShape.cylinder.push(new $3Dmol.Cylinder(b, l, e));
      var f = d.addGeoGroup();
      $3Dmol.GLDraw.drawCylinder(d, b, l, e, x, a.fromCap, a.toCap);
      f.truncateArrayBuffers(!0, !0);
      a = new $3Dmol.Vector3();
      B.push({
        id: f.id,
        geoGroup: f,
        centroid: a.addVectors(b, l).multiplyScalar(0.5)
      });
      c(this.boundingSphere, B, f.vertexArray);
    };
    this.addLine = function(a) {
      a.start = a.start || {};
      a.end = a.end || {};
      var b = new $3Dmol.Vector3(
          a.start.x || 0,
          a.start.y || 0,
          a.start.z || 0
        ),
        c = new $3Dmol.Vector3(a.end.x, a.end.y || 0, a.end.z || 0);
      "undefined" == typeof c.x && (c.x = 3);
      a = d.addGeoGroup();
      var e = a.vertices,
        x = 3 * e,
        f = a.vertexArray;
      f[x] = b.x;
      f[x + 1] = b.y;
      f[x + 2] = b.z;
      f[x + 3] = c.x;
      f[x + 4] = c.y;
      f[x + 5] = c.z;
      a.vertices += 2;
      b = a.lineArray;
      c = a.lineidx;
      b[c] = e;
      b[c + 1] = e + 1;
      a.lineidx += 2;
      a.truncateArrayBuffers(!0, !0);
    };
    this.addArrow = function(a) {
      a.start = a.start || {};
      a.end = a.end || {};
      a.start = new $3Dmol.Vector3(
        a.start.x || 0,
        a.start.y || 0,
        a.start.z || 0
      );
      if (a.dir instanceof $3Dmol.Vector3 && a.length instanceof number) {
        var b = a.dir
          .clone()
          .multiplyScalar(a.length)
          .add(start);
        a.end = b;
      } else
        (a.end = new $3Dmol.Vector3(a.end.x, a.end.y || 0, a.end.z || 0)),
          "undefined" == typeof a.end.x && (a.end.x = 3);
      a.radius = a.radius || 0.1;
      a.radiusRatio = a.radiusRatio || 1.618034;
      a.mid = 0 < a.mid && 1 > a.mid ? a.mid : 0.618034;
      b = d.addGeoGroup();
      var l = a.start,
        e = a.end,
        x = a.radius,
        f = a.radiusRatio,
        C = a.mid;
      if (l && e) {
        var u = e.clone();
        u.sub(l).multiplyScalar(C);
        var q = l.clone().add(u),
          C = u.clone().negate();
        this.intersectionShape.cylinder.push(
          new $3Dmol.Cylinder(l.clone(), q.clone(), x)
        );
        this.intersectionShape.sphere.push(new $3Dmol.Sphere(l.clone(), x));
        var g = [];
        g[0] = u.clone();
        1e-4 < Math.abs(g[0].x) ? (g[0].y += 1) : (g[0].x += 1);
        g[0].cross(u);
        g[0].normalize();
        g[0] = g[0];
        g[4] = g[0].clone();
        g[4].crossVectors(g[0], u);
        g[4].normalize();
        g[8] = g[0].clone().negate();
        g[12] = g[4].clone().negate();
        g[2] = g[0]
          .clone()
          .add(g[4])
          .normalize();
        g[6] = g[4]
          .clone()
          .add(g[8])
          .normalize();
        g[10] = g[8]
          .clone()
          .add(g[12])
          .normalize();
        g[14] = g[12]
          .clone()
          .add(g[0])
          .normalize();
        g[1] = g[0]
          .clone()
          .add(g[2])
          .normalize();
        g[3] = g[2]
          .clone()
          .add(g[4])
          .normalize();
        g[5] = g[4]
          .clone()
          .add(g[6])
          .normalize();
        g[7] = g[6]
          .clone()
          .add(g[8])
          .normalize();
        g[9] = g[8]
          .clone()
          .add(g[10])
          .normalize();
        g[11] = g[10]
          .clone()
          .add(g[12])
          .normalize();
        g[13] = g[12]
          .clone()
          .add(g[14])
          .normalize();
        g[15] = g[14]
          .clone()
          .add(g[0])
          .normalize();
        var m = b.vertices,
          z = b.vertexArray,
          s = b.faceArray,
          w = b.normalArray,
          p = b.lineArray,
          y,
          L,
          O;
        L = 0;
        for (O = g.length; L < O; ++L) {
          y = 3 * (m + 3 * L);
          var J = g[L].clone()
              .multiplyScalar(x)
              .add(l),
            H = g[L].clone()
              .multiplyScalar(x)
              .add(q),
            K = g[L].clone()
              .multiplyScalar(x * f)
              .add(q);
          z[y] = J.x;
          z[y + 1] = J.y;
          z[y + 2] = J.z;
          z[y + 3] = H.x;
          z[y + 4] = H.y;
          z[y + 5] = H.z;
          z[y + 6] = K.x;
          z[y + 7] = K.y;
          z[y + 8] = K.z;
          0 < L &&
            ((y = new $3Dmol.Vector3(z[y - 3], z[y - 2], z[y - 1])),
            (J = e.clone()),
            (H = q.clone()),
            (K = new $3Dmol.Vector3(K.x, K.y, K.z)),
            this.intersectionShape.triangle.push(new $3Dmol.Triangle(K, J, y)),
            this.intersectionShape.triangle.push(
              new $3Dmol.Triangle(y.clone(), H, K.clone())
            ));
        }
        b.vertices += 48;
        y = 3 * b.vertices;
        z[y] = l.x;
        z[y + 1] = l.y;
        z[y + 2] = l.z;
        z[y + 3] = q.x;
        z[y + 4] = q.y;
        z[y + 5] = q.z;
        z[y + 6] = e.x;
        z[y + 7] = e.y;
        z[y + 8] = e.z;
        b.vertices += 3;
        var M,
          P,
          U,
          N,
          S,
          Q,
          T,
          R,
          X = b.vertices - 3,
          Z = b.vertices - 2,
          Y = b.vertices - 1,
          aa = 3 * X,
          F = 3 * Z,
          ba = 3 * Y;
        L = 0;
        for (O = g.length - 1; L < O; ++L)
          (M = m + 3 * L),
            (l = b.faceidx),
            (e = b.lineidx),
            (x = M),
            (y = 3 * x),
            (f = M + 1),
            (J = 3 * f),
            (q = M + 2),
            (H = 3 * q),
            (z = M + 4),
            (P = 3 * z),
            (K = M + 5),
            (U = 3 * K),
            (M += 3),
            (N = 3 * M),
            (S = Q = g[L]),
            (T = R = g[L + 1]),
            (w[y] = S.x),
            (w[J] = Q.x),
            (w[N] = R.x),
            (w[y + 1] = S.y),
            (w[J + 1] = Q.y),
            (w[N + 1] = R.y),
            (w[y + 2] = S.z),
            (w[J + 2] = Q.z),
            (w[N + 2] = R.z),
            (w[J] = Q.x),
            (w[P] = T.x),
            (w[N] = R.x),
            (w[J + 1] = Q.y),
            (w[P + 1] = T.y),
            (w[N + 1] = R.y),
            (w[J + 2] = Q.z),
            (w[P + 2] = T.z),
            (w[N + 2] = R.z),
            (w[H] = Q.x),
            (w[U] = T.x),
            (w[H + 1] = Q.y),
            (w[U + 1] = T.y),
            (w[H + 2] = Q.z),
            (w[U + 2] = T.z),
            (s[l] = x),
            (s[l + 1] = f),
            (s[l + 2] = M),
            (s[l + 3] = f),
            (s[l + 4] = z),
            (s[l + 5] = M),
            (s[l + 6] = x),
            (s[l + 7] = M),
            (s[l + 8] = X),
            (s[l + 9] = q),
            (s[l + 10] = Z),
            (s[l + 11] = K),
            (s[l + 12] = q),
            (s[l + 13] = Y),
            (s[l + 14] = K),
            (p[e] = x),
            (p[e + 1] = f),
            (p[e + 2] = x),
            (p[e + 3] = M),
            (p[e + 4] = z),
            (p[e + 5] = M),
            (p[e + 6] = x),
            (p[e + 7] = M),
            (p[e + 8] = q),
            (p[e + 9] = f),
            (p[e + 10] = q),
            (p[e + 11] = K),
            (p[e + 12] = z),
            (p[e + 13] = K),
            (p[e + 14] = q),
            (p[e + 15] = Y),
            (p[e + 16] = q),
            (p[e + 17] = K),
            (p[e + 18] = Y),
            (p[e + 19] = K),
            (b.faceidx += 15),
            (b.lineidx += 20);
        m = [m + 45, m + 46, m + 1, m, m + 47, m + 2];
        l = b.faceidx;
        e = b.lineidx;
        x = m[0];
        y = 3 * x;
        f = m[1];
        J = 3 * f;
        q = m[4];
        H = 3 * q;
        z = m[2];
        P = 3 * z;
        K = m[5];
        U = 3 * K;
        M = m[3];
        N = 3 * M;
        S = Q = g[15];
        T = R = g[0];
        w[y] = S.x;
        w[J] = Q.x;
        w[N] = R.x;
        w[y + 1] = S.y;
        w[J + 1] = Q.y;
        w[N + 1] = R.y;
        w[y + 2] = S.z;
        w[J + 2] = Q.z;
        w[N + 2] = R.z;
        w[J] = Q.x;
        w[P] = T.x;
        w[N] = R.x;
        w[J + 1] = Q.y;
        w[P + 1] = T.y;
        w[N + 1] = R.y;
        w[J + 2] = Q.z;
        w[P + 2] = T.z;
        w[N + 2] = R.z;
        w[H] = Q.x;
        w[U] = T.x;
        w[H + 1] = Q.y;
        w[U + 1] = T.y;
        w[H + 2] = Q.z;
        w[U + 2] = T.z;
        u.normalize();
        C.normalize();
        w[aa] = C.x;
        w[F] = w[ba] = u.x;
        w[aa + 1] = C.y;
        w[F + 1] = w[ba + 1] = u.y;
        w[aa + 2] = C.z;
        w[F + 2] = w[ba + 2] = u.z;
        s[l] = x;
        s[l + 1] = f;
        s[l + 2] = M;
        s[l + 3] = f;
        s[l + 4] = z;
        s[l + 5] = M;
        s[l + 6] = x;
        s[l + 7] = M;
        s[l + 8] = X;
        s[l + 9] = q;
        s[l + 10] = Z;
        s[l + 11] = K;
        s[l + 12] = q;
        s[l + 13] = Y;
        s[l + 14] = K;
        p[e] = x;
        p[e + 1] = f;
        p[e + 2] = x;
        p[e + 3] = M;
        p[e + 4] = z;
        p[e + 5] = M;
        p[e + 6] = x;
        p[e + 7] = M;
        p[e + 8] = q;
        p[e + 9] = f;
        p[e + 10] = q;
        p[e + 11] = K;
        p[e + 12] = z;
        p[e + 13] = K;
        p[e + 14] = q;
        p[e + 15] = Y;
        p[e + 16] = q;
        p[e + 17] = K;
        p[e + 18] = Y;
        p[e + 19] = K;
        b.faceidx += 15;
        b.lineidx += 20;
      }
      b.truncateArrayBuffers(!0, !0);
      u = new $3Dmol.Vector3();
      B.push({
        id: b.id,
        geoGroup: b,
        centroid: u.addVectors(a.start, a.end).multiplyScalar(0.5)
      });
      c(this.boundingSphere, B, b.vertexArray);
    };
    this.addIsosurface = function(a, c) {
      var l =
          void 0 !== c.isoval && "number" === typeof c.isoval ? c.isoval : 0,
        e = c.voxel ? !0 : !1,
        x = void 0 === c.smoothness ? 1 : c.smoothness,
        f = a.size.x,
        z = a.size.y,
        u = a.size.z,
        q = new Int16Array(f * z * u),
        g = a.data,
        s,
        m;
      s = 0;
      for (m = q.length; s < m; ++s) q[s] = -1;
      q = new Uint8Array(f * z * u);
      s = 0;
      for (m = g.length; s < m; ++s)
        0 < (0 <= l ? g[s] - l : l - g[s]) && (q[s] |= 2);
      l = [];
      g = [];
      $3Dmol.MarchingCube.march(q, l, g, {
        fulltable: !0,
        voxel: e,
        unitCube: a.unit,
        origin: a.origin,
        nX: f,
        nY: z,
        nZ: u
      });
      e || $3Dmol.MarchingCube.laplacianSmooth(x, l, g);
      b(this, d, {
        vertexArr: l,
        faceArr: g,
        normalArr: [],
        clickable: c.clickable
      });
      this.updateStyle(c);
    };
    this.addVolumetricData = function(a, b, d) {
      a = new $3Dmol.VolumeData(a, b);
      this.addIsosurface(a, d);
    };
    this.globj = function(a) {
      z && (a.remove(z), (z = null));
      if (!this.hidden) {
        d.initTypedArrays();
        var b = this.color;
        b || $3Dmol.CC.color(b);
        d.colorsNeedUpdate = !0;
        var c, e, s;
        b.constructor !== Array && ((c = b.r), (e = b.g), (s = b.b));
        for (var f in d.geometryGroups)
          for (
            var m = d.geometryGroups[f],
              u = m.colorArray,
              q = 0,
              m = m.vertices;
            q < m;
            ++q
          )
            b.constructor === Array &&
              ((s = b[q]), (c = s.r), (e = s.g), (s = s.b)),
              (u[3 * q] = c),
              (u[3 * q + 1] = e),
              (u[3 * q + 2] = s);
        w = new $3Dmol.Object3D();
        b = null;
        b =
          this.side == $3Dmol.DoubleSide
            ? new $3Dmol.MeshDoubleLambertMaterial({
                wireframe: this.wireframe,
                side: this.side,
                transparent: 1 > this.opacity ? !0 : !1,
                opacity: this.opacity,
                wireframeLinewidth: this.linewidth
              })
            : new $3Dmol.MeshLambertMaterial({
                wireframe: this.wireframe,
                side: this.side,
                transparent: 1 > this.opacity ? !0 : !1,
                opacity: this.opacity,
                wireframeLinewidth: this.linewidth
              });
        b = new $3Dmol.Mesh(d, b);
        w.add(b);
        b = new $3Dmol.LineBasicMaterial({
          linewidth: this.linewidth,
          color: this.color
        });
        b = new $3Dmol.Line(x, b, $3Dmol.LinePieces);
        w.add(b);
        z = w.clone();
        a.add(z);
      }
    };
    this.removegl = function(a) {
      z &&
        (void 0 !== z.geometry && z.geometry.dispose(),
        void 0 !== z.material && z.material.dispose(),
        a.remove(z),
        (z = null));
      w = null;
    };
  }
  var b = function(a, b, m) {
      var z = m.faceArr;
      (0 !== m.vertexArr.length && 0 !== z.length) ||
        console.warn(
          "Error adding custom shape component: No vertices and/or face indices supplied!"
        );
      z = m.color;
      "undefined" == typeof z && (z = a.color);
      for (
        var z = $3Dmol.CC.color(z),
          d = $3Dmol.splitMesh(m),
          x = 0,
          h = d.length;
        x < h;
        x++
      ) {
        var t = a,
          l = b,
          e = d[x],
          G = d[x].colorArr ? d[x].colorArr : z,
          f = m.clickable,
          C = l.addGeoGroup(),
          u = e.vertexArr,
          q = e.normalArr,
          e = e.faceArr;
        C.vertices = u.length;
        C.faceidx = e.length;
        var g = void 0,
          E = void 0,
          I = void 0,
          A = void 0,
          D = (E = void 0),
          p = void 0,
          y = C.vertexArray,
          I = C.colorArray;
        if (G.constructor !== Array)
          var L = G.r,
            O = G.g,
            A = G.b;
        D = 0;
        for (p = C.vertices; D < p; ++D)
          (g = 3 * D),
            (E = u[D]),
            (y[g] = E.x),
            (y[g + 1] = E.y),
            (y[g + 2] = E.z),
            G.constructor === Array &&
              ((E = G[D]), (L = E.r), (O = E.g), (A = E.b)),
            (I[g] = L),
            (I[g + 1] = O),
            (I[g + 2] = A);
        C.truncateArrayBuffers(!0, !0);
        if (f)
          for (D = 0, p = C.faceidx / 3; D < p; ++D) {
            var g = 3 * D,
              I = e[g],
              A = e[g + 1],
              E = e[g + 2],
              g = new $3Dmol.Vector3(),
              G = new $3Dmol.Vector3(),
              J = new $3Dmol.Vector3();
            t.intersectionShape.triangle.push(
              new $3Dmol.Triangle(g.copy(u[I]), G.copy(u[A]), J.copy(u[E]))
            );
          }
        if (f) {
          D = new $3Dmol.Vector3(0, 0, 0);
          for (O = p = 0; O < l.geometryGroups.length; O++)
            D.add(l.geometryGroups[O].getCentroid()), p++;
          D.divideScalar(p);
          c(t.boundingSphere, { centroid: D }, y);
        }
        C.faceArray = new Uint16Array(e);
        C.truncateArrayBuffers(!0, !0);
        if (q.length < C.vertices) C.setNormals();
        else
          for (
            t = C.normalArray = new Float32Array(3 * C.vertices),
              l = void 0,
              D = 0,
              p = C.vertices;
            D < p;
            ++D
          )
            (g = 3 * D),
              (l = q[D]),
              (t[g] = l.x),
              (t[g + 1] = l.y),
              (t[g + 2] = l.z);
        C.setLineIndices();
        C.lineidx = C.lineArray.length;
      }
    },
    c = function(a, b, c) {
      a.center.set(0, 0, 0);
      var m, d;
      if (0 < b.length) {
        m = 0;
        for (d = b.length; m < d; ++m) a.center.add(b[m].centroid);
        a.center.divideScalar(b.length);
      }
      b = a.radius * a.radius;
      m = 0;
      for (d = c.length / 3; m < d; m++) {
        var x = a.center.distanceToSquared({
          x: c[3 * m],
          y: c[3 * m + 1],
          z: c[3 * m + 2]
        });
        b = Math.max(b, x);
      }
      a.radius = Math.sqrt(b);
    },
    m = function(a, b) {
      a.color = b.color || new $3Dmol.Color();
      b.color instanceof $3Dmol.Color || (a.color = $3Dmol.CC.color(b.color));
      a.wireframe = b.wireframe ? !0 : !1;
      a.opacity = b.alpha ? $3Dmol.Math.clamp(b.alpha, 0, 1) : 1;
      "undefined" != typeof b.opacity &&
        (a.opacity = $3Dmol.Math.clamp(b.opacity, 0, 1));
      a.side = void 0 !== b.side ? b.side : $3Dmol.DoubleSide;
      a.linewidth = "undefined" == typeof b.linewidth ? 1 : b.linewidth;
      a.clickable = b.clickable ? !0 : !1;
      a.callback = "function" === typeof b.callback ? b.callback : null;
      a.hidden = b.hidden;
    };
  Object.defineProperty(a.prototype, "position", {
    get: function() {
      return this.boundingSphere.center;
    }
  });
  Object.defineProperty(a.prototype, "x", {
    get: function() {
      return this.boundingSphere.center.x;
    }
  });
  Object.defineProperty(a.prototype, "y", {
    get: function() {
      return this.boundingSphere.center.y;
    }
  });
  Object.defineProperty(a.prototype, "z", {
    get: function() {
      return this.boundingSphere.center.z;
    }
  });
  return a;
})();
$3Dmol.ShapeIDCount = 0;
$3Dmol.splitMesh = function(a) {
  if (64e3 > a.vertexArr.length) return [a];
  var b = [{ vertexArr: [], normalArr: [], faceArr: [] }];
  a.colorArr && (b.colorArr = []);
  for (
    var c = [], m = [], s = 0, B = a.faceArr, w = 0, z = B.length;
    w < z;
    w += 3
  ) {
    for (var d = b[s], x = 0; 3 > x; x++) {
      var h = B[w + x];
      c[h] !== s &&
        ((c[h] = s),
        (m[h] = d.vertexArr.length),
        d.vertexArr.push(a.vertexArr[h]),
        a.normalArr && a.normalArr[h] && d.normalArr.push(a.normalArr[h]),
        a.colorArr && a.colorArr[h] && d.colorArr.push(a.colorArr[h]));
      d.faceArr.push(m[h]);
    }
    64e3 <= d.vertexArr.length &&
      (b.push({ vertexArr: [], normalArr: [], faceArr: [] }),
      a.colorArr && (b.colorArr = []),
      s++);
  }
  return b;
};
$3Dmol.GLViewer = (function() {
  return function(a, b) {
    function c(a) {
      var b = [];
      "undefined" === typeof a && (a = {});
      var d = [],
        f;
      if ("undefined" === typeof a.model)
        for (f = 0; f < e.length; f++) e[f] && d.push(e[f]);
      else (d = a.model), $.isArray(d) || (d = [d]);
      for (f = 0; f < d.length; f++) b = b.concat(d[f].selectedAtoms(a));
      return b;
    }
    function m(a, b, d, f) {
      var c = [];
      if ("undefined" === typeof b.model)
        for (h = 0; h < e.length; h++) e[h] && c.push(e[h]);
      else (c = b.model), $.isArray(c) || (c = [c]);
      for (var h = 0; h < c.length; h++) if (c[h]) c[h][a](b, d, f);
    }
    function s(a) {
      var b = new $3Dmol.MeshLambertMaterial();
      b.vertexColors = $3Dmol.VertexColors;
      for (var d in a)
        "color" !== d && "map" !== d && a.hasOwnProperty(d) && (b[d] = a[d]);
      void 0 !== a.opacity && (b.transparent = 1 === a.opacity ? !1 : !0);
      return b;
    }
    b = b || {};
    var B = b.callback,
      w = b.defaultcolors;
    w || (w = $3Dmol.elementColors.defaultColors);
    var z = b.nomouse,
      d = 0;
    void 0 != typeof b.backgroundColor &&
      (d = $3Dmol.CC.color(b.backgroundColor).getHex());
    var x = 0;
    void 0 != typeof b.camerax && (x = parseFloat(b.camerax));
    var h = this,
      t = a,
      l = null,
      e = [],
      G = {},
      f = [],
      C = [],
      u = [],
      q = t.width(),
      g = t.height(),
      E = q / g,
      I = [],
      A = new $3Dmol.Renderer({
        antialias: !0,
        preserveDrawingBuffer: !0,
        premultipliedAlpha: !1
      });
    A.domElement.style.width = "100%";
    A.domElement.style.height = "100%";
    A.domElement.style.padding = "0";
    A.domElement.style.position = "absolute";
    A.domElement.style.top = "0px";
    A.domElement.style.left = "0px";
    A.domElement.style.zIndex = "0";
    var D = new $3Dmol.Camera(20, E, 1, 800);
    D.position = new $3Dmol.Vector3(x, 0, 150);
    var p = new $3Dmol.Vector3();
    D.lookAt(p);
    var y = new $3Dmol.Raycaster(
        new $3Dmol.Vector3(0, 0, 0),
        new $3Dmol.Vector3(0, 0, 0)
      ),
      L = new $3Dmol.Projector(),
      O = new $3Dmol.Vector3(0, 0, 0),
      J = null,
      H = null,
      K = null,
      M = -50,
      P = 50,
      U = new $3Dmol.Quaternion(0, 0, 0, 1),
      N = new $3Dmol.Quaternion(0, 0, 0, 1),
      S = !1,
      Q = !1,
      T = 0,
      R = 0,
      X = 0,
      Z = 0,
      Y = 0,
      aa = 0,
      F = 0,
      ba = function() {
        var a = 0;
        for (i in G) G.hasOwnProperty(i) && i > a && (a = i);
        return a + 1;
      },
      V = function(a) {
        if (J) {
          var b = D.position.z - H.position.z;
          1 > b && (b = 1);
          D.near = b + M;
          1 > D.near && (D.near = 1);
          D.far = b + P;
          D.near + 1 > D.far && (D.far = D.near + 1);
          D instanceof $3Dmol.Camera
            ? (D.fov = 20)
            : ((D.right = b * Math.tan((Math.PI / 180) * 20)),
              (D.left = -D.right),
              (D.top = D.right / E),
              (D.bottom = -D.top));
          D.updateProjectionMatrix();
          J.fog.near = D.near + 0.4 * (D.far - D.near);
          J.fog.far = D.far;
          A.render(J, D);
          if (!a && 0 < I.length)
            for (a = h.getView(), b = 0; b < I.length; b++) I[b].setView(a, !0);
        }
      };
    (function() {
      J = new $3Dmol.Scene();
      J.fog = new $3Dmol.Fog(d, 100, 200);
      K = new $3Dmol.Object3D();
      H = new $3Dmol.Object3D();
      H.useQuaternion = !0;
      H.quaternion = new $3Dmol.Quaternion(0, 0, 0, 1);
      H.add(K);
      J.add(H);
      var a = new $3Dmol.Light(16777215);
      a.position = new $3Dmol.Vector3(0.2, 0.2, 1).normalize();
      a.intensity = 1;
      J.add(a);
    })();
    A.setClearColorHex(d, 1);
    J.fog.color = $3Dmol.CC.color(d);
    var da = function(a) {
        var b =
          a.originalEvent.targetTouches[0].pageX -
          a.originalEvent.targetTouches[1].pageX;
        a =
          a.originalEvent.targetTouches[0].pageY -
          a.originalEvent.targetTouches[1].pageY;
        return Math.sqrt(b * b + a * a);
      },
      ta = function(a) {
        var b = a.pageX,
          d = a.pageY;
        a.originalEvent.targetTouches && a.originalEvent.targetTouches[0]
          ? ((b = a.originalEvent.targetTouches[0].pageX),
            (d = a.originalEvent.targetTouches[0].pageY))
          : a.originalEvent.changedTouches &&
            a.originalEvent.changedTouches[0] &&
            ((b = a.originalEvent.changedTouches[0].pageX),
            (d = a.originalEvent.changedTouches[0].pageY));
        return [b, d];
      };
    $("body").bind("mouseup touchend", function(a) {
      if (Q && J) {
        var b = ta(a),
          d = b[0],
          b = b[1];
        if (d == T && b == R) {
          var e = $("canvas", t).offset(),
            d = ((d - e.left) / q) * 2 - 1,
            b = 2 * -((b - e.top) / g) + 1;
          0 != u.length &&
            (O.set(d, b, -1),
            L.unprojectVector(O, D),
            O.sub(D.position).normalize(),
            y.set(D.position, O),
            (d = []),
            (d = y.intersectObjects(K, u)),
            d.length &&
              ((d = d[0].clickable),
              void 0 !== d.callback &&
                "function" === typeof d.callback &&
                d.callback(d, h, a, t)));
        }
      }
      Q = !1;
    });
    var Pa = (this._handleMouseDown = function(a) {
        a.preventDefault();
        if (J) {
          var b = ta(a),
            d = b[0],
            b = b[1];
          void 0 !== d &&
            ((Q = !0),
            (mouseButton = a.which),
            (T = d),
            (R = b),
            (X = 0),
            a.originalEvent.targetTouches &&
              2 == a.originalEvent.targetTouches.length &&
              (X = da(a)),
            (U = H.quaternion),
            (Y = H.position.z),
            (Z = K.position.clone()),
            (aa = M),
            (F = P));
        }
      }),
      za = (this._handleMouseScroll = function(a) {
        a.preventDefault();
        if (J) {
          var b = 0.85 * (150 - H.position.z);
          a.originalEvent.detail
            ? (H.position.z += (b * a.originalEvent.detail) / 10)
            : a.originalEvent.wheelDelta &&
              (H.position.z -= (b * a.originalEvent.wheelDelta) / 400);
          150 < H.position.z && (H.position.z = 149.85);
          V();
        }
      }),
      La = (this._handleMouseMove = function(a) {
        q = t.width();
        g = t.height();
        a.preventDefault();
        if (J && Q) {
          var b = 0,
            d = ta(a),
            e = d[0],
            d = d[1];
          if (void 0 !== e) {
            var f = (e - T) / q,
              c = (d - R) / g;
            0 != X &&
            a.originalEvent.targetTouches &&
            2 == a.originalEvent.targetTouches.length
              ? ((c = da(a)), (b = 2), (c = (2 * (X - c)) / (q + g)))
              : a.originalEvent.targetTouches &&
                3 == a.originalEvent.targetTouches.length &&
                (b = 1);
            var h = Math.sqrt(f * f + c * c);
            3 == b || (3 == mouseButton && a.ctrlKey)
              ? ((M = aa + 100 * f), (P = F + 100 * c))
              : 2 == b || 3 == mouseButton || a.shiftKey
              ? ((a = 0.85 * (150 - H.position.z)),
                80 > a && (a = 80),
                (H.position.z = Y - c * a),
                150 < H.position.z && (H.position.z = 149.85))
              : 1 == b || 2 == mouseButton || a.ctrlKey
              ? ((a = (e - T) / q),
                (b = (d - R) / g),
                (e = H.quaternion),
                (d = new $3Dmol.Vector3(0, 0, H.position.z)),
                L.projectVector(d, D),
                (d.x += 2 * a),
                (d.y -= 2 * b),
                L.unprojectVector(d, D),
                (d.z = 0),
                d.applyQuaternion(e),
                K.position.addVectors(Z, d))
              : (0 !== b && 1 != mouseButton) ||
                0 === h ||
                ((a = Math.sin(h * Math.PI) / h),
                (N.x = Math.cos(h * Math.PI)),
                (N.y = 0),
                (N.z = a * f),
                (N.w = -a * c),
                (H.quaternion = new $3Dmol.Quaternion(1, 0, 0, 0)),
                H.quaternion.multiply(N),
                H.quaternion.multiply(U));
            V();
          }
        }
      }),
      ga = function(a) {
        t = a;
        q = t.width();
        g = t.height();
        E = q / g;
        A.setSize(q, g);
        t.append(A.domElement);
        l = $(A.domElement);
        z ||
          (l.bind("mousedown touchstart", Pa),
          l.bind("DOMMouseScroll mousewheel", za),
          l.bind("mousemove touchmove", La),
          l.bind("contextmenu", function(a) {
            a.preventDefault();
          }));
      };
    ga(t);
    this.setContainer = function(a) {
      "string" === $.type(a) && (a = $("#" + a));
      a || (a = t);
      ga(a);
    };
    this.setBackgroundColor = function(a, b) {
      if ("undefined" == typeof b) b = 1;
      else if (0 > b || 1 < b) b = 1;
      var e = $3Dmol.CC.color(a);
      J.fog.color = e;
      d = e.getHex();
      A.setClearColorHex(e.getHex(), b);
      V();
    };
    this.setViewStyle = function(a) {
      if ("outline" === a.style) {
        var b = {};
        a.color && (b.color = $3Dmol.CC.color(a.color));
        a.width && (b.width = a.width);
        A.enableOutline(b);
      } else A.disableOutline();
    };
    b.style && this.setViewStyle(b.style);
    this.setWidth = function(a) {
      q = a || q;
      A.setSize(q, g);
    };
    this.setHeight = function(a) {
      g = a || g;
      A.setSize(q, g);
    };
    this.resize = function() {
      q = t.width();
      g = t.height();
      E = q / g;
      A.setSize(q, g);
      D.aspect = E;
      D.updateProjectionMatrix();
      V();
    };
    $(window).resize(this.resize);
    this.getModel = function(a) {
      a = a || e.length - 1;
      return e[a];
    };
    this.rotate = function(a, b) {
      "undefined" === typeof b && (b = "y");
      var d = 0,
        e = 0,
        f = 0,
        c = (Math.PI * a) / 180,
        h = Math.sin(c / 2),
        c = Math.cos(c / 2);
      "x" == b && (d = h);
      "y" == b && (e = h);
      "z" == b && (f = h);
      d = new $3Dmol.Quaternion(d, e, f, c).normalize();
      H.quaternion.multiply(d);
      V();
    };
    this.getView = function() {
      if (!K) return [0, 0, 0, 0, 0, 0, 0, 1];
      var a = K.position,
        b = H.quaternion;
      return [a.x, a.y, a.z, H.position.z, b.x, b.y, b.z, b.w];
    };
    this.setView = function(a, b) {
      void 0 !== a &&
        (a instanceof Array || 8 !== a.length) &&
        K &&
        H &&
        ((K.position.x = a[0]),
        (K.position.y = a[1]),
        (K.position.z = a[2]),
        (H.position.z = a[3]),
        (H.quaternion.x = a[4]),
        (H.quaternion.y = a[5]),
        (H.quaternion.z = a[6]),
        (H.quaternion.w = a[7]),
        "undefined" != typeof a[8] &&
          ((H.position.x = a[8]), (H.position.y = a[9])),
        V(b));
    };
    this.render = function() {
      u.splice(0, u.length);
      var a, b;
      a = 0;
      for (b = e.length; a < b; a++) {
        var d = e[a];
        d &&
          ((d = d.selectedAtoms({ clickable: !0 })),
          Array.prototype.push.apply(u, d));
      }
      a = 0;
      for (b = f.length; a < b; a++) (d = f[a]) && d.clickable && u.push(d);
      a = this.getView();
      for (b = 0; b < e.length; b++) e[b] && e[b].globj(K);
      for (b = 0; b < f.length; b++) f[b] && f[b].globj(K);
      for (b in G)
        if (G.hasOwnProperty(b))
          for (var c = G[b], d = 0; d < c.length; d++)
            if (c.hasOwnProperty(d)) {
              var h = c[d].geo;
              if (!c[d].finished) {
                h.verticesNeedUpdate = !0;
                h.elementsNeedUpdate = !0;
                h.normalsNeedUpdate = !0;
                h.colorsNeedUpdate = !0;
                h.buffersNeedUpdate = !0;
                h.boundingSphere = null;
                c[d].done && (c[d].finished = !0);
                c[d].lastGL && K.remove(c[d].lastGL);
                var g = null,
                  g =
                    c[d].mat instanceof $3Dmol.LineBasicMaterial
                      ? new $3Dmol.Line(h, c[d].mat)
                      : new $3Dmol.Mesh(h, c[d].mat);
                g.visible =
                  c[d].mat.transparent && 0 == c[d].mat.opacity ? !1 : !0;
                if (
                  1 < c[d].symmetries.length ||
                  (1 == c[d].symmetries.length &&
                    !c[d].symmetries[d].isIdentity())
                ) {
                  for (
                    var l = new $3Dmol.Object3D(), h = 0;
                    h < c[d].symmetries.length;
                    h++
                  ) {
                    var p = g.clone();
                    p.matrix = c[d].symmetries[h];
                    p.matrixAutoUpdate = !1;
                    l.add(p);
                  }
                  c[d].lastGL = l;
                  K.add(l);
                } else (c[d].lastGL = g), K.add(g);
              }
            }
      this.setView(a);
    };
    this.selectedAtoms = function(a) {
      return c(a);
    };
    this.pdbData = function(a) {
      a = c(a);
      for (var b = "", d = 0, e = a.length; d < e; ++d)
        b += a[d].pdbline + "\n";
      return b;
    };
    this.zoom = function(a) {
      H.position.z = 150 - (150 - H.position.z) / (a || 2);
      V();
    };
    this.translate = function(a, b) {
      var d = a / q,
        e = b / g,
        c = new $3Dmol.Vector3(0, 0, -150);
      L.projectVector(c, D);
      c.x -= d;
      c.y -= e;
      L.unprojectVector(c, D);
      c.z = 0;
      p.add(c);
      D.lookAt(p);
      V();
    };
    this.zoomTo = function(a) {
      var b;
      a = a || {};
      var d = c(a),
        e = $3Dmol.getExtent(d);
      $.isEmptyObject(a)
        ? ($.each(f, function(a, b) {
            b &&
              b.boundingSphere &&
              b.boundingSphere.center &&
              d.push(b.boundingSphere.center);
          }),
          (e = $3Dmol.getExtent(d)),
          (a = d),
          (b = e))
        : ((a = c({})), (b = $3Dmol.getExtent(a)));
      a = new $3Dmol.Vector3(e[2][0], e[2][1], e[2][2]);
      K.position = a.clone().multiplyScalar(-1);
      var h = b[1][0] - b[0][0],
        g = b[1][1] - b[0][1];
      b = b[1][2] - b[0][2];
      h = Math.sqrt(h * h + g * g + b * b);
      5 > h && (h = 5);
      M = -h / 1.9;
      P = h / 2;
      h = e[1][0] - e[0][0];
      g = e[1][1] - e[0][1];
      b = e[1][2] - e[0][2];
      h = Math.sqrt(h * h + g * g + b * b);
      5 > h && (h = 5);
      e = 25;
      for (h = 0; h < d.length; h++)
        d[h] && ((g = a.distanceToSquared(d[h])), g > e && (e = g));
      h = 2 * Math.sqrt(e);
      H.position.z = -(
        (0.5 * h) / Math.tan(((Math.PI / 180) * D.fov) / 2) -
        150
      );
      V();
    };
    this.addLabel = function(a, b) {
      var d = new $3Dmol.Label(a, b);
      d.setContext();
      K.add(d.sprite);
      C.push(d);
      V();
      return d;
    };
    this.addResLabels = function(a, b) {
      m("addResLabels", a, this, b);
    };
    this.removeLabel = function(a) {
      for (var b = 0; b < C.length; b++)
        if (C[b] == a) {
          C.splice(b, 1);
          a.dispose();
          K.remove(a.sprite);
          break;
        }
    };
    this.removeAllLabels = function() {
      for (var a = 0; a < C.length; a++) K.remove(C[a].sprite);
      C.splice(0, C.length);
    };
    this.setLabelStyle = function(a, b) {
      K.remove(a.sprite);
      a.dispose();
      a.stylespec = b;
      a.setContext();
      K.add(a.sprite);
      V();
      return a;
    };
    this.setLabelText = function(a, b) {
      K.remove(a.sprite);
      a.dispose();
      a.text = b;
      a.setContext();
      K.add(a.sprite);
      V();
      return a;
    };
    this.addShape = function(a) {
      a = a || {};
      a = new $3Dmol.GLShape(a);
      a.shapePosition = f.length;
      f.push(a);
      return a;
    };
    this.removeShape = function(a) {
      if (a)
        for (
          a.removegl(K), delete f[a.shapePosition];
          0 < f.length && "undefined" === typeof f[f.length - 1];

        )
          f.pop();
    };
    this.removeAllShapes = function() {
      for (var a = 0; a < f.length; a++) f[a].removegl(K);
      f.splice(0, f.length);
    };
    this.addSphere = function(a) {
      a = a || {};
      var b = new $3Dmol.GLShape(a);
      b.shapePosition = f.length;
      b.addSphere(a);
      f.push(b);
      return b;
    };
    this.addArrow = function(a) {
      a = a || {};
      var b = new $3Dmol.GLShape(a);
      b.shapePosition = f.length;
      b.addArrow(a);
      f.push(b);
      return b;
    };
    this.addCylinder = function(a) {
      a = a || {};
      var b = new $3Dmol.GLShape(a);
      b.shapePosition = f.length;
      b.addCylinder(a);
      f.push(b);
      return b;
    };
    this.addLine = function(a) {
      a = a || {};
      a.wireframe = !0;
      var b = new $3Dmol.GLShape(a);
      b.shapePosition = f.length;
      if (a.dashed) {
        a.dashLength = a.dashLength || 0.5;
        a.gapLength = a.gapLength || 0.5;
        a.start = a.start || {};
        a.end = a.end || {};
        var d = new $3Dmol.Vector3(
            a.start.x || 0,
            a.start.y || 0,
            a.start.z || 0
          ),
          e = new $3Dmol.Vector3(a.end.x, a.end.y || 0, a.end.z || 0),
          c = new $3Dmol.Vector3(),
          h = new $3Dmol.Vector3(),
          g = new $3Dmol.Vector3(),
          l,
          p,
          t = d.clone(),
          q = 0;
        c.subVectors(e, d);
        l = c.length();
        c.normalize();
        h = c.clone();
        g = c.clone();
        h.multiplyScalar(a.dashLength);
        g.multiplyScalar(a.gapLength);
        c = h.length();
        for (p = g.length(); q < l; ) {
          if (q + c > l) {
            a.start = d;
            a.end = e;
            b.addLine(a);
            break;
          }
          t.addVectors(d, h);
          a.start = d;
          a.end = t;
          b.addLine(a);
          d = t.clone();
          q += c;
          t.addVectors(d, g);
          d = t.clone();
          q += p;
        }
      } else b.addLine(a);
      f.push(b);
      return b;
    };
    this.addUnitCell = function(a) {
      var b = new $3Dmol.GLShape({ wireframe: !0 });
      b.shapePosition = f.length;
      var d = a.getCrystData();
      if (d) {
        a = d.a;
        var e = d.b,
          c = d.c,
          h = d.alpha,
          g = d.beta,
          d = d.gamma,
          h = (h * Math.PI) / 180,
          g = (g * Math.PI) / 180,
          d = (d * Math.PI) / 180,
          l;
        l = Math.cos(g);
        h = (Math.cos(h) - Math.cos(g) * Math.cos(d)) / Math.sin(d);
        g = Math.sqrt(Math.max(0, 1 - l * l - h * h));
        a = new $3Dmol.Matrix4(
          a,
          e * Math.cos(d),
          c * l,
          0,
          0,
          e * Math.sin(d),
          c * h,
          0,
          0,
          0,
          c * g,
          0,
          0,
          0,
          0,
          1
        );
        e = [
          new $3Dmol.Vector3(0, 0, 0),
          new $3Dmol.Vector3(1, 0, 0),
          new $3Dmol.Vector3(0, 1, 0),
          new $3Dmol.Vector3(0, 0, 1),
          new $3Dmol.Vector3(1, 1, 0),
          new $3Dmol.Vector3(0, 1, 1),
          new $3Dmol.Vector3(1, 0, 1),
          new $3Dmol.Vector3(1, 1, 1)
        ];
        for (c = 0; c < e.length; c++) e[c] = e[c].applyMatrix4(a);
        b.addLine({ start: e[0], end: e[1] });
        b.addLine({ start: e[0], end: e[2] });
        b.addLine({ start: e[1], end: e[4] });
        b.addLine({ start: e[2], end: e[4] });
        b.addLine({ start: e[0], end: e[3] });
        b.addLine({ start: e[3], end: e[5] });
        b.addLine({ start: e[2], end: e[5] });
        b.addLine({ start: e[1], end: e[6] });
        b.addLine({ start: e[4], end: e[7] });
        b.addLine({ start: e[6], end: e[7] });
        b.addLine({ start: e[3], end: e[6] });
        b.addLine({ start: e[5], end: e[7] });
      }
      f.push(b);
      return b;
    };
    this.addCustom = function(a) {
      a = a || {};
      var b = new $3Dmol.GLShape(a);
      b.shapePosition = f.length;
      b.addCustom(a);
      f.push(b);
      return b;
    };
    this.addVolumetricData = function(a, b, d) {
      d = d || {};
      var e = new $3Dmol.GLShape(d);
      e.shapePosition = f.length;
      e.addVolumetricData(a, b, d);
      f.push(e);
      return e;
    };
    this.addIsosurface = function(a, b) {
      b = b || {};
      var d = new $3Dmol.GLShape(b);
      d.shapePosition = f.length;
      d.addIsosurface(a, b);
      f.push(d);
      return d;
    };
    this.setFrame = function(a) {
      for (var b = 0; b < e.length; b++) e[b].setFrame(a);
    };
    this.getFrames = function() {
      for (var a = 0, b = 0; b < e.length; b++)
        e[b].getFrames().length > a && (a = e[b].getFrames().length);
      return a;
    };
    this.animate = function(a) {
      S = !0;
      var b = 100,
        d = "forward",
        e = 0;
      a = a || {};
      a.interval && (b = a.interval);
      a.loop && (d = a.loop);
      a.reps && (e = a.reps);
      var c = this.getFrames(),
        f = this,
        h = 0,
        g = 1,
        l = 0,
        p = c * e,
        t = setInterval(function() {
          var a = d;
          "forward" == a
            ? (f.setFrame(h), (h = (h + g) % c))
            : "backward" == a
            ? (f.setFrame(c - 1 - h), (h = (h + g) % c))
            : (f.setFrame(h), (h += g), (g *= 0 == h % (c - 1) ? -1 : 1));
          f.render();
          (++l != p && f.isAnimated()) || clearInterval(t);
        }, b);
    };
    this.stopAnimate = function() {
      S = !1;
    };
    this.isAnimated = function() {
      return S;
    };
    this.addModel = function(a, b, d) {
      var c = new $3Dmol.GLModel(e.length, w);
      c.addMolData(a, b, d);
      e.push(c);
      return c;
    };
    this.addModels = function(a, b, d) {
      d = d || {};
      d.multimodel = !0;
      d.frames = !0;
      a = $3Dmol.GLModel.parseMolData(a, b, d);
      for (b = 0; b < a.length; b++) {
        var c = new $3Dmol.GLModel(e.length, w);
        c.setAtomDefaults(a[b]);
        c.addFrame(a[b]);
        c.setFrame(0);
        c.setModelData(a.modelData[b]);
        c.setDontDuplicateAtoms(!d.duplicateAssemblyAtoms);
        e.push(c);
      }
      return e;
    };
    this.addModelsAsFrames = function(a, b, d) {
      d = d || {};
      d.multimodel = !0;
      d.frames = !0;
      var c = new $3Dmol.GLModel(e.length, w);
      c.addMolData(a, b, d);
      e.push(c);
      return c;
    };
    this.addAsOneMolecule = function(a, b, d) {
      d = d || {};
      d.multimodel = !0;
      d.onemol = !0;
      var c = new $3Dmol.GLModel(e.length, w);
      c.addMolData(a, b, d);
      e.push(c);
      return c;
    };
    this.removeModel = function(a) {
      if (a)
        for (
          a.removegl(K), delete e[a.getID()];
          0 < e.length && "undefined" === typeof e[e.length - 1];

        )
          e.pop();
    };
    this.removeAllModels = function() {
      for (var a = 0; a < e.length; a++) e[a].removegl(K);
      e.splice(0, e.length);
    };
    this.exportJSON = function(a, b) {
      var d = {};
      d.m =
        void 0 === b
          ? e.map(function(b) {
              return b.toCDObject(a);
            })
          : [model[b].toCDObject()];
      return JSON.stringify(d);
    };
    this.createModelFrom = function(a, b) {
      for (var d = new $3Dmol.GLModel(e.length, w), c = 0; c < e.length; c++)
        if (e[c]) {
          var f = e[c].selectedAtoms(a);
          d.addAtoms(f);
          b && e[c].removeAtoms(f);
        }
      e.push(d);
      return d;
    };
    this.setStyle = function(a, b) {
      "undefined" === typeof b && ((b = a), (a = {}));
      m("setStyle", a, b, !1);
    };
    this.addStyle = function(a, b) {
      "undefined" === typeof b && ((b = a), (a = {}));
      m("setStyle", a, b, !0);
    };
    this.setClickable = function(a, b, d) {
      m("setClickable", a, b, d);
    };
    this.setColorByProperty = function(a, b, d) {
      m("setColorByProperty", a, b, d);
    };
    this.setColorByElement = function(a, b) {
      m("setColorByElement", a, b);
    };
    var Wa = function(a, b) {
        for (var d = [], e = 0; e < a.length; e++) {
          var c = a[e];
          "undefined" != typeof c &&
            (c.x < b[0][0] ||
              c.x > b[1][0] ||
              c.y < b[0][1] ||
              c.y > b[1][1] ||
              c.z < b[0][2] ||
              c.z > b[1][2] ||
              d.push(e));
        }
        return d;
      },
      Ta = function(a) {
        return (a[1][0] - a[0][0]) * (a[1][1] - a[0][1]) * (a[1][2] - a[0][2]);
      },
      Aa = function(a, b, d) {
        var e = [],
          c = function(a) {
            var b = [];
            b[0] = [a[0][0], a[0][1], a[0][2]];
            b[1] = [a[1][0], a[1][1], a[1][2]];
            return b;
          },
          f = function(a) {
            if (64e3 > Ta(a)) return [a];
            var b = a[1][0] - a[0][0],
              d = a[1][1] - a[0][1],
              e = a[1][2] - a[0][2],
              d = b > d && b > e ? 0 : d > b && d > e ? 1 : 2,
              e = c(a),
              b = c(a);
            a = (a[1][d] - a[0][d]) / 2 + a[0][d];
            e[1][d] = a;
            b[0][d] = a;
            a = f(e);
            b = f(b);
            return a.concat(b);
          };
        a = f(a);
        for (var h = 0, g = a.length; h < g; h++) {
          var l = c(a[h]);
          l[0][0] -= 6;
          l[0][1] -= 6;
          l[0][2] -= 6;
          l[1][0] += 6;
          l[1][1] += 6;
          l[1][2] += 6;
          var l = Wa(b, l),
            p = Wa(d, a[h]);
          e.push({ extent: a[h], atoms: l, toshow: p });
        }
        return e;
      },
      sa = function(a, b, d) {
        for (
          var e = new $3Dmol.Geometry(!0),
            c = e.updateGeoGroup(0),
            f = [],
            h = 0,
            g = a.length;
          h < g;
          h++
        ) {
          var l = a[h];
          l &&
            ("undefined" != typeof l.surfaceColor
              ? (f[h] = l.surfaceColor)
              : l.color && (f[h] = $3Dmol.CC.color(l.color)));
        }
        var p = c.vertexArray,
          l = b.vertices,
          h,
          g;
        h = 0;
        for (g = l.length; h < g; h++)
          (a = 3 * c.vertices),
            (p[a] = l[h].x),
            (p[a + 1] = l[h].y),
            (p[a + 2] = l[h].z),
            c.vertices++;
        p = c.colorArray;
        if (d.voldata && d.volscheme) {
          var f = d.volscheme,
            t = d.voldata,
            q = f.range() || [-1, 1];
          h = 0;
          for (g = l.length; h < g; h++) {
            a = t.getVal(l[h].x, l[h].y, l[h].z);
            var x = $3Dmol.CC.color(f.valueToHex(a, q));
            a = 3 * h;
            p[a] = x.r;
            p[a + 1] = x.g;
            p[a + 2] = x.b;
          }
        } else if (0 < f.length)
          for (h = 0, g = l.length; h < g; h++)
            (t = l[h].atomid),
              (a = 3 * h),
              (p[a] = f[t].r),
              (p[a + 1] = f[t].g),
              (p[a + 2] = f[t].b);
        b = b.faces;
        c.faceidx = b.length;
        e.initTypedArrays();
        var l = c.vertexArray,
          p = c.normalArray,
          u;
        h = 0;
        for (g = b.length; h < g; h += 3)
          (f = b[h + 1]),
            (t = b[h + 2]),
            (a = 3 * b[h]),
            (f *= 3),
            (t *= 3),
            (q = new $3Dmol.Vector3(l[a], l[a + 1], l[a + 2])),
            (x = new $3Dmol.Vector3(l[f], l[f + 1], l[f + 2])),
            (u = new $3Dmol.Vector3(l[t], l[t + 1], l[t + 2])),
            u.subVectors(u, x),
            q.subVectors(q, x),
            u.cross(q),
            (q = u),
            q.normalize(),
            (p[a] += q.x),
            (p[f] += q.x),
            (p[t] += q.x),
            (p[a + 1] += q.y),
            (p[f + 1] += q.y),
            (p[t + 1] += q.y),
            (p[a + 2] += q.z),
            (p[f + 2] += q.z),
            (p[t + 2] += q.z);
        c.faceArray = new Uint16Array(b);
        d = new $3Dmol.Mesh(e, d);
        d.doubleSided = !0;
        return d;
      };
    this.addMesh = function(a) {
      a = { geo: a.geometry, mat: a.material, done: !0, finished: !1 };
      var b = ba();
      G[b] = a;
      return b;
    };
    var Ga = function(a) {
      var b = [];
      $.each(a, function(a, d) {
        b[a] = $.extend({}, d);
      });
      return b;
    };
    this.addSurface = function(a, b, d, f, g) {
      var l = null,
        p = null;
      d = Ga(c(d));
      var l = f ? Ga(c(f)) : d,
        t = !1;
      for (f = 0; f < e.length; f++)
        if (e[f]) {
          var q = e[f].getSymmetries();
          if (1 < q.length || (1 == q.length && !q[0].isIdentity())) {
            t = !0;
            break;
          }
        }
      var x = function(d, e, f) {
        p = g ? Ga(c(g)) : f;
        var l,
          t = $3Dmol.getExtent(f, !0),
          q,
          x;
        b.map &&
          b.map.prop &&
          ((q = b.map.prop),
          (x = b.map.scheme || b.map.gradient || new $3Dmol.Gradient.RWB()),
          (l = x.range()) || (l = $3Dmol.getPropertyRange(f, q)),
          (b.colorscheme = { prop: q, gradient: x }));
        q = 0;
        for (x = e.length; q < x; q++)
          (l = e[q]), (l.surfaceColor = $3Dmol.getColorFromStyle(l, b));
        var m = Ta(t),
          s = Aa(t, e, f);
        if (p && p.length && 0 < p.length) {
          var z = $3Dmol.getExtent(p, !0);
          s.sort(function(a, b) {
            var d = function(a, b) {
                var d = a.extent,
                  e = d[1][1] - d[0][1],
                  c = d[1][2] - d[0][2],
                  d = d[1][0] - d[0][0] - b[2][0],
                  e = e - b[2][1],
                  c = c - b[2][2];
                return d * d + e * e + c * c;
              },
              e = d(a, z),
              d = d(b, z);
            return e - d;
          });
        }
        var C = [];
        q = 0;
        for (x = e.length; q < x; q++)
          (l = e[q]),
            (C[q] = { x: l.x, y: l.y, z: l.z, serial: q, elem: l.elem });
        if ($3Dmol.syncSurface)
          setTimeout(
            function Ma(b) {
              if (!(b >= s.length)) {
                var c;
                c = a;
                var f = s[b].extent,
                  g = s[b].atoms,
                  l = s[b].toshow,
                  p = new $3Dmol.ProteinSurface();
                p.initparm(f, 1 === c ? !1 : !0, m);
                p.fillvoxels(C, g);
                p.buildboundary();
                c == $3Dmol.SurfaceType.SES &&
                  (p.fastdistancemap(),
                  p.boundingatom(!1),
                  p.fillvoxelswaals(C, g));
                p.marchingcube(c);
                c = p.getFacesAndVertices(l);
                c = sa(e, c, u);
                $3Dmol.mergeGeos(d.geo, c);
                h.render();
                setTimeout(Ma, 1, b + 1);
              }
            },
            1,
            0
          );
        else {
          f = [];
          0 > a && (a = 0);
          q = 0;
          for (x = 4; q < x; q++)
            (t = new Worker($3Dmol.SurfaceWorker)),
              f.push(t),
              t.postMessage({ type: -1, atoms: C, volume: m });
          var w = 0,
            t = function(a) {
              a = $3Dmol.splitMesh({
                vertexArr: a.data.vertices,
                faceArr: a.data.faces
              });
              for (var b = 0, c = a.length; b < c; b++) {
                var f = sa(
                  e,
                  { vertices: a[b].vertexArr, faces: a[b].faceArr },
                  u
                );
                $3Dmol.mergeGeos(d.geo, f);
                h.render();
              }
              w++;
              w == s.length && (d.done = !0);
            };
          x = function(a) {
            console.log(a.message + " (" + a.filename + ":" + a.lineno + ")");
          };
          for (q = 0; q < s.length; q++)
            (l = f[q % f.length]),
              (l.onmessage = t),
              (l.onerror = x),
              l.postMessage({
                type: a,
                expandedExtent: s[q].extent,
                extendedAtoms: s[q].atoms,
                atomsToShow: s[q].toshow
              });
        }
      };
      b = b || {};
      var u = s(b),
        q = [];
      if (t) {
        var t = {},
          m = {};
        for (f = 0; f < e.length; f++) (t[f] = []), (m[f] = []);
        for (f = 0; f < l.length; f++) t[l[f].model].push(l[f]);
        for (f = 0; f < d.length; f++) m[d[f].model].push(d[f]);
        for (f = 0; f < e.length; f++)
          q.push({
            geo: new $3Dmol.Geometry(!0),
            mat: u,
            done: !1,
            finished: !1,
            symmetries: e[f].getSymmetries()
          }),
            x(q[f], t[f], m[f]);
      } else
        q.push({
          geo: new $3Dmol.Geometry(!0),
          mat: u,
          done: !1,
          finished: !1,
          symmetries: [new $3Dmol.Matrix4()]
        }),
          x(q[q.length - 1], l, d);
      l = ba();
      G[l] = q;
      return l;
    };
    this.setSurfaceMaterialStyle = function(a, b) {
      if (G[a]) {
        surfArr = G[a];
        for (var d = 0; d < surfArr.length; d++)
          (surfArr[d].mat = s(b)),
            (surfArr[d].mat.side = $3Dmol.FrontSide),
            (surfArr[d].finished = !1);
      }
    };
    this.removeSurface = function(a) {
      for (var b = G[a], d = 0; d < b.length; d++)
        b[d] &&
          b[d].lastGL &&
          (void 0 !== b[d].geo && b[d].geo.dispose(),
          void 0 !== b[d].mat && b[d].mat.dispose(),
          K.remove(b[d].lastGL));
      delete G[a];
      V();
    };
    this.removeAllSurfaces = function() {
      for (n in G)
        if (G.hasOwnProperty(n)) {
          for (var a = G[n], b = 0; b < a.length; b++)
            a[b] &&
              a[b].lastGL &&
              (void 0 !== a[b].geo && a[b].geo.dispose(),
              void 0 !== a[b].mat && a[b].mat.dispose(),
              K.remove(a[b].lastGL));
          delete G[n];
        }
      V();
    };
    this.jmolMoveTo = function() {
      var a = K.position,
        a = "center { " + -a.x + " " + -a.y + " " + -a.z + " }; ",
        b = H.quaternion;
      return (a +=
        "moveto .5 quaternion { " +
        b.x +
        " " +
        b.y +
        " " +
        b.z +
        " " +
        b.w +
        " };");
    };
    this.clear = function() {
      this.removeAllSurfaces();
      this.removeAllModels();
      this.removeAllLabels();
      this.removeAllShapes();
      V();
    };
    this.mapAtomProperties = function(a, b) {
      b = b || {};
      var d = c(b);
      if ("function" == typeof a)
        for (var f = 0, h = d.length; f < h; f++) {
          var g = d[f];
          a(g);
        }
      else
        for (f = 0, h = d.length; f < h; f++)
          for (var g = d[f], l = 0, p = a.length; l < p; l++) {
            var t = a[l];
            if (t.props)
              for (var q in t.props)
                if (t.props.hasOwnProperty(q)) {
                  var x;
                  a: {
                    x = g;
                    var u = t;
                    "undefined" === typeof u && (u = {});
                    var m = [],
                      s = void 0;
                    if ("undefined" === typeof u.model)
                      for (s = 0; s < e.length; s++) e[s] && m.push(e[s]);
                    else (m = u.model), $.isArray(m) || (m = [m]);
                    for (s = 0; s < m.length; s++)
                      if (m[s].atomIsSelected(x, u)) {
                        x = !0;
                        break a;
                      }
                    x = !1;
                  }
                  x &&
                    (g.properties || (g.properties = {}),
                    (g.properties[q] = t.props[q]));
                }
          }
    };
    this.linkViewer = function(a) {
      I.push(a);
    };
    try {
      "function" === typeof B && B(this);
    } catch (Oa) {
      console.log("error with glviewer callback: " + Oa);
    }
  };
})();
$3Dmol.glmolViewer = $3Dmol.GLViewer;
$3Dmol = $3Dmol || {};
$3Dmol.Gradient = function(a, b) {};
$3Dmol.Gradient.valueToHex = function(a, b) {};
$3Dmol.Gradient.range = function() {};
$3Dmol.Gradient.RWB = function(a, b, c) {
  var m = 1;
  "undefined" == typeof b &&
    $.isArray(a) &&
    2 <= a.length &&
    ((b = a[1]), (a = a[0]));
  b < a && ((m = -1), (a *= -1), (b *= -1));
  this.valueToHex = function(s, B) {
    var w, z;
    s *= m;
    B ? ((w = B[0]), (z = B[1])) : ((w = a), (z = b));
    if (void 0 === s) return 16777215;
    s < w && (s = w);
    s > z && (s = z);
    var d = (z + w) / 2;
    "undefined" != typeof c && (d = c);
    s <= d
      ? ((w = Math.floor(255 * Math.sqrt((s - w) / (d - w)))),
        (w = 16711680 + 256 * w + w))
      : ((w = Math.floor(255 * Math.sqrt(1 - (s - d) / (z - d)))),
        (w = 65536 * w + 256 * w + 255));
    return w;
  };
  this.range = function() {
    return "undefined" != typeof a && "undefined" != typeof b ? [a, b] : null;
  };
};
$3Dmol.Gradient.ROYGB = function(a, b) {
  var c = 1;
  "undefined" == typeof b &&
    $.isArray(a) &&
    2 <= a.length &&
    ((b = a[1]), (a = a[0]));
  b < a && ((c = -1), (a *= -1), (b *= -1));
  this.valueToHex = function(m, s) {
    var B, w;
    m *= c;
    s ? ((B = s[0]), (w = s[1])) : ((B = a), (w = b));
    if ("undefined" == typeof m) return 16777215;
    m < B && (m = B);
    m > w && (m = w);
    var z = (B + w) / 2,
      d = (B + z) / 2,
      x = (z + w) / 2;
    m < d
      ? ((B = Math.floor(255 * Math.sqrt((m - B) / (d - B)))),
        (B = 256 * B + 16711680))
      : m < z
      ? ((B = Math.floor(255 * Math.sqrt(1 - (m - d) / (z - d)))),
        (B = 65536 * B + 65280))
      : m < x
      ? ((B = Math.floor(255 * Math.sqrt((m - z) / (x - z)))),
        (B = 65280 + 1 * B))
      : ((B = Math.floor(255 * Math.sqrt(1 - (m - x) / (w - x)))),
        (B = 256 * B + 255));
    return B;
  };
  this.range = function() {
    return "undefined" != typeof a && "undefined" != typeof b ? [a, b] : null;
  };
};
$3Dmol.Gradient.Sinebow = function(a, b) {
  var c = 1;
  "undefined" == typeof b &&
    $.isArray(a) &&
    2 <= a.length &&
    ((b = a[1]), (a = a[0]));
  b < a && ((c = -1), (a *= -1), (b *= -1));
  this.valueToHex = function(m, s) {
    var B, w;
    m *= c;
    s ? ((B = s[0]), (w = s[1])) : ((B = a), (w = b));
    if ("undefined" == typeof m) return 16777215;
    m < B && (m = B);
    m > w && (m = w);
    var z = (((m - B) / (w - B)) * 5) / 6 + 0.5;
    B = Math.sin(Math.PI * z);
    B *= 255 * B;
    w = Math.sin(Math.PI * (z + 1 / 3));
    w *= 255 * w;
    z = Math.sin(Math.PI * (z + 2 / 3));
    return (
      65536 * Math.floor(B) + 256 * Math.floor(255 * z * z) + 1 * Math.floor(w)
    );
  };
  this.range = function() {
    return "undefined" != typeof a && "undefined" != typeof b ? [a, b] : null;
  };
};
$3Dmol.LabelCount = 0;
$3Dmol.Label = function(a, b) {
  this.id = $3Dmol.LabelCount++;
  this.stylespec = b || {};
  this.canvas = document.createElement("canvas");
  this.canvas.width = 134;
  this.canvas.height = 35;
  this.context = this.canvas.getContext("2d");
  this.sprite = new $3Dmol.Sprite();
  this.text = a;
};
$3Dmol.Label.prototype = {
  constructor: $3Dmol.Label,
  getStyle: function() {
    return this.stylespec;
  },
  setContext: (function() {
    var a = function(a, c, m) {
      "undefined" != typeof a &&
        (m =
          a instanceof $3Dmol.Color ? a.scaled() : $3Dmol.CC.color(a).scaled());
      "undefined" != typeof c && (m.a = parseFloat(c));
      return m;
    };
    return function() {
      var b = this.stylespec,
        c = "undefined" == typeof b.useScreen ? !1 : b.useScreen,
        m = b.showBackground;
      if ("0" === m || "false" === m) m = !1;
      "undefined" == typeof m && (m = !0);
      var s = b.font ? b.font : "sans-serif",
        B = parseInt(b.fontSize) ? parseInt(b.fontSize) : 18,
        w = a(b.fontColor, b.fontOpacity, { r: 255, g: 255, b: 255, a: 1 }),
        z = b.padding ? b.padding : 4,
        d = b.borderThickness ? b.borderThickness : 0,
        x = a(b.backgroundColor, b.backgroundOpacity, {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        }),
        h = a(b.borderColor, b.borderOpacity, x),
        t = b.position ? b.position : { x: -10, y: 1, z: 1 },
        l = void 0 !== b.inFront ? b.inFront : !0;
      if ("false" === l || "0" === l) l = !1;
      var e = b.alignment || $3Dmol.SpriteAlignment.topLeft,
        G = "";
      b.bold && (G = "bold ");
      this.context.font = G + B + "px  " + s;
      var f = this.context.measureText(this.text).width;
      m || (d = 0);
      var C = f + 2.5 * d + 2 * z,
        u = 1.25 * B + 2 * d + 2 * z;
      if (b.backgroundImage) {
        var G = b.backgroundImage,
          q = b.backgroundWidth ? b.backgroundWidth : G.width,
          g = b.backgroundHeight ? b.backgroundHeight : G.height;
        q > C && (C = q);
        g > u && (u = g);
      }
      this.canvas.width = C;
      this.canvas.height = u;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      G = "";
      b.bold && (G = "bold ");
      this.context.font = G + B + "px  " + s;
      this.context.fillStyle =
        "rgba(" + x.r + "," + x.g + "," + x.b + "," + x.a + ")";
      this.context.strokeStyle =
        "rgba(" + h.r + "," + h.g + "," + h.b + "," + h.a + ")";
      this.context.lineWidth = d;
      m &&
        ((m = this.context),
        (x = s = d),
        (C -= 2 * d),
        (u -= 2 * d),
        (h = 0 < d),
        m.beginPath(),
        m.moveTo(s + 6, x),
        m.lineTo(s + C - 6, x),
        m.quadraticCurveTo(s + C, x, s + C, x + 6),
        m.lineTo(s + C, x + u - 6),
        m.quadraticCurveTo(s + C, x + u, s + C - 6, x + u),
        m.lineTo(s + 6, x + u),
        m.quadraticCurveTo(s, x + u, s, x + u - 6),
        m.lineTo(s, x + 6),
        m.quadraticCurveTo(s, x, s + 6, x),
        m.closePath(),
        m.fill(),
        h && m.stroke());
      b.backgroundImage &&
        ((G = b.backgroundImage),
        (q = b.backgroundWidth ? b.backgroundWidth : G.width),
        (g = b.backgroundHeight ? b.backgroundHeight : G.height),
        this.context.drawImage(G, 0, 0, q, g));
      this.context.fillStyle =
        "rgba(" + w.r + "," + w.g + "," + w.b + "," + w.a + ")";
      this.context.fillText(this.text, d + z, B + d + z, f);
      b = new $3Dmol.Texture(this.canvas);
      b.needsUpdate = !0;
      this.sprite.material = new $3Dmol.SpriteMaterial({
        map: b,
        useScreenCoordinates: c,
        alignment: e,
        depthTest: !l
      });
      this.sprite.scale.set(1, 1, 1);
      this.sprite.position.set(t.x, t.y, t.z);
    };
  })(),
  dispose: function() {
    void 0 !== this.sprite.material.map && this.sprite.material.map.dispose();
    void 0 !== this.sprite.material && this.sprite.material.dispose();
  }
};
$3Dmol = $3Dmol || {};
$3Dmol.MarchingCubeInitializer = function() {
  var a = {
      march: function(a, w, z, d) {
        var x = !!d.fulltable,
          h =
            d.hasOwnProperty("origin") && d.origin.hasOwnProperty("x")
              ? d.origin
              : { x: 0, y: 0, z: 0 },
          t = !!d.voxel,
          l = d.nX || 0,
          e = d.nY || 0,
          G = d.nZ || 0,
          f = d.scale || 1,
          C = null,
          C = d.unitCube ? d.unitCube : { x: f, y: f, z: f },
          u = new Int32Array(l * e * G);
        d = 0;
        for (f = u.length; d < f; ++d) u[d] = -1;
        var f = function(a, b, d, c, f, g) {
            var l = { x: h.x, y: h.y, z: h.z },
              p = f;
            c & (1 << f) || !(c & (1 << g)) || (p = g);
            p & 1 && d++;
            p & 2 && b++;
            p & 4 && a++;
            l.x += C.x * a;
            l.y += C.y * b;
            l.z += C.z * d;
            a = (e * a + b) * G + d;
            if (t) return w.push(l), w.length - 1;
            0 > u[a] && ((u[a] = w.length), w.push(l));
            return u[a];
          },
          q = new Int32Array(12),
          g = x ? m : b,
          x = x ? s : c;
        for (d = 0; d < l - 1; ++d)
          for (var E = 0; E < e - 1; ++E)
            for (var I = 0; I < G - 1; ++I) {
              for (var A = 0, D = 0; 8 > D; ++D)
                A |=
                  !!(
                    a[
                      (e * (d + ((D & 4) >> 2)) + E + ((D & 2) >> 1)) * G +
                        I +
                        (D & 1)
                    ] & 2
                  ) << D;
              if (0 !== A && 255 !== A) {
                var p = g[A];
                if (0 !== p)
                  for (
                    D = x[A],
                      p & 1 && (q[0] = f(d, E, I, A, 0, 1)),
                      p & 2 && (q[1] = f(d, E, I, A, 1, 3)),
                      p & 4 && (q[2] = f(d, E, I, A, 3, 2)),
                      p & 8 && (q[3] = f(d, E, I, A, 2, 0)),
                      p & 16 && (q[4] = f(d, E, I, A, 4, 5)),
                      p & 32 && (q[5] = f(d, E, I, A, 5, 7)),
                      p & 64 && (q[6] = f(d, E, I, A, 7, 6)),
                      p & 128 && (q[7] = f(d, E, I, A, 6, 4)),
                      p & 256 && (q[8] = f(d, E, I, A, 0, 4)),
                      p & 512 && (q[9] = f(d, E, I, A, 1, 5)),
                      p & 1024 && (q[10] = f(d, E, I, A, 3, 7)),
                      p & 2048 && (q[11] = f(d, E, I, A, 2, 6)),
                      A = 0;
                    A < D.length;
                    A += 3
                  ) {
                    var p = q[D[A]],
                      y = q[D[A + 1]],
                      L = q[D[A + 2]];
                    t &&
                      3 <= A &&
                      (w.push(w[p]),
                      (p = w.length - 1),
                      w.push(w[y]),
                      (y = w.length - 1),
                      w.push(w[L]),
                      (L = w.length - 1));
                    z.push(p);
                    z.push(y);
                    z.push(L);
                  }
              }
            }
      },
      laplacianSmooth: function(a, b, c) {
        var d = Array(b.length),
          x,
          h,
          t,
          l;
        x = 0;
        for (h = b.length; x < h; x++) d[x] = { x: 0, y: 0, z: 0 };
        var e = Array(20),
          m;
        for (x = 0; 20 > x; x++) e[x] = Array(b.length);
        x = 0;
        for (h = b.length; x < h; x++) e[0][x] = 0;
        x = 0;
        for (h = c.length / 3; x < h; x++) {
          var f = 3 * x,
            s = 3 * x + 1,
            u = 3 * x + 2;
          m = !0;
          t = 0;
          for (l = e[0][c[f]]; t < l; t++)
            if (c[s] == e[t + 1][c[f]]) {
              m = !1;
              break;
            }
          m && (e[0][c[f]]++, (e[e[0][c[f]]][c[f]] = c[s]));
          m = !0;
          t = 0;
          for (l = e[0][c[f]]; t < l; t++)
            if (c[u] == e[t + 1][c[f]]) {
              m = !1;
              break;
            }
          m && (e[0][c[f]]++, (e[e[0][c[f]]][c[f]] = c[u]));
          m = !0;
          t = 0;
          for (l = e[0][c[s]]; t < l; t++)
            if (c[f] == e[t + 1][c[s]]) {
              m = !1;
              break;
            }
          m && (e[0][c[s]]++, (e[e[0][c[s]]][c[s]] = c[f]));
          m = !0;
          t = 0;
          for (l = e[0][c[s]]; t < l; t++)
            if (c[u] == e[t + 1][c[s]]) {
              m = !1;
              break;
            }
          m && (e[0][c[s]]++, (e[e[0][c[s]]][c[s]] = c[u]));
          m = !0;
          for (t = 0; t < e[0][c[u]]; t++)
            if (c[f] == e[t + 1][c[u]]) {
              m = !1;
              break;
            }
          m && (e[0][c[u]]++, (e[e[0][c[u]]][c[u]] = c[f]));
          m = !0;
          t = 0;
          for (l = e[0][c[u]]; t < l; t++)
            if (c[s] == e[t + 1][c[u]]) {
              m = !1;
              break;
            }
          m && (e[0][c[u]]++, (e[e[0][c[u]]][c[u]] = c[s]));
        }
        for (c = 0; c < a; c++) {
          x = 0;
          for (h = b.length; x < h; x++)
            if (3 > e[0][x])
              (d[x].x = b[x].x), (d[x].y = b[x].y), (d[x].z = b[x].z);
            else if (3 == e[0][x] || 4 == e[0][x]) {
              d[x].x = 0;
              d[x].y = 0;
              t = d[x].z = 0;
              for (l = e[0][x]; t < l; t++)
                (d[x].x += b[e[t + 1][x]].x),
                  (d[x].y += b[e[t + 1][x]].y),
                  (d[x].z += b[e[t + 1][x]].z);
              d[x].x += 0.5 * b[x].x;
              d[x].y += 0.5 * b[x].y;
              d[x].z += 0.5 * b[x].z;
              d[x].x /= 0.5 + e[0][x];
              d[x].y /= 0.5 + e[0][x];
              d[x].z /= 0.5 + e[0][x];
            } else {
              d[x].x = 0;
              d[x].y = 0;
              t = d[x].z = 0;
              for (l = e[0][x]; t < l; t++)
                (d[x].x += b[e[t + 1][x]].x),
                  (d[x].y += b[e[t + 1][x]].y),
                  (d[x].z += b[e[t + 1][x]].z);
              d[x].x += 1 * b[x].x;
              d[x].y += 1 * b[x].y;
              d[x].z += 1 * b[x].z;
              d[x].x /= 1 + e[0][x];
              d[x].y /= 1 + e[0][x];
              d[x].z /= 1 + e[0][x];
            }
          x = 0;
          for (h = b.length; x < h; x++)
            (b[x].x = d[x].x), (b[x].y = d[x].y), (b[x].z = d[x].z);
        }
      },
      edgeTable: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2816,
        0,
        0,
        0,
        1792,
        0,
        3328,
        3584,
        3840,
        0,
        0,
        0,
        138,
        0,
        21,
        0,
        134,
        0,
        0,
        0,
        652,
        0,
        2067,
        3865,
        3600,
        0,
        0,
        0,
        42,
        0,
        0,
        0,
        294,
        0,
        0,
        21,
        28,
        0,
        3875,
        1049,
        3360,
        0,
        168,
        162,
        170,
        0,
        645,
        2475,
        2210,
        0,
        687,
        293,
        172,
        4010,
        3747,
        3497,
        3232,
        0,
        0,
        0,
        0,
        0,
        69,
        0,
        900,
        0,
        0,
        0,
        1792,
        138,
        131,
        1608,
        1920,
        0,
        81,
        0,
        2074,
        84,
        85,
        84,
        86,
        0,
        81,
        0,
        3676,
        330,
        1105,
        1881,
        1616,
        0,
        0,
        0,
        42,
        0,
        69,
        0,
        502,
        0,
        0,
        21,
        3580,
        138,
        2035,
        1273,
        1520,
        2816,
        104,
        2337,
        106,
        840,
        581,
        367,
        102,
        2816,
        3695,
        3429,
        3180,
        1898,
        1635,
        1385,
        1120,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3910,
        0,
        0,
        69,
        588,
        42,
        2083,
        41,
        2880,
        0,
        0,
        0,
        1722,
        0,
        2293,
        4095,
        3830,
        0,
        255,
        757,
        764,
        2538,
        2291,
        3065,
        2800,
        0,
        0,
        81,
        338,
        0,
        3925,
        1119,
        3414,
        84,
        855,
        85,
        340,
        2130,
        2899,
        89,
        2384,
        1792,
        712,
        194,
        1162,
        4036,
        3781,
        3535,
        3270,
        708,
        719,
        197,
        204,
        3018,
        2755,
        2505,
        2240,
        0,
        0,
        0,
        0,
        168,
        420,
        168,
        1958,
        162,
        162,
        676,
        2988,
        170,
        163,
        680,
        928,
        3328,
        3096,
        3328,
        3642,
        52,
        53,
        1855,
        1590,
        2340,
        2111,
        2869,
        2620,
        298,
        51,
        825,
        560,
        3584,
        3584,
        3090,
        3482,
        1668,
        1941,
        1183,
        1430,
        146,
        2975,
        2069,
        2460,
        154,
        915,
        153,
        400,
        3840,
        3592,
        3329,
        3082,
        1796,
        1541,
        1295,
        1030,
        2818,
        2575,
        2309,
        2060,
        778,
        515,
        265,
        0
      ]
    },
    b = new Uint32Array(a.edgeTable),
    c = (a.triTable = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [11, 9, 8],
      [],
      [],
      [],
      [8, 10, 9],
      [],
      [10, 8, 11],
      [9, 11, 10],
      [8, 10, 9, 8, 11, 10],
      [],
      [],
      [],
      [1, 7, 3],
      [],
      [4, 2, 0],
      [],
      [2, 1, 7],
      [],
      [],
      [],
      [2, 7, 3, 2, 9, 7],
      [],
      [1, 4, 11, 1, 0, 4],
      [3, 8, 0, 11, 9, 4, 11, 10, 9],
      [4, 11, 9, 11, 10, 9],
      [],
      [],
      [],
      [5, 3, 1],
      [],
      [],
      [],
      [2, 5, 8, 2, 1, 5],
      [],
      [],
      [2, 4, 0],
      [3, 2, 4],
      [],
      [0, 9, 1, 8, 10, 5, 8, 11, 10],
      [3, 4, 0, 3, 10, 4],
      [5, 8, 10, 8, 11, 10],
      [],
      [3, 5, 7],
      [7, 1, 5],
      [1, 7, 3, 1, 5, 7],
      [],
      [9, 2, 0, 9, 7, 2],
      [0, 3, 8, 1, 7, 11, 1, 5, 7],
      [11, 1, 7, 1, 5, 7],
      [],
      [9, 1, 0, 5, 3, 2, 5, 7, 3],
      [8, 2, 5, 8, 0, 2],
      [2, 5, 3, 5, 7, 3],
      [3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5],
      [9, 1, 0, 10, 7, 11, 10, 5, 7],
      [3, 8, 0, 7, 10, 5, 7, 11, 10],
      [11, 5, 7, 11, 10, 5],
      [],
      [],
      [],
      [],
      [],
      [0, 6, 2],
      [],
      [7, 2, 9, 7, 9, 8],
      [],
      [],
      [],
      [8, 10, 9],
      [7, 1, 3],
      [7, 1, 0],
      [6, 9, 3, 6, 10, 9],
      [7, 10, 8, 10, 9, 8],
      [],
      [6, 0, 4],
      [],
      [11, 1, 4, 11, 3, 1],
      [2, 4, 6],
      [2, 0, 4, 2, 4, 6],
      [2, 4, 6],
      [1, 4, 2, 4, 6, 2],
      [],
      [6, 0, 4],
      [],
      [2, 11, 3, 6, 9, 4, 6, 10, 9],
      [8, 6, 1, 8, 1, 3],
      [10, 0, 6, 0, 4, 6],
      [8, 0, 3, 9, 6, 10, 9, 4, 6],
      [10, 4, 6, 10, 9, 4],
      [],
      [],
      [],
      [5, 3, 1],
      [],
      [0, 6, 2],
      [],
      [7, 4, 8, 5, 2, 1, 5, 6, 2],
      [],
      [],
      [2, 4, 0],
      [7, 4, 8, 2, 11, 3, 10, 5, 6],
      [7, 1, 3],
      [5, 6, 10, 0, 9, 1, 8, 7, 4],
      [5, 6, 10, 7, 0, 3, 7, 4, 0],
      [10, 5, 6, 4, 8, 7],
      [9, 11, 8],
      [3, 5, 6],
      [0, 5, 11, 0, 11, 8],
      [6, 3, 5, 3, 1, 5],
      [3, 9, 6, 3, 8, 9],
      [9, 6, 0, 6, 2, 0],
      [0, 3, 8, 2, 5, 6, 2, 1, 5],
      [1, 6, 2, 1, 5, 6],
      [9, 11, 8],
      [1, 0, 9, 6, 10, 5, 11, 3, 2],
      [6, 10, 5, 2, 8, 0, 2, 11, 8],
      [3, 2, 11, 10, 5, 6],
      [10, 5, 6, 9, 3, 8, 9, 1, 3],
      [0, 9, 1, 5, 6, 10],
      [8, 0, 3, 10, 5, 6],
      [10, 5, 6],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [1, 10, 2, 9, 11, 6, 9, 8, 11],
      [],
      [],
      [6, 0, 2],
      [3, 6, 9, 3, 2, 6],
      [3, 5, 1],
      [0, 5, 1, 0, 11, 5],
      [0, 3, 5],
      [6, 9, 11, 9, 8, 11],
      [],
      [],
      [],
      [4, 5, 9, 7, 1, 10, 7, 3, 1],
      [],
      [11, 6, 7, 2, 4, 5, 2, 0, 4],
      [11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5],
      [6, 7, 11, 1, 10, 2, 9, 4, 5],
      [],
      [4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2],
      [9, 4, 5, 0, 6, 7, 0, 2, 6],
      [4, 5, 9, 6, 3, 2, 6, 7, 3],
      [6, 7, 11, 5, 3, 8, 5, 1, 3],
      [6, 7, 11, 4, 1, 0, 4, 5, 1],
      [4, 5, 9, 3, 8, 0, 11, 6, 7],
      [9, 4, 5, 7, 11, 6],
      [],
      [],
      [0, 6, 4],
      [8, 6, 4, 8, 1, 6],
      [],
      [0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6],
      [10, 2, 1, 6, 0, 3, 6, 4, 0],
      [10, 2, 1, 11, 4, 8, 11, 6, 4],
      [4, 2, 6],
      [1, 0, 9, 2, 4, 8, 2, 6, 4],
      [2, 4, 0, 2, 6, 4],
      [8, 2, 4, 2, 6, 4],
      [11, 4, 1, 11, 6, 4],
      [0, 9, 1, 4, 11, 6, 4, 8, 11],
      [3, 6, 0, 6, 4, 0],
      [8, 6, 4, 8, 11, 6],
      [10, 8, 9],
      [6, 3, 9, 6, 7, 3],
      [6, 7, 1],
      [10, 7, 1, 7, 3, 1],
      [7, 11, 6, 8, 10, 2, 8, 9, 10],
      [11, 6, 7, 10, 0, 9, 10, 2, 0],
      [2, 1, 10, 7, 11, 6, 8, 0, 3],
      [1, 10, 2, 6, 7, 11],
      [7, 2, 6, 7, 9, 2],
      [1, 0, 9, 3, 6, 7, 3, 2, 6],
      [7, 0, 6, 0, 2, 6],
      [2, 7, 3, 2, 6, 7],
      [7, 11, 6, 3, 9, 1, 3, 8, 9],
      [9, 1, 0, 11, 6, 7],
      [0, 3, 8, 11, 6, 7],
      [11, 6, 7],
      [],
      [],
      [],
      [],
      [5, 3, 7],
      [8, 5, 2, 8, 7, 5],
      [5, 3, 7],
      [1, 10, 2, 5, 8, 7, 5, 9, 8],
      [1, 7, 5],
      [1, 7, 5],
      [9, 2, 7, 9, 7, 5],
      [11, 3, 2, 8, 5, 9, 8, 7, 5],
      [1, 3, 7, 1, 7, 5],
      [0, 7, 1, 7, 5, 1],
      [9, 3, 5, 3, 7, 5],
      [9, 7, 5, 9, 8, 7],
      [8, 10, 11],
      [3, 4, 10, 3, 10, 11],
      [8, 10, 11],
      [5, 9, 4, 1, 11, 3, 1, 10, 11],
      [2, 4, 5],
      [5, 2, 4, 2, 0, 4],
      [0, 3, 8, 5, 9, 4, 10, 2, 1],
      [2, 1, 10, 9, 4, 5],
      [2, 8, 5, 2, 11, 8],
      [3, 2, 11, 1, 4, 5, 1, 0, 4],
      [9, 4, 5, 8, 2, 11, 8, 0, 2],
      [11, 3, 2, 9, 4, 5],
      [8, 5, 3, 5, 1, 3],
      [5, 0, 4, 5, 1, 0],
      [3, 8, 0, 4, 5, 9],
      [9, 4, 5],
      [11, 9, 10],
      [11, 9, 10],
      [1, 11, 4, 1, 10, 11],
      [8, 7, 4, 11, 1, 10, 11, 3, 1],
      [2, 7, 9, 2, 9, 10],
      [4, 8, 7, 0, 10, 2, 0, 9, 10],
      [2, 1, 10, 0, 7, 4, 0, 3, 7],
      [10, 2, 1, 8, 7, 4],
      [1, 7, 4],
      [3, 2, 11, 4, 8, 7, 9, 1, 0],
      [11, 4, 2, 4, 0, 2],
      [2, 11, 3, 7, 4, 8],
      [4, 1, 7, 1, 3, 7],
      [1, 0, 9, 8, 7, 4],
      [3, 4, 0, 3, 7, 4],
      [8, 7, 4],
      [8, 9, 10, 8, 10, 11],
      [3, 9, 11, 9, 10, 11],
      [0, 10, 8, 10, 11, 8],
      [10, 3, 1, 10, 11, 3],
      [2, 8, 10, 8, 9, 10],
      [9, 2, 0, 9, 10, 2],
      [8, 0, 3, 1, 10, 2],
      [10, 2, 1],
      [1, 11, 9, 11, 8, 9],
      [11, 3, 2, 0, 9, 1],
      [11, 0, 2, 11, 8, 0],
      [11, 3, 2],
      [8, 1, 3, 8, 9, 1],
      [9, 1, 0],
      [8, 0, 3],
      []
    ]),
    m = [
      0,
      265,
      515,
      778,
      2060,
      2309,
      2575,
      2822,
      1030,
      1295,
      1541,
      1804,
      3082,
      3331,
      3593,
      3840,
      400,
      153,
      915,
      666,
      2460,
      2197,
      2975,
      2710,
      1430,
      1183,
      1941,
      1692,
      3482,
      3219,
      3993,
      3728,
      560,
      825,
      51,
      314,
      2620,
      2869,
      2111,
      2358,
      1590,
      1855,
      1077,
      1340,
      3642,
      3891,
      3129,
      3376,
      928,
      681,
      419,
      170,
      2988,
      2725,
      2479,
      2214,
      1958,
      1711,
      1445,
      1196,
      4010,
      3747,
      3497,
      3232,
      2240,
      2505,
      2755,
      3018,
      204,
      453,
      719,
      966,
      3270,
      3535,
      3781,
      4044,
      1226,
      1475,
      1737,
      1984,
      2384,
      2137,
      2899,
      2650,
      348,
      85,
      863,
      598,
      3414,
      3167,
      3925,
      3676,
      1370,
      1107,
      1881,
      1616,
      2800,
      3065,
      2291,
      2554,
      764,
      1013,
      255,
      502,
      3830,
      4095,
      3317,
      3580,
      1786,
      2035,
      1273,
      1520,
      2912,
      2665,
      2403,
      2154,
      876,
      613,
      367,
      102,
      3942,
      3695,
      3429,
      3180,
      1898,
      1635,
      1385,
      1120,
      1120,
      1385,
      1635,
      1898,
      3180,
      3429,
      3695,
      3942,
      102,
      367,
      613,
      876,
      2154,
      2403,
      2665,
      2912,
      1520,
      1273,
      2035,
      1786,
      3580,
      3317,
      4095,
      3830,
      502,
      255,
      1013,
      764,
      2554,
      2291,
      3065,
      2800,
      1616,
      1881,
      1107,
      1370,
      3676,
      3925,
      3167,
      3414,
      598,
      863,
      85,
      348,
      2650,
      2899,
      2137,
      2384,
      1984,
      1737,
      1475,
      1226,
      4044,
      3781,
      3535,
      3270,
      966,
      719,
      453,
      204,
      3018,
      2755,
      2505,
      2240,
      3232,
      3497,
      3747,
      4010,
      1196,
      1445,
      1711,
      1958,
      2214,
      2479,
      2725,
      2988,
      170,
      419,
      681,
      928,
      3376,
      3129,
      3891,
      3642,
      1340,
      1077,
      1855,
      1590,
      2358,
      2111,
      2869,
      2620,
      314,
      51,
      825,
      560,
      3728,
      3993,
      3219,
      3482,
      1692,
      1941,
      1183,
      1430,
      2710,
      2975,
      2197,
      2460,
      666,
      915,
      153,
      400,
      3840,
      3593,
      3331,
      3082,
      1804,
      1541,
      1295,
      1030,
      2822,
      2575,
      2309,
      2060,
      778,
      515,
      265,
      0
    ],
    s = [
      [],
      [8, 3, 0],
      [9, 0, 1],
      [8, 3, 1, 8, 1, 9],
      [11, 2, 3],
      [11, 2, 0, 11, 0, 8],
      [11, 2, 3, 0, 1, 9],
      [2, 1, 11, 1, 9, 11, 11, 9, 8],
      [10, 1, 2],
      [8, 3, 0, 1, 2, 10],
      [9, 0, 2, 9, 2, 10],
      [3, 2, 8, 2, 10, 8, 8, 10, 9],
      [10, 1, 3, 10, 3, 11],
      [1, 0, 10, 0, 8, 10, 10, 8, 11],
      [0, 3, 9, 3, 11, 9, 9, 11, 10],
      [8, 10, 9, 8, 11, 10],
      [8, 4, 7],
      [3, 0, 4, 3, 4, 7],
      [1, 9, 0, 8, 4, 7],
      [9, 4, 1, 4, 7, 1, 1, 7, 3],
      [2, 3, 11, 7, 8, 4],
      [7, 11, 4, 11, 2, 4, 4, 2, 0],
      [3, 11, 2, 4, 7, 8, 9, 0, 1],
      [2, 7, 11, 2, 1, 7, 1, 4, 7, 1, 9, 4],
      [10, 1, 2, 8, 4, 7],
      [2, 10, 1, 0, 4, 7, 0, 7, 3],
      [4, 7, 8, 0, 2, 10, 0, 10, 9],
      [2, 7, 3, 2, 9, 7, 7, 9, 4, 2, 10, 9],
      [8, 4, 7, 11, 10, 1, 11, 1, 3],
      [11, 4, 7, 1, 4, 11, 1, 11, 10, 1, 0, 4],
      [3, 8, 0, 7, 11, 4, 11, 9, 4, 11, 10, 9],
      [7, 11, 4, 4, 11, 9, 11, 10, 9],
      [9, 5, 4],
      [3, 0, 8, 4, 9, 5],
      [5, 4, 0, 5, 0, 1],
      [4, 8, 5, 8, 3, 5, 5, 3, 1],
      [11, 2, 3, 9, 5, 4],
      [9, 5, 4, 8, 11, 2, 8, 2, 0],
      [3, 11, 2, 1, 5, 4, 1, 4, 0],
      [8, 5, 4, 2, 5, 8, 2, 8, 11, 2, 1, 5],
      [2, 10, 1, 9, 5, 4],
      [0, 8, 3, 5, 4, 9, 10, 1, 2],
      [10, 5, 2, 5, 4, 2, 2, 4, 0],
      [3, 4, 8, 3, 2, 4, 2, 5, 4, 2, 10, 5],
      [5, 4, 9, 1, 3, 11, 1, 11, 10],
      [0, 9, 1, 4, 8, 5, 8, 10, 5, 8, 11, 10],
      [3, 4, 0, 3, 10, 4, 4, 10, 5, 3, 11, 10],
      [4, 8, 5, 5, 8, 10, 8, 11, 10],
      [9, 5, 7, 9, 7, 8],
      [0, 9, 3, 9, 5, 3, 3, 5, 7],
      [8, 0, 7, 0, 1, 7, 7, 1, 5],
      [1, 7, 3, 1, 5, 7],
      [11, 2, 3, 8, 9, 5, 8, 5, 7],
      [9, 2, 0, 9, 7, 2, 2, 7, 11, 9, 5, 7],
      [0, 3, 8, 2, 1, 11, 1, 7, 11, 1, 5, 7],
      [2, 1, 11, 11, 1, 7, 1, 5, 7],
      [1, 2, 10, 5, 7, 8, 5, 8, 9],
      [9, 1, 0, 10, 5, 2, 5, 3, 2, 5, 7, 3],
      [5, 2, 10, 8, 2, 5, 8, 5, 7, 8, 0, 2],
      [10, 5, 2, 2, 5, 3, 5, 7, 3],
      [3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5],
      [9, 1, 0, 10, 7, 11, 10, 5, 7],
      [3, 8, 0, 7, 10, 5, 7, 11, 10],
      [11, 5, 7, 11, 10, 5],
      [11, 7, 6],
      [0, 8, 3, 11, 7, 6],
      [9, 0, 1, 11, 7, 6],
      [7, 6, 11, 3, 1, 9, 3, 9, 8],
      [2, 3, 7, 2, 7, 6],
      [8, 7, 0, 7, 6, 0, 0, 6, 2],
      [1, 9, 0, 3, 7, 6, 3, 6, 2],
      [7, 6, 2, 7, 2, 9, 2, 1, 9, 7, 9, 8],
      [1, 2, 10, 6, 11, 7],
      [2, 10, 1, 7, 6, 11, 8, 3, 0],
      [11, 7, 6, 10, 9, 0, 10, 0, 2],
      [7, 6, 11, 3, 2, 8, 8, 2, 10, 8, 10, 9],
      [6, 10, 7, 10, 1, 7, 7, 1, 3],
      [6, 10, 1, 6, 1, 7, 7, 1, 0, 7, 0, 8],
      [9, 0, 3, 6, 9, 3, 6, 10, 9, 6, 3, 7],
      [6, 10, 7, 7, 10, 8, 10, 9, 8],
      [8, 4, 6, 8, 6, 11],
      [11, 3, 6, 3, 0, 6, 6, 0, 4],
      [0, 1, 9, 4, 6, 11, 4, 11, 8],
      [1, 9, 4, 11, 1, 4, 11, 3, 1, 11, 4, 6],
      [3, 8, 2, 8, 4, 2, 2, 4, 6],
      [2, 0, 4, 2, 4, 6],
      [1, 9, 0, 3, 8, 2, 2, 8, 4, 2, 4, 6],
      [9, 4, 1, 1, 4, 2, 4, 6, 2],
      [10, 1, 2, 11, 8, 4, 11, 4, 6],
      [10, 1, 2, 11, 3, 6, 6, 3, 0, 6, 0, 4],
      [0, 2, 10, 0, 10, 9, 4, 11, 8, 4, 6, 11],
      [2, 11, 3, 6, 9, 4, 6, 10, 9],
      [8, 4, 6, 8, 6, 1, 6, 10, 1, 8, 1, 3],
      [1, 0, 10, 10, 0, 6, 0, 4, 6],
      [8, 0, 3, 9, 6, 10, 9, 4, 6],
      [10, 4, 6, 10, 9, 4],
      [9, 5, 4, 7, 6, 11],
      [4, 9, 5, 3, 0, 8, 11, 7, 6],
      [6, 11, 7, 4, 0, 1, 4, 1, 5],
      [6, 11, 7, 4, 8, 5, 5, 8, 3, 5, 3, 1],
      [4, 9, 5, 6, 2, 3, 6, 3, 7],
      [9, 5, 4, 8, 7, 0, 0, 7, 6, 0, 6, 2],
      [4, 0, 1, 4, 1, 5, 6, 3, 7, 6, 2, 3],
      [7, 4, 8, 5, 2, 1, 5, 6, 2],
      [6, 11, 7, 1, 2, 10, 9, 5, 4],
      [11, 7, 6, 8, 3, 0, 1, 2, 10, 9, 5, 4],
      [11, 7, 6, 10, 5, 2, 2, 5, 4, 2, 4, 0],
      [7, 4, 8, 2, 11, 3, 10, 5, 6],
      [4, 9, 5, 6, 10, 7, 7, 10, 1, 7, 1, 3],
      [5, 6, 10, 0, 9, 1, 8, 7, 4],
      [5, 6, 10, 7, 0, 3, 7, 4, 0],
      [10, 5, 6, 4, 8, 7],
      [5, 6, 9, 6, 11, 9, 9, 11, 8],
      [0, 9, 5, 0, 5, 3, 3, 5, 6, 3, 6, 11],
      [0, 1, 5, 0, 5, 11, 5, 6, 11, 0, 11, 8],
      [11, 3, 6, 6, 3, 5, 3, 1, 5],
      [9, 5, 6, 3, 9, 6, 3, 8, 9, 3, 6, 2],
      [5, 6, 9, 9, 6, 0, 6, 2, 0],
      [0, 3, 8, 2, 5, 6, 2, 1, 5],
      [1, 6, 2, 1, 5, 6],
      [1, 2, 10, 5, 6, 9, 9, 6, 11, 9, 11, 8],
      [1, 0, 9, 6, 10, 5, 11, 3, 2],
      [6, 10, 5, 2, 8, 0, 2, 11, 8],
      [3, 2, 11, 10, 5, 6],
      [10, 5, 6, 9, 3, 8, 9, 1, 3],
      [0, 9, 1, 5, 6, 10],
      [8, 0, 3, 10, 5, 6],
      [10, 5, 6],
      [10, 6, 5],
      [8, 3, 0, 10, 6, 5],
      [0, 1, 9, 5, 10, 6],
      [10, 6, 5, 9, 8, 3, 9, 3, 1],
      [3, 11, 2, 10, 6, 5],
      [6, 5, 10, 2, 0, 8, 2, 8, 11],
      [1, 9, 0, 6, 5, 10, 11, 2, 3],
      [1, 10, 2, 5, 9, 6, 9, 11, 6, 9, 8, 11],
      [1, 2, 6, 1, 6, 5],
      [0, 8, 3, 2, 6, 5, 2, 5, 1],
      [5, 9, 6, 9, 0, 6, 6, 0, 2],
      [9, 6, 5, 3, 6, 9, 3, 9, 8, 3, 2, 6],
      [11, 6, 3, 6, 5, 3, 3, 5, 1],
      [0, 5, 1, 0, 11, 5, 5, 11, 6, 0, 8, 11],
      [0, 5, 9, 0, 3, 5, 3, 6, 5, 3, 11, 6],
      [5, 9, 6, 6, 9, 11, 9, 8, 11],
      [10, 6, 5, 4, 7, 8],
      [5, 10, 6, 7, 3, 0, 7, 0, 4],
      [5, 10, 6, 0, 1, 9, 8, 4, 7],
      [4, 5, 9, 6, 7, 10, 7, 1, 10, 7, 3, 1],
      [7, 8, 4, 2, 3, 11, 10, 6, 5],
      [11, 6, 7, 10, 2, 5, 2, 4, 5, 2, 0, 4],
      [11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5],
      [6, 7, 11, 1, 10, 2, 9, 4, 5],
      [7, 8, 4, 5, 1, 2, 5, 2, 6],
      [4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2],
      [9, 4, 5, 8, 0, 7, 0, 6, 7, 0, 2, 6],
      [4, 5, 9, 6, 3, 2, 6, 7, 3],
      [6, 7, 11, 4, 5, 8, 5, 3, 8, 5, 1, 3],
      [6, 7, 11, 4, 1, 0, 4, 5, 1],
      [4, 5, 9, 3, 8, 0, 11, 6, 7],
      [9, 4, 5, 7, 11, 6],
      [10, 6, 4, 10, 4, 9],
      [8, 3, 0, 9, 10, 6, 9, 6, 4],
      [1, 10, 0, 10, 6, 0, 0, 6, 4],
      [8, 6, 4, 8, 1, 6, 6, 1, 10, 8, 3, 1],
      [2, 3, 11, 6, 4, 9, 6, 9, 10],
      [0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6],
      [10, 2, 1, 11, 6, 3, 6, 0, 3, 6, 4, 0],
      [10, 2, 1, 11, 4, 8, 11, 6, 4],
      [9, 1, 4, 1, 2, 4, 4, 2, 6],
      [1, 0, 9, 3, 2, 8, 2, 4, 8, 2, 6, 4],
      [2, 4, 0, 2, 6, 4],
      [3, 2, 8, 8, 2, 4, 2, 6, 4],
      [1, 4, 9, 11, 4, 1, 11, 1, 3, 11, 6, 4],
      [0, 9, 1, 4, 11, 6, 4, 8, 11],
      [11, 6, 3, 3, 6, 0, 6, 4, 0],
      [8, 6, 4, 8, 11, 6],
      [6, 7, 10, 7, 8, 10, 10, 8, 9],
      [9, 3, 0, 6, 3, 9, 6, 9, 10, 6, 7, 3],
      [6, 1, 10, 6, 7, 1, 7, 0, 1, 7, 8, 0],
      [6, 7, 10, 10, 7, 1, 7, 3, 1],
      [7, 11, 6, 3, 8, 2, 8, 10, 2, 8, 9, 10],
      [11, 6, 7, 10, 0, 9, 10, 2, 0],
      [2, 1, 10, 7, 11, 6, 8, 0, 3],
      [1, 10, 2, 6, 7, 11],
      [7, 2, 6, 7, 9, 2, 2, 9, 1, 7, 8, 9],
      [1, 0, 9, 3, 6, 7, 3, 2, 6],
      [8, 0, 7, 7, 0, 6, 0, 2, 6],
      [2, 7, 3, 2, 6, 7],
      [7, 11, 6, 3, 9, 1, 3, 8, 9],
      [9, 1, 0, 11, 6, 7],
      [0, 3, 8, 11, 6, 7],
      [11, 6, 7],
      [11, 7, 5, 11, 5, 10],
      [3, 0, 8, 7, 5, 10, 7, 10, 11],
      [9, 0, 1, 10, 11, 7, 10, 7, 5],
      [3, 1, 9, 3, 9, 8, 7, 10, 11, 7, 5, 10],
      [10, 2, 5, 2, 3, 5, 5, 3, 7],
      [5, 10, 2, 8, 5, 2, 8, 7, 5, 8, 2, 0],
      [9, 0, 1, 10, 2, 5, 5, 2, 3, 5, 3, 7],
      [1, 10, 2, 5, 8, 7, 5, 9, 8],
      [2, 11, 1, 11, 7, 1, 1, 7, 5],
      [0, 8, 3, 2, 11, 1, 1, 11, 7, 1, 7, 5],
      [9, 0, 2, 9, 2, 7, 2, 11, 7, 9, 7, 5],
      [11, 3, 2, 8, 5, 9, 8, 7, 5],
      [1, 3, 7, 1, 7, 5],
      [8, 7, 0, 0, 7, 1, 7, 5, 1],
      [0, 3, 9, 9, 3, 5, 3, 7, 5],
      [9, 7, 5, 9, 8, 7],
      [4, 5, 8, 5, 10, 8, 8, 10, 11],
      [3, 0, 4, 3, 4, 10, 4, 5, 10, 3, 10, 11],
      [0, 1, 9, 4, 5, 8, 8, 5, 10, 8, 10, 11],
      [5, 9, 4, 1, 11, 3, 1, 10, 11],
      [3, 8, 4, 3, 4, 2, 2, 4, 5, 2, 5, 10],
      [10, 2, 5, 5, 2, 4, 2, 0, 4],
      [0, 3, 8, 5, 9, 4, 10, 2, 1],
      [2, 1, 10, 9, 4, 5],
      [8, 4, 5, 2, 8, 5, 2, 11, 8, 2, 5, 1],
      [3, 2, 11, 1, 4, 5, 1, 0, 4],
      [9, 4, 5, 8, 2, 11, 8, 0, 2],
      [11, 3, 2, 9, 4, 5],
      [4, 5, 8, 8, 5, 3, 5, 1, 3],
      [5, 0, 4, 5, 1, 0],
      [3, 8, 0, 4, 5, 9],
      [9, 4, 5],
      [7, 4, 11, 4, 9, 11, 11, 9, 10],
      [3, 0, 8, 7, 4, 11, 11, 4, 9, 11, 9, 10],
      [11, 7, 4, 1, 11, 4, 1, 10, 11, 1, 4, 0],
      [8, 7, 4, 11, 1, 10, 11, 3, 1],
      [2, 3, 7, 2, 7, 9, 7, 4, 9, 2, 9, 10],
      [4, 8, 7, 0, 10, 2, 0, 9, 10],
      [2, 1, 10, 0, 7, 4, 0, 3, 7],
      [10, 2, 1, 8, 7, 4],
      [2, 11, 7, 2, 7, 1, 1, 7, 4, 1, 4, 9],
      [3, 2, 11, 4, 8, 7, 9, 1, 0],
      [7, 4, 11, 11, 4, 2, 4, 0, 2],
      [2, 11, 3, 7, 4, 8],
      [9, 1, 4, 4, 1, 7, 1, 3, 7],
      [1, 0, 9, 8, 7, 4],
      [3, 4, 0, 3, 7, 4],
      [8, 7, 4],
      [8, 9, 10, 8, 10, 11],
      [0, 9, 3, 3, 9, 11, 9, 10, 11],
      [1, 10, 0, 0, 10, 8, 10, 11, 8],
      [10, 3, 1, 10, 11, 3],
      [3, 8, 2, 2, 8, 10, 8, 9, 10],
      [9, 2, 0, 9, 10, 2],
      [8, 0, 3, 1, 10, 2],
      [10, 2, 1],
      [2, 11, 1, 1, 11, 9, 11, 8, 9],
      [11, 3, 2, 0, 9, 1],
      [11, 0, 2, 11, 8, 0],
      [11, 3, 2],
      [8, 1, 3, 8, 9, 1],
      [9, 1, 0],
      [8, 0, 3],
      []
    ];
  return a;
};
$3Dmol.MarchingCube = $3Dmol.MarchingCubeInitializer();
$3Dmol.Parsers = (function() {
  var a = {},
    b = function(a) {
      var b = a.slice(0),
        c,
        t;
      c = 0;
      for (t = a.length; c < t; c++) a[c].index || (a[c].index = c);
      b.sort(function(a, b) {
        return a.z - b.z;
      });
      c = 0;
      for (t = b.length; c < t; c++) {
        var l = b[c];
        for (a = c + 1; a < t; a++) {
          var e = b[a];
          if (4.725 < e.z - l.z) break;
          else
            4.725 < Math.abs(e.x - l.x) ||
              4.725 < Math.abs(e.y - l.y) ||
              !w(l, e) ||
              -1 != l.bonds.indexOf(e.index) ||
              (l.bonds.push(e.index),
              l.bondOrder.push(1),
              e.bonds.push(l.index),
              e.bondOrder.push(1));
        }
      }
    },
    c = function(a) {
      var c = [],
        h = [],
        t,
        l;
      t = 0;
      for (l = a.length; t < l; t++) {
        var e = a[t];
        e.index = t;
        e.hetflag ? h.push(e) : c.push(e);
      }
      b(h);
      c.sort(function(a, b) {
        return a.chain != b.chain
          ? a.chain < b.chain
            ? -1
            : 1
          : a.resi - b.resi;
      });
      var h = (a = -1),
        m;
      t = 0;
      for (l = c.length; t < l; t++) {
        e = c[t];
        e.resi !== a && ((a = e.resi), m || h++, (m = !1));
        e.reschain = h;
        for (var f = t + 1; f < c.length; f++) {
          var s = c[f];
          if (s.chain != e.chain) break;
          if (1 < s.resi - e.resi) break;
          w(e, s) &&
            (-1 === e.bonds.indexOf(s.index) &&
              (e.bonds.push(s.index),
              e.bondOrder.push(1),
              s.bonds.push(e.index),
              s.bondOrder.push(1)),
            e.resi !== s.resi && (m = !0));
        }
      }
    },
    m = function(a) {
      var b = [],
        c,
        t;
      c = 0;
      for (t = a.length; c < t; c++) {
        a[c].index = c;
        var l = a[c];
        l.hetflag ||
          ("N" !== l.atom && "O" !== l.atom) ||
          (b.push(l),
          (l.hbondOther = null),
          (l.hbondDistanceSq = Number.POSITIVE_INFINITY));
      }
      b.sort(function(a, b) {
        return a.z - b.z;
      });
      c = 0;
      for (t = b.length; c < t; c++)
        for (l = b[c], a = c + 1; a < t; a++) {
          var e = b[a],
            m = e.z - l.z;
          if (3.2 < m) break;
          if (e.atom != l.atom) {
            var f = Math.abs(e.y - l.y);
            if (!(3.2 < f)) {
              var s = Math.abs(e.x - l.x);
              3.2 < s ||
                ((m = s * s + f * f + m * m),
                10.24 < m ||
                  (e.chain == l.chain && 4 > Math.abs(e.resi - l.resi)) ||
                  (m < l.hbondDistanceSq &&
                    ((l.hbondOther = e), (l.hbondDistanceSq = m)),
                  m < e.hbondDistanceSq &&
                    ((e.hbondOther = l), (e.hbondDistanceSq = m))));
            }
          }
        }
    },
    s = function(a) {
      m(a);
      var b = {},
        c,
        t,
        l,
        e,
        s;
      c = 0;
      for (t = a.length; c < t; c++)
        (e = a[c]),
          "undefined" === typeof b[e.chain] && (b[e.chain] = []),
          isFinite(e.hbondDistanceSq) &&
            (4 === Math.abs(e.hbondOther.resi - e.resi)
              ? (b[e.chain][e.resi] = "h")
              : (b[e.chain][e.resi] = "s"));
      for (l in b) {
        for (c = 1; c < b[l].length - 1; c++)
          (t = b[l][c - 1]),
            (e = b[l][c + 1]),
            (s = b[l][c]),
            t == e && s != t && (b[l][c] = t);
        for (c = 0; c < b[l].length; c++)
          (s = b[l][c]),
            ("h" != s && "s" != s) ||
              b[l][c - 1] == s ||
              b[l][c + 1] == s ||
              delete b[l][c];
      }
      c = 0;
      for (t = a.length; c < t; c++)
        (e = a[c]),
          (s = b[e.chain][e.resi]),
          "undefined" != typeof s &&
            ((e.ss = s),
            b[e.chain][e.resi - 1] != s && (e.ssbegin = !0),
            b[e.chain][e.resi + 1] != s && (e.ssend = !0));
    };
  a.cube = a.CUBE = function(a, c) {
    var h = [[]],
      t = a.replace(/^\s+/, "").split(/\n\r|\r+/);
    if (6 > t.length) return h;
    for (
      var l = t[2]
          .replace(/^\s+/, "")
          .replace(/\s+/g, " ")
          .split(" "),
        e = Math.abs(parseFloat(l[0])),
        l = t[3]
          .replace(/^\s+/, "")
          .replace(/\s+/g, " ")
          .split(" "),
        l = 0 < parseFloat(l[0]) ? 0.529177 : 1,
        t = t.splice(6, e),
        e = h[h.length - 1].length,
        m = e + t.length,
        f = e;
      f < m;
      ++f
    ) {
      var s = {};
      s.serial = f;
      var u = t[f - e]
        .replace(/^\s+/, "")
        .replace(/\s+/g, " ")
        .split(" ");
      6 == u[0]
        ? (s.elem = "C")
        : 1 == u[0]
        ? (s.elem = "H")
        : 8 == u[0]
        ? (s.elem = "O")
        : 17 == u[0] && (s.elem = "Cl");
      s.x = parseFloat(u[2]) * l;
      s.y = parseFloat(u[3]) * l;
      s.z = parseFloat(u[4]) * l;
      s.hetflag = !0;
      s.bonds = [];
      s.bondOrder = [];
      s.properties = {};
      h[h.length - 1].push(s);
    }
    for (f = 0; f < h.length; f++) b(h[f]);
    return h;
  };
  a.xyz = a.XYZ = function(a, c) {
    for (
      var h = [[]], t = a.split(/\r?\n|\r/);
      0 < t.length && !(3 > t.length);

    ) {
      var l = parseInt(t[0].substr(0, 3));
      if (isNaN(l) || 0 >= l) break;
      if (t.length < l + 2) break;
      for (var e = 2, m = h[h.length - 1].length, l = m + l; m < l; m++) {
        var f = t[e++]
            .replace(/^\s+/, "")
            .replace(/\s+/g, " ")
            .split(" "),
          s = {};
        s.serial = m;
        var u = f[0];
        s.atom = s.elem = u[0].toUpperCase() + u.substr(1).toLowerCase();
        s.x = parseFloat(f[1]);
        s.y = parseFloat(f[2]);
        s.z = parseFloat(f[3]);
        s.hetflag = !0;
        s.bonds = [];
        s.bondOrder = [];
        s.properties = {};
        h[h.length - 1][m] = s;
        7 <= f.length &&
          ((s.dx = parseFloat(f[4])),
          (s.dy = parseFloat(f[5])),
          (s.dz = parseFloat(f[6])));
      }
      if (c.multimodel) h.push([]), t.splice(0, e);
      else break;
    }
    for (m = 0; m < h.length; m++) b(h[m]);
    if (c.onemol)
      for (t = h, h = [], h.push(t[0]), m = 1; m < t.length; m++)
        for (e = h[0].length, l = 0; l < t[m].length; l++) {
          f = t[m][l];
          for (s = 0; s < f.bonds.length; s++) f.bonds[s] += e;
          f.index = h[0].length;
          f.serial = h[0].length;
          h[0].push(f);
        }
    return h;
  };
  a.sdf = a.SDF = function(a, b) {
    var c = [[]],
      t = !1;
    "undefined" !== typeof b.keepH && (t = !b.keepH);
    for (var l = a.split(/\r?\n|\r/); 0 < l.length && !(4 > l.length); ) {
      var e = parseInt(l[3].substr(0, 3));
      if (isNaN(e) || 0 >= e) break;
      var s = parseInt(l[3].substr(3, 3)),
        f = 4;
      if (l.length < 4 + e + s) break;
      for (
        var m = [], u = c[c.length - 1].length, q = u + e, g, e = u;
        e < q;
        e++, f++
      ) {
        g = l[f];
        var w = {},
          z = g.substr(31, 3).replace(/ /g, "");
        w.atom = w.elem = z[0].toUpperCase() + z.substr(1).toLowerCase();
        ("H" == w.elem && t) ||
          ((w.serial = e),
          (m[e] = c[c.length - 1].length),
          (w.x = parseFloat(g.substr(0, 10))),
          (w.y = parseFloat(g.substr(10, 10))),
          (w.z = parseFloat(g.substr(20, 10))),
          (w.hetflag = !0),
          (w.bonds = []),
          (w.bondOrder = []),
          (w.properties = {}),
          (w.index = c[c.length - 1].length),
          c[c.length - 1].push(w));
      }
      for (e = 0; e < s; e++, f++)
        (g = l[f]),
          (q = m[parseInt(g.substr(0, 3)) - 1 + u]),
          (w = m[parseInt(g.substr(3, 3)) - 1 + u]),
          (g = parseInt(g.substr(6, 3))),
          "undefined" != typeof q &&
            "undefined" != typeof w &&
            (c[c.length - 1][q].bonds.push(w),
            c[c.length - 1][q].bondOrder.push(g),
            c[c.length - 1][w].bonds.push(q),
            c[c.length - 1][w].bondOrder.push(g));
      if (b.multimodel) {
        for (b.onemol || c.push([]); "$$$$" != l[f]; ) f++;
        l.splice(0, ++f);
      } else break;
    }
    return c;
  };
  a.cdjson = a.json = function(a, b) {
    var c = [[]];
    "string" === typeof a && (a = JSON.parse(a));
    for (
      var t = a.m,
        l = t[0].a,
        e = t[0].b,
        s = t[0].s,
        f =
          void 0 !== b && void 0 !== b.parseStyle ? b.parseStyle : void 0 !== s,
        t = c[c.length - 1].length,
        m = 0;
      m < l.length;
      m++
    ) {
      var u = l[m],
        q = {};
      q.id = u.i;
      q.x = u.x;
      q.y = u.y;
      q.z = u.z || 0;
      q.bonds = [];
      q.bondOrder = [];
      var g = u.l || "C";
      q.elem = g[0].toUpperCase() + g.substr(1).toLowerCase();
      q.serial = c[c.length - 1].length;
      f && (q.style = s[u.s || 0]);
      c[c.length - 1].push(q);
    }
    for (m = 0; m < e.length; m++)
      (f = e[m]),
        (l = f.b + t),
        (s = f.e + t),
        (f = f.o || 1),
        (u = c[c.length - 1][l]),
        (q = c[c.length - 1][s]),
        u.bonds.push(s),
        u.bondOrder.push(f),
        q.bonds.push(l),
        q.bondOrder.push(f);
    return c;
  };
  a.mcif = a.cif = function(a, c) {
    function h(a, b) {
      for (var d = [], c = 0, e = 0; e < a.length; ) {
        for (; a.substr(e, b.length) !== b && e < a.length; ) {
          if ("'" === a[e]) for (e++; e < a.length && "'" !== a[e]; ) e++;
          else if ('"' === a[e]) for (e++; e < a.length && '"' !== a[e]; ) e++;
          e++;
        }
        d.push(a.substr(c, e - c));
        c = e += b.length;
      }
      return d;
    }
    for (
      var t = [],
        l = !c.doAssembly,
        e = !c.duplicateAssemblyAtoms,
        m = (t.modelData = []),
        f = a.split(/\r?\n|\r/),
        w = [],
        u = !1,
        q = 0;
      q < f.length;
      q++
    ) {
      var g = f[q].split("#")[0];
      u ? ";" === g[0] && (u = !1) : ";" === g[0] && (u = !0);
      if (u || "" !== g) {
        if (!u && ((g = g.trim()), "_" === g[0])) {
          var B = g.split(/\s/)[0].indexOf(".");
          -1 < B &&
            ((g[B] = "_"), (g = g.substr(0, B) + "_" + g.substr(B + 1)));
        }
        w.push(g);
      }
    }
    for (q = 0; q < w.length; ) {
      f = function(a) {
        var b = a.match("-");
        a = a.replace(/[-xyz]/g, "");
        a = a.split("/");
        var d;
        d = void 0 === a[1] ? 1 : parseInt(a[1]);
        return (("" === a[0] ? 1 : parseInt(a[0])) / d) * (b ? -1 : 1);
      };
      for (
        B = function(a, b, d) {
          return {
            x: p[0][0] * a + p[0][1] * b + p[0][2] * d,
            y: p[1][0] * a + p[1][1] * b + p[1][2] * d,
            z: p[2][0] * a + p[2][1] * b + p[2][2] * d
          };
        };
        !w[q].startsWith("data_") || "data_global" === w[q];

      )
        q++;
      q++;
      for (u = {}; q < w.length && !w[q].startsWith("data_"); )
        if (void 0 === w[q][0]) q++;
        else if ("_" === w[q][0]) {
          var I = w[q].split(/\s/)[0].toLowerCase(),
            g = (u[I] = u[I] || []),
            A = w[q].substr(w[q].indexOf(I) + I.length);
          if ("" === A)
            if ((q++, ";" === w[q][0])) {
              A = w[q].substr(1);
              for (q++; ";" !== w[q]; ) (A = A + "\n" + w[q]), q++;
              g.push(A);
            } else g.push(w[q]);
          else g.push(A.trim());
          q++;
        } else if ("loop_" === w[q].substr(0, 5)) {
          q++;
          for (A = []; "" === w[q] || "_" === w[q][0]; )
            "" !== w[q] &&
              ((I = w[q].split(/\s/)[0].toLowerCase()),
              (g = u[I] = u[I] || []),
              A.push(g)),
              q++;
          for (
            I = 0;
            q < w.length &&
            "_" !== w[q][0] &&
            !w[q].startsWith("loop_") &&
            !w[q].startsWith("data_");

          ) {
            for (var g = h(w[q], " "), D = 0; D < g.length; D++)
              "" !== g[D] && (A[I].push(g[D]), (I = (I + 1) % A.length));
            q++;
          }
        } else q++;
      m.push({ symmetries: [] });
      var A = [],
        D = 0,
        I =
          void 0 !== u._atom_site_id
            ? u._atom_site_id.length
            : u._atom_site_label.length,
        p;
      if (void 0 !== u._cell_length_a) {
        var g = parseFloat(u._cell_length_a),
          y = parseFloat(u._cell_length_b),
          L = parseFloat(u._cell_length_c),
          O = parseFloat(u._cell_angle_alpha) || 90,
          J = parseFloat(u._cell_angle_beta) || 90,
          H = parseFloat(u._cell_angle_gamma) || 90,
          K = (J * Math.PI) / 180,
          M = (H * Math.PI) / 180,
          P = Math.cos((O * Math.PI) / 180),
          K = Math.cos(K),
          U = Math.cos(M),
          M = Math.sin(M);
        p = [
          [g, y * U, L * K],
          [0, y * M, (L * (P - K * U)) / M],
          [0, 0, (L * Math.sqrt(1 - P * P - K * K - U * U + 2 * P * K * U)) / M]
        ];
        m[m.length - 1].cryst = {
          a: g,
          b: y,
          c: L,
          alpha: O,
          beta: J,
          gamma: H
        };
      }
      for (g = 0; g < I; g++)
        if (
          void 0 === u._atom_site_group_pdb ||
          "TER" !== u._atom_site_group_pdb[g]
        )
          (y = {}),
            void 0 !== u._atom_site_cartn_x
              ? ((y.x = parseFloat(u._atom_site_cartn_x[g])),
                (y.y = parseFloat(u._atom_site_cartn_y[g])),
                (y.z = parseFloat(u._atom_site_cartn_z[g])))
              : ((L = B(
                  parseFloat(u._atom_site_fract_x[g]),
                  parseFloat(u._atom_site_fract_y[g]),
                  parseFloat(u._atom_site_fract_z[g])
                )),
                (y.x = L.x),
                (y.y = L.y),
                (y.z = L.z)),
            (y.chain = u._atom_site_auth_asym_id
              ? u._atom_site_auth_asym_id[g]
              : void 0),
            (y.resi = u._atom_site_auth_seq_id
              ? parseInt(u._atom_site_auth_seq_id[g])
              : void 0),
            (y.resn = u._atom_site_auth_comp_id
              ? u._atom_site_auth_comp_id[g].trim()
              : void 0),
            (y.atom = u._atom_site_auth_atom_id
              ? u._atom_site_auth_atom_id[g].replace(/"/gm, "")
              : void 0),
            (y.hetflag =
              !u._atom_site_group_pdb ||
              "HETA" === u._atom_site_group_pdb[g] ||
              "HETATM" === u._atom_site_group_pdb[g]),
            (L = u._atom_site_type_symbol[g]),
            (y.elem = L[0].toUpperCase() + L.substr(1).toLowerCase()),
            (y.bonds = []),
            (y.ss = "c"),
            (y.serial = g),
            (y.bondOrder = []),
            (y.properties = {}),
            (y.index = D++),
            (A[y.index] = y);
      B = {};
      for (g = 0; g < I; g++)
        (D = (u._atom_site_label_alt_id || [])[g]),
          void 0 === D && (D = "."),
          (y = (u._atom_site_label_asym_id || [])[g]),
          void 0 === y && (y = "."),
          (L = (u._atom_site_label_atom_id || [])[g]),
          void 0 === L && (L = "."),
          (O = (u._atom_site_label_seq_id || [])[g]),
          void 0 === O && (O = "."),
          void 0 === B[D] && (B[D] = {}),
          void 0 === B[D][y] && (B[D][y] = {}),
          void 0 === B[D][y][L] && (B[D][y][L] = {}),
          (B[D][y][L][O] = g);
      t.push([]);
      for (g = 0; g < A.length; g++)
        delete A[g].index, t[t.length - 1].push(A[g]);
      if (void 0 !== u._pdbx_struct_oper_list_id && !l) {
        for (g = 0; g < u._pdbx_struct_oper_list_id.length; g++)
          (B = parseFloat(u["_pdbx_struct_oper_list_matrix[1][1]"][g])),
            (A = parseFloat(u["_pdbx_struct_oper_list_matrix[1][2]"][g])),
            (I = parseFloat(u["_pdbx_struct_oper_list_matrix[1][3]"][g])),
            (D = parseFloat(u["_pdbx_struct_oper_list_vector[1]"][g])),
            (y = parseFloat(u["_pdbx_struct_oper_list_matrix[2][1]"][g])),
            (L = parseFloat(u["_pdbx_struct_oper_list_matrix[2][2]"][g])),
            (O = parseFloat(u["_pdbx_struct_oper_list_matrix[2][3]"][g])),
            (J = parseFloat(u["_pdbx_struct_oper_list_vector[2]"][g])),
            (H = parseFloat(u["_pdbx_struct_oper_list_matrix[3][1]"][g])),
            (P = parseFloat(u["_pdbx_struct_oper_list_matrix[3][2]"][g])),
            (M = parseFloat(u["_pdbx_struct_oper_list_matrix[3][3]"][g])),
            (K = parseFloat(u["_pdbx_struct_oper_list_vector[3]"][g])),
            (B = new $3Dmol.Matrix4(B, A, I, D, y, L, O, J, H, P, M, K)),
            m[m.length - 1].symmetries.push(B);
        for (g = 0; g < t.length; g++) z(m[m.length - 1].symmetries, e, t[g]);
      }
      if (void 0 !== u._symmetry_equiv_pos_as_xyz)
        for (g = 0; g < u._symmetry_equiv_pos_as_xyz.length; g++) {
          A = u._symmetry_equiv_pos_as_xyz[g]
            .replace(/["' ]/g, "")
            .split(",")
            .map(function(a) {
              return a.replace(/-/g, "+-");
            });
          B = new $3Dmol.Matrix4(
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
          );
          for (I = 0; 3 > I; I++)
            for (D = A[I].split("+"), y = 0; y < D.length; y++)
              (L = D[y]),
                "" !== L &&
                  ((O = f(L)),
                  L.match("x")
                    ? (B.elements[I + 0] = O)
                    : L.match("y")
                    ? (B.elements[I + 4] = O)
                    : L.match("z")
                    ? (B.elements[I + 8] = O)
                    : (B.elements[I + 12] = O));
          A = new $3Dmol.Matrix4(
            p[0][0],
            p[0][1],
            p[0][2],
            0,
            p[1][0],
            p[1][1],
            p[1][2],
            0,
            p[2][0],
            p[2][1],
            p[2][2],
            0
          );
          I = new $3Dmol.Matrix4().getInverse(A, !0);
          B = new $3Dmol.Matrix4().multiplyMatrices(B, I);
          B = new $3Dmol.Matrix4().multiplyMatrices(A, B);
          m[m.length - 1].symmetries.push(B);
        }
    }
    for (g = 0; g < t.length; g++)
      b(t[g]), s(t[g]), z(m[m.length - 1].symmetries, e, t[g]);
    return t;
  };
  a.mol2 = a.MOL2 = function(a, b) {
    var c = [[]],
      t = !1;
    "undefined" !== typeof b.keepH && (t = !b.keepH);
    for (var l = a.substr(e, a.length).split(/\r?\n|\r/); 0 < l.length; ) {
      var e = a.search(/@<TRIPOS>MOLECULE/),
        m = a.search(/@<TRIPOS>ATOM/);
      if (-1 == e || -1 == m) break;
      var e = [],
        f = l[2]
          .replace(/^\s+/, "")
          .replace(/\s+/g, " ")
          .split(" "),
        s = parseInt(f[0]),
        m = 0;
      1 < f.length && (m = parseInt(f[1]));
      var u = 4,
        q;
      for (q = 3; q < l.length; q++)
        if ("@<TRIPOS>ATOM" == l[q]) {
          u = q + 1;
          break;
        }
      q = c[c.length - 1].length;
      for (s = q + s; q < s; q++) {
        var f = l[u++],
          f = f
            .replace(/^\s+/, "")
            .replace(/\s+/g, " ")
            .split(" "),
          g = {},
          w = f[5].split(".")[0];
        g.atom = g.elem = w[0].toUpperCase() + w.substr(1).toLowerCase();
        if ("H" != g.elem || !t) {
          var w = c[c.length - 1].length,
            z = parseInt(f[0]);
          g.serial = z;
          g.x = parseFloat(f[2]);
          g.y = parseFloat(f[3]);
          g.z = parseFloat(f[4]);
          g.atom = f[5];
          f = parseFloat(f[8]);
          g.index = w;
          g.bonds = [];
          g.bondOrder = [];
          g.properties = { charge: f, partialCharge: f };
          e[z] = w;
          c[c.length - 1].push(g);
        }
      }
      for (q = !1; u < l.length; )
        if ("@<TRIPOS>BOND" == l[u++]) {
          q = !0;
          break;
        }
      if (q && m)
        for (q = 0; q < m; q++)
          (f = l[u++]),
            (f = f
              .replace(/^\s+/, "")
              .replace(/\s+/g, " ")
              .split(" ")),
            (s = parseInt(f[1])),
            (fromAtom = c[c.length - 1][e[s]]),
            (g = parseInt(f[2])),
            (toAtom = c[c.length - 1][e[g]]),
            (f = parseInt(f[3])),
            isNaN(f) && (f = 1),
            void 0 !== fromAtom &&
              void 0 !== toAtom &&
              (fromAtom.bonds.push(e[g]),
              fromAtom.bondOrder.push(f),
              toAtom.bonds.push(e[s]),
              toAtom.bondOrder.push(f));
      if (b.multimodel)
        b.onemol || c.push([]), l.splice(0, u), (a = l.join("\n"));
      else break;
    }
    return c;
  };
  var B = {
      H: 0.37,
      He: 0.32,
      Li: 1.34,
      Be: 0.9,
      B: 0.82,
      C: 0.77,
      N: 0.75,
      O: 0.73,
      F: 0.71,
      Ne: 0.69,
      Na: 1.54,
      Mg: 1.3,
      Al: 1.18,
      Si: 1.11,
      P: 1.06,
      S: 1.02,
      Cl: 0.99,
      Ar: 0.97,
      K: 1.96,
      Ca: 1.74,
      Sc: 1.44,
      Ti: 1.56,
      V: 1.25,
      Mn: 1.39,
      Fe: 1.25,
      Co: 1.26,
      Ni: 1.21,
      Cu: 1.38,
      Zn: 1.31,
      Ga: 1.26,
      Ge: 1.22,
      Se: 1.16,
      Br: 1.14,
      Kr: 1.1,
      Rb: 2.11,
      Sr: 1.92,
      Y: 1.62,
      Zr: 1.48,
      Nb: 1.37,
      Mo: 1.45,
      Tc: 1.56,
      Ru: 1.26,
      Rh: 1.35,
      Pd: 1.31,
      Ag: 1.53,
      Cd: 1.48,
      In: 1.44,
      Sn: 1.41,
      Sb: 1.38,
      Te: 1.35,
      I: 1.33,
      Xe: 1.3,
      Cs: 2.25,
      Ba: 1.98,
      Lu: 1.6,
      Hf: 1.5,
      Ta: 1.38,
      W: 1.46,
      Re: 1.59,
      Os: 1.44,
      Ir: 1.37,
      Pt: 1.28,
      Au: 1.44,
      Hg: 1.49,
      Tl: 1.48,
      Pb: 1.47,
      Bi: 1.46,
      Rn: 1.45
    },
    w = function(a, b) {
      var c = (B[a.elem] || 1.6) + (B[b.elem] || 1.6),
        c = c * c * 1.1,
        t = a.x - b.x,
        t = t * t;
      if (t > c) return !1;
      var l = a.y - b.y,
        l = l * l;
      if (l > c) return !1;
      var e = a.z - b.z,
        e = e * e;
      if (e > c) return !1;
      t = t + l + e;
      return isNaN(t) ? !1 : 0.5 > t ? !1 : t > c ? !1 : !0;
    },
    z = function(a, b, c) {
      var t = c.length,
        l = t,
        e,
        m;
      if (!b)
        for (b = 0; b < a.length; b++) {
          if (!a[b].isIdentity()) {
            var f = new $3Dmol.Vector3();
            for (m = 0; m < t; m++) {
              var s = [];
              for (e = 0; e < c[m].bonds.length; e++) s.push(c[m].bonds[e] + l);
              f.set(c[m].x, c[m].y, c[m].z);
              f.applyMatrix4(a[b]);
              e = {};
              for (var u in c[m]) e[u] = c[m][u];
              e.x = f.x;
              e.y = f.y;
              e.z = f.z;
              e.bonds = s;
              c.push(e);
            }
            l = c.length;
          }
        }
      else if (1 < a.length)
        for (b = 0; b < c.length; b++) {
          t = [];
          for (e = 0; e < a.length; e++)
            a[e].isIdentity() ||
              ((l = new $3Dmol.Vector3()),
              l.set(c[b].x, c[b].y, c[b].z),
              l.applyMatrix4(a[e]),
              t.push(l));
          c[b].symmetries = t;
        }
    };
  a.pdb = a.PDB = a.pdbqt = a.PDBQT = function(a, b) {
    var h = [[]],
      m = !b.keepH,
      l = !b.noSecondaryStructure,
      e = !b.doAssembly,
      w = !b.duplicateAssemblyAtoms,
      f = (h.modelData = [{ symmetries: [] }]),
      C = h[h.length - 1].length,
      u,
      q = [],
      g = [],
      E = !1,
      I = [],
      A = a.split(/\r?\n|\r/),
      D,
      p,
      y;
    for (D = 0; D < A.length; D++) {
      y = A[D].replace(/^\s*/, "");
      p = y.substr(0, 6);
      var L;
      if (0 == p.indexOf("END"))
        if (b.multimodel) b.onemol || (h.push([]), f.push({ symmetries: [] }));
        else break;
      else if ("ATOM  " == p || "HETATM" == p) {
        var O, J, H, K, M, P, U, N, S;
        p = y.substr(16, 1);
        if (" " == p || "A" == p)
          (S = parseInt(y.substr(6, 5))),
            (u = y.substr(12, 4).replace(/ /g, "")),
            (L = y.substr(17, 3)),
            (O = y.substr(21, 1)),
            (J = parseInt(y.substr(22, 4))),
            (H = y.substr(26, 1)),
            (K = parseFloat(y.substr(30, 8))),
            (M = parseFloat(y.substr(38, 8))),
            (P = parseFloat(y.substr(46, 8))),
            (p = parseFloat(y.substr(60, 8))),
            (N = y.substr(76, 2).replace(/ /g, "")),
            "" === N
              ? ((N = y.substr(12, 2).replace(/ /g, "")),
                0 < N.length && "H" == N[0] && "Hg" != N && (N = "H"),
                1 < N.length &&
                  ((N = N[0].toUpperCase() + N.substr(1).toLowerCase()),
                  "undefined" === typeof B[N]
                    ? (N = N[0])
                    : "A" == y[0] && "Ca" == N && (N = "C")))
              : (N = N[0].toUpperCase() + N.substr(1).toLowerCase()),
            ("H" == N && m) ||
              ((U = "H" == y[0] ? !0 : !1),
              (I[S] = h[h.length - 1].length),
              h[h.length - 1].push({
                resn: L,
                x: K,
                y: M,
                z: P,
                elem: N,
                hetflag: U,
                chain: O,
                resi: J,
                icode: H,
                rescode: J + (" " != H ? "^" + H : ""),
                serial: S,
                atom: u,
                bonds: [],
                ss: "c",
                bondOrder: [],
                properties: {},
                b: p,
                pdbline: y
              }));
      } else if ("SHEET " == p)
        (E = !0),
          (p = y.substr(21, 1)),
          (u = parseInt(y.substr(22, 4))),
          (L = y.substr(32, 1)),
          (y = parseInt(y.substr(33, 4))),
          q.push([p, u, L, y]);
      else if ("CONECT" == p)
        for (
          p = parseInt(y.substr(6, 5)), u = h[h.length - 1][I[p]], p = 0;
          4 > p;
          p++
        )
          (L = parseInt(y.substr([11, 16, 21, 26][p], 5))),
            (O = h[h.length - 1][I[L]]),
            void 0 !== u &&
              void 0 !== O &&
              ((L = I[L]),
              u.bonds[u.bonds.length - 1] != L &&
                (u.bonds.push(L), u.bondOrder.push(1)));
      else if ("HELIX " == p)
        (E = !0),
          (p = y.substr(19, 1)),
          (u = parseInt(y.substr(21, 4))),
          (L = y.substr(31, 1)),
          (y = parseInt(y.substr(33, 4))),
          g.push([p, u, L, y]);
      else if (e || "REMARK" != p || "BIOMT" != y.substr(13, 5))
        "CRYST1" == p &&
          ((u = parseFloat(y.substr(7, 8))),
          (p = parseFloat(y.substr(16, 8))),
          (L = parseFloat(y.substr(25, 8))),
          (O = parseFloat(y.substr(34, 6))),
          (J = parseFloat(y.substr(41, 6))),
          (y = parseFloat(y.substr(48, 6))),
          (f[f.length - 1].cryst = {
            a: u,
            b: p,
            c: L,
            alpha: O,
            beta: J,
            gamma: y
          }));
      else {
        p = new $3Dmol.Matrix4();
        for (L = 1; 3 >= L; L++)
          if (((y = A[D].replace(/^\s*/, "")), parseInt(y.substr(18, 1)) == L))
            (p.elements[L - 1] = parseFloat(y.substr(23, 10))),
              (p.elements[L - 1 + 4] = parseFloat(y.substr(33, 10))),
              (p.elements[L - 1 + 8] = parseFloat(y.substr(43, 10))),
              (p.elements[L - 1 + 12] = parseFloat(y.substr(53))),
              D++;
          else
            for (; "BIOMT" == y.substr(13, 5); )
              D++, (y = A[D].replace(/^\s*/, ""));
        p.elements[3] = 0;
        p.elements[7] = 0;
        p.elements[11] = 0;
        p.elements[15] = 1;
        f[f.length - 1].symmetries.push(p);
        D--;
      }
    }
    new Date().getTime();
    for (L = 0; L < h.length; L++) {
      c(h[L]);
      e || z(f[f.length - 1].symmetries, w, h[L]);
      if (l || !E) new Date().getTime(), s(h[L]);
      for (D = C; D < h[L].length; D++)
        if (((u = h[L][D]), void 0 !== u)) {
          for (p = 0; p < q.length; p++)
            u.chain != q[p][0] ||
              u.resi < q[p][1] ||
              u.resi > q[p][3] ||
              ((u.ss = "s"),
              u.resi == q[p][1] && (u.ssbegin = !0),
              u.resi == q[p][3] && (u.ssend = !0));
          for (p = 0; p < g.length; p++)
            u.chain != g[p][0] ||
              u.resi < g[p][1] ||
              u.resi > g[p][3] ||
              ((u.ss = "h"),
              u.resi == g[p][1]
                ? (u.ssbegin = !0)
                : u.resi == g[p][3] && (u.ssend = !0));
        }
    }
    return h;
  };
  a.pqr = a.PQR = function(a, b) {
    var h = [[]],
      m,
      l = !b.noSecondaryStructure,
      e = [],
      w = a.split(/\r?\n|\r/),
      f,
      z;
    for (f = 0; f < w.length; f++)
      if (
        ((z = w[f].replace(/^\s*/, "")),
        (m = z.substr(0, 6)),
        0 == m.indexOf("END"))
      )
        if (b.multimodel) b.onemol || h.push([]);
        else break;
      else if ("ATOM  " == m || "HETATM" == m) {
        var u = parseInt(z.substr(6, 5));
        m = z.substr(12, 4).replace(/ /g, "");
        var q = z.substr(17, 3),
          g = z.substr(21, 1),
          B = parseInt(z.substr(22, 4)),
          I = z
            .substr(30)
            .trim()
            .split(/\s+/),
          A = parseFloat(I[0]),
          D = parseFloat(I[1]),
          p = parseFloat(I[2]),
          y = parseFloat(I[3]),
          I = parseFloat(I[4]),
          L = m[0];
        1 < m.length && m[1].toUpperCase() != m[1] && (L = m.substr(0, 2));
        hetflag = "H" == z[0] ? !0 : !1;
        e[u] = h[h.length - 1].length;
        h[h.length - 1].push({
          resn: q,
          x: A,
          y: D,
          z: p,
          elem: L,
          hetflag: hetflag,
          chain: g,
          resi: B,
          serial: u,
          atom: m,
          bonds: [],
          ss: "c",
          bondOrder: [],
          properties: { charge: y, partialCharge: y, radius: I },
          pdbline: z
        });
      } else if ("CONECT" == m)
        for (
          m = parseInt(z.substr(6, 5)), u = h[h.length - 1][e[m]], m = 0;
          4 > m;
          m++
        )
          (q = parseInt(z.substr([11, 16, 21, 26][m], 5))),
            (g = h[h.length - 1][e[q]]),
            void 0 !== u &&
              void 0 !== g &&
              (u.bonds.push(e[q]), u.bondOrder.push(1));
    for (f = 0; f < h.length; f++) c(h[f]), l && s(h[f]);
    return h;
  };
  return a;
})();
$3Dmol = $3Dmol || {};
$3Dmol.partialCharges = {
  "ALA:N": -0.15,
  "ALA:CA": 0.1,
  "ALA:CB": 0,
  "ALA:C": 0.6,
  "ALA:O": -0.55,
  "ARG:N": -0.15,
  "ARG:CA": 0.1,
  "ARG:CB": 0,
  "ARG:CG": 0,
  "ARG:CD": 0.1,
  "ARG:NE": -0.1,
  "ARG:CZ": 0.5,
  "ARG:NH1": 0.25,
  "ARG:NH2": 0.25,
  "ARG:C": 0.6,
  "ARG:O": -0.55,
  "ASN:N": -0.15,
  "ASN:CA": 0.1,
  "ASN:CB": 0,
  "ASN:CG": 0.55,
  "ASN:OD1": -0.55,
  "ASN:ND2": 0,
  "ASN:C": 0.6,
  "ASN:O": -0.55,
  "ASP:N": -0.15,
  "ASP:CA": 0.1,
  "ASP:CB": 0,
  "ASP:CG": 0.14,
  "ASP:OD1": -0.57,
  "ASP:OD2": -0.57,
  "ASP:C": 0.6,
  "ASP:O": -0.55,
  "CYS:N": -0.15,
  "CYS:CA": 0.1,
  "CYS:CB": 0.19,
  "CYS:SG": -0.19,
  "CYS:C": 0.6,
  "CYS:O": -0.55,
  "GLN:N": -0.15,
  "GLN:CA": 0.1,
  "GLN:CB": 0,
  "GLN:CG": 0,
  "GLN:CD": 0.55,
  "GLN:OE1": -0.55,
  "GLN:NE2": 0,
  "GLN:C": 0.6,
  "GLN:O": -0.55,
  "GLU:N": -0.15,
  "GLU:CA": 0.1,
  "GLU:CB": 0,
  "GLU:CG": 0,
  "GLU:CD": 0.14,
  "GLU:OE1": -0.57,
  "GLU:OE2": -0.57,
  "GLU:C": 0.6,
  "GLU:O": -0.55,
  "GLY:N": -0.15,
  "GLY:CA": 0.1,
  "GLY:C": 0.6,
  "GLY:O": -0.55,
  "HIS:N": -0.15,
  "HIS:CA": 0.1,
  "HIS:CB": 0,
  "HIS:CG": 0.1,
  "HIS:ND1": -0.1,
  "HIS:CD2": 0.1,
  "HIS:NE2": -0.4,
  "HIS:CE1": 0.3,
  "HIS:C": 0.6,
  "HIS:O": -0.55,
  "ILE:N": -0.15,
  "ILE:CA": 0.1,
  "ILE:CB": 0,
  "ILE:CG2": 0,
  "ILE:CG1": 0,
  "ILE:CD": 0,
  "ILE:C": 0.6,
  "ILE:O": -0.55,
  "LEU:N": -0.15,
  "LEU:CA": 0.1,
  "LEU:CB": 0,
  "LEU:CG": 0,
  "LEU:CD1": 0,
  "LEU:CD2": 0,
  "LEU:C": 0.6,
  "LEU:O": -0.55,
  "LYS:N": -0.15,
  "LYS:CA": 0.1,
  "LYS:CB": 0,
  "LYS:CG": 0,
  "LYS:CD": 0,
  "LYS:CE": 0.25,
  "LYS:NZ": 0.75,
  "LYS:C": 0.6,
  "LYS:O": -0.55,
  "MET:N": -0.15,
  "MET:CA": 0.1,
  "MET:CB": 0,
  "MET:CG": 0.06,
  "MET:SD": -0.12,
  "MET:CE": 0.06,
  "MET:C": 0.6,
  "MET:O": -0.55,
  "PHE:N": -0.15,
  "PHE:CA": 0.1,
  "PHE:CB": 0,
  "PHE:CG": 0,
  "PHE:CD1": 0,
  "PHE:CD2": 0,
  "PHE:CE1": 0,
  "PHE:CE2": 0,
  "PHE:CZ": 0,
  "PHE:C": 0.6,
  "PHE:O": -0.55,
  "PRO:N": -0.25,
  "PRO:CD": 0.1,
  "PRO:CA": 0.1,
  "PRO:CB": 0,
  "PRO:CG": 0,
  "PRO:C": 0.6,
  "PRO:O": -0.55,
  "SER:N": -0.15,
  "SER:CA": 0.1,
  "SER:CB": 0.25,
  "SER:OG": -0.25,
  "SER:C": 0.6,
  "SER:O": -0.55,
  "THR:N": -0.15,
  "THR:CA": 0.1,
  "THR:CB": 0.25,
  "THR:OG1": -0.25,
  "THR:CG2": 0,
  "THR:C": 0.6,
  "THR:O": -0.55,
  "TRP:N": -0.15,
  "TRP:CA": 0.1,
  "TRP:CB": 0,
  "TRP:CG": -0.03,
  "TRP:CD2": 0.1,
  "TRP:CE2": -0.04,
  "TRP:CE3": -0.03,
  "TRP:CD1": 0.06,
  "TRP:NE1": -0.06,
  "TRP:CZ2": 0,
  "TRP:CZ3": 0,
  "TRP:CH2": 0,
  "TRP:C": 0.6,
  "TRP:O": -0.55,
  "TYR:N": -0.15,
  "TYR:CA": 0.1,
  "TYR:CB": 0,
  "TYR:CG": 0,
  "TYR:CD1": 0,
  "TYR:CE1": 0,
  "TYR:CD2": 0,
  "TYR:CE2": 0,
  "TYR:CZ": 0.25,
  "TYR:OH": -0.25,
  "TYR:C": 0.6,
  "TYR:O": -0.55,
  "VAL:N": -0.15,
  "VAL:CA": 0.1,
  "VAL:CB": 0,
  "VAL:CG1": 0,
  "VAL:CG2": 0,
  "VAL:C": 0.6,
  "VAL:O": -0.55
};
$3Dmol.applyPartialCharges = function(a, b) {
  (b && "undefined" !== typeof a.partialCharge) ||
    (a.resn &&
      a.atom &&
      (a.properties.partialCharge =
        $3Dmol.partialCharges[a.resn + ":" + a.atom]));
};
(function() {});
$3Dmol.VolumeData = function(a, b) {
  this.unit = { x: 1, y: 1, z: 1 };
  this.origin = { x: 0, y: 0, z: 0 };
  this.size = { x: 0, y: 0, z: 0 };
  this.data = new Float32Array([]);
  b = b.toLowerCase();
  if (this[b]) this[b](a);
};
$3Dmol.VolumeData.prototype.getVal = function(a, b, c) {
  a -= this.origin.x;
  b -= this.origin.y;
  c -= this.origin.z;
  a /= this.unit.x;
  b /= this.unit.y;
  c /= this.unit.z;
  a = Math.round(a);
  b = Math.round(b);
  c = Math.round(c);
  return 0 > a ||
    a >= this.size.x ||
    0 > b ||
    b >= this.size.y ||
    0 > c ||
    c >= this.size.z
    ? 0
    : this.data[a * this.size.y * this.size.z + b * this.size.z + c];
};
$3Dmol.VolumeData.prototype.cube = function(a) {
  a = a.replace(/^\s+/, "").split(/[\n\r]+/);
  if (!(6 > a.length)) {
    var b = a[2]
        .replace(/^\s+/, "")
        .replace(/\s+/g, " ")
        .split(" "),
      c = parseFloat(b[0]),
      m = Math.abs(c),
      s = (this.origin = new $3Dmol.Vector3(
        parseFloat(b[1]),
        parseFloat(b[2]),
        parseFloat(b[3])
      )),
      b = a[3]
        .replace(/^\s+/, "")
        .replace(/\s+/g, " ")
        .split(" "),
      B = 0 < b[0] ? 0.529177 : 1;
    s.multiplyScalar(B);
    var s = Math.abs(b[0]),
      w = new $3Dmol.Vector3(
        parseFloat(b[1]),
        parseFloat(b[2]),
        parseFloat(b[3])
      ).multiplyScalar(B),
      b = a[4]
        .replace(/^\s+/, "")
        .replace(/\s+/g, " ")
        .split(" "),
      z = Math.abs(b[0]),
      d = new $3Dmol.Vector3(
        parseFloat(b[1]),
        parseFloat(b[2]),
        parseFloat(b[3])
      ).multiplyScalar(B),
      b = a[5]
        .replace(/^\s+/, "")
        .replace(/\s+/g, " ")
        .split(" "),
      x = Math.abs(b[0]),
      b = new $3Dmol.Vector3(
        parseFloat(b[1]),
        parseFloat(b[2]),
        parseFloat(b[3])
      ).multiplyScalar(B);
    this.size = { x: s, y: z, z: x };
    this.unit = new $3Dmol.Vector3(w.x, d.y, b.z);
    (0 == w.y && 0 == w.z && 0 == d.x && 0 == d.z && 0 == b.x && 0 == b.y) ||
      console.log(
        "Warning: Cube file is not axis aligned.  This isn't going to look right."
      );
    b = 6;
    0 > c && b++;
    a = a.splice(m + b).join(" ");
    a = a.replace(/^\s+/, "");
    a = a.split(/[\s\r]+/);
    this.data = new Float32Array(a);
  }
};
$3Dmol.workerString = function() {
  self.onmessage = function(a) {
    a = a.data;
    var b = a.type;
    if (0 > b)
      (self.atomData = a.atoms),
        (self.volume = a.volume),
        (self.ps = new ProteinSurface());
    else {
      var c = self.ps;
      c.initparm(a.expandedExtent, 1 == b ? !1 : !0, self.volume);
      c.fillvoxels(self.atomData, a.extendedAtoms);
      c.buildboundary();
      if (4 === b || 2 === b)
        c.fastdistancemap(),
          c.boundingatom(!1),
          c.fillvoxelswaals(self.atomData, a.extendedAtoms);
      c.marchingcube(b);
      a = c.getFacesAndVertices(a.atomsToShow);
      self.postMessage(a);
    }
  };
}
  .toString()
  .replace(/(^.*?\{|\}$)/g, "");
$3Dmol.workerString +=
  "; var ProteinSurface=" +
  $3Dmol.ProteinSurface.toString().replace(
    /\$3Dmol.MarchingCube./g,
    "MarchingCube."
  );
$3Dmol.workerString +=
  ",MarchingCube=(" + $3Dmol.MarchingCubeInitializer.toString() + ")();";
$3Dmol.SurfaceWorker = window.URL.createObjectURL(
  new Blob([$3Dmol.workerString], { type: "text/javascript" })
);
$3Dmol.workerString = $3Dmol.workerString;
$3Dmol.SurfaceWorker = $3Dmol.SurfaceWorker;
