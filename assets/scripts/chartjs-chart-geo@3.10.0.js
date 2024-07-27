!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("chart.js"), require("chart.js/helpers"))
    : "function" == typeof define && define.amd
    ? define(["exports", "chart.js", "chart.js/helpers"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).ChartGeo =
          {}),
        e.Chart,
        e.Chart.helpers
      );
})(this, function (e, t, n) {
  "use strict";
  function a(e, t) {
    return null == e || null == t
      ? NaN
      : e < t
      ? -1
      : e > t
      ? 1
      : e >= t
      ? 0
      : NaN;
  }
  function r(e, t) {
    return null == e || null == t
      ? NaN
      : t < e
      ? -1
      : t > e
      ? 1
      : t >= e
      ? 0
      : NaN;
  }
  function i(e) {
    let t, n, i;
    function c(e, a, r = 0, i = e.length) {
      if (r < i) {
        if (0 !== t(a, a)) return i;
        do {
          const t = (r + i) >>> 1;
          n(e[t], a) < 0 ? (r = t + 1) : (i = t);
        } while (r < i);
      }
      return r;
    }
    return (
      2 !== e.length
        ? ((t = a), (n = (t, n) => a(e(t), n)), (i = (t, n) => e(t) - n))
        : ((t = e === a || e === r ? e : f), (n = e), (i = e)),
      {
        left: c,
        center: function (e, t, n = 0, a = e.length) {
          const r = c(e, t, n, a - 1);
          return r > n && i(e[r - 1], t) > -i(e[r], t) ? r - 1 : r;
        },
        right: function (e, a, r = 0, i = e.length) {
          if (r < i) {
            if (0 !== t(a, a)) return i;
            do {
              const t = (r + i) >>> 1;
              n(e[t], a) <= 0 ? (r = t + 1) : (i = t);
            } while (r < i);
          }
          return r;
        },
      }
    );
  }
  function f() {
    return 0;
  }
  i(a),
    i(function (e) {
      return null === e ? NaN : +e;
    }).center;
  class c {
    constructor() {
      (this._partials = new Float64Array(32)), (this._n = 0);
    }
    add(e) {
      const t = this._partials;
      let n = 0;
      for (let a = 0; a < this._n && a < 32; a++) {
        const r = t[a],
          i = e + r,
          f = Math.abs(e) < Math.abs(r) ? e - (i - r) : r - (i - e);
        f && (t[n++] = f), (e = i);
      }
      return (t[n] = e), (this._n = n + 1), this;
    }
    valueOf() {
      const e = this._partials;
      let t,
        n,
        a,
        r = this._n,
        i = 0;
      if (r > 0) {
        for (
          i = e[--r];
          r > 0 && ((t = i), (n = e[--r]), (i = t + n), (a = n - (i - t)), !a);

        );
        r > 0 &&
          ((a < 0 && e[r - 1] < 0) || (a > 0 && e[r - 1] > 0)) &&
          ((n = 2 * a), (t = i + n), n == t - i && (i = t));
      }
      return i;
    }
  }
  function o(e) {
    return Array.from(
      (function* (e) {
        for (const t of e) yield* t;
      })(e)
    );
  }
  function d(e, t, n) {
    (e = +e),
      (t = +t),
      (n = (r = arguments.length) < 2 ? ((t = e), (e = 0), 1) : r < 3 ? 1 : +n);
    for (
      var a = -1, r = 0 | Math.max(0, Math.ceil((t - e) / n)), i = new Array(r);
      ++a < r;

    )
      i[a] = e + a * n;
    return i;
  }
  var u = 1e-6,
    s = Math.PI,
    l = s / 2,
    b = s / 4,
    h = 2 * s,
    p = 180 / s,
    g = s / 180,
    m = Math.abs,
    y = Math.atan,
    v = Math.atan2,
    w = Math.cos,
    x = Math.ceil,
    M = Math.exp,
    S = Math.log,
    E = Math.pow,
    N = Math.sin,
    _ =
      Math.sign ||
      function (e) {
        return e > 0 ? 1 : e < 0 ? -1 : 0;
      },
    A = Math.sqrt,
    k = Math.tan;
  function C(e) {
    return e > 1 ? 0 : e < -1 ? s : Math.acos(e);
  }
  function P(e) {
    return e > 1 ? l : e < -1 ? -l : Math.asin(e);
  }
  function I() {}
  function j(e, t) {
    e && O.hasOwnProperty(e.type) && O[e.type](e, t);
  }
  var $ = {
      Feature: function (e, t) {
        j(e.geometry, t);
      },
      FeatureCollection: function (e, t) {
        for (var n = e.features, a = -1, r = n.length; ++a < r; )
          j(n[a].geometry, t);
      },
    },
    O = {
      Sphere: function (e, t) {
        t.sphere();
      },
      Point: function (e, t) {
        (e = e.coordinates), t.point(e[0], e[1], e[2]);
      },
      MultiPoint: function (e, t) {
        for (var n = e.coordinates, a = -1, r = n.length; ++a < r; )
          (e = n[a]), t.point(e[0], e[1], e[2]);
      },
      LineString: function (e, t) {
        z(e.coordinates, t, 0);
      },
      MultiLineString: function (e, t) {
        for (var n = e.coordinates, a = -1, r = n.length; ++a < r; )
          z(n[a], t, 0);
      },
      Polygon: function (e, t) {
        D(e.coordinates, t);
      },
      MultiPolygon: function (e, t) {
        for (var n = e.coordinates, a = -1, r = n.length; ++a < r; ) D(n[a], t);
      },
      GeometryCollection: function (e, t) {
        for (var n = e.geometries, a = -1, r = n.length; ++a < r; ) j(n[a], t);
      },
    };
  function z(e, t, n) {
    var a,
      r = -1,
      i = e.length - n;
    for (t.lineStart(); ++r < i; ) (a = e[r]), t.point(a[0], a[1], a[2]);
    t.lineEnd();
  }
  function D(e, t) {
    var n = -1,
      a = e.length;
    for (t.polygonStart(); ++n < a; ) z(e[n], t, 1);
    t.polygonEnd();
  }
  function R(e, t) {
    e && $.hasOwnProperty(e.type) ? $[e.type](e, t) : j(e, t);
  }
  function G(e) {
    return [v(e[1], e[0]), P(e[2])];
  }
  function q(e) {
    var t = e[0],
      n = e[1],
      a = w(n);
    return [a * w(t), a * N(t), N(n)];
  }
  function B(e, t) {
    return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
  }
  function T(e, t) {
    return [
      e[1] * t[2] - e[2] * t[1],
      e[2] * t[0] - e[0] * t[2],
      e[0] * t[1] - e[1] * t[0],
    ];
  }
  function L(e, t) {
    (e[0] += t[0]), (e[1] += t[1]), (e[2] += t[2]);
  }
  function F(e, t) {
    return [e[0] * t, e[1] * t, e[2] * t];
  }
  function W(e) {
    var t = A(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
    (e[0] /= t), (e[1] /= t), (e[2] /= t);
  }
  function V(e, t) {
    function n(n, a) {
      return (n = e(n, a)), t(n[0], n[1]);
    }
    return (
      e.invert &&
        t.invert &&
        (n.invert = function (n, a) {
          return (n = t.invert(n, a)) && e.invert(n[0], n[1]);
        }),
      n
    );
  }
  function H(e, t) {
    return [m(e) > s ? e + Math.round(-e / h) * h : e, t];
  }
  function Y(e, t, n) {
    return (e %= h) ? (t || n ? V(U(e), X(t, n)) : U(e)) : t || n ? X(t, n) : H;
  }
  function K(e) {
    return function (t, n) {
      return [(t += e) > s ? t - h : t < -s ? t + h : t, n];
    };
  }
  function U(e) {
    var t = K(e);
    return (t.invert = K(-e)), t;
  }
  function X(e, t) {
    var n = w(e),
      a = N(e),
      r = w(t),
      i = N(t);
    function f(e, t) {
      var f = w(t),
        c = w(e) * f,
        o = N(e) * f,
        d = N(t),
        u = d * n + c * a;
      return [v(o * r - u * i, c * n - d * a), P(u * r + o * i)];
    }
    return (
      (f.invert = function (e, t) {
        var f = w(t),
          c = w(e) * f,
          o = N(e) * f,
          d = N(t),
          u = d * r - o * i;
        return [v(o * r + d * i, c * n + u * a), P(u * n - c * a)];
      }),
      f
    );
  }
  function Q(e, t) {
    ((t = q(t))[0] -= e), W(t);
    var n = C(-t[1]);
    return ((-t[2] < 0 ? -n : n) + h - u) % h;
  }
  function Z() {
    var e,
      t = [];
    return {
      point: function (t, n, a) {
        e.push([t, n, a]);
      },
      lineStart: function () {
        t.push((e = []));
      },
      lineEnd: I,
      rejoin: function () {
        t.length > 1 && t.push(t.pop().concat(t.shift()));
      },
      result: function () {
        var n = t;
        return (t = []), (e = null), n;
      },
    };
  }
  function J(e, t) {
    return m(e[0] - t[0]) < u && m(e[1] - t[1]) < u;
  }
  function ee(e, t, n, a) {
    (this.x = e),
      (this.z = t),
      (this.o = n),
      (this.e = a),
      (this.v = !1),
      (this.n = this.p = null);
  }
  function te(e, t, n, a, r) {
    var i,
      f,
      c = [],
      o = [];
    if (
      (e.forEach(function (e) {
        if (!((t = e.length - 1) <= 0)) {
          var t,
            n,
            a = e[0],
            f = e[t];
          if (J(a, f)) {
            if (!a[2] && !f[2]) {
              for (r.lineStart(), i = 0; i < t; ++i)
                r.point((a = e[i])[0], a[1]);
              return void r.lineEnd();
            }
            f[0] += 2e-6;
          }
          c.push((n = new ee(a, e, null, !0))),
            o.push((n.o = new ee(a, null, n, !1))),
            c.push((n = new ee(f, e, null, !1))),
            o.push((n.o = new ee(f, null, n, !0)));
        }
      }),
      c.length)
    ) {
      for (o.sort(t), ne(c), ne(o), i = 0, f = o.length; i < f; ++i)
        o[i].e = n = !n;
      for (var d, u, s = c[0]; ; ) {
        for (var l = s, b = !0; l.v; ) if ((l = l.n) === s) return;
        (d = l.z), r.lineStart();
        do {
          if (((l.v = l.o.v = !0), l.e)) {
            if (b)
              for (i = 0, f = d.length; i < f; ++i)
                r.point((u = d[i])[0], u[1]);
            else a(l.x, l.n.x, 1, r);
            l = l.n;
          } else {
            if (b)
              for (d = l.p.z, i = d.length - 1; i >= 0; --i)
                r.point((u = d[i])[0], u[1]);
            else a(l.x, l.p.x, -1, r);
            l = l.p;
          }
          (d = (l = l.o).z), (b = !b);
        } while (!l.v);
        r.lineEnd();
      }
    }
  }
  function ne(e) {
    if ((t = e.length)) {
      for (var t, n, a = 0, r = e[0]; ++a < t; )
        (r.n = n = e[a]), (n.p = r), (r = n);
      (r.n = n = e[0]), (n.p = r);
    }
  }
  function ae(e) {
    return m(e[0]) <= s ? e[0] : _(e[0]) * (((m(e[0]) + s) % h) - s);
  }
  function re(e, t) {
    var n = ae(t),
      a = t[1],
      r = N(a),
      i = [N(n), -w(n), 0],
      f = 0,
      o = 0,
      d = new c();
    1 === r ? (a = l + u) : -1 === r && (a = -l - u);
    for (var p = 0, g = e.length; p < g; ++p)
      if ((y = (m = e[p]).length))
        for (
          var m,
            y,
            x = m[y - 1],
            M = ae(x),
            S = x[1] / 2 + b,
            E = N(S),
            _ = w(S),
            A = 0;
          A < y;
          ++A, M = C, E = j, _ = $, x = k
        ) {
          var k = m[A],
            C = ae(k),
            I = k[1] / 2 + b,
            j = N(I),
            $ = w(I),
            O = C - M,
            z = O >= 0 ? 1 : -1,
            D = z * O,
            R = D > s,
            G = E * j;
          if (
            (d.add(v(G * z * N(D), _ * $ + G * w(D))),
            (f += R ? O + z * h : O),
            R ^ (M >= n) ^ (C >= n))
          ) {
            var B = T(q(x), q(k));
            W(B);
            var L = T(i, B);
            W(L);
            var F = (R ^ (O >= 0) ? -1 : 1) * P(L[2]);
            (a > F || (a === F && (B[0] || B[1]))) &&
              (o += R ^ (O >= 0) ? 1 : -1);
          }
        }
    return (f < -u || (f < u && d < -1e-12)) ^ (1 & o);
  }
  function ie(e, t, n, a) {
    return function (r) {
      var i,
        f,
        c,
        d = t(r),
        u = Z(),
        s = t(u),
        l = !1,
        b = {
          point: h,
          lineStart: g,
          lineEnd: m,
          polygonStart: function () {
            (b.point = y),
              (b.lineStart = v),
              (b.lineEnd = w),
              (f = []),
              (i = []);
          },
          polygonEnd: function () {
            (b.point = h), (b.lineStart = g), (b.lineEnd = m), (f = o(f));
            var e = re(i, a);
            f.length
              ? (l || (r.polygonStart(), (l = !0)), te(f, ce, e, n, r))
              : e &&
                (l || (r.polygonStart(), (l = !0)),
                r.lineStart(),
                n(null, null, 1, r),
                r.lineEnd()),
              l && (r.polygonEnd(), (l = !1)),
              (f = i = null);
          },
          sphere: function () {
            r.polygonStart(),
              r.lineStart(),
              n(null, null, 1, r),
              r.lineEnd(),
              r.polygonEnd();
          },
        };
      function h(t, n) {
        e(t, n) && r.point(t, n);
      }
      function p(e, t) {
        d.point(e, t);
      }
      function g() {
        (b.point = p), d.lineStart();
      }
      function m() {
        (b.point = h), d.lineEnd();
      }
      function y(e, t) {
        c.push([e, t]), s.point(e, t);
      }
      function v() {
        s.lineStart(), (c = []);
      }
      function w() {
        y(c[0][0], c[0][1]), s.lineEnd();
        var e,
          t,
          n,
          a,
          o = s.clean(),
          d = u.result(),
          b = d.length;
        if ((c.pop(), i.push(c), (c = null), b))
          if (1 & o) {
            if ((t = (n = d[0]).length - 1) > 0) {
              for (
                l || (r.polygonStart(), (l = !0)), r.lineStart(), e = 0;
                e < t;
                ++e
              )
                r.point((a = n[e])[0], a[1]);
              r.lineEnd();
            }
          } else
            b > 1 && 2 & o && d.push(d.pop().concat(d.shift())),
              f.push(d.filter(fe));
      }
      return b;
    };
  }
  function fe(e) {
    return e.length > 1;
  }
  function ce(e, t) {
    return (
      ((e = e.x)[0] < 0 ? e[1] - l - u : l - e[1]) -
      ((t = t.x)[0] < 0 ? t[1] - l - u : l - t[1])
    );
  }
  new c(), new c(), (H.invert = H);
  var oe = ie(
    function () {
      return !0;
    },
    function (e) {
      var t,
        n = NaN,
        a = NaN,
        r = NaN;
      return {
        lineStart: function () {
          e.lineStart(), (t = 1);
        },
        point: function (i, f) {
          var c = i > 0 ? s : -s,
            o = m(i - n);
          m(o - s) < u
            ? (e.point(n, (a = (a + f) / 2 > 0 ? l : -l)),
              e.point(r, a),
              e.lineEnd(),
              e.lineStart(),
              e.point(c, a),
              e.point(i, a),
              (t = 0))
            : r !== c &&
              o >= s &&
              (m(n - r) < u && (n -= r * u),
              m(i - c) < u && (i -= c * u),
              (a = (function (e, t, n, a) {
                var r,
                  i,
                  f = N(e - n);
                return m(f) > u
                  ? y(
                      (N(t) * (i = w(a)) * N(n) - N(a) * (r = w(t)) * N(e)) /
                        (r * i * f)
                    )
                  : (t + a) / 2;
              })(n, a, i, f)),
              e.point(r, a),
              e.lineEnd(),
              e.lineStart(),
              e.point(c, a),
              (t = 0)),
            e.point((n = i), (a = f)),
            (r = c);
        },
        lineEnd: function () {
          e.lineEnd(), (n = a = NaN);
        },
        clean: function () {
          return 2 - t;
        },
      };
    },
    function (e, t, n, a) {
      var r;
      if (null == e)
        (r = n * l),
          a.point(-s, r),
          a.point(0, r),
          a.point(s, r),
          a.point(s, 0),
          a.point(s, -r),
          a.point(0, -r),
          a.point(-s, -r),
          a.point(-s, 0),
          a.point(-s, r);
      else if (m(e[0] - t[0]) > u) {
        var i = e[0] < t[0] ? s : -s;
        (r = (n * i) / 2), a.point(-i, r), a.point(0, r), a.point(i, r);
      } else a.point(t[0], t[1]);
    },
    [-s, -l]
  );
  function de(e) {
    var t = w(e),
      n = 6 * g,
      a = t > 0,
      r = m(t) > u;
    function i(e, n) {
      return w(e) * w(n) > t;
    }
    function f(e, n, a) {
      var r = [1, 0, 0],
        i = T(q(e), q(n)),
        f = B(i, i),
        c = i[0],
        o = f - c * c;
      if (!o) return !a && e;
      var d = (t * f) / o,
        l = (-t * c) / o,
        b = T(r, i),
        h = F(r, d);
      L(h, F(i, l));
      var p = b,
        g = B(h, p),
        y = B(p, p),
        v = g * g - y * (B(h, h) - 1);
      if (!(v < 0)) {
        var w = A(v),
          x = F(p, (-g - w) / y);
        if ((L(x, h), (x = G(x)), !a)) return x;
        var M,
          S = e[0],
          E = n[0],
          N = e[1],
          _ = n[1];
        E < S && ((M = S), (S = E), (E = M));
        var k = E - S,
          C = m(k - s) < u;
        if (
          (!C && _ < N && ((M = N), (N = _), (_ = M)),
          C || k < u
            ? C
              ? (N + _ > 0) ^ (x[1] < (m(x[0] - S) < u ? N : _))
              : N <= x[1] && x[1] <= _
            : (k > s) ^ (S <= x[0] && x[0] <= E))
        ) {
          var P = F(p, (-g + w) / y);
          return L(P, h), [x, G(P)];
        }
      }
    }
    function c(t, n) {
      var r = a ? e : s - e,
        i = 0;
      return (
        t < -r ? (i |= 1) : t > r && (i |= 2),
        n < -r ? (i |= 4) : n > r && (i |= 8),
        i
      );
    }
    return ie(
      i,
      function (e) {
        var t, n, o, d, u;
        return {
          lineStart: function () {
            (d = o = !1), (u = 1);
          },
          point: function (l, b) {
            var h,
              p = [l, b],
              g = i(l, b),
              m = a ? (g ? 0 : c(l, b)) : g ? c(l + (l < 0 ? s : -s), b) : 0;
            if (
              (!t && (d = o = g) && e.lineStart(),
              g !== o && (!(h = f(t, p)) || J(t, h) || J(p, h)) && (p[2] = 1),
              g !== o)
            )
              (u = 0),
                g
                  ? (e.lineStart(), (h = f(p, t)), e.point(h[0], h[1]))
                  : ((h = f(t, p)), e.point(h[0], h[1], 2), e.lineEnd()),
                (t = h);
            else if (r && t && a ^ g) {
              var y;
              m & n ||
                !(y = f(p, t, !0)) ||
                ((u = 0),
                a
                  ? (e.lineStart(),
                    e.point(y[0][0], y[0][1]),
                    e.point(y[1][0], y[1][1]),
                    e.lineEnd())
                  : (e.point(y[1][0], y[1][1]),
                    e.lineEnd(),
                    e.lineStart(),
                    e.point(y[0][0], y[0][1], 3)));
            }
            !g || (t && J(t, p)) || e.point(p[0], p[1]),
              (t = p),
              (o = g),
              (n = m);
          },
          lineEnd: function () {
            o && e.lineEnd(), (t = null);
          },
          clean: function () {
            return u | ((d && o) << 1);
          },
        };
      },
      function (t, a, r, i) {
        !(function (e, t, n, a, r, i) {
          if (n) {
            var f = w(t),
              c = N(t),
              o = a * n;
            null == r
              ? ((r = t + a * h), (i = t - o / 2))
              : ((r = Q(f, r)),
                (i = Q(f, i)),
                (a > 0 ? r < i : r > i) && (r += a * h));
            for (var d, u = r; a > 0 ? u > i : u < i; u -= o)
              (d = G([f, -c * w(u), -c * N(u)])), e.point(d[0], d[1]);
          }
        })(i, e, n, r, t, a);
      },
      a ? [0, -e] : [-s, e - s]
    );
  }
  var ue,
    se,
    le,
    be,
    he = 1e9,
    pe = -he;
  function ge(e, t, n, a) {
    function r(r, i) {
      return e <= r && r <= n && t <= i && i <= a;
    }
    function i(r, i, c, o) {
      var u = 0,
        s = 0;
      if (
        null == r ||
        (u = f(r, c)) !== (s = f(i, c)) ||
        (d(r, i) < 0) ^ (c > 0)
      )
        do {
          o.point(0 === u || 3 === u ? e : n, u > 1 ? a : t);
        } while ((u = (u + c + 4) % 4) !== s);
      else o.point(i[0], i[1]);
    }
    function f(a, r) {
      return m(a[0] - e) < u
        ? r > 0
          ? 0
          : 3
        : m(a[0] - n) < u
        ? r > 0
          ? 2
          : 1
        : m(a[1] - t) < u
        ? r > 0
          ? 1
          : 0
        : r > 0
        ? 3
        : 2;
    }
    function c(e, t) {
      return d(e.x, t.x);
    }
    function d(e, t) {
      var n = f(e, 1),
        a = f(t, 1);
      return n !== a
        ? n - a
        : 0 === n
        ? t[1] - e[1]
        : 1 === n
        ? e[0] - t[0]
        : 2 === n
        ? e[1] - t[1]
        : t[0] - e[0];
    }
    return function (f) {
      var d,
        u,
        s,
        l,
        b,
        h,
        p,
        g,
        m,
        y,
        v,
        w = f,
        x = Z(),
        M = {
          point: S,
          lineStart: function () {
            (M.point = E),
              u && u.push((s = [])),
              (y = !0),
              (m = !1),
              (p = g = NaN);
          },
          lineEnd: function () {
            d && (E(l, b), h && m && x.rejoin(), d.push(x.result())),
              (M.point = S),
              m && w.lineEnd();
          },
          polygonStart: function () {
            (w = x), (d = []), (u = []), (v = !0);
          },
          polygonEnd: function () {
            var t = (function () {
                for (var t = 0, n = 0, r = u.length; n < r; ++n)
                  for (
                    var i,
                      f,
                      c = u[n],
                      o = 1,
                      d = c.length,
                      s = c[0],
                      l = s[0],
                      b = s[1];
                    o < d;
                    ++o
                  )
                    (i = l),
                      (f = b),
                      (l = (s = c[o])[0]),
                      (b = s[1]),
                      f <= a
                        ? b > a && (l - i) * (a - f) > (b - f) * (e - i) && ++t
                        : b <= a &&
                          (l - i) * (a - f) < (b - f) * (e - i) &&
                          --t;
                return t;
              })(),
              n = v && t,
              r = (d = o(d)).length;
            (n || r) &&
              (f.polygonStart(),
              n && (f.lineStart(), i(null, null, 1, f), f.lineEnd()),
              r && te(d, c, t, i, f),
              f.polygonEnd()),
              (w = f),
              (d = u = s = null);
          },
        };
      function S(e, t) {
        r(e, t) && w.point(e, t);
      }
      function E(i, f) {
        var c = r(i, f);
        if ((u && s.push([i, f]), y))
          (l = i),
            (b = f),
            (h = c),
            (y = !1),
            c && (w.lineStart(), w.point(i, f));
        else if (c && m) w.point(i, f);
        else {
          var o = [
              (p = Math.max(pe, Math.min(he, p))),
              (g = Math.max(pe, Math.min(he, g))),
            ],
            d = [
              (i = Math.max(pe, Math.min(he, i))),
              (f = Math.max(pe, Math.min(he, f))),
            ];
          !(function (e, t, n, a, r, i) {
            var f,
              c = e[0],
              o = e[1],
              d = 0,
              u = 1,
              s = t[0] - c,
              l = t[1] - o;
            if (((f = n - c), s || !(f > 0))) {
              if (((f /= s), s < 0)) {
                if (f < d) return;
                f < u && (u = f);
              } else if (s > 0) {
                if (f > u) return;
                f > d && (d = f);
              }
              if (((f = r - c), s || !(f < 0))) {
                if (((f /= s), s < 0)) {
                  if (f > u) return;
                  f > d && (d = f);
                } else if (s > 0) {
                  if (f < d) return;
                  f < u && (u = f);
                }
                if (((f = a - o), l || !(f > 0))) {
                  if (((f /= l), l < 0)) {
                    if (f < d) return;
                    f < u && (u = f);
                  } else if (l > 0) {
                    if (f > u) return;
                    f > d && (d = f);
                  }
                  if (((f = i - o), l || !(f < 0))) {
                    if (((f /= l), l < 0)) {
                      if (f > u) return;
                      f > d && (d = f);
                    } else if (l > 0) {
                      if (f < d) return;
                      f < u && (u = f);
                    }
                    return (
                      d > 0 && ((e[0] = c + d * s), (e[1] = o + d * l)),
                      u < 1 && ((t[0] = c + u * s), (t[1] = o + u * l)),
                      !0
                    );
                  }
                }
              }
            }
          })(o, d, e, t, n, a)
            ? c && (w.lineStart(), w.point(i, f), (v = !1))
            : (m || (w.lineStart(), w.point(o[0], o[1])),
              w.point(d[0], d[1]),
              c || w.lineEnd(),
              (v = !1));
        }
        (p = i), (g = f), (m = c);
      }
      return M;
    };
  }
  var me = {
    sphere: I,
    point: I,
    lineStart: function () {
      (me.point = ve), (me.lineEnd = ye);
    },
    lineEnd: I,
    polygonStart: I,
    polygonEnd: I,
  };
  function ye() {
    me.point = me.lineEnd = I;
  }
  function ve(e, t) {
    (se = e *= g), (le = N((t *= g))), (be = w(t)), (me.point = we);
  }
  function we(e, t) {
    e *= g;
    var n = N((t *= g)),
      a = w(t),
      r = m(e - se),
      i = w(r),
      f = a * N(r),
      c = be * n - le * a * i,
      o = le * n + be * a * i;
    ue.add(v(A(f * f + c * c), o)), (se = e), (le = n), (be = a);
  }
  var xe = [null, null],
    Me = { type: "LineString", coordinates: xe };
  function Se(e, t) {
    return (
      (xe[0] = e),
      (xe[1] = t),
      (function (e) {
        return (ue = new c()), R(e, me), +ue;
      })(Me)
    );
  }
  var Ee = {
      Feature: function (e, t) {
        return _e(e.geometry, t);
      },
      FeatureCollection: function (e, t) {
        for (var n = e.features, a = -1, r = n.length; ++a < r; )
          if (_e(n[a].geometry, t)) return !0;
        return !1;
      },
    },
    Ne = {
      Sphere: function () {
        return !0;
      },
      Point: function (e, t) {
        return Ae(e.coordinates, t);
      },
      MultiPoint: function (e, t) {
        for (var n = e.coordinates, a = -1, r = n.length; ++a < r; )
          if (Ae(n[a], t)) return !0;
        return !1;
      },
      LineString: function (e, t) {
        return ke(e.coordinates, t);
      },
      MultiLineString: function (e, t) {
        for (var n = e.coordinates, a = -1, r = n.length; ++a < r; )
          if (ke(n[a], t)) return !0;
        return !1;
      },
      Polygon: function (e, t) {
        return Ce(e.coordinates, t);
      },
      MultiPolygon: function (e, t) {
        for (var n = e.coordinates, a = -1, r = n.length; ++a < r; )
          if (Ce(n[a], t)) return !0;
        return !1;
      },
      GeometryCollection: function (e, t) {
        for (var n = e.geometries, a = -1, r = n.length; ++a < r; )
          if (_e(n[a], t)) return !0;
        return !1;
      },
    };
  function _e(e, t) {
    return !(!e || !Ne.hasOwnProperty(e.type)) && Ne[e.type](e, t);
  }
  function Ae(e, t) {
    return 0 === Se(e, t);
  }
  function ke(e, t) {
    for (var n, a, r, i = 0, f = e.length; i < f; i++) {
      if (0 === (a = Se(e[i], t))) return !0;
      if (
        i > 0 &&
        (r = Se(e[i], e[i - 1])) > 0 &&
        n <= r &&
        a <= r &&
        (n + a - r) * (1 - Math.pow((n - a) / r, 2)) < 1e-12 * r
      )
        return !0;
      n = a;
    }
    return !1;
  }
  function Ce(e, t) {
    return !!re(e.map(Pe), Ie(t));
  }
  function Pe(e) {
    return (e = e.map(Ie)).pop(), e;
  }
  function Ie(e) {
    return [e[0] * g, e[1] * g];
  }
  function je(e, t, n) {
    var a = d(e, t - u, n).concat(t);
    return function (e) {
      return a.map(function (t) {
        return [e, t];
      });
    };
  }
  function $e(e, t, n) {
    var a = d(e, t - u, n).concat(t);
    return function (e) {
      return a.map(function (t) {
        return [t, e];
      });
    };
  }
  function Oe() {
    var e,
      t,
      n,
      a,
      r,
      i,
      f,
      c,
      o,
      s,
      l,
      b,
      h = 10,
      p = h,
      g = 90,
      y = 360,
      v = 2.5;
    function w() {
      return { type: "MultiLineString", coordinates: M() };
    }
    function M() {
      return d(x(a / g) * g, n, g)
        .map(l)
        .concat(d(x(c / y) * y, f, y).map(b))
        .concat(
          d(x(t / h) * h, e, h)
            .filter(function (e) {
              return m(e % g) > u;
            })
            .map(o)
        )
        .concat(
          d(x(i / p) * p, r, p)
            .filter(function (e) {
              return m(e % y) > u;
            })
            .map(s)
        );
    }
    return (
      (w.lines = function () {
        return M().map(function (e) {
          return { type: "LineString", coordinates: e };
        });
      }),
      (w.outline = function () {
        return {
          type: "Polygon",
          coordinates: [
            l(a).concat(
              b(f).slice(1),
              l(n).reverse().slice(1),
              b(c).reverse().slice(1)
            ),
          ],
        };
      }),
      (w.extent = function (e) {
        return arguments.length
          ? w.extentMajor(e).extentMinor(e)
          : w.extentMinor();
      }),
      (w.extentMajor = function (e) {
        return arguments.length
          ? ((a = +e[0][0]),
            (n = +e[1][0]),
            (c = +e[0][1]),
            (f = +e[1][1]),
            a > n && ((e = a), (a = n), (n = e)),
            c > f && ((e = c), (c = f), (f = e)),
            w.precision(v))
          : [
              [a, c],
              [n, f],
            ];
      }),
      (w.extentMinor = function (n) {
        return arguments.length
          ? ((t = +n[0][0]),
            (e = +n[1][0]),
            (i = +n[0][1]),
            (r = +n[1][1]),
            t > e && ((n = t), (t = e), (e = n)),
            i > r && ((n = i), (i = r), (r = n)),
            w.precision(v))
          : [
              [t, i],
              [e, r],
            ];
      }),
      (w.step = function (e) {
        return arguments.length ? w.stepMajor(e).stepMinor(e) : w.stepMinor();
      }),
      (w.stepMajor = function (e) {
        return arguments.length ? ((g = +e[0]), (y = +e[1]), w) : [g, y];
      }),
      (w.stepMinor = function (e) {
        return arguments.length ? ((h = +e[0]), (p = +e[1]), w) : [h, p];
      }),
      (w.precision = function (d) {
        return arguments.length
          ? ((v = +d),
            (o = je(i, r, 90)),
            (s = $e(t, e, v)),
            (l = je(c, f, 90)),
            (b = $e(a, n, v)),
            w)
          : v;
      }),
      w
        .extentMajor([
          [-180, -89.999999],
          [180, 89.999999],
        ])
        .extentMinor([
          [-180, -80.000001],
          [180, 80.000001],
        ])
    );
  }
  var ze,
    De,
    Re,
    Ge,
    qe = (e) => e,
    Be = new c(),
    Te = new c(),
    Le = {
      point: I,
      lineStart: I,
      lineEnd: I,
      polygonStart: function () {
        (Le.lineStart = Fe), (Le.lineEnd = He);
      },
      polygonEnd: function () {
        (Le.lineStart = Le.lineEnd = Le.point = I),
          Be.add(m(Te)),
          (Te = new c());
      },
      result: function () {
        var e = Be / 2;
        return (Be = new c()), e;
      },
    };
  function Fe() {
    Le.point = We;
  }
  function We(e, t) {
    (Le.point = Ve), (ze = Re = e), (De = Ge = t);
  }
  function Ve(e, t) {
    Te.add(Ge * e - Re * t), (Re = e), (Ge = t);
  }
  function He() {
    Ve(ze, De);
  }
  var Ye,
    Ke,
    Ue,
    Xe,
    Qe = 1 / 0,
    Ze = Qe,
    Je = -Qe,
    et = Je,
    tt = {
      point: function (e, t) {
        e < Qe && (Qe = e),
          e > Je && (Je = e),
          t < Ze && (Ze = t),
          t > et && (et = t);
      },
      lineStart: I,
      lineEnd: I,
      polygonStart: I,
      polygonEnd: I,
      result: function () {
        var e = [
          [Qe, Ze],
          [Je, et],
        ];
        return (Je = et = -(Ze = Qe = 1 / 0)), e;
      },
    },
    nt = 0,
    at = 0,
    rt = 0,
    it = 0,
    ft = 0,
    ct = 0,
    ot = 0,
    dt = 0,
    ut = 0,
    st = {
      point: lt,
      lineStart: bt,
      lineEnd: gt,
      polygonStart: function () {
        (st.lineStart = mt), (st.lineEnd = yt);
      },
      polygonEnd: function () {
        (st.point = lt), (st.lineStart = bt), (st.lineEnd = gt);
      },
      result: function () {
        var e = ut
          ? [ot / ut, dt / ut]
          : ct
          ? [it / ct, ft / ct]
          : rt
          ? [nt / rt, at / rt]
          : [NaN, NaN];
        return (nt = at = rt = it = ft = ct = ot = dt = ut = 0), e;
      },
    };
  function lt(e, t) {
    (nt += e), (at += t), ++rt;
  }
  function bt() {
    st.point = ht;
  }
  function ht(e, t) {
    (st.point = pt), lt((Ue = e), (Xe = t));
  }
  function pt(e, t) {
    var n = e - Ue,
      a = t - Xe,
      r = A(n * n + a * a);
    (it += (r * (Ue + e)) / 2),
      (ft += (r * (Xe + t)) / 2),
      (ct += r),
      lt((Ue = e), (Xe = t));
  }
  function gt() {
    st.point = lt;
  }
  function mt() {
    st.point = vt;
  }
  function yt() {
    wt(Ye, Ke);
  }
  function vt(e, t) {
    (st.point = wt), lt((Ye = Ue = e), (Ke = Xe = t));
  }
  function wt(e, t) {
    var n = e - Ue,
      a = t - Xe,
      r = A(n * n + a * a);
    (it += (r * (Ue + e)) / 2),
      (ft += (r * (Xe + t)) / 2),
      (ct += r),
      (ot += (r = Xe * e - Ue * t) * (Ue + e)),
      (dt += r * (Xe + t)),
      (ut += 3 * r),
      lt((Ue = e), (Xe = t));
  }
  function xt(e) {
    this._context = e;
  }
  xt.prototype = {
    _radius: 4.5,
    pointRadius: function (e) {
      return (this._radius = e), this;
    },
    polygonStart: function () {
      this._line = 0;
    },
    polygonEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      0 === this._line && this._context.closePath(), (this._point = NaN);
    },
    point: function (e, t) {
      switch (this._point) {
        case 0:
          this._context.moveTo(e, t), (this._point = 1);
          break;
        case 1:
          this._context.lineTo(e, t);
          break;
        default:
          this._context.moveTo(e + this._radius, t),
            this._context.arc(e, t, this._radius, 0, h);
      }
    },
    result: I,
  };
  var Mt,
    St,
    Et,
    Nt,
    _t,
    At = new c(),
    kt = {
      point: I,
      lineStart: function () {
        kt.point = Ct;
      },
      lineEnd: function () {
        Mt && Pt(St, Et), (kt.point = I);
      },
      polygonStart: function () {
        Mt = !0;
      },
      polygonEnd: function () {
        Mt = null;
      },
      result: function () {
        var e = +At;
        return (At = new c()), e;
      },
    };
  function Ct(e, t) {
    (kt.point = Pt), (St = Nt = e), (Et = _t = t);
  }
  function Pt(e, t) {
    (Nt -= e), (_t -= t), At.add(A(Nt * Nt + _t * _t)), (Nt = e), (_t = t);
  }
  function It() {
    this._string = [];
  }
  function jt(e) {
    return (
      "m0," +
      e +
      "a" +
      e +
      "," +
      e +
      " 0 1,1 0," +
      -2 * e +
      "a" +
      e +
      "," +
      e +
      " 0 1,1 0," +
      2 * e +
      "z"
    );
  }
  function $t(e, t) {
    var n,
      a,
      r = 4.5;
    function i(e) {
      return (
        e &&
          ("function" == typeof r && a.pointRadius(+r.apply(this, arguments)),
          R(e, n(a))),
        a.result()
      );
    }
    return (
      (i.area = function (e) {
        return R(e, n(Le)), Le.result();
      }),
      (i.measure = function (e) {
        return R(e, n(kt)), kt.result();
      }),
      (i.bounds = function (e) {
        return R(e, n(tt)), tt.result();
      }),
      (i.centroid = function (e) {
        return R(e, n(st)), st.result();
      }),
      (i.projection = function (t) {
        return arguments.length
          ? ((n = null == t ? ((e = null), qe) : (e = t).stream), i)
          : e;
      }),
      (i.context = function (e) {
        return arguments.length
          ? ((a = null == e ? ((t = null), new It()) : new xt((t = e))),
            "function" != typeof r && a.pointRadius(r),
            i)
          : t;
      }),
      (i.pointRadius = function (e) {
        return arguments.length
          ? ((r = "function" == typeof e ? e : (a.pointRadius(+e), +e)), i)
          : r;
      }),
      i.projection(e).context(t)
    );
  }
  function Ot(e) {
    return function (t) {
      var n = new zt();
      for (var a in e) n[a] = e[a];
      return (n.stream = t), n;
    };
  }
  function zt() {}
  function Dt(e, t, n) {
    var a = e.clipExtent && e.clipExtent();
    return (
      e.scale(150).translate([0, 0]),
      null != a && e.clipExtent(null),
      R(n, e.stream(tt)),
      t(tt.result()),
      null != a && e.clipExtent(a),
      e
    );
  }
  function Rt(e, t, n) {
    return Dt(
      e,
      function (n) {
        var a = t[1][0] - t[0][0],
          r = t[1][1] - t[0][1],
          i = Math.min(a / (n[1][0] - n[0][0]), r / (n[1][1] - n[0][1])),
          f = +t[0][0] + (a - i * (n[1][0] + n[0][0])) / 2,
          c = +t[0][1] + (r - i * (n[1][1] + n[0][1])) / 2;
        e.scale(150 * i).translate([f, c]);
      },
      n
    );
  }
  function Gt(e, t, n) {
    return Rt(e, [[0, 0], t], n);
  }
  function qt(e, t, n) {
    return Dt(
      e,
      function (n) {
        var a = +t,
          r = a / (n[1][0] - n[0][0]),
          i = (a - r * (n[1][0] + n[0][0])) / 2,
          f = -r * n[0][1];
        e.scale(150 * r).translate([i, f]);
      },
      n
    );
  }
  function Bt(e, t, n) {
    return Dt(
      e,
      function (n) {
        var a = +t,
          r = a / (n[1][1] - n[0][1]),
          i = -r * n[0][0],
          f = (a - r * (n[1][1] + n[0][1])) / 2;
        e.scale(150 * r).translate([i, f]);
      },
      n
    );
  }
  (It.prototype = {
    _radius: 4.5,
    _circle: jt(4.5),
    pointRadius: function (e) {
      return (
        (e = +e) !== this._radius &&
          ((this._radius = e), (this._circle = null)),
        this
      );
    },
    polygonStart: function () {
      this._line = 0;
    },
    polygonEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      0 === this._line && this._string.push("Z"), (this._point = NaN);
    },
    point: function (e, t) {
      switch (this._point) {
        case 0:
          this._string.push("M", e, ",", t), (this._point = 1);
          break;
        case 1:
          this._string.push("L", e, ",", t);
          break;
        default:
          null == this._circle && (this._circle = jt(this._radius)),
            this._string.push("M", e, ",", t, this._circle);
      }
    },
    result: function () {
      if (this._string.length) {
        var e = this._string.join("");
        return (this._string = []), e;
      }
      return null;
    },
  }),
    (zt.prototype = {
      constructor: zt,
      point: function (e, t) {
        this.stream.point(e, t);
      },
      sphere: function () {
        this.stream.sphere();
      },
      lineStart: function () {
        this.stream.lineStart();
      },
      lineEnd: function () {
        this.stream.lineEnd();
      },
      polygonStart: function () {
        this.stream.polygonStart();
      },
      polygonEnd: function () {
        this.stream.polygonEnd();
      },
    });
  var Tt = w(30 * g);
  function Lt(e, t) {
    return +t
      ? (function (e, t) {
          function n(a, r, i, f, c, o, d, s, l, b, h, p, g, y) {
            var w = d - a,
              x = s - r,
              M = w * w + x * x;
            if (M > 4 * t && g--) {
              var S = f + b,
                E = c + h,
                N = o + p,
                _ = A(S * S + E * E + N * N),
                k = P((N /= _)),
                C = m(m(N) - 1) < u || m(i - l) < u ? (i + l) / 2 : v(E, S),
                I = e(C, k),
                j = I[0],
                $ = I[1],
                O = j - a,
                z = $ - r,
                D = x * O - w * z;
              ((D * D) / M > t ||
                m((w * O + x * z) / M - 0.5) > 0.3 ||
                f * b + c * h + o * p < Tt) &&
                (n(a, r, i, f, c, o, j, $, C, (S /= _), (E /= _), N, g, y),
                y.point(j, $),
                n(j, $, C, S, E, N, d, s, l, b, h, p, g, y));
            }
          }
          return function (t) {
            var a,
              r,
              i,
              f,
              c,
              o,
              d,
              u,
              s,
              l,
              b,
              h,
              p = {
                point: g,
                lineStart: m,
                lineEnd: v,
                polygonStart: function () {
                  t.polygonStart(), (p.lineStart = w);
                },
                polygonEnd: function () {
                  t.polygonEnd(), (p.lineStart = m);
                },
              };
            function g(n, a) {
              (n = e(n, a)), t.point(n[0], n[1]);
            }
            function m() {
              (u = NaN), (p.point = y), t.lineStart();
            }
            function y(a, r) {
              var i = q([a, r]),
                f = e(a, r);
              n(
                u,
                s,
                d,
                l,
                b,
                h,
                (u = f[0]),
                (s = f[1]),
                (d = a),
                (l = i[0]),
                (b = i[1]),
                (h = i[2]),
                16,
                t
              ),
                t.point(u, s);
            }
            function v() {
              (p.point = g), t.lineEnd();
            }
            function w() {
              m(), (p.point = x), (p.lineEnd = M);
            }
            function x(e, t) {
              y((a = e), t),
                (r = u),
                (i = s),
                (f = l),
                (c = b),
                (o = h),
                (p.point = y);
            }
            function M() {
              n(u, s, d, l, b, h, r, i, a, f, c, o, 16, t),
                (p.lineEnd = v),
                v();
            }
            return p;
          };
        })(e, t)
      : (function (e) {
          return Ot({
            point: function (t, n) {
              (t = e(t, n)), this.stream.point(t[0], t[1]);
            },
          });
        })(e);
  }
  var Ft = Ot({
    point: function (e, t) {
      this.stream.point(e * g, t * g);
    },
  });
  function Wt(e, t, n, a, r, i) {
    if (!i)
      return (function (e, t, n, a, r) {
        function i(i, f) {
          return [t + e * (i *= a), n - e * (f *= r)];
        }
        return (
          (i.invert = function (i, f) {
            return [((i - t) / e) * a, ((n - f) / e) * r];
          }),
          i
        );
      })(e, t, n, a, r);
    var f = w(i),
      c = N(i),
      o = f * e,
      d = c * e,
      u = f / e,
      s = c / e,
      l = (c * n - f * t) / e,
      b = (c * t + f * n) / e;
    function h(e, i) {
      return [o * (e *= a) - d * (i *= r) + t, n - d * e - o * i];
    }
    return (
      (h.invert = function (e, t) {
        return [a * (u * e - s * t + l), r * (b - s * e - u * t)];
      }),
      h
    );
  }
  function Vt(e) {
    return Ht(function () {
      return e;
    })();
  }
  function Ht(e) {
    var t,
      n,
      a,
      r,
      i,
      f,
      c,
      o,
      d,
      u,
      s = 150,
      l = 480,
      b = 250,
      h = 0,
      m = 0,
      y = 0,
      v = 0,
      w = 0,
      x = 0,
      M = 1,
      S = 1,
      E = null,
      N = oe,
      _ = null,
      k = qe,
      C = 0.5;
    function P(e) {
      return o(e[0] * g, e[1] * g);
    }
    function I(e) {
      return (e = o.invert(e[0], e[1])) && [e[0] * p, e[1] * p];
    }
    function j() {
      var e = Wt(s, 0, 0, M, S, x).apply(null, t(h, m)),
        a = Wt(s, l - e[0], b - e[1], M, S, x);
      return (
        (n = Y(y, v, w)), (c = V(t, a)), (o = V(n, c)), (f = Lt(c, C)), $()
      );
    }
    function $() {
      return (d = u = null), P;
    }
    return (
      (P.stream = function (e) {
        return d && u === e
          ? d
          : (d = Ft(
              (function (e) {
                return Ot({
                  point: function (t, n) {
                    var a = e(t, n);
                    return this.stream.point(a[0], a[1]);
                  },
                });
              })(n)(N(f(k((u = e)))))
            ));
      }),
      (P.preclip = function (e) {
        return arguments.length ? ((N = e), (E = void 0), $()) : N;
      }),
      (P.postclip = function (e) {
        return arguments.length ? ((k = e), (_ = a = r = i = null), $()) : k;
      }),
      (P.clipAngle = function (e) {
        return arguments.length
          ? ((N = +e ? de((E = e * g)) : ((E = null), oe)), $())
          : E * p;
      }),
      (P.clipExtent = function (e) {
        return arguments.length
          ? ((k =
              null == e
                ? ((_ = a = r = i = null), qe)
                : ge(
                    (_ = +e[0][0]),
                    (a = +e[0][1]),
                    (r = +e[1][0]),
                    (i = +e[1][1])
                  )),
            $())
          : null == _
          ? null
          : [
              [_, a],
              [r, i],
            ];
      }),
      (P.scale = function (e) {
        return arguments.length ? ((s = +e), j()) : s;
      }),
      (P.translate = function (e) {
        return arguments.length ? ((l = +e[0]), (b = +e[1]), j()) : [l, b];
      }),
      (P.center = function (e) {
        return arguments.length
          ? ((h = (e[0] % 360) * g), (m = (e[1] % 360) * g), j())
          : [h * p, m * p];
      }),
      (P.rotate = function (e) {
        return arguments.length
          ? ((y = (e[0] % 360) * g),
            (v = (e[1] % 360) * g),
            (w = e.length > 2 ? (e[2] % 360) * g : 0),
            j())
          : [y * p, v * p, w * p];
      }),
      (P.angle = function (e) {
        return arguments.length ? ((x = (e % 360) * g), j()) : x * p;
      }),
      (P.reflectX = function (e) {
        return arguments.length ? ((M = e ? -1 : 1), j()) : M < 0;
      }),
      (P.reflectY = function (e) {
        return arguments.length ? ((S = e ? -1 : 1), j()) : S < 0;
      }),
      (P.precision = function (e) {
        return arguments.length ? ((f = Lt(c, (C = e * e))), $()) : A(C);
      }),
      (P.fitExtent = function (e, t) {
        return Rt(P, e, t);
      }),
      (P.fitSize = function (e, t) {
        return Gt(P, e, t);
      }),
      (P.fitWidth = function (e, t) {
        return qt(P, e, t);
      }),
      (P.fitHeight = function (e, t) {
        return Bt(P, e, t);
      }),
      function () {
        return (t = e.apply(this, arguments)), (P.invert = t.invert && I), j();
      }
    );
  }
  function Yt(e) {
    var t = 0,
      n = s / 3,
      a = Ht(e),
      r = a(t, n);
    return (
      (r.parallels = function (e) {
        return arguments.length
          ? a((t = e[0] * g), (n = e[1] * g))
          : [t * p, n * p];
      }),
      r
    );
  }
  function Kt(e, t) {
    var n = N(e),
      a = (n + N(t)) / 2;
    if (m(a) < u)
      return (function (e) {
        var t = w(e);
        function n(e, n) {
          return [e * t, N(n) / t];
        }
        return (
          (n.invert = function (e, n) {
            return [e / t, P(n * t)];
          }),
          n
        );
      })(e);
    var r = 1 + n * (2 * a - n),
      i = A(r) / a;
    function f(e, t) {
      var n = A(r - 2 * a * N(t)) / a;
      return [n * N((e *= a)), i - n * w(e)];
    }
    return (
      (f.invert = function (e, t) {
        var n = i - t,
          f = v(e, m(n)) * _(n);
        return (
          n * a < 0 && (f -= s * _(e) * _(n)),
          [f / a, P((r - (e * e + n * n) * a * a) / (2 * a))]
        );
      }),
      f
    );
  }
  function Ut() {
    return Yt(Kt).scale(155.424).center([0, 33.6442]);
  }
  function Xt() {
    return Ut()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
  }
  function Qt() {
    var e,
      t,
      n,
      a,
      r,
      i,
      f = Xt(),
      c = Ut().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
      o = Ut().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
      d = {
        point: function (e, t) {
          i = [e, t];
        },
      };
    function s(e) {
      var t = e[0],
        f = e[1];
      return (
        (i = null), n.point(t, f), i || (a.point(t, f), i) || (r.point(t, f), i)
      );
    }
    function l() {
      return (e = t = null), s;
    }
    return (
      (s.invert = function (e) {
        var t = f.scale(),
          n = f.translate(),
          a = (e[0] - n[0]) / t,
          r = (e[1] - n[1]) / t;
        return (
          r >= 0.12 && r < 0.234 && a >= -0.425 && a < -0.214
            ? c
            : r >= 0.166 && r < 0.234 && a >= -0.214 && a < -0.115
            ? o
            : f
        ).invert(e);
      }),
      (s.stream = function (n) {
        return e && t === n
          ? e
          : ((a = [f.stream((t = n)), c.stream(n), o.stream(n)]),
            (r = a.length),
            (e = {
              point: function (e, t) {
                for (var n = -1; ++n < r; ) a[n].point(e, t);
              },
              sphere: function () {
                for (var e = -1; ++e < r; ) a[e].sphere();
              },
              lineStart: function () {
                for (var e = -1; ++e < r; ) a[e].lineStart();
              },
              lineEnd: function () {
                for (var e = -1; ++e < r; ) a[e].lineEnd();
              },
              polygonStart: function () {
                for (var e = -1; ++e < r; ) a[e].polygonStart();
              },
              polygonEnd: function () {
                for (var e = -1; ++e < r; ) a[e].polygonEnd();
              },
            }));
        var a, r;
      }),
      (s.precision = function (e) {
        return arguments.length
          ? (f.precision(e), c.precision(e), o.precision(e), l())
          : f.precision();
      }),
      (s.scale = function (e) {
        return arguments.length
          ? (f.scale(e),
            c.scale(0.35 * e),
            o.scale(e),
            s.translate(f.translate()))
          : f.scale();
      }),
      (s.translate = function (e) {
        if (!arguments.length) return f.translate();
        var t = f.scale(),
          i = +e[0],
          s = +e[1];
        return (
          (n = f
            .translate(e)
            .clipExtent([
              [i - 0.455 * t, s - 0.238 * t],
              [i + 0.455 * t, s + 0.238 * t],
            ])
            .stream(d)),
          (a = c
            .translate([i - 0.307 * t, s + 0.201 * t])
            .clipExtent([
              [i - 0.425 * t + u, s + 0.12 * t + u],
              [i - 0.214 * t - u, s + 0.234 * t - u],
            ])
            .stream(d)),
          (r = o
            .translate([i - 0.205 * t, s + 0.212 * t])
            .clipExtent([
              [i - 0.214 * t + u, s + 0.166 * t + u],
              [i - 0.115 * t - u, s + 0.234 * t - u],
            ])
            .stream(d)),
          l()
        );
      }),
      (s.fitExtent = function (e, t) {
        return Rt(s, e, t);
      }),
      (s.fitSize = function (e, t) {
        return Gt(s, e, t);
      }),
      (s.fitWidth = function (e, t) {
        return qt(s, e, t);
      }),
      (s.fitHeight = function (e, t) {
        return Bt(s, e, t);
      }),
      s.scale(1070)
    );
  }
  function Zt(e) {
    return function (t, n) {
      var a = w(t),
        r = w(n),
        i = e(a * r);
      return i === 1 / 0 ? [2, 0] : [i * r * N(t), i * N(n)];
    };
  }
  function Jt(e) {
    return function (t, n) {
      var a = A(t * t + n * n),
        r = e(a),
        i = N(r),
        f = w(r);
      return [v(t * i, a * f), P(a && (n * i) / a)];
    };
  }
  var en = Zt(function (e) {
    return A(2 / (1 + e));
  });
  function tn() {
    return Vt(en).scale(124.75).clipAngle(179.999);
  }
  en.invert = Jt(function (e) {
    return 2 * P(e / 2);
  });
  var nn = Zt(function (e) {
    return (e = C(e)) && e / N(e);
  });
  function an() {
    return Vt(nn).scale(79.4188).clipAngle(179.999);
  }
  function rn(e, t) {
    return [e, S(k((l + t) / 2))];
  }
  function fn() {
    return cn(rn).scale(961 / h);
  }
  function cn(e) {
    var t,
      n,
      a,
      r = Vt(e),
      i = r.center,
      f = r.scale,
      c = r.translate,
      o = r.clipExtent,
      d = null;
    function u() {
      var i = s * f(),
        c = r(
          (function (e) {
            function t(t) {
              return ((t = e(t[0] * g, t[1] * g))[0] *= p), (t[1] *= p), t;
            }
            return (
              (e = Y(e[0] * g, e[1] * g, e.length > 2 ? e[2] * g : 0)),
              (t.invert = function (t) {
                return (
                  ((t = e.invert(t[0] * g, t[1] * g))[0] *= p), (t[1] *= p), t
                );
              }),
              t
            );
          })(r.rotate()).invert([0, 0])
        );
      return o(
        null == d
          ? [
              [c[0] - i, c[1] - i],
              [c[0] + i, c[1] + i],
            ]
          : e === rn
          ? [
              [Math.max(c[0] - i, d), t],
              [Math.min(c[0] + i, n), a],
            ]
          : [
              [d, Math.max(c[1] - i, t)],
              [n, Math.min(c[1] + i, a)],
            ]
      );
    }
    return (
      (r.scale = function (e) {
        return arguments.length ? (f(e), u()) : f();
      }),
      (r.translate = function (e) {
        return arguments.length ? (c(e), u()) : c();
      }),
      (r.center = function (e) {
        return arguments.length ? (i(e), u()) : i();
      }),
      (r.clipExtent = function (e) {
        return arguments.length
          ? (null == e
              ? (d = t = n = a = null)
              : ((d = +e[0][0]),
                (t = +e[0][1]),
                (n = +e[1][0]),
                (a = +e[1][1])),
            u())
          : null == d
          ? null
          : [
              [d, t],
              [n, a],
            ];
      }),
      u()
    );
  }
  function on(e) {
    return k((l + e) / 2);
  }
  function dn(e, t) {
    var n = w(e),
      a = e === t ? N(e) : S(n / w(t)) / S(on(t) / on(e)),
      r = (n * E(on(e), a)) / a;
    if (!a) return rn;
    function i(e, t) {
      r > 0 ? t < -l + u && (t = -l + u) : t > l - u && (t = l - u);
      var n = r / E(on(t), a);
      return [n * N(a * e), r - n * w(a * e)];
    }
    return (
      (i.invert = function (e, t) {
        var n = r - t,
          i = _(a) * A(e * e + n * n),
          f = v(e, m(n)) * _(n);
        return (
          n * a < 0 && (f -= s * _(e) * _(n)),
          [f / a, 2 * y(E(r / i, 1 / a)) - l]
        );
      }),
      i
    );
  }
  function un() {
    return Yt(dn).scale(109.5).parallels([30, 30]);
  }
  function sn(e, t) {
    return [e, t];
  }
  function ln() {
    return Vt(sn).scale(152.63);
  }
  function bn(e, t) {
    var n = w(e),
      a = e === t ? N(e) : (n - w(t)) / (t - e),
      r = n / a + e;
    if (m(a) < u) return sn;
    function i(e, t) {
      var n = r - t,
        i = a * e;
      return [n * N(i), r - n * w(i)];
    }
    return (
      (i.invert = function (e, t) {
        var n = r - t,
          i = v(e, m(n)) * _(n);
        return (
          n * a < 0 && (i -= s * _(e) * _(n)),
          [i / a, r - _(a) * A(e * e + n * n)]
        );
      }),
      i
    );
  }
  function hn() {
    return Yt(bn).scale(131.154).center([0, 13.9389]);
  }
  (nn.invert = Jt(function (e) {
    return e;
  })),
    (rn.invert = function (e, t) {
      return [e, 2 * y(M(t)) - l];
    }),
    (sn.invert = sn);
  var pn = 1.340264,
    gn = -0.081106,
    mn = 893e-6,
    yn = 0.003796,
    vn = A(3) / 2;
  function wn(e, t) {
    var n = P(vn * N(t)),
      a = n * n,
      r = a * a * a;
    return [
      (e * w(n)) / (vn * (pn + 3 * gn * a + r * (7 * mn + 9 * yn * a))),
      n * (pn + gn * a + r * (mn + yn * a)),
    ];
  }
  function xn() {
    return Vt(wn).scale(177.158);
  }
  function Mn(e, t) {
    var n = w(t),
      a = w(e) * n;
    return [(n * N(e)) / a, N(t) / a];
  }
  function Sn() {
    return Vt(Mn).scale(144.049).clipAngle(60);
  }
  function En(e, t) {
    var n = t * t,
      a = n * n;
    return [
      e *
        (0.8707 -
          0.131979 * n +
          a * (a * (0.003971 * n - 0.001529 * a) - 0.013791)),
      t *
        (1.007226 +
          n * (0.015085 + a * (0.028874 * n - 0.044475 - 0.005916 * a))),
    ];
  }
  function Nn() {
    return Vt(En).scale(175.295);
  }
  function _n(e, t) {
    return [w(t) * N(e), N(t)];
  }
  function An() {
    return Vt(_n).scale(249.5).clipAngle(90.000001);
  }
  function kn(e, t) {
    var n = w(t),
      a = 1 + w(e) * n;
    return [(n * N(e)) / a, N(t) / a];
  }
  function Cn() {
    return Vt(kn).scale(250).clipAngle(142);
  }
  function Pn(e, t) {
    return [S(k((l + t) / 2)), -e];
  }
  function In() {
    var e = cn(Pn),
      t = e.center,
      n = e.rotate;
    return (
      (e.center = function (e) {
        return arguments.length ? t([-e[1], e[0]]) : [(e = t())[1], -e[0]];
      }),
      (e.rotate = function (e) {
        return arguments.length
          ? n([e[0], e[1], e.length > 2 ? e[2] + 90 : 90])
          : [(e = n())[0], e[1], e[2] - 90];
      }),
      n([0, 0, 90]).scale(159.155)
    );
  }
  (wn.invert = function (e, t) {
    for (
      var n, a = t, r = a * a, i = r * r * r, f = 0;
      f < 12 &&
      ((i =
        (r =
          (a -= n =
            (a * (pn + gn * r + i * (mn + yn * r)) - t) /
            (pn + 3 * gn * r + i * (7 * mn + 9 * yn * r))) * a) *
        r *
        r),
      !(m(n) < 1e-12));
      ++f
    );
    return [
      (vn * e * (pn + 3 * gn * r + i * (7 * mn + 9 * yn * r))) / w(a),
      P(N(a) / vn),
    ];
  }),
    (Mn.invert = Jt(y)),
    (En.invert = function (e, t) {
      var n,
        a = t,
        r = 25;
      do {
        var i = a * a,
          f = i * i;
        a -= n =
          (a *
            (1.007226 +
              i * (0.015085 + f * (0.028874 * i - 0.044475 - 0.005916 * f))) -
            t) /
          (1.007226 +
            i * (0.045255 + f * (0.259866 * i - 0.311325 - 0.005916 * 11 * f)));
      } while (m(n) > u && --r > 0);
      return [
        e /
          (0.8707 +
            (i = a * a) *
              (i * (i * i * i * (0.003971 - 0.001529 * i) - 0.013791) -
                0.131979)),
        a,
      ];
    }),
    (_n.invert = Jt(P)),
    (kn.invert = Jt(function (e) {
      return 2 * y(e);
    })),
    (Pn.invert = function (e, t) {
      return [-t, 2 * y(M(e)) - l];
    });
  const jn = {
    geoAzimuthalEqualArea: tn,
    geoAzimuthalEquidistant: an,
    geoGnomonic: Sn,
    geoOrthographic: An,
    geoStereographic: Cn,
    geoEqualEarth: xn,
    geoAlbers: Xt,
    geoAlbersUsa: Qt,
    geoConicConformal: un,
    geoConicEqualArea: Ut,
    geoConicEquidistant: hn,
    geoEquirectangular: ln,
    geoMercator: fn,
    geoTransverseMercator: In,
    geoNaturalEarth1: Nn,
  };
  Object.keys(jn).forEach((e) => {
    jn[`${e.charAt(3).toLowerCase()}${e.slice(4)}`] = jn[e];
  });
  class $n extends t.Scale {
    constructor(e) {
      super(e),
        (this.outlineBounds = null),
        (this.oldChartBounds = null),
        (this.geoPath = $t());
    }
    init(e) {
      (e.position = "chartArea"),
        super.init(e),
        "function" == typeof e.projection
          ? (this.projection = e.projection)
          : (this.projection = (jn[e.projection] || jn.albersUsa)()),
        this.geoPath.projection(this.projection),
        (this.outlineBounds = null),
        (this.oldChartBounds = null);
    }
    computeBounds(e) {
      const t = $t(this.projection.fitWidth(1e3, e)).bounds(e),
        n = Math.ceil(t[1][1] - t[0][1]),
        a = Math.ceil(t[1][0] - t[0][0]),
        r = this.projection.translate();
      this.outlineBounds = {
        width: a,
        height: n,
        aspectRatio: a / n,
        refScale: this.projection.scale(),
        refX: r[0],
        refY: r[1],
      };
    }
    updateBounds() {
      const e = this.chart.chartArea,
        t = this.outlineBounds;
      if (!t) return !1;
      const n = this.options.padding,
        a = "number" == typeof n ? n : n.top,
        r = "number" == typeof n ? n : n.left,
        i = "number" == typeof n ? n : n.bottom,
        f = "number" == typeof n ? n : n.right,
        c = e.right - e.left - r - f,
        o = e.bottom - e.top - a - i,
        d = this.oldChartBounds;
      this.oldChartBounds = { chartWidth: c, chartHeight: o };
      const u = Math.min(c / t.width, o / t.height),
        s = t.width * u,
        l = t.height * u,
        b = 0.5 * (c - s) + e.left + r,
        h = 0.5 * (o - l) + e.top + a,
        p = this.options;
      return (
        this.projection
          .scale(t.refScale * u * p.projectionScale)
          .translate([
            u * t.refX + b + p.projectionOffset[0],
            u * t.refY + h + p.projectionOffset[1],
          ]),
        !d ||
          d.chartWidth !== this.oldChartBounds.chartWidth ||
          d.chartHeight !== this.oldChartBounds.chartHeight
      );
    }
  }
  function On(e) {
    for (var t = (e.length / 6) | 0, n = new Array(t), a = 0; a < t; )
      n[a] = "#" + e.slice(6 * a, 6 * ++a);
    return n;
  }
  function zn(e, t, n) {
    (e.prototype = t.prototype = n), (n.constructor = e);
  }
  function Dn(e, t) {
    var n = Object.create(e.prototype);
    for (var a in t) n[a] = t[a];
    return n;
  }
  function Rn() {}
  ($n.id = "projection"),
    ($n.defaults = {
      projection: "albersUsa",
      projectionScale: 1,
      projectionOffset: [0, 0],
      padding: 0,
    }),
    ($n.descriptors = {
      _scriptable: (e) => "projection" !== e,
      _indexable: (e) => "projectionOffset" !== e,
    }),
    On("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
    On("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),
    On("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),
    On(
      "a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"
    ),
    On("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),
    On("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),
    On("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),
    On("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),
    On(
      "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
    ),
    On("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
  var Gn = 0.7,
    qn = 1 / Gn,
    Bn = "\\s*([+-]?\\d+)\\s*",
    Tn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    Ln = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    Fn = /^#([0-9a-f]{3,8})$/,
    Wn = new RegExp(`^rgb\\(${Bn},${Bn},${Bn}\\)$`),
    Vn = new RegExp(`^rgb\\(${Ln},${Ln},${Ln}\\)$`),
    Hn = new RegExp(`^rgba\\(${Bn},${Bn},${Bn},${Tn}\\)$`),
    Yn = new RegExp(`^rgba\\(${Ln},${Ln},${Ln},${Tn}\\)$`),
    Kn = new RegExp(`^hsl\\(${Tn},${Ln},${Ln}\\)$`),
    Un = new RegExp(`^hsla\\(${Tn},${Ln},${Ln},${Tn}\\)$`),
    Xn = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    };
  function Qn() {
    return this.rgb().formatHex();
  }
  function Zn() {
    return this.rgb().formatRgb();
  }
  function Jn(e) {
    var t, n;
    return (
      (e = (e + "").trim().toLowerCase()),
      (t = Fn.exec(e))
        ? ((n = t[1].length),
          (t = parseInt(t[1], 16)),
          6 === n
            ? ea(t)
            : 3 === n
            ? new ra(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (240 & t),
                ((15 & t) << 4) | (15 & t),
                1
              )
            : 8 === n
            ? ta(
                (t >> 24) & 255,
                (t >> 16) & 255,
                (t >> 8) & 255,
                (255 & t) / 255
              )
            : 4 === n
            ? ta(
                ((t >> 12) & 15) | ((t >> 8) & 240),
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (240 & t),
                (((15 & t) << 4) | (15 & t)) / 255
              )
            : null)
        : (t = Wn.exec(e))
        ? new ra(t[1], t[2], t[3], 1)
        : (t = Vn.exec(e))
        ? new ra((255 * t[1]) / 100, (255 * t[2]) / 100, (255 * t[3]) / 100, 1)
        : (t = Hn.exec(e))
        ? ta(t[1], t[2], t[3], t[4])
        : (t = Yn.exec(e))
        ? ta((255 * t[1]) / 100, (255 * t[2]) / 100, (255 * t[3]) / 100, t[4])
        : (t = Kn.exec(e))
        ? ua(t[1], t[2] / 100, t[3] / 100, 1)
        : (t = Un.exec(e))
        ? ua(t[1], t[2] / 100, t[3] / 100, t[4])
        : Xn.hasOwnProperty(e)
        ? ea(Xn[e])
        : "transparent" === e
        ? new ra(NaN, NaN, NaN, 0)
        : null
    );
  }
  function ea(e) {
    return new ra((e >> 16) & 255, (e >> 8) & 255, 255 & e, 1);
  }
  function ta(e, t, n, a) {
    return a <= 0 && (e = t = n = NaN), new ra(e, t, n, a);
  }
  function na(e) {
    return (
      e instanceof Rn || (e = Jn(e)),
      e ? new ra((e = e.rgb()).r, e.g, e.b, e.opacity) : new ra()
    );
  }
  function aa(e, t, n, a) {
    return 1 === arguments.length ? na(e) : new ra(e, t, n, null == a ? 1 : a);
  }
  function ra(e, t, n, a) {
    (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +a);
  }
  function ia() {
    return `#${da(this.r)}${da(this.g)}${da(this.b)}`;
  }
  function fa() {
    const e = ca(this.opacity);
    return `${
      1 === e ? "rgb(" : "rgba("
    }${oa(this.r)}, ${oa(this.g)}, ${oa(this.b)}${1 === e ? ")" : `, ${e})`}`;
  }
  function ca(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
  }
  function oa(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0));
  }
  function da(e) {
    return ((e = oa(e)) < 16 ? "0" : "") + e.toString(16);
  }
  function ua(e, t, n, a) {
    return (
      a <= 0
        ? (e = t = n = NaN)
        : n <= 0 || n >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
      new la(e, t, n, a)
    );
  }
  function sa(e) {
    if (e instanceof la) return new la(e.h, e.s, e.l, e.opacity);
    if ((e instanceof Rn || (e = Jn(e)), !e)) return new la();
    if (e instanceof la) return e;
    var t = (e = e.rgb()).r / 255,
      n = e.g / 255,
      a = e.b / 255,
      r = Math.min(t, n, a),
      i = Math.max(t, n, a),
      f = NaN,
      c = i - r,
      o = (i + r) / 2;
    return (
      c
        ? ((f =
            t === i
              ? (n - a) / c + 6 * (n < a)
              : n === i
              ? (a - t) / c + 2
              : (t - n) / c + 4),
          (c /= o < 0.5 ? i + r : 2 - i - r),
          (f *= 60))
        : (c = o > 0 && o < 1 ? 0 : f),
      new la(f, c, o, e.opacity)
    );
  }
  function la(e, t, n, a) {
    (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +a);
  }
  function ba(e) {
    return (e = (e || 0) % 360) < 0 ? e + 360 : e;
  }
  function ha(e) {
    return Math.max(0, Math.min(1, e || 0));
  }
  function pa(e, t, n) {
    return (
      255 *
      (e < 60
        ? t + ((n - t) * e) / 60
        : e < 180
        ? n
        : e < 240
        ? t + ((n - t) * (240 - e)) / 60
        : t)
    );
  }
  zn(Rn, Jn, {
    copy(e) {
      return Object.assign(new this.constructor(), this, e);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: Qn,
    formatHex: Qn,
    formatHex8: function () {
      return this.rgb().formatHex8();
    },
    formatHsl: function () {
      return sa(this).formatHsl();
    },
    formatRgb: Zn,
    toString: Zn,
  }),
    zn(
      ra,
      aa,
      Dn(Rn, {
        brighter(e) {
          return (
            (e = null == e ? qn : Math.pow(qn, e)),
            new ra(this.r * e, this.g * e, this.b * e, this.opacity)
          );
        },
        darker(e) {
          return (
            (e = null == e ? Gn : Math.pow(Gn, e)),
            new ra(this.r * e, this.g * e, this.b * e, this.opacity)
          );
        },
        rgb() {
          return this;
        },
        clamp() {
          return new ra(oa(this.r), oa(this.g), oa(this.b), ca(this.opacity));
        },
        displayable() {
          return (
            -0.5 <= this.r &&
            this.r < 255.5 &&
            -0.5 <= this.g &&
            this.g < 255.5 &&
            -0.5 <= this.b &&
            this.b < 255.5 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        hex: ia,
        formatHex: ia,
        formatHex8: function () {
          return `#${da(this.r)}${da(this.g)}${da(this.b)}${da(
            255 * (isNaN(this.opacity) ? 1 : this.opacity)
          )}`;
        },
        formatRgb: fa,
        toString: fa,
      })
    ),
    zn(
      la,
      function (e, t, n, a) {
        return 1 === arguments.length
          ? sa(e)
          : new la(e, t, n, null == a ? 1 : a);
      },
      Dn(Rn, {
        brighter(e) {
          return (
            (e = null == e ? qn : Math.pow(qn, e)),
            new la(this.h, this.s, this.l * e, this.opacity)
          );
        },
        darker(e) {
          return (
            (e = null == e ? Gn : Math.pow(Gn, e)),
            new la(this.h, this.s, this.l * e, this.opacity)
          );
        },
        rgb() {
          var e = (this.h % 360) + 360 * (this.h < 0),
            t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
            n = this.l,
            a = n + (n < 0.5 ? n : 1 - n) * t,
            r = 2 * n - a;
          return new ra(
            pa(e >= 240 ? e - 240 : e + 120, r, a),
            pa(e, r, a),
            pa(e < 120 ? e + 240 : e - 120, r, a),
            this.opacity
          );
        },
        clamp() {
          return new la(ba(this.h), ha(this.s), ha(this.l), ca(this.opacity));
        },
        displayable() {
          return (
            ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
            0 <= this.l &&
            this.l <= 1 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        formatHsl() {
          const e = ca(this.opacity);
          return `${1 === e ? "hsl(" : "hsla("}${ba(this.h)}, ${
            100 * ha(this.s)
          }%, ${100 * ha(this.l)}%${1 === e ? ")" : `, ${e})`}`;
        },
      })
    );
  const ga = Math.PI / 180,
    ma = 180 / Math.PI,
    ya = 0.96422,
    va = 0.82521,
    wa = 4 / 29,
    xa = 6 / 29,
    Ma = 3 * xa * xa;
  function Sa(e) {
    if (e instanceof Ea) return new Ea(e.l, e.a, e.b, e.opacity);
    if (e instanceof Pa) return Ia(e);
    e instanceof ra || (e = na(e));
    var t,
      n,
      a = ka(e.r),
      r = ka(e.g),
      i = ka(e.b),
      f = Na((0.2225045 * a + 0.7168786 * r + 0.0606169 * i) / 1);
    return (
      a === r && r === i
        ? (t = n = f)
        : ((t = Na((0.4360747 * a + 0.3850649 * r + 0.1430804 * i) / ya)),
          (n = Na((0.0139322 * a + 0.0971045 * r + 0.7141733 * i) / va))),
      new Ea(116 * f - 16, 500 * (t - f), 200 * (f - n), e.opacity)
    );
  }
  function Ea(e, t, n, a) {
    (this.l = +e), (this.a = +t), (this.b = +n), (this.opacity = +a);
  }
  function Na(e) {
    return e > 0.008856451679035631 ? Math.pow(e, 1 / 3) : e / Ma + wa;
  }
  function _a(e) {
    return e > xa ? e * e * e : Ma * (e - wa);
  }
  function Aa(e) {
    return (
      255 * (e <= 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055)
    );
  }
  function ka(e) {
    return (e /= 255) <= 0.04045
      ? e / 12.92
      : Math.pow((e + 0.055) / 1.055, 2.4);
  }
  function Ca(e) {
    if (e instanceof Pa) return new Pa(e.h, e.c, e.l, e.opacity);
    if ((e instanceof Ea || (e = Sa(e)), 0 === e.a && 0 === e.b))
      return new Pa(NaN, 0 < e.l && e.l < 100 ? 0 : NaN, e.l, e.opacity);
    var t = Math.atan2(e.b, e.a) * ma;
    return new Pa(
      t < 0 ? t + 360 : t,
      Math.sqrt(e.a * e.a + e.b * e.b),
      e.l,
      e.opacity
    );
  }
  function Pa(e, t, n, a) {
    (this.h = +e), (this.c = +t), (this.l = +n), (this.opacity = +a);
  }
  function Ia(e) {
    if (isNaN(e.h)) return new Ea(e.l, 0, 0, e.opacity);
    var t = e.h * ga;
    return new Ea(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity);
  }
  zn(
    Ea,
    function (e, t, n, a) {
      return 1 === arguments.length
        ? Sa(e)
        : new Ea(e, t, n, null == a ? 1 : a);
    },
    Dn(Rn, {
      brighter(e) {
        return new Ea(
          this.l + 18 * (null == e ? 1 : e),
          this.a,
          this.b,
          this.opacity
        );
      },
      darker(e) {
        return new Ea(
          this.l - 18 * (null == e ? 1 : e),
          this.a,
          this.b,
          this.opacity
        );
      },
      rgb() {
        var e = (this.l + 16) / 116,
          t = isNaN(this.a) ? e : e + this.a / 500,
          n = isNaN(this.b) ? e : e - this.b / 200;
        return new ra(
          Aa(
            3.1338561 * (t = ya * _a(t)) -
              1.6168667 * (e = 1 * _a(e)) -
              0.4906146 * (n = va * _a(n))
          ),
          Aa(-0.9787684 * t + 1.9161415 * e + 0.033454 * n),
          Aa(0.0719453 * t - 0.2289914 * e + 1.4052427 * n),
          this.opacity
        );
      },
    })
  ),
    zn(
      Pa,
      function (e, t, n, a) {
        return 1 === arguments.length
          ? Ca(e)
          : new Pa(e, t, n, null == a ? 1 : a);
      },
      Dn(Rn, {
        brighter(e) {
          return new Pa(
            this.h,
            this.c,
            this.l + 18 * (null == e ? 1 : e),
            this.opacity
          );
        },
        darker(e) {
          return new Pa(
            this.h,
            this.c,
            this.l - 18 * (null == e ? 1 : e),
            this.opacity
          );
        },
        rgb() {
          return Ia(this).rgb();
        },
      })
    );
  var ja = -0.14861,
    $a = 1.78277,
    Oa = -0.29227,
    za = -0.90649,
    Da = 1.97294,
    Ra = Da * za,
    Ga = Da * $a,
    qa = $a * Oa - za * ja;
  function Ba(e) {
    if (e instanceof La) return new La(e.h, e.s, e.l, e.opacity);
    e instanceof ra || (e = na(e));
    var t = e.r / 255,
      n = e.g / 255,
      a = e.b / 255,
      r = (qa * a + Ra * t - Ga * n) / (qa + Ra - Ga),
      i = a - r,
      f = (Da * (n - r) - Oa * i) / za,
      c = Math.sqrt(f * f + i * i) / (Da * r * (1 - r)),
      o = c ? Math.atan2(f, i) * ma - 120 : NaN;
    return new La(o < 0 ? o + 360 : o, c, r, e.opacity);
  }
  function Ta(e, t, n, a) {
    return 1 === arguments.length ? Ba(e) : new La(e, t, n, null == a ? 1 : a);
  }
  function La(e, t, n, a) {
    (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +a);
  }
  zn(
    La,
    Ta,
    Dn(Rn, {
      brighter(e) {
        return (
          (e = null == e ? qn : Math.pow(qn, e)),
          new La(this.h, this.s, this.l * e, this.opacity)
        );
      },
      darker(e) {
        return (
          (e = null == e ? Gn : Math.pow(Gn, e)),
          new La(this.h, this.s, this.l * e, this.opacity)
        );
      },
      rgb() {
        var e = isNaN(this.h) ? 0 : (this.h + 120) * ga,
          t = +this.l,
          n = isNaN(this.s) ? 0 : this.s * t * (1 - t),
          a = Math.cos(e),
          r = Math.sin(e);
        return new ra(
          255 * (t + n * (ja * a + $a * r)),
          255 * (t + n * (Oa * a + za * r)),
          255 * (t + n * (Da * a)),
          this.opacity
        );
      },
    })
  );
  var Fa = (e) => () => e;
  function Wa(e, t) {
    return function (n) {
      return e + n * t;
    };
  }
  function Va(e, t) {
    var n = t - e;
    return n ? Wa(e, n) : Fa(isNaN(e) ? t : e);
  }
  !(function e(t) {
    var n = (function (e) {
      return 1 == (e = +e)
        ? Va
        : function (t, n) {
            return n - t
              ? (function (e, t, n) {
                  return (
                    (e = Math.pow(e, n)),
                    (t = Math.pow(t, n) - e),
                    (n = 1 / n),
                    function (a) {
                      return Math.pow(e + a * t, n);
                    }
                  );
                })(t, n, e)
              : Fa(isNaN(t) ? n : t);
          };
    })(t);
    function a(e, t) {
      var a = n((e = aa(e)).r, (t = aa(t)).r),
        r = n(e.g, t.g),
        i = n(e.b, t.b),
        f = Va(e.opacity, t.opacity);
      return function (t) {
        return (
          (e.r = a(t)), (e.g = r(t)), (e.b = i(t)), (e.opacity = f(t)), e + ""
        );
      };
    }
    return (a.gamma = e), a;
  })(1);
  var Ha,
    Ya =
      ((Ha = function (e) {
        var t = e.length - 1;
        return function (n) {
          var a =
              n <= 0 ? (n = 0) : n >= 1 ? ((n = 1), t - 1) : Math.floor(n * t),
            r = e[a],
            i = e[a + 1],
            f = a > 0 ? e[a - 1] : 2 * r - i,
            c = a < t - 1 ? e[a + 2] : 2 * i - r;
          return (function (e, t, n, a, r) {
            var i = e * e,
              f = i * e;
            return (
              ((1 - 3 * e + 3 * i - f) * t +
                (4 - 6 * i + 3 * f) * n +
                (1 + 3 * e + 3 * i - 3 * f) * a +
                f * r) /
              6
            );
          })((n - a / t) * t, f, r, i, c);
        };
      }),
      function (e) {
        var t,
          n,
          a = e.length,
          r = new Array(a),
          i = new Array(a),
          f = new Array(a);
        for (t = 0; t < a; ++t)
          (n = aa(e[t])),
            (r[t] = n.r || 0),
            (i[t] = n.g || 0),
            (f[t] = n.b || 0);
        return (
          (r = Ha(r)),
          (i = Ha(i)),
          (f = Ha(f)),
          (n.opacity = 1),
          function (e) {
            return (n.r = r(e)), (n.g = i(e)), (n.b = f(e)), n + "";
          }
        );
      });
  function Ka(e) {
    return ((e = Math.exp(e)) + 1 / e) / 2;
  }
  function Ua(e) {
    return (function t(n) {
      function a(t, a) {
        var r = e((t = Ta(t)).h, (a = Ta(a)).h),
          i = Va(t.s, a.s),
          f = Va(t.l, a.l),
          c = Va(t.opacity, a.opacity);
        return function (e) {
          return (
            (t.h = r(e)),
            (t.s = i(e)),
            (t.l = f(Math.pow(e, n))),
            (t.opacity = c(e)),
            t + ""
          );
        };
      }
      return (n = +n), (a.gamma = t), a;
    })(1);
  }
  !(function e(t, n, a) {
    function r(e, r) {
      var i,
        f,
        c = e[0],
        o = e[1],
        d = e[2],
        u = r[0],
        s = r[1],
        l = r[2],
        b = u - c,
        h = s - o,
        p = b * b + h * h;
      if (p < 1e-12)
        (f = Math.log(l / d) / t),
          (i = function (e) {
            return [c + e * b, o + e * h, d * Math.exp(t * e * f)];
          });
      else {
        var g = Math.sqrt(p),
          m = (l * l - d * d + a * p) / (2 * d * n * g),
          y = (l * l - d * d - a * p) / (2 * l * n * g),
          v = Math.log(Math.sqrt(m * m + 1) - m),
          w = Math.log(Math.sqrt(y * y + 1) - y);
        (f = (w - v) / t),
          (i = function (e) {
            var a,
              r = e * f,
              i = Ka(v),
              u =
                (d / (n * g)) *
                (i * ((a = t * r + v), ((a = Math.exp(2 * a)) - 1) / (a + 1)) -
                  (function (e) {
                    return ((e = Math.exp(e)) - 1 / e) / 2;
                  })(v));
            return [c + u * b, o + u * h, (d * i) / Ka(t * r + v)];
          });
      }
      return (i.duration = (1e3 * f * t) / Math.SQRT2), i;
    }
    return (
      (r.rho = function (t) {
        var n = Math.max(0.001, +t),
          a = n * n;
        return e(n, a, a * a);
      }),
      r
    );
  })(Math.SQRT2, 2, 4),
    Ua(function (e, t) {
      var n = t - e;
      return n
        ? Wa(e, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n)
        : Fa(isNaN(e) ? t : e);
    });
  var Xa = Ua(Va),
    Qa = (e) => Ya(e[e.length - 1]),
    Za = Qa(
      new Array(3)
        .concat(
          "d8b365f5f5f55ab4ac",
          "a6611adfc27d80cdc1018571",
          "a6611adfc27df5f5f580cdc1018571",
          "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
          "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
          "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
          "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
          "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
          "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
        )
        .map(On)
    ),
    Ja = Qa(
      new Array(3)
        .concat(
          "af8dc3f7f7f77fbf7b",
          "7b3294c2a5cfa6dba0008837",
          "7b3294c2a5cff7f7f7a6dba0008837",
          "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
          "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
          "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
          "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
          "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
          "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
        )
        .map(On)
    ),
    er = Qa(
      new Array(3)
        .concat(
          "e9a3c9f7f7f7a1d76a",
          "d01c8bf1b6dab8e1864dac26",
          "d01c8bf1b6daf7f7f7b8e1864dac26",
          "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
          "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
          "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
          "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
          "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
          "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
        )
        .map(On)
    ),
    tr = Qa(
      new Array(3)
        .concat(
          "998ec3f7f7f7f1a340",
          "5e3c99b2abd2fdb863e66101",
          "5e3c99b2abd2f7f7f7fdb863e66101",
          "542788998ec3d8daebfee0b6f1a340b35806",
          "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
          "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
          "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
          "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
          "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
        )
        .map(On)
    ),
    nr = Qa(
      new Array(3)
        .concat(
          "ef8a62f7f7f767a9cf",
          "ca0020f4a58292c5de0571b0",
          "ca0020f4a582f7f7f792c5de0571b0",
          "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
          "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
          "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
          "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
          "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
          "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
        )
        .map(On)
    ),
    ar = Qa(
      new Array(3)
        .concat(
          "ef8a62ffffff999999",
          "ca0020f4a582bababa404040",
          "ca0020f4a582ffffffbababa404040",
          "b2182bef8a62fddbc7e0e0e09999994d4d4d",
          "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
          "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
          "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
          "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
          "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
        )
        .map(On)
    ),
    rr = Qa(
      new Array(3)
        .concat(
          "fc8d59ffffbf91bfdb",
          "d7191cfdae61abd9e92c7bb6",
          "d7191cfdae61ffffbfabd9e92c7bb6",
          "d73027fc8d59fee090e0f3f891bfdb4575b4",
          "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
          "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
          "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
          "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
          "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
        )
        .map(On)
    ),
    ir = Qa(
      new Array(3)
        .concat(
          "fc8d59ffffbf91cf60",
          "d7191cfdae61a6d96a1a9641",
          "d7191cfdae61ffffbfa6d96a1a9641",
          "d73027fc8d59fee08bd9ef8b91cf601a9850",
          "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
          "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
          "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
          "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
          "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
        )
        .map(On)
    ),
    fr = Qa(
      new Array(3)
        .concat(
          "fc8d59ffffbf99d594",
          "d7191cfdae61abdda42b83ba",
          "d7191cfdae61ffffbfabdda42b83ba",
          "d53e4ffc8d59fee08be6f59899d5943288bd",
          "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
          "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
          "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
          "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
          "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
        )
        .map(On)
    ),
    cr = Qa(
      new Array(3)
        .concat(
          "e5f5f999d8c92ca25f",
          "edf8fbb2e2e266c2a4238b45",
          "edf8fbb2e2e266c2a42ca25f006d2c",
          "edf8fbccece699d8c966c2a42ca25f006d2c",
          "edf8fbccece699d8c966c2a441ae76238b45005824",
          "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
          "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
        )
        .map(On)
    ),
    or = Qa(
      new Array(3)
        .concat(
          "e0ecf49ebcda8856a7",
          "edf8fbb3cde38c96c688419d",
          "edf8fbb3cde38c96c68856a7810f7c",
          "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
          "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
          "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
          "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
        )
        .map(On)
    ),
    dr = Qa(
      new Array(3)
        .concat(
          "e0f3dba8ddb543a2ca",
          "f0f9e8bae4bc7bccc42b8cbe",
          "f0f9e8bae4bc7bccc443a2ca0868ac",
          "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
          "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
          "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
          "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
        )
        .map(On)
    ),
    ur = Qa(
      new Array(3)
        .concat(
          "fee8c8fdbb84e34a33",
          "fef0d9fdcc8afc8d59d7301f",
          "fef0d9fdcc8afc8d59e34a33b30000",
          "fef0d9fdd49efdbb84fc8d59e34a33b30000",
          "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
          "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
          "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
        )
        .map(On)
    ),
    sr = Qa(
      new Array(3)
        .concat(
          "ece2f0a6bddb1c9099",
          "f6eff7bdc9e167a9cf02818a",
          "f6eff7bdc9e167a9cf1c9099016c59",
          "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
          "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
          "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
          "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
        )
        .map(On)
    ),
    lr = Qa(
      new Array(3)
        .concat(
          "ece7f2a6bddb2b8cbe",
          "f1eef6bdc9e174a9cf0570b0",
          "f1eef6bdc9e174a9cf2b8cbe045a8d",
          "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
          "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
          "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
          "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
        )
        .map(On)
    ),
    br = Qa(
      new Array(3)
        .concat(
          "e7e1efc994c7dd1c77",
          "f1eef6d7b5d8df65b0ce1256",
          "f1eef6d7b5d8df65b0dd1c77980043",
          "f1eef6d4b9dac994c7df65b0dd1c77980043",
          "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
          "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
          "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
        )
        .map(On)
    ),
    hr = Qa(
      new Array(3)
        .concat(
          "fde0ddfa9fb5c51b8a",
          "feebe2fbb4b9f768a1ae017e",
          "feebe2fbb4b9f768a1c51b8a7a0177",
          "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
          "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
          "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
          "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
        )
        .map(On)
    ),
    pr = Qa(
      new Array(3)
        .concat(
          "edf8b17fcdbb2c7fb8",
          "ffffcca1dab441b6c4225ea8",
          "ffffcca1dab441b6c42c7fb8253494",
          "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
          "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
          "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
          "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
        )
        .map(On)
    ),
    gr = Qa(
      new Array(3)
        .concat(
          "f7fcb9addd8e31a354",
          "ffffccc2e69978c679238443",
          "ffffccc2e69978c67931a354006837",
          "ffffccd9f0a3addd8e78c67931a354006837",
          "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
          "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
          "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
        )
        .map(On)
    ),
    mr = Qa(
      new Array(3)
        .concat(
          "fff7bcfec44fd95f0e",
          "ffffd4fed98efe9929cc4c02",
          "ffffd4fed98efe9929d95f0e993404",
          "ffffd4fee391fec44ffe9929d95f0e993404",
          "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
          "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
          "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
        )
        .map(On)
    ),
    yr = Qa(
      new Array(3)
        .concat(
          "ffeda0feb24cf03b20",
          "ffffb2fecc5cfd8d3ce31a1c",
          "ffffb2fecc5cfd8d3cf03b20bd0026",
          "ffffb2fed976feb24cfd8d3cf03b20bd0026",
          "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
          "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
          "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
        )
        .map(On)
    ),
    vr = Qa(
      new Array(3)
        .concat(
          "deebf79ecae13182bd",
          "eff3ffbdd7e76baed62171b5",
          "eff3ffbdd7e76baed63182bd08519c",
          "eff3ffc6dbef9ecae16baed63182bd08519c",
          "eff3ffc6dbef9ecae16baed64292c62171b5084594",
          "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
          "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
        )
        .map(On)
    ),
    wr = Qa(
      new Array(3)
        .concat(
          "e5f5e0a1d99b31a354",
          "edf8e9bae4b374c476238b45",
          "edf8e9bae4b374c47631a354006d2c",
          "edf8e9c7e9c0a1d99b74c47631a354006d2c",
          "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
          "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
          "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
        )
        .map(On)
    ),
    xr = Qa(
      new Array(3)
        .concat(
          "f0f0f0bdbdbd636363",
          "f7f7f7cccccc969696525252",
          "f7f7f7cccccc969696636363252525",
          "f7f7f7d9d9d9bdbdbd969696636363252525",
          "f7f7f7d9d9d9bdbdbd969696737373525252252525",
          "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
          "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
        )
        .map(On)
    ),
    Mr = Qa(
      new Array(3)
        .concat(
          "efedf5bcbddc756bb1",
          "f2f0f7cbc9e29e9ac86a51a3",
          "f2f0f7cbc9e29e9ac8756bb154278f",
          "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
          "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
          "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
          "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
        )
        .map(On)
    ),
    Sr = Qa(
      new Array(3)
        .concat(
          "fee0d2fc9272de2d26",
          "fee5d9fcae91fb6a4acb181d",
          "fee5d9fcae91fb6a4ade2d26a50f15",
          "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
          "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
          "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
          "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
        )
        .map(On)
    ),
    Er = Qa(
      new Array(3)
        .concat(
          "fee6cefdae6be6550d",
          "feeddefdbe85fd8d3cd94701",
          "feeddefdbe85fd8d3ce6550da63603",
          "feeddefdd0a2fdae6bfd8d3ce6550da63603",
          "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
          "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
          "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
        )
        .map(On)
    ),
    Nr = Xa(Ta(300, 0.5, 0), Ta(-240, 0.5, 1)),
    _r = Xa(Ta(-100, 0.75, 0.35), Ta(80, 1.5, 0.8)),
    Ar = Xa(Ta(260, 0.75, 0.35), Ta(80, 1.5, 0.8)),
    kr = Ta(),
    Cr = aa(),
    Pr = Math.PI / 3,
    Ir = (2 * Math.PI) / 3;
  function jr(e) {
    var t = e.length;
    return function (n) {
      return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))];
    };
  }
  var $r = jr(
      On(
        "44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"
      )
    ),
    Or = jr(
      On(
        "00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"
      )
    ),
    zr = jr(
      On(
        "00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"
      )
    ),
    Dr = jr(
      On(
        "0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"
      )
    );
  const Rr = {
    position: "chartArea",
    property: "value",
    grid: { z: 1, drawOnChartArea: !1 },
    ticks: { z: 1 },
    legend: {
      align: "right",
      position: "bottom-right",
      length: 100,
      width: 50,
      margin: 8,
      indicatorWidth: 10,
    },
  };
  class Gr extends t.LinearScale {
    constructor() {
      super(...arguments), (this.legendSize = { w: 0, h: 0 });
    }
    init(e) {
      (e.position = "chartArea"), super.init(e), (this.axis = "r");
    }
    parse(e, t) {
      return e && "number" == typeof e[this.options.property]
        ? e[this.options.property]
        : super.parse(e, t);
    }
    isHorizontal() {
      return (
        "top" === this.options.legend.align ||
        "bottom" === this.options.legend.align
      );
    }
    _getNormalizedValue(e) {
      return null == e || Number.isNaN(e)
        ? null
        : (e - this._startValue) / this._valueRange;
    }
    update(e, t, n) {
      const a = Math.min(
          t,
          null == this.bottom ? Number.POSITIVE_INFINITY : this.bottom
        ),
        r = Math.min(
          e,
          null == this.right ? Number.POSITIVE_INFINITY : this.right
        ),
        i = this.options.legend,
        f = this.isHorizontal(),
        c = (e, t) => (e < 1 ? t * e : e),
        o =
          Math.min(r, c(f ? i.length : i.width, r)) -
          (f ? 0 : i.indicatorWidth),
        d =
          Math.min(a, c(f ? i.width : i.length, a)) -
          (f ? i.indicatorWidth : 0);
      (this.legendSize = { w: o, h: d }),
        (this.bottom = d),
        (this.height = d),
        (this.right = o),
        (this.width = o);
      const u = this.options.position;
      this.options.position = this.options.legend.align;
      const s = super.update(o, d, n);
      return (
        (this.options.position = u),
        (this.height = Math.min(d, this.height)),
        (this.width = Math.min(o, this.width)),
        s
      );
    }
    _computeLabelArea() {}
    draw(e) {
      if (!this._isVisible()) return;
      const t = (function (e, t, n, a, r) {
          const { indicatorWidth: i, align: f, position: c } = t,
            o = "top" === f || "bottom" === f,
            d = ("left" === f ? r.w : n) + (o ? i : 0),
            u = ("top" === f ? r.h : a) + (o ? 0 : i),
            s = (function (e) {
              const { indicatorWidth: t, align: n, margin: a } = e;
              return {
                left:
                  ("number" == typeof a ? a : a.left) + ("right" === n ? t : 0),
                top:
                  ("number" == typeof a ? a : a.top) + ("bottom" === n ? t : 0),
                right:
                  ("number" == typeof a ? a : a.right) + ("left" === n ? t : 0),
                bottom:
                  ("number" == typeof a ? a : a.bottom) + ("top" === n ? t : 0),
              };
            })(t);
          if ("string" == typeof c)
            switch (c) {
              case "top-left":
                return [s.left, s.top];
              case "top":
                return [(e.right - d) / 2, s.top];
              case "left":
                return [s.left, (e.bottom - u) / 2];
              case "top-right":
                return [e.right - d - s.right, s.top];
              case "bottom-right":
                return [e.right - d - s.right, e.bottom - u - s.bottom];
              case "bottom":
                return [(e.right - d) / 2, e.bottom - u - s.bottom];
              case "bottom-left":
                return [s.left, e.bottom - u - s.bottom];
              default:
                return [e.right - d - s.right, (e.bottom - u) / 2];
            }
          return [c.x, c.y];
        })(e, this.options.legend, this.width, this.height, this.legendSize),
        { ctx: n } = this;
      n.save(), n.translate(t[0], t[1]);
      const a = this.options.position;
      (this.options.position = this.options.legend.align),
        super.draw({ ...e, bottom: this.height + 10, right: this.width }),
        (this.options.position = a);
      const { indicatorWidth: r } = this.options.legend;
      switch (this.options.legend.align) {
        case "left":
          n.translate(this.legendSize.w, 0);
          break;
        case "top":
          n.translate(0, this.legendSize.h);
          break;
        case "bottom":
          n.translate(0, -r);
          break;
        default:
          n.translate(-r, 0);
      }
      this._drawIndicator(), n.restore();
    }
    _drawIndicator() {}
  }
  class qr extends t.LogarithmicScale {
    constructor() {
      super(...arguments), (this.legendSize = { w: 0, h: 0 });
    }
    init(e) {
      Gr.prototype.init.call(this, e);
    }
    parse(e, t) {
      return Gr.prototype.parse.call(this, e, t);
    }
    isHorizontal() {
      return (
        "top" === this.options.legend.align ||
        "bottom" === this.options.legend.align
      );
    }
    _getNormalizedValue(e) {
      return null == e || Number.isNaN(e)
        ? null
        : (Math.log10(e) - this._startValue) / this._valueRange;
    }
    update(e, t, n) {
      return Gr.prototype.update.call(this, e, t, n);
    }
    _computeLabelArea() {}
    draw(e) {
      return Gr.prototype.draw.call(this, e);
    }
    _drawIndicator() {}
  }
  const Br = {
    interpolateBlues: vr,
    interpolateBrBG: Za,
    interpolateBuGn: cr,
    interpolateBuPu: or,
    interpolateCividis: function (e) {
      return (
        (e = Math.max(0, Math.min(1, e))),
        "rgb(" +
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                -4.54 -
                  e *
                    (35.34 -
                      e *
                        (2381.73 - e * (6402.7 - e * (7024.72 - 2710.57 * e))))
              )
            )
          ) +
          ", " +
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                32.49 +
                  e *
                    (170.73 +
                      e * (52.82 - e * (131.46 - e * (176.58 - 67.37 * e))))
              )
            )
          ) +
          ", " +
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                81.24 +
                  e *
                    (442.36 -
                      e *
                        (2482.43 - e * (6167.24 - e * (6614.94 - 2475.67 * e))))
              )
            )
          ) +
          ")"
      );
    },
    interpolateCool: Ar,
    interpolateCubehelixDefault: Nr,
    interpolateGnBu: dr,
    interpolateGreens: wr,
    interpolateGreys: xr,
    interpolateInferno: zr,
    interpolateMagma: Or,
    interpolateOrRd: ur,
    interpolateOranges: Er,
    interpolatePRGn: Ja,
    interpolatePiYG: er,
    interpolatePlasma: Dr,
    interpolatePuBu: lr,
    interpolatePuBuGn: sr,
    interpolatePuOr: tr,
    interpolatePuRd: br,
    interpolatePurples: Mr,
    interpolateRainbow: function (e) {
      (e < 0 || e > 1) && (e -= Math.floor(e));
      var t = Math.abs(e - 0.5);
      return (
        (kr.h = 360 * e - 100),
        (kr.s = 1.5 - 1.5 * t),
        (kr.l = 0.8 - 0.9 * t),
        kr + ""
      );
    },
    interpolateRdBu: nr,
    interpolateRdGy: ar,
    interpolateRdPu: hr,
    interpolateRdYlBu: rr,
    interpolateRdYlGn: ir,
    interpolateReds: Sr,
    interpolateSinebow: function (e) {
      var t;
      return (
        (e = (0.5 - e) * Math.PI),
        (Cr.r = 255 * (t = Math.sin(e)) * t),
        (Cr.g = 255 * (t = Math.sin(e + Pr)) * t),
        (Cr.b = 255 * (t = Math.sin(e + Ir)) * t),
        Cr + ""
      );
    },
    interpolateSpectral: fr,
    interpolateTurbo: function (e) {
      return (
        (e = Math.max(0, Math.min(1, e))),
        "rgb(" +
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                34.61 +
                  e *
                    (1172.33 -
                      e *
                        (10793.56 -
                          e * (33300.12 - e * (38394.49 - 14825.05 * e))))
              )
            )
          ) +
          ", " +
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                23.31 +
                  e *
                    (557.33 +
                      e *
                        (1225.33 - e * (3574.96 - e * (1073.77 + 707.56 * e))))
              )
            )
          ) +
          ", " +
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                27.2 +
                  e *
                    (3211.1 -
                      e *
                        (15327.97 - e * (27814 - e * (22569.18 - 6838.66 * e))))
              )
            )
          ) +
          ")"
      );
    },
    interpolateViridis: $r,
    interpolateWarm: _r,
    interpolateYlGn: gr,
    interpolateYlGnBu: pr,
    interpolateYlOrBr: mr,
    interpolateYlOrRd: yr,
  };
  function Tr(e, t) {
    const n = 1 / t;
    if (e <= n) return 0;
    if (e >= 1 - n) return 1;
    for (let t = 0; t < 1; t += n) if (e < t) return t - n / 2;
    return e;
  }
  Object.keys(Br).forEach((e) => {
    (Br[`${e.charAt(11).toLowerCase()}${e.slice(12)}`] = Br[e]),
      (Br[e.slice(11)] = Br[e]);
  });
  const Lr = { interpolate: "blues", missing: "transparent", quantize: 0 };
  class Fr extends Gr {
    get interpolate() {
      const e = this.options;
      return e
        ? "function" == typeof e.interpolate
          ? e.interpolate
          : Br[e.interpolate] || Br.blues
        : (e) => `rgb(${e},${e},${e})`;
    }
    getColorForValue(e) {
      const t = this._getNormalizedValue(e);
      return null == t || Number.isNaN(t)
        ? this.options.missing
        : this.getColor(t);
    }
    getColor(e) {
      let t = e;
      return (
        this.options.quantize > 0 && (t = Tr(t, this.options.quantize)),
        this.interpolate(t)
      );
    }
    _drawIndicator() {
      const { indicatorWidth: e } = this.options.legend,
        t = this._reversePixels;
      if (this.isHorizontal()) {
        const n = this.width;
        if (this.options.quantize > 0) {
          const a = n / this.options.quantize,
            r = t ? (e) => n - a - e : (e) => e;
          for (let t = 0; t < n; t += a) {
            const i = (t + a / 2) / n;
            (this.ctx.fillStyle = this.getColor(i)),
              this.ctx.fillRect(r(t), 0, a, e);
          }
        } else {
          const a = t ? (e) => n - 1 - e : (e) => e;
          for (let t = 0; t < n; t += 1)
            (this.ctx.fillStyle = this.getColor((t + 0.5) / n)),
              this.ctx.fillRect(a(t), 0, 1, e);
        }
      } else {
        const n = this.height;
        if (this.options.quantize > 0) {
          const a = n / this.options.quantize,
            r = t ? (e) => n - a - e : (e) => e;
          for (let t = 0; t < n; t += a) {
            const i = (t + a / 2) / n;
            (this.ctx.fillStyle = this.getColor(i)),
              this.ctx.fillRect(0, r(t), e, a);
          }
        } else {
          const a = t ? (e) => n - 1 - e : (e) => e;
          for (let t = 0; t < n; t += 1)
            (this.ctx.fillStyle = this.getColor((t + 0.5) / n)),
              this.ctx.fillRect(0, a(t), e, 1);
        }
      }
    }
  }
  (Fr.id = "color"),
    (Fr.defaults = n.merge({}, [t.LinearScale.defaults, Rr, Lr])),
    (Fr.descriptors = {
      _scriptable: (e) => "interpolate" !== e,
      _indexable: !1,
    });
  class Wr extends qr {
    constructor() {
      super(...arguments), (this.interpolate = (e) => `rgb(${e},${e},${e})`);
    }
    init(e) {
      super.init(e),
        "function" == typeof e.interpolate
          ? (this.interpolate = e.interpolate)
          : (this.interpolate = Br[e.interpolate] || Br.blues);
    }
    getColorForValue(e) {
      return Fr.prototype.getColorForValue.call(this, e);
    }
    getColor(e) {
      let t = e;
      return (
        this.options.quantize > 0 && (t = Tr(t, this.options.quantize)),
        this.interpolate(t)
      );
    }
    _drawIndicator() {
      return Fr.prototype._drawIndicator.call(this);
    }
  }
  (Wr.id = "colorLogarithmic"),
    (Wr.defaults = n.merge({}, [t.LogarithmicScale.defaults, Rr, Lr])),
    (Wr.descriptors = {
      _scriptable: (e) => "interpolate" !== e,
      _indexable: !1,
    });
  const Vr = {
    missing: 1,
    mode: "area",
    range: [2, 20],
    legend: { align: "bottom", length: 90, width: 70, indicatorWidth: 42 },
  };
  class Hr extends Gr {
    constructor() {
      super(...arguments), (this._model = null);
    }
    getSizeForValue(e) {
      const t = this._getNormalizedValue(e);
      return null == t || Number.isNaN(t)
        ? this.options.missing
        : this.getSizeImpl(t);
    }
    getSizeImpl(e) {
      const [t, n] = this.options.range;
      if ("area" === this.options.mode) {
        const a = n * n * Math.PI,
          r = t * t * Math.PI,
          i = e * (a - r) + r;
        return Math.sqrt(i / Math.PI);
      }
      return e * (n - t) + t;
    }
    _drawIndicator() {
      const { ctx: e } = this,
        t = this.options.legend.indicatorWidth / 2,
        a = this.isHorizontal(),
        r = this.ticks,
        i = this._labelItems
          ? this._labelItems.map((e) => ({
              [a ? "x" : "y"]: e.translation[a ? 0 : 1],
            }))
          : r.map((e, t) => ({ [a ? "x" : "y"]: this.getPixelForTick(t) }));
      if (
        ((this._gridLineItems || []).forEach((n) => {
          if (
            (e.save(),
            (e.strokeStyle = n.color),
            (e.lineWidth = n.width),
            e.setLineDash &&
              (e.setLineDash(n.borderDash),
              (e.lineDashOffset = n.borderDashOffset)),
            e.beginPath(),
            this.options.grid.drawTicks)
          )
            switch (this.options.legend.align) {
              case "left":
                e.moveTo(0, n.ty1), e.lineTo(t, n.ty2);
                break;
              case "top":
                e.moveTo(n.tx1, 0), e.lineTo(n.tx2, t);
                break;
              case "bottom":
                e.moveTo(n.tx1, t), e.lineTo(n.tx2, 2 * t);
                break;
              default:
                e.moveTo(t, n.ty1), e.lineTo(2 * t, n.ty2);
            }
          e.stroke(), e.restore();
        }),
        this._model)
      ) {
        const t = this._model;
        (e.strokeStyle = t.borderColor),
          (e.lineWidth = t.borderWidth || 0),
          (e.fillStyle = t.backgroundColor);
      } else e.fillStyle = "blue";
      r.forEach((r, f) => {
        const c = i[f],
          o = this.getSizeForValue(r.value),
          d = a ? c.x : t,
          u = a ? t : c.y,
          s = {
            pointStyle: "circle",
            borderWidth: 0,
            ...(this._model || {}),
            radius: o,
          };
        n.drawPoint(e, s, d, u);
      });
    }
  }
  (Hr.id = "size"),
    (Hr.defaults = n.merge({}, [t.LinearScale.defaults, Rr, Vr])),
    (Hr.descriptors = { _scriptable: !0, _indexable: (e) => "range" !== e });
  class Yr extends qr {
    constructor() {
      super(...arguments), (this._model = null);
    }
    getSizeForValue(e) {
      const t = this._getNormalizedValue(e);
      return null == t || Number.isNaN(t)
        ? this.options.missing
        : this.getSizeImpl(t);
    }
    getSizeImpl(e) {
      return Hr.prototype.getSizeImpl.call(this, e);
    }
    _drawIndicator() {
      Hr.prototype._drawIndicator.call(this);
    }
  }
  (Yr.id = "sizeLogarithmic"),
    (Yr.defaults = n.merge({}, [t.LogarithmicScale.defaults, Rr, Vr]));
  class Kr extends t.Element {
    constructor() {
      super(...arguments), (this.cache = void 0);
    }
    inRange(e, t) {
      const n = this.getBounds(),
        a =
          (Number.isNaN(e) || (e >= n.x && e <= n.x2)) &&
          (Number.isNaN(t) || (t >= n.y && t <= n.y2)),
        r = this.projectionScale.geoPath.projection();
      if (
        a &&
        !Number.isNaN(e) &&
        !Number.isNaN(t) &&
        "function" == typeof r.invert
      ) {
        const n = r.invert([e, t]);
        return (
          null != n &&
          (function (e, t) {
            return (e && Ee.hasOwnProperty(e.type) ? Ee[e.type] : _e)(e, t);
          })(this.feature, n)
        );
      }
      return a;
    }
    inXRange(e) {
      return this.inRange(e, Number.NaN);
    }
    inYRange(e) {
      return this.inRange(Number.NaN, e);
    }
    getCenterPoint() {
      if (this.cache && this.cache.center) return this.cache.center;
      let e;
      if (this.center) {
        const t = this.projectionScale.projection([
          this.center.longitude,
          this.center.latitude,
        ]);
        e = { x: t[0], y: t[1] };
      } else {
        const t = this.projectionScale.geoPath.centroid(this.feature);
        e = { x: t[0], y: t[1] };
      }
      return (this.cache = { ...(this.cache || {}), center: e }), e;
    }
    getBounds() {
      if (this.cache && this.cache.bounds) return this.cache.bounds;
      const e = (function (e, t) {
          return [
            [e[0][0] - t, e[0][1] - t],
            [e[1][0] + t, e[1][1] + t],
          ];
        })(
          this.projectionScale.geoPath.bounds(this.feature),
          this.options.borderWidth / 2
        ),
        t = {
          x: e[0][0],
          x2: e[1][0],
          y: e[0][1],
          y2: e[1][1],
          width: e[1][0] - e[0][0],
          height: e[1][1] - e[0][1],
        };
      return (this.cache = { ...(this.cache || {}), bounds: t }), t;
    }
    _drawInCache(e) {
      const t = this.getBounds();
      if (!Number.isFinite(t.x)) return;
      const n =
          this.cache && this.cache.canvas
            ? this.cache.canvas
            : e.createElement("canvas"),
        a = Math.floor(t.x),
        r = Math.floor(t.y),
        i = Math.ceil(t.x + t.width),
        f = Math.ceil(t.y + t.height),
        c = this.pixelRatio || 1;
      (n.width = Math.max(i - a, 1) * c), (n.height = Math.max(f - r, 1) * c);
      const o = n.getContext("2d");
      o &&
        (o.clearRect(0, 0, n.width, n.height),
        o.save(),
        o.scale(c, c),
        o.translate(-a, -r),
        this._drawImpl(o),
        o.restore(),
        (this.cache = {
          ...(this.cache || {}),
          canvas: n,
          canvasKey: this._optionsToKey(),
        }));
    }
    _optionsToKey() {
      const { options: e } = this;
      return `${e.backgroundColor};${e.borderColor};${e.borderWidth};${this.pixelRatio}`;
    }
    _drawImpl(e) {
      const { feature: t } = this,
        { options: n } = this;
      e.beginPath(),
        this.projectionScale.geoPath.context(e)(t),
        n.backgroundColor && ((e.fillStyle = n.backgroundColor), e.fill()),
        n.borderColor &&
          ((e.strokeStyle = n.borderColor),
          (e.lineWidth = n.borderWidth),
          e.stroke());
    }
    draw(e) {
      const { feature: t } = this;
      if (!t) return;
      (this.cache && this.cache.canvasKey === this._optionsToKey()) ||
        this._drawInCache(e.canvas.ownerDocument);
      const n = this.getBounds();
      if (this.cache && this.cache.canvas) {
        const t = Math.floor(n.x),
          a = Math.floor(n.y),
          r = Math.ceil(n.x + n.width),
          i = Math.ceil(n.y + n.height);
        e.drawImage(this.cache.canvas, t, a, r - t, i - a);
      } else Number.isFinite(n.x) && (e.save(), this._drawImpl(e), e.restore());
    }
  }
  (Kr.id = "geoFeature"),
    (Kr.defaults = {
      ...t.BarElement.defaults,
      outlineBackgroundColor: null,
      outlineBorderWidth: 0,
      graticuleBorderColor: "#CCCCCC",
      graticuleBorderWidth: 0,
    }),
    (Kr.defaultRoutes = {
      outlineBorderColor: "borderColor",
      ...(t.BarElement.defaultRoutes || {}),
    });
  const Ur = { showOutline: !1, showGraticule: !1, clipMap: !0 },
    Xr = {
      scales: { xy: { type: $n.id, position: "chartArea", display: !1 } },
    };
  function Qr(e) {
    const t = { ...e };
    return (
      Object.keys(e).forEach((n) => {
        let a = n;
        if (n.startsWith("outline")) {
          const e = n.slice("outline".length);
          a = e[0].toLowerCase() + e.slice(1);
        } else {
          if (!n.startsWith("hoverOutline")) return;
          a = `hover${n.slice("hoverOutline".length)}`;
        }
        delete t[n], (t[a] = e[n]);
      }),
      t
    );
  }
  class Zr extends t.DatasetController {
    getGeoDataset() {
      return super.getDataset();
    }
    getGeoOptions() {
      return this.chart.options;
    }
    getProjectionScale() {
      return this.getScaleForId("xy");
    }
    linkScales() {
      const e = this.getGeoDataset(),
        t = this.getMeta();
      (t.xAxisID = "xy"),
        (e.xAxisID = "xy"),
        (t.yAxisID = "xy"),
        (e.yAxisID = "xy"),
        (t.xScale = this.getScaleForId("xy")),
        (t.yScale = this.getScaleForId("xy")),
        this.getProjectionScale().computeBounds(this.resolveOutline());
    }
    showOutline() {
      return n.valueOrDefault(
        this.getGeoDataset().showOutline,
        this.getGeoOptions().showOutline
      );
    }
    clipMap() {
      return n.valueOrDefault(
        this.getGeoDataset().clipMap,
        this.getGeoOptions().clipMap
      );
    }
    getGraticule() {
      return n.valueOrDefault(
        this.getGeoDataset().showGraticule,
        this.getGeoOptions().showGraticule
      );
    }
    update(e) {
      super.update(e);
      const t = this.getMeta(),
        n = this.getProjectionScale(),
        a = n.updateBounds();
      if (this.showOutline()) {
        const r = t.dataset;
        if (
          (a && delete r.cache,
          (r.projectionScale = n),
          (r.pixelRatio = this.chart.currentDevicePixelRatio),
          "resize" !== e)
        ) {
          const n = Qr(this.resolveDatasetElementOptions(e)),
            a = { feature: this.resolveOutline(), options: n };
          this.updateElement(r, void 0, a, e),
            this.getGraticule() && (t.graticule = n);
        }
      } else this.getGraticule() && "resize" !== e && (t.graticule = Qr(this.resolveDatasetElementOptions(e)));
      this.updateElements(t.data, 0, t.data.length, e),
        a && t.data.forEach((e) => delete e.cache);
    }
    resolveOutline() {
      const e = this.getGeoDataset().outline || { type: "Sphere" };
      return Array.isArray(e) ? { type: "FeatureCollection", features: e } : e;
    }
    showGraticule() {
      const e = this.getGraticule(),
        t = this.getMeta().graticule;
      if (!e || !t) return;
      const { ctx: n } = this.chart,
        a = this.getProjectionScale().geoPath.context(n);
      if ((n.save(), n.beginPath(), "boolean" == typeof e)) e && a(Oe()());
      else {
        const t = Oe();
        e.stepMajor && t.stepMajor(e.stepMajor),
          e.stepMinor && t.stepMinor(e.stepMinor),
          a(t());
      }
      (n.strokeStyle = t.graticuleBorderColor),
        (n.lineWidth = t.graticuleBorderWidth),
        n.stroke(),
        n.restore();
    }
    draw() {
      const { chart: e } = this,
        t = this.clipMap();
      let a = !1;
      (!0 !== t && "outline" !== t && "outline+graticule" !== t) ||
        ((a = !0), n.clipArea(e.ctx, e.chartArea)),
        this.showOutline() &&
          this.getMeta().dataset &&
          this.getMeta().dataset.draw.call(
            this.getMeta().dataset,
            e.ctx,
            e.chartArea
          ),
        !0 === t || "graticule" === t || "outline+graticule" === t
          ? a || n.clipArea(e.ctx, e.chartArea)
          : a && ((a = !1), n.unclipArea(e.ctx)),
        this.showGraticule(),
        !0 === t || "items" === t
          ? a || n.clipArea(e.ctx, e.chartArea)
          : a && ((a = !1), n.unclipArea(e.ctx)),
        this.getMeta().data.forEach((t) => t.draw.call(t, e.ctx, e.chartArea)),
        a && ((a = !1), n.unclipArea(e.ctx));
    }
  }
  function Jr(e, n, a, r = [], i = []) {
    t.registry.addControllers(a),
      Array.isArray(r)
        ? t.registry.addElements(...r)
        : t.registry.addElements(r),
      Array.isArray(i) ? t.registry.addScales(...i) : t.registry.addScales(i);
    const f = n;
    return (f.type = e), f;
  }
  class ei extends Zr {
    initialize() {
      super.initialize(), (this.enableOptionSharing = !0);
    }
    linkScales() {
      super.linkScales();
      const e = this.getGeoDataset(),
        t = this.getMeta();
      (t.vAxisID = "color"),
        (t.rAxisID = "color"),
        (e.vAxisID = "color"),
        (e.rAxisID = "color"),
        (t.rScale = this.getScaleForId("color")),
        (t.vScale = t.rScale),
        (t.iScale = t.xScale),
        (t.iAxisID = t.xAxisID),
        (e.iAxisID = t.xAxisID);
    }
    _getOtherScale(e) {
      return e;
    }
    parse(e, t) {
      const n = this.getMeta().rScale,
        { data: a } = this.getDataset(),
        r = this._cachedMeta;
      for (let i = e; i < e + t; i += 1)
        r._parsed[i] = { [n.axis]: n.parse(a[i], i) };
    }
    updateElements(e, t, n, a) {
      const r = this.resolveDataElementOptions(t, a),
        i = this.getSharedOptions(r),
        f = this.includeOptions(a, i),
        c = this.getProjectionScale();
      this.updateSharedOptions(i, a, r);
      for (let r = t; r < t + n; r += 1) {
        const t = e[r];
        (t.projectionScale = c),
          (t.feature = this._data[r].feature),
          (t.center = this._data[r].center),
          (t.pixelRatio = this.chart.currentDevicePixelRatio);
        const n = t.getCenterPoint(),
          o = { x: n.x, y: n.y };
        f && (o.options = i || this.resolveDataElementOptions(r, a)),
          this.updateElement(t, r, o, a);
      }
    }
    indexToColor(e) {
      const t = this.getMeta().rScale;
      return t.getColorForValue(this.getParsed(e)[t.axis]);
    }
  }
  (ei.id = "choropleth"),
    (ei.defaults = n.merge({}, [
      Ur,
      { datasetElementType: Kr.id, dataElementType: Kr.id },
    ])),
    (ei.overrides = n.merge({}, [
      Xr,
      {
        plugins: {
          tooltip: {
            callbacks: {
              title: () => "",
              label(e) {
                var t, n, a, r;
                return null == e.formattedValue
                  ? null ===
                      (n =
                        null === (t = e.chart.data) || void 0 === t
                          ? void 0
                          : t.labels) || void 0 === n
                    ? void 0
                    : n[e.dataIndex]
                  : `${
                      null ===
                        (r =
                          null === (a = e.chart.data) || void 0 === a
                            ? void 0
                            : a.labels) || void 0 === r
                        ? void 0
                        : r[e.dataIndex]
                    }: ${e.formattedValue}`;
              },
            },
          },
        },
        scales: { color: { type: Fr.id } },
        elements: {
          geoFeature: {
            backgroundColor: (e) =>
              null == e.dataIndex
                ? null
                : e.chart
                    .getDatasetMeta(e.datasetIndex)
                    .controller.indexToColor(e.dataIndex),
          },
        },
      },
    ]));
  class ti extends t.Chart {
    constructor(e, t) {
      super(e, Jr("choropleth", t, ei, Kr, [Fr, $n]));
    }
  }
  ti.id = ei.id;
  class ni extends Zr {
    initialize() {
      super.initialize(), (this.enableOptionSharing = !0);
    }
    linkScales() {
      super.linkScales();
      const e = this.getGeoDataset(),
        t = this.getMeta();
      (t.vAxisID = "r"),
        (t.rAxisID = "r"),
        (e.vAxisID = "r"),
        (e.rAxisID = "r"),
        (t.rScale = this.getScaleForId("r")),
        (t.vScale = t.rScale),
        (t.iScale = t.xScale),
        (t.iAxisID = t.xAxisID),
        (e.iAxisID = t.xAxisID);
    }
    _getOtherScale(e) {
      return e;
    }
    parse(e, t) {
      const n = this.getMeta().rScale,
        a = this.getDataset().data,
        r = this._cachedMeta;
      for (let i = e; i < e + t; i += 1) {
        const e = a[i];
        r._parsed[i] = {
          x: null == e.longitude ? e.x : e.longitude,
          y: null == e.latitude ? e.y : e.latitude,
          [n.axis]: n.parse(e, i),
        };
      }
    }
    updateElements(e, t, n, a) {
      const r = "reset" === a,
        i = this.resolveDataElementOptions(t, a),
        f = this.getSharedOptions(i),
        c = this.includeOptions(a, f),
        o = this.getProjectionScale();
      (this.getMeta().rScale._model = i), this.updateSharedOptions(f, a, i);
      for (let i = t; i < t + n; i += 1) {
        const t = e[i],
          n = this.getParsed(i),
          d = o.projection([n.x, n.y]),
          u = {
            x: d ? d[0] : 0,
            y: d ? d[1] : 0,
            skip: Number.isNaN(n.x) || Number.isNaN(n.y),
          };
        c &&
          ((u.options = f || this.resolveDataElementOptions(i, a)),
          r && (u.options.radius = 0)),
          this.updateElement(t, i, u, a);
      }
    }
    indexToRadius(e) {
      const t = this.getMeta().rScale;
      return t.getSizeForValue(this.getParsed(e)[t.axis]);
    }
  }
  (ni.id = "bubbleMap"),
    (ni.defaults = n.merge({}, [
      Ur,
      {
        dataElementType: t.PointElement.id,
        datasetElementType: Kr.id,
        showOutline: !0,
        clipMap: "outline+graticule",
      },
    ])),
    (ni.overrides = n.merge({}, [
      Xr,
      {
        plugins: {
          tooltip: {
            callbacks: {
              title: () => "",
              label(e) {
                var t, n, a, r;
                return null == e.formattedValue
                  ? null ===
                      (n =
                        null === (t = e.chart.data) || void 0 === t
                          ? void 0
                          : t.labels) || void 0 === n
                    ? void 0
                    : n[e.dataIndex]
                  : `${
                      null ===
                        (r =
                          null === (a = e.chart.data) || void 0 === a
                            ? void 0
                            : a.labels) || void 0 === r
                        ? void 0
                        : r[e.dataIndex]
                    }: ${e.formattedValue}`;
              },
            },
          },
        },
        scales: { r: { type: Hr.id } },
        elements: {
          point: {
            radius: (e) =>
              null == e.dataIndex
                ? null
                : e.chart
                    .getDatasetMeta(e.datasetIndex)
                    .controller.indexToRadius(e.dataIndex),
            hoverRadius: (e) =>
              null == e.dataIndex
                ? null
                : e.chart
                    .getDatasetMeta(e.datasetIndex)
                    .controller.indexToRadius(e.dataIndex) + 1,
          },
        },
      },
    ]));
  class ai extends t.Chart {
    constructor(e, t) {
      super(e, Jr("bubbleMap", t, ni, Kr, [Hr, $n]));
    }
  }
  function ri(e) {
    return e;
  }
  function ii(e) {
    if (null == e) return ri;
    var t,
      n,
      a = e.scale[0],
      r = e.scale[1],
      i = e.translate[0],
      f = e.translate[1];
    return function (e, c) {
      c || (t = n = 0);
      var o = 2,
        d = e.length,
        u = new Array(d);
      for (u[0] = (t += e[0]) * a + i, u[1] = (n += e[1]) * r + f; o < d; )
        (u[o] = e[o]), ++o;
      return u;
    };
  }
  function fi(e) {
    var t,
      n = ii(e.transform),
      a = 1 / 0,
      r = a,
      i = -a,
      f = -a;
    function c(e) {
      (e = n(e))[0] < a && (a = e[0]),
        e[0] > i && (i = e[0]),
        e[1] < r && (r = e[1]),
        e[1] > f && (f = e[1]);
    }
    function o(e) {
      switch (e.type) {
        case "GeometryCollection":
          e.geometries.forEach(o);
          break;
        case "Point":
          c(e.coordinates);
          break;
        case "MultiPoint":
          e.coordinates.forEach(c);
      }
    }
    for (t in (e.arcs.forEach(function (e) {
      for (var t, c = -1, o = e.length; ++c < o; )
        (t = n(e[c], c))[0] < a && (a = t[0]),
          t[0] > i && (i = t[0]),
          t[1] < r && (r = t[1]),
          t[1] > f && (f = t[1]);
    }),
    e.objects))
      o(e.objects[t]);
    return [a, r, i, f];
  }
  function ci(e, t) {
    var n = t.id,
      a = t.bbox,
      r = null == t.properties ? {} : t.properties,
      i = oi(e, t);
    return null == n && null == a
      ? { type: "Feature", properties: r, geometry: i }
      : null == a
      ? { type: "Feature", id: n, properties: r, geometry: i }
      : { type: "Feature", id: n, bbox: a, properties: r, geometry: i };
  }
  function oi(e, t) {
    var n = ii(e.transform),
      a = e.arcs;
    function r(e, t) {
      t.length && t.pop();
      for (var r = a[e < 0 ? ~e : e], i = 0, f = r.length; i < f; ++i)
        t.push(n(r[i], i));
      e < 0 &&
        (function (e, t) {
          for (var n, a = e.length, r = a - t; r < --a; )
            (n = e[r]), (e[r++] = e[a]), (e[a] = n);
        })(t, f);
    }
    function i(e) {
      return n(e);
    }
    function f(e) {
      for (var t = [], n = 0, a = e.length; n < a; ++n) r(e[n], t);
      return t.length < 2 && t.push(t[0]), t;
    }
    function c(e) {
      for (var t = f(e); t.length < 4; ) t.push(t[0]);
      return t;
    }
    function o(e) {
      return e.map(c);
    }
    return (function e(t) {
      var n,
        a = t.type;
      switch (a) {
        case "GeometryCollection":
          return { type: a, geometries: t.geometries.map(e) };
        case "Point":
          n = i(t.coordinates);
          break;
        case "MultiPoint":
          n = t.coordinates.map(i);
          break;
        case "LineString":
          n = f(t.arcs);
          break;
        case "MultiLineString":
          n = t.arcs.map(f);
          break;
        case "Polygon":
          n = o(t.arcs);
          break;
        case "MultiPolygon":
          n = t.arcs.map(o);
          break;
        default:
          return null;
      }
      return { type: a, coordinates: n };
    })(t);
  }
  function di(e, t) {
    var n = {},
      a = {},
      r = {},
      i = [],
      f = -1;
    function c(e, t) {
      for (var a in e) {
        var r = e[a];
        delete t[r.start],
          delete r.start,
          delete r.end,
          r.forEach(function (e) {
            n[e < 0 ? ~e : e] = 1;
          }),
          i.push(r);
      }
    }
    return (
      t.forEach(function (n, a) {
        var r,
          i = e.arcs[n < 0 ? ~n : n];
        i.length < 3 &&
          !i[1][0] &&
          !i[1][1] &&
          ((r = t[++f]), (t[f] = n), (t[a] = r));
      }),
      t.forEach(function (t) {
        var n,
          i,
          f = (function (t) {
            var n,
              a = e.arcs[t < 0 ? ~t : t],
              r = a[0];
            return (
              e.transform
                ? ((n = [0, 0]),
                  a.forEach(function (e) {
                    (n[0] += e[0]), (n[1] += e[1]);
                  }))
                : (n = a[a.length - 1]),
              t < 0 ? [n, r] : [r, n]
            );
          })(t),
          c = f[0],
          o = f[1];
        if ((n = r[c]))
          if ((delete r[n.end], n.push(t), (n.end = o), (i = a[o]))) {
            delete a[i.start];
            var d = i === n ? n : n.concat(i);
            a[(d.start = n.start)] = r[(d.end = i.end)] = d;
          } else a[n.start] = r[n.end] = n;
        else if ((n = a[o]))
          if ((delete a[n.start], n.unshift(t), (n.start = c), (i = r[c]))) {
            delete r[i.end];
            var u = i === n ? n : i.concat(n);
            a[(u.start = i.start)] = r[(u.end = n.end)] = u;
          } else a[n.start] = r[n.end] = n;
        else a[((n = [t]).start = c)] = r[(n.end = o)] = n;
      }),
      c(r, a),
      c(a, r),
      t.forEach(function (e) {
        n[e < 0 ? ~e : e] || i.push([e]);
      }),
      i
    );
  }
  function ui(e, t, n) {
    var a, r, i;
    if (arguments.length > 1) a = si(e, t, n);
    else for (r = 0, a = new Array((i = e.arcs.length)); r < i; ++r) a[r] = r;
    return { type: "MultiLineString", arcs: di(e, a) };
  }
  function si(e, t, n) {
    var a,
      r = [],
      i = [];
    function f(e) {
      var t = e < 0 ? ~e : e;
      (i[t] || (i[t] = [])).push({ i: e, g: a });
    }
    function c(e) {
      e.forEach(f);
    }
    function o(e) {
      e.forEach(c);
    }
    return (
      (function e(t) {
        switch (((a = t), t.type)) {
          case "GeometryCollection":
            t.geometries.forEach(e);
            break;
          case "LineString":
            c(t.arcs);
            break;
          case "MultiLineString":
          case "Polygon":
            o(t.arcs);
            break;
          case "MultiPolygon":
            !(function (e) {
              e.forEach(o);
            })(t.arcs);
        }
      })(t),
      i.forEach(
        null == n
          ? function (e) {
              r.push(e[0].i);
            }
          : function (e) {
              n(e[0].g, e[e.length - 1].g) && r.push(e[0].i);
            }
      ),
      r
    );
  }
  function li(e, t) {
    var n = {},
      a = [],
      r = [];
    function i(e) {
      e.forEach(function (t) {
        t.forEach(function (t) {
          (n[(t = t < 0 ? ~t : t)] || (n[t] = [])).push(e);
        });
      }),
        a.push(e);
    }
    function f(t) {
      return (function (e) {
        for (var t, n = -1, a = e.length, r = e[a - 1], i = 0; ++n < a; )
          (t = r), (r = e[n]), (i += t[0] * r[1] - t[1] * r[0]);
        return Math.abs(i);
      })(oi(e, { type: "Polygon", arcs: [t] }).coordinates[0]);
    }
    return (
      t.forEach(function e(t) {
        switch (t.type) {
          case "GeometryCollection":
            t.geometries.forEach(e);
            break;
          case "Polygon":
            i(t.arcs);
            break;
          case "MultiPolygon":
            t.arcs.forEach(i);
        }
      }),
      a.forEach(function (e) {
        if (!e._) {
          var t = [],
            a = [e];
          for (e._ = 1, r.push(t); (e = a.pop()); )
            t.push(e),
              e.forEach(function (e) {
                e.forEach(function (e) {
                  n[e < 0 ? ~e : e].forEach(function (e) {
                    e._ || ((e._ = 1), a.push(e));
                  });
                });
              });
        }
      }),
      a.forEach(function (e) {
        delete e._;
      }),
      {
        type: "MultiPolygon",
        arcs: r
          .map(function (t) {
            var a,
              r = [];
            if (
              (t.forEach(function (e) {
                e.forEach(function (e) {
                  e.forEach(function (e) {
                    n[e < 0 ? ~e : e].length < 2 && r.push(e);
                  });
                });
              }),
              (a = (r = di(e, r)).length) > 1)
            )
              for (var i, c, o = 1, d = f(r[0]); o < a; ++o)
                (i = f(r[o])) > d &&
                  ((c = r[0]), (r[0] = r[o]), (r[o] = c), (d = i));
            return r;
          })
          .filter(function (e) {
            return e.length > 0;
          }),
      }
    );
  }
  function bi(e, t) {
    for (var n = 0, a = e.length; n < a; ) {
      var r = (n + a) >>> 1;
      e[r] < t ? (n = r + 1) : (a = r);
    }
    return n;
  }
  function hi(e) {
    if (null == e) return ri;
    var t,
      n,
      a = e.scale[0],
      r = e.scale[1],
      i = e.translate[0],
      f = e.translate[1];
    return function (e, c) {
      c || (t = n = 0);
      var o = 2,
        d = e.length,
        u = new Array(d),
        s = Math.round((e[0] - i) / a),
        l = Math.round((e[1] - f) / r);
      for (u[0] = s - t, t = s, u[1] = l - n, n = l; o < d; )
        (u[o] = e[o]), ++o;
      return u;
    };
  }
  ai.id = ni.id;
  var pi = Object.freeze({
    __proto__: null,
    bbox: fi,
    feature: function (e, t) {
      return (
        "string" == typeof t && (t = e.objects[t]),
        "GeometryCollection" === t.type
          ? {
              type: "FeatureCollection",
              features: t.geometries.map(function (t) {
                return ci(e, t);
              }),
            }
          : ci(e, t)
      );
    },
    mesh: function (e) {
      return oi(e, ui.apply(this, arguments));
    },
    meshArcs: ui,
    merge: function (e) {
      return oi(e, li.apply(this, arguments));
    },
    mergeArcs: li,
    neighbors: function (e) {
      var t = {},
        n = e.map(function () {
          return [];
        });
      function a(e, n) {
        e.forEach(function (e) {
          e < 0 && (e = ~e);
          var a = t[e];
          a ? a.push(n) : (t[e] = [n]);
        });
      }
      function r(e, t) {
        e.forEach(function (e) {
          a(e, t);
        });
      }
      var i = {
        LineString: a,
        MultiLineString: r,
        Polygon: r,
        MultiPolygon: function (e, t) {
          e.forEach(function (e) {
            r(e, t);
          });
        },
      };
      for (var f in (e.forEach(function e(t, n) {
        "GeometryCollection" === t.type
          ? t.geometries.forEach(function (t) {
              e(t, n);
            })
          : t.type in i && i[t.type](t.arcs, n);
      }),
      t))
        for (var c = t[f], o = c.length, d = 0; d < o; ++d)
          for (var u = d + 1; u < o; ++u) {
            var s,
              l = c[d],
              b = c[u];
            (s = n[l])[(f = bi(s, b))] !== b && s.splice(f, 0, b),
              (s = n[b])[(f = bi(s, l))] !== l && s.splice(f, 0, l);
          }
      return n;
    },
    quantize: function (e, t) {
      if (e.transform) throw new Error("already quantized");
      if (t && t.scale) c = e.bbox;
      else {
        if (!((n = Math.floor(t)) >= 2)) throw new Error("n must be ≥2");
        var n,
          a = (c = e.bbox || fi(e))[0],
          r = c[1],
          i = c[2],
          f = c[3];
        t = {
          scale: [i - a ? (i - a) / (n - 1) : 1, f - r ? (f - r) / (n - 1) : 1],
          translate: [a, r],
        };
      }
      var c,
        o,
        d = hi(t),
        u = e.objects,
        s = {};
      function l(e) {
        return d(e);
      }
      function b(e) {
        var t;
        switch (e.type) {
          case "GeometryCollection":
            t = { type: "GeometryCollection", geometries: e.geometries.map(b) };
            break;
          case "Point":
            t = { type: "Point", coordinates: l(e.coordinates) };
            break;
          case "MultiPoint":
            t = { type: "MultiPoint", coordinates: e.coordinates.map(l) };
            break;
          default:
            return e;
        }
        return (
          null != e.id && (t.id = e.id),
          null != e.bbox && (t.bbox = e.bbox),
          null != e.properties && (t.properties = e.properties),
          t
        );
      }
      for (o in u) s[o] = b(u[o]);
      return {
        type: "Topology",
        bbox: c,
        transform: t,
        objects: s,
        arcs: e.arcs.map(function (e) {
          var t,
            n = 0,
            a = 1,
            r = e.length,
            i = new Array(r);
          for (i[0] = d(e[0], 0); ++n < r; )
            ((t = d(e[n], n))[0] || t[1]) && (i[a++] = t);
          return 1 === a && (i[a++] = [0, 0]), (i.length = a), i;
        }),
      };
    },
    transform: ii,
    untransform: hi,
  });
  t.registry.addScales(Wr, Yr, $n, Fr, Hr),
    t.registry.addElements(Kr),
    t.registry.addControllers(ei, ni),
    (e.BubbleMapChart = ai),
    (e.BubbleMapController = ni),
    (e.ChoroplethChart = ti),
    (e.ChoroplethController = ei),
    (e.ColorLogarithmicScale = Wr),
    (e.ColorScale = Fr),
    (e.GeoController = Zr),
    (e.GeoFeature = Kr),
    (e.ProjectionScale = $n),
    (e.SizeLogarithmicScale = Yr),
    (e.SizeScale = Hr),
    (e.geoAlbers = Xt),
    (e.geoAlbersUsa = Qt),
    (e.geoAzimuthalEqualArea = tn),
    (e.geoAzimuthalEquidistant = an),
    (e.geoConicConformal = un),
    (e.geoConicEqualArea = Ut),
    (e.geoConicEquidistant = hn),
    (e.geoEqualEarth = xn),
    (e.geoEquirectangular = ln),
    (e.geoGnomonic = Sn),
    (e.geoMercator = fn),
    (e.geoNaturalEarth1 = Nn),
    (e.geoOrthographic = An),
    (e.geoStereographic = Cn),
    (e.geoTransverseMercator = In),
    (e.topojson = pi),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=chartjs-chart-geo@3.10.0.js.map
